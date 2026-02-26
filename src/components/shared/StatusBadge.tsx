import { useTranslation } from '@/hooks/useTranslation';
import type { DraftStatus, InvoiceStatus, DispatchPlanStatus } from '../../store/types';

type Status = DraftStatus | InvoiceStatus | DispatchPlanStatus | 'Active' | 'On Leave' | 'Inactive' | 'Low Stock' | 'In Stock' | 'PENDING' | 'DELIVERED' | 'FAILED' | 'SKIPPED';

const statusConfig: Record<string, { labelKey: string; className: string }> = {
    DRAFT: { labelKey: 'DRAFT', className: 'bg-gray-100 text-gray-600 border-gray-200' },
    APPROVED: { labelKey: 'APPROVED', className: 'bg-green-100 text-green-700 border-green-200' },
    PLANNED: { labelKey: 'PLANNED', className: 'bg-blue-100 text-blue-700 border-blue-200' },
    IN_PROGRESS: { labelKey: 'IN_PROGRESS', className: 'bg-purple-100 text-purple-700 border-purple-200' },
    COMPLETED: { labelKey: 'COMPLETED', className: 'bg-green-100 text-green-700 border-green-200' },
    REJECTED: { labelKey: 'REJECTED', className: 'bg-red-100 text-red-600 border-red-200' },
    EXECUTED: { labelKey: 'EXECUTED', className: 'bg-gray-100 text-gray-500 border-gray-200' },
    SENT: { labelKey: 'SENT', className: 'bg-blue-100 text-blue-700 border-blue-200' },
    PARTIAL: { labelKey: 'PARTIAL', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    PAID: { labelKey: 'PAID', className: 'bg-green-100 text-green-700 border-green-200' },
    Active: { labelKey: 'ACTIVE', className: 'bg-green-100 text-green-700 border-green-200' },
    'On Leave': { labelKey: 'ON_LEAVE', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    Inactive: { labelKey: 'INACTIVE', className: 'bg-gray-100 text-gray-500 border-gray-200' },
    'Low Stock': { labelKey: 'LOW_STOCK', className: 'bg-red-100 text-red-600 border-red-200' },
    'In Stock': { labelKey: 'IN_STOCK', className: 'bg-green-100 text-green-700 border-green-200' },
    PENDING: { labelKey: 'PENDING', className: 'bg-gray-100 text-gray-500 border-gray-200' },
    DELIVERED: { labelKey: 'DELIVERED', className: 'bg-green-100 text-green-700 border-green-200' },
    FAILED: { labelKey: 'FAILED', className: 'bg-red-100 text-red-600 border-red-200' },
    SKIPPED: { labelKey: 'SKIPPED', className: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
};

interface Props {
    status: string; // Relaxed type to allow any string
    size?: 'xs' | 'sm' | 'md' | 'lg';
}

const StatusBadge = ({ status, size = 'sm' }: Props) => {
    const { t } = useTranslation();
    const config = statusConfig[status] || { labelKey: status, className: 'bg-gray-100 text-gray-600 border-gray-200' };

    let textSize = 'text-[10px]';
    if (size === 'xs') textSize = 'text-[9px] px-1.5 py-0';
    if (size === 'md') textSize = 'text-xs px-2.5 py-0.5';
    if (size === 'lg') textSize = 'text-sm px-3 py-1';

    return (
        <span className={`inline-flex items-center rounded-full border font-semibold whitespace-nowrap ${textSize} ${config.className}`}>
            {t(config.labelKey as any)}
        </span>
    );
};

export default StatusBadge;
