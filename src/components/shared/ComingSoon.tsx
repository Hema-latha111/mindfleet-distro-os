import { ArrowLeft, Construction } from "lucide-react";
import { useSettingsStore } from "@/store";
import { toast } from "sonner";

export const ComingSoon = () => {
    const { updateSettings } = useSettingsStore();

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-fade-in">
            <div className="h-20 w-20 rounded-3xl bg-purple-50 flex items-center justify-center mb-6">
                <Construction className="h-10 w-10 text-purple-600" />
            </div>
            <h1 className="text-2xl font-black text-purple-600 tracking-tight mb-2">
                Coming Soon
            </h1>
            <p className="text-gray-500 max-w-sm mb-8">
                We are currently working on the Hindi version of the platform. Please check back later for updates.
            </p>
            <button
                onClick={() => {
                    updateSettings({ language: 'en' });
                    toast.success("Switched back to English");
                }}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-200 transition-all active:scale-95"
            >
                <ArrowLeft className="h-4 w-4" />
                Switch back
            </button>
        </div>
    );
};
