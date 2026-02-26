export interface SubTierPlan {
    name: string;
    badge: string; // "Base" | "Plus" | "Pro"
    price: number;
    tagline: string;
    operationalLimits: { label: string; value: string }[];
    features: string[];
    aiTokens: string;
    aiOverage: string;
    aiHardCap?: string;
    aiSoftAlert?: string;
    auditRetention: string;
    upgradeTriggersOrHighlights: string[];
}

export interface TierGroup {
    tier: "Foundation" | "Command" | "Governance";
    tagline: string;
    accentColor: string;
    targetDesc: string;
    plans: SubTierPlan[];
}

export const TIER_GROUPS: TierGroup[] = [
    {
        tier: "Foundation",
        tagline: "Control your day",
        accentColor: "#8017E1",
        targetDesc: "Micro & small distributors · 50–300 shops · 1–5 staff · 1–2 vehicles",
        plans: [
            {
                name: "Foundation Base",
                badge: "Base",
                price: 19999,
                tagline: "Control your day",
                operationalLimits: [
                    { label: "Shops", value: "Up to 300" },
                    { label: "Staff users", value: "5" },
                    { label: "Vehicles", value: "2" },
                    { label: "Dispatch runs/day", value: "2" },
                    { label: "SKUs", value: "300" },
                    { label: "Warehouses", value: "1" },
                ],
                features: [
                    "Deterministic dispatch engine (draft → approve → execute)",
                    "Route ordering + SLA targets",
                    "Staff mobile route execution",
                    "Shops registry + cadence",
                    "FIFO inventory ledger (basic)",
                    "Invoice + payment recording",
                    "Tamil / English UI",
                    "Role-based access control (Admin / Manager / Staff)",
                ],
                aiTokens: "150,000 tokens/month",
                aiOverage: "₹0.30 per 1,000 tokens",
                aiHardCap: "Hard cap at 2,50,000 tokens",
                auditRetention: "90 days",
                upgradeTriggersOrHighlights: [
                    "Overrides > 15/week",
                    "Dispatch/day ≥ 3",
                    "Shops > 250 consistently",
                    "Owner demanding reports manually",
                ],
            },
            {
                name: "Foundation+",
                badge: "Plus",
                price: 29999,
                tagline: "Control your day — enhanced",
                operationalLimits: [
                    { label: "Shops", value: "Up to 400" },
                    { label: "Staff users", value: "8" },
                    { label: "Vehicles", value: "3" },
                    { label: "Dispatch runs/day", value: "3" },
                    { label: "SKUs", value: "500" },
                    { label: "Warehouses", value: "1" },
                ],
                features: [
                    "Everything in Foundation Base, plus:",
                    "Override diff tracking + reason taxonomy",
                    "Rollback support",
                    "Dispatch performance telemetry",
                    "SLA breach alerts",
                    "Route imbalance scoring",
                    "Data quality score",
                    "Weekly performance digest (auto-generated)",
                ],
                aiTokens: "3,00,000 tokens/month",
                aiOverage: "₹0.25 per 1,000 tokens",
                aiSoftAlert: "Soft alert at 80% usage",
                auditRetention: "180 days",
                upgradeTriggersOrHighlights: [
                    "Credit exposure rising",
                    "Owner wants collections visibility",
                    "3 vehicles in use",
                ],
            },
            {
                name: "Foundation Pro",
                badge: "Pro",
                price: 39999,
                tagline: "Full foundation control",
                operationalLimits: [
                    { label: "Shops", value: "Up to 500" },
                    { label: "Staff users", value: "10" },
                    { label: "Vehicles", value: "4" },
                    { label: "Dispatch runs/day", value: "4" },
                    { label: "SKUs", value: "750" },
                    { label: "Warehouses", value: "1" },
                ],
                features: [
                    "Everything in Foundation+, plus:",
                    "Owner Executive Snapshot (cash + ops)",
                    "Aging buckets (basic credit visibility)",
                    "Audit-grade journal exports (AGORA artifacts)",
                    "Performance ROI summary (fuel/time variance)",
                    "Exception cluster reports",
                ],
                aiTokens: "5,00,000 tokens/month",
                aiOverage: "₹0.20 per 1,000 tokens",
                auditRetention: "1 year",
                upgradeTriggersOrHighlights: [
                    "Ready for Command tier",
                    "Multi-dispatch needs arising",
                    "Scaling past 500 shops",
                ],
            },
        ],
    },
    {
        tier: "Command",
        tagline: "Control your operations",
        accentColor: "#8017E1",
        targetDesc: "Scaling distributors · 300–800 shops · 5–15 staff · 3–6 vehicles",
        plans: [
            {
                name: "Command Base",
                badge: "Base",
                price: 49999,
                tagline: "Operational command",
                operationalLimits: [
                    { label: "Shops", value: "Up to 800" },
                    { label: "Staff users", value: "15" },
                    { label: "Vehicles", value: "6" },
                    { label: "Dispatch runs/day", value: "6" },
                    { label: "SKUs", value: "1,500" },
                    { label: "Warehouses", value: "2" },
                ],
                features: [
                    "Everything in Foundation Pro, plus:",
                    "Multi-dispatch orchestration",
                    "Workload-aware allocation tuning",
                    "Batch-level inventory (expiry awareness)",
                    "Advanced stop balancing weights",
                    "Staff utilization metrics",
                    "Performance benchmarking (within tenant)",
                ],
                aiTokens: "1M tokens/month",
                aiOverage: "₹0.18 per 1,000 tokens",
                auditRetention: "2 years",
                upgradeTriggersOrHighlights: [
                    "Credit risk visibility needed",
                    "Dead stock becoming a concern",
                    "Intervention recommendations desired",
                ],
            },
            {
                name: "Command+",
                badge: "Plus",
                price: 69999,
                tagline: "Intelligence layer unlocked",
                operationalLimits: [
                    { label: "Shops", value: "Up to 800" },
                    { label: "Staff users", value: "15" },
                    { label: "Vehicles", value: "6" },
                    { label: "Dispatch runs/day", value: "6" },
                    { label: "SKUs", value: "1,500" },
                    { label: "Warehouses", value: "2" },
                ],
                features: [
                    "Everything in Command Base, plus:",
                    "Credit risk heuristic scoring",
                    "Dead stock identification",
                    "Margin leakage estimator",
                    "Auto-suggest intervention (approval required)",
                    "Exception severity ranking",
                    "Monthly operating review export",
                ],
                aiTokens: "1.5M tokens/month",
                aiOverage: "₹0.15 per 1,000 tokens",
                auditRetention: "2 years",
                upgradeTriggersOrHighlights: [
                    "Policy-based dispatch constraints",
                    "Credit hold logic needed",
                    "Advanced override governance required",
                ],
            },
            {
                name: "Command Pro",
                badge: "Pro",
                price: 89999,
                tagline: "Full operational governance",
                operationalLimits: [
                    { label: "Shops", value: "Up to 800" },
                    { label: "Staff users", value: "15" },
                    { label: "Vehicles", value: "6" },
                    { label: "Dispatch runs/day", value: "6" },
                    { label: "SKUs", value: "1,500" },
                    { label: "Warehouses", value: "2" },
                ],
                features: [
                    "Everything in Command+, plus:",
                    "Intervention engine (approve structured actions)",
                    "Policy-based dispatch constraints",
                    "Credit hold logic (approval gated)",
                    "Advanced override governance",
                    "3-year audit retention",
                    "Priority support SLA",
                ],
                aiTokens: "2.5M tokens/month",
                aiOverage: "₹0.12 per 1,000 tokens",
                auditRetention: "3 years",
                upgradeTriggersOrHighlights: [
                    "Multi-warehouse routing needed",
                    "Regional SLA policies required",
                    "Hierarchical approvals at scale",
                ],
            },
        ],
    },
    {
        tier: "Governance",
        tagline: "Control your business",
        accentColor: "#8017E1",
        targetDesc: "Large & multi-location distributors · Enterprise scale",
        plans: [
            {
                name: "Governance Base",
                badge: "Base",
                price: 109999,
                tagline: "Enterprise operations",
                operationalLimits: [
                    { label: "Shops", value: "Up to 1,500" },
                    { label: "Staff users", value: "30" },
                    { label: "Vehicles", value: "15" },
                    { label: "Warehouses", value: "5" },
                    { label: "Dispatch runs/day", value: "Unlimited" },
                    { label: "SKUs", value: "Unlimited" },
                ],
                features: [
                    "Everything in Command Pro, plus:",
                    "Multi-warehouse routing",
                    "Regional SLA policies",
                    "Hierarchical approval chains",
                    "Custom role definitions",
                    "Dedicated tenant performance dashboard",
                ],
                aiTokens: "4M tokens/month",
                aiOverage: "₹0.10 per 1,000 tokens",
                auditRetention: "5 years",
                upgradeTriggersOrHighlights: [
                    "Policy templating needed",
                    "Working capital optimization",
                    "Branch-level benchmarking required",
                ],
            },
            {
                name: "Governance+",
                badge: "Plus",
                price: 149999,
                tagline: "Strategic governance layer",
                operationalLimits: [
                    { label: "Shops", value: "Up to 1,500" },
                    { label: "Staff users", value: "30" },
                    { label: "Vehicles", value: "15" },
                    { label: "Warehouses", value: "5" },
                    { label: "Dispatch runs/day", value: "Unlimited" },
                    { label: "SKUs", value: "Unlimited" },
                ],
                features: [
                    "Everything in Governance Base, plus:",
                    "Policy templating library",
                    "Advanced credit governance engine",
                    "Working capital optimization view",
                    "Branch-level benchmarking",
                    "Dedicated onboarding specialist",
                ],
                aiTokens: "6M tokens/month",
                aiOverage: "₹0.08 per 1,000 tokens",
                auditRetention: "5 years",
                upgradeTriggersOrHighlights: [
                    "Custom governance workflows needed",
                    "Compliance export packs",
                    "SLA-backed uptime required",
                ],
            },
            {
                name: "Governance Pro",
                badge: "Pro",
                price: 199999,
                tagline: "Maximum governance & compliance",
                operationalLimits: [
                    { label: "Shops", value: "Unlimited" },
                    { label: "Staff users", value: "Unlimited" },
                    { label: "Vehicles", value: "Unlimited" },
                    { label: "Warehouses", value: "Unlimited" },
                    { label: "Dispatch runs/day", value: "Unlimited" },
                    { label: "SKUs", value: "Unlimited" },
                ],
                features: [
                    "Everything in Governance+, plus:",
                    "Custom governance workflows (TAP policies)",
                    "Compliance export packs",
                    "Quarterly strategic reviews",
                    "Partner integration toolkit",
                    "SLA-backed uptime & response",
                    "Dedicated CSM",
                ],
                aiTokens: "10M tokens/month",
                aiOverage: "₹0.05 per 1,000 tokens",
                auditRetention: "Unlimited",
                upgradeTriggersOrHighlights: [
                    "Maximum enterprise capability",
                    "Full policy customization",
                    "Dedicated customer success management",
                ],
            },
        ],
    },
];

export const ADD_ONS = [
    {
        name: "Intelligence Add-On Pack",
        price: "₹35,000–₹75,000/mo",
        description: "Advanced demand prediction, cashflow modeling, forecast variance alerts",
        icon: "🧠",
    },
    {
        name: "Extra Warehouse",
        price: "₹15,000/mo",
        description: "Per additional warehouse beyond your tier limit",
        icon: "🏭",
    },
    {
        name: "Extended Audit Retention",
        price: "₹10,000/2 years",
        description: "Per additional 2 years beyond your tier retention window",
        icon: "📋",
    },
    {
        name: "API Integration Pack",
        price: "₹25,000/mo",
        description: "ERP integrations, accounting sync, custom data exports",
        icon: "🔗",
    },
    {
        name: "Benchmark Network Access",
        price: "₹20,000/mo",
        description: "Industry benchmarking view, anonymized performance comparisons",
        icon: "📊",
    },
];
