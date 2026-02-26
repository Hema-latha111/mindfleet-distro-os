import { BarChart3, TrendingUp, IndianRupee, Package, Users, Store, Clock, AlertTriangle, Sparkles, Filter } from "lucide-react";
import { useInvoiceStore, useInventoryStore, useStaffStore, useShopStore } from "@/store";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const Insights = () => {
  const { invoices } = useInvoiceStore();
  const { skus } = useInventoryStore();
  const { staff } = useStaffStore();
  const { shops } = useShopStore();
  const [activeTab, setActiveTab] = useState<"Business" | "Logistics" | "Staff">("Business");
  const { t } = useTranslation();

  // Staff revenue breakdown
  const staffStats = [
    { name: 'Ramesh', revenue: 142000 },
    { name: 'Rajesh', revenue: 98000 },
    { name: 'Shiva', revenue: 76000 }
  ];

  const maxStaffRevenue = Math.max(...staffStats.map(s => s.revenue));

  // Top performing staff
  const topStaff = [...staff].sort((a, b) => b.performance - a.performance).slice(0, 5);

  // Category breakdown
  const categoryBreakdown = skus.reduce((acc, sku) => {
    acc[sku.category] = (acc[sku.category] || 0) + sku.available;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('intelligenceInsights')}</h1>
          <p className="text-sm text-gray-500">{t('performanceAnalytics')} · 17 Feb 2025</p>
        </div>
        <div className="flex gap-2 rounded-xl border border-gray-100 bg-white p-1">
          {(["Business", "Logistics", "Staff"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${activeTab === tab ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t(tab.toLowerCase() as any)}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "Business" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-fade-in">
          {/* Summary Mini Cards */}
          {[
            { label: t('revStop'), value: "₹2,140", change: "+12%", icon: IndianRupee },
            { label: t('collectionEfficiency'), value: "84%", change: "+3.2%", icon: TrendingUp },
            { label: t('avgServiceTime'), value: "8.4m", change: "-0.5m", icon: Clock },
          ].map(c => (
            <div key={c.label} className="rounded-xl border border-gray-100 bg-white p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="h-8 w-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                  <c.icon className="h-4 w-4" />
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${c.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {c.change}
                </span>
              </div>
              <p className="text-xs text-gray-500">{c.label}</p>
              <p className="text-xl font-bold text-gray-900">{c.value}</p>
            </div>
          ))}

          {/* Staff Revenue */}
          <div className="lg:col-span-2 rounded-xl border border-gray-100 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <IndianRupee className="h-4 w-4 text-purple-600" />
              <h3 className="font-semibold text-gray-900">{t('revenueByStaff')}</h3>
            </div>
            <div className="space-y-4">
              {staffStats.map(({ name, revenue }) => (
                <div key={name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{name}</span>
                    <span className="text-sm font-semibold text-gray-900">₹{(revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full purple-gradient transition-all duration-700"
                      style={{ width: `${(revenue / maxStaffRevenue) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-purple-100 bg-purple-50/20 p-5 ai-glow">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-purple-600" />
              <h3 className="text-sm font-bold text-purple-900">{t('aiGrowthStrategy')}</h3>
            </div>
            <p className="text-xs text-purple-800 leading-relaxed mb-4">
              Ramesh has the highest volume but Rajesh has 14% higher average order value.
              Consider rebalancing 5 shops from Shiva to Rajesh to optimize weekend delivery capacity.
            </p>
            <button className="w-full rounded-lg bg-purple-600 text-white py-2 text-xs font-bold shadow-md hover:opacity-90">
              {t('generateGrowthDraft')}
            </button>
          </div>
        </div>
      )}

      {activeTab === "Logistics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
          {/* Inventory by Category */}
          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Package className="h-4 w-4 text-purple-600" />
              <h3 className="font-semibold text-gray-900">{t('stockDeployment')}</h3>
            </div>
            <div className="space-y-3">
              {Object.entries(categoryBreakdown).map(([cat, qty]) => {
                const total = Object.values(categoryBreakdown).reduce((s, v) => s + v, 0);
                const pct = Math.round((qty / total) * 100);
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{cat}</span>
                      <span className="text-sm font-semibold text-gray-900">{qty.toLocaleString()} units ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-purple-400 transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Shop Quality Distribution */}
          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Store className="h-4 w-4 text-purple-600" />
              <h3 className="font-semibold text-gray-900">{t('portfolioHealth')}</h3>
            </div>
            <div className="space-y-3">
              {[
                { label: "Excellent (80–100)", count: shops.filter(s => s.data_quality_score >= 80).length, color: "bg-green-500" },
                { label: "Good (60–79)", count: shops.filter(s => s.data_quality_score >= 60 && s.data_quality_score < 80).length, color: "bg-yellow-500" },
                { label: "Poor (<60)", count: shops.filter(s => s.data_quality_score < 60).length, color: "bg-red-500" },
              ].map(item => (
                <div key={item.label} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.count} shops</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color} transition-all duration-700`} style={{ width: `${(item.count / shops.length) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Staff" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in">
          {/* Staff Performance */}
          <div className="md:col-span-2 rounded-xl border border-gray-100 bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-purple-600" />
              <h3 className="font-semibold text-gray-900">{t('leaderboard')}</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topStaff.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 bg-gray-50/30">
                  <span className={`text-sm font-bold w-5 ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : i === 2 ? 'text-orange-500' : 'text-gray-300'}`}>
                    #{i + 1}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full purple-gradient text-white text-sm font-bold shrink-0">
                    {s.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 truncate">{s.name}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-gray-500">Service Score</span>
                      <span className="text-sm font-bold text-purple-600">{s.performance}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">{t('efficiencyMetrics')}</h3>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                <div className="flex items-center gap-2 text-red-700 mb-1">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold">{t('unproductiveVisits')}</span>
                </div>
                <p className="text-lg font-bold text-red-900">14.2%</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                <div className="flex items-center gap-2 text-green-700 mb-1">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-xs font-bold">{t('timeUtilization')}</span>
                </div>
                <p className="text-lg font-bold text-green-900">92.4%</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;
