import { useState, useMemo } from "react";
import {
    MapPin, MoreHorizontal, Filter, Map, LayoutList
} from "lucide-react";
import { useStaffStore, useDispatchStore, useShopStore, useUserStore } from "@/store";
import StopCard from "@/components/shared/StopCard";
import { useTranslation } from "@/hooks/useTranslation";

const StaffStops = () => {
    const { t } = useTranslation();
    const { currentUser } = useUserStore();
    const { staff } = useStaffStore();
    const { plan } = useDispatchStore();
    const { shops } = useShopStore();

    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [activeStep, setActiveStep] = useState<Record<string, 'pending' | 'arrived' | 'done' | 'failed'>>({});

    const myStaff = useMemo(() => staff.find(s => s.name === currentUser.name) || staff[0], [staff, currentUser]);
    const myAssignment = useMemo(() => plan.assignments.find(a => a.staffId === myStaff.id), [plan, myStaff]);

    const myStops = useMemo(() => {
        if (!myAssignment) return [];
        return myAssignment.shopIds.map(id => {
            const shop = shops.find(sh => sh.id === id);
            return {
                ...shop,
                stop_id: id, // Mapping for RouteMap
                status: activeStep[id] || 'PENDING',
                lat: 13.0 + Math.random() * 0.1, // Mock coords
                lng: 80.2 + Math.random() * 0.1
            };
        });
    }, [myAssignment, shops, activeStep]);

    return (
        <div className="space-y-4 pb-20 animate-fade-in max-w-lg mx-auto h-screen flex flex-col">
            {/* Sticky Header */}
            <div className="shrink-0 bg-gray-50/95 backdrop-blur-md pt-2 pb-4 z-30 flex items-center justify-between px-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 leading-tight">{t('deliveryList')}</h1>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{myStops.length} {t('stopsToday')}</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('map')}
                        className={`h-10 w-10 rounded-xl border flex items-center justify-center shadow-sm active:scale-95 transition-all ${viewMode === 'map' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 border-gray-100'}`}
                    >
                        <Map className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`h-10 w-10 rounded-xl border flex items-center justify-center shadow-sm active:scale-95 transition-all ${viewMode === 'list' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-500 border-gray-100'}`}
                    >
                        <LayoutList className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-20">
                {viewMode === 'list' ? (
                    <div className="space-y-5">
                        {myStops.map((stop, i) => (
                            <StopCard
                                key={stop.id}
                                stop={stop}
                                index={i}
                                status={stop.status as any}
                                onStatusChange={(status) => setActiveStep(prev => ({ ...prev, [stop.id]: status }))}
                            />
                        ))}
                        {myStops.length === 0 && (
                            <div className="py-20 text-center space-y-3">
                                <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto">
                                    <LayoutList className="h-10 w-10 text-gray-300" />
                                </div>
                                <p className="text-sm font-bold text-gray-400">{t('noStopsAssigned')}</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full rounded-2xl bg-gray-100 border border-gray-200 overflow-hidden relative">
                        {/* Simple Mock Map for Mobile */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                            <Map className="h-12 w-12 opacity-20 mb-2" />
                            <p className="text-xs font-bold">{t('interactiveMapView')}</p>
                            <p className="text-[10px]">{t('showing')} {myStops.length} {t('stops')}</p>
                        </div>
                        {/* In real implementation, render RouteMap here with mobile props */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StaffStops;
