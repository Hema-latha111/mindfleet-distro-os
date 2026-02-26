import { useState } from 'react';
import { X, Tag } from 'lucide-react';
import { useTranslation } from "@/hooks/useTranslation";

const REASON_TAGS = [
    'CAPACITY',
    'PRIORITY',
    'SHOP_REQUEST',
    'STAFF_ISSUE',
    'OTHER'
];

interface Props {
    open: boolean;
    title: string;
    onSubmit: (reason: string) => void;
    onCancel: () => void;
}

const ReasonTagModal = ({ open, title, onSubmit, onCancel }: Props) => {
    const [selected, setSelected] = useState('');
    const [custom, setCustom] = useState('');
    const { t } = useTranslation();

    if (!open) return null;

    const handleSubmit = () => {
        const reason = selected === 'Other' ? custom : selected;
        if (!reason.trim()) return;
        onSubmit(reason);
        setSelected('');
        setCustom('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-purple-600" />
                        <h3 className="font-semibold text-gray-900">{title}</h3>
                    </div>
                    <button onClick={onCancel} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors">
                        <X className="h-4 w-4" />
                    </button>
                </div>
                <div className="p-6">
                    <p className="text-sm text-gray-600 mb-4">{t('selectReasonTag')}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                        {REASON_TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelected(tag)}
                                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${selected === tag
                                    ? 'border-purple-500 bg-purple-600 text-white shadow-sm'
                                    : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700'
                                    }`}
                            >
                                {t(tag as any) || tag}
                            </button>
                        ))}
                    </div>
                    {selected === 'Other' && (
                        <textarea
                            value={custom}
                            onChange={e => setCustom(e.target.value)}
                            placeholder="Describe the reason..."
                            className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-100 resize-none"
                            rows={3}
                        />
                    )}
                </div>
                <div className="flex gap-3 border-t border-gray-100 px-6 py-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                    >
                        {t('cancelAction')}
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!selected || (selected === 'Other' && !custom.trim())}
                        className="flex-1 rounded-xl bg-purple-600 py-2.5 text-sm font-medium text-white transition-all hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t('confirmAction')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReasonTagModal;
