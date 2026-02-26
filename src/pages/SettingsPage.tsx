import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Building2, Clock, MapPin, Users,
  Save, ChevronDown, Bell, Globe, Package,
  Shield, AlertTriangle, CheckCircle2, Info,
  Sparkles, ChevronUp, ArrowLeft, Construction
} from "lucide-react";
import { useUserStore, useSettingsStore } from "@/store";
import { toast } from "sonner";
import {
  UsersOverview,
  InviteUserForm,
  OnboardedStaffTable,
  RolesAndPrivileges
} from "@/components/settings/users";
import { useTranslation } from "@/hooks/useTranslation";
import { Language } from "@/store/types";
import { ComingSoon } from "@/components/shared/ComingSoon";

// ─── Types ───────────────────────────────────────────────────────
type SettingsTab = 'business' | 'notifications' | 'account' | 'users';

// ─── Mock Data ──────────────────────────────────────────────────


const MOCK_STATS = {
  total: 12,
  active: 8,
  pending: 3,
  disabled: 1
};

// ─── Section Component ──────────────────────────────────────────
function Section({ title, subtitle, icon: Icon, children }: {
  title: string;
  subtitle?: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center flex-shrink-0">
          <Icon className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">{title}</h3>
          {subtitle && <p className="text-[11px] text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      <div className="px-6 py-5 space-y-5">{children}</div>
    </div>
  );
}

// ─── Field Row ──────────────────────────────────────────────────
function FieldRow({ label, description, children }: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-6">
      <div className="flex-1 min-w-0">
        <label className="text-sm font-semibold text-gray-700 block">{label}</label>
        {description && <p className="text-[11px] text-gray-400 mt-0.5 leading-relaxed">{description}</p>}
      </div>
      <div className="flex-shrink-0 w-full sm:w-64">{children}</div>
    </div>
  );
}

// ─── Toggle Switch ──────────────────────────────────────────────
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition-colors flex-shrink-0 ${checked ? 'bg-green-500' : 'bg-gray-200'
        }`}
    >
      <div className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'
        }`} />
    </button>
  );
}

// ─── Select ─────────────────────────────────────────────────────
function Select({ value, onChange, options }: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all pr-8"
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );
}

// ─── Input ──────────────────────────────────────────────────────
function Input({ value, onChange, placeholder, type = "text", disabled = false }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className={`w-full rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-200 transition-all ${disabled ? 'bg-gray-50 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700'
        }`}
    />
  );
}

// ─── Main Component ─────────────────────────────────────────────
const SettingsPage = () => {
  const { currentUser } = useUserStore();
  const { settings, updateSettings } = useSettingsStore();
  const { t, lang } = useTranslation();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<SettingsTab>('business');

  // Sync tab with route
  useEffect(() => {
    if (location.pathname === '/settings/users') {
      setActiveTab('users');
    }
  }, [location.pathname]);

  // ─── Local state for form fields ──────────────────────────────
  const [businessName, setBusinessName] = useState("MindFleet Distribution");
  const [businessPhone, setBusinessPhone] = useState("+91 44 2815 7200");
  const [businessEmail, setBusinessEmail] = useState("ops@mindfleet.in");
  const [gstNumber, setGstNumber] = useState("33AADCM1234A1Z5");
  const [warehouseAddr, setWarehouseAddr] = useState("Plot 12, Industrial Estate, Ambattur, Chennai 600058");
  const [currency, setCurrency] = useState("INR");
  const [timezone, setTimezone] = useState("IST");

  const [deliveryWindow, setDeliveryWindow] = useState("6:00 AM - 2:00 PM");

  // Notification settings
  const [notifyDeliveryComplete, setNotifyDeliveryComplete] = useState(true);
  const [notifyDeliveryFailed, setNotifyDeliveryFailed] = useState(true);
  const [notifyLowStock, setNotifyLowStock] = useState(true);
  const [notifyPaymentOverdue, setNotifyPaymentOverdue] = useState(true);
  const [notifyStaffIdle, setNotifyStaffIdle] = useState(false);
  const [notifySlaRisk, setNotifySlaRisk] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [dailyReport, setDailyReport] = useState(true);
  const [reportTime, setReportTime] = useState("08:00 PM");

  // Account settings
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("8");
  const [dataRetention, setDataRetention] = useState("365");

  const [hasChanges, setHasChanges] = useState(false);

  const markChanged = () => { if (!hasChanges) setHasChanges(true); };

  const handleSave = () => {
    setHasChanges(false);
    toast.success(t('settingsSaved'), {
      description: t('settingsSavedDesc'),
    });
  };

  const tabs: { id: SettingsTab; label: string; icon: any; adminOnly?: boolean }[] = [
    { id: 'business', label: t('business'), icon: Building2 },
    { id: 'notifications', label: t('notifications'), icon: Bell },
    { id: 'account', label: t('accountSecurity'), icon: Shield },
    { id: 'users', label: t('usersAccess'), icon: Users, adminOnly: true },
  ];

  const filteredTabs = tabs.filter(t => !t.adminOnly || currentUser.role === 'ADMIN');

  if (lang === 'hi') {
    return <ComingSoon />;
  }

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-fade-in">

      {/* ─── Header ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{t('settings')}</h1>
          <p className="text-sm text-gray-400 mt-1">{t('manageBusiness')}</p>
        </div>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all active:scale-95 ${hasChanges
            ? 'bg-gray-900 text-white shadow-lg hover:bg-gray-800'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
        >
          <Save className="h-4 w-4" />
          {t('saveChanges')}
        </button>
      </div>

      {/* ─── Tabs ────────────────────────────────────────────── */}
      <div className="flex gap-1 mb-6 bg-gray-100 rounded-xl p-1 overflow-x-auto scrollbar-hide shrink-0">
        {filteredTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-lg text-[11px] sm:text-sm font-semibold transition-all shrink-0 min-w-[100px] sm:min-w-0 sm:flex-1 justify-center whitespace-nowrap ${activeTab === tab.id
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
              }`}
          >
            <tab.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ─── Tab Content ─────────────────────────────────────── */}
      <div className="space-y-5">

        {/* ════════════════ BUSINESS TAB ════════════════ */}
        {activeTab === 'business' && (
          <>
            <Section title={t('companyInfo')} subtitle={t('registeredDetails')} icon={Building2}>
              <FieldRow label={t('businessName')} description={t('legalEntity')}>
                <Input value={businessName} onChange={(v) => { setBusinessName(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('gstTaxId')}>
                <Input value={gstNumber} onChange={(v) => { setGstNumber(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('contactPhone')}>
                <Input value={businessPhone} onChange={(v) => { setBusinessPhone(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('opsEmail')}>
                <Input value={businessEmail} onChange={(v) => { setBusinessEmail(v); markChanged(); }} />
              </FieldRow>
            </Section>

            <Section title={t('warehouseDepot')} subtitle={t('primaryLocation')} icon={MapPin}>
              <FieldRow label={t('warehouseAddr')} description={t('gpsDispatch')}>
                <Input value={warehouseAddr} onChange={(v) => { setWarehouseAddr(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('operatingHours')}>
                <Input value={deliveryWindow} onChange={(v) => { setDeliveryWindow(v); markChanged(); }} />
              </FieldRow>
            </Section>

            <Section title={t('regionalPreferences')} icon={Globe}>
              <FieldRow label={t('currency')}>
                <Select value={currency} onChange={(v) => { setCurrency(v); markChanged(); }} options={[
                  { value: 'INR', label: '₹ INR — Indian Rupee' },
                  { value: 'USD', label: '$ USD — US Dollar' },
                  { value: 'EUR', label: '€ EUR — Euro' },
                ]} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('timezone')}>
                <Select value={timezone} onChange={(v) => { setTimezone(v); markChanged(); }} options={[
                  { value: 'IST', label: 'IST — India Standard Time' },
                  { value: 'UTC', label: 'UTC — Coordinated Universal Time' },
                  { value: 'SGT', label: 'SGT — Singapore Time' },
                ]} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('language')}>
                <Select value={lang} onChange={(v) => { updateSettings({ language: v as Language }); }} options={[
                  { value: 'en', label: 'English' },
                  { value: 'ta', label: 'தமிழ் (Tamil)' },
                  { value: 'hi', label: 'हिन्दी (Hindi)' },
                ]} />
              </FieldRow>
            </Section>
          </>
        )}


        {/* ════════════════ NOTIFICATIONS TAB ════════════════ */}
        {activeTab === 'notifications' && (
          <>
            <Section title={t('deliveryAlerts')} subtitle={t('realTimeOps')} icon={Bell}>
              <FieldRow label={t('deliveryCompleted')} description={t('notifyStopDelivered')}>
                <Toggle checked={notifyDeliveryComplete} onChange={(v) => { setNotifyDeliveryComplete(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('deliveryFailed')} description={t('alertAttemptFailed')}>
                <Toggle checked={notifyDeliveryFailed} onChange={(v) => { setNotifyDeliveryFailed(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('slaRisk')} description={t('warningMissWindow')}>
                <Toggle checked={notifySlaRisk} onChange={(v) => { setNotifySlaRisk(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('staffIdle')} description={t('flagNoMovement')}>
                <Toggle checked={notifyStaffIdle} onChange={(v) => { setNotifyStaffIdle(v); markChanged(); }} />
              </FieldRow>
            </Section>

            <Section title={t('inventoryFinance')} subtitle={t('stockPaymentAlerts')} icon={Package}>
              <FieldRow label={t('lowStockWarning')} description={t('alertBelowThreshold')}>
                <Toggle checked={notifyLowStock} onChange={(v) => { setNotifyLowStock(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('paymentOverdue')} description={t('notifyBalanceExceed')}>
                <Toggle checked={notifyPaymentOverdue} onChange={(v) => { setNotifyPaymentOverdue(v); markChanged(); }} />
              </FieldRow>
            </Section>

            <Section title={t('reportsChannels')} subtitle={t('howReceiveUpdates')} icon={Clock}>
              <FieldRow label={t('smsAlerts')} description={t('sendCriticalSms')}>
                <Toggle checked={smsAlerts} onChange={(v) => { setSmsAlerts(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('dailySummary')} description={t('automatedEodEmail')}>
                <Toggle checked={dailyReport} onChange={(v) => { setDailyReport(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('reportSendTime')}>
                <Select value={reportTime} onChange={(v) => { setReportTime(v); markChanged(); }} options={[
                  { value: '06:00 PM', label: '6:00 PM' },
                  { value: '08:00 PM', label: '8:00 PM' },
                  { value: '10:00 PM', label: '10:00 PM' },
                  { value: '06:00 AM', label: '6:00 AM (Next Day)' },
                ]} />
              </FieldRow>
            </Section>
          </>
        )}

        {/* ════════════════ ACCOUNT & SECURITY TAB ════════════════ */}
        {activeTab === 'account' && (
          <>
            <Section title={t('accountDetails')} icon={Users}>
              <FieldRow label={t('fullName')}>
                <Input value={currentUser.name} onChange={() => { }} disabled />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('role')}>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-500">{currentUser.role}</span>
                </div>
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('userId')}>
                <Input value={currentUser.id} onChange={() => { }} disabled />
              </FieldRow>
            </Section>

            <Section title={t('security')} subtitle={t('authSession')} icon={Shield}>
              <FieldRow label={t('twoFa')} description={t('requireOtp')}>
                <Toggle checked={twoFaEnabled} onChange={(v) => { setTwoFaEnabled(v); markChanged(); }} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('sessionTimeout')} description={t('autoLogout')}>
                <Select value={sessionTimeout} onChange={(v) => { setSessionTimeout(v); markChanged(); }} options={[
                  { value: '2', label: '2 hours' },
                  { value: '4', label: '4 hours' },
                  { value: '8', label: '8 hours' },
                  { value: '24', label: '24 hours' },
                ]} />
              </FieldRow>
              <div className="border-t border-gray-50" />
              <FieldRow label={t('dataRetention')} description={t('howLongLogsKept')}>
                <Select value={dataRetention} onChange={(v) => { setDataRetention(v); markChanged(); }} options={[
                  { value: '90', label: '90 days' },
                  { value: '180', label: '180 days' },
                  { value: '365', label: '1 year' },
                  { value: '730', label: '2 years' },
                ]} />
              </FieldRow>
            </Section>

            {/* Info Card */}
            <div className="rounded-2xl border border-purple-100 bg-purple-50/50 p-5 flex items-start gap-4">
              <Info className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-purple-900">{t('dataCompliance')}</p>
                <p className="text-xs text-purple-700 mt-1 leading-relaxed">
                  {t('encryptionNote')}
                </p>
              </div>
            </div>
          </>
        )}

        {/* ════════════════ USERS & ACCESS TAB ════════════════ */}
        {activeTab === 'users' && currentUser.role === 'ADMIN' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <UsersOverview stats={MOCK_STATS} />
            <RolesAndPrivileges />
            <InviteUserForm />
            <OnboardedStaffTable />
          </div>
        )}
      </div>

      {/* ─── Floating Save Bar ───────────────────────────────── */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-4 bg-gray-900 text-white rounded-2xl px-6 py-3.5 shadow-2xl shadow-gray-900/30">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-medium">{t('unsavedChanges')}</span>
            <button
              onClick={() => { setHasChanges(false); toast.info(t('changesDiscarded')); }}
              className="text-sm font-semibold text-gray-400 hover:text-white transition-colors"
            >
              {t('discard')}
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-white text-gray-900 rounded-xl px-4 py-2 text-sm font-bold hover:bg-gray-100 active:scale-95 transition-all"
            >
              <CheckCircle2 className="h-4 w-4" />
              {t('save')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
