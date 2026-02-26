import { AlertTriangle, Clock, MapPin, Search, RefreshCw, Filter } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { VirtualizedTable } from "@/components/shared/VirtualizedTable";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

// Mock types based on Spec
export interface DeliveryRow {
    id: string;
    shopName: string;
    shopId: string;
    area: string;
    zone: string; // Added zone as per Spec
    staffName: string;
    staffId: string;
    status: 'PENDING' | 'DELIVERED' | 'FAILED' | 'SKIPPED'; // Updated status types
    eta: string;
    slaRisk: boolean;
}

interface DeliveryFilters {
    search: string;
    status: string;
    staffId: string;
    zone?: string;
}

interface Props {
    rows: DeliveryRow[];
    filters: DeliveryFilters;
    onChangeFilters: (filters: DeliveryFilters) => void;
    onOpenStop: (stopId: string) => void;
}

const DeliveryTable = ({ rows, filters, onChangeFilters, onOpenStop }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-4">
            {/* Filters Bar */}
            <div className="flex flex-wrap gap-3 p-1">
                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 flex-1 min-w-[200px]">
                    <Search className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => onChangeFilters({ ...filters, search: e.target.value })}
                        placeholder={t('searchDeliveriesPlaceholder')}
                        className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
                    />
                </div>

                <select
                    value={filters.status}
                    onChange={(e) => onChangeFilters({ ...filters, status: e.target.value })}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none cursor-pointer hover:border-purple-300 transition-colors"
                >
                    <option value="All">{t('allStatus')}</option>
                    <option value="PENDING">{t('pendingStatus')}</option>
                    <option value="DELIVERED">{t('deliveredStatus')}</option>
                    <option value="FAILED">{t('failedStatus')}</option>
                    <option value="SKIPPED">{t('skippedStatus')}</option>
                </select>

                {/* Additional filters can go here */}
            </div>

            {/* Virtualized Table with Horizontal Scroll for Mobile */}
            <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden h-[calc(100vh-28rem)] min-h-[400px] flex flex-col">
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-purple-100 flex-1">
                    <div className="min-w-[800px] lg:min-w-full h-full flex flex-col">
                        <VirtualizedTable
                            items={rows}
                            height={rows.length * 64 > 500 ? 500 : rows.length * 64 + 100} // Dynamic or fixed height with better scroll handle
                            rowHeight={64}
                            header={
                                <div className="flex items-center gap-6 px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 border-b border-gray-100">
                                    <div className="w-36 shrink-0">{t('statusLabel')}</div>
                                    <div className="flex-1 min-w-[180px]">{t('shopLocationLabel')}</div>
                                    <div className="w-32 shrink-0">{t('assignedStaffLabel')}</div>
                                    <div className="w-20 shrink-0 text-right">{t('etaLabel')}</div>
                                    <div className="w-20 shrink-0 text-center">{t('riskLabel')}</div>
                                    <div className="w-24 shrink-0 text-right pr-4">{t('action')}</div>
                                </div>
                            }
                            renderRow={(row) => (
                                <div
                                    onClick={() => onOpenStop(row.id)}
                                    className="flex items-center gap-6 px-6 h-full border-b border-gray-50 hover:bg-purple-50/20 transition-all cursor-pointer group hover:shadow-[inset_4px_0_0_0_#9333ea]"
                                >
                                    <div className="w-36 shrink-0 flex items-center">
                                        <StatusBadge status={row.status} size="sm" />
                                    </div>
                                    <div className="flex-1 min-w-[180px] py-3">
                                        <p className="font-black text-sm text-gray-900 group-hover:text-purple-700 transition-colors uppercase tracking-tight line-clamp-1">{row.shopName}</p>
                                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
                                            <MapPin className="h-2.5 w-2.5 text-purple-400" />
                                            <span className="truncate">{row.area} · {row.zone}</span>
                                        </div>
                                    </div>
                                    <div className="w-32 shrink-0">
                                        <div className="flex items-center gap-2">
                                            <div className="h-7 w-7 rounded-xl bg-purple-100/50 flex items-center justify-center text-[9px] font-black text-purple-600 shrink-0 group-hover:scale-110 transition-transform">
                                                {row.staffName[0]}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[9px] font-black text-gray-900 truncate uppercase tracking-tight">{row.staffName.split(' ')[0]}</p>
                                                <p className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Driver</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-20 shrink-0 text-right">
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-black text-gray-900 font-mono tracking-tighter">{row.eta}</span>
                                            <span className="text-[8px] font-bold text-gray-300 uppercase tracking-widest">{t('etaLabel')}</span>
                                        </div>
                                    </div>
                                    <div className="w-20 shrink-0 text-center flex justify-center">
                                        {row.slaRisk && (
                                            <div className="bg-red-50 text-red-500 p-1.5 rounded-lg group-hover:bg-red-500 group-hover:text-white transition-colors" title={t('riskLabel')}>
                                                <AlertTriangle className="h-3.5 w-3.5" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-24 shrink-0 text-right pr-4">
                                        <button className="text-[10px] font-black text-purple-600 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all uppercase tracking-widest hover:underline">
                                            {t('details')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeliveryTable;

