import { X, Calendar, Clock, AlertTriangle, Truck } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { Drawer } from "vaul";
import { useTranslation } from "@/hooks/useTranslation";

interface StopDetail {
    stop_id: string;
    shop_id: string;
    shop_name: string;
    address: string;
    qty_summary: string;
    status: 'PENDING' | 'DELIVERED' | 'FAILED' | 'SKIPPED';
    sla_risk?: 'LOW' | 'MED' | 'HIGH';
    lat?: number;
    lng?: number;
    eta?: string;
}

interface Props {
    open: boolean;
    stop: StopDetail | null;
    onClose: () => void;
    onReorder: (new_order: number) => void;
    onSkip: (stop_id: string) => void;
    onReassign: (stop_id: string, staff_id: string) => void;
}

const StopDrawer = ({ open, stop, onClose, onReorder, onSkip, onReassign }: Props) => {
    const { t } = useTranslation();
    if (!stop) return null;

    return (
        <Drawer.Root open={open} onOpenChange={(o) => !o && onClose()}>
            <Drawer.Portal>
                <Drawer.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />
                <Drawer.Content className="bg-white flex flex-col h-[60vh] rounded-t-[32px] fixed bottom-0 left-0 right-0 z-50 outline-none pb-8 safe-bottom">
                    {/* Handle */}
                    <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 my-4" />

                    <div className="px-6 pb-6 overflow-y-auto">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-xl font-black text-gray-900">{stop.shop_name}</h2>
                                <p className="text-sm text-gray-500">{stop.address}</p>
                            </div>
                            <button onClick={onClose} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                                <X className="h-4 w-4 text-gray-600" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 flex items-center gap-3">
                                <Truck className="h-5 w-5 text-purple-600" />
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400">{t('statusLabel')}</p>
                                    <StatusBadge status={stop.status} />
                                </div>
                            </div>
                            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 flex items-center gap-3">
                                <Clock className="h-5 w-5 text-purple-600" />
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400">{t('etaLabel')}</p>
                                    <p className="text-sm font-black text-gray-900">{stop.eta || '10:45 AM'}</p>
                                </div>
                            </div>
                        </div>

                        {stop.sla_risk === 'HIGH' && (
                            <div className="mb-6 bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-red-500 shrink-0" />
                                <div>
                                    <p className="text-xs font-bold text-red-700">{t('highSlaRisk')}</p>
                                    <p className="text-[11px] text-red-600 mt-1">
                                        {t('projectedDeliveryTimeExceeds')}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest">{t('availableActions')}</h3>

                            <button
                                onClick={() => onSkip(stop.stop_id)}
                                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-red-200 hover:bg-red-50 hover:text-red-600 transition-all font-bold text-sm text-gray-700"
                            >
                                <span>{t('skipStop')}</span>
                                <ChevronRight className="h-4 w-4 opacity-50" />
                            </button>

                            <button
                                onClick={() => onReassign(stop.stop_id, 'staff-2')} // Demo: reassign to specific staff
                                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600 transition-all font-bold text-sm text-gray-700"
                            >
                                <span>{t('reassignStaff')}</span>
                                <ChevronRight className="h-4 w-4 opacity-50" />
                            </button>

                            <button
                                onClick={() => onReorder(1)} // Demo: Move to top
                                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 transition-all font-bold text-sm text-gray-700"
                            >
                                <span>{t('prioritizeMoveViaAi')}</span>
                                <ChevronRight className="h-4 w-4 opacity-50" />
                            </button>
                        </div>
                    </div>
                </Drawer.Content>
            </Drawer.Portal>
        </Drawer.Root>
    );
};

// Helper component
const ChevronRight = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className={className}
    >
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

export default StopDrawer;
