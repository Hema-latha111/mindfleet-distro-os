import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
    Truck, AlertTriangle, Map as MapIcon, Maximize2,
    Sparkles, User, Package, TrendingUp, X, ChevronRight,
    LayoutGrid, MapPin, FilterX, Layers
} from "lucide-react";
import { useEffect, useState, useMemo, useRef } from 'react';
import { useUserStore } from '@/store';
import { useTranslation } from "@/hooks/useTranslation";

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Official MindFleet Bike Logo SVG ─────────────────────
const BIKE_SVG = (color: string) => `
<svg width="42" height="42" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="14" rx="14" ry="9" fill="#3D3D3D"/>
    <ellipse cx="60" cy="14" rx="9" ry="5" fill="#5A5A5A"/>
    <ellipse cx="60" cy="14" rx="4" ry="2" fill="#777"/>
    <path d="M32 26 L46 20" stroke="#4A4A4A" stroke-width="5" stroke-linecap="round"/>
    <path d="M88 26 L74 20" stroke="#4A4A4A" stroke-width="5" stroke-linecap="round"/>
    <rect x="24" y="23" width="12" height="7" rx="3.5" fill="#333"/>
    <rect x="84" y="23" width="12" height="7" rx="3.5" fill="#333"/>
    <path d="M34 30 L44 44" stroke="#D4956A" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M86 30 L76 44" stroke="#D4956A" stroke-width="6.5" stroke-linecap="round"/>
    <ellipse cx="60" cy="40" rx="16" ry="13" fill="${color}"/>
    <ellipse cx="60" cy="37" rx="14" ry="10" fill="${color}" opacity="0.8"/>
    <rect x="46" y="44" width="28" height="6" rx="3" fill="#2D064E"/>
    <ellipse cx="54" cy="34" rx="6" ry="3" fill="white" opacity="0.4"/>
    <rect x="38" y="52" width="44" height="28" rx="6" fill="${color}"/>
    <rect x="50" y="52" width="20" height="6" rx="3" fill="#000" opacity="0.1"/>
    <rect x="36" y="82" width="48" height="36" rx="5" fill="#5A0EAD"/>
    <rect x="38" y="84" width="44" height="32" rx="4" fill="${color}"/>
    <rect x="46" y="94" width="28" height="18" rx="3" fill="${color}"/>
    <text x="60" y="109" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="20" fill="white">M</text>
    <rect x="50" y="118" width="20" height="10" rx="4" fill="#5A0EAD"/>
    <rect x="54" y="120" width="12" height="3" rx="1.5" fill="#FF4444"/>
    <ellipse cx="60" cy="138" rx="16" ry="10" fill="#3D3D3D"/>
    <ellipse cx="60" cy="138" rx="10" ry="6" fill="#5A5A5A"/>
    <ellipse cx="60" cy="138" rx="4" ry="2" fill="#777"/>
    <path d="M44 134 Q60 126 76 134" stroke="#5A0EAD" stroke-width="4" stroke-linecap="round" fill="none"/>
</svg>`;

const createBikeIcon = (color: string = '#8017E1') => {
    return L.divIcon({
        className: 'dispatch-official-logo',
        html: `
            <div style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); transform-origin: center; transition: all 0.3s ease;">
                ${BIKE_SVG(color)}
            </div>
        `,
        iconSize: [42, 42],
        iconAnchor: [21, 21],
        popupAnchor: [0, -21],
    });
};

const CHENNAI_CENTER: [number, number] = [13.0827, 80.2707];

interface MapStop {
    stop_id: string;
    staff_id?: string;
    lat: number;
    lng: number;
    label: string;
    status: string;
    area?: string;
}
interface RoutePolyline { staff_id: string; points: { lat: number; lng: number }[]; }

interface Props {
    routes: RoutePolyline[];
    stops: MapStop[];
    selectedStaffId?: string;
    onSelectStaff: (staff_id: string) => void;
    onSelectStop: (stop_id: string) => void;
}

const SetMapRef = ({ setMap }: { setMap: (map: L.Map) => void }) => {
    const map = useMap();
    useEffect(() => {
        if (map) {
            setMap(map);
            setTimeout(() => { map.invalidateSize(); }, 100);
        }
    }, [map, setMap]);
    return null;
};

const RouteMap = ({ stops, onSelectStaff, onSelectStop }: Props) => {
    const [staffPositions, setStaffPositions] = useState<any[]>([]);
    const mapRef = useRef<L.Map | null>(null);
    const { currentUser } = useUserStore();
    const { t } = useTranslation();
    const isManager = currentUser.role === 'ADMIN' || currentUser.role === 'MANAGER';

    // ─── State ──────────────────────────────────────────────────
    const [viewMode, setViewMode] = useState<'staff' | 'area'>('staff');
    const [focusStaffId, setFocusStaffId] = useState<string | null>(null);
    const [focusArea, setFocusArea] = useState<string | null>(null);
    const [showRanking, setShowRanking] = useState(false);
    const [showTerritories, setShowTerritories] = useState(true);

    // Initial Simulated Positions snapped to roads near their territories
    useEffect(() => {
        const anchors: Record<string, [number, number]> = {
            's1': [13.09, 80.28], // North
            's2': [13.06, 80.26], // Central
            's3': [13.04, 80.25], // West
            's4': [13.02, 80.27], // South
        };

        const riders = Array.from({ length: 12 }).map((_, i) => {
            const id = `s${i + 1}`;
            const anchor = anchors[id] || [13.08 + (Math.random() - 0.5) * 0.05, 80.27 + (Math.random() - 0.5) * 0.05];
            return {
                id,
                name: i === 0 ? "Arjun Sharma" : i === 1 ? "Ravi Kumar" : `Partner ${i + 1}`,
                lat: anchor[0],
                lng: anchor[1],
                status: i % 5 === 0 ? 'SLA Risk' : 'On Track',
                performance: 92 + Math.random() * 6,
                currentTask: `Stop #${Math.floor(Math.random() * 10 + 1)}`,
                phone: `+91 91234 567${i.toString().padStart(2, '0')}`,
                bearing: Math.random() * 360
            };
        });

        const snapRiders = async () => {
            const snapped = await Promise.all(riders.map(async (r) => {
                try {
                    const resp = await fetch(`https://router.project-osrm.org/nearest/v1/driving/${r.lng},${r.lat}`);
                    const data = await resp.json();
                    if (data.code === 'Ok' && data.waypoints?.[0]?.location) {
                        return { ...r, lat: data.waypoints[0].location[1], lng: data.waypoints[0].location[0] };
                    }
                } catch (e) { }
                return r;
            }));
            setStaffPositions(snapped);
        };
        snapRiders();
    }, []);

    // Simulated movement
    useEffect(() => {
        const interval = setInterval(() => {
            setStaffPositions(prev => prev.map(p => {
                const moveDist = 0.00008;
                const dLat = Math.cos(p.bearing * Math.PI / 180) * moveDist;
                const dLng = Math.sin(p.bearing * Math.PI / 180) * moveDist;
                return {
                    ...p,
                    lat: p.lat + dLat,
                    lng: p.lng + dLng,
                    bearing: p.bearing + (Math.random() - 0.5) * 8
                };
            }));
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // ─── Data Analytics ──────────────────────────────────────────
    const staffRankings = useMemo(() => {
        const counts: Record<string, { id: string; name: string; pending: number }> = {};
        stops.forEach(s => {
            if (s.staff_id) {
                if (!counts[s.staff_id]) {
                    const staff = staffPositions.find(p => p.id === s.staff_id);
                    counts[s.staff_id] = { id: s.staff_id, name: staff?.name || `Staff ${s.staff_id}`, pending: 0 };
                }
                if (s.status === 'PENDING') counts[s.staff_id].pending++;
            }
        });
        return Object.values(counts)
            .sort((a, b) => b.pending - a.pending);
    }, [stops, staffPositions]);

    const areaStats = useMemo(() => {
        const groups: Record<string, number> = {};
        stops.forEach(s => {
            if (s.area && s.status === 'PENDING') {
                groups[s.area] = (groups[s.area] || 0) + 1;
            }
        });
        return Object.entries(groups).map(([name, count]) => ({ name, count }));
    }, [stops]);

    // Calculate Territories (simplified bounding hulls)
    const staffTerritories = useMemo(() => {
        const territories: Record<string, { points: [number, number][], isAlert: boolean, color: string }> = {};

        staffPositions.forEach(staff => {
            const staffStops = stops.filter(s => s.staff_id === staff.id);
            if (staffStops.length >= 3) {
                const centerLat = staffStops.reduce((sum, s) => sum + s.lat, 0) / staffStops.length;
                const centerLng = staffStops.reduce((sum, s) => sum + s.lng, 0) / staffStops.length;

                const sortedPoints = [...staffStops].sort((a, b) => {
                    return Math.atan2(a.lat - centerLat, a.lng - centerLng) -
                        Math.atan2(b.lat - centerLat, b.lng - centerLng);
                }).map(s => [s.lat, s.lng] as [number, number]);

                const pendingCount = staffStops.filter(s => s.status === 'PENDING').length;

                territories[staff.id] = {
                    points: sortedPoints,
                    isAlert: pendingCount > 5,
                    color: staff.status === 'SLA Risk' ? '#ef4444' : '#8017E1'
                };
            }
        });
        return territories;
    }, [stops, staffPositions]);

    // ─── Handlers ───────────────────────────────────────────────
    const handleStaffFocus = (id: string) => {
        setFocusStaffId(id);
        setFocusArea(null);
        const pos = staffPositions.find(p => p.id === id);
        if (pos && mapRef.current) {
            mapRef.current.flyTo([pos.lat, pos.lng], 15, { duration: 1.5 });
        }
        onSelectStaff(id);
    };

    const handleAreaFocus = (area: string) => {
        setFocusArea(area);
        setFocusStaffId(null);
        const areaStops = stops.filter(s => s.area === area);
        if (areaStops.length > 0 && mapRef.current) {
            const bounds = L.latLngBounds(areaStops.map(s => [s.lat, s.lng]));
            mapRef.current.fitBounds(bounds, { padding: [100, 100], duration: 1.5 });
        }
    };

    const clearFocus = () => {
        setFocusStaffId(null);
        setFocusArea(null);
        if (mapRef.current) {
            mapRef.current.flyTo(CHENNAI_CENTER, 12, { duration: 1.2 });
        }
    };

    const centerOnFleet = () => {
        if (!mapRef.current || staffPositions.length === 0) return;
        const coords = staffPositions.map(p => [p.lat, p.lng] as [number, number]);
        const bounds = L.latLngBounds(coords);
        mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
    };

    const focusedPendingArea = useMemo(() => {
        if (!focusStaffId) return null;
        const pendingForStaff = stops.filter(s => s.staff_id === focusStaffId && s.status === 'PENDING');
        if (pendingForStaff.length === 0) return null;

        const avgLat = pendingForStaff.reduce((sum, s) => sum + s.lat, 0) / pendingForStaff.length;
        const avgLng = pendingForStaff.reduce((sum, s) => sum + s.lng, 0) / pendingForStaff.length;

        return { center: [avgLat, avgLng] as [number, number], count: pendingForStaff.length };
    }, [focusStaffId, stops]);

    return (
        <div className="h-full w-full bg-gray-50 rounded-3xl border border-gray-100 relative overflow-hidden">
            <MapContainer
                center={CHENNAI_CENTER}
                zoom={12}
                zoomControl={false}
                className="h-full w-full"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <SetMapRef setMap={(m) => { mapRef.current = m; }} />

                {/* Territory Clusters */}
                {showTerritories && Object.entries(staffTerritories).map(([staffId, data]) => {
                    const isFocused = focusStaffId === staffId;
                    return (
                        <Polygon
                            key={`territory-${staffId}`}
                            positions={data.points}
                            pathOptions={{
                                fillColor: data.isAlert ? '#ef4444' : data.color,
                                fillOpacity: isFocused ? 0.35 : (data.isAlert ? 0.25 : 0.08),
                                color: data.isAlert ? '#ef4444' : data.color,
                                weight: (isFocused || data.isAlert) ? 2 : 1,
                                dashArray: data.isAlert ? '5,10' : undefined
                            }}
                            eventHandlers={{
                                click: () => handleStaffFocus(staffId)
                            }}
                        />
                    );
                })}

                {/* Focus Area Glow */}
                {focusedPendingArea && (
                    <Circle
                        center={focusedPendingArea.center}
                        radius={1500}
                        pathOptions={{
                            fillColor: '#ef4444',
                            fillOpacity: 0.15,
                            color: '#ef4444',
                            weight: 2,
                            dashArray: '5, 10'
                        }}
                    />
                )}

                {/* Staff Markers */}
                {staffPositions.map(staff => {
                    const isDimmed = focusStaffId && focusStaffId !== staff.id && !focusArea;
                    return (
                        <Marker
                            key={staff.id}
                            position={[staff.lat, staff.lng]}
                            icon={createBikeIcon(staff.status === 'SLA Risk' ? '#ef4444' : '#8017E1')}
                            opacity={isDimmed ? 0.3 : 1}
                            eventHandlers={{ click: () => handleStaffFocus(staff.id) }}
                        >
                            <Popup>
                                <div className="p-3 min-w-[200px] font-sans">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-10 w-10 rounded-full purple-gradient flex items-center justify-center text-xs font-bold text-white uppercase shadow-md">
                                            {staff.name[0]}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-900">{staff.name}</p>
                                            <p className="text-[10px] text-gray-500">{staff.phone}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 border-t pt-2 border-gray-100">
                                        <div className="flex justify-between items-center text-[10px]">
                                            <span className="text-gray-400 font-bold">{t('statusLabel')}</span>
                                            <span className={`font-black px-1.5 py-0.5 rounded ${staff.status === 'SLA Risk' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                                {t(staff.status as any) || staff.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleStaffFocus(staff.id)}
                                            className="w-full mt-1 py-1.5 bg-purple-50 text-purple-600 rounded-lg text-[10px] font-black hover:bg-purple-100 transition-colors"
                                        >
                                            FOCUS STAFF ROUTE
                                        </button>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* Shop Markers */}
                {stops.map(stop => {
                    const isFocusTarget = focusStaffId && stop.staff_id === focusStaffId;
                    const isHidden = (focusStaffId && !isFocusTarget) || (focusArea && stop.area !== focusArea);

                    return (
                        <Marker
                            key={stop.stop_id}
                            position={[stop.lat, stop.lng]}
                            icon={new L.Icon({
                                iconUrl: stop.status === 'DELIVERED'
                                    ? 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png'
                                    : 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
                                iconSize: (isFocusTarget && stop.status === 'PENDING') ? [32, 48] : [22, 36],
                                iconAnchor: (isFocusTarget && stop.status === 'PENDING') ? [16, 48] : [11, 36]
                            })}
                            opacity={isHidden ? 0.05 : 1}
                            eventHandlers={{ click: () => onSelectStop(stop.stop_id) }}
                        >
                            <Popup>
                                <div className="p-1 px-2 font-bold text-xs">{stop.label}</div>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>

            {/* ─── OVERLAYS ────────────────────────────────────────── */}
            <div className="absolute top-6 left-6 z-[1000] space-y-3">
                <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-purple-100 shadow-xl w-56 animate-in slide-in-from-left duration-500">
                    <div className="flex items-center justify-between mb-3">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                            <MapIcon className="h-3 w-3 text-purple-600" /> {t('monitoring')}
                        </h4>
                        {isManager && (
                            <div className="flex items-center gap-1.5 bg-gray-100 p-0.5 rounded-lg">
                                <button
                                    onClick={() => setViewMode('staff')}
                                    className={`p-1 rounded-md ${viewMode === 'staff' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400'}`}
                                >
                                    <User className="h-3 w-3" />
                                </button>
                                <button
                                    onClick={() => setViewMode('area')}
                                    className={`p-1 rounded-md ${viewMode === 'area' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400'}`}
                                >
                                    <LayoutGrid className="h-3 w-3" />
                                </button>
                                <button
                                    onClick={() => setShowTerritories(!showTerritories)}
                                    className={`p-1 rounded-md transition-all ${showTerritories ? 'bg-white shadow-sm text-purple-600' : 'text-gray-400'}`}
                                >
                                    <Layers className="h-3 w-3" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2.5">
                        <button
                            onClick={() => isManager && setShowRanking(true)}
                            className={`w-full flex items-center justify-between group ${isManager ? 'cursor-pointer' : 'cursor-default'}`}
                        >
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500" /> {t('pendingShops')}
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-xs font-black text-gray-900">{stops.filter(s => s.status === 'PENDING').length}</span>
                                {isManager && <TrendingUp className="h-3 w-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
                            </div>
                        </button>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500" /> {t('deliveredStatus')}
                            </div>
                            <span className="text-xs font-black text-gray-900">{stops.filter(s => s.status === 'DELIVERED').length}</span>
                        </div>
                    </div>
                </div>

                {isManager && (focusStaffId || focusArea) && (
                    <div className="bg-purple-600 text-white p-4 rounded-3xl shadow-xl w-56 animate-in slide-in-from-top duration-300">
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80">{t('activeFocus')}</p>
                            <button onClick={clearFocus} className="hover:rotate-90 transition-transform">
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </div>
                        <h2 className="text-sm font-black flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            {focusStaffId
                                ? staffPositions.find(p => p.id === focusStaffId)?.name
                                : `${t(focusArea as any) || focusArea}`}
                        </h2>
                    </div>
                )}

                {isManager && viewMode === 'area' && (
                    <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl border border-purple-100 shadow-xl w-56 animate-in slide-in-from-left duration-500">
                        <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">{t('areaPerformance')}</h4>
                        <div className="space-y-2">
                            {areaStats.map(a => (
                                <button
                                    key={a.name}
                                    onClick={() => handleAreaFocus(a.name)}
                                    className={`w-full flex items-center justify-between p-2 rounded-xl transition-all ${focusArea === a.name ? 'bg-purple-100 text-purple-700 ring-1 ring-purple-200' : 'hover:bg-gray-50 text-gray-600'}`}
                                >
                                    <div className="flex items-center gap-2 text-xs font-bold">
                                        <MapPin className="h-3 w-3" /> {a.name}
                                    </div>
                                    <span className="text-xs font-black">{a.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-[1000] flex items-center justify-between pointer-events-none">
                <div className="pointer-events-auto">
                    {(focusStaffId || focusArea) && (
                        <button
                            onClick={clearFocus}
                            className="bg-red-500 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black shadow-lg flex items-center gap-2 active:scale-95 transition-all"
                        >
                            <FilterX className="h-4 w-4" /> {t('clearFocus')}
                        </button>
                    )}
                </div>

                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-purple-100 shadow-xl flex items-center justify-between pointer-events-auto min-w-[320px]">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Truck className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-gray-900">{staffPositions.length} {t('staffActive')}</p>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1.5 font-medium">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                {t('realTimeSyncActive')}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={centerOnFleet}
                        className="px-6 py-2.5 rounded-xl purple-gradient text-white text-[10px] font-black shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                    >
                        <Maximize2 className="h-3.5 w-3.5" /> {t('reCenter')}
                    </button>
                </div>
            </div>

            {isManager && showRanking && (
                <div className="absolute inset-y-6 right-6 z-[2000] w-72 bg-white/95 backdrop-blur-xl border border-purple-100 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-500">
                    <div className="p-6 border-b border-gray-100 bg-purple-50/50">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-purple-600" /> {t('ranking')}
                            </h2>
                            <button onClick={() => setShowRanking(false)} className="h-8 w-8 rounded-full bg-white border border-gray-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">{t('rankingDesc')}</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {staffRankings.map((s, idx) => (
                            <button
                                key={s.id}
                                onClick={() => { handleStaffFocus(s.id); setShowRanking(false); }}
                                className={`w-full group flex items-center gap-3 p-3 rounded-2xl transition-all border ${focusStaffId === s.id ? 'bg-purple-600 border-purple-600 shadow-lg' : 'bg-white border-gray-100 hover:border-purple-200 hover:shadow-sm'}`}
                            >
                                <div className={`h-8 w-8 rounded-xl flex items-center justify-center font-black text-xs ${focusStaffId === s.id ? 'bg-white/20 text-white' : 'bg-gray-50 text-gray-400'}`}>
                                    #{idx + 1}
                                </div>
                                <div className="flex-1 text-left min-w-0">
                                    <p className={`text-xs font-black truncate ${focusStaffId === s.id ? 'text-white' : 'text-gray-900'}`}>{s.name}</p>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <div className={`h-1 w-1 rounded-full ${s.pending > 5 ? 'bg-red-500' : 'bg-green-500'}`} />
                                        <p className={`text-[10px] font-bold ${focusStaffId === s.id ? 'text-white/70' : 'text-gray-400'}`}>
                                            {s.pending} {t('pendingStatus')}
                                        </p>
                                    </div>
                                </div>
                                <ChevronRight className={`h-4 w-4 ${focusStaffId === s.id ? 'text-white/40' : 'text-gray-200 group-hover:text-purple-400 translate-x-0 group-hover:translate-x-1 transition-all'}`} />
                            </button>
                        ))}
                    </div>

                    <div className="p-4 bg-gray-50 border-t border-gray-100">
                        <div className="p-3 bg-white rounded-2xl border border-gray-200 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
                                <AlertTriangle className="h-4 w-4" />
                            </div>
                            <p className="text-[10px] font-bold text-gray-500 leading-snug">
                                <span className="text-red-600">{t('alert')}</span> {t('highPendingCountCentral')}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .leaflet-container { background: #f8fafc; border-radius: 1.5rem; }
                .leaflet-popup-content-wrapper { border-radius: 1.25rem; border: 1px solid #f3e8ff; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); }
                .leaflet-bar { border: none !important; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important; }
            `}</style>
        </div>
    );
};

export default RouteMap;
