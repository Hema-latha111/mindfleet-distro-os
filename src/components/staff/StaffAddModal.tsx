import { useState } from "react";
import { X, UserPlus, Phone, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useDraftStore, useUserStore, useStaffStore } from "@/store";
import { createDraftFromAI } from "@/data/generators";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    onClose: () => void;
}

const StaffAddModal = ({ onClose }: Props) => {
    const { addDraft } = useDraftStore();
    const { currentUser } = useUserStore();
    const { addOnboardingStaff } = useStaffStore();
    const { t } = useTranslation();

    const PHASE_KEYS = ['COMPLETED', 'inTraining', 'backgroundCheck'] as const;
    const PHASE_VALUES = ['Completed', 'In Training', 'Background Check'] as const;
    type PhaseValue = typeof PHASE_VALUES[number];

    const [form, setForm] = useState({
        name: '',
        phone: '',
        status: 'Background Check' as string
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.phone) {
            toast.error(t('fillRequiredFields'));
            return;
        }

        // Create the draft for internal decision tracking
        const draft = createDraftFromAI('ADD_STAFF', currentUser.name);
        draft.title = `${t('onboardPrefix')} ${form.name}`;
        draft.description = `${t('pendingOnboardingFor')} ${form.name} — ${t('phaseLabel')} ${form.status}`;
        draft.payload = { ...form };

        addDraft(draft);

        // Add to onboarding list for settings
        addOnboardingStaff({
            id: `ob_${Date.now()}`,
            name: form.name,
            contact: form.phone,
            onboardingDate: new Date().toISOString().split('T')[0],
            status: form.status as "Completed" | "In Training" | "Background Check"
        });

        toast.success(`${t('onboardingDraftCreated')} ${form.name}`, {
            description: t('approveInJournalToCommit')
        });

        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            <form
                onSubmit={handleSubmit}
                className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="purple-gradient p-6 text-white relative">
                    <Sparkles className="absolute top-4 right-4 h-12 w-12 opacity-10" />
                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight">{t('addNewStaff')}</h2>
                            <p className="text-purple-100 text-sm mt-1 opacity-90 font-medium">{t('registerNewPartner')}</p>
                        </div>
                        <button
                            type="button"
                            onClick={onClose}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 pl-1">
                            <UserPlus className="h-3 w-3 text-purple-500" /> {t('fullName')}
                        </label>
                        <input
                            autoFocus
                            type="text"
                            required
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all placeholder:text-gray-300"
                            placeholder={t('fullNamePlaceholder')}
                        />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 pl-1">
                            <Phone className="h-3 w-3 text-purple-500" /> WhatsApp / {t('phone')}
                        </label>
                        <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={e => setForm({ ...form, phone: e.target.value })}
                            className="w-full rounded-2xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all placeholder:text-gray-300"
                            placeholder="+91 XXXXX XXXXX"
                        />
                    </div>

                    {/* Status Scenario Selector */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5 pl-1">
                            <Sparkles className="h-3 w-3 text-purple-500" /> {t('onboardingPhase')}
                        </label>
                        <select
                            value={form.status}
                            onChange={e => setForm({ ...form, status: e.target.value })}
                            className="w-full rounded-2xl border border-gray-100 bg-purple-50/50 px-4 py-3 text-sm font-bold text-purple-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/5 outline-none transition-all cursor-pointer"
                        >
                            {PHASE_VALUES.map((p, i) => <option key={p} value={p}>{t(PHASE_KEYS[i] as any) || p}</option>)}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-gray-400 hover:bg-gray-50 transition-all border border-transparent"
                        >
                            {t('discard')}
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] py-4 rounded-2xl purple-gradient font-black text-[10px] uppercase tracking-widest text-white shadow-xl shadow-purple-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                            {t('createOnboardingDraft')}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default StaffAddModal;
