import { NavLink, useLocation } from "react-router-dom";
import {
  Sparkles, LayoutDashboard, Truck, Package, Store,
  Boxes, FileText, Users, BarChart3, Settings, X,
  MapPin, List, User, Shield, LogOut, Zap, CircleDollarSign
} from "lucide-react";
import { useUserStore } from "@/store";
import { useTranslation } from "@/hooks/useTranslation";

const AppSidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const location = useLocation();
  const { currentUser, logout } = useUserStore();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout();
    onClose();
  };

  const ADMIN_NAV_ITEMS = [
    { title: t('commandCenter'), path: "/home", icon: Sparkles, ai: true },
    { title: t('dashboard'), path: "/dashboard", icon: LayoutDashboard },
    { title: t('dispatch'), path: "/dispatch", icon: Truck },
    { title: t('deliveries'), path: "/deliveries", icon: Package },
    { title: t('shops'), path: "/shops", icon: Store },
    { title: t('inventory'), path: "/inventory", icon: Boxes },
    { title: t('invoicesPayments'), path: "/invoices", icon: FileText },
    { title: t('staffTitle'), path: "/staff", icon: Users },
    { title: t('insights'), path: "/insights", icon: BarChart3 },
    { title: t('opsIntelligence'), path: "/intelligence", icon: Zap, preview: true },
    { title: t('pricing'), path: "/app-pricing", icon: CircleDollarSign },
    { title: t('settings'), path: "/settings", icon: Settings },
  ];

  const STAFF_NAV_ITEMS = [
    { title: t('myRoute'), path: "/route", icon: MapPin },
    { title: t('myStops'), path: "/stops", icon: List },
    { title: t('daySummary'), path: "/summary", icon: BarChart3 },
    { title: t('myProfile'), path: "/profile", icon: User },
  ];

  const navItems = currentUser.role === 'STAFF' ? STAFF_NAV_ITEMS : ADMIN_NAV_ITEMS;

  return (
    <>
      <aside
        className={`fixed left-0 top-0 z-[5000] flex h-screen w-64 flex-col bg-white border-r border-purple-100 shadow-lg transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex h-16 items-center gap-3 px-5 border-b border-purple-100">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl purple-gradient shadow-md">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-sm font-bold text-gray-900">MindFleet</h1>
            <p className="text-[10px] text-purple-500 tracking-wider uppercase font-medium">{t('distributorOs')}</p>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`sidebar-nav-item ${isActive ? "active" : ""}`}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1">{item.title}</span>
                {(item as any).ai && (
                  <span className={`flex h-5 items-center rounded-full px-2 text-[10px] font-bold ${isActive ? "bg-white/20 text-white" : "bg-purple-100 text-purple-600"
                    }`}>
                    AI
                  </span>
                )}
                {(item as any).preview && (
                  <span className={`flex h-5 items-center rounded-full px-2 text-[9px] font-black uppercase tracking-widest ${isActive ? "bg-white/20 text-white" : "bg-purple-50 text-purple-400"
                    }`}>
                    {t('preview')}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-purple-100 p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full purple-gradient text-white text-xs font-bold shrink-0">
              {currentUser.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 truncate">{currentUser.name}</p>
              <p className="text-[10px] text-purple-500">{currentUser.role === 'ADMIN' ? t('admin') : currentUser.role === 'MANAGER' ? t('manager') : t('staff')}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
              title={t('logoutSession')}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AppSidebar;
