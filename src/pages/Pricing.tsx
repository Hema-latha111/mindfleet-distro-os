import { useState } from "react";
import Navbar from "@/components/pricing/Navbar";
import PricingHero from "@/components/pricing/PricingHero";
import BillingToggle from "@/components/pricing/BillingToggle";
import PricingCard, { type PricingTier } from "@/components/pricing/PricingCard";
import ComparisonTable from "@/components/pricing/ComparisonTable";
import TrustSection from "@/components/pricing/TrustSection";
import FAQSection from "@/components/pricing/FAQSection";
import FinalCTA from "@/components/pricing/FinalCTA";
import ROICalculator from "@/components/pricing/ROICalculator";
import SubTierModal from "@/components/pricing/SubTierModal";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";

type ModalTier = "Foundation" | "Command" | "Governance" | null;

const Pricing = ({ isInternal = false }: { isInternal?: boolean }) => {
  const [isYearly, setIsYearly] = useState(false);
  const [modalTier, setModalTier] = useState<ModalTier>(null);
  const { lang } = useLang();

  // Build tiers dynamically so features + descriptions switch with lang
  const tiers: PricingTier[] = [
    {
      name: "Foundation",
      band: "Control your day",
      bandKey: "tier_foundation_band",
      monthlyPrice: 19999,
      description: t(lang, "tier_foundation_desc"),
      features: [
        t(lang, "f_f1"), t(lang, "f_f2"), t(lang, "f_f3"),
        t(lang, "f_f4"), t(lang, "f_f5"), t(lang, "f_f6"),
        t(lang, "f_f7"), t(lang, "f_f8"), t(lang, "f_f9"), t(lang, "f_f10"),
      ],
      cta: "Start Foundation",
      ctaKey: "card_start_foundation",
      subTiers: ["Foundation Base", "Foundation+", "Foundation Pro"],
      priceRange: "₹19,999 – ₹39,999 / mo",
    },
    {
      name: "Command",
      band: "Control your operations",
      bandKey: "tier_command_band",
      monthlyPrice: 49999,
      description: t(lang, "tier_command_desc"),
      features: [
        t(lang, "c_f1"), t(lang, "c_f2"), t(lang, "c_f3"),
        t(lang, "c_f4"), t(lang, "c_f5"), t(lang, "c_f6"),
        t(lang, "c_f7"), t(lang, "c_f8"), t(lang, "c_f9"), t(lang, "c_f10"),
      ],
      cta: "Start Command",
      ctaKey: "card_start_command",
      popular: true,
      subTiers: ["Command Base", "Command+", "Command Pro"],
      priceRange: "₹49,999 – ₹89,999 / mo",
    },
    {
      name: "Governance",
      band: "Control your business",
      bandKey: "tier_governance_band",
      monthlyPrice: 109999,
      description: t(lang, "tier_governance_desc"),
      features: [
        t(lang, "g_f1"), t(lang, "g_f2"), t(lang, "g_f3"),
        t(lang, "g_f4"), t(lang, "g_f5"), t(lang, "g_f6"),
        t(lang, "g_f7"), t(lang, "g_f8"), t(lang, "g_f9"), t(lang, "g_f10"),
      ],
      cta: "Start Governance",
      ctaKey: "card_start_governance",
      subTiers: ["Governance Base", "Governance+", "Governance Pro"],
      priceRange: "₹1,09,999 – ₹1,99,999 / mo",
    },
  ];

  const handleCtaClick = (tierName: string) => {
    if (tierName === "Foundation" || tierName === "Command" || tierName === "Governance") {
      setModalTier(tierName);
    }
  };

  return (
    <main className={`min-h-screen bg-background pb-20 overflow-x-hidden ${isInternal ? "p-4 md:p-6" : ""}`}>
      {isInternal && (
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold premium-gradient-text tracking-tight inline-block">
            {t(lang, "pricing")}
          </h1>
        </div>
      )}
      {!isInternal && <Navbar />}
      {!isInternal && (
        <div className="pt-12 md:pt-16">
          <PricingHero />
        </div>
      )}

      <BillingToggle isYearly={isYearly} onToggle={setIsYearly} />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 pb-8 md:px-6 md:pb-12 md:grid-cols-3">
        {tiers.map((tier, i) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            isYearly={isYearly}
            index={i}
            onCtaClick={() => handleCtaClick(tier.name)}
          />
        ))}
      </section>

      {/* Sub-tier note */}
      <div className="mx-auto max-w-4xl px-4 pb-8 md:px-6 md:pb-12 text-center">
        <p className="text-sm text-muted-foreground break-words">
          {t(lang, "subtier_note")}{" "}
          <span className="text-foreground font-medium cursor-pointer hover:underline">
            {t(lang, "subtier_talk")}
          </span>
        </p>
      </div>

      <ComparisonTable />
      <ROICalculator />
      {!isInternal && <TrustSection />}
      {!isInternal && <FAQSection />}
      {!isInternal && <FinalCTA />}

      <SubTierModal tierName={modalTier} onClose={() => setModalTier(null)} />
    </main>
  );
};

export default Pricing;
