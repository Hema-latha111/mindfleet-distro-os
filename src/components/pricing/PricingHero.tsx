import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";

const PricingHero = () => {
  const { lang } = useLang();
  const isTamil = lang === "ta";

  return (
    <div className="relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-[-10%] left-[10%] w-96 h-96 bg-primary rounded-full blur-[120px]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1.2 }}
          transition={{ duration: 3, delay: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-primary rounded-full blur-[150px]"
        />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="px-4 pt-16 pb-8 md:px-6 md:pt-24 md:pb-12 text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass-card text-xs font-semibold uppercase tracking-widest text-primary max-w-[90vw]"
        >
          <Sparkles className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{t(lang, "hero_badge")}</span>
        </motion.div>

        {/* H1 — Tamil uses smaller clamped size and normal tracking */}
        <h1
          className={`mx-auto max-w-4xl font-extrabold mb-8 leading-tight break-words ${isTamil
            ? "text-2xl sm:text-4xl lg:text-5xl tracking-normal"
            : "text-3xl sm:text-6xl lg:text-7xl tracking-tight"
            }`}
        >
          <span className="premium-gradient-text block">{t(lang, "hero_h1_1")}</span>
          <span className="text-foreground/90 block mt-2">{t(lang, "hero_h1_2")}</span>
        </h1>

        <p className={`mx-auto mt-6 max-w-2xl text-muted-foreground leading-relaxed break-words ${isTamil ? "text-sm md:text-base" : "text-base md:text-xl"
          }`}>
          {t(lang, "hero_subtext")}
        </p>

        {/* Tier ladder */}
        <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-2 md:gap-4 text-[10px] md:text-sm font-medium">
          <motion.span
            whileHover={{ y: -2 }}
            className="rounded-xl border border-black/5 bg-black/5 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm whitespace-nowrap"
          >
            Foundation
          </motion.span>
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/50 flex-shrink-0" />
          <motion.span
            whileHover={{ y: -2 }}
            className="rounded-xl border border-primary/20 bg-primary/10 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm text-primary whitespace-nowrap"
          >
            Command
          </motion.span>
          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground/50 flex-shrink-0" />
          <motion.span
            whileHover={{ y: -2 }}
            className="rounded-xl border border-black/5 bg-black/5 px-3 py-1.5 md:px-4 md:py-2 backdrop-blur-sm whitespace-nowrap"
          >
            Governance
          </motion.span>
        </div>

        {/* CTA Buttons — stack sooner in Tamil */}
        {/* Buttons removed as per request */}

      </motion.section>
    </div>
  );
};

export default PricingHero;
