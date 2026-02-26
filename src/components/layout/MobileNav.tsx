import { NavLink } from "react-router-dom";
import { MapPin, List, BarChart2, User, Sparkles, Truck, Package, LayoutDashboard, Menu } from "lucide-react";
import { useUserStore } from "@/store";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    onMenuClick: () => void;
}

const MobileNav = ({ onMenuClick }: Props) => {
    const { currentUser } = useUserStore();
    const { t } = useTranslation();

    const STAFF_NAV_ITEMS = [
        { title: t('myRoute'), path: "/route", icon: MapPin },
        { title: t('myStops'), path: "/stops", icon: List },
        { title: t('daySummary'), path: "/summary", icon: BarChart2 },
        { title: t('myProfile'), path: "/profile", icon: User },
    ];

    const ADMIN_NAV_ITEMS = [
        { title: t('commandCenter'), path: "/home", icon: Sparkles },
        { title: t('dashboard'), path: "/dashboard", icon: LayoutDashboard },
        { title: t('dispatch'), path: "/dispatch", icon: Truck },
        { title: t('deliveries'), path: "/deliveries", icon: Package },
    ];

    const navItems = currentUser.role === 'STAFF' ? STAFF_NAV_ITEMS : ADMIN_NAV_ITEMS;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-[4000] flex border-t border-purple-100 bg-white/95 backdrop-blur-md pb-safe">
            {navItems.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `flex flex-1 flex-col items-center gap-1 py-1.5 text-[9px] sm:text-[10px] font-bold transition-colors ${isActive ? "text-purple-600" : "text-gray-400 hover:text-purple-500"
                        }`
                    }
                >
                    {({ isActive }) => (
                        <>
                            <div className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl transition-all ${isActive ? "purple-gradient shadow-md scale-105" : ""
                                }`}>
                                <item.icon className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isActive ? "text-white" : ""}`} />
                            </div>
                            <span className="truncate w-full text-center px-0.5 leading-tight">{item.title}</span>
                        </>
                    )}
                </NavLink>
            ))}
            <button
                onClick={onMenuClick}
                className="flex flex-1 flex-col items-center gap-1 py-1.5 text-[9px] sm:text-[10px] font-bold text-gray-400 hover:text-purple-500 transition-colors"
            >
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-xl">
                    <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </div>
                <span className="truncate w-full text-center px-0.5 leading-tight">{t('more')}</span>
            </button>
        </nav>
    );
};

export default MobileNav;
