import { AlertTriangle, X, ArrowRight } from "lucide-react";
import { useState } from "react";

interface Props {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    severity?: 'warning' | 'destructive';
}

const RiskBanner = ({ title, description, actionLabel, onAction, severity = 'warning' }: Props) => {
    const [closed, setClosed] = useState(false);

    if (closed) return null;

    return (
        <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 px-4 py-3 rounded-2xl border mb-6 animate-in slide-in-from-top-4 duration-500 ${severity === 'destructive'
                ? 'bg-red-50 border-red-100 text-red-900 shadow-[0_8px_16px_-6px_rgba(239,68,68,0.1)]'
                : 'bg-yellow-50 border-yellow-100 text-yellow-900 shadow-[0_8px_16px_-6px_rgba(234,179,8,0.1)]'
            }`}>
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${severity === 'destructive' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                }`}>
                <AlertTriangle className="h-4 w-4" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-tight">{title}</p>
                <p className="text-xs opacity-70 mt-0.5">{description}</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-black/5">
                {actionLabel && (
                    <button
                        onClick={onAction}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all focus:ring-2 ${severity === 'destructive'
                                ? 'bg-red-600 text-white hover:bg-red-700 ring-red-200'
                                : 'bg-yellow-600 text-white hover:bg-yellow-700 ring-yellow-200'
                            }`}
                    >
                        {actionLabel} <ArrowRight className="h-3 w-3" />
                    </button>
                )}
                <button
                    onClick={() => setClosed(true)}
                    className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-black/5 transition-colors"
                >
                    <X className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
};

export default RiskBanner;
