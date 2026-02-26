import { MapPin, Phone, ExternalLink, Info, AlertCircle, Clock, CheckCircle2, Navigation } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { DeliveryRow } from "./DeliveryTable";

interface Props {
    rows: DeliveryRow[];
    onOpenStop: (id: string) => void;
}

const MobileDeliveryList = ({ rows, onOpenStop }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-4 md:hidden">
            {rows.map((row) => (
                <div
                    key={row.id}
                    onClick={() => onOpenStop(row.id)}
                    className={`relative p-4 rounded-2xl border bg-white shadow-sm transition-all active:scale-[0.98] ${row.slaRisk ? 'border-red-100 ring-1 ring-red-50' : 'border-purple-100'
                        }`}
                >
                    {/* Top Row: Status & ETA */}
                    <div className="flex items-center justify-between mb-3">
                        <StatusBadge status={row.status} size="sm" />
                        <div className="flex items-center gap-2">
                            {row.slaRisk && (
                                <div className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-[9px] font-black uppercase lg:tracking-widest animate-pulse">
                                    <AlertCircle className="h-3 w-3" />
                                    {t('riskLabel')}
                                </div>
                            )}
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-black text-gray-900 font-mono tracking-tighter">
                                    {row.eta}
                                </span>
                                <span className="text-[8px] font-black text-gray-400 uppercase tracking-wider leading-none break-words line-clamp-1">
                                    {t('etaLabel')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Middle Section: Shop Info */}
                    <div className="mb-4">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight line-clamp-1 mb-1">
                            {row.shopName}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                            <MapPin className="h-3 w-3 text-purple-400" />
                            <span className="truncate">{row.area} · {row.zone}</span>
                        </div>
                    </div>

                    {/* Bottom Section: Staff Info & Quick Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-2.5">
                            <div className="h-8 w-8 rounded-xl bg-purple-100 flex items-center justify-center text-[10px] font-black text-purple-600">
                                {row.staffName[0]}
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight line-clamp-1">{row.staffName}</p>
                                <p className="text-[8px] font-bold text-gray-400 uppercase tracking-wider truncate">Field Personnel</p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={(e) => { e.stopPropagation(); /* Mock Call */ }}
                                className="h-8 w-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 active:bg-purple-100 active:text-purple-600 transition-colors"
                            >
                                <Phone className="h-3.5 w-3.5" />
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); onOpenStop(row.id); }}
                                className="h-8 w-8 rounded-xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-100 active:scale-90 transition-all"
                            >
                                <Navigation className="h-3.5 w-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            {rows.length === 0 && (
                <div className="py-12 text-center text-gray-400 italic text-sm font-medium border-2 border-dashed border-gray-100 rounded-3xl">
                    No results found matching your filters.
                </div>
            )}
        </div>
    );
};

export default MobileDeliveryList;
