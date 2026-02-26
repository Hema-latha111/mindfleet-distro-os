import { X, History, User, Calendar, MapPin, Truck, Package, Clock } from "lucide-react";
import { useDispatchStore } from "@/store";
import StatusBadge from "./StatusBadge";
import DecisionJournalTimeline from "./DecisionJournalTimeline";

interface Props {
    open: boolean;
    onClose: () => void;
}

const DecisionJournalDrawer = ({ open, onClose }: Props) => {
    const { plan } = useDispatchStore();

    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div className={`fixed inset-y-0 right-0 z-[70] w-full max-w-sm transform bg-white shadow-2xl transition-transform duration-500 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-100 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                <History className="h-5 w-5" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 leading-none">Decision Journal</h2>
                                <p className="text-xs text-gray-500 mt-1">Audit trail for all overrides</p>
                            </div>
                        </div>
                        <button onClick={onClose} className="rounded-lg p-2 text-gray-400 hover:bg-gray-50 hover:text-gray-600">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        <DecisionJournalTimeline
                            journal={plan.overrideHistory.map(entry => ({
                                id: entry.id,
                                type: entry.action, // mapping action to type
                                timestamp: entry.timestamp,
                                actor: entry.performedBy,
                                reason: entry.reason,
                                diff: { before: entry.before, after: entry.after }
                            }))}
                            onOpenDiff={(id) => console.log('Open diff', id)}
                        />
                    </div>

                    {/* Footer */}
                    <div className="border-t border-gray-100 bg-gray-50/50 p-6">
                        <button
                            className="w-full rounded-xl purple-gradient py-3 text-sm font-bold text-white shadow-lg active:scale-95 transition-all"
                            onClick={() => { }}
                        >
                            EXPORT FULL AUDIT LOG (CSV)
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DecisionJournalDrawer;
