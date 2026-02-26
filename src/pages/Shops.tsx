import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useShopStore, useDraftStore, useUserStore } from "@/store";
import { toast } from "sonner";
import {
  Store, Plus, LayoutGrid, List, MoreHorizontal
} from "lucide-react";
import ShopFormModal from "@/components/shops/ShopFormModal";
import StatusBadge from "@/components/shared/StatusBadge";
import FilterBar from "@/components/shared/FilterBar";
import RiskBanner from "@/components/shared/RiskBanner";
import ShopTable from "@/components/shops/ShopTable";
import ShopProfile from "@/components/shops/ShopProfile";
import CSVImportWizard from "@/components/shared/CSVImportWizard";
import GeoFixModal from "@/components/shops/GeoFixModal";
import MobileShopList from "@/components/shops/MobileShopList";
import { createDraftFromAI } from "@/data/generators";
import { useTranslation } from "@/hooks/useTranslation";

const Shops = () => {
  const { shops } = useShopStore();
  const { addDraft } = useDraftStore();
  const { currentUser } = useUserStore();
  const { t } = useTranslation();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isGeoFixOpen, setIsGeoFixOpen] = useState(false);
  const [geoFixShops, setGeoFixShops] = useState<typeof shops>([]);

  const [isAddShopOpen, setIsAddShopOpen] = useState(false);

  const activeFilter = searchParams.get("filter") || "all";
  const searchTerm = searchParams.get("q") || "";
  const viewMode = (searchParams.get("view") as "list" | "grid") || "list";

  const updateSearch = (q: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (q) newParams.set("q", q);
    else newParams.delete("q");
    setSearchParams(newParams);
  };

  const updateFilter = (filter: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("filter", filter);
    setSearchParams(newParams);
  };

  const updateViewMode = (view: "list" | "grid") => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("view", view);
    setSearchParams(newParams);
  };

  const filteredShops = useMemo(() => {
    return shops.filter(shop => {
      const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        shop.area.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' ||
        (activeFilter === 'pending' && (!shop.lat || !shop.lng)) ||
        (activeFilter === 'premium' && shop.creditLimit > 50000);
      return matchesSearch && matchesFilter;
    });
  }, [shops, searchTerm, activeFilter]);

  const stats = useMemo(() => ({
    total: shops.length,
    pendingGeo: shops.filter(s => !s.lat || !s.lng).length,
    highRisk: shops.filter(s => s.balance > s.creditLimit * 0.9).length
  }), [shops]);

  const selectedShop = useMemo(() => shops.find(s => s.id === selectedShopId), [shops, selectedShopId]);

  const handleBatchGeoFix = () => {
    const missing = shops.filter(s => !s.lat || !s.lng);
    setGeoFixShops(missing);
    setIsGeoFixOpen(true);
  };

  const handleSingleGeoFix = (id: string) => {
    const shop = shops.find(s => s.id === id);
    if (shop) {
      setGeoFixShops([shop]);
      setIsGeoFixOpen(true);
    }
  };

  const handleNewShopSubmit = (data: any) => {
    const draft = createDraftFromAI('SHOP_IMPORT', currentUser.name);
    draft.title = `New Shop: ${data.name}`;
    draft.description = `Onboarding request for ${data.name} in ${data.area}. Address: ${data.address}`;
    draft.payload = data;
    addDraft(draft);
    setIsAddShopOpen(false);
    toast.success(t('newShopDrafted'), {
      description: t('reviewInJournal'),
      action: {
        label: t('openJournal'),
        onClick: () => (window as any).dispatchJournalEvent?.() || toast.info(t('checkJournalIcon'))
      }
    });
  };

  const handleImport = (data: any[]) => {
    const draft = createDraftFromAI('SHOP_UPDATE', currentUser.name);
    draft.description = `${t('bulkImportShopsDesc').replace('{{count}}', String(data.length))}`;
    draft.payload = { count: data.length, firstRecord: data[0] };
    addDraft(draft);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{t('shopNetwork')}</h1>
          <p className="text-sm text-gray-500">{t('managePartners')}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddShopOpen(true)}
            className="flex h-10 items-center gap-2 rounded-xl purple-gradient px-6 text-xs font-bold text-white shadow-lg shadow-purple-200 hover:opacity-90 transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" /> {t('addShop')}
          </button>
        </div>
      </div>

      {stats.pendingGeo > 0 && (
        <RiskBanner
          severity="destructive"
          title={`${stats.pendingGeo} ${t('missingGeo')}`}
          description={t('missingGeoWarning')}
          actionLabel={t('fixLocations')}
          onAction={handleBatchGeoFix}
        />
      )}

      <FilterBar
        searchPlaceholder={t('searchPlaceholder')}
        initialSearch={searchTerm}
        onSearch={updateSearch}
        activeFilter={activeFilter}
        onFilterChange={updateFilter}
        options={[
          { id: 'all', label: t('allShops'), count: stats.total },
          { id: 'pending', label: t('missingGeo'), count: stats.pendingGeo },
          { id: 'premium', label: t('highCredit'), count: 12 },
        ]}
        rightElement={
          <div className="flex rounded-xl border border-gray-100 bg-white p-0.5 ml-2">
            <button
              onClick={() => updateViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => updateViewMode('list')}
              className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-purple-100 text-purple-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        }
      />

      <div className="hidden md:block">
        {viewMode === 'list' ? (
          <ShopTable
            shops={filteredShops}
            onOpenShop={setSelectedShopId}
            onFixGeo={handleSingleGeoFix}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredShops.map(shop => (
              <div
                key={shop.id}
                className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:border-purple-200 transition-all group cursor-pointer hover:shadow-md"
                onClick={() => setSelectedShopId(shop.id)}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-gray-50 group-hover:bg-purple-50 flex items-center justify-center text-gray-400 group-hover:text-purple-600 transition-colors">
                    <Store className="h-6 w-6" />
                  </div>
                  <button className="text-gray-300 hover:text-gray-600 tracking-tighter" onClick={(e) => e.stopPropagation()}><MoreHorizontal className="h-5 w-5" /></button>
                </div>
                <h3 className="font-black text-gray-900 mb-1 uppercase tracking-tight line-clamp-1">{shop.name}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-4 truncate">{shop.area}</p>

                <div className="space-y-3 border-t border-gray-50 pt-4">
                  <div className="flex justify-between text-[11px] gap-2">
                    <span className="text-gray-400 font-medium uppercase tracking-wider text-[9px] break-words line-clamp-1 flex-1">{t('outstanding')}</span>
                    <span className="font-black text-gray-900 font-mono shrink-0">₹{shop.balance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[11px] gap-2">
                    <span className="text-gray-400 font-medium uppercase tracking-wider text-[9px] break-words line-clamp-1 flex-1">{t('lastVisit')}</span>
                    <span className="font-black text-gray-600 font-mono shrink-0">{t('yesterday')}</span>
                  </div>
                </div>

                <button className="w-full mt-5 py-2.5 rounded-xl border border-purple-100 text-[10px] font-black text-purple-600 uppercase tracking-widest hover:bg-purple-50 transition-all">
                  {t('viewHistory')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="md:hidden">
        <MobileShopList
          shops={filteredShops}
          onOpenShop={setSelectedShopId}
          onFixGeo={handleSingleGeoFix}
        />
      </div>

      {/* Shop Profile Drawer */}
      {selectedShop && (
        <>
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setSelectedShopId(null)} />
          <ShopProfile shop={selectedShop} onClose={() => setSelectedShopId(null)} />
        </>
      )}

      {/* Import Wizard */}
      <CSVImportWizard
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImport={handleImport}
        type="Shops"
      />

      {/* Geo Fix Modal */}
      {isGeoFixOpen && (
        <GeoFixModal
          shops={geoFixShops}
          onClose={() => setIsGeoFixOpen(false)}
        />
      )}

      {/* Add Shop Form Modal */}
      <ShopFormModal
        isOpen={isAddShopOpen}
        onClose={() => setIsAddShopOpen(false)}
        onSubmit={handleNewShopSubmit}
      />
    </div>
  );
};

export default Shops;
