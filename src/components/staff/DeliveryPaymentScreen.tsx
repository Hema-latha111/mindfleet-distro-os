import { useState, useRef, useMemo } from "react";
import {
    Camera, ChevronDown, ChevronUp, CheckCircle, AlertCircle,
    Package, IndianRupee, MapPin, Clock, Smartphone
} from "lucide-react";
import { toast } from "sonner";

// ─── Types ───────────────────────────────────────────────────────────
interface OrderItem {
    name: string;
    qty: number;
    unitPrice: number;
}

interface DeliveryPaymentProps {
    shopName: string;
    shopAddress: string;
    stopId: string;
    staffId: string;
    items: OrderItem[];
    expectedAmount: number;
    currentGps: { lat: number; lng: number };
    onComplete: (data: {
        amountReceived: number;
        balance: number;
        proofImage: string;
        reason: string;
        gps: { lat: number; lng: number };
        timestamp: string;
        deviceId: string;
    }) => void;
    onCancel: () => void;
    t: any;
}

// ─── Mock order items for demo ───────────────────────────────────────
export const MOCK_ORDER_ITEMS: OrderItem[] = [
    { name: "Aavin Full Cream Milk 500ml", qty: 10, unitPrice: 28 },
    { name: "Aavin Curd 400g", qty: 6, unitPrice: 35 },
    { name: "Aavin Butter 100g", qty: 4, unitPrice: 55 },
    { name: "Aavin Paneer 200g", qty: 3, unitPrice: 90 },
    { name: "Aavin Lassi 200ml", qty: 8, unitPrice: 25 },
    { name: "Aavin Ghee 500ml", qty: 2, unitPrice: 275 },
    { name: "Aavin Buttermilk 200ml", qty: 12, unitPrice: 15 },
];

const BALANCE_REASONS = [
    "Partial Payment",
    "Shop Credit",
    "No Change",
    "Payment Later",
    "Other",
];

// ─── Component ───────────────────────────────────────────────────────
const DeliveryPaymentScreen = ({
    shopName,
    shopAddress,
    stopId,
    staffId,
    items,
    expectedAmount,
    currentGps,
    onComplete,
    onCancel,
    t,
}: DeliveryPaymentProps) => {
    const [itemsExpanded, setItemsExpanded] = useState(false);
    const [amountReceived, setAmountReceived] = useState("");
    const [proofImage, setProofImage] = useState<string | null>(null);
    const [reason, setReason] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [isConfirming, setIsConfirming] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // ─── Calculations ────────────────────────────────────────────────
    const subtotal = useMemo(() =>
        items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0)
        , [items]);

    const totalItems = useMemo(() =>
        items.reduce((sum, item) => sum + item.qty, 0)
        , [items]);

    const receivedNum = parseFloat(amountReceived) || 0;
    const balance = expectedAmount - receivedNum;
    const needsReason = balance > 0 && receivedNum > 0;

    // ─── Handlers ────────────────────────────────────────────────────
    const handleAmountChange = (val: string) => {
        // Only allow numbers and decimal
        const cleaned = val.replace(/[^0-9.]/g, "");
        setAmountReceived(cleaned);
        setErrors(prev => prev.filter(e => e !== "amount"));
    };

    const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setProofImage(ev.target?.result as string);
                setErrors(prev => prev.filter(e => e !== "proof"));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConfirm = () => {
        const newErrors: string[] = [];

        if (!proofImage) newErrors.push("proof");
        if (!amountReceived || receivedNum <= 0) newErrors.push("amount");
        if (needsReason && !reason) newErrors.push("reason");

        if (newErrors.length > 0) {
            setErrors(newErrors);
            toast.error(t('completeRequiredFields') || "Please complete required fields.");
            return;
        }

        setIsConfirming(true);

        // Simulate save delay
        setTimeout(() => {
            onComplete({
                amountReceived: receivedNum,
                balance,
                proofImage: proofImage!,
                reason: reason || t('fullPayment') || "Full Payment",
                gps: currentGps,
                timestamp: new Date().toISOString(),
                deviceId: `DEV_${navigator.userAgent.slice(-8)}`,
            });
        }, 800);
    };

    const handleQuickFill = () => {
        setAmountReceived(expectedAmount.toString());
        setErrors(prev => prev.filter(e => e !== "amount"));
    };

    // ─── Render ──────────────────────────────────────────────────────
    return (
        <div className="space-y-4">
            {/* ─── HEADER ──────────────────────────────────────────── */}
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100">
                <div className="h-10 w-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-black text-gray-900 truncate">{shopName}</h2>
                    <p className="text-[10px] text-gray-400 truncate">{shopAddress}</p>
                </div>
            </div>

            {/* ─── ORDER SUMMARY ───────────────────────────────────── */}
            <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                <button
                    onClick={() => setItemsExpanded(!itemsExpanded)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-100 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">📦 {t('orderSummary')}</span>
                        <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                            {totalItems} {t('items')}
                        </span>
                    </div>
                    {itemsExpanded
                        ? <ChevronUp className="h-4 w-4 text-gray-400" />
                        : <ChevronDown className="h-4 w-4 text-gray-400" />
                    }
                </button>

                {/* Expandable item list */}
                {itemsExpanded && (
                    <div className="px-4 pb-4 space-y-1 border-t border-gray-100 pt-3 animate-in slide-in-from-top duration-200">
                        {items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-dashed border-gray-200 last:border-0">
                                <div className="flex-1 min-w-0">
                                    <span className="text-gray-700 font-medium truncate block">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-3 flex-shrink-0 text-right">
                                    <span className="text-gray-400 text-xs">×{item.qty}</span>
                                    <span className="text-gray-900 font-bold w-16 text-right">₹{(item.qty * item.unitPrice).toLocaleString()}</span>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-between pt-2 border-t border-gray-300 mt-2">
                            <span className="text-sm font-bold text-gray-600">{t('subtotal')}</span>
                            <span className="text-sm font-black text-gray-900">₹{subtotal.toLocaleString()}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* ─── EXPECTED AMOUNT ─────────────────────────────────── */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100">
                <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-1">{t('expectedAmountLabel')}</p>
                <p className="text-3xl font-black text-gray-900">₹{expectedAmount.toLocaleString()}</p>
            </div>

            {/* ─── AMOUNT RECEIVED ─────────────────────────────────── */}
            <div className={`rounded-2xl p-4 border-2 transition-colors ${errors.includes("amount") ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                }`}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t('amountReceivedLabel')}</p>
                <div className="flex items-center gap-3">
                    <div className="flex items-center flex-1 bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                        <span className="pl-3 text-gray-400 font-bold">₹</span>
                        <input
                            type="number"
                            inputMode="numeric"
                            placeholder="0"
                            value={amountReceived}
                            onChange={e => handleAmountChange(e.target.value)}
                            className="flex-1 p-3 bg-transparent text-2xl font-black text-gray-900 outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                    </div>
                    <button
                        onClick={handleQuickFill}
                        className="px-3 py-2 bg-green-100 text-green-700 rounded-xl text-[10px] font-black uppercase tracking-wider hover:bg-green-200 active:scale-95 transition-all flex-shrink-0"
                    >
                        {t('exact')}
                    </button>
                </div>
                {errors.includes("amount") && (
                    <p className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" /> {t('enterAmountReceived')}
                    </p>
                )}
            </div>

            {/* ─── BALANCE ────────────────────────────────────────── */}
            {amountReceived && (
                <div className={`rounded-2xl p-4 border ${balance === 0 ? "bg-green-50 border-green-200" :
                    balance > 0 ? "bg-amber-50 border-amber-200" :
                        "bg-blue-50 border-blue-200"
                    }`}>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t('balanceLabel')}</p>
                    <div className="flex items-center justify-between">
                        <p className={`text-2xl font-black ${balance === 0 ? "text-green-600" :
                            balance > 0 ? "text-amber-600" :
                                "text-blue-600"
                            }`}>
                            {balance === 0 ? `₹0 — ${t('settled')} ✓` : `₹${Math.abs(balance).toLocaleString()} ${balance > 0 ? t('pending') : t('overpaid')}`}
                        </p>
                    </div>
                </div>
            )}

            {/* ─── REASON (IF BALANCE > 0) ────────────────────────── */}
            {needsReason && (
                <div className={`rounded-2xl p-4 border-2 transition-colors ${errors.includes("reason") ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                    }`}>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t('reasonForBalance')}</p>
                    <div className="grid grid-cols-2 gap-2">
                        {BALANCE_REASONS.map(r => (
                            <button
                                key={r}
                                onClick={() => { setReason(r); setErrors(prev => prev.filter(e => e !== "reason")); }}
                                className={`p-2.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${reason === r
                                    ? "border-amber-500 bg-amber-50 text-amber-700 ring-2 ring-amber-100"
                                    : "border-gray-200 bg-white text-gray-600 hover:border-amber-200"
                                    }`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    {errors.includes("reason") && (
                        <p className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" /> {t('selectReasonBalance')}
                        </p>
                    )}
                </div>
            )}

            {/* ─── PROOF IMAGE ────────────────────────────────────── */}
            <div className={`rounded-2xl p-4 border-2 transition-colors ${errors.includes("proof") ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                }`}>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">{t('proofImageLabel')}</p>

                {!proofImage ? (
                    <div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={handleCameraCapture}
                            className="hidden"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full py-4 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center gap-2 hover:border-purple-400 hover:bg-purple-50 active:scale-[0.98] transition-all"
                        >
                            <Camera className="h-8 w-8 text-gray-400" />
                            <span className="text-xs font-bold text-gray-500">📷 {t('capturePhoto')}</span>
                            <span className="text-[10px] text-gray-400">{t('cameraOnly')}</span>
                        </button>
                        {errors.includes("proof") && (
                            <p className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" /> {t('proofRequired')}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="relative">
                        <img
                            src={proofImage}
                            alt="Proof"
                            className="w-full h-32 object-cover rounded-xl border border-gray-200"
                        />
                        <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                            <CheckCircle className="h-4 w-4" />
                        </div>
                        <button
                            onClick={() => { setProofImage(null); }}
                            className="mt-2 text-xs font-bold text-gray-400 hover:text-red-500"
                        >
                            {t('retakePhoto')}
                        </button>
                        {/* Auto-attached metadata */}
                        <div className="mt-2 flex flex-wrap gap-2">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-[9px] font-bold text-gray-500">
                                <MapPin className="h-2.5 w-2.5" /> {currentGps.lat.toFixed(4)}°, {currentGps.lng.toFixed(4)}°
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-[9px] font-bold text-gray-500">
                                <Clock className="h-2.5 w-2.5" /> {new Date().toLocaleTimeString()}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-100 text-[9px] font-bold text-gray-500">
                                <Smartphone className="h-2.5 w-2.5" /> Device
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* ─── ACTION BUTTONS ─────────────────────────────────── */}
            <div className="flex gap-3 pt-2 pb-4">
                <button
                    onClick={onCancel}
                    className="flex-1 py-4 text-gray-500 font-bold text-sm rounded-2xl border border-gray-200 hover:bg-gray-50 active:scale-95 transition-all"
                >
                    {t('cancel')}
                </button>
                <button
                    onClick={handleConfirm}
                    disabled={isConfirming}
                    className={`flex-[2] py-4 rounded-2xl text-sm font-black shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${isConfirming
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600 shadow-green-200"
                        }`}
                >
                    {isConfirming ? (
                        <>
                            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {t('confirming')}
                        </>
                    ) : (
                        <>
                            <CheckCircle className="h-5 w-5" />
                            {t('confirmDelivery')}
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default DeliveryPaymentScreen;
