import { useState, useMemo } from "react";
import { Users, Search, TrendingUp, AlertTriangle, Plus, UserMinus, MapPin } from "lucide-react";
import { useStaffStore, useDispatchStore, useShopStore, useUserStore, useDraftStore } from "@/store";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import { toast } from "sonner";
import { createDraftFromAI } from "@/data/generators";
import { useTranslation } from "@/hooks/useTranslation";

import StaffList from "@/components/staff/StaffList";
import CapacityEditor from "@/components/staff/CapacityEditor";
import StaffAddModal from "@/components/staff/StaffAddModal";

const Staff = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "On Leave" | "Inactive">("all");
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);
  const [isCapacityEditorOpen, setIsCapacityEditorOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  const { staff } = useStaffStore();
  const { plan } = useDispatchStore();
  const { shops } = useShopStore();
  const { currentUser } = useUserStore();
  const { addDraft } = useDraftStore();
  const { t } = useTranslation();

  const filtered = useMemo(() => {
    return staff.filter(s => {
      const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || s.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [staff, search, statusFilter]);

  const selectedStaffData = selectedStaff ? staff.find(s => s.id === selectedStaff) : null;
  const selectedAssignment = selectedStaff ? plan.assignments.find(a => a.staffId === selectedStaff) : null;
  const assignedShops = selectedAssignment
    ? shops.filter(sh => selectedAssignment.shopIds.includes(sh.id))
    : [];

  const handleDeactivate = (id: string, name: string) => {
    const draft = createDraftFromAI('STAFF_UPDATE', currentUser.name);
    draft.description = `${t('deactivateStaff')} ${name} ${t('andReassignStops')}`;
    addDraft(draft);
    toast.success(t('deactivationDraftCreated'));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{t('staffTitle')}</h1>
          <p className="text-sm text-gray-500">{staff.length} {t('staffTitle').toLowerCase()} · {staff.filter(s => s.status === 'Active').length} {t('active').toLowerCase()}</p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-2 rounded-xl border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 transition-all">
            <Users className="h-4 w-4" /> {t('rosters')}
          </button>
          <button
            onClick={() => setIsAddStaffOpen(true)}
            className="rounded-xl purple-gradient px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 active:scale-95 transition-all"
          >
            <Plus className="h-4 w-4 mr-1 inline-block" /> {t('addStaff')}
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: t('totalStaff'), value: staff.length, icon: Users, color: "text-purple-600", bg: "bg-purple-100/50" },
          { label: t('active'), value: staff.filter(s => s.status === 'Active').length, icon: TrendingUp, color: "text-green-600", bg: "bg-green-100/50" },
          { label: t('onLeaveLabel'), value: staff.filter(s => s.status === 'On Leave').length, icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-100/50" },
          { label: t('atRisk'), value: staff.filter(s => s.risk).length, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-100/50" },
        ].map(item => (
          <div key={item.label} className="rounded-2xl border border-purple-50 bg-white p-5 shadow-sm">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg} ${item.color} mb-3`}>
              <item.icon className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
            <p className="text-2xl font-black text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-3 rounded-2xl border border-purple-100 bg-white px-4 py-2.5 flex-1 transition-all focus-within:border-purple-400">
          <Search className="h-4 w-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('searchStaff')}
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
          />
        </div>
        <div className="flex rounded-2xl border border-purple-100 bg-white p-1 shrink-0 overflow-x-auto scrollbar-hide">
          {(['all', 'Active', 'On Leave', 'Inactive'] as const).map(f => {
            const label = f === 'all' ? t('allShops') :
              f === 'On Leave' ? t('onLeaveLabel') :
                t(f.toLowerCase() as any);
            return (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-xl whitespace-nowrap ${statusFilter === f ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff List - Hide on mobile if staff selected */}
        <div className={`lg:col-span-2 space-y-3 ${selectedStaff ? 'hidden lg:block' : 'block'}`}>
          {filtered.length === 0 ? (
            <EmptyState icon={Users} title={t('noStaffFound')} />
          ) : (
            <StaffList
              staff={filtered}
              selectedStaffId={selectedStaff}
              onSelect={(id) => setSelectedStaff(id === selectedStaff ? null : id)}
              plan={plan}
            />
          )}
        </div>

        {/* Detail Panel */}
        {selectedStaffData ? (
          <div className="rounded-2xl border border-purple-100 bg-white p-6 space-y-6 h-fit sticky top-20 shadow-xl shadow-purple-100/20">
            {/* Back button for mobile */}
            <button
              onClick={() => setSelectedStaff(null)}
              className="lg:hidden flex items-center gap-2 text-[10px] font-black text-purple-600 uppercase tracking-widest mb-2"
            >
              ← {t('staffTitle')}
            </button>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl purple-gradient text-white text-2xl font-black shadow-lg shadow-purple-200">
                  {selectedStaffData.name[0]}
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900 tracking-tight">{selectedStaffData.name}</h3>
                  <StatusBadge status={selectedStaffData.status} size="md" />
                </div>
              </div>
              <button
                onClick={() => handleDeactivate(selectedStaffData.id, selectedStaffData.name)}
                className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                title={t('deactivateStaff')}
              >
                <UserMinus className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t('phone'), value: selectedStaffData.phone },
                { label: t('capacity'), value: `${selectedStaffData.capacity} ${t('stops')}` },
                { label: t('distance'), value: selectedStaffData.distance },
                { label: t('performance'), value: `${selectedStaffData.performance}%` },
              ].map(item => (
                <div key={item.label} className="bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-xs font-bold text-gray-900">{item.value}</p>
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {t('assignedShops')}
                </h4>
                <span className="rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-black text-purple-600">{assignedShops.length}</span>
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-100">
                {assignedShops.slice(0, 10).map(shop => (
                  <div key={shop.id} className="flex items-center gap-3 rounded-xl bg-purple-50/50 px-3 py-2 border border-purple-50">
                    <div className="h-2 w-2 rounded-full bg-purple-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-800 truncate">{shop.name}</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tight">{shop.area}</p>
                    </div>
                  </div>
                ))}
                {assignedShops.length > 10 && (
                  <p className="text-[10px] font-black text-purple-400 text-center py-2 uppercase tracking-widest">+{assignedShops.length - 10} {t('more')}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsCapacityEditorOpen(true)}
              className="w-full h-11 rounded-xl bg-purple-600 text-xs font-black text-white hover:bg-purple-700 shadow-lg shadow-purple-200 active:scale-95 transition-all uppercase tracking-widest"
            >
              {t('editCapacity')}
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex rounded-2xl border-2 border-dashed border-purple-100 bg-purple-50/30 p-12 flex-col items-center justify-center text-center h-[400px]">
            <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
              <Users className="h-8 w-8 text-purple-200" />
            </div>
            <p className="text-sm font-bold text-purple-300 uppercase tracking-widest">{t('selectStaffToView')}</p>
          </div>
        )}
      </div>

      {isCapacityEditorOpen && selectedStaffData && (
        <CapacityEditor
          staff={selectedStaffData}
          onClose={() => setIsCapacityEditorOpen(false)}
        />
      )}

      {isAddStaffOpen && (
        <StaffAddModal
          onClose={() => setIsAddStaffOpen(false)}
        />
      )}
    </div>
  );
};

export default Staff;
