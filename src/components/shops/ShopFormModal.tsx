import { useState } from "react";
import { X, Store, MapPin, Phone, CreditCard } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

const ShopFormModal = ({ isOpen, onClose, onSubmit }: Props) => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        area: "",
        address: "",
        phone: "",
        creditLimit: "50000",
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden border border-purple-100 animate-slide-up">
                <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-purple-50/50">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-white shadow-sm flex items-center justify-center text-purple-600">
                            <Store className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black text-gray-900 leading-tight uppercase tracking-tight">{t('addShop')}</h2>
                            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest leading-none mt-1">NEW PARTNER ONBOARDING</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="h-10 w-10 rounded-xl hover:bg-white hover:shadow-sm transition-all flex items-center justify-center text-gray-400">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-8 space-y-6">
                    <div className="space-y-4">
                        {/* Shop Name */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <Store className="h-3 w-3" /> SHOP NAME
                            </label>
                            <input
                                required
                                type="text"
                                placeholder="e.g. Annai Supermarket"
                                className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-medium focus:outline-none focus:border-purple-300 focus:bg-white transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        {/* Area & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <MapPin className="h-3 w-3" /> AREA / LOCATION
                                </label>
                                <input
                                    required
                                    type="text"
                                    placeholder="e.g. Adyar"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-medium focus:outline-none focus:border-purple-300 focus:bg-white transition-all"
                                    value={formData.area}
                                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Phone className="h-3 w-3" /> PHONE NUMBER
                                </label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="+91 XXXXX XXXXX"
                                    className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-medium focus:outline-none focus:border-purple-300 focus:bg-white transition-all"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Full Address */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                FULL STREET ADDRESS
                            </label>
                            <textarea
                                required
                                rows={2}
                                placeholder="Enter complete building & street details"
                                className="w-full p-4 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-medium focus:outline-none focus:border-purple-300 focus:bg-white transition-all resize-none"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            />
                        </div>

                        {/* Credit Limit */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                <CreditCard className="h-3 w-3" /> CREDIT LIMIT (₹)
                            </label>
                            <input
                                type="number"
                                className="w-full h-12 px-4 rounded-xl border border-gray-100 bg-gray-50/50 text-sm font-medium focus:outline-none focus:border-purple-300 focus:bg-white transition-all"
                                value={formData.creditLimit}
                                onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 h-12 rounded-2xl border border-gray-100 text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all uppercase tracking-widest"
                        >
                            CANCEL
                        </button>
                        <button
                            type="submit"
                            className="flex-[2] h-12 rounded-2xl purple-gradient text-xs font-bold text-white shadow-lg shadow-purple-200 hover:opacity-90 transition-all uppercase tracking-widest active:scale-[0.98]"
                        >
                            CREATE SHOP DRAFT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShopFormModal;
