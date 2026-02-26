import { User, Clock } from "lucide-react";

interface JournalEntry {
    id: string;
    type: string; // 'PLANNED' | 'APPROVED' | 'OVERRIDDEN' | 'SHOP_REASSIGNED'; but using string for flexibility with store types
    timestamp: string;
    actor: string; // performedBy
    reason: string;
    diff?: { before: any; after: any };
}

interface Props {
    journal: JournalEntry[];
    onOpenDiff: (entryId: string) => void;
}

const DecisionJournalTimeline = ({ journal, onOpenDiff }: Props) => {
    if (journal.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 space-y-2 py-20">
                <Clock className="h-10 w-10 opacity-20" />
                <p className="text-sm font-medium">No overrides recorded for this plan</p>
            </div>
        );
    }

    return (
        <div className="relative border-l-2 border-purple-100 pl-6 space-y-10">
            {[...journal].reverse().map((event) => (
                <div key={event.id} className="relative group">
                    {/* Dot */}
                    <div className="absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full bg-purple-600 ring-4 ring-white" />

                    <div className="space-y-3">
                        <div className="flex items-start justify-between">
                            <div className="space-y-0.5">
                                <p className="text-sm font-bold text-gray-900">{event.type}</p>
                                <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest">
                                    {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full bg-gray-50 px-2 py-1 text-[10px] font-bold text-gray-500 border border-gray-100">
                                <User className="h-2.5 w-2.5" /> {event.actor.split(' ')[0]}
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-3">
                            <p className="text-xs text-gray-600 leading-relaxed italic">"{event.reason}"</p>
                        </div>

                        {/* Detail Preview */}
                        {event.diff && (
                            <div
                                onClick={() => onOpenDiff(event.id)}
                                className="flex items-center gap-4 text-xs cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors border border-transparent hover:border-gray-100"
                            >
                                <div className="flex flex-col max-w-[45%]">
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Before</span>
                                    <div className="text-red-500 font-bold truncate">{JSON.stringify(event.diff.before)}</div>
                                </div>
                                <div className="h-4 w-px bg-gray-200" />
                                <div className="flex flex-col max-w-[45%]">
                                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">After</span>
                                    <div className="text-green-600 font-bold truncate">{JSON.stringify(event.diff.after)}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DecisionJournalTimeline;
