import { LucideIcon } from 'lucide-react';
import { Package } from 'lucide-react';

interface Props {
    icon?: LucideIcon;
    title?: string;
    description?: string;
}

const EmptyState = ({ icon: Icon = Package, title = 'No data found', description = 'Try adjusting your search or filters.' }: Props) => (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-400">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50 border border-gray-100">
            <Icon className="h-8 w-8 opacity-40" />
        </div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-xs text-gray-400 text-center max-w-xs">{description}</p>
    </div>
);

export default EmptyState;
