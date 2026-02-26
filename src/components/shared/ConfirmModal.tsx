import { AlertTriangle } from 'lucide-react';

interface Props {
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    onCancel: () => void;
    variant?: 'danger' | 'default';
}

const ConfirmModal = ({ open, title, description, onConfirm, onCancel, variant = 'default' }: Props) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
            <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl mb-4 ${variant === 'danger' ? 'bg-red-100' : 'bg-purple-100'
                        }`}>
                        <AlertTriangle className={`h-6 w-6 ${variant === 'danger' ? 'text-red-600' : 'text-purple-600'}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
                <div className="flex gap-3 border-t border-gray-100 px-6 py-4">
                    <button
                        onClick={onCancel}
                        className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { onConfirm(); onCancel(); }}
                        className={`flex-1 rounded-xl py-2.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-md ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600 hover:bg-purple-700'
                            }`}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
