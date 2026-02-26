import { ChevronRight, IndianRupee, MapPin, Calendar, FileText, ArrowUpRight } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    invoices: any[];
    onSelect: (id: string) => void;
}

const MobileInvoiceList = ({ invoices, onSelect }: Props) => {
    const { t } = useTranslation();

    return (
        <div className="space-y-4 md:hidden">
            {invoices.map((inv) => (
                <div
                    key={inv.id}
                    onClick={() => onSelect(inv.id)}
                    className="relative p-5 rounded-3xl border border-gray-100 bg-white shadow-sm transition-all active:scale-[0.98] active:bg-gray-50 group overflow-hidden"
                >
                    {/* Background accent for certain statuses */}
                    {inv.status === 'PAID' && <div className="absolute top-0 right-0 w-32 h-32 bg-green-50/30 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />}
                    {inv.outstanding > 10000 && inv.status !== 'PAID' && <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/30 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />}

                    {/* Top Row: Invoice ID & Status */}
                    <div className="flex items-center justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                                <FileText className="h-4 w-4" />
                            </div>
                            <span className="text-xs font-black text-purple-600 uppercase tracking-tight">#{inv.id}</span>
                        </div>
                        <StatusBadge status={inv.status} size="sm" />
                    </div>

                    {/* Shop Details */}
                    <div className="mb-5 relative z-10">
                        <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight line-clamp-1 mb-1.5 group-hover:text-purple-700 transition-colors">
                            {inv.shopName}
                        </h3>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <Calendar className="h-3 w-3 text-gray-300" />
                            <span>Issued: {inv.createdAt}</span>
                        </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50/50 relative z-10">
                        <div>
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Total Amount</p>
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-[10px] font-black text-gray-400">₹</span>
                                <span className="text-sm font-black text-gray-900 font-mono">{inv.total.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Outstanding</p>
                            <div className="flex items-baseline gap-0.5 justify-end">
                                <span className="text-[10px] font-black text-red-400">₹</span>
                                <span className={`text-sm font-black font-mono ${inv.outstanding > 0 ? 'text-red-500' : 'text-green-600'}`}>
                                    {inv.outstanding.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Hint */}
                    <div className="mt-4 flex items-center justify-between relative z-10">
                        <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Tap to view breakdown & record payment</p>
                        <div className="h-6 w-6 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                            <ChevronRight className="h-3.5 w-3.5" />
                        </div>
                    </div>
                </div>
            ))}

            {invoices.length === 0 && (
                <div className="py-12 text-center text-gray-400 italic text-sm font-medium border-2 border-dashed border-gray-100 rounded-3xl">
                    No invoices found.
                </div>
            )}
        </div>
    );
};

export default MobileInvoiceList;
