import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    onSend: (text: string, attachments?: File[]) => void;
    disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: Props) => {
    const [input, setInput] = useState("");
    const { t } = useTranslation();

    const handleSend = () => {
        if (!input.trim() || disabled) return;
        onSend(input);
        setInput("");
    };

    const handleAttach = () => {
        toast.info(t('attachCsvTriggered'));
    };

    const chips = [
        { label: t('planDispatch'), value: t('planDispatch') },
        { label: t('showRisks'), value: t('showRisks') },
        { label: t('updateInventory'), value: t('updateInventory') },
        { label: t('genInvoices'), value: t('genInvoices') },
        { label: t('rebalanceRoutes'), value: t('rebalanceRoutes') }
    ];

    return (
        <div className="border-t border-purple-100 px-4 md:px-6 pb-4 md:pb-5 pt-3 space-y-3 shrink-0">
            {/* Quick Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {chips.map((chip) => (
                    <button
                        key={chip.value}
                        onClick={() => setInput(chip.value)}
                        disabled={disabled}
                        className="shrink-0 rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-[10px] font-medium text-purple-600 transition-all hover:bg-purple-100 hover:border-purple-400 disabled:opacity-50"
                    >
                        {chip.label}
                    </button>
                ))}
            </div>

            {/* Input */}
            <div className="flex items-center gap-3 rounded-2xl border border-purple-200 bg-purple-50/50 px-4 py-2.5 transition-all focus-within:border-purple-400 focus-within:bg-white focus-within:shadow-[0_0_16px_-4px_rgba(147,51,234,0.15)]">
                <button
                    onClick={handleAttach}
                    className="text-gray-400 hover:text-purple-600 transition-colors"
                    title={t('attachCsv')}
                >
                    <Paperclip className="h-4 w-4" />
                </button>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder={t('chatInputPlaceholder')}
                    className="flex-1 bg-transparent text-xs text-gray-700 placeholder:text-gray-400 outline-none"
                    disabled={disabled}
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim() || disabled}
                    className="flex h-8 w-8 items-center justify-center rounded-xl purple-gradient text-white transition-all hover:opacity-90 hover:shadow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                    <Send className="h-3.5 w-3.5" />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
