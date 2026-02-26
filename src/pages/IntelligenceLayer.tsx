import { useState } from "react";
import { Lock, Lightbulb, TrendingUp, ShieldAlert, BarChart, ShieldCheck, X, CheckSquare, Rocket } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";

const IntelligenceLayer = () => {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(2); // Center card (Dispatch Risk)

    const features = [
        {
            title: t('demandForecasting'),
            description: t('demandForecastingDesc'),
            icon: BarChart,
            metric: "+12% Variance",
            risk: "Moderate",
            confidence: "82%",
        },
        {
            title: t('creditRiskAlerts'),
            description: t('creditRiskAlertsDesc'),
            icon: ShieldCheck,
            metric: "₹1.2L Exposure",
            risk: "High",
            confidence: "94%",
        },
        {
            title: t('dispatchRiskPrediction'),
            description: t('dispatchRiskPredictionDesc'),
            icon: TrendingUp,
            metric: "4 SLA Risks",
            risk: "High",
            confidence: "88%",
        },
        {
            title: t('lossLeakageDetection'),
            description: t('lossLeakageDetectionDesc'),
            icon: ShieldAlert,
            metric: "2.4% Shrinkage",
            risk: "Moderate",
            confidence: "76%",
        },
        {
            title: t('smartRecommendations'),
            description: t('smartRecommendationsDesc'),
            icon: Lightbulb,
            metric: "5 Suggestions",
            risk: "Low",
            confidence: "91%",
        },
    ];


    return (
        <div className="min-h-screen bg-slate-50/50 -mt-6 -mx-6 px-3 sm:px-6 pt-8 sm:pt-12 pb-16 sm:pb-24 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-radial-gradient from-purple-100/30 to-transparent pointer-events-none" />

            <div className="max-w-6xl mx-auto space-y-12 sm:space-y-20 relative z-10">
                {/* Hero Section */}
                <div className="text-center space-y-4 sm:space-y-6 animate-fade-in">
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-purple-100 shadow-sm mb-2 sm:mb-4">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600" />
                        </span>
                        <span className="text-[10px] font-black text-purple-600 uppercase tracking-[0.2em]">{t('newRelease')}</span>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] px-2">
                            {t('opsIntelligence').split(' ').slice(0, -1).join(' ')}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                                {t('opsIntelligence').split(' ').slice(-1)[0]}
                            </span>
                        </h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-2">{t('launchingSoonV2')}</p>
                    </div>

                    <div className="w-16 h-1 bg-slate-200 mx-auto rounded-full" />

                    <div className="space-y-6">
                        <p className="text-base sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed px-4 sm:px-0">
                            {t('predictIssues')} <br />
                            {t('makeConfidentDecisions')}
                        </p>

                        <button
                            className="inline-flex items-center gap-2 px-6 sm:px-8 h-12 sm:h-14 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-700 text-white text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-200 transition-all hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-purple-300 group cursor-default"
                        >
                            <Rocket className="h-4 w-4 animate-pulse group-hover:rotate-12 transition-transform" />
                            {t('launchingSoon')}
                        </button>
                    </div>
                </div>

                {/* Intelligence Deck — Desktop: Controlled Carousel | Mobile: Horizontal scroll */}

                {/* Mobile horizontal scroll (hidden on sm+) */}
                <div className="flex sm:hidden overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-3 px-3 scrollbar-hide">
                    {features.map((feature, i) => (
                        <div
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`relative shrink-0 snap-center w-[260px] h-[380px] rounded-[32px] border backdrop-blur-md p-7 transition-all duration-300 overflow-hidden cursor-pointer ${activeIndex === i
                                ? 'bg-white/90 shadow-[0_20px_50px_rgba(168,85,247,0.16)] border-purple-100'
                                : 'bg-white/40 border-white/50'
                                }`}
                        >
                            {/* Card content */}
                            <div className="relative z-0 h-full flex flex-col blur-[1.5px]">
                                <div className="flex flex-col items-center text-center gap-4 mb-6">
                                    <div className={`h-16 w-16 rounded-[24px] shadow-sm flex items-center justify-center ${activeIndex === i ? 'bg-purple-600 text-white' : 'bg-white text-purple-600'
                                        }`}>
                                        <feature.icon className="h-8 w-8" />
                                    </div>
                                </div>
                                <div className="flex-1 text-center">
                                    <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">{feature.title}</h3>
                                    <div className="w-6 h-0.5 bg-purple-100 rounded-full mx-auto my-3" />
                                    <p className="text-xs text-slate-500 font-bold leading-relaxed">{feature.description}</p>
                                </div>
                                <div className="pt-4 border-t border-slate-50 text-center">
                                    <div className="text-2xl font-black text-purple-600">{feature.metric}</div>
                                </div>
                            </div>
                            {/* Center Lock */}
                            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="h-14 w-14 rounded-2xl bg-white/80 backdrop-blur-xl shadow-lg border border-purple-100 flex items-center justify-center">
                                        <Lock className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <span className="text-[9px] font-black text-purple-600 uppercase tracking-[0.2em]">{t('lockedV2')}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Intelligence Deck (hidden on mobile) */}
                <div className="hidden sm:flex relative h-[620px] items-center justify-center overflow-hidden -mx-6">
                    <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                        {features.map((feature, i) => {
                            const isActive = i === activeIndex;
                            const distance = i - activeIndex;
                            const isVisible = Math.abs(distance) <= 2;

                            // Dynamic Styling based on position
                            const translateX = distance * 115;
                            const scale = isActive ? 1.05 : 0.85;
                            const opacity = isActive ? 1 : 0.35;
                            const zIndex = 50 - Math.abs(distance) * 10;

                            return (
                                <div
                                    key={i}
                                    onClick={() => setActiveIndex(i)}
                                    className={`absolute transition-all duration-500 ease-in-out cursor-pointer ${!isVisible ? 'pointer-events-none opacity-0' : ''}`}
                                    style={{
                                        transform: `translateX(${translateX}%) scale(${scale})`,
                                        zIndex: zIndex,
                                        opacity: isVisible ? opacity : 0,
                                    }}
                                >
                                    <div className={`relative w-[300px] h-[480px] sm:w-[340px] sm:h-[520px] rounded-[40px] border border-white backdrop-blur-md p-10 transition-all duration-500 overflow-hidden ${isActive
                                        ? 'bg-white/90 shadow-[0_30px_70px_rgba(168,85,247,0.18)] border-purple-100'
                                        : 'bg-white/40 border-transparent hover:bg-white/60'
                                        }`}>
                                        {/* Card Content */}
                                        <div className="relative z-0 h-full flex flex-col transition-all duration-500 blur-[1.5px]">
                                            <div className="flex flex-col items-center text-center gap-6 mb-8">
                                                <div className={`h-20 w-20 rounded-[32px] shadow-sm flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-purple-600 text-white scale-110 shadow-purple-200 shadow-xl' : 'bg-white text-purple-600'}`}>
                                                    <feature.icon className="h-10 w-10" />
                                                </div>
                                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${feature.risk === 'High' ? 'bg-red-50 text-red-500' : feature.risk === 'Moderate' ? 'bg-amber-50 text-amber-500' : 'bg-green-50 text-green-500'}`}>
                                                    {feature.risk === 'High' ? t('highRisk') : feature.risk === 'Moderate' ? t('moderateRisk') : t('lowRisk')}
                                                </div>
                                            </div>
                                            <div className="flex-1 flex flex-col items-center text-center space-y-5">
                                                <h3 className={`font-black text-slate-900 uppercase tracking-tight leading-tight ${isActive ? 'text-xl' : 'text-base'}`}>{feature.title}</h3>
                                                <div className="w-8 h-1 bg-purple-100 rounded-full" />
                                                <p className="text-sm text-slate-500 font-bold leading-relaxed px-2">{feature.description}</p>
                                            </div>
                                            <div className="pt-8 border-t border-slate-50 space-y-4">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t('predictedVariance')}</span>
                                                    <div className="text-3xl font-black text-purple-600 tabular-nums">{feature.metric}</div>
                                                </div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase text-center">{t('confidenceScore')}: <span className="text-slate-900">{feature.confidence}</span></div>
                                            </div>
                                        </div>

                                        {/* Centered Lock Overlay — on every card */}
                                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                                            {isActive ? (
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="h-20 w-20 rounded-[28px] bg-white/80 backdrop-blur-xl shadow-xl shadow-purple-100 border border-purple-100 flex items-center justify-center">
                                                        <Lock className="h-9 w-9 text-purple-600" />
                                                    </div>
                                                    <div className="text-center space-y-1">
                                                        <span className="block text-[11px] font-black text-purple-600 uppercase tracking-[0.25em]">{t('lockedV2')}</span>
                                                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">{t('roadmapEssential')}</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="h-12 w-12 rounded-2xl bg-white/50 backdrop-blur-md border border-purple-100/50 flex items-center justify-center shadow-lg">
                                                    <Lock className="h-5 w-5 text-purple-400" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Background Pulse for Active Card */}
                                        {isActive && (
                                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-transparent to-indigo-500/5 pointer-events-none z-10" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* What's Coming Section */}
                <div className="pt-12 sm:pt-20 pb-10">
                    <div className="text-center mb-12 sm:mb-20">
                        <h2 className="text-3xl sm:text-4xl font-black text-purple-600 uppercase tracking-tight mb-4">
                            {t('whatsComingV2')}
                        </h2>
                        <div className="w-24 h-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                        {features.map((feature, i) => (
                            <div 
                                key={i} 
                                className="group relative p-8 rounded-[32px] bg-white border border-purple-50 shadow-sm hover:shadow-[0_20px_50px_rgba(168,85,247,0.15)] transition-all duration-500 hover:border-purple-300 flex flex-col active:scale-[0.98]"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                    <feature.icon className="h-24 w-24 text-purple-900" />
                                </div>
                                
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300 shrink-0">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-tight leading-tight">
                                        <span className="text-purple-600 mr-2">🔹</span>
                                        {feature.title}
                                    </h3>
                                </div>
                                <p className="text-sm text-slate-500 font-bold leading-relaxed relative z-10">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 sm:mt-24 text-center space-y-8">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-purple-50 border border-purple-100/50">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600" />
                            </span>
                            <p className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-[0.2em] px-2">
                                {t('v2DevelopmentNote')}
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <button className="h-12 px-10 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-slate-200 transition-all hover:bg-purple-700 active:scale-95">
                                {t('readyToUse')}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-100 text-center space-y-2">
                    <p className="text-xs font-bold text-slate-400">{t('builtForAdmins')}</p>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">{t('poweredByCore')}</p>
                </div>
            </div>

        </div>
    );
};


export default IntelligenceLayer;
