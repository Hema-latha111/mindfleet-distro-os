import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Zap, ChevronRight, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { TIER_GROUPS, ADD_ONS, type TierGroup, type SubTierPlan } from "@/data/pricingData";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";

interface SubTierModalProps {
    tierName: "Foundation" | "Command" | "Governance" | null;
    onClose: () => void;
}

const fmt = (n: number) =>
    "₹" + new Intl.NumberFormat("en-IN").format(n);

const badgeColor: Record<string, string> = {
    Base: "bg-black/5 text-foreground/70 border-black/10",
    Plus: "bg-primary/10 text-primary border-primary/20",
    Pro: "bg-primary text-white border-primary shadow-lg shadow-primary/20",
};

const PlanCard = ({
    plan,
    isSelected,
    onClick,
}: {
    plan: SubTierPlan;
    isSelected: boolean;
    onClick: () => void;
}) => (
    <motion.button
        onClick={onClick}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
            "w-full text-left rounded-2xl p-5 border transition-all duration-300 cursor-pointer",
            isSelected
                ? "border-primary/40 bg-primary/5 shadow-[0_0_30px_-8px_rgba(128,23,225,0.15)]"
                : "border-black/5 bg-black/2 hover:border-black/10 hover:bg-black/5"
        )}
    >
        <div className="flex items-center justify-between mb-3">
            <span
                className={cn(
                    "text-[9px] font-black uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border",
                    badgeColor[plan.badge]
                )}
            >
                {plan.badge}
            </span>
            {isSelected && (
                <span className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                </span>
            )}
        </div>
        <p className="text-lg font-extrabold text-foreground tracking-tight">{plan.name}</p>
        <p className="text-2xl font-black text-foreground mt-1">
            <span className="text-base font-medium text-muted-foreground">₹</span>
            {new Intl.NumberFormat("en-IN").format(plan.price)}
            <span className="text-sm font-medium text-muted-foreground ml-1">/mo</span>
        </p>
        <p className="text-xs text-muted-foreground mt-1 italic">{plan.tagline}</p>
    </motion.button>
);

const FeatureList = ({ features }: { features: string[] }) => (
    <ul className="space-y-3">
        {features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                <div className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-2.5 w-2.5 text-primary" />
                </div>
                <span className={f.startsWith("Everything") ? "font-semibold text-foreground" : ""}>{f}</span>
            </li>
        ))}
    </ul>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
    <p className="text-[9px] font-black uppercase tracking-[0.22em] text-primary/70 mb-3">{children}</p>
);


const DetailPanel = ({ plan }: { plan: SubTierPlan }) => {
    const { lang } = useLang();
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={plan.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-8"
            >
                {/* Operational Scope */}
                <div>
                    <SectionLabel>{t(lang, "modal_op_scope")}</SectionLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {plan.operationalLimits.map((l) => (
                            <div
                                key={l.label}
                                className="rounded-xl bg-black/3 border border-black/5 px-4 py-3"
                            >
                                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-0.5">
                                    {l.label}
                                </p>
                                <p className="text-sm font-extrabold text-foreground">{l.value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Capabilities */}
                <div>
                    <SectionLabel>{t(lang, "modal_capabilities")}</SectionLabel>
                    <FeatureList features={plan.features} />
                </div>

                {/* AI Governance Budget */}
                <div>
                    <SectionLabel>{t(lang, "modal_ai_budget")}</SectionLabel>
                    <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5 space-y-2.5">
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-primary flex-shrink-0" />
                            <span className="text-sm font-bold text-foreground">{plan.aiTokens} {t(lang, "modal_ai_included")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{t(lang, "modal_ai_overages")} {plan.aiOverage}</span>
                        </div>
                        {plan.aiHardCap && (
                            <div className="flex items-center gap-2">
                                <Info className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                <span className="text-sm text-amber-600 font-medium">{plan.aiHardCap}</span>
                            </div>
                        )}
                        {plan.aiSoftAlert && (
                            <div className="flex items-center gap-2">
                                <Info className="w-4 h-4 text-primary/60 flex-shrink-0" />
                                <span className="text-sm text-muted-foreground">{plan.aiSoftAlert}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                                {t(lang, "modal_ai_retention")} <strong className="text-foreground">{plan.auditRetention}</strong>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Upgrade / Highlights */}
                <div>
                    <SectionLabel>
                        {plan.badge === "Pro" ? t(lang, "modal_next_signals") : t(lang, "modal_upgrade_triggers")}
                    </SectionLabel>
                    <div className="space-y-2">
                        {plan.upgradeTriggersOrHighlights.map((t) => (
                            <div
                                key={t}
                                className="flex items-center gap-3 py-2 px-4 rounded-xl bg-black/3 border border-black/5"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                                <span className="text-sm text-foreground/75">{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

const SubTierModal = ({ tierName, onClose }: SubTierModalProps) => {
    const { lang } = useLang();
    const [activePlanIdx, setActivePlanIdx] = useState(0);
    const overlayRef = useRef<HTMLDivElement>(null);

    const group: TierGroup | undefined = TIER_GROUPS.find((g) => g.tier === tierName);

    // Reset plan index whenever tier changes
    useEffect(() => {
        setActivePlanIdx(0);
    }, [tierName]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    // Prevent body scroll
    useEffect(() => {
        if (tierName) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [tierName]);

    return (
        <AnimatePresence>
            {tierName && group && (
                <motion.div
                    ref={overlayRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4"
                    onClick={(e) => {
                        if (e.target === overlayRef.current) onClose();
                    }}
                    style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)" }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full sm:max-w-5xl bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
                        style={{ maxHeight: "92vh" }}
                    >
                        {/* Header */}
                        <div className="flex-shrink-0 px-6 sm:px-10 pt-8 pb-6 border-b border-black/5">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3">
                                        <Zap className="w-3 h-3 text-primary" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-primary">
                                            {t(lang, "modal_stack_label")} {group.tier}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                                        {group.tier}{" "}
                                        <span className="text-primary">{t(lang, "modal_tier_suffix")}</span>
                                        <span className="ml-2 text-base font-semibold text-muted-foreground">
                                            {t(lang, "modal_base_plus_pro")}
                                        </span>
                                    </h2>
                                    <p className="text-sm text-muted-foreground mt-1">{group.targetDesc}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="flex-shrink-0 w-9 h-9 rounded-xl bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-4 h-4 text-foreground" />
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="px-6 sm:px-10 py-8">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    {/* Left: Plan selector */}
                                    <div className="lg:col-span-4 flex flex-col gap-4">
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-1">
                                            {t(lang, "modal_select")}
                                        </p>
                                        {group.plans.map((plan, idx) => (
                                            <PlanCard
                                                key={plan.name}
                                                plan={plan}
                                                isSelected={activePlanIdx === idx}
                                                onClick={() => setActivePlanIdx(idx)}
                                            />
                                        ))}

                                        {/* CTA for selected plan */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="mt-2 w-full h-12 rounded-2xl bg-primary text-white text-sm font-bold tracking-wide shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                                        >
                                            {t(lang, "modal_get_started")} {group.plans[activePlanIdx].badge} →
                                        </motion.button>

                                        <p className="text-[10px] text-muted-foreground/60 text-center">
                                            {t(lang, "modal_note")}
                                        </p>
                                    </div>

                                    {/* Right: Detail panel */}
                                    <div className="lg:col-span-8">
                                        <DetailPanel plan={group.plans[activePlanIdx]} />
                                    </div>
                                </div>

                                {/* Add-ons */}
                                <div className="mt-12 pt-8 border-t border-black/5">
                                    <p className="text-[9px] font-black uppercase tracking-[0.22em] text-muted-foreground/60 mb-6">
                                        {t(lang, "modal_addons")}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {ADD_ONS.map((addon) => (
                                            <div
                                                key={addon.name}
                                                className="rounded-2xl border border-black/5 bg-black/2 p-5 hover:border-primary/20 hover:bg-primary/3 transition-all group"
                                            >
                                                <div className="text-2xl mb-3">{addon.icon}</div>
                                                <p className="text-sm font-bold text-foreground mb-1">{addon.name}</p>
                                                <p className="text-xs font-black text-primary mb-2">{addon.price}</p>
                                                <p className="text-xs text-muted-foreground leading-relaxed">{addon.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SubTierModal;
