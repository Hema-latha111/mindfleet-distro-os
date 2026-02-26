import { useState, useMemo } from "react";
import {
  MapPin, CheckCircle, Package, Navigation, Search, Filter,
  AlertTriangle, Clock, User, Layers, Activity, ArrowUpRight, TrendingUp
} from "lucide-react";
import { useStaffStore, useDispatchStore, useShopStore, useUserStore, useDraftStore } from "@/store";
import StatusBadge from "@/components/shared/StatusBadge";
import { toast } from "sonner";
import { createDraftFromAI } from "@/data/generators";
import DeliveryTable, { DeliveryRow } from "@/components/deliveries/DeliveryTable";
import ExceptionsPanel from "@/components/deliveries/ExceptionsPanel";
import MobileDeliveryList from "@/components/deliveries/MobileDeliveryList";
import RouteMap from "@/components/dispatch/RouteMap";
import { useTranslation } from "@/hooks/useTranslation";


const Deliveries = () => {
  const [activeView, setActiveView] = useState<'table' | 'map'>('table');
  const [filters, setFilters] = useState({ search: "", status: "All", staffId: "All" });

  const { staff } = useStaffStore();
  const { plan } = useDispatchStore();
  const { shops } = useShopStore();
  const { currentUser } = useUserStore();
  const { addDraft } = useDraftStore();
  const { t } = useTranslation();

  // Combine data for monitoring
  const allStops = useMemo<DeliveryRow[]>(() => {
    return plan.assignments.flatMap(a => {
      const staffMember = staff.find(s => s.id === a.staffId);
      return a.shopIds.map(shopId => {
        const shop = shops.find(sh => sh.id === shopId);
        // Mocking random status for demo purposes
        const rand = Math.random();
        let status: DeliveryRow['status'] = 'PENDING';
        if (rand > 0.8) status = 'DELIVERED';
        else if (rand > 0.7) status = 'FAILED';
        else if (rand > 0.6) status = 'SKIPPED';

        return {
          id: `${a.staffId}-${shopId}`,
          shopId,
          shopName: shop?.name || t('unknown'),
          area: shop?.area || t('unknown'),
          zone: shop?.zone || "North Zone", // Mock zone
          staffId: a.staffId,
          staffName: staffMember?.name || t('unknown'),
          status,
          eta: "14:20",
          slaRisk: Math.random() > 0.9,
          lat: shop?.lat || 13.08 + Math.random() * 0.05,
          lng: shop?.lng || 80.25 + Math.random() * 0.05,
        };
      });
    });
  }, [plan, staff, shops]);

  const filtered = useMemo(() => allStops.filter(s => {
    const matchSearch = s.shopName.toLowerCase().includes(filters.search.toLowerCase()) ||
      s.staffName.toLowerCase().includes(filters.search.toLowerCase()) ||
      s.area.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus = filters.status === "All" || s.status === filters.status;
    const matchStaff = filters.staffId === "All" || s.staffId === filters.staffId;
    return matchSearch && matchStatus && matchStaff;
  }), [allStops, filters]);

  const failedStops = useMemo(() => allStops.filter(s => s.status === 'FAILED'), [allStops]);
  const delayedStops = useMemo(() => allStops.filter(s => s.slaRisk && s.status !== 'DELIVERED' && s.status !== 'FAILED'), [allStops]);
  const completedCount = useMemo(() => allStops.filter(s => s.status === 'DELIVERED').length, [allStops]);

  const handleReassignExceptions = () => {
    const draft = createDraftFromAI('REBALANCE', currentUser.name);
    draft.description = `Reassign ${failedStops.length} failed/skipped deliveries to nearest available staff`;
    addDraft(draft);
    toast.success(t('reassignmentDraftCreated'));
  };

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{t('opsMonitoring')}</h1>
          <p className="text-sm text-gray-500 font-medium">{t('realTimeStatusOf')} {allStops.length} {t('scheduledStops')}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveView('table')}
              className={`h-9 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeView === 'table' ? "bg-white text-purple-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Layers className="h-4 w-4" /> {t('table')}
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`h-9 px-4 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${activeView === 'map' ? "bg-white text-purple-600 shadow-sm" : "text-gray-400 hover:text-gray-600"}`}
            >
              <MapPin className="h-4 w-4" /> {t('map')}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile-Only Monitoring Header */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        <div className="p-4 bg-purple-600 rounded-2xl shadow-lg shadow-purple-100 flex flex-col justify-between h-32 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 bg-white/10 h-24 w-24 rounded-full transition-transform group-hover:scale-110" />
          <div className="flex items-center justify-between relative z-10">
            <Activity className="h-5 w-5 text-purple-100" />
            <span className="text-[10px] font-black text-purple-100 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full">{t('live')}</span>
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold text-purple-100 uppercase tracking-wider mb-1 break-words line-clamp-1">{t('successRate')}</p>
            <h4 className="text-2xl font-black text-white">{Math.round((completedCount / (allStops.length || 1)) * 100)}%</h4>
          </div>
        </div>
        <div className="p-4 bg-white border border-purple-100 rounded-2xl flex flex-col justify-between h-32 hover:border-purple-300 transition-colors">
          <div className="flex items-center justify-between">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <ArrowUpRight className="h-4 w-4 text-gray-300" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 break-words line-clamp-1">{t('exceptions')}</p>
            <h4 className="text-2xl font-black text-gray-900">{failedStops.length + delayedStops.length}</h4>
          </div>
        </div>
      </div>

      {activeView === 'table' ? (
        <div className="space-y-6">
          <ExceptionsPanel
            failedStops={failedStops}
            delayedStops={delayedStops}
            onCreateReassignment={handleReassignExceptions}
          />

          <div className="hidden md:block">
            <DeliveryTable
              rows={filtered}
              filters={filters}
              onChangeFilters={setFilters}
              onOpenStop={(id) => toast.info(`Viewing details for stop ${id}`)}
            />
          </div>

          <MobileDeliveryList
            rows={filtered}
            onOpenStop={(id) => toast.info(`Viewing details for stop ${id}`)}
          />
        </div>
      ) : (
        <div className="h-[calc(100vh-16rem)] md:h-[700px] w-full rounded-3xl overflow-hidden border border-purple-100 shadow-2xl relative z-10">
          <RouteMap
            routes={[]}
            stops={filtered.map(s => ({
              stop_id: s.id,
              lat: (s as any).lat,
              lng: (s as any).lng,
              label: s.shopName,
              status: s.status
            }))}
            onSelectStaff={(id) => toast.info(`Staff ${id} selected`)}
            onSelectStop={(id) => toast.info(`Stop ${id} selected`)}
          />
        </div>
      )}
    </div>
  );
};

export default Deliveries;
