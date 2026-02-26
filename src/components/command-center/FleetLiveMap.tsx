import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Truck, AlertTriangle, CheckCircle, Package, Map as MapIcon, Maximize2, RotateCcw } from "lucide-react";
import { useEffect, useState, useMemo } from 'react';
import { useTranslation } from "@/hooks/useTranslation";

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Bike SVG for Fleet ─────────────────────
const BIKE_SVG = (color: string) => `
<svg width="40" height="40" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="138" rx="16" ry="10" fill="#3D3D3D"/>
    <ellipse cx="60" cy="37" rx="14" ry="10" fill="${color}"/>
    <rect x="38" y="52" width="44" height="28" rx="6" fill="${color}"/>
    <rect x="36" y="82" width="48" height="36" rx="5" fill="#5A0EAD"/>
    <text x="60" y="105" text-anchor="middle" font-family="Arial Black" font-weight="900" font-size="24" fill="white">M</text>
</svg>`;

const createBikeIcon = (color: string = '#8017E1') => {
    return L.divIcon({
        className: 'fleet-bike-icon',
        html: `
            <div style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));">
                <div style="width:32px; height:32px; background: white; border-radius: 10px; padding: 4px; display: flex; align-items: center; justify-content: center; border: 2px solid ${color};">
                    ${BIKE_SVG(color)}
                </div>
                <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid ${color};"></div>
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 36],
        popupAnchor: [0, -32],
    });
};

const shopIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    iconSize: [18, 30],
    iconAnchor: [9, 30],
});

const CHENNAI_CENTER: [number, number] = [13.0827, 80.2707];

const FleetLiveMap = () => {
    const [staffPositions, setStaffPositions] = useState<any[]>([]);
    const [map, setMap] = useState<L.Map | null>(null);
    const { t } = useTranslation();

    // Initial Positions
    useEffect(() => {
        const initial = Array.from({ length: 12 }).map((_, i) => ({
            id: `s${i + 1}`,
            name: `${t('rider')} ${i + 1}`,
            lat: CHENNAI_CENTER[0] + (Math.random() - 0.5) * 0.05,
            lng: CHENNAI_CENTER[1] + (Math.random() - 0.5) * 0.05,
            status: Math.random() > 0.8 ? 'Delayed' : 'Active',
            battery: Math.floor(Math.random() * 40 + 60),
            task: `${t('deliveringTo')} ${t('mockShopPrefix')} #${Math.floor(Math.random() * 100)}`,
        }));
        setStaffPositions(initial);
    }, []);

    // Simulated Movement
    useEffect(() => {
        const interval = setInterval(() => {
            setStaffPositions(prev => prev.map(p => ({
                ...p,
                lat: p.lat + (Math.random() - 0.5) * 0.0005,
                lng: p.lng + (Math.random() - 0.5) * 0.0005,
            })));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const resetView = () => {
        if (map) {
            map.setView(CHENNAI_CENTER, 13);
        }
    };

    return (
        <div className="h-full w-full relative group">
            <MapContainer
                center={CHENNAI_CENTER}
                zoom={13}
                zoomControl={false}
                className="h-full w-full rounded-2xl"
                ref={setMap}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; OpenStreetMap contributors'
                />

                {staffPositions.map(staff => (
                    <Marker
                        key={staff.id}
                        position={[staff.lat, staff.lng]}
                        icon={createBikeIcon(staff.status === 'Delayed' ? '#ef4444' : '#8017E1')}
                    >
                        <Popup>
                            <div className="p-2 min-w-[150px]">
                                <p className="text-xs font-black text-gray-900 mb-1">{staff.name}</p>
                                <div className="flex items-center gap-1.5 mb-2">
                                    <span className={`h-1.5 w-1.5 rounded-full ${staffPositions.find(p => p.id === staff.id)?.status === 'Delayed' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                                    <span className="text-[10px] font-bold text-gray-500 uppercase">{t(staff.status.toUpperCase() as any) || staff.status}</span>
                                </div>
                                <div className="space-y-1 border-t pt-2 border-gray-100">
                                    <p className="text-[10px] text-gray-600 font-medium flex items-center gap-1">
                                        <Package className="h-3 w-3" /> {staff.task}
                                    </p>
                                    <p className="text-[10px] text-gray-400">{t('batteryLabel')}: {staff.battery}%</p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Overlay Stats */}
            <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-purple-100 shadow-xl pointer-events-auto">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <MapIcon className="h-3 w-3 text-purple-600" /> {t('mapControls')}
                    </h4>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-700">
                                <div className="h-2.5 w-2.5 rounded-full bg-purple-500" /> {t('pendingShops')}
                            </div>
                            <span className="text-xs font-black text-gray-900">116</span>
                        </div>
                        <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-700">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500" /> {t('deliveredStatus')}
                            </div>
                            <span className="text-xs font-black text-gray-900">312</span>
                        </div>
                        <div className="flex items-center justify-between gap-8">
                            <div className="flex items-center gap-2 text-[11px] font-bold text-gray-700">
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500" /> {t('slaRiskLabel')}
                            </div>
                            <span className="text-xs font-black text-red-600 animate-pulse">4</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-[1000] pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-purple-100 shadow-xl pointer-events-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center">
                            <Truck className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm font-black text-gray-900">12 {t('staffActiveLabel')}</p>
                            <p className="text-[10px] text-gray-500 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                                {t('liveGpsActive')} • {t('chennaiNorth')}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={resetView}
                            className="p-2.5 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 text-gray-500 transition-all active:scale-95"
                            title={t('reCenter')}
                        >
                            <RotateCcw className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                .leaflet-container {
                    background: #f8fafc;
                }
                .leaflet-popup-content-wrapper {
                    border-radius: 12px;
                    padding: 0;
                }
                .leaflet-popup-content {
                    margin: 0;
                }
            `}</style>
        </div>
    );
};

export default FleetLiveMap;
