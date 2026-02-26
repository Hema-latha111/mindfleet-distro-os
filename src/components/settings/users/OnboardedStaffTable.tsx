import { Calendar, Phone, User as UserIcon } from "lucide-react";
import { useStaffStore } from "@/store";
import { useTranslation } from "@/hooks/useTranslation";

const OnboardedStaffTable = () => {
    const { onboardingStaff } = useStaffStore();
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mt-6">
            <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/30">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-purple-600 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{t('recentlyOnboardedStaff')}</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">{t('onboardedStaffDesc')}</p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t('staffMember')}</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t('contact')}</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t('onboardingInfo')}</th>
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">{t('statusLabel')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {onboardingStaff.map((staff) => (
                            <tr key={staff.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                            <UserIcon className="h-4 w-4" />
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">{staff.name}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone className="h-3.5 w-3.5 text-gray-400" />
                                        <span className="text-xs font-medium">{staff.contact}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                            <span className="text-xs">{staff.onboardingDate}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${staff.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                        staff.status === 'In Training' ? 'bg-blue-100 text-blue-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                        {t(staff.status as any) || staff.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OnboardedStaffTable;
