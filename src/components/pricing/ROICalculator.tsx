import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Zap, Users, Package, DollarSign, Calculator } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface ROIInputs {
  shops: number;
  staff: number;
  vehicles: number;
  stopsPerStaff: number;
  fuelPerVehicleDay: number;
  workingDays: number;
  monthlyRevenue: number;
  grossMarginPct: number;
  inventoryLeakagePct: number;
  collectionDelayDays: number;
  creditOutstanding: number;
  missedDeliveryPct: number;
}

const DEFAULT_INPUTS: ROIInputs = {
  shops: 600,
  staff: 8,
  vehicles: 8,
  stopsPerStaff: 25,
  fuelPerVehicleDay: 600,
  workingDays: 26,
  monthlyRevenue: 5000000,
  grossMarginPct: 10,
  inventoryLeakagePct: 1.5,
  collectionDelayDays: 12,
  creditOutstanding: 1500000,
  missedDeliveryPct: 5,
};

type Tier = "foundation" | "command" | "governance";

const TIER_PARAMS: Record<Tier, {
  fuelImprovement: number;
  staffProductivity: number;
  missedDeliveryReduction: number;
  leakageReduction: number;
  delayReduction: number;
  planCost: number;
  label: string;
  bandLabel: string;
}> = {
  foundation: {
    fuelImprovement: 0.08,
    staffProductivity: 0.05,
    missedDeliveryReduction: 0.02,
    leakageReduction: 0.30,
    delayReduction: 2,
    planCost: 19999,
    label: "Foundation",
    bandLabel: "Control your day",
  },
  command: {
    fuelImprovement: 0.12,
    staffProductivity: 0.10,
    missedDeliveryReduction: 0.03,
    leakageReduction: 0.50,
    delayReduction: 4,
    planCost: 49999,
    label: "Command",
    bandLabel: "Control your operations",
  },
  governance: {
    fuelImprovement: 0.15,
    staffProductivity: 0.15,
    missedDeliveryReduction: 0.04,
    leakageReduction: 0.70,
    delayReduction: 6,
    planCost: 109999,
    label: "Governance",
    bandLabel: "Control your business",
  },
};

const STAFF_COST_PER_HEAD = 20000; // ₹20K/staff/month (conservative)

/* ─── 3.1 Fuel Savings ────────────────────────────────────────────────────── */
/* Monthly_Fuel = Fuel_per_day × Vehicles × Working_days                        */
/* Fuel Savings = Monthly_Fuel × tier_improvement%                              */

/* ─── 3.2 Staff Productivity ────────────────────────────────────────────────  */
/* Staff_Savings = Staff_count × ₹20K × tier_productivity%                     */

/* ─── 3.3 Missed Delivery Recovery ─────────────────────────────────────────  */
/* Missed revenue = Monthly_Revenue × missed_delivery%                          */
/* Recovered = Monthly_Revenue × min(tier_reduction, missed%)                   */
/* Margin impact = Recovered × gross_margin%                                    */

/* ─── 3.4 Inventory Leakage Reduction ──────────────────────────────────────  */
/* Current_leakage = Monthly_Revenue × leakage%                                 */
/* Savings = Current_leakage × tier_improvement%                                */

/* ─── 3.5 Cashflow Benefit ──────────────────────────────────────────────────  */
/* Freed_capital = Monthly_Revenue × (delay_reduction_days / 30)               */
/* Cash benefit = Freed_capital × 12% / 12                                     */

const computeROI = (inputs: ROIInputs, tier: Tier) => {
  const p = TIER_PARAMS[tier];

  // 3.1 Fuel
  const monthlyFuel = inputs.fuelPerVehicleDay * inputs.vehicles * inputs.workingDays;
  const fuelSavings = monthlyFuel * p.fuelImprovement;

  // 3.2 Staff productivity
  const staffSavings = inputs.staff * STAFF_COST_PER_HEAD * p.staffProductivity;

  // 3.3 Missed delivery (margin-adjusted)
  const missedDecimal = inputs.missedDeliveryPct / 100;
  // Don't recover more pct than what's missed
  const reductionDecimal = Math.min(p.missedDeliveryReduction, missedDecimal);
  const recoveredRevenue = inputs.monthlyRevenue * reductionDecimal;
  const marginRecovery = recoveredRevenue * (inputs.grossMarginPct / 100);

  // 3.4 Leakage reduction
  const currentLeakage = inputs.monthlyRevenue * (inputs.inventoryLeakagePct / 100);
  const leakageReduction = currentLeakage * p.leakageReduction;

  // 3.5 Cashflow benefit (capital cost 12% p.a.)
  const freedCapital = inputs.monthlyRevenue * (p.delayReduction / 30);
  const cashflowBenefit = (freedCapital * 0.12) / 12;

  const totalGain = fuelSavings + staffSavings + marginRecovery + leakageReduction + cashflowBenefit;
  const netGain = totalGain - p.planCost;
  // ROI Multiple = total gain / plan cost (how many times you earn back the plan fee)
  const roiMultiple = p.planCost > 0 ? totalGain / p.planCost : 0;
  // Payback in days = plan cost / (daily gain)
  const paybackDays = totalGain > 0 ? Math.round(p.planCost / (totalGain / 30)) : 999;

  return {
    fuelSavings,
    staffSavings,
    marginRecovery,
    leakageReduction,
    cashflowBenefit,
    totalGain,
    netGain,
    roiMultiple,
    paybackDays,
    planCost: p.planCost,
  };
};

/* ─── Recommendation Engine ─────────────────────────────────────────────────
 * Purely rule-based — evaluated synchronously on every input change.
 * Rules (evaluated top-down, first match wins):
 *   1. Credit > ₹25L  →  Governance   (multi-location capital signal)
 *   2. Shops > 800     →  Governance   (large-scale ops)
 *   3. Shops > 300  OR  Vehicles ≥ 3  →  Command  (mid-scale / multi-dispatch)
 *   4. Everything else  →  Foundation
 *
 * We intentionally keep this rule-based (not ROI-ratio based) so the badge
 * reacts instantly on every keystroke without any divide-by-zero edge cases.
 * ─────────────────────────────────────────────────────────────────────────── */
const recommendTier = (inputs: ROIInputs): Tier => {
  if (inputs.creditOutstanding > 2500000) return "governance";   // Rule 1
  if (inputs.shops > 800) return "governance";   // Rule 2
  if (inputs.shops > 300 || inputs.vehicles >= 3) return "command"; // Rule 3
  return "foundation";                                            // Rule 4
};

const fmt = (n: number) =>
  "₹" + new Intl.NumberFormat("en-IN").format(Math.round(n));

interface InputRowProps {
  label: string;
  field: keyof ROIInputs;
  inputs: ROIInputs;
  // Accepts an updater fn — compatible with both raw setState and our updateInput wrapper
  setInputs: (updater: (prev: ROIInputs) => ROIInputs) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
}

const InputRow = ({ label, field, inputs, setInputs, prefix, suffix, min = 0, max, step = 1 }: InputRowProps) => {
  const { lang } = useLang();
  const isTamil = lang === "ta";
  return (
    <div className={cn("py-2 group/row", isTamil ? "flex flex-col gap-1.5" : "flex items-center justify-between gap-4")}>
      <label className={cn(
        "font-medium text-muted-foreground group-hover/row:text-foreground transition-colors break-words leading-snug",
        isTamil ? "text-xs w-full" : "text-sm truncate"
      )}>{label}</label>
      <div className={cn(
        "flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 border border-black/5 focus-within:border-primary/50 transition-all",
        isTamil ? "w-full" : ""
      )}>
        {prefix && <span className="text-xs font-bold text-primary/60">{prefix}</span>}
        <input
          type="number"
          value={inputs[field]}
          min={min}
          max={max}
          step={step}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, [field]: parseFloat(e.target.value) || 0 }))
          }
          className={cn(
            "bg-transparent text-right text-sm font-bold text-foreground focus:outline-none",
            isTamil ? "flex-1 w-full" : "w-20 sm:w-24"
          )}
        />
        {suffix && <span className="text-xs font-bold text-muted-foreground/60">{suffix}</span>}
      </div>
    </div>
  );
};

const LeverRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
}) => (
  <div className="flex flex-row items-center justify-between py-4 border-b border-black/5 last:border-0 group/lever gap-2">
    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
      <div className="flex-shrink-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 group-hover/lever:bg-primary/20 transition-all">
        <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
      </div>
      <span className="text-xs sm:text-sm font-semibold text-foreground/80 truncate">{label}</span>
    </div>
    <span className="flex-shrink-0 text-sm sm:text-base font-bold text-foreground">{fmt(value)}</span>
  </div>
);


const ROICalculator = () => {
  const [inputs, setInputs] = useState<ROIInputs>(DEFAULT_INPUTS);
  const [manualTier, setManualTier] = useState<Tier | null>(null);
  const { lang } = useLang();

  const recommended = useMemo(() => recommendTier(inputs), [inputs]);
  const activeTier = manualTier ?? recommended;
  const result = useMemo(() => computeROI(inputs, activeTier), [inputs, activeTier]);

  // updateInput: clears manual tier AND updates inputs in one synchronous call
  // Typed to match InputRowProps.setInputs exactly
  const updateInput = (updater: (prev: ROIInputs) => ROIInputs) => {
    setManualTier(null);
    setInputs(updater);
  };

  const tiers: Tier[] = ["foundation", "command", "governance"];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12"
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
          <Calculator className="w-3 h-3" />
          {t(lang, "roi_badge")}
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {t(lang, "roi_title_1")} <span className="text-primary">{t(lang, "roi_title_accent")}</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto italic">
          {t(lang, "roi_subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Inputs */}
        <div className="lg:col-span-5">
          <Card className="rounded-[2.5rem] border-black/5 glass-card overflow-hidden">
            <CardContent className="p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                  {t(lang, "roi_params_label")}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">{t(lang, "roi_scale_label")}</p>
                <InputRow label={t(lang, "roi_shops")} field="shops" inputs={inputs} setInputs={updateInput} min={1} max={5000} />
                <InputRow label={t(lang, "roi_staff")} field="staff" inputs={inputs} setInputs={updateInput} min={1} max={200} />
                <InputRow label={t(lang, "roi_vehicles")} field="vehicles" inputs={inputs} setInputs={updateInput} min={1} max={100} />
                <InputRow label={t(lang, "roi_stops")} field="stopsPerStaff" inputs={inputs} setInputs={updateInput} min={1} />
                <InputRow label={t(lang, "roi_fuel")} field="fuelPerVehicleDay" inputs={inputs} setInputs={updateInput} prefix="₹" min={0} step={50} />
                <InputRow label={t(lang, "roi_days")} field="workingDays" inputs={inputs} setInputs={updateInput} min={1} max={31} />

                <div className="my-6 h-px bg-black/5" />

                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60 mb-2">{t(lang, "roi_financials_label")}</p>
                <InputRow label={t(lang, "roi_revenue")} field="monthlyRevenue" inputs={inputs} setInputs={updateInput} prefix="₹" min={0} step={100000} />
                <InputRow label={t(lang, "roi_margin")} field="grossMarginPct" inputs={inputs} setInputs={updateInput} suffix="%" min={0} max={100} step={0.5} />
                <InputRow label={t(lang, "roi_leakage")} field="inventoryLeakagePct" inputs={inputs} setInputs={updateInput} suffix="%" min={0} max={20} step={0.1} />
                <InputRow label={t(lang, "roi_delay")} field="collectionDelayDays" inputs={inputs} setInputs={updateInput} suffix="days" min={0} max={90} />
                <InputRow label={t(lang, "roi_credit")} field="creditOutstanding" inputs={inputs} setInputs={updateInput} prefix="₹" min={0} step={100000} />
                <InputRow label={t(lang, "roi_missed")} field="missedDeliveryPct" inputs={inputs} setInputs={updateInput} suffix="%" min={0} max={30} step={0.5} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Tier selector - show recommended first on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[...tiers]
              .sort((a, b) => {
                // On small screens, put recommended tier at the top
                // Check for window being defined for SSR safety if needed, but this is a client component
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                if (!isMobile) return 0; // Keep natural order on desktop
                return a === recommended ? -1 : b === recommended ? 1 : 0;
              })
              .map((tier) => {
                const isActive = activeTier === tier;
                const isRecommended = recommended === tier;
                return (
                  <div key={tier} className="flex flex-col items-center gap-1">
                    {/* Recommended pill badge */}
                    <div className="h-7 flex items-center justify-center">
                      <AnimatePresence mode="wait">
                        {isRecommended && (
                          <motion.span
                            key="rec-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-[9px] font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/30 whitespace-nowrap"
                          >
                            ✦ Recommended
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Tier button */}
                    <button
                      onClick={() => setManualTier(tier === manualTier ? null : tier)}
                      className={`w-full rounded-2xl py-4 sm:py-5 transition-all duration-300 flex flex-col items-center justify-center gap-1.5 ${isActive
                        ? "bg-primary text-white shadow-xl primary-glow scale-[1.02]"
                        : "glass-card text-muted-foreground hover:text-foreground hover:border-primary/20"
                        }`}
                    >
                      <span className={`font-extrabold uppercase tracking-widest ${isActive ? "text-sm sm:text-base" : "text-xs sm:text-sm"
                        }`}>
                        {TIER_PARAMS[tier].label}
                      </span>
                      <span className={`text-[9px] sm:text-[10px] font-medium leading-tight text-center px-2 ${isActive ? "text-white/80" : "text-muted-foreground/60"
                        }`}>
                        {TIER_PARAMS[tier].bandLabel}
                      </span>
                    </button>
                  </div>
                );
              })}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Impact Cards */}
            <Card className="md:col-span-2 rounded-[2.5rem] border-black/5 glass-card overflow-hidden">
              <CardContent className="p-10">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/80">{t(lang, "roi_value_label")}</p>
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>

                <div className="grid grid-cols-1 divide-y divide-black/5">
                  <LeverRow icon={Zap} label={t(lang, "roi_fuel_label")} value={result.fuelSavings} />
                  <LeverRow icon={Users} label={t(lang, "roi_staff_label")} value={result.staffSavings} />
                  <LeverRow icon={TrendingUp} label={t(lang, "roi_recovery_label")} value={result.marginRecovery} />
                  <LeverRow icon={Package} label={t(lang, "roi_leakage_label")} value={result.leakageReduction} />
                  <LeverRow icon={DollarSign} label={t(lang, "roi_cashflow_label")} value={result.cashflowBenefit} />
                </div>

                <div className="mt-10 p-6 sm:p-8 rounded-[2rem] bg-primary/10 border border-primary/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full -translate-y-16 translate-x-16" />
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-primary/80 mb-1">{t(lang, "roi_total_impact")}</p>
                      <p className="text-3xl sm:text-4xl font-black text-foreground tracking-tighter">{fmt(result.totalGain)}</p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-1">{t(lang, "roi_multiplier")}</p>
                      <p className="text-xl sm:text-2xl font-black text-primary">{result.roiMultiple.toFixed(1)}×</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-6 h-full md:col-span-2 sm:grid sm:grid-cols-2">
              {/* Payback Card */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] glass-card border-black/5 flex flex-col justify-center items-center text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">{t(lang, "roi_payback")}</p>
                <p className="text-4xl sm:text-5xl font-black text-foreground mb-2">{result.paybackDays}</p>
                <p className="text-xs font-bold text-primary uppercase">{t(lang, "roi_days_label")}</p>
              </div>

              {/* Recommendation */}
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 flex flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4 italic">{t(lang, "roi_strategic")}</p>
                <p className="text-base sm:text-lg font-bold text-foreground leading-tight mb-4">
                  {t(lang, "roi_match_text")} <span className="text-primary underline decoration-primary/30 underline-offset-4">{TIER_PARAMS[recommended].label}</span> {t(lang, "roi_match_text2")}
                </p>
                <Button className="w-full rounded-xl bg-primary hover:primary-glow font-bold h-11">
                  {t(lang, "roi_claim")} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ROICalculator;
