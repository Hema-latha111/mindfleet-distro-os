import { useState } from "react";
import { X, AlertTriangle, Save, CheckCircle } from "lucide-react";
import { InventorySKU } from "@/store/types";
import { toast } from "sonner";

interface Props {
    sku: InventorySKU;
    onClose: () => void;
    onConfirm: (adjustment: number, reason: string, note: string) => void;
}

const REASONS = [
    "Damage / Spoilage",
    "Theft / Loss",
    "Found Inventory",
    "Correction",
    "Promotion / Sample"
];

const StockAdjustModal = ({ sku, onClose, onConfirm }: Props) => {
    const [adjustment, setAdjustment] = useState<number>(0);
    const [reason, setReason] = useState("");
    const [note, setNote] = useState("");

    const handleSubmit = () => {
        if (adjustment === 0) {
            toast.error("Adjustment amount cannot be zero");
            return;
        }
        if (!reason) {
            toast.error("Please select a reason");
            return;
        }
        if (sku.available + adjustment < 0) {
            toast.error("Adjustment cannot result in negative stock");
            return;
        }

        onConfirm(adjustment, reason, note);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-6 animate-in zoom-in-95 duration-200">

                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Adjust Stock</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Manual correction for <span className="font-bold text-gray-800">{sku.name}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Stock</p>
                        <p className="text-2xl font-black text-gray-900">{sku.available} <span className="text-xs font-bold text-gray-400">units</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">After</p>
                        <p className={`text-2xl font-black ${sku.available + adjustment < 0 ? 'text-red-500' : 'text-purple-600'}`}>
                            {sku.available + adjustment}
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Adjustment (+/-)</label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setAdjustment(prev => prev - 1)}
                                className="h-10 w-10 rounded-xl bg-gray-100 font-bold text-gray-600 hover:bg-gray-200 text-lg"
                            >-</button>
                            <input
                                type="number"
                                value={adjustment}
                                onChange={(e) => setAdjustment(parseInt(e.target.value) || 0)}
                                className="flex-1 h-10 rounded-xl border border-gray-200 text-center font-bold text-gray-900 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none"
                            />
                            <button
                                onClick={() => setAdjustment(prev => prev + 1)}
                                className="h-10 w-10 rounded-xl bg-gray-100 font-bold text-gray-600 hover:bg-gray-200 text-lg"
                            >+</button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Reason Code</label>
                        <div className="grid grid-cols-2 gap-2">
                            {REASONS.map(r => (
                                <button
                                    key={r}
                                    onClick={() => setReason(r)}
                                    className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${reason === r
                                            ? 'border-purple-600 bg-purple-50 text-purple-700'
                                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Note (Optional)</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Add details..."
                            className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-100 outline-none resize-none h-20"
                        />
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                        CANCEL
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={adjustment === 0 || !reason}
                        className="flex-[2] py-3 rounded-xl purple-gradient font-bold text-white shadow-lg shadow-purple-200 hover:opacity-90 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                        <Save className="h-4 w-4" /> CREATE ADJUSTMENT DRAFT
                    </button>
                </div>

            </div>
        </div>
    );
};

export default StockAdjustModal;
