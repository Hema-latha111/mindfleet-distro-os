import { AlertTriangle, Clock, RefreshCw, XCircle } from "lucide-react";
import { DeliveryRow } from "./DeliveryTable";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    failedStops: DeliveryRow[];
    delayedStops: DeliveryRow[];
    onCreateReassignment: () => void;
}

const ExceptionsPanel = ({ failedStops, delayedStops, onCreateReassignment }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Failed Deliveries Card */}
            <div className="rounded-2xl border border-red-100 bg-red-50/50 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                            <XCircle className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">{t('failedAttempts')}</h3>
                            <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest">{failedStops.length} {t('stopsUppercase')}</p>
                        </div>
                    </div>
                    {failedStops.length > 0 && (
                        <button
                            onClick={onCreateReassignment}
                            className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-xl text-xs font-bold shadow-sm hover:translate-y-[-1px] transition-transform active:scale-95 flex items-center gap-2"
                        >
                            <RefreshCw className="h-3.5 w-3.5" /> {t('reassign')}
                        </button>
                    )}
                </div>

                {failedStops.length === 0 ? (
                    <div className="h-20 flex items-center justify-center text-gray-400 text-xs font-medium italic border-2 border-dashed border-red-100 rounded-xl">
                        {t('noFailedDeliveries')}
                    </div>
                ) : (
                    <div className="space-y-3 max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-red-200 hover:scrollbar-thumb-red-300">
                        {failedStops.map((stop) => (
                            <div key={stop.id} className="overflow-x-auto scrollbar-thin scrollbar-thumb-red-100/50 pb-1">
                                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-red-100 shadow-sm min-w-[300px]">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-bold text-gray-900 truncate uppercase tracking-tight">{stop.shopName}</p>
                                        <p className="text-[10px] text-gray-500 whitespace-nowrap">{stop.staffName} • {stop.area}</p>
                                    </div>
                                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-md shrink-0 ml-4">
                                        {t('failedStatus')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* SLA Risk / Delayed Card */}
            <div className="rounded-2xl border border-yellow-100 bg-yellow-50/50 p-5 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
                            <Clock className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-gray-900 uppercase tracking-wide">{t('slaRisksDelays')}</h3>
                            <p className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest">{delayedStops.length} {t('atRiskUppercase')}</p>
                        </div>
                    </div>
                </div>

                {delayedStops.length === 0 ? (
                    <div className="h-20 flex items-center justify-center text-gray-400 text-xs font-medium italic border-2 border-dashed border-yellow-100 rounded-xl">
                        {t('allDeliveriesOnTime')}
                    </div>
                ) : (
                    <div className="space-y-3 max-h-56 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-200 hover:scrollbar-thumb-yellow-300">
                        {delayedStops.map((stop) => (
                            <div key={stop.id} className="overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-100/50 pb-1">
                                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-yellow-100 shadow-sm min-w-[300px]">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-bold text-gray-900 truncate uppercase tracking-tight">{stop.shopName}</p>
                                        <p className="text-[10px] text-gray-500 whitespace-nowrap">{stop.staffName} • {t('etaLabel')}: {stop.eta}</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] font-black text-yellow-600 uppercase tracking-widest bg-yellow-50 px-2 py-0.5 rounded-md shrink-0 ml-4">
                                        <AlertTriangle className="h-3 w-3" /> {t('riskLabel')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExceptionsPanel;
