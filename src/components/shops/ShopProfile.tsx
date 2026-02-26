import { Store, MapPin, Phone, History, Clock, FileText, TrendingUp, Edit2, AlertTriangle, Save, X, Calendar } from "lucide-react";
import { Shop } from "@/store/types";
import { useState } from "react";
import StatusBadge from "@/components/shared/StatusBadge";
import { toast } from "sonner";
import { useDraftStore } from "@/store";
import { createDraftFromAI } from "@/data/generators";

const ShopProfile = ({ shop, onClose }: { shop: Shop; onClose: () => void }) => {
    const [editingCadence, setEditingCadence] = useState(false);
    const [cadence, setCadence] = useState(shop.preferredDays || ["Mon", "Wed", "Fri"]);
    const { addDraft } = useDraftStore();

    const handleSaveCadence = () => {
        // In real app, this would trigger an AI draft for approval since it affects dispatch
        const draft = createDraftFromAI('CADENCE_CHANGE', 'Admin');
        draft.description = `Update delivery cadence for ${shop.name} to ${cadence.join(', ')}`;
        draft.payload = { shopId: shop.id, newCadence: cadence };
        addDraft(draft);
        toast.success("Cadence update draft created for approval");
        setEditingCadence(false);
    };

    return (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-100 p-6 flex justify-between items-start">
                <div className="flex gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <Store className="h-8 w-8" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">{shop.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="flex items-center gap-1 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                <MapPin className="h-3 w-3" /> {shop.area}
                            </span>
                            <span className="h-1 w-1 bg-gray-300 rounded-full" />
                            <span className="flex items-center gap-1 text-xs font-bold text-gray-500 uppercase tracking-wide">
                                <Phone className="h-3 w-3" /> +91 98765 43210
                            </span>
                        </div>
                        {!shop.lat && (
                            <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg w-fit animate-pulse">
                                <AlertTriangle className="h-3 w-3" /> GEO-COORDINATES MISSING - FIX REQUIRED
                            </div>
                        )}
                    </div>
                </div>
                <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                    <X className="h-6 w-6" />
                </button>
            </div>

            <div className="p-6 space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Outstanding</p>
                        <p className="text-xl font-black text-gray-900">₹{shop.balance.toLocaleString()}</p>
                        <div className="h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                            <div className={`h-full ${shop.balance > shop.creditLimit * 0.8 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${(shop.balance / shop.creditLimit) * 100}%` }} />
                        </div>
                        <p className="text-[9px] text-gray-400 mt-1 text-right">Limit: ₹{shop.creditLimit / 1000}k</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Avg. Order</p>
                        <p className="text-xl font-black text-gray-900">₹12,450</p>
                        <p className="text-[10px] text-green-600 font-bold flex items-center gap-1 mt-1">
                            <TrendingUp className="h-3 w-3" /> +12% vs last month
                        </p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Frequency</p>
                        <p className="text-xl font-black text-gray-900">3 / week</p>
                        <p className="text-[10px] text-gray-400 mt-1">Mon, Wed, Fri</p>
                    </div>
                </div>

                {/* Cadence Editor */}
                <div className="rounded-3xl border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-purple-600" /> Delivery Cadence
                        </h3>
                        {!editingCadence ? (
                            <button onClick={() => setEditingCadence(true)} className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                                <Edit2 className="h-3 w-3" /> EDIT
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button onClick={() => setEditingCadence(false)} className="text-xs font-bold text-gray-400 hover:text-gray-600">CANCEL</button>
                                <button onClick={handleSaveCadence} className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1">
                                    <Save className="h-3 w-3" /> REQUEST CHANGE
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <p className="text-xs text-gray-500 mb-4">Preferred delivery days affect AI dispatch planning. Changes require approval.</p>
                        <div className="flex gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                <button
                                    key={day}
                                    disabled={!editingCadence}
                                    onClick={() => {
                                        if (cadence.includes(day)) setCadence(cadence.filter(d => d !== day));
                                        else setCadence([...cadence, day]);
                                    }}
                                    className={`h-10 w-10 rounded-xl text-xs font-bold transition-all ${cadence.includes(day)
                                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                        } ${!editingCadence && 'opacity-60 cursor-not-allowed'}`}
                                >
                                    {day[0]}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Timeline / History */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <History className="h-4 w-4 text-gray-400" /> Recent Activity
                    </h3>
                    <div className="relative border-l-2 border-gray-100 pl-6 space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="relative">
                                <div className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-gray-200 ring-4 ring-white" />
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-bold text-gray-900">Delivery Completed</p>
                                        <p className="text-xs text-gray-500">24 Items • Invoice #INV-2024-00{890 - i}</p>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Yesterday</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Invoices Preview */}
                <div className="rounded-3xl border border-gray-100 bg-gray-50/30 p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" /> Recent Invoices
                        </h3>
                        <button className="text-[10px] font-black text-purple-600 uppercase tracking-widest hover:underline">VIEW ALL</button>
                    </div>
                    <div className="space-y-3">
                        {[1, 2].map((_, i) => (
                            <div key={i} className="bg-white p-3 rounded-xl border border-gray-100 flex justify-between items-center shadow-sm">
                                <div className="text-xs">
                                    <p className="font-bold text-gray-900">#INV-00{921 - i}</p>
                                    <p className="text-gray-400">12 Oct 2025</p>
                                </div>
                                <StatusBadge status={i === 0 ? 'PENDING' : 'DELIVERED'} size="sm" />
                                <p className="text-sm font-black text-gray-900">₹{i === 0 ? '4,200' : '12,500'}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ShopProfile;
