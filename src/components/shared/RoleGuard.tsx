import type { UserRole } from '../../store/types';
import { useUserStore } from '../../store';
import { ShieldOff } from 'lucide-react';

interface Props {
    allowedRoles: UserRole[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

const RoleGuard = ({ allowedRoles, children, fallback }: Props) => {
    const { currentUser } = useUserStore();
    if (!allowedRoles.includes(currentUser.role)) {
        return fallback ? (
            <>{fallback}</>
        ) : (
            <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
                <ShieldOff className="h-12 w-12 opacity-30" />
                <p className="text-sm font-medium">Access Restricted</p>
                <p className="text-xs text-gray-400">You don't have permission to view this section.</p>
            </div>
        );
    }
    return <>{children}</>;
};

export default RoleGuard;
