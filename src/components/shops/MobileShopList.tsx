import { Store, Phone, MapPin, ChevronRight, AlertTriangle, CheckCircle2, MoreVertical } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Shop } from "@/store/types";

interface Props {
    shops: Shop[];
    onOpenShop: (id: string) => void;
    onFixGeo: (id: string) => void;
}

const MobileShopList = ({ shops, onOpenShop, onFixGeo }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="h-[calc(100vh-280px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-100">
            <div className="space-y-4">
                {shops.map((shop) => (
                    <div
                        key={shop.id}
                        onClick={() => onOpenShop(shop.id)}
                        className="relative p-5 rounded-3xl border border-gray-100 bg-white shadow-sm transition-all active:scale-[0.98] group"
                    >
                        {/* Top Section: Icon & Identity */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-active:bg-purple-600 group-active:text-white transition-colors">
                                    <Store className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-tight line-clamp-1">
                                        {shop.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">
                                        <span className="bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 shrink-0">#{shop.id.split('-')[1]}</span>
                                        <span className="truncate">{shop.area}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); /* Mock menu */ }}
                                className="h-8 w-8 rounded-full flex items-center justify-center text-gray-300 hover:text-gray-600"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Middle Section: Location & Status */}
                        <div className="flex items-center justify-between py-3 border-y border-gray-50 mb-4 gap-4">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider mb-0.5 truncate">{t('geoStatus')}</span>
                                    {shop.lat ? (
                                        <div className="flex items-center gap-1 text-[9px] font-black text-green-600 truncate">
                                            <CheckCircle2 className="h-3 w-3 shrink-0" /> {t('verified').toUpperCase()}
                                        </div>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onFixGeo(shop.id); }}
                                            className="flex items-center gap-1 text-[9px] font-black text-red-500 animate-pulse truncate"
                                        >
                                            <AlertTriangle className="h-3 w-3 shrink-0" /> {t('fixGeo').toUpperCase()}
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className="text-right shrink-0">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider mb-0.5 block">{t('phone')}</span>
                                <p className="text-[10px] font-bold text-gray-900">{shop.phone || '+91 000 000 0000'}</p>
                            </div>
                        </div>

                        {/* Bottom Section: Financials & Action */}
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider block mb-0.5 truncate">{t('outstanding')}</span>
                                <span className="text-lg font-black text-gray-900 font-mono">₹{shop.balance.toLocaleString()}</span>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-purple-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                                <ChevronRight className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                ))}

                {shops.length === 0 && (
                    <div className="py-12 text-center text-gray-400 italic text-sm font-medium border-2 border-dashed border-gray-100 rounded-3xl">
                        {t('noShopsFound')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileShopList;
