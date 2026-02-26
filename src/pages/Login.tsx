import { useState } from "react";
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe, Check } from "lucide-react";
import { useUserStore, useSettingsStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/store/types";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [showLangPicker, setShowLangPicker] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { users, login } = useUserStore();
    const { settings, updateSettings } = useSettingsStore();
    const { t, lang } = useTranslation();
    const navigate = useNavigate();

    const languages: { code: Language; label: string; native: string }[] = [
        { code: 'en', label: 'English', native: 'English' },
        { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
        { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    ];

    const handleProfileSelect = (user: any) => {
        setSelectedUser(user);
        if (user.role === 'ADMIN') {
            setUsername('admin');
            setPassword('admin123');
        } else {
            setUsername('staff');
            setPassword('staff123');
        }
    };

    const handleLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            login(selectedUser.id);
            toast.success(t('welcomeBack', { name: selectedUser.name }));
            navigate("/home");
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="h-[100dvh] w-full flex bg-white font-sans overflow-hidden fixed inset-0 overscroll-none select-none">
            {/* Floating Language Switcher */}
            <div className="fixed top-4 right-4 z-[6000]">
                <div className="relative">
                    <button
                        onClick={() => setShowLangPicker(!showLangPicker)}
                        className={`flex h-10 w-10 items-center justify-center rounded-xl border border-purple-100 bg-white shadow-lg transition-colors ${showLangPicker ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'
                            }`}
                        title={t('language')}
                    >
                        <Globe className="h-5 w-5" />
                    </button>

                    {showLangPicker && (
                        <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-purple-100 bg-white shadow-2xl z-50 overflow-hidden animate-fade-in">
                            <div className="px-4 py-3 border-b border-purple-50">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('language')}</p>
                            </div>
                            {languages.map(l => (
                                <button
                                    key={l.code}
                                    onClick={() => {
                                        updateSettings({ language: l.code });
                                        setShowLangPicker(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-purple-50 ${lang === l.code ? 'bg-purple-50' : ''
                                        }`}
                                >
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">{l.native}</p>
                                        <p className="text-[10px] text-purple-500 uppercase tracking-widest">{l.label}</p>
                                    </div>
                                    {lang === l.code && (
                                        <Check className="h-4 w-4 text-purple-600" />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Left Side: Branding & Info */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-purple-950 items-center justify-center p-12 overflow-hidden">
                {/* Abstract Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-purple-800/20 blur-[120px]" />
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl purple-gradient shadow-2xl">
                            <Sparkles className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tight">MindFleet</h1>
                            <p className="text-purple-400 text-sm font-bold tracking-widest uppercase">Distributor OS</p>
                        </div>
                    </div>

                    <h2 className="text-5xl font-black text-white leading-[1.1] mb-8">
                        {t('futureSupplyChain')}
                    </h2>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <Zap className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">{t('aiDrivenLogistics')}</h3>
                                <p className="text-white/50 text-sm">{t('aiDrivenLogisticsDesc')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <ShieldCheck className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">{t('enterpriseSecurity')}</h3>
                                <p className="text-white/50 text-sm">{t('enterpriseSecurityDesc')}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                <Globe className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold">{t('globalScale')}</h3>
                                <p className="text-white/50 text-sm">{t('globalScaleDesc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-gray-50 lg:bg-white">
                <div className="w-full max-w-md h-full lg:h-auto flex flex-col p-6 sm:p-10 lg:p-0">

                    {/* Sticky Mobile Header */}
                    <div className="lg:hidden flex items-center justify-between mb-8 shrink-0">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl purple-gradient shadow-sm">
                                <Sparkles className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg font-black text-gray-900 tracking-tight">MindFleet</span>
                        </div>
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    </div>

                    <div className="flex-1 flex flex-col min-h-0">
                        {lang === 'hi' ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-500">
                                <div className="h-20 w-20 rounded-[32px] bg-purple-50 flex items-center justify-center text-purple-600 mb-8 shadow-xl shadow-purple-100">
                                    <Sparkles className="h-10 w-10 animate-pulse" />
                                </div>
                                <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-4">हिन्दी (Hindi)</h2>
                                <p className="text-xl font-bold text-purple-600 uppercase tracking-[0.2em] mb-12">{t('comingSoon')}</p>
                                <button
                                    onClick={() => updateSettings({ language: 'en' })}
                                    className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-gray-900 text-white font-black text-sm uppercase tracking-widest shadow-xl transition-all hover:bg-purple-700 active:scale-95"
                                >
                                    <ArrowRight className="h-4 w-4 rotate-180" />
                                    {t('backToLogin')}
                                </button>
                            </div>
                        ) : !selectedUser ? (
                            <>
                                <div className="shrink-0 mb-6">
                                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">{t('loginTitle')}</h2>
                                    <p className="text-sm sm:text-base text-gray-500 font-medium">{t('selectProfile')}</p>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-3 sm:space-y-4 scrollbar-none custom-scrollbar pb-6">
                                    {users.map((user) => (
                                        <button
                                            key={user.id}
                                            onClick={() => handleProfileSelect(user)}
                                            className="group w-full flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-purple-100 bg-white transition-all hover:border-purple-300 hover:shadow-xl hover:shadow-purple-100 text-left active:scale-[0.97]"
                                        >
                                            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl purple-gradient text-white text-lg sm:text-xl font-black shadow-lg group-hover:scale-110 transition-transform">
                                                {user.name[0]}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-base sm:text-lg font-black text-gray-900 truncate">{user.name}</p>
                                                <p className="text-[10px] sm:text-sm font-bold text-purple-600 uppercase tracking-widest truncate">{t(user.role.toLowerCase() as any)}</p>
                                            </div>
                                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gray-50 flex items-center justify-center border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-colors shrink-0">
                                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 flex flex-col h-full overflow-hidden">
                                <div className="shrink-0">
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-600 mb-6 hover:translate-x-[-4px] transition-transform"
                                    >
                                        <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 rotate-180" />
                                        {t('backToProfiles')}
                                    </button>
                                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{t('securityCheck')}</h1>
                                    <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">{t('authMessage', { role: t(selectedUser.role.toLowerCase() as any) })}</p>
                                </div>

                                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-purple-50 border border-purple-100 shrink-0">
                                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl purple-gradient text-white text-base sm:text-lg font-black shadow-md">
                                        {selectedUser.name[0]}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs sm:text-sm font-black text-gray-900 truncate">{selectedUser.name}</p>
                                        <p className="text-[9px] sm:text-[10px] font-bold text-purple-600 uppercase tracking-widest truncate">{t(selectedUser.role.toLowerCase() as any)}</p>
                                    </div>
                                    <div className="ml-auto h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                        <ShieldCheck className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-purple-600" />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4 sm:space-y-5 py-2">
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t('username')}</label>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder={t('enterUsername')}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-100 bg-white text-sm sm:text-base text-gray-900 font-bold focus:border-purple-400 focus:outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5 sm:space-y-2">
                                        <label className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{t('password')}</label>
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder={t('enterPassword')}
                                            className="w-full px-4 sm:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 border-gray-100 bg-white text-sm sm:text-base text-gray-900 font-bold focus:border-purple-400 focus:outline-none transition-all shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="shrink-0 pt-4">
                                    <button
                                        onClick={handleLogin}
                                        disabled={isLoading}
                                        className="w-full py-4 rounded-xl sm:rounded-2xl purple-gradient text-white font-black text-base sm:text-lg shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2 sm:gap-3"
                                    >
                                        {isLoading ? (
                                            <div className="h-5 w-5 sm:h-6 sm:w-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                {t('secureAccess')}
                                                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Fixed Footer */}
                    <div className="shrink-0 pt-6 border-t border-gray-100 mt-auto">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                            <span>{t('mindfleetAi')}</span>
                            <span className="flex items-center gap-1.5 text-green-600">
                                <div className="h-1 w-1 rounded-full bg-green-500 animate-pulse" />
                                {t('secure')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
