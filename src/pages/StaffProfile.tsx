import {
    User, Phone, Shield, Bell,
    HelpCircle, LogOut, Moon, Globe, ChevronRight,
    BadgeCheck, Settings
} from "lucide-react";
import { useUserStore, useStaffStore } from "@/store";
import { toast } from "sonner";
import { useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const StaffProfile = () => {
    const { t, lang } = useTranslation();
    const { currentUser, logout } = useUserStore();
    const { staff } = useStaffStore();

    const myStaff = useMemo(() => staff.find(s => s.name === currentUser.name) || staff[0], [staff, currentUser]);

    const handleLogout = () => {
        toast.info(t('loggingOut'));
        setTimeout(() => logout(), 500);
    };

    return (
        <div className="space-y-6 pb-20 animate-fade-in">
            {/* Profile Header */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col items-center">
                <div className="relative">
                    <div className="h-24 w-24 rounded-full purple-gradient flex items-center justify-center text-white text-3xl font-black border-4 border-white shadow-xl">
                        {currentUser.name[0]}
                    </div>
                    <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <BadgeCheck className="h-3 w-3 text-white" />
                    </div>
                </div>
                <h2 className="mt-4 text-xl font-black text-gray-900">{currentUser.name}</h2>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">{t('authorizedPartner')}</p>
            </div>

            {/* Info List */}
            <div className="space-y-2">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">{t('identityStatus')}</h3>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {[
                        { icon: Phone, label: t('phoneNumber'), value: myStaff.phone },
                        { icon: Shield, label: t('shiftStatus'), value: t('activeOnDuty'), active: true },
                    ].map((item, i, arr) => (
                        <div key={item.label} className={`flex items-center justify-between p-4 ${i !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <item.icon className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-bold text-gray-700">{item.label}</span>
                            </div>
                            <span className={`text-sm font-black ${item.active ? 'text-green-600' : 'text-gray-900'}`}>{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Settings List */}
            <div className="space-y-2">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-4">{t('appSettings')}</h3>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {[
                        { icon: Bell, label: t('pushNotifications'), toggle: true },
                        { icon: Moon, label: t('darkMode'), toggle: false },
                        { icon: Globe, label: t('language'), value: lang === 'en' ? 'English' : 'தமிழ்' },
                        { icon: HelpCircle, label: t('supportHelp'), link: true },
                    ].map((item, i) => (
                        <div key={item.label} className={`flex items-center justify-between p-4 ${i !== 3 ? 'border-b border-gray-50' : ''}`}>
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                                    <item.icon className="h-4 w-4" />
                                </div>
                                <span className="text-sm font-bold text-gray-700">{item.label}</span>
                            </div>
                            {item.toggle !== undefined ? (
                                <div className={`h-6 w-11 rounded-full p-1 transition-colors ${item.toggle ? 'bg-purple-600' : 'bg-gray-200'}`}>
                                    <div className={`h-4 w-4 bg-white rounded-full transition-transform ${item.toggle ? 'translate-x-5' : ''}`} />
                                </div>
                            ) : (
                                <div className="flex items-center gap-1">
                                    {item.value && <span className="text-sm font-black text-gray-400">{item.value}</span>}
                                    {item.link && <ChevronRight className="h-4 w-4 text-gray-300" />}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Logout */}
            <button
                onClick={handleLogout}
                className="w-full h-14 rounded-2xl bg-red-50 text-red-600 font-black text-sm flex items-center justify-center gap-2 active:bg-red-100 transition-colors"
            >
                <LogOut className="h-4 w-4" />
                {t('logoutSession')}
            </button>

            <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                {t('staffAppDescription')} v1.0.2
            </p>
        </div>
    );
};

export default StaffProfile;
