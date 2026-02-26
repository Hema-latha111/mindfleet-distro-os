import { Menu, Bell, Search, Sparkles, Globe, Check } from "lucide-react";
import { useUserStore, useSettingsStore } from "@/store";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/store/types";

import { useNavigate } from "react-router-dom";

interface Props {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: Props) => {
  const { currentUser, users, setCurrentUser } = useUserStore();
  const { settings, updateSettings } = useSettingsStore();
  const [showRolePicker, setShowRolePicker] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { t, lang } = useTranslation();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    { id: 1, title: "Low Stock Alert", description: "Milk 500ml is below threshold", time: "5m ago", type: "warning", read: false },
    { id: 2, title: "Plan Approved", description: "Route Plan #242 has been verified", time: "1h ago", type: "success", read: false },
    { id: 3, title: "System Update", description: "New features added to Command Center", time: "3h ago", type: "info", read: true },
    { id: 4, title: "Delayed Delivery", description: "Route #12 report high traffic", time: "5h ago", type: "error", read: true },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleRoleSwitch = (user: any) => {
    setCurrentUser(user);
    setShowRolePicker(false);

    // Redirect based on perspective
    if (user.role === 'STAFF') {
      navigate('/route');
    } else {
      navigate('/home');
    }
  };

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
  ];

  return (
    <header className="sticky top-0 z-[3000] flex h-14 items-center gap-3 border-b border-purple-100 bg-white/90 backdrop-blur-md px-4 md:px-6">
      {/* Menu button - mobile/tablet */}
      <button
        onClick={onMenuClick}
        className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-purple-100 text-gray-500 hover:bg-purple-50 hover:text-purple-600 transition-colors"
      >
        <Menu className="h-4 w-4" />
      </button>

      {/* Logo - mobile only */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg purple-gradient">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </div>
        <span className="text-sm font-bold text-gray-900">MindFleet</span>
      </div>

      {/* Search - hidden on mobile and for staff */}
      {currentUser.role !== 'STAFF' && (
        <div className="hidden md:flex flex-1 max-w-sm items-center gap-2 rounded-xl border border-purple-100 bg-purple-50/50 px-3 py-2 transition-all focus-within:border-purple-400 focus-within:bg-white focus-within:shadow-sm">
          <Search className="h-3.5 w-3.5 text-purple-400 shrink-0" />
          <input
            type="text"
            placeholder={t('searchAll')}
            className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
          />
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        {/* Language Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setShowLangPicker(!showLangPicker);
              setShowRolePicker(false);
              setShowNotifications(false);
            }}
            className={`flex h-9 w-9 items-center justify-center rounded-xl border border-purple-100 transition-colors ${showLangPicker ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'
              }`}
            title={t('language')}
          >
            <Globe className="h-4 w-4" />
          </button>

          {showLangPicker && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-purple-100 bg-white shadow-xl z-50 overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-purple-50">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('language')}</p>
              </div>
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => {
                    updateSettings({ language: l.code });
                    setShowLangPicker(false);
                    setShowNotifications(false);
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

        {/* Notifications - Hidden for staff */}
        {currentUser.role !== 'STAFF' && (
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowLangPicker(false);
                setShowRolePicker(false);
              }}
              className={`relative flex h-9 w-9 items-center justify-center rounded-xl border border-purple-100 transition-colors ${showNotifications ? 'bg-purple-100 text-purple-600' : 'text-gray-500 hover:bg-purple-50 hover:text-purple-600'
                }`}
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-purple-600 ring-2 ring-white" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-purple-100 bg-white shadow-xl z-50 overflow-hidden animate-fade-in">
                <div className="px-4 py-3 border-b border-purple-50 flex items-center justify-between">
                  <p className="text-xs font-semibold text-gray-900 tracking-wider">Notifications</p>
                  <button
                    onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                    className="text-[10px] font-bold text-purple-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        className={`px-4 py-3 border-b border-purple-50 last:border-0 hover:bg-purple-50/50 transition-colors relative cursor-pointer ${!n.read ? 'bg-purple-50/30' : ''}`}
                        onClick={() => setNotifications(notifications.map(notif => notif.id === n.id ? { ...notif, read: true } : notif))}
                      >
                        <div className="flex gap-3">
                          <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${n.type === 'warning' ? 'bg-amber-500' :
                            n.type === 'success' ? 'bg-green-500' :
                              n.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                            }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">{n.title}</p>
                            <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{n.description}</p>
                            <p className="text-[9px] text-gray-400 mt-1 font-medium">{n.time}</p>
                          </div>
                          {!n.read && <div className="h-1.5 w-1.5 rounded-full bg-purple-600 self-center" />}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <p className="text-xs text-gray-400 font-medium">No new notifications</p>
                    </div>
                  )}
                </div>
                <div className="px-4 py-2 border-t border-purple-50 bg-purple-50/20">
                  <button
                    className="w-full text-center text-[10px] font-black uppercase tracking-widest text-purple-600 hover:text-purple-700 py-1"
                  >
                    View All Alerts
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRolePicker(!showRolePicker);
              setShowLangPicker(false);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 rounded-xl border border-purple-100 bg-purple-50 px-3 py-1.5 transition-all hover:border-purple-300 hover:bg-purple-100"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded-full purple-gradient text-white text-[10px] font-bold">
              {currentUser.name[0]}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-gray-800 leading-none">{currentUser.name}</p>
              <p className="text-[10px] text-purple-500 uppercase tracking-widest mt-1">{t(currentUser.role.toLowerCase() as any)}</p>
            </div>
          </button>

          {showRolePicker && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-purple-100 bg-white shadow-xl z-50 overflow-hidden animate-fade-in">
              <div className="px-4 py-3 border-b border-purple-50">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{t('switchRole')}</p>
              </div>
              {users.filter(u => u.role === 'STAFF').map(user => (
                <button
                  key={user.id}
                  onClick={() => handleRoleSwitch(user)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-purple-50 ${currentUser.id === user.id ? 'bg-purple-50' : ''
                    }`}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full purple-gradient text-white text-xs font-bold shrink-0">
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-[10px] text-purple-500 uppercase tracking-widest">{t(user.role.toLowerCase() as any)}</p>
                  </div>
                  {currentUser.id === user.id && (
                    <div className="ml-auto h-2 w-2 rounded-full bg-purple-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopBar;

