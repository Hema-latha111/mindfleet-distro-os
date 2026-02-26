import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";

interface BillingToggleProps {
  isYearly: boolean;
  onToggle: (yearly: boolean) => void;
}

const BillingToggle = ({ isYearly, onToggle }: BillingToggleProps) => {
  const { lang } = useLang();
  const isTamil = lang === "ta";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 pb-8 md:pb-12 px-4">
      <div className="flex items-center p-1.5 rounded-2xl glass-card relative overflow-hidden">
        <motion.div
          animate={{ x: isYearly ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] bg-primary/20 rounded-xl"
        />

        <button
          onClick={() => onToggle(false)}
          className={`relative z-10 py-2.5 text-sm font-semibold transition-colors duration-300 rounded-xl ${isTamil ? "px-3 text-xs" : "px-6"
            } ${!isYearly ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          {t(lang, "billing_monthly")}
        </button>

        <button
          onClick={() => onToggle(true)}
          className={`relative z-10 py-2.5 text-sm font-semibold transition-colors duration-300 rounded-xl flex items-center gap-1.5 ${isTamil ? "px-3 text-xs" : "px-6"
            } ${isYearly ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          {t(lang, "billing_yearly")}
          <Badge
            variant="secondary"
            className="bg-primary text-primary-foreground border-none text-[10px] px-1.5 py-0 h-4 uppercase font-bold tracking-tighter flex-shrink-0"
          >
            -20%
          </Badge>
        </button>
      </div>

      <div className="hidden md:block">
        <p className={`text-xs font-medium text-muted-foreground/60 leading-tight text-center md:text-left ${isTamil ? "max-w-[160px]" : "max-w-[120px]"}`}>
          {t(lang, "billing_save")}
        </p>
      </div>
    </div>
  );
};

export default BillingToggle;
