import { motion } from "framer-motion";
import { Shield, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { lang, setLang } = useLang();
    const isTamil = lang === "ta";
    const navigate = useNavigate();

    const toggleLang = (l: Lang) => setLang(l);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 md:py-4">
            <div className="mx-auto max-w-7xl">
                <div className="glass-card rounded-2xl px-4 py-2 md:px-6 md:py-3 flex items-center justify-between gap-2 border-black/5 shadow-2xl">

                    {/* Logo */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="bg-primary p-1 rounded-lg md:p-1.5 primary-glow">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-foreground">MindFleet</span>
                    </div>

                    {/* Desktop Nav Links — smaller + tighter gap in Tamil */}
                    <div className={`hidden md:flex items-center ${isTamil ? "gap-4" : "gap-8"}`}>
                        <a href="#" className={`font-bold text-muted-foreground hover:text-primary transition-colors ${isTamil ? "text-[11px]" : "text-sm"}`}>
                            {t(lang, "nav_platform")}
                        </a>
                        <a href="#" className={`font-bold text-primary transition-colors ${isTamil ? "text-[11px]" : "text-sm"}`}>
                            {t(lang, "nav_pricing")}
                        </a>
                        <a href="#" className={`font-bold text-muted-foreground hover:text-primary transition-colors ${isTamil ? "text-[11px]" : "text-sm"}`}>
                            {t(lang, "nav_docs")}
                        </a>
                        <a href="#" className={`font-bold text-muted-foreground hover:text-primary transition-colors ${isTamil ? "text-[11px]" : "text-sm"}`}>
                            {t(lang, "nav_company")}
                        </a>
                    </div>

                    {/* Desktop Right */}
                    <div className="hidden md:flex items-center gap-3 flex-shrink-0">
                        {/* Language Switcher */}
                        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/5 border border-black/5">
                            <Globe className="w-3.5 h-3.5 text-muted-foreground ml-1.5 flex-shrink-0" />
                            <button
                                onClick={() => toggleLang("en")}
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${lang === "en" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                🇬🇧 EN
                            </button>
                            <button
                                onClick={() => toggleLang("ta")}
                                className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${lang === "ta" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                🇮🇳 தமிழ்
                            </button>
                        </div>

                        <button
                            onClick={() => navigate("/login")}
                            className={`font-bold text-muted-foreground hover:text-foreground transition-colors ${isTamil ? "text-[11px]" : "text-sm"}`}
                        >
                            {t(lang, "nav_login")}
                        </button>
                    </div>

                    {/* Mobile hamburger */}
                    <button className="md:hidden text-foreground flex-shrink-0" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden mt-4 glass-card rounded-2xl p-6 flex flex-col gap-4 border-black/5"
                >
                    <a href="#" className="text-sm font-bold text-foreground">{t(lang, "nav_platform")}</a>
                    <a href="#" className="text-sm font-bold text-foreground">{t(lang, "nav_pricing")}</a>
                    <a href="#" className="text-sm font-bold text-foreground">{t(lang, "nav_docs")}</a>
                    <a href="#" className="text-sm font-bold text-foreground">{t(lang, "nav_company")}</a>
                    <hr className="border-black/5" />

                    {/* Mobile Language Switcher */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <button
                            onClick={() => toggleLang("en")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === "en" ? "bg-primary text-white" : "bg-black/5 text-muted-foreground"}`}
                        >
                            🇬🇧 English
                        </button>
                        <button
                            onClick={() => toggleLang("ta")}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${lang === "ta" ? "bg-primary text-white" : "bg-black/5 text-muted-foreground"}`}
                        >
                            🇮🇳 தமிழ்
                        </button>
                    </div>

                    <button
                        onClick={() => navigate("/login")}
                        className="text-sm font-bold text-foreground text-left"
                    >
                        {t(lang, "nav_login")}
                    </button>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;

