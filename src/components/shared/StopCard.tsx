import { MapPin, CheckCircle, XCircle, Navigation, Package, Timer, MessageSquare, Camera } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
    stop: any;
    index: number;
    status: 'pending' | 'arrived' | 'done' | 'failed';
    onStatusChange: (status: 'pending' | 'arrived' | 'done' | 'failed') => void;
}

const StopCard = ({ stop, index, status, onStatusChange }: Props) => {
    const [showNotes, setShowNotes] = useState(false);
    const [failedReason, setFailedReason] = useState("");
    const isDone = status === 'done' || status === 'failed';

    const handleFailed = () => {
        if (!failedReason) {
            toast.error("Please provide a reason for failure");
            setShowNotes(true);
            return;
        }
        onStatusChange('failed');
        toast.error(`Delivery failed for ${stop.name}: ${failedReason}`);
    };

    return (
        <div
            className={`rounded-3xl border transition-all ${status === 'arrived'
                ? 'border-purple-300 bg-white shadow-xl scale-[1.01] ring-4 ring-purple-100'
                : isDone
                    ? 'border-gray-100 bg-gray-50 opacity-60'
                    : 'border-gray-100 bg-white shadow-sm'
                }`}
        >
            <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-2xl flex items-center justify-center text-sm font-black ${status === 'arrived' ? 'bg-purple-600 text-white' :
                            isDone ? 'bg-gray-200 text-gray-400' : 'bg-gray-50 text-gray-400'
                            }`}>
                            {index + 1}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 leading-tight">{stop.name}</h3>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                                <MapPin className="h-2.5 w-2.5" /> {stop.area} · 150m
                            </div>
                        </div>
                    </div>
                    {isDone && <StatusBadge status={status === 'done' ? 'DELIVERED' : 'FAILED'} />}
                </div>

                {!isDone ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-3">
                            <div className="flex items-center gap-2">
                                <Package className="h-3.5 w-3.5 text-blue-500" />
                                <span className="text-xs font-bold text-gray-700">12 Items</span>
                            </div>
                            <div className="h-4 w-px bg-gray-200" />
                            <div className="flex items-center gap-2">
                                <Timer className="h-3.5 w-3.5 text-purple-500" />
                                <span className="text-xs font-bold text-gray-700">8m Avg</span>
                            </div>
                        </div>

                        {status === 'pending' ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => onStatusChange('arrived')}
                                    className="flex-1 h-12 rounded-2xl bg-purple-600 text-white font-bold text-sm shadow-md active:scale-95 transition-all"
                                >
                                    ARRIVED
                                </button>
                                <button className="h-12 w-12 rounded-2xl border border-gray-100 bg-white flex items-center justify-center text-gray-400 font-black">
                                    <Navigation className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => {
                                            onStatusChange('done');
                                            toast.success(`Delivery success for ${stop.name}`);
                                        }}
                                        className="h-12 rounded-2xl bg-green-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
                                    >
                                        <CheckCircle className="h-4 w-4" /> DELIVERED
                                    </button>
                                    <button
                                        onClick={handleFailed}
                                        className="h-12 rounded-2xl bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all"
                                    >
                                        <XCircle className="h-4 w-4" /> FAILED
                                    </button>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setShowNotes(!showNotes)}
                                        className={`flex-1 h-12 rounded-2xl border transition-all flex items-center justify-center gap-2 text-xs font-bold ${showNotes ? 'border-purple-600 bg-purple-50 text-purple-600' : 'border-gray-100 bg-white text-gray-500'}`}
                                    >
                                        <MessageSquare className="h-4 w-4" /> {showNotes ? 'HIDE REASON/NOTES' : 'ADD REASON/NOTES'}
                                    </button>
                                    <button className="h-12 w-12 rounded-2xl border border-gray-100 bg-white flex items-center justify-center text-gray-400">
                                        <Camera className="h-5 w-5" />
                                    </button>
                                </div>

                                {showNotes && (
                                    <div className="space-y-2 animate-in slide-in-from-top-2">
                                        <select
                                            className="w-full h-10 rounded-xl border border-gray-100 bg-gray-50 px-3 text-xs font-bold outline-none focus:border-purple-300"
                                            value={failedReason}
                                            onChange={(e) => setFailedReason(e.target.value)}
                                        >
                                            <option value="">Select Reason (Required for Failure)</option>
                                            <option value="Shop Closed">Shop Closed</option>
                                            <option value="Payment Issue">Payment Issue</option>
                                            <option value="Rejected Items">Rejected Items</option>
                                            <option value="No Parking">No Parking</option>
                                            <option value="Other">Other (Type below)</option>
                                        </select>
                                        <textarea
                                            placeholder="Additional notes..."
                                            className="w-full h-20 rounded-xl border border-purple-100 bg-purple-50/30 p-3 text-xs outline-none focus:ring-2 ring-purple-100"
                                            onChange={(e) => { if (failedReason === "Other") setFailedReason(e.target.value) }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">
                        <span>Completed at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <button onClick={() => onStatusChange('pending')} className="text-purple-600 hover:underline">UNDO</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StopCard;
