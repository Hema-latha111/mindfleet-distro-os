import { useState, useEffect } from 'react';
import { CheckCircle, Edit3, XCircle, HelpCircle, ChevronDown, ChevronUp, Sparkles, AlertTriangle, Package, Zap } from 'lucide-react';
import type { DraftCard as DraftCardType } from '../../store/types';
import { useDraftStore, useUserStore } from '../../store';
import StatusBadge from './StatusBadge';
import ReasonTagModal from './ReasonTagModal';
import ConfirmModal from './ConfirmModal';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';

interface Props {
    draft: DraftCardType;
    compact?: boolean;
}

const DraftCard = ({ draft, compact = false }: Props) => {
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [showConfirmApprove, setShowConfirmApprove] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);
    const [showAllTags, setShowAllTags] = useState(false);
    const [isExpanded, setIsExpanded] = useState(draft.status !== 'EXECUTED');
    const { updateDraftStatus } = useDraftStore();
    const { currentUser } = useUserStore();
    const { t } = useTranslation();

    // Auto-collapse on execution
    useEffect(() => {
        if (draft.status === 'EXECUTED') {
            setIsExpanded(false);
        }
    }, [draft.status]);

    const handleApprove = (reason: string) => {
        updateDraftStatus(draft.id, 'APPROVED', currentUser.name, reason);
        toast.success(`Draft "${draft.title}" approved: ${reason}`);
        setShowConfirmApprove(false);
    };

    const handleReject = (reason: string) => {
        updateDraftStatus(draft.id, 'REJECTED', currentUser.name, reason);
        toast.error(`Draft "${draft.title}" rejected: ${reason}`);
        setShowRejectModal(false);
    };

    const isPending = draft.status === 'DRAFT';
    const isApproved = draft.status === 'APPROVED';
    const isRejected = draft.status === 'REJECTED';
    const isExecuted = draft.status === 'EXECUTED';

    const mockPlanDetails = {
        summary: { stops: 142, revenue: 425000, vehicles: 12, efficiency: 94 },
        routes: [
            { driver: "Karthik V.", stops: 14, area: "Anna Nagar", time: "6h 20m" },
            { driver: "Suresh K.", stops: 12, area: "T. Nagar", time: "5h 45m" },
            { driver: "Ramesh P.", stops: 15, area: "Velachery", time: "7h 10m" },
            { driver: "Priya M.", stops: 11, area: "Adyar", time: "5h 15m" },
            { driver: "Alex J.", stops: 13, area: "Mylapore", time: "6h 00m" },
        ]
    };

    // Executed & Collapsed View
    if (isExecuted && !isExpanded) {
        return (
            <div
                onClick={() => setIsExpanded(true)}
                className="cursor-pointer rounded-xl border border-green-200 bg-green-50/50 p-4 transition-all hover:bg-green-50 hover:shadow-sm group"
            >
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600 transition-transform group-hover:scale-110">
                        <CheckCircle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">{t(draft.title as any) || draft.title}</h3>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-100 px-2 py-1 rounded-full">{t('EXECUTED')}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{t('actionCompleted')}. {t('clickToViewDetails')}.</p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                </div>
            </div>
        );
    }

    if (compact) {
        return (
            <div className={`rounded-xl border p-4 transition-all duration-200 hover:shadow-sm ${isApproved ? 'border-green-500/20 bg-green-500/5' :
                isRejected ? 'border-red-500/20 bg-red-500/5' :
                    'border-purple-300/30 bg-purple-50/50'
                }`}>
                <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-600 shrink-0">
                        <Sparkles className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-semibold text-gray-900 truncate">{t(draft.title as any) || draft.title}</p>
                            <StatusBadge status={draft.status} />
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{t(draft.description as any) || draft.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                            {isPending && (
                                <>
                                    <button
                                        onClick={() => setShowConfirmApprove(true)}
                                        className="rounded-lg bg-purple-600 px-3 py-1 text-[10px] font-semibold text-white transition-all hover:bg-purple-700 hover:shadow-sm"
                                    >
                                        {t('approveLabel')}
                                    </button>
                                    <button
                                        onClick={() => setShowRejectModal(true)}
                                        className="rounded-lg border border-red-200 px-3 py-1 text-[10px] font-semibold text-red-500 transition-all hover:bg-red-50"
                                    >
                                        {t('rejectLabel')}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <ReasonTagModal
                    open={showConfirmApprove}
                    title={t('approveDraft')}
                    onSubmit={handleApprove}
                    onCancel={() => setShowConfirmApprove(false)}
                />
                <ReasonTagModal
                    open={showRejectModal}
                    title={t('rejectDraft')}
                    onSubmit={handleReject}
                    onCancel={() => setShowRejectModal(false)}
                />
            </div>
        );
    }

    return (
        <div className={`rounded-2xl border-2 p-6 transition-all duration-300 ${isApproved
            ? 'border-green-500/40 bg-green-50 shadow-[0_0_24px_-6px_rgba(34,197,94,0.2)]'
            : isRejected
                ? 'border-red-300/40 bg-red-50'
                : 'border-purple-300/50 bg-purple-50/80 shadow-[0_0_20px_-4px_rgba(147,51,234,0.15)]'
            }`}>
            {/* Header */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
                <Sparkles className="h-4 w-4 text-purple-600 shrink-0" />
                <h3 className="font-semibold text-gray-900 flex-1">{t(draft.title as any) || draft.title}</h3>
                <StatusBadge status={draft.status} />
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">{t(draft.description as any) || draft.description}</p>

            {/* Confidence */}
            <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-medium text-gray-500">{t('confidenceLabel')}</span>
                <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-700"
                        style={{ width: `${draft.confidence}%` }}
                    />
                </div>
                <span className="text-sm font-bold text-purple-600">{draft.confidence}%</span>
            </div>



            {/* Add Staff Onboarding Form */}
            {draft.type === 'ADD_STAFF' && (
                <div className="mb-4 space-y-4 rounded-2xl bg-white border border-purple-100 p-5 shadow-sm animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                        <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">{t('onboardingFormRequired')}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{t('fullName')}</label>
                            <input type="text" className="w-full rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-2 text-xs focus:border-purple-500 focus:ring-2 focus:ring-purple-50 outline-none transition-all" placeholder="e.g. Rahul S." />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{t('contactNumber')}</label>
                            <input type="text" className="w-full rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-2 text-xs focus:border-purple-500 focus:ring-2 focus:ring-purple-50 outline-none transition-all" placeholder="+91 XXXXX XXXXX" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{t('assignedZone')}</label>
                            <select className="w-full rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-2 text-xs focus:border-purple-500 focus:ring-2 focus:ring-purple-50 outline-none transition-all bg-white cursor-pointer">
                                <option>Zone A (Anna Nagar)</option>
                                <option>Zone B (Adyar)</option>
                                <option>Zone C (T. Nagar)</option>
                                <option>Zone D (Velachery)</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-wider">{t('vehicleType')}</label>
                            <select className="w-full rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-2 text-xs focus:border-purple-500 focus:ring-2 focus:ring-purple-50 outline-none transition-all bg-white cursor-pointer">
                                <option>Electric Bike</option>
                                <option>Regular Bike</option>
                                <option>Auto Rickshaw</option>
                                <option>Mini-Van</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

            {/* Shop Import / Add Shop Rich View */}
            {draft.type === 'SHOP_IMPORT' && (
                <div className="mb-4 rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm animate-in slide-in-from-top-2">
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('previewNewAccounts')}</span>
                        <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">42 {t('PENDING')}</span>
                    </div>
                    <div className="p-3 space-y-2 max-h-48 overflow-y-auto">
                        {[
                            { name: "Green Valley Mart", area: "Velachery", geo: 98 },
                            { name: "Sai Supermarket", area: "Adyar", geo: 92 },
                            { name: "Kundan Provisions", area: "Anna Nagar", geo: 85 },
                            { name: "Metro Organics", area: "T. Nagar", geo: 89 },
                            { name: "RK Beverages", area: "Mylapore", geo: 78 }
                        ].map((shop, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-lg border border-gray-50 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                    <div>
                                        <p className="text-xs font-bold text-gray-800">{shop.name}</p>
                                        <p className="text-[9px] text-gray-400 font-medium uppercase tracking-tighter">{shop.area}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-purple-500 uppercase">{t('geoScore')}</p>
                                    <p className="text-xs font-black text-gray-900">{shop.geo}%</p>
                                </div>
                            </div>
                        ))}
                        <div className="py-2 text-center">
                            <button className="text-[10px] font-bold text-purple-600 hover:underline">{t('viewLabel')} all 42 shops...</button>
                        </div>
                    </div>
                </div>
            )}

            {/* AI Explainability Sections */}
            {draft.explanation && (
                <div className="mb-4">
                    <button
                        onClick={() => setShowExplanation(!showExplanation)}
                        className="flex items-center gap-1.5 text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100"
                    >
                        <Sparkles className="h-3.5 w-3.5" />
                        {t('why')}
                        {showExplanation ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                    </button>
                    {showExplanation && (
                        <div className="mt-3 space-y-3 rounded-xl bg-gray-50/50 border border-gray-100 p-3 shadow-inner animate-in slide-in-from-top-2 duration-300">

                            {/* Logic / Explanation - Italicized, no label */}
                            <p className="text-xs text-gray-600 italic border-l-2 border-purple-300 pl-2">
                                "{t(draft.explanation as any) || draft.explanation}"
                            </p>

                            {/* Highlights & Reasoning - merged into tags with limit */}
                            <div className="flex flex-wrap gap-2">
                                {(() => {
                                    const allTags = [
                                        ...(draft.summary || []).map(s => ({ type: 'summary', text: s })),
                                        ...(draft.reasoning || []).map(r => ({ type: 'reasoning', text: r }))
                                    ];
                                    const visibleTags = showAllTags ? allTags : allTags.slice(0, 5);
                                    const hasHidden = allTags.length > 5;

                                    return (
                                        <>
                                            {visibleTags.map((tag, i) => (
                                                <span key={`${tag.type}-${i}`} className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium shadow-sm ${tag.type === 'summary'
                                                    ? 'bg-white border-gray-200 text-gray-600'
                                                    : 'bg-white border-gray-200 text-purple-600'
                                                    }`}>
                                                    {tag.type === 'summary' ? (
                                                        <CheckCircle className="h-3 w-3 text-green-500" />
                                                    ) : (
                                                        <Sparkles className="h-3 w-3" />
                                                    )}
                                                    {t(tag.text as any) || tag.text}
                                                </span>
                                            ))}
                                            {hasHidden && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); setShowAllTags(!showAllTags); }}
                                                    className="text-[10px] font-bold text-gray-400 hover:text-gray-600 underline decoration-dotted"
                                                >
                                                    {showAllTags ? t('showLess') : `+${allTags.length - 5} ${t('more')}`}
                                                </button>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>

                            {/* Compact Risks Grid */}
                            {draft.risks && draft.risks.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {draft.risks.map((r, i) => (
                                        <div key={i} className={`flex items-center gap-2 rounded-lg p-2 ${r.level === 'CRITICAL' ? 'bg-red-50 text-red-700' :
                                            r.level === 'WARN' ? 'bg-amber-50 text-amber-700' :
                                                'bg-blue-50 text-blue-700'
                                            }`}>
                                            <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                                            <span className="text-[10px] leading-tight font-medium line-clamp-2">{t(r.text as any) || r.text}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Mini Confidence Bars - Horizontal Row */}
                            {draft.confidenceBreakdown && (
                                <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                                    {[
                                        { label: "Data Quality", val: draft.confidenceBreakdown.dataQuality },
                                        { label: "Stability", val: draft.confidenceBreakdown.historicalReliability },
                                        { label: "Inventory", val: draft.confidenceBreakdown.inventoryRisk },
                                    ].map(c => (
                                        <div key={c.label} className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-[9px] uppercase text-gray-400 font-bold">{c.label}</span>
                                                <span className="text-[9px] font-bold text-gray-700">{c.val}%</span>
                                            </div>
                                            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${c.val > 80 ? 'bg-green-500' : c.val > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${c.val}%` }} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Diff Viewer */}
            {draft.diff && (
                <div className="mb-4 rounded-xl border border-gray-200 overflow-hidden">
                    <div className="grid grid-cols-2 divide-x divide-gray-200">
                        <div className="p-3 bg-red-50">
                            <p className="text-[10px] font-semibold text-red-500 mb-1">{t('before')}</p>
                            <pre className="text-xs text-gray-700 whitespace-pre-wrap">{JSON.stringify(draft.diff.before, null, 2)}</pre>
                        </div>
                        <div className="p-3 bg-green-50">
                            <p className="text-[10px] font-semibold text-green-600 mb-1">{t('after')}</p>
                            <pre className="text-xs text-gray-700 whitespace-pre-wrap">{JSON.stringify(draft.diff.after, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            {isPending && (
                <div className="flex flex-wrap gap-2">
                    {draft.type === 'DISPATCH_PLAN' && (
                        <button
                            onClick={() => setShowPlanModal(true)}
                            className="flex items-center gap-1.5 rounded-xl border border-purple-300 bg-white px-5 py-2.5 text-sm font-medium text-purple-700 transition-all hover:bg-purple-50 hover:-translate-y-0.5"
                        >
                            <Edit3 className="h-3.5 w-3.5" /> {t('viewPlan')}
                        </button>
                    )}
                    <button
                        onClick={() => setShowConfirmApprove(true)}
                        className="flex items-center gap-1.5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-purple-700 hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <CheckCircle className="h-3.5 w-3.5" /> {t('approveLabel')}
                    </button>
                    <button className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 hover:-translate-y-0.5">
                        <Edit3 className="h-3.5 w-3.5" /> {t('editLabel')}
                    </button>
                    <button
                        onClick={() => setShowRejectModal(true)}
                        className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 transition-colors hover:text-red-600 hover:bg-red-50"
                    >
                        <XCircle className="h-3.5 w-3.5" /> {t('rejectLabel')}
                    </button>
                </div>
            )}

            {/* Approved State Actions */}
            {isApproved && (
                <div className="flex flex-wrap gap-2 animate-fade-in">
                    <button
                        onClick={() => {
                            updateDraftStatus(draft.id, 'EXECUTED', currentUser.name);
                            toast.success(`Draft "${t(draft.title as any) || draft.title}" executed successfully!`);
                        }}
                        className="flex items-center gap-1.5 rounded-xl bg-green-600 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-green-700 hover:-translate-y-0.5 shadow-lg shadow-green-100"
                    >
                        <Zap className="h-4 w-4 fill-current" /> {t('runExecution')}
                    </button>
                    <button
                        onClick={() => updateDraftStatus(draft.id, 'DRAFT', currentUser.name)}
                        className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
                    >
                        {t('rollbackToDraft')}
                    </button>
                </div>
            )}

            {/* Executed State */}
            {isExecuted && (
                <div className="flex items-center gap-2 rounded-xl bg-green-50 border border-green-100 p-3 text-green-700 animate-fade-in">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">{t('opChangeCommitted')}</span>
                </div>
            )}

            {/* Plan Preview Modal */}
            {showPlanModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPlanModal(false)} />
                    <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200 max-h-[80vh] flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">{t('genDispatchPlan')}</h3>
                                <p className="text-sm text-gray-500">{t('draftPreview')} · {new Date().toLocaleDateString(t('langCode' as any) === 'ta' ? 'ta-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                            <button onClick={() => setShowPlanModal(false)} className="text-gray-400 hover:text-gray-600">
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto">
                            {/* Summary Stats */}
                            <div className="grid grid-cols-4 gap-4 mb-6">
                                <div className="rounded-xl border border-purple-100 bg-purple-50 p-3 text-center">
                                    <p className="text-xs text-gray-500 uppercase">{t('stopsUppercaseLabel')}</p>
                                    <p className="text-xl font-bold text-purple-700">{mockPlanDetails.summary.stops}</p>
                                </div>
                                <div className="rounded-xl border border-purple-100 bg-purple-50 p-3 text-center">
                                    <p className="text-xs text-gray-500 uppercase">{t('revenueLabel')}</p>
                                    <p className="text-xl font-bold text-purple-700">₹{(mockPlanDetails.summary.revenue / 1000).toFixed(1)}k</p>
                                </div>
                                <div className="rounded-xl border border-purple-100 bg-purple-50 p-3 text-center">
                                    <p className="text-xs text-gray-500 uppercase">{t('staffActiveLabel2')}</p>
                                    <p className="text-xl font-bold text-purple-700">{mockPlanDetails.summary.vehicles}</p>
                                </div>
                                <div className="rounded-xl border border-purple-100 bg-purple-50 p-3 text-center">
                                    <p className="text-xs text-gray-500 uppercase">{t('efficiencyLabel')}</p>
                                    <p className="text-xl font-bold text-purple-700">{mockPlanDetails.summary.efficiency}%</p>
                                </div>
                            </div>

                            {/* Routes List */}
                            <h4 className="font-semibold text-gray-900 mb-3">{t('proposedRoutes')}</h4>
                            <div className="space-y-3">
                                {mockPlanDetails.routes.map((route, i) => (
                                    <div key={i} className="flex items-center justify-between rounded-xl border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-bold text-xs">
                                                {route.driver[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">{route.driver}</p>
                                                <p className="text-xs text-gray-500">{route.area}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{route.stops} {t('stops')}</p>
                                            <p className="text-xs text-gray-500">{route.time}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-center text-xs text-gray-400 mt-2">
                                    + {mockPlanDetails.summary.vehicles - 5} more routes generated...
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-100 flex justify-end gap-2 bg-gray-50 rounded-b-2xl">
                            <button
                                onClick={() => setShowPlanModal(false)}
                                className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                {t('closePreview')}
                            </button>
                            <button
                                onClick={() => { setShowPlanModal(false); setShowConfirmApprove(true); }}
                                className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                            >
                                {t('approvePlan')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <ReasonTagModal
                open={showConfirmApprove}
                title={t('approveDraft')}
                onSubmit={handleApprove}
                onCancel={() => setShowConfirmApprove(false)}
            />
            <ReasonTagModal
                open={showRejectModal}
                title={t('rejectDraft')}
                onSubmit={handleReject}
                onCancel={() => setShowRejectModal(false)}
            />
        </div>
    );
};

export default DraftCard;
