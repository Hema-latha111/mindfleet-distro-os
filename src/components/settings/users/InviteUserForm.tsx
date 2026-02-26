import { useState } from "react";
import { UserPlus, Mail, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

const InviteUserForm = () => {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("STAFF");
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error(t('emailRequired'));
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error(t('invalidEmail'));
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        toast.success(t('inviteSentSuccess'), {
            description: `${t('inviteSentDesc').replace('{{email}}', email).replace('{{role}}', role)}`
        });
        setEmail("");
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center">
                        <UserPlus className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">{t('inviteNewUser')}</h3>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="email"
                            placeholder={t('emailPlaceholder')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                        />
                    </div>

                    <div className="w-full md:w-48 relative">
                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled={isLoading}
                            className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all appearance-none cursor-pointer"
                        >
                            <option value="MANAGER">{t('manager')}</option>
                            <option value="STAFF">{t('staff')}</option>
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Loader2 className={`h-4 w-4 text-gray-400 animate-spin ${isLoading ? 'opacity-100' : 'opacity-0'}`} />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !email}
                        className="px-6 py-2.5 purple-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-purple-200 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            t('sendInvite')
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InviteUserForm;
