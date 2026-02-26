import { Store, User, Phone, MapPin, Calendar, Clock, AlertTriangle, CheckCircle, TrendingUp, Search } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { VirtualizedTable } from "@/components/shared/VirtualizedTable";
import { useState } from "react";
import { useShopStore } from "@/store"; // Assuming you have this
import { Shop } from "@/store/types"; // Assuming this type exists

interface Props {
    shops: Shop[];
    onOpenShop: (shopId: string) => void;
    onFixGeo: (shopId: string) => void;
}

const ShopTable = ({ shops, onOpenShop, onFixGeo }: Props) => {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden h-[600px] flex flex-col">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-purple-100 flex-1">
                <div className="min-w-[700px] md:min-w-full h-full flex flex-col">
                    <VirtualizedTable
                        items={shops}
                        height={600}
                        rowHeight={72}
                        header={
                            <div className="flex items-center px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 border-b border-gray-100">
                                <div className="w-10"></div>
                                <div className="flex-1 min-w-[200px]">Shop Details</div>
                                <div className="hidden md:block w-32">Location</div>
                                <div className="hidden sm:block w-32">Geo Status</div>
                                <div className="w-32 text-right">Outstanding</div>
                                <div className="hidden sm:block w-24 text-right pr-4">Action</div>
                            </div>
                        }
                        renderRow={(shop) => (
                            <div
                                onClick={() => onOpenShop(shop.id)}
                                className="flex items-center px-6 h-full border-b border-gray-50 hover:bg-purple-50/20 transition-all cursor-pointer group hover:shadow-[inset_4px_0_0_0_#9333ea]"
                            >
                                <div className="w-10">
                                    <div className="h-9 w-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                                        <Store className="h-4.5 w-4.5" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-[200px] py-4">
                                    <p className="font-black text-sm text-gray-900 group-hover:text-purple-700 transition-colors uppercase tracking-tight truncate">{shop.name}</p>
                                    <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                                        <span className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">#{shop.id.split('-')[1]}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Phone className="h-2.5 w-2.5" /> +91 999 000 0000</span>
                                    </div>
                                </div>
                                <div className="hidden md:block w-32">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black text-gray-900 uppercase tracking-tight truncate">{shop.area}</span>
                                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">ZONE A</span>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-32">
                                    {shop.lat ? (
                                        <div className="flex items-center gap-1.5 text-[9px] font-black text-green-600 bg-green-100/50 px-2 py-1 rounded-lg">
                                            <CheckCircle className="h-3 w-3" /> VERIFIED
                                        </div>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onFixGeo(shop.id); }}
                                            className="flex items-center gap-1.5 text-[9px] font-black text-red-500 bg-red-100/50 px-2 py-1 rounded-lg hover:bg-red-200 transition-colors animate-pulse"
                                        >
                                            <AlertTriangle className="h-3 w-3" /> FIX GEO
                                        </button>
                                    )}
                                </div>
                                <div className="w-32 text-right">
                                    <div className="flex flex-col items-end">
                                        <span className="text-sm font-black text-gray-900 leading-none">₹{shop.balance.toLocaleString()}</span>
                                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mt-1">Outstanding</span>
                                    </div>
                                </div>
                                <div className="hidden sm:block w-24 text-right pr-4">
                                    <button className="text-[10px] font-black text-purple-600 opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest hover:underline">
                                        PROFILE
                                    </button>
                                </div>
                            </div>
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default ShopTable;
