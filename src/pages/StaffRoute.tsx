import { useMemo, useState, useEffect, useRef, useCallback, Suspense, lazy } from "react";
import {
    Navigation, MapPin, CheckCircle,
    ChevronDown, ChevronUp, Map as MapIcon, Loader2
} from "lucide-react";
import { useStaffStore, useDispatchStore, useShopStore, useUserStore } from "@/store";
import { toast } from "sonner";
import { SHOPS_LIST } from "@/data/shops_data";
import DeliveryPaymentScreen, { MOCK_ORDER_ITEMS } from "@/components/staff/DeliveryPaymentScreen";
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Lazy load the map component
const LiveNavMap = lazy(() => import("@/components/staff/LiveNavMap"));

// Status types
type DeliveryMode = 'ROUTE' | 'ARRIVAL' | 'DELIVERY' | 'FAIL' | 'COMPLETED';

// ─── Map Fallbacks ───────────────────────────────────────────────
function MapErrorFallback() {
    const { t } = useTranslation();
    return (
        <div className="w-full h-full rounded-2xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-400">
            <MapIcon className="h-12 w-12 opacity-30 mb-3" />
            <p className="text-sm font-bold">{t('mapLoadingFailed')}</p>
            <p className="text-xs">{t('checkConnection')}</p>
        </div>
    );
}

function MapLoadingFallback() {
    const { t } = useTranslation();
    return (
        <div className="w-full h-full rounded-2xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="h-10 w-10 animate-spin text-purple-500 mb-3" />
            <p className="text-sm font-bold">{t('loadingMap')}</p>
        </div>
    );
}

// ─── Error Boundary ─────────────────────────────────────────────
class ErrorBoundaryWrapper extends React.Component<
    { children: React.ReactNode; onError: () => void },
    { hasError: boolean }
> {
    constructor(props: { children: React.ReactNode; onError: () => void }) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch() {
        this.props.onError();
    }
    render() {
        if (this.state.hasError) return null;
        return this.props.children;
    }
}

// ─── Main Component ─────────────────────────────────────────────
const StaffRoute = () => {
    const { currentUser } = useUserStore();
    const { staff } = useStaffStore();
    const { plan } = useDispatchStore();
    const { shops } = useShopStore();
    const { t } = useTranslation();

    // ─── State ──────────────────────────────────────────────────
    const [currentStopIndex, setCurrentStopIndex] = useState(0);
    const [mode, setMode] = useState<DeliveryMode>('ROUTE');
    const [distance, setDistance] = useState("1.2");
    const [eta, setEta] = useState("4");
    const [failReason, setFailReason] = useState("");
    const [panelExpanded, setPanelExpanded] = useState(false);
    const [mapError, setMapError] = useState(false);
    const [posInitialized, setPosInitialized] = useState(false);
    const [currentPos, setCurrentPos] = useState({ lat: 13.11, lng: 80.21 });
    const [roadRouteCoords, setRoadRouteCoords] = useState<[number, number][]>([]);
    const routeIndexRef = useRef(0);

    // Callback: receive road route from LiveNavMap
    const handleRouteReady = useCallback((coords: [number, number][]) => {
        setRoadRouteCoords(coords);
        routeIndexRef.current = 0; // reset to start of new route
    }, []);

    // ─── Data Logic ─────────────────────────────────────────────
    const myStaff = useMemo(() => {
        if (!staff || staff.length === 0) return null;
        return staff.find(s => s.name === currentUser.name) || staff[0];
    }, [staff, currentUser]);

    const myStops = useMemo(() => {
        if (!myStaff) return SHOPS_LIST.slice(0, 5);
        const assignment = plan?.assignments?.find(a => a.staffId === myStaff.id);
        if (assignment) {
            const assignedShops = assignment.shopIds
                .map(id => shops.find(sh => sh.id === id))
                .filter(Boolean);
            if (assignedShops.length > 0) return assignedShops;
        }
        return SHOPS_LIST.slice(0, 5);
    }, [plan, myStaff, shops]);

    // ─── Proximity-based Stop Optimization ──────────────────────
    const [optimizedStops, setOptimizedStops] = useState<any[]>([]);

    useEffect(() => {
        if (!myStops || myStops.length === 0) return;

        // Optimize the REMAINING sequence starting from current position
        const completed = optimizedStops.slice(0, currentStopIndex);
        const remaining = myStops.filter(s => !completed.find(c => c.id === s.id));

        const newlyOptimized: any[] = [...completed];
        let cursor = currentPos;

        while (remaining.length > 0) {
            let closestIdx = 0;
            let minDist = Infinity;

            for (let i = 0; i < remaining.length; i++) {
                const s = remaining[i] as any;
                const sLat = s.lat || s.geo?.lat || 0;
                const sLng = s.lng || s.geo?.lng || 0;
                const d = Math.pow(cursor.lat - sLat, 2) + Math.pow(cursor.lng - sLng, 2);
                if (d < minDist) {
                    minDist = d;
                    closestIdx = i;
                }
            }

            const next = remaining.splice(closestIdx, 1)[0];
            newlyOptimized.push(next);
            cursor = {
                lat: next.lat || (next as any).geo?.lat || 0,
                lng: next.lng || (next as any).geo?.lng || 0
            };
        }
        setOptimizedStops(newlyOptimized);
    }, [myStops, currentStopIndex, posInitialized]); // Re-run when stop index changes or on init

    const currentStop = optimizedStops[currentStopIndex] as any;

    // Map stops data with full shop info for popups
    const mapStops = useMemo(() => {
        return optimizedStops.map((s: any, i: number) => ({
            id: s.id || `stop_${i}`,
            name: s.name || `${t('stopShort')} ${i + 1}`,
            lat: s.lat || s.geo?.lat || 13.08 + i * 0.01,
            lng: s.lng || s.geo?.lng || 80.25 + i * 0.01,
            address: s.address || s.area,
            status: (i < currentStopIndex ? 'done' : (i === currentStopIndex ? 'current' : 'pending')) as 'done' | 'current' | 'pending'
        }));
    }, [optimizedStops, currentStopIndex, t]);

    const nextStopForMap = useMemo(() => {
        if (currentStopIndex >= optimizedStops.length) return null;
        const s = optimizedStops[currentStopIndex];
        return {
            id: s.id,
            name: s.name,
            lat: s.lat || s.geo?.lat || 0,
            lng: s.lng || s.geo?.lng || 0,
            address: s.address || s.area,
        };
    }, [optimizedStops, currentStopIndex]);

    // Expected amount for the current stop (calculated from mock items)
    const expectedAmount = useMemo(() =>
        MOCK_ORDER_ITEMS.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
        , []);

    const totalItems = useMemo(() =>
        MOCK_ORDER_ITEMS.reduce((sum, item) => sum + item.qty, 0)
        , []);
    // ─── Initialize GPS near first stop ────────────────────────
    useEffect(() => {
        if (!posInitialized && optimizedStops.length > 0) {
            const firstShop = optimizedStops[0] as any;
            const lat = firstShop.lat || firstShop.geo?.lat || 13.11;
            const lng = firstShop.lng || firstShop.geo?.lng || 80.21;
            // Start slightly offset from first stop (simulating approach)
            setCurrentPos({ lat: lat - 0.008, lng: lng - 0.006 });
            setPosInitialized(true);
        }
    }, [optimizedStops, posInitialized]);

    // ─── Simulate GPS movement along road route (Constant Speed) ─────
    useEffect(() => {
        if (mode !== 'ROUTE' || !currentStop || roadRouteCoords.length < 2) return;

        const destLat = currentStop.lat || (currentStop as any).geo?.lat || 13.09;
        const destLng = currentStop.lng || (currentStop as any).geo?.lng || 80.28;

        let currentSegIdx = 0;
        let t = 0; // 0 to 1 between points

        // Target speed: approx 30km/h in simulation time
        // 0.0001 lat/lng degrees per 40ms is a decent "fast" speed for demo
        const speed = 0.00015;

        const interval = setInterval(() => {
            if (currentSegIdx >= roadRouteCoords.length - 1) {
                setMode('ARRIVAL'); // Auto-arrive when road ends
                clearInterval(interval);
                return;
            }

            const p1 = roadRouteCoords[currentSegIdx];
            const p2 = roadRouteCoords[currentSegIdx + 1];

            // Calculate distance of this segment in degrees
            const segDist = Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));

            // Advance t based on distance to maintain constant speed
            const stepT = speed / (segDist || 0.00001);
            t += stepT;

            if (t >= 1) {
                t = 0;
                currentSegIdx++;
            }

            if (currentSegIdx < roadRouteCoords.length - 1) {
                const pt1 = roadRouteCoords[currentSegIdx];
                const pt2 = roadRouteCoords[currentSegIdx + 1];

                const newLat = pt1[0] + (pt2[0] - pt1[0]) * t;
                const newLng = pt1[1] + (pt2[1] - pt1[1]) * t;

                const dist = Math.sqrt(Math.pow((destLat - newLat) * 111, 2) + Math.pow((destLng - newLng) * 85, 2));
                setDistance(dist.toFixed(2));
                setEta(Math.max(1, Math.round(dist / 0.5)).toString());
                setCurrentPos({ lat: newLat, lng: newLng });
            }
        }, 40);

        return () => clearInterval(interval);
    }, [mode, currentStop, roadRouteCoords]);

    // ─── Arrival Simulation ─────────────────────────────────────
    useEffect(() => {
        if (mode === 'ROUTE' && currentStop) {
            const timer = setTimeout(() => {
                setDistance("0.05");
                setEta("0");
                setMode('ARRIVAL');
                toast.info(`${t('youHaveArrived')} ${currentStop.name}`);
            }, 8000);
            return () => clearTimeout(timer);
        }
    }, [mode, currentStop, t]);

    // ─── Actions ────────────────────────────────────────────────
    const advanceToNextStop = () => {
        setMode('ROUTE');
        setFailReason("");
        setPanelExpanded(false);
        setDistance("1.8");
        setEta("6");
        setCurrentPos(prev => ({ lat: prev.lat + 0.003, lng: prev.lng + 0.002 }));
        setCurrentStopIndex(prev => prev + 1);
    };

    const handleDeliveryComplete = (data: {
        amountReceived: number;
        balance: number;
        proofImage: string;
        reason: string;
    }) => {
        const balanceMsg = data.balance > 0
            ? `\n₹${data.balance.toLocaleString()} pending (${data.reason})`
            : '';
        toast.success(`Delivery completed!\n₹${data.amountReceived.toLocaleString()} collected.${balanceMsg}`);
        advanceToNextStop();
    };

    const handleFail = () => {
        if (!failReason) return toast.error("Please select a reason");
        toast.error(`Stop marked as Failed: ${failReason}`);
        advanceToNextStop();
    };

    // ─── All done ───────────────────────────────────────────────
    if (!currentStop || currentStopIndex >= myStops.length) {
        return (
            <div className="flex flex-col items-center justify-center h-[80vh] p-6 text-center max-w-md mx-auto">
                <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle className="h-12 w-12 text-green-500" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">{t('allDone')}</h2>
                <p className="text-gray-500 mt-2">{t('greatJob')}</p>
                <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm w-full">
                    <div className="flex justify-between text-sm font-bold text-gray-600">
                        <span>{t('stopsCovered')}</span>
                        <span className="text-green-600">{myStops.length}</span>
                    </div>
                </div>
            </div>
        );
    }

    // ─── DELIVERY mode → full-screen payment panel ──────────────
    if (mode === 'DELIVERY') {
        return (
            <div className="flex flex-col h-[calc(100vh-80px)] max-w-lg mx-auto relative overflow-hidden">
                {/* Compact map strip */}
                <div className="flex-shrink-0 relative" style={{ height: '25vh' }}>
                    {mapError ? <MapErrorFallback /> : (
                        <Suspense fallback={<MapLoadingFallback />}>
                            <ErrorBoundaryWrapper onError={() => setMapError(true)}>
                                <LiveNavMap
                                    currentPosition={currentPos}
                                    nextStop={nextStopForMap}
                                    allStops={mapStops}
                                    currentStopIndex={currentStopIndex}
                                    distance={distance}
                                    eta={eta}
                                    isNavigating={false}
                                    onRouteReady={handleRouteReady}
                                />
                            </ErrorBoundaryWrapper>
                        </Suspense>
                    )}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000]">
                        <div className="bg-green-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-lg">
                            📍 {t('deliveringStop')} {currentStopIndex + 1} {t('of')} {myStops.length}
                        </div>
                    </div>
                </div>

                {/* Full payment screen */}
                <div className="bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 flex-1 overflow-y-auto px-5 py-4 -mt-4 relative z-10">
                    <DeliveryPaymentScreen
                        shopName={currentStop.name}
                        shopAddress={currentStop.address || currentStop.area || ''}
                        stopId={currentStop.id || `stop_${currentStopIndex}`}
                        staffId={myStaff?.id || 'staff_demo'}
                        items={MOCK_ORDER_ITEMS}
                        expectedAmount={expectedAmount}
                        currentGps={currentPos}
                        onComplete={handleDeliveryComplete}
                        onCancel={() => setMode('FAIL')}
                        t={t}
                    />
                </div>
            </div>
        );
    }

    // ─── FAIL mode → full-screen failure form ───────────────────
    if (mode === 'FAIL') {
        return (
            <div className="flex flex-col h-[calc(100vh-80px)] max-w-lg mx-auto relative overflow-hidden">
                {/* Compact map strip */}
                <div className="flex-shrink-0 relative" style={{ height: '25vh' }}>
                    {mapError ? <MapErrorFallback /> : (
                        <Suspense fallback={<MapLoadingFallback />}>
                            <ErrorBoundaryWrapper onError={() => setMapError(true)}>
                                <LiveNavMap
                                    currentPosition={currentPos}
                                    nextStop={nextStopForMap}
                                    allStops={mapStops}
                                    currentStopIndex={currentStopIndex}
                                    distance={distance}
                                    eta={eta}
                                    isNavigating={false}
                                    onRouteReady={handleRouteReady}
                                />
                            </ErrorBoundaryWrapper>
                        </Suspense>
                    )}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000]">
                        <div className="bg-red-600/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-lg">
                            ❌ {t('deliveryFailedStop')} {currentStopIndex + 1}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 flex-1 overflow-y-auto px-5 py-5 -mt-4 relative z-10">
                    <div className="space-y-4 animate-in fade-in duration-300">
                        <div>
                            <h2 className="text-xl font-black text-gray-900 mb-1">{t('deliveryFailedTitle')}</h2>
                            <p className="text-xs text-gray-500">{currentStop.name} — {t('whyNotDeliver')}</p>
                        </div>

                        <div className="space-y-2">
                            {([
                                { key: 'shopClosed', label: t('shopClosed') },
                                { key: 'customerUnavailable', label: t('customerUnavailable') },
                                { key: 'paymentRefused', label: t('paymentRefused') },
                                { key: 'wrongAddress', label: t('wrongAddress') },
                                { key: 'other', label: t('other') }
                            ]).map(reason => (
                                <button
                                    key={reason.key}
                                    onClick={() => setFailReason(reason.label)}
                                    className={`w-full p-4 rounded-xl text-left font-bold border transition-all text-sm ${failReason === reason.label
                                        ? 'border-red-500 bg-red-50 text-red-600 ring-2 ring-red-100'
                                        : 'border-gray-200 bg-white text-gray-600 hover:border-red-200'
                                        }`}
                                >
                                    {reason.label}
                                </button>
                            ))}
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={() => setMode('DELIVERY')}
                                className="flex-1 py-4 text-gray-500 font-bold text-sm rounded-2xl border border-gray-200 hover:bg-gray-50"
                            >
                                {t('goBack')}
                            </button>
                            <button
                                onClick={handleFail}
                                className="flex-[2] py-4 bg-red-500 text-white rounded-2xl font-bold text-sm hover:bg-red-600 active:scale-95 transition-all"
                            >
                                {t('confirmFailed')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ─── ROUTE / ARRIVAL modes — map + bottom panel ─────────────
    return (
        <div className="flex flex-col h-[calc(100vh-80px)] max-w-lg mx-auto relative overflow-hidden">

            {/* ─── MAP ────────────────────────────────────────────── */}
            <div
                className="flex-shrink-0 relative"
                style={{ height: panelExpanded ? '30vh' : '55vh', transition: 'height 0.4s ease' }}
            >
                {mapError ? (
                    <MapErrorFallback />
                ) : (
                    <Suspense fallback={<MapLoadingFallback />}>
                        <ErrorBoundaryWrapper onError={() => setMapError(true)}>
                            <LiveNavMap
                                currentPosition={currentPos}
                                nextStop={nextStopForMap}
                                allStops={mapStops}
                                currentStopIndex={currentStopIndex}
                                distance={distance}
                                eta={eta}
                                isNavigating={mode === 'ROUTE'}
                                onRouteReady={handleRouteReady}
                            />
                        </ErrorBoundaryWrapper>
                    </Suspense>
                )}

                {/* Stop progress badge */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000]">
                    <div className="bg-gray-900/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide shadow-lg">
                        {t('stopShort')} {currentStopIndex + 1} {t('of')} {myStops.length}
                    </div>
                </div>
            </div>

            {/* ─── BOTTOM PANEL ────────────────────────────────────── */}
            <div className="bg-white rounded-t-3xl shadow-2xl border-t border-gray-100 flex flex-col flex-1 overflow-hidden">
                {/* Drag handle */}
                <button
                    onClick={() => setPanelExpanded(!panelExpanded)}
                    className="w-full flex flex-col items-center pt-2 pb-1 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                    <div className="w-10 h-1 rounded-full bg-gray-300 mb-1" />
                    {panelExpanded
                        ? <ChevronDown className="h-4 w-4 text-gray-400" />
                        : <ChevronUp className="h-4 w-4 text-gray-400" />
                    }
                </button>

                {/* Panel content */}
                <div className="flex-1 overflow-y-auto px-5 pb-6">

                    {/* MODE: ROUTE */}
                    {mode === 'ROUTE' && (
                        <div className="space-y-4 animate-in fade-in duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">{t('nextStop')}</p>
                                    <h1 className="text-2xl font-black text-gray-900 leading-tight">{currentStop.name}</h1>
                                    <p className="text-xs text-gray-500">{currentStop.address || currentStop.area}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-gray-900">{distance}<span className="text-xs text-gray-400 ml-1">{t('km')}</span></p>
                                    <p className="text-sm font-bold text-green-600">{eta} {t('min')}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <p className="text-2xl font-black text-gray-900">{totalItems}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{t('items')}</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                                    <p className="text-2xl font-black text-gray-900">₹{(expectedAmount / 1000).toFixed(1)}k</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{t('collect')}</p>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-blue-600 animate-pulse">
                                <Navigation className="h-3.5 w-3.5" />
                                <span className="text-xs font-bold">{t('navigatingTo')}</span>
                            </div>
                        </div>
                    )}

                    {/* MODE: ARRIVAL */}
                    {mode === 'ARRIVAL' && (
                        <div className="space-y-4 animate-in slide-in-from-bottom duration-500 text-center">
                            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
                                <MapPin className="h-8 w-8 text-green-600" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-gray-900">{t('youHaveArrived')}</h1>
                                <p className="text-sm font-medium text-gray-500">{currentStop.name}</p>
                            </div>
                            <button
                                onClick={() => { setMode('DELIVERY'); setPanelExpanded(true); }}
                                className="w-full py-4 bg-gray-900 text-white rounded-2xl text-lg font-bold shadow-xl hover:scale-[1.02] active:scale-95 transition-all"
                            >
                                ✅ {t('arrivedStartDelivery')}
                            </button>
                            <button
                                onClick={() => setMode('ROUTE')}
                                className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-gray-600"
                            >
                                {t('navigateAgain')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StaffRoute;
