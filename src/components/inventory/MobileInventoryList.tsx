import { Package, AlertTriangle, ChevronRight, TrendingUp } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import StatusBadge from "@/components/shared/StatusBadge";

interface Props {
    skus: any[];
    onSelect: (id: string) => void;
}

const MobileInventoryList = ({ skus, onSelect }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-4 md:hidden">
            {skus.map((sku) => (
                <div
                    key={sku.id}
                    onClick={() => onSelect(sku.id)}
                    className="relative p-5 rounded-3xl border border-gray-100 bg-white shadow-sm transition-all active:scale-[0.98] group overflow-hidden"
                >
                    {/* Visual context indicator */}
                    <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl -mr-12 -mt-12 transition-colors ${sku.lowStock ? 'bg-red-50/50' : 'bg-purple-50/50'
                        }`} />

                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${sku.lowStock ? 'bg-red-50 text-red-500' : 'bg-purple-50 text-purple-600'
                                }`}>
                                <Package className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="text-[13px] font-black text-gray-900 uppercase tracking-tight line-clamp-1">
                                    {sku.name}
                                </h3>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5 truncate">
                                    {sku.category} · #{sku.id.split('-')[1]}
                                </p>
                            </div>
                        </div>
                        <StatusBadge status={sku.lowStock ? t('lowStockLabel') : t('inStock')} size="sm" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50/50 relative z-10">
                        <div>
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-wider mb-1.5 break-words line-clamp-1">{t('stockLevel')}</p>
                            <div className="flex items-baseline gap-1">
                                <span className={`text-sm font-black font-mono ${sku.lowStock ? 'text-red-500' : 'text-gray-900'}`}>{sku.available}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase">{t('units')}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-wider mb-1.5 break-words line-clamp-1">{t('threshold')}</p>
                            <div className="flex items-baseline gap-1 justify-end">
                                <span className="text-sm font-black text-gray-400 font-mono">{sku.threshold}</span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase">{t('units')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative z-10">
                        <div
                            className={`h-full rounded-full transition-all duration-1000 ${sku.lowStock ? 'bg-red-500' : 'bg-purple-600'}`}
                            style={{ width: `${Math.min(100, (sku.available / (sku.threshold * 2)) * 100)}%` }}
                        />
                    </div>

                    <div className="mt-4 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-1 text-[8px] font-black text-gray-300 uppercase tracking-wider min-w-0 flex-1">
                            <TrendingUp className="h-3 w-3 shrink-0" />
                            <span className="truncate">{t('avgPerDay', { count: sku.avgDaily })}</span>
                        </div>
                        <div className="h-6 w-6 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-all transform group-hover:translate-x-1 shrink-0 ml-2">
                            <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                    </div>
                </div>
            ))}

            {skus.length === 0 && (
                <div className="py-12 text-center text-gray-400 italic text-sm font-medium border-2 border-dashed border-gray-100 rounded-3xl">
                    {t('noItemsFound')}
                </div>
            )}
        </div>
    );
};

export default MobileInventoryList;
