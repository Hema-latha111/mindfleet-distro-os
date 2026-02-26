import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";

export interface PricingTier {
  name: string;
  band: string;
  bandKey?: string;
  monthlyPrice: number | null;
  priceLabel?: string;
  priceRange?: string;
  description: string;
  features: string[];
  cta: string;
  ctaKey?: string;
  popular?: boolean;
  subTiers?: string[];
}

interface PricingCardProps {
  tier: PricingTier;
  isYearly: boolean;
  index: number;
  onCtaClick?: () => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN").format(price);
};

const PricingCard = ({ tier, isYearly, index, onCtaClick }: PricingCardProps) => {
  const { lang } = useLang();
  const isTamil = lang === "ta";

  const displayPrice = tier.monthlyPrice
    ? isYearly
      ? Math.round(tier.monthlyPrice * 0.8)
      : tier.monthlyPrice
    : null;

  const bandLabel = tier.bandKey ? t(lang, tier.bandKey as Parameters<typeof t>[1]) : tier.band;
  const ctaLabel = tier.ctaKey ? t(lang, tier.ctaKey as Parameters<typeof t>[1]) : tier.cta;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="flex h-full"
    >
      <Card
        className={cn(
          "relative flex h-full flex-col overflow-hidden transition-all duration-500 glass-card group",
          tier.popular
            ? "border-primary/50 shadow-[0_0_40px_-10px_rgba(128,23,225,0.2)] ring-1 ring-primary/30"
            : "border-black/5 hover:border-black/10"
        )}
      >
        {tier.popular && (
          <div className="absolute top-0 right-0 z-10 h-24 w-24 overflow-hidden pointer-events-none">
            <div className="absolute top-4 right-[-32px] w-[140%] rotate-45 bg-primary py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-primary/20">
              {t(lang, "card_popular")}
            </div>
          </div>
        )}

        <CardHeader className="space-y-3 p-6 md:p-8 pb-4 flex flex-col items-center text-center">
          <div className="flex flex-col items-center gap-2">
            <div className={cn(
              "p-2 rounded-lg",
              tier.popular ? "bg-primary/20 text-primary" : "bg-black/5 text-muted-foreground"
            )}>
              <Zap className="w-4 h-4" />
            </div>
            {/* Band label — auto-wraps in Tamil */}
            <p className={cn(
              "font-bold uppercase tracking-[0.15em] text-muted-foreground/80 leading-snug break-words max-w-[90%]",
              isTamil ? "text-[9px] tracking-[0.05em]" : "text-xs tracking-[0.2em]"
            )}>
              {bandLabel}
            </p>
          </div>

          <h3 className="text-2xl font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
            {tier.name}
          </h3>

          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-1 justify-center">
              {displayPrice !== null ? (
                <>
                  <span className="text-xl font-medium text-muted-foreground">₹</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={displayPrice}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="text-5xl font-black tracking-tighter text-foreground"
                    >
                      {formatPrice(displayPrice)}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm font-medium text-muted-foreground ml-1">/mo</span>
                </>
              ) : (
                <span className="text-4xl font-black tracking-tighter text-foreground">
                  {tier.priceLabel || "Custom"}
                </span>
              )}
            </div>
            {tier.priceRange && (
              <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-widest italic">
                {isYearly ? t(lang, "card_price_range_annual") : t(lang, "card_price_range_monthly")}
              </p>
            )}
          </div>

          <p className={cn(
            "text-muted-foreground leading-relaxed italic px-2 break-words",
            isTamil ? "text-xs" : "text-sm"
          )}>
            {tier.description}
          </p>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col p-6 md:p-8 pt-6">
          <div className="space-y-4 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
              {t(lang, "card_whats_included")}
            </p>
            <ul className="space-y-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 group/feat">
                  <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center group-hover/feat:bg-primary/20 transition-colors">
                    <Check className="h-2.5 w-2.5 text-primary" />
                  </div>
                  <span className={cn(
                    "text-foreground/80 break-words group-hover/feat:text-primary transition-colors leading-relaxed",
                    isTamil ? "text-xs" : "text-sm"
                  )}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {tier.subTiers && (
            <div className="mt-6 pt-6 border-t border-black/5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-3">
                {t(lang, "card_subtiers_label")}
              </p>
              <div className="flex flex-wrap gap-2">
                {tier.subTiers.map((sub) => (
                  <span
                    key={sub}
                    className="rounded-lg border border-black/5 bg-black/5 px-2 py-1 text-[9px] md:text-[10px] font-bold text-muted-foreground/80 hover:bg-black/10 hover:text-primary transition-all cursor-default"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={onCtaClick}
            className={cn(
              "mt-6 w-full rounded-xl font-bold transition-all duration-300 break-words whitespace-normal h-auto py-3",
              isTamil ? "text-sm" : "text-base",
              tier.popular
                ? "bg-primary text-primary-foreground hover:primary-glow hover:bg-primary/90"
                : "bg-black/5 text-foreground hover:bg-black/10 border border-black/5"
            )}
            variant={tier.popular ? "default" : "secondary"}
            size="lg"
          >
            {ctaLabel}
          </Button>

        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PricingCard;
