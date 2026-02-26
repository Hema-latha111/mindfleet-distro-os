import { useRef, useState, useEffect } from "react";
import { Users, Phone, MapPin } from "lucide-react";
import { Staff, DispatchPlan } from "@/store/types";
import StatusBadge from "@/components/shared/StatusBadge";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    staff: Staff[];
    selectedStaffId: string | null;
    onSelect: (id: string) => void;
    plan: DispatchPlan;
}

const StaffList = ({ staff, selectedStaffId, onSelect, plan }: Props) => {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                setScrollTop(containerRef.current.scrollTop);
            }
        };
        const node = containerRef.current;
        if (node) {
            node.addEventListener('scroll', handleScroll);
            return () => node.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const rowHeight = 145; // Approx card height + gap
    const totalHeight = staff.length * rowHeight;

    // Simple virtualization logic
    const containerHeight = 600;
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - 2);
    const endIndex = Math.min(staff.length - 1, Math.floor((scrollTop + containerHeight) / rowHeight) + 2);

    const visibleItems = [];
    for (let i = startIndex; i <= endIndex; i++) {
        visibleItems.push({ index: i, data: staff[i] });
    }

    return (
        <div
            ref={containerRef}
            className="h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-purple-100 relative"
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                {visibleItems.map(({ index, data: s }) => {
                    const assignment = plan.assignments.find(a => a.staffId === s.id);
                    const shopCount = assignment?.shopIds.length || 0;
                    const utilization = Math.round((shopCount / s.capacity) * 100);

                    return (
                        <div
                            key={s.id}
                            style={{
                                position: 'absolute',
                                top: index * rowHeight,
                                left: 0,
                                width: '100%',
                                height: '135px',
                            }}
                        >
                            <div
                                onClick={() => onSelect(s.id)}
                                className={`rounded-2xl border p-5 cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 h-full flex flex-col justify-between ${selectedStaffId === s.id
                                    ? 'border-purple-400 bg-purple-50/50 shadow-lg shadow-purple-100/50'
                                    : 'border-purple-50 bg-white hover:border-purple-200 shadow-sm'
                                    }`}
                            >
                                <div className="flex items-start gap-4 flex-1">
                                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white text-xl font-black shrink-0 shadow-lg transition-transform group-hover:scale-105 ${s.status !== 'Active' ? 'bg-gray-200' : 'purple-gradient shadow-purple-200'}`}>
                                        {s.name[0]}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <p className="font-black text-gray-900 text-base tracking-tight">{s.name}</p>
                                            <StatusBadge status={s.status} size="xs" />
                                            {s.risk && <span className="rounded-full bg-red-100 px-2 py-0.5 text-[9px] font-black text-red-600 uppercase tracking-widest animate-pulse">Risk</span>}
                                        </div>

                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-purple-400" />{s.phone}</span>
                                            <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3 text-purple-400" />{s.distance}</span>
                                        </div>
                                    </div>

                                    <div className="hidden sm:flex flex-col items-end shrink-0">
                                        <p className="text-xl font-black text-gray-900 leading-none">{shopCount}</p>
                                        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t('shops')}</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-purple-100/50 flex items-center justify-between">
                                    <div className="flex-1 max-w-[150px]">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{t('performance')}</span>
                                            <span className="text-[9px] font-black text-purple-600">{s.performance}%</span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                            <div
                                                className="h-full rounded-full purple-gradient transition-all duration-1000"
                                                style={{ width: `${s.performance}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="text-right">
                                            <div className="flex items-center gap-1.5 mb-1 justify-end">
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Util.</span>
                                                <span className={`text-[9px] font-black ${utilization > 90 ? 'text-red-500' : 'text-purple-600'}`}>{utilization}%</span>
                                            </div>
                                            <div className="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full transition-all duration-1000 ${utilization > 90 ? 'bg-red-500' : 'purple-gradient'}`}
                                                    style={{ width: `${Math.min(100, utilization)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StaffList;
