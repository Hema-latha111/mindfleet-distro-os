import React from 'react';
import { Shield, Check, Minus } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Capability {
    name: string;
    admin: boolean;
    manager: boolean;
    staff: boolean;
}

const CAPABILITIES: Capability[] = [
    { name: 'View dashboard', admin: true, manager: true, staff: false },
    { name: 'Manage users/roles', admin: true, manager: false, staff: false },
    { name: 'Create/edit shops', admin: true, manager: true, staff: false },
    { name: 'Create/edit SKUs', admin: true, manager: true, staff: false },
    { name: 'Update inventory', admin: true, manager: true, staff: false },
    { name: 'Create dispatch plan', admin: true, manager: true, staff: false },
    { name: 'Approve dispatch', admin: true, manager: true, staff: false },
    { name: 'Override dispatch', admin: true, manager: true, staff: false },
    { name: 'View assigned route', admin: true, manager: true, staff: true },
    { name: 'Update delivery status', admin: true, manager: true, staff: true },
    { name: 'Create invoice', admin: true, manager: true, staff: false },
    { name: 'Record payment', admin: true, manager: true, staff: false },
    { name: 'View all invoices', admin: true, manager: true, staff: false },
    { name: 'View own delivery metrics', admin: true, manager: true, staff: true },
];

const RolesAndPrivileges = () => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0">
                        <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">{t('rolesPrivileges')}</h3>
                        <p className="text-[11px] text-gray-400 mt-0.5">{t('defineRoles')}</p>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                            <th className="px-6 py-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">{t('capability')}</th>
                            <th className="px-6 py-4 text-center">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-bold uppercase tracking-wider">{t('admin')}</span>
                            </th>
                            <th className="px-6 py-4 text-center">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold uppercase tracking-wider">{t('manager')}</span>
                            </th>
                            <th className="px-6 py-4 text-center">
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-bold uppercase tracking-wider">{t('staff')}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {CAPABILITIES.map((cap) => (
                            <tr key={cap.name} className="hover:bg-gray-50/30 transition-colors">
                                <td className="px-6 py-3.5">
                                    <span className="text-sm font-medium text-gray-700">{cap.name}</span>
                                </td>
                                <td className="px-6 py-3.5">
                                    <div className="flex justify-center">
                                        {cap.admin ? (
                                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                                <Check className="h-3 w-3 text-green-600 stroke-[3]" />
                                            </div>
                                        ) : (
                                            <Minus className="h-3 w-3 text-gray-200" />
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-3.5">
                                    <div className="flex justify-center">
                                        {cap.manager ? (
                                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                                <Check className="h-3 w-3 text-green-600 stroke-[3]" />
                                            </div>
                                        ) : (
                                            <Minus className="h-3 w-3 text-gray-200" />
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-3.5">
                                    <div className="flex justify-center">
                                        {cap.staff ? (
                                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                                                <Check className="h-3 w-3 text-green-600 stroke-[3]" />
                                            </div>
                                        ) : (
                                            <Minus className="h-3 w-3 text-gray-200" />
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{t('accessGranted')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Minus className="h-3 w-3 text-gray-300" />
                        <span className="text-[10px] font-bold text-gray-500 uppercase">{t('noAccess')}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolesAndPrivileges;
