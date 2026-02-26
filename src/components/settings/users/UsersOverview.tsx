import { Users, UserCheck, UserPlus, UserX } from "lucide-react";

interface Props {
    stats: {
        total: number;
        active: number;
        pending: number;
        disabled: number;
    };
}

const UsersOverview = ({ stats }: Props) => {
    const cards = [
        { label: "Total Users", value: stats.total, icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Active", value: stats.active, icon: UserCheck, color: "text-purple-500", bg: "bg-purple-50/50" },
        { label: "Pending Invites", value: stats.pending, icon: UserPlus, color: "text-purple-400", bg: "bg-purple-50/30" },
        { label: "Disabled", value: stats.disabled, icon: UserX, color: "text-purple-700", bg: "bg-purple-100/50" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map((card) => (
                <div key={card.label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                    <div className={`h-10 w-10 rounded-xl ${card.bg} ${card.color} flex items-center justify-center mb-3`}>
                        <card.icon className="h-5 w-5" />
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{card.label}</p>
                    <p className="text-2xl font-black text-gray-900 mt-1">{card.value}</p>
                </div>
            ))}
        </div>
    );
};

export default UsersOverview;
