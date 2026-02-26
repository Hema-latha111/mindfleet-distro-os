import { InventoryBatch } from "@/store/types";
import { VirtualizedTable } from "@/components/shared/VirtualizedTable";
import { History } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    batches: InventoryBatch[];
}

const InventoryLedger = ({ batches }: Props) => {
    const { t } = useTranslation();

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                    <History className="h-4 w-4 text-purple-600" />
                    <h2 className="text-lg font-bold text-gray-900">{t('fifoBatchLedger')}</h2>
                </div>
                <button className="text-[10px] font-black text-purple-600 uppercase tracking-widest hover:underline text-left sm:text-right">{t('downloadFullLedger') || 'Download full ledger'}</button>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm">
                <div className="overflow-x-auto scrollbar-hide">
                    <VirtualizedTable
                        items={batches}
                        height={400}
                        rowHeight={60}
                        header={
                            <div className="flex items-center px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50/50 border-b border-gray-100 min-w-[500px]">
                                <div className="w-32">{t('batchId')}</div>
                                <div className="flex-1 text-right pr-10">{t('quantity')}</div>
                                <div className="w-40">{t('expiryDate')}</div>
                                <div className="w-32 text-right">{t('unitPriceLabel')}</div>
                            </div>
                        }
                        renderRow={(batch) => {
                            const expiry = new Date(batch.expiryDate);
                            const isExpiring = (expiry.getTime() - new Date(2025, 1, 1).getTime()) < (7 * 86400000); // Mock current date
                            return (
                                <div className="flex items-center px-6 h-full border-b border-gray-50 hover:bg-gray-50/50 transition-colors min-w-[500px]">
                                    <div className="w-32 font-mono text-[10px] font-bold text-gray-500 truncate">{batch.batchId}</div>
                                    <div className="flex-1 text-right pr-10 font-black text-gray-900">{batch.quantity} <span className="text-[9px] text-gray-400 font-bold uppercase">{t('units')}</span></div>
                                    <div className="w-40 text-xs">
                                        <span className={`font-bold ${isExpiring ? 'text-red-500' : 'text-gray-600'}`}>
                                            {batch.expiryDate}
                                            {isExpiring && <span className="ml-2 text-[9px] bg-red-50 px-1.5 py-0.5 rounded-full uppercase tracking-tighter">SOON</span>}
                                        </span>
                                    </div>
                                    <div className="w-32 text-right font-bold text-gray-900">₹{batch.unitPrice}</div>
                                </div>
                            );
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default InventoryLedger;
