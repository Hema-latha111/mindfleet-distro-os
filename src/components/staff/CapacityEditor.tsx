import { useState } from "react";
import { X, Save, Package } from "lucide-react";
import { Staff } from "@/store/types";
import { toast } from "sonner";
import { useDraftStore, useUserStore } from "@/store";
import { createDraftFromAI } from "@/data/generators";

interface Props {
    staff: Staff;
    onClose: () => void;
}

const CapacityEditor = ({ staff, onClose }: Props) => {
    const [capacity, setCapacity] = useState(staff.capacity);
    const { addDraft } = useDraftStore();
    const { currentUser } = useUserStore();

    const handleSave = () => {
        const draft = createDraftFromAI('STAFF_UPDATE', currentUser.name);
        draft.description = `Update ${staff.name}: Capacity ${staff.capacity} -> ${capacity}`;
        draft.payload = { staffId: staff.id, capacity };

        addDraft(draft);
        toast.success("Staff update draft created");
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl p-6 space-y-6 animate-in zoom-in-95 duration-200">

                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">Edit Capacity</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Update settings for <span className="font-bold text-gray-800">{staff.name}</span>
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Capacity Slider */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-xs font-bold text-gray-700 uppercase tracking-wide flex items-center gap-1">
                                <Package className="h-3 w-3" /> Max Stops
                            </label>
                            <span className="text-lg font-black text-purple-600">{capacity}</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="80"
                            value={capacity}
                            onChange={(e) => setCapacity(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1">
                            <span>10 Stops</span>
                            <span>80 Stops</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                        CANCEL
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-[2] py-3 rounded-xl purple-gradient font-bold text-white shadow-lg shadow-purple-200 hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        <Save className="h-4 w-4" /> SAVE CHANGES
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CapacityEditor;
