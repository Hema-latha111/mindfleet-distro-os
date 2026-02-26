import { Link } from "react-router-dom";
import {
  Sparkles, TrendingUp, Package, Store, Users, FileText,
  IndianRupee, AlertTriangle, CheckCircle, Clock, Truck, Activity
} from "lucide-react";
import { useInventoryStore, useInvoiceStore, useShopStore, useStaffStore, useDraftStore } from "@/store";
import StatusBadge from "@/components/shared/StatusBadge";
import { useTranslation } from "@/hooks/useTranslation";

const Dashboard = () => {
  const { skus } = useInventoryStore();
  const { invoices } = useInvoiceStore();
  const { shops } = useShopStore();
  const { staff } = useStaffStore();
  const { drafts } = useDraftStore();
  const { t } = useTranslation();

  // Calculate KPI values
  const dispatchRun = { status: 'IN_PROGRESS', planned: 22, approved: 18, progress: 12, completed: 8 };
  const deliveryStats = { delivered: 312, pending: 110, failed: 6 };
  const slaRisks = 4;
  const inventoryRisks = skus.filter(s => s.available < 50).length;
  const lowStockCount = skus.filter(s => s.lowStock).length;
  const dataQualityRisks = shops.filter(s => !s.lat || !s.lng || !s.phone).length;
  const staffUtil = 28; // avg stops per staff

  const kpis = [
    { label: t('dispatchStatus'), value: t('inProgress'), icon: Truck, color: "text-purple-600", bg: "bg-purple-0", change: `12 / 18 ${t('approved')}`, path: "/dispatch" },
    { label: t('deliveryProgress'), value: "73%", icon: CheckCircle, color: "text-purple-600", bg: "bg-green-0", change: `312 ${t('delivered')}`, path: "/deliveries" },
    { label: t('slaRisk'), value: slaRisks, icon: AlertTriangle, color: "text-purple-600", bg: "bg-red-0", change: t('highPriority'), path: "/insights" },
    { label: t('inventoryRisk'), value: inventoryRisks, icon: Package, color: "text-purple-600", bg: "bg-orange-0", change: t('stockoutAlerts'), path: "/inventory" },
    { label: t('dataQuality'), value: dataQualityRisks, icon: Activity, color: "text-purple-600", bg: "bg-blue-0", change: t('missingGpsPhone'), path: "/shops" },
    { label: t('staffUtilization'), value: `${staffUtil}`, icon: Users, color: "text-purple-600", bg: "bg-purple-0", change: t('avgStopsStaff'), path: "/staff" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard')}</h1>
        <p className="text-sm text-gray-500">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} · {t('realTimeOverview')}</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        {kpis.map((kpi) => (
          <Link
            key={kpi.label}
            to={kpi.path}
            className="group relative rounded-2xl border border-purple-50 bg-white p-4 sm:p-5 shadow-sm transition-all hover:border-purple-200 hover:shadow-xl hover:shadow-purple-100/50 hover:-translate-y-1 block overflow-hidden"
          >
            {/* Subtle background glow on hover */}
            <div className={`absolute -right-4 -top-4 h-16 w-16 opacity-0 group-hover:opacity-10 transition-opacity rounded-full ${kpi.bg}`} />

            <div className="flex flex-col gap-2 mb-3 sm:mb-4">
              <div className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl shrink-0 ${kpi.color.replace('text', 'bg').replace('600', '100')} ${kpi.color}`}>
                <kpi.icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[7px] sm:text-[9px] font-black text-gray-400 uppercase tracking-widest break-words line-clamp-2 leading-tight">
                  {kpi.change}
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-xl sm:text-2xl font-black text-gray-900 leading-tight">{kpi.value ?? ''}</p>
              <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-normal break-words line-clamp-2">
                {kpi.label}
              </p>
            </div>

            <div className="mt-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[8px] sm:text-[9px] font-black text-purple-600 uppercase tracking-widest">View details</span>
              <TrendingUp className="h-2.5 w-2.5 text-purple-400" />
            </div>
          </Link>
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Drafts */}
        <div className="rounded-2xl border border-purple-50 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{t('recentDrafts')}</h3>
            <span className="rounded-full bg-purple-50 px-2 py-1 text-[10px] font-black text-purple-600 uppercase tracking-widest">{drafts.length} {t('total')}</span>
          </div>
          <div className="space-y-4">
            {drafts.slice(0, 1).map(draft => (
              <div key={draft.id} className="group flex items-center gap-4 py-2 hover:bg-purple-50/30 transition-colors rounded-xl -mx-2 px-2 cursor-pointer">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100/50 text-purple-600 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0 pr-2">
                  <p className="text-sm font-black text-gray-900 truncate">{t(draft.title as any) || draft.title}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{draft.confidence}% {t('confidence')}</p>
                </div>
                <div className="shrink-0">
                  <StatusBadge status={draft.status} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Alerts */}
        <div className="rounded-2xl border border-purple-50 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{t('inventoryAlerts')}</h3>
            <span className="rounded-full bg-red-50 px-2 py-1 text-[10px] font-black text-red-500 uppercase tracking-widest">{lowStockCount} {t('lowStock')}</span>
          </div>
          <div className="space-y-4">
            {skus.filter(s => s.lowStock).slice(0, 3).map(sku => (
              <div key={sku.id} className="flex items-center gap-4 py-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100/50 text-red-500 shrink-0">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-end mb-1.5">
                    <p className="text-sm font-black text-gray-900 truncate">{sku.name}</p>
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest">{sku.available} / {sku.threshold}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-50 overflow-hidden">
                    <div className="h-full rounded-full bg-red-500 transition-all duration-1000" style={{ width: `${(sku.available / sku.threshold) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
            {lowStockCount === 0 && (
              <div className="flex flex-col items-center gap-3 py-8 text-center bg-green-50/50 rounded-2xl border border-dashed border-green-100">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-green-900 uppercase tracking-tight">{t('allStockHealthy')}</p>
                  <p className="text-[10px] font-bold text-green-600 opacity-60">No immediate replenishment needed</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Staff Performance */}
        <div className="rounded-2xl border border-purple-50 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{t('staffPerformance')}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {staff.slice(0, 4).map(s => (
              <div key={s.id} className="group flex items-center gap-3 p-3 rounded-xl border border-gray-50 hover:border-purple-100 transition-all hover:bg-purple-50/20">
                <div className="flex h-10 w-10 items-center justify-center rounded-full purple-gradient text-white text-xs font-black shadow-lg shadow-purple-200 shrink-0">
                  {s.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-xs font-black text-gray-800 truncate">{s.name}</p>
                    <span className="text-[10px] font-black text-purple-600">{s.performance}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full rounded-full purple-gradient transition-all duration-1000" style={{ width: `${s.performance}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Summary */}
        <div className="rounded-2xl border border-purple-50 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{t('invoiceStatus')}</h3>
          </div>
          <div className="space-y-4">
            {(['DRAFT', 'SENT', 'PARTIAL', 'PAID'] as const).map(status => {
              const count = invoices.filter(i => i.status === status).length;
              const pct = Math.round((count / invoices.length) * 100);
              const colorClass = status === 'PAID' ? 'bg-green-500' :
                status === 'PARTIAL' ? 'bg-yellow-500' :
                  status === 'SENT' ? 'bg-blue-500' : 'bg-gray-300';
              return (
                <div key={status} className="flex items-center gap-4 lg:gap-6">
                  <div className="w-24 shrink-0">
                    <StatusBadge status={status} size="sm" />
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-gray-50 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${colorClass} transition-all duration-1000`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 w-20 text-right uppercase tracking-widest">{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
