import { Truck, MapPin, TrendingUp, AlertTriangle } from "lucide-react";
import DraftCard from "@/components/shared/DraftCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { DraftCard as DraftCardType } from "@/store/types";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    dispatchDrafts: DraftCardType[];
    selectedDraftId: string | null;
    onSelectDraft: (id: string) => void;
    onApproveDraft: (id: string) => void;
    onRejectDraft: (id: string) => void;
    onViewDiff: (draft: DraftCardType) => void;
}

const DispatchPlanPanel = ({
    dispatchDrafts,
    selectedDraftId,
    onSelectDraft,
    onApproveDraft,
    onRejectDraft,
    onViewDiff
}: Props) => {
    const selectedDraft = dispatchDrafts.find(d => d.id === selectedDraftId) || dispatchDrafts[0];
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
            {/* Draft List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">{t('activeDrafts')}</h3>
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        {dispatchDrafts.length} {t('pendingDraftsCount')}
                    </span>
                </div>
                {dispatchDrafts.map(draft => (
                    <div
                        key={draft.id}
                        onClick={() => onSelectDraft(draft.id)}
                        className={`cursor-pointer transition-all ${selectedDraftId === draft.id
                            ? 'ring-2 ring-purple-600 ring-offset-2 rounded-2xl'
                            : 'opacity-70 grayscale hover:opacity-100 hover:grayscale-0'
                            }`}
                    >
                        <DraftCard draft={draft} compact />
                    </div>
                ))}
                {dispatchDrafts.length === 0 && (
                    <div className="p-8 text-center text-gray-400 border border-dashed border-gray-200 rounded-2xl">
                        {t('noActiveDrafts')}
                    </div>
                )}
            </div>

            {/* Plan Details */}
            <div className="space-y-6">
                <div className="rounded-3xl border border-purple-100 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{t('draftPlanDetails')}</h3>
                        {selectedDraft && <StatusBadge status={selectedDraft.status} />}
                    </div>

                    {selectedDraft ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <SummaryItem
                                    icon={Truck}
                                    label={t('staffCount')}
                                    value={String((selectedDraft.payload as any)?.staffCount || 12)}
                                />
                                <SummaryItem
                                    icon={MapPin}
                                    label={t('shopCount')}
                                    value={String((selectedDraft.payload as any)?.shopCount || 142)}
                                />
                                <SummaryItem icon={TrendingUp} label={t('confidenceLabel')} value={`${selectedDraft.confidence}%`} color="text-purple-600" />
                                {/* Check safely for shortages */}
                                <SummaryItem
                                    icon={AlertTriangle}
                                    label={t('shortages')}
                                    value={String(selectedDraft.shortages?.length || 0)}
                                    color={selectedDraft.shortages && selectedDraft.shortages.length > 0 ? "text-red-500" : "text-green-600"}
                                />
                            </div>

                            {selectedDraft.explanation && (
                                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                                    <p className="text-[10px] font-black text-purple-600 uppercase tracking-widest mb-1.5">{t('aiLogicExplanation')}</p>
                                    <p className="text-xs text-gray-700 leading-relaxed italic">"{t(selectedDraft.explanation as any) || selectedDraft.explanation}"</p>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => onApproveDraft(selectedDraft.id)}
                                    disabled={selectedDraft.status !== 'DRAFT'}
                                    className="flex-1 h-11 rounded-xl purple-gradient text-xs font-bold text-white shadow-lg shadow-purple-200 transition-all hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:grayscale"
                                >
                                    {t('approveAndExecute')}
                                </button>
                                <button
                                    onClick={() => onRejectDraft(selectedDraft.id)}
                                    disabled={selectedDraft.status !== 'DRAFT'}
                                    className="flex-1 h-11 rounded-xl border border-gray-100 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all disabled:opacity-50"
                                >
                                    {t('rejectDiscard')}
                                </button>
                                <button
                                    onClick={() => onViewDiff(selectedDraft)}
                                    className="flex-1 h-11 rounded-xl border border-gray-100 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all font-mono"
                                >
                                    {t('viewDiff')}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="py-10 text-center text-gray-400">
                            <p className="text-sm">{t('selectDraftToSeeAnalysis')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SummaryItem = ({ icon: Icon, label, value, color = "text-gray-900" }: {
    icon: any; label: string; value: string; color?: string;
}) => (
    <div className="p-4 rounded-2xl bg-gray-50/50 border border-gray-50 flex flex-col items-center text-center">
        <Icon className="h-4 w-4 text-purple-600 mb-2 opacity-60" />
        <p className={`text-sm font-black tracking-tight mb-0.5 ${color}`}>{value}</p>
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
    </div>
);

export default DispatchPlanPanel;
