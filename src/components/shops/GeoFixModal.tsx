import { useState } from "react";
import { MapPin, Globe, Save, X, Search } from "lucide-react";
import { Shop } from "@/store/types";
import { toast } from "sonner";
import { useDraftStore, useUserStore } from "@/store";
import { createDraftFromAI } from "@/data/generators";

interface Props {
    shops: Shop[];
    onClose: () => void;
}

const GeoFixModal = ({ shops, onClose }: Props) => {
    const [selectedShopId, setSelectedShopId] = useState<string | null>(shops[0]?.id || null);
    const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 13.0827, lng: 80.2707 }); // Chennai default
    const { addDraft } = useDraftStore();
    const { currentUser } = useUserStore();

    const selectedShop = shops.find(s => s.id === selectedShopId);

    const handleSave = () => {
        if (!selectedShop) return;

        const draft = createDraftFromAI('SHOP_UPDATE', currentUser.name);
        draft.description = `Update Geo-Coordinates for ${selectedShop.name}`;
        draft.payload = { shopId: selectedShop.id, coordinates: coords };

        addDraft(draft);
        toast.success(`Coordinates updated for ${selectedShop.name}`);

        // Move to next shop or close if done
        const currentIndex = shops.findIndex(s => s.id === selectedShopId);
        if (currentIndex < shops.length - 1) {
            setSelectedShopId(shops[currentIndex + 1].id);
        } else {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col md:flex-row">

                {/* Sidebar List */}
                <div className="w-full md:w-1/3 border-r border-gray-100 bg-gray-50 flex flex-col">
                    <div className="p-4 border-b border-gray-100">
                        <h3 className="font-black text-gray-900 flex items-center gap-2">
                            <Globe className="h-4 w-4 text-purple-600" /> Geo-Fix Tool
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">{shops.length} shops missing location data</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {shops.map(shop => (
                            <button
                                key={shop.id}
                                onClick={() => setSelectedShopId(shop.id)}
                                className={`w-full text-left p-3 rounded-xl border transition-all ${selectedShopId === shop.id
                                        ? 'bg-white border-purple-400 shadow-md ring-1 ring-purple-100'
                                        : 'bg-transparent border-transparent hover:bg-gray-100'
                                    }`}
                            >
                                <p className={`text-sm font-bold ${selectedShopId === shop.id ? 'text-purple-700' : 'text-gray-700'}`}>
                                    {shop.name}
                                </p>
                                <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                    <MapPin className="h-3 w-3" /> {shop.area}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Map Area */}
                <div className="flex-1 relative bg-gray-100 flex flex-col">
                    {/* Map Mock */}
                    <div className="flex-1 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/80.2707,13.0827,12,0/800x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2s4In0.example')] bg-cover bg-center relative group cursor-crosshair">
                        <div className="absolute inset-0 bg-purple-50/20 pointer-events-none" />

                        {/* Pin */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform group-hover:-translate-y-3 transition-transform duration-300">
                            <MapPin className="h-10 w-10 text-red-600 drop-shadow-xl" fill="currentColor" />
                            <div className="h-3 w-3 bg-black/20 rounded-full blur-sm mx-auto mt-[-5px]" />
                        </div>

                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-xl shadow-lg p-3">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Target Location</p>
                            <p className="text-sm font-black text-gray-900">{selectedShop?.area}, Chennai</p>
                        </div>
                    </div>

                    {/* Editor Footer */}
                    <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-4">
                        <div className="flex-1 grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Latitude</label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    value={coords.lat}
                                    onChange={e => setCoords(prev => ({ ...prev, lat: parseFloat(e.target.value) }))}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-mono font-bold text-gray-800"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 uppercase">Longitude</label>
                                <input
                                    type="number"
                                    step="0.0001"
                                    value={coords.lng}
                                    onChange={e => setCoords(prev => ({ ...prev, lng: parseFloat(e.target.value) }))}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-mono font-bold text-gray-800"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={onClose} className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100">
                                CANCEL
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 rounded-xl purple-gradient text-xs font-bold text-white shadow-lg shadow-purple-200 hover:opacity-90 flex items-center gap-2"
                            >
                                <Save className="h-4 w-4" /> SAVE POSITION
                            </button>
                        </div>
                    </div>
                </div>

                <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg text-gray-400 hover:text-red-500 transition-colors">
                    <X className="h-5 w-5" />
                </button>

            </div>
        </div>
    );
};

export default GeoFixModal;
