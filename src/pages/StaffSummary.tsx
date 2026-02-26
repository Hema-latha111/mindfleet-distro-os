import {
    CheckCircle, XCircle, Package, IndianRupee,
    MapPin, Clock, Award, ChevronRight, Share2,
    RefreshCw, Power
} from "lucide-react";
import { useUserStore } from "@/store";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const StaffSummary = () => {
    const { t } = useTranslation();
    const { currentUser } = useUserStore();
    const [submitted, setSubmitted] = useState(false);

    // Mock data for summary
    const stats = {
        delivered: 14,
        failed: 2,
        totalItems: 324,
        collections: 42500,
        timeActive: "6h 24m",
        distance: "18.4 km"
    };

    const handleEndDay = () => {
        setSubmitted(true);
        toast.success(t('shiftCompletedMsg'));
    };

    return (
        <div className="space-y-6 pb-20 animate-fade-in">
            <div className="flex flex-col items-center text-center mt-4">
                <div className="h-20 w-20 rounded-3xl purple-gradient flex items-center justify-center text-white shadow-xl mb-4">
                    <Award className="h-10 w-10" />
                </div>
                <h1 className="text-2xl font-black text-gray-900">{t('shiftSummaryTitle')}</h1>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">17 February 2025</p>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-white border border-gray-100 p-5 shadow-sm">
                    <CheckCircle className="h-6 w-6 text-green-500 mb-2" />
                    <p className="text-2xl font-black text-gray-900">{stats.delivered}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('successfulStops')}</p>
                </div>
                <div className="rounded-3xl bg-white border border-gray-100 p-5 shadow-sm">
                    <XCircle className="h-6 w-6 text-red-500 mb-2" />
                    <p className="text-2xl font-black text-gray-900">{stats.failed}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('failedStops')}</p>
                </div>
                <div className="rounded-3xl bg-white border border-gray-100 p-5 shadow-sm">
                    <Package className="h-6 w-6 text-blue-500 mb-2" />
                    <p className="text-2xl font-black text-gray-900">{stats.totalItems}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('unitsDelivered')}</p>
                </div>
                <div className="rounded-3xl bg-white border border-gray-100 p-5 shadow-sm">
                    <IndianRupee className="h-6 w-6 text-purple-600 mb-2" />
                    <p className="text-2xl font-black text-gray-900">₹{(stats.collections / 1000).toFixed(1)}k</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('estCollections')}</p>
                </div>
            </div>

            {/* Operational Metrics */}
            <div className="rounded-3xl bg-white border border-gray-100 p-5 shadow-sm space-y-4">
                <h3 className="font-black text-gray-900 tracking-tight text-sm uppercase mb-2">{t('operationalMetrics')}</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                            <Clock className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-600">{t('timeActiveLabel')}</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">{stats.timeActive}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                            <MapPin className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-600">{t('totalDistance')}</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">{stats.distance}</span>
                </div>
            </div>

            {/* End of Day Confirmation */}
            {!submitted ? (
                <div className="space-y-4">
                    <button
                        onClick={handleEndDay}
                        className="w-full h-16 rounded-3xl bg-gray-900 text-white font-black text-lg flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all"
                    >
                        <Power className="h-5 w-5 text-red-500" />
                        {t('endShift')}
                    </button>
                    <p className="text-[10px] text-center text-gray-400 font-bold uppercase px-8">
                        {t('endShiftNotes')}
                    </p>
                </div>
            ) : (
                <div className="rounded-3xl bg-green-500 p-6 text-white text-center space-y-4 animate-bounce-in">
                    <CheckCircle className="h-12 w-12 mx-auto" />
                    <div className="space-y-1">
                        <h3 className="text-xl font-black">{t('shiftLogged')}</h3>
                        <p className="text-sm font-bold opacity-80">{t('syncingWithServer')}</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex-1 h-12 rounded-2xl bg-white/20 font-bold text-xs flex items-center justify-center gap-2">
                            <Share2 className="h-4 w-4" /> {t('shareReport')}
                        </button>
                        <button onClick={() => setSubmitted(false)} className="flex-1 h-12 rounded-2xl bg-white/20 font-bold text-xs flex items-center justify-center gap-2">
                            <RefreshCw className="h-4 w-4" /> {t('reOpen')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffSummary;
