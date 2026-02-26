import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";

const FAQSection = () => {
  const { lang } = useLang();

  const faqs = [
    { q: t(lang, "faq_q1"), a: t(lang, "faq_a1") },
    { q: t(lang, "faq_q2"), a: t(lang, "faq_a2") },
    { q: t(lang, "faq_q3"), a: t(lang, "faq_a3") },
    { q: t(lang, "faq_q4"), a: t(lang, "faq_a4") },
    { q: t(lang, "faq_q5"), a: t(lang, "faq_a5") },
    { q: t(lang, "faq_q6"), a: t(lang, "faq_a6") },
    { q: t(lang, "faq_q7"), a: t(lang, "faq_a7") },
    { q: t(lang, "faq_q8"), a: t(lang, "faq_a8") },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mx-auto max-w-3xl px-4 py-8 md:px-6 md:py-12"
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
          <HelpCircle className="w-3 h-3" />
          {t(lang, "faq_badge")}
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
          {t(lang, "faq_title_1")} <span className="text-primary">{t(lang, "faq_title_accent")}</span>
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="border border-black/5 glass-card rounded-2xl px-6 overflow-hidden"
          >
            <AccordionTrigger className="text-left text-sm md:text-base font-bold text-foreground/90 hover:text-primary transition-colors py-4 md:py-6 hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-6 pr-4 italic">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.section>
  );
};

export default FAQSection;
