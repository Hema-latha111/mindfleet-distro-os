import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icons for Vite bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Types ───────────────────────────────────────────────────────────
interface StopInfo {
    id: string;
    name: string;
    lat: number;
    lng: number;
    area?: string;
    address?: string;
    owner?: string;
    phone?: string;
    status?: 'pending' | 'current' | 'done' | 'failed';
}

interface LiveNavMapProps {
    currentPosition: { lat: number; lng: number };
    nextStop: StopInfo | null;
    allStops: StopInfo[];
    currentStopIndex: number;
    distance: string;
    eta: string;
    isNavigating: boolean;
    onRouteReady?: (routeCoords: [number, number][]) => void;
}

// ─── Marker Icons ───────────────────────────────────────────────────
const blueIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const greyIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
    iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// ─── Bike SVG (raw string for dynamic rotation) ─────────────────────
const BIKE_SVG = `
<svg width="48" height="64" viewBox="0 0 120 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="14" rx="14" ry="9" fill="#3D3D3D"/>
    <ellipse cx="60" cy="14" rx="9" ry="5" fill="#5A5A5A"/>
    <ellipse cx="60" cy="14" rx="4" ry="2" fill="#777"/>
    <path d="M32 26 L46 20" stroke="#4A4A4A" stroke-width="5" stroke-linecap="round"/>
    <path d="M88 26 L74 20" stroke="#4A4A4A" stroke-width="5" stroke-linecap="round"/>
    <rect x="24" y="23" width="12" height="7" rx="3.5" fill="#333"/>
    <rect x="84" y="23" width="12" height="7" rx="3.5" fill="#333"/>
    <path d="M34 30 L44 44" stroke="#D4956A" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M86 30 L76 44" stroke="#D4956A" stroke-width="6.5" stroke-linecap="round"/>
    <ellipse cx="60" cy="40" rx="16" ry="13" fill="#8017E1"/>
    <ellipse cx="60" cy="37" rx="14" ry="10" fill="#9B3FF5"/>
    <rect x="46" y="44" width="28" height="6" rx="3" fill="#2D064E"/>
    <ellipse cx="54" cy="34" rx="6" ry="3" fill="#AE5FFF" opacity="0.4"/>
    <rect x="38" y="52" width="44" height="28" rx="6" fill="#8017E1"/>
    <rect x="50" y="52" width="20" height="6" rx="3" fill="#6B10C4"/>
    <line x1="60" y1="54" x2="60" y2="78" stroke="#6B10C4" stroke-width="1.5"/>
    <ellipse cx="40" cy="58" rx="7" ry="5" fill="#8017E1"/>
    <ellipse cx="80" cy="58" rx="7" ry="5" fill="#8017E1"/>
    <rect x="36" y="82" width="48" height="36" rx="5" fill="#5A0EAD"/>
    <rect x="38" y="84" width="44" height="32" rx="4" fill="#6B10C4"/>
    <rect x="38" y="82" width="44" height="8" rx="4" fill="#7B1FD4"/>
    <rect x="46" y="94" width="28" height="18" rx="3" fill="#8017E1"/>
    <text x="60" y="109" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="20" fill="white">M</text>
    <rect x="50" y="118" width="20" height="10" rx="4" fill="#5A0EAD"/>
    <rect x="54" y="120" width="12" height="3" rx="1.5" fill="#FF4444"/>
    <ellipse cx="60" cy="138" rx="16" ry="10" fill="#3D3D3D"/>
    <ellipse cx="60" cy="138" rx="10" ry="6" fill="#5A5A5A"/>
    <ellipse cx="60" cy="138" rx="4" ry="2" fill="#777"/>
    <path d="M44 134 Q60 126 76 134" stroke="#5A0EAD" stroke-width="4" stroke-linecap="round" fill="none"/>
</svg>`;

// ─── Bearing calculation ────────────────────────────────────────────
function calcBearing(from: { lat: number; lng: number }, to: { lat: number; lng: number }): number {
    const dLng = (to.lng - from.lng) * Math.PI / 180;
    const lat1 = from.lat * Math.PI / 180;
    const lat2 = to.lat * Math.PI / 180;
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}

// ─── Create rotated bike icon ───────────────────────────────────────
function createBikeIcon(bearing: number): L.DivIcon {
    return L.divIcon({
        className: 'bike-icon-marker', // Target this in global CSS
        html: `
            <div style="position:relative;width:48px;height:48px;filter:drop-shadow(0 2px 6px rgba(0,0,0,0.3));">
                <!-- Pulsing ring -->
                <div style="position:absolute;inset:-4px;border-radius:50%;background:rgba(128,23,225,0.15);animation:rider-pulse 2s ease-out infinite;"></div>
                
                <!-- Bike content wrapper with rotation transition -->
                <div style="transform:rotate(${bearing}deg); transition: transform 0.4s cubic-bezier(0.1, 0.8, 0.2, 1); width:48px;height:48px;display:flex;align-items:center;justify-content:center;">
                    <div style="width:36px;height:48px;">
                        ${BIKE_SVG.replace('width="48" height="64"', 'width="36" height="48"')}
                    </div>
                </div>
            </div>
            <style>
                @keyframes rider-pulse {
                    0% { transform:scale(1); opacity:0.8; }
                    100% { transform:scale(2.5); opacity:0; }
                }
                /* Smooth position movement for the marker itself */
                .bike-icon-marker {
                    transition: transform 0.1s linear !important; 
                }
            </style>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
        popupAnchor: [0, -24],
    });
}

// ─── Rotating Bike Marker (Smooth position + rotation) ───────────────
function RotatingBikeMarker({ position }: { position: { lat: number; lng: number } }) {
    const map = useMap();
    const markerRef = useRef<L.Marker | null>(null);
    const prevPosRef = useRef(position);
    const bearingRef = useRef(0);

    // Initial Marker Creation
    useEffect(() => {
        if (!markerRef.current) {
            markerRef.current = L.marker([position.lat, position.lng], {
                icon: createBikeIcon(0),
                zIndexOffset: 1000,
            }).addTo(map);

            markerRef.current.bindPopup(`
                <div style="font-family:system-ui,sans-serif;text-align:center;">
                    <p style="font-size:13px;font-weight:700;color:#8017E1;margin:0;">🏍️ Delivery Partner</p>
                    <p style="font-size:10px;color:#999;margin:2px 0 0;">Live Location</p>
                </div>
            `);
        }
        return () => {
            if (markerRef.current) {
                map.removeLayer(markerRef.current);
                markerRef.current = null;
            }
        };
    }, [map]);

    // Update Position and Rotation
    useEffect(() => {
        if (!markerRef.current) return;

        // Calculate bearing for rotation
        const dLat = position.lat - prevPosRef.current.lat;
        const dLng = position.lng - prevPosRef.current.lng;

        // Only update bearing if movement is significant to avoid "spinning" when idle
        if (Math.abs(dLat) > 0.000001 || Math.abs(dLng) > 0.000001) {
            bearingRef.current = calcBearing(prevPosRef.current, position);
        }

        // Live update position and icon (icon carries the bearing)
        markerRef.current.setLatLng([position.lat, position.lng]);
        markerRef.current.setIcon(createBikeIcon(bearingRef.current));

        prevPosRef.current = position;
    }, [position]);

    return null;
}

// ─── Auto-fit bounds ────────────────────────────────────────────
function MapAutoFit({ stops, currentPosition }: { stops: StopInfo[]; currentPosition: { lat: number; lng: number } }) {
    const map = useMap();
    const hasInit = useRef(false);

    useEffect(() => {
        if (hasInit.current || stops.length === 0) return;
        const points: L.LatLngExpression[] = [
            [currentPosition.lat, currentPosition.lng],
            ...stops.map(s => [s.lat, s.lng] as [number, number]),
        ];
        const bounds = L.latLngBounds(points);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 16 });
        hasInit.current = true;
    }, [map, stops, currentPosition]);

    return null;
}

// ─── OSRM Road Route Fetcher ────────────────────────────────────
async function fetchRoadRoute(
    waypoints: { lat: number; lng: number }[]
): Promise<[number, number][]> {
    if (waypoints.length < 2) return [];

    const coords = waypoints.map(w => `${w.lng},${w.lat}`).join(';');
    const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;

    try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error(`OSRM error: ${resp.status}`);
        const data = await resp.json();

        if (data.code !== 'Ok' || !data.routes?.[0]?.geometry?.coordinates) {
            throw new Error('No route found');
        }

        const coordinates: [number, number][] = data.routes[0].geometry.coordinates.map(
            (c: [number, number]) => [c[1], c[0]] as [number, number]
        );

        return coordinates;
    } catch (err) {
        console.warn('OSRM road route failed, using straight line fallback:', err);
        return waypoints.map(w => [w.lat, w.lng] as [number, number]);
    }
}

// ─── Main Component ─────────────────────────────────────────────
const LiveNavMap = ({
    currentPosition,
    nextStop,
    allStops,
    currentStopIndex,
    distance,
    eta,
    isNavigating,
    onRouteReady,
}: LiveNavMapProps) => {

    // Real road route from OSRM
    const [roadRoute, setRoadRoute] = useState<[number, number][]>([]);
    const [routeLoading, setRouteLoading] = useState(false);
    const fetchedKeyRef = useRef('');

    // Fetch real road route when stops change
    useEffect(() => {
        if (allStops.length < 1) return;

        const remainingStops = allStops.slice(currentStopIndex);
        const waypoints = [
            currentPosition,
            ...remainingStops.map(s => ({ lat: s.lat, lng: s.lng })),
        ];

        // Only re-fetch when stop index changes (not on every GPS tick)
        const key = `${currentStopIndex}|${remainingStops.map(s => s.id).join(',')}`;
        if (key === fetchedKeyRef.current) return;
        fetchedKeyRef.current = key;

        const maxWaypoints = 25;
        const limitedWaypoints = waypoints.length > maxWaypoints
            ? [waypoints[0], ...waypoints.slice(1).filter((_, i) => i % Math.ceil(waypoints.length / maxWaypoints) === 0)]
            : waypoints;

        setRouteLoading(true);
        fetchRoadRoute(limitedWaypoints)
            .then(coords => {
                setRoadRoute(coords);
                // Pass route coords to parent for road-following animation
                if (onRouteReady) onRouteReady(coords);
            })
            .finally(() => setRouteLoading(false));
    }, [allStops, currentStopIndex]);

    // Center on all stops
    const center: [number, number] = allStops.length > 0
        ? [allStops[0].lat, allStops[0].lng]
        : [currentPosition.lat, currentPosition.lng];

    // Count stats for legend
    const deliveredCount = allStops.filter(s => s.status === 'done').length;
    const pendingCount = allStops.filter(s => s.status === 'pending' || s.status === 'current').length;

    return (
        <div className="relative w-full h-full overflow-hidden" style={{ minHeight: '250px' }}>
            <MapContainer
                center={center}
                zoom={15}
                zoomControl={true}
                attributionControl={true}
                className="w-full h-full"
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapAutoFit stops={allStops} currentPosition={currentPosition} />

                {/* ─── Road-following route line ──────────────────── */}
                {roadRoute.length > 1 && (
                    <>
                        <Polyline
                            positions={roadRoute}
                            pathOptions={{
                                color: '#1a56db',
                                weight: 7,
                                opacity: 0.3,
                                lineCap: 'round',
                                lineJoin: 'round',
                            }}
                        />
                        <Polyline
                            positions={roadRoute}
                            pathOptions={{
                                color: '#4285f4',
                                weight: 5,
                                opacity: 0.9,
                                lineCap: 'round',
                                lineJoin: 'round',
                            }}
                        />
                    </>
                )}

                {/* ─── All stop markers ───────────────────────────── */}
                {allStops.map((stop, i) => {
                    const icon = stop.status === 'done' ? greyIcon
                        : stop.status === 'current' ? redIcon
                            : blueIcon;

                    return (
                        <Marker
                            key={stop.id}
                            position={[stop.lat, stop.lng]}
                            icon={icon}
                        >
                            <Popup maxWidth={300} minWidth={220}>
                                <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.5' }}>
                                    <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', fontWeight: 800, color: '#1a1a1a' }}>
                                        {stop.name}
                                        <span style={{
                                            marginLeft: '8px',
                                            fontSize: '10px',
                                            fontWeight: 700,
                                            padding: '2px 8px',
                                            borderRadius: '12px',
                                            background: stop.status === 'done' ? '#dcfce7' : stop.status === 'current' ? '#fef3c7' : '#dbeafe',
                                            color: stop.status === 'done' ? '#15803d' : stop.status === 'current' ? '#b45309' : '#1d4ed8',
                                        }}>
                                            {stop.status === 'done' ? 'Delivered' : stop.status === 'current' ? 'Active' : `Stop ${i + 1}`}
                                        </span>
                                    </h3>

                                    <div style={{ fontSize: '12px', color: '#555', marginTop: '8px' }}>
                                        <p style={{ margin: '3px 0' }}>
                                            <strong>Address:</strong> {stop.address || stop.area || 'N/A'}
                                        </p>
                                        {stop.owner && (
                                            <p style={{ margin: '3px 0' }}>
                                                <strong>Owner:</strong> {stop.owner}
                                            </p>
                                        )}
                                        {stop.phone && (
                                            <p style={{ margin: '3px 0' }}>
                                                <strong>Contact:</strong> {stop.phone}
                                            </p>
                                        )}
                                        <p style={{ margin: '3px 0' }}>
                                            <strong>Stop Order:</strong> #{i + 1} of {allStops.length}
                                        </p>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* ─── Rotating delivery bike marker ─────────────── */}
                <RotatingBikeMarker position={currentPosition} />

            </MapContainer>

            {/* ─── Legend (top-right) ─────────────────────────────── */}
            <div className="absolute top-3 right-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 px-3 py-2" style={{ minWidth: '130px' }}>
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                    <span className="text-xs font-bold text-gray-700">Pending: {pendingCount}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                    <span className="text-xs font-bold text-gray-700">Delivered: {deliveredCount}</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                    <span className="text-xs font-bold text-gray-700">Current: 1</span>
                </div>
                <div className="border-t border-gray-200 mt-1.5 pt-1">
                    <span className="text-[10px] text-gray-400 font-medium">Total: {allStops.length}</span>
                </div>
            </div>

            {/* ─── Route loading indicator ────────────────────────── */}
            {routeLoading && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-sm rounded-full shadow-md border border-gray-200 px-4 py-1.5 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-500">Loading road route...</span>
                </div>
            )}

            {/* ─── Distance/ETA badge (top-left) ─────────────────── */}
            {isNavigating && !routeLoading && (
                <div className="absolute top-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 px-3 py-2">
                    <div className="flex items-center gap-3">
                        <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">Distance</p>
                            <p className="text-sm font-black text-gray-900">{distance} km</p>
                        </div>
                        <div className="h-6 w-px bg-gray-200" />
                        <div>
                            <p className="text-[9px] font-bold text-gray-400 uppercase">ETA</p>
                            <p className="text-sm font-black text-green-600">{eta} min</p>
                        </div>
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse ml-1" />
                    </div>
                </div>
            )}

            {/* ─── Next stop info bar (bottom) ───────────────────── */}
            {nextStop && isNavigating && (
                <div className="absolute bottom-3 left-3 right-3 z-[1000]">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 px-4 py-2.5 flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 font-black text-xs">{currentStopIndex + 1}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-gray-900 truncate">{nextStop.name}</p>
                            <p className="text-[10px] text-gray-500 truncate">{nextStop.address || nextStop.area}</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-blue-50 flex-shrink-0">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-blue-600">LIVE</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LiveNavMap;
