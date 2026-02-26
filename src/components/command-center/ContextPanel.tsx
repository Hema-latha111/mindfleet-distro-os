import { ComponentType } from "react";
import {
    Sparkles, FileText, Activity, IndianRupee, Users,
    MapPin, AlertTriangle, CheckCircle, TrendingUp, Package
} from "lucide-react";
import { DraftCard as DraftCardType } from "@/store/types";
import StatusBadge from "@/components/shared/StatusBadge";
import { useTranslation } from "@/hooks/useTranslation";


interface Props {
    activeTab: 'today' | 'drafts' | 'dispatch' | 'warnings' | 'recent' | 'history';
    onTabChange: (tab: any) => void;
    drafts: DraftCardType[];
}

const ContextPanel = ({ activeTab, onTabChange, drafts }: Props) => {
    const pendingDrafts = drafts.filter(d => d.status === 'DRAFT');
    const { t } = useTranslation();

    return (
        <div className="flex bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-sm w-full lg:w-72 xl:w-80 shrink-0 flex-col h-auto lg:h-auto lg:min-h-0 min-h-[300px]">
            {/* Header */}
            <div className="px-5 pt-5 pb-2 shrink-0">
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{t('contextIntelligence')}</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{t('realTimeOpsOverview')}</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-purple-100 mx-4 shrink-0 overflow-x-auto scrollbar-hide">
                {(["today", "drafts", "dispatch", "warnings", "history"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`flex-1 px-3 py-3 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all relative ${activeTab === tab
                            ? "text-purple-600"
                            : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        {tab === "dispatch" ? t('dispatchTab') : tab === "history" ? t('historyTab') : tab === "warnings" ? t('alertsTab') : t(`${tab}Tab` as any)}
                        {tab === "drafts" && pendingDrafts.length > 0 && (
                            <span className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[9px] font-black text-white">
                                {pendingDrafts.length}
                            </span>
                        )}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px] lg:max-h-none">
                {activeTab === "today" && (
                    <div className="space-y-3 animate-fade-in">
                        <ContextCard icon={Sparkles} label={t('activeDispatchLabel')} value="1" color="text-purple-600" bg="bg-purple-100/50" />
                        <ContextCard icon={FileText} label={t('pendingDraftsLabel')} value={String(pendingDrafts.length)} color="text-yellow-600" bg="bg-yellow-100/50" />
                        <ContextCard icon={Activity} label={t('deliveries')} value="312 / 428" color="text-green-600" bg="bg-green-100/50" subtitle={`72.9% ${t('progressComplete')}`} />
                        <ContextCard icon={IndianRupee} label={t('revenueTodayLabel')} value="₹2,84,000" color="text-purple-700" bg="bg-purple-100/50" />
                        <ContextCard icon={Users} label={t('staffActiveLabel')} value="13 / 15" color="text-blue-600" bg="bg-blue-100/50" />
                        <ContextCard icon={MapPin} label={t('shopsCoveredLabel')} value="100" color="text-green-600" bg="bg-green-100/50" />
                    </div>
                )}

                {/* ... Other tabs logic moved from CommandCenter.tsx ... */}
                {activeTab === "dispatch" && (
                    <div className="space-y-4 animate-fade-in">
                        <div className="rounded-xl border border-purple-100 bg-purple-50 p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-purple-600 uppercase">{t('currentRun')}</span>
                                <StatusBadge status="IN_PROGRESS" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-gray-500">{t('stopsCovered')}</span>
                                    <span className="font-semibold text-gray-900">312 / 428</span>
                                </div>
                                <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-600 rounded-full" style={{ width: '72%' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "drafts" && (
                    <div className="space-y-3 animate-fade-in">
                        {drafts.slice(0, 5).map(draft => (
                            <div key={draft.id} className="rounded-xl border border-purple-100 p-3 hover:border-purple-200 transition-colors cursor-pointer" onClick={() => { }}>
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="text-xs font-semibold text-gray-800 flex-1 truncate">{t(draft.title as any) || draft.title}</p>
                                    <StatusBadge status={draft.status} />
                                </div>
                                <p className="text-[11px] text-gray-500 truncate">{t(draft.description as any) || draft.description}</p>
                                <p className="text-[10px] text-purple-500 mt-1">{draft.confidence}% {t('confidence')}</p>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "warnings" && (
                    <div className="space-y-3 animate-fade-in">
                        <WarningCard icon={AlertTriangle} title={t('alertSlaRiskTitle')} description={t('deliveryWindowMissed')} severity="warning" />
                        <WarningCard icon={Package} title={t('alertLowStockTitle')} description={t('lowStockBreadMilk')} severity="warning" />
                        <WarningCard icon={Users} title={t('alertStaffCapacityTitle')} description={t('staffExceedingLimit')} severity="destructive" />
                    </div>
                )}

                {activeTab === "recent" && (
                    <div className="space-y-0.5 animate-fade-in">
                        {[
                            { action: t('draftAdjustmentCreated'), time: "08:02", icon: FileText },
                            { action: t('dispatchPlanApproved'), time: "08:05", icon: CheckCircle },
                            { action: t('stopReassignedSuccess'), time: "09:15", icon: MapPin },
                        ].map((a, i, arr) => (
                            <div key={a.time} className="flex items-start gap-3 py-2.5 group">
                                <div className="flex flex-col items-center">
                                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-500 group-hover:bg-purple-100 transition-colors">
                                        <a.icon className="h-3.5 w-3.5" />
                                    </div>
                                    {i < arr.length - 1 && <div className="w-px h-full bg-purple-100 mt-1 min-h-[12px]" />}
                                </div>
                                <div className="pt-0.5">
                                    <p className="text-xs font-medium text-gray-800">{a.action}</p>
                                    <p className="text-[10px] text-gray-400">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "history" && (
                    <div className="space-y-3 animate-fade-in">
                        {[
                            { title: t('newShopOnboarding'), time: t('justNow'), items: t('oneAction') },
                            { title: t('inventoryControl'), time: t('twoHoursAgo'), items: t('threeUpdates') },
                            { title: t('dispatchPlanApproved'), time: t('yesterday'), items: `142 ${t('stops')}` },
                        ].map((h, i) => (
                            <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-500 group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                                    <FileText className="h-4 w-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-gray-900">{h.title}</p>
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                        <span>{h.time}</span>
                                        <span>•</span>
                                        <span>{h.items}</span>
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

const ContextCard = ({ icon: Icon, label, value, color, bg, subtitle }: {
    icon: any; label: string; value: string; color: string; bg: string; subtitle?: string;
}) => (
    <div className="group flex items-center gap-3 rounded-2xl border border-purple-50 p-4 transition-all hover:shadow-lg hover:shadow-purple-100/50 hover:-translate-y-0.5 cursor-default bg-white">
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg} ${color} shrink-0 group-hover:scale-110 transition-transform`}>
            <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
            <p className="text-sm font-black text-gray-900 leading-tight">{value}</p>
            {subtitle && <p className="text-[9px] font-bold text-purple-400 uppercase tracking-tight mt-1 opacity-70">{subtitle}</p>}
        </div>
    </div>
);

const WarningCard = ({ icon: Icon, title, description, severity }: {
    icon: any; title: string; description: string; severity: "warning" | "destructive";
}) => (
    <div className={`rounded-2xl border p-4 transition-all hover:shadow-md ${severity === "destructive"
        ? "border-red-100 bg-red-50/50 shadow-sm shadow-red-100/20"
        : "border-orange-100 bg-orange-50/50 shadow-sm shadow-orange-100/20"
        }`}>
        <div className="flex items-center gap-2.5 mb-2">
            <div className={`p-1.5 rounded-lg ${severity === "destructive" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"}`}>
                <Icon className="h-4 w-4 shrink-0" />
            </div>
            <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{title}</span>
        </div>
        <p className="text-[10px] font-bold text-gray-500 leading-relaxed pl-1">{description}</p>
    </div>
);

export default ContextPanel;
