import { motion } from "framer-motion";
import { Check, X, ShieldCheck } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";

const renderCell = (value: string | boolean) => {
  if (typeof value === "boolean") {
    return value ? (
      <div className="flex justify-center">
        <Check className="h-5 w-5 text-primary" />
      </div>
    ) : (
      <div className="flex justify-center">
        <X className="h-5 w-5 text-muted-foreground/20" />
      </div>
    );
  }
  return <span className="text-sm font-medium text-foreground/80">{value}</span>;
};

const ComparisonTable = () => {
  const { lang } = useLang();

  const features = [
    { nameKey: "cmp_shops", foundation: "300", command: "800", governance: "1,500" },
    { nameKey: "cmp_staff", foundation: "5", command: "15", governance: "30" },
    { nameKey: "cmp_vehicles", foundation: "2", command: "6", governance: "15" },
    { nameKey: "cmp_warehouses", foundation: "1", command: "2", governance: "5" },
    { nameKey: "cmp_ai_dispatch", foundation: true, command: true, governance: true },
    {
      nameKey: "cmp_audit",
      foundation: t(lang, "cmp_audit_f"),
      command: t(lang, "cmp_audit_c"),
      governance: t(lang, "cmp_audit_g"),
    },
    { nameKey: "cmp_credit", foundation: false, command: true, governance: true },
    { nameKey: "cmp_warehouse_routing", foundation: false, command: false, governance: true },
    { nameKey: "cmp_compliance", foundation: false, command: false, governance: true },
    { nameKey: "cmp_custom_gov", foundation: false, command: false, governance: true },
    { nameKey: "cmp_ai_token", foundation: "150K/mo", command: "1M/mo", governance: "4M/mo" },
    {
      nameKey: "cmp_support",
      foundation: t(lang, "cmp_support_f"),
      command: t(lang, "cmp_support_c"),
      governance: t(lang, "cmp_support_g"),
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12"
    >
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
          <ShieldCheck className="w-3 h-3" />
          {t(lang, "cmp_badge")}
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {t(lang, "cmp_title_1")} <span className="text-primary">{t(lang, "cmp_title_accent")}</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto italic break-words">
          {t(lang, "cmp_subtitle")}
        </p>
      </div>

      <div className="glass-card rounded-[2rem] overflow-x-auto border-black/5">
        <table className="w-full min-w-[560px]">
          <thead>
            <tr className="bg-black/[0.01]">
              <th className="p-6 md:p-8 text-left text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {t(lang, "cmp_col_capability")}
              </th>
              <th className="p-4 md:p-8 text-center border-l border-black/5">
                <p className="text-xs md:text-sm font-bold text-foreground uppercase tracking-tighter">Foundation</p>
                <p className="text-[9px] md:text-[10px] font-medium text-muted-foreground mt-1">{t(lang, "cmp_sme")}</p>
              </th>
              <th className="p-4 md:p-8 text-center border-l border-primary/10 bg-primary/5">
                <p className="text-xs md:text-sm font-bold text-primary uppercase tracking-tighter">Command</p>
                <p className="text-[9px] md:text-[10px] font-medium text-primary/60 mt-1">{t(lang, "cmp_growth")}</p>
              </th>
              <th className="p-4 md:p-8 text-center border-l border-black/5">
                <p className="text-xs md:text-sm font-bold text-foreground uppercase tracking-tighter">Governance</p>
                <p className="text-[9px] md:text-[10px] font-medium text-muted-foreground mt-1">{t(lang, "cmp_enterprise")}</p>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {features.map((feature, i) => (
              <motion.tr
                key={feature.nameKey}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="hover:bg-black/[0.02] transition-colors"
              >
                <td className="p-5 pl-6 md:pl-8 text-sm font-semibold text-foreground/90 break-words leading-snug">
                  {t(lang, feature.nameKey as Parameters<typeof t>[1])}
                </td>
                <td className="p-4 md:p-6 text-center border-l border-black/5">{renderCell(feature.foundation)}</td>
                <td className="p-4 md:p-6 text-center border-l border-primary/10 bg-primary/[0.02]">{renderCell(feature.command)}</td>
                <td className="p-4 md:p-6 text-center border-l border-black/5">{renderCell(feature.governance)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

    </motion.section>
  );
};

export default ComparisonTable;
