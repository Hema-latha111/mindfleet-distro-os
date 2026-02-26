import { motion } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";

const PARTNERS = [
  "Shree Logistics",
  "Dakshin Distro",
  "Metro Supply Co",
  "Tamilnadu Traders",
  "Apex Distributors"
];

const TrustSection = () => {
  const { lang } = useLang();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="px-4 py-8 md:px-6 md:py-12"
    >
      <p className="mb-12 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">
        {t(lang, "trust_label")}
      </p>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-10">
        {PARTNERS.map((name, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="flex h-12 px-6 items-center justify-center rounded-xl glass-card text-xs font-black text-muted-foreground/80 hover:text-primary transition-all cursor-default border-black/5"
          >
            {name}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TrustSection;
