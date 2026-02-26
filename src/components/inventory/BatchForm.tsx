import { useState } from "react";
import { X, Calendar, User, Truck, Package, Save } from "lucide-react";
import { toast } from "sonner";
import { InventoryBatch } from "@/store/types";

interface Props {
    skuId: string;
    onClose: () => void;
    onSubmit: (batchPayload: Partial<InventoryBatch>) => void;
}

const BatchForm = ({ skuId, onClose, onSubmit }: Props) => {
    // Mocking batch creation draft
    const [batch, setBatch] = useState<Partial<InventoryBatch>>({
        quantity: 100,
        receivedDate: new Date().toISOString().split('T')[0],
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        batchId: `B-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`
    });

    const handleSubmit = () => {
        if (!batch.quantity || batch.quantity <= 0) {
            toast.error("Quantity must be greater than 0");
            return;
        }
        if (!batch.receivedDate) {
            toast.error("Received date is required");
            return;
        }

        onSubmit(batch);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-6 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Receive New Batch</h2>
                        <p className="text-sm text-gray-500 mt-1">Add inventory for SKU: <span className="font-mono text-gray-800">{skuId}</span></p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Batch ID</label>
                        <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-100 rounded-xl font-mono text-gray-900 font-bold">
                            <Package className="h-4 w-4 text-gray-400" />
                            {batch.batchId}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Quantity</label>
                            <input
                                type="number"
                                value={batch.quantity}
                                onChange={(e) => setBatch({ ...batch, quantity: parseInt(e.target.value) || 0 })}
                                className="w-full h-10 px-3 rounded-xl border border-gray-200 font-bold text-gray-900 focus:border-purple-500 outline-none transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Unit Price</label>
                            <input
                                type="number"
                                placeholder="Auto"
                                disabled
                                className="w-full h-10 px-3 rounded-xl border border-gray-100 bg-gray-50 font-bold text-gray-400 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Received Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="date"
                                    value={batch.receivedDate}
                                    onChange={(e) => setBatch({ ...batch, receivedDate: e.target.value })}
                                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 font-medium text-gray-700 focus:border-purple-500 outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Expiry Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <input
                                    type="date"
                                    value={batch.expiryDate}
                                    onChange={(e) => setBatch({ ...batch, expiryDate: e.target.value })}
                                    className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 font-medium text-gray-700 focus:border-purple-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Vendor / Supplier</label>
                        <div className="relative">
                            <Truck className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <select className="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-purple-500 appearance-none">
                                <option>Aavin Dairy Co-op</option>
                                <option>Hatsun Agro</option>
                                <option>Local Supplier A</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-50">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                        CANCEL
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-[2] py-3 rounded-xl bg-gray-900 font-bold text-white shadow-lg hover:bg-gray-800 disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                        <Save className="h-4 w-4" /> CONFIRM RECEIPT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BatchForm;
