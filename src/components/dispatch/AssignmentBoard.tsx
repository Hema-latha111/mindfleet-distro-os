import { GripVertical, MapPin, AlertTriangle } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { Staff, Shop } from "@/store/types";
import { useTranslation } from "@/hooks/useTranslation";

interface StopCardData {
    stop_id: string;
    shop_id: string;
    shop_name: string;
    address?: string;
    qty_summary: string;
    status: 'PENDING' | 'DELIVERED' | 'FAILED' | 'SKIPPED';
    sla_risk?: 'LOW' | 'MED' | 'HIGH';
}

interface StaffAssignment {
    staff_id: string;
    staff_name: string;
    capacity_stops: number;
    stops: StopCardData[];
    metrics: { stops_count: number; distance_est_km?: number; sla_risk_score?: number };
}

interface Props {
    assignments: StaffAssignment[];
    onMoveStop: (stop_id: string, from_staff_id: string, to_staff_id: string) => void;
    onRebalance: () => void;
}

const AssignmentBoard = ({ assignments, onMoveStop, onRebalance }: Props) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col md:flex-row gap-4 overflow-y-auto md:overflow-x-auto pb-8 -mx-4 px-4 max-h-[70vh] md:max-h-none scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-transparent">
            {assignments.map((assign) => (
                <div
                    key={assign.staff_id}
                    className="w-full md:w-80 shrink-0 bg-gray-50/50 rounded-3xl border border-gray-200 flex flex-col max-h-[500px] md:max-h-[calc(100vh-22rem)]"
                >
                    {/* Header */}
                    <div className="p-4 border-b border-gray-200 bg-white rounded-t-3xl">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-black text-xs text-gray-900 uppercase tracking-tight">{assign.staff_name}</h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${assign.metrics.stops_count > assign.capacity_stops ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                                }`}>
                                {assign.metrics.stops_count}/{assign.capacity_stops}
                            </span>
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold">{t('estDistance')}</p>
                                <p className="text-xs font-black text-gray-900">{assign.metrics.distance_est_km || 0} {t('kmUppercase')}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold">{t('slaRiskUppercase')}</p>
                                <p className={`text-xs font-black ${(assign.metrics.sla_risk_score || 0) > 20 ? 'text-red-600' : 'text-green-600'
                                    }`}>{assign.metrics.sla_risk_score || 0}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stops List */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                        {assign.stops.map(stop => (
                            <div
                                key={stop.stop_id}
                                draggable
                                className="group bg-white p-3 rounded-2xl border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition-all cursor-move relative"
                            >
                                <div className="flex items-start gap-2">
                                    <div className="h-7 w-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                                        <GripVertical className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <p className="text-xs font-bold text-gray-900 truncate">{stop.shop_name}</p>
                                            {stop.sla_risk === 'HIGH' && <AlertTriangle className="h-3 w-3 text-red-500" />}
                                        </div>
                                        <p className="text-[10px] text-gray-500 truncate">{stop.address}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <span className="text-[9px] font-bold text-gray-400 uppercase">{t(stop.qty_summary as any) || stop.qty_summary}</span>
                                            <StatusBadge status={stop.status} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-bold text-gray-400 hover:border-purple-200 hover:text-purple-400 transition-all flex items-center justify-center gap-2">
                            {t('addStop')}
                        </button>
                    </div>
                </div>
            ))}

            {/* Rebalance Action */}
            <div className="flex items-center pr-4">
                <button
                    onClick={onRebalance}
                    className="h-12 px-6 rounded-2xl bg-white border border-purple-200 text-purple-600 text-xs font-black shadow-sm hover:bg-purple-50 transition-all whitespace-nowrap"
                >
                    {t('rebalanceAllRoutes')}
                </button>
            </div>
        </div>
    );
};

export default AssignmentBoard;
