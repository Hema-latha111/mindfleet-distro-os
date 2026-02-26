import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";

const FinalCTA = () => {
  const { lang } = useLang();
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="px-4 py-8 md:px-6 md:py-12 text-center"
    >
      <div className="mx-auto max-w-4xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 relative overflow-hidden glass-card border-primary/20 shadow-[0_0_50px_-20px_rgba(128,23,225,0.4)]">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-primary/5 -z-10" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[80px] rounded-full"
        />

        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary">
          <Sparkles className="w-3 h-3" />
          {t(lang, "cta_badge")}
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl mb-6">
          {t(lang, "cta_title_1")}{" "}
          <span className="premium-gradient-text">{t(lang, "cta_title_accent") || "Scale?"}</span>
        </h2>
        <p className="mt-4 text-base md:text-xl text-muted-foreground max-w-lg mx-auto italic">
          {t(lang, "cta_subtitle")}
        </p>

        {/* CTA section removed as per request */}

      </div>
    </motion.section>
  );
};

export default FinalCTA;
