import { useState } from "react";
import { Upload, Check, AlertTriangle, FileText, ArrowRight, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onImport: (data: any[]) => void;
    type: 'Shops' | 'Inventory';
}

const STEPS = ['Upload', 'Map Columns', 'Validate', 'Commit'];

const CSVImportWizard = ({ isOpen, onClose, onImport, type }: Props) => {
    const [step, setStep] = useState(0);
    const [file, setFile] = useState<File | null>(null);
    const [mapping, setMapping] = useState<Record<string, string>>({});
    const [preview, setPreview] = useState<any[]>([]);
    const [errors, setErrors] = useState<string[]>([]);

    if (!isOpen) return null;

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            // Mock parsing
            setTimeout(() => {
                setPreview([
                    { Name: 'Shop A', Phone: '9999999999', Area: 'T. Nagar' },
                    { Name: 'Shop B', Phone: '8888888888', Area: 'Adyar' },
                    { Name: 'Shop C', Phone: '', Area: 'Anna Nagar' }, // Error case
                ]);
                setStep(1);
            }, 800);
        }
    };

    const handleCommit = () => {
        onImport(preview);
        toast.success(`Successfully imported ${preview.length} ${type}`);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="bg-gray-50 border-b border-gray-100 p-6 flex justify-between items-center">
                    <div className="min-w-0 flex-1 mr-4">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight truncate">{t('import')} {t(type.toLowerCase() as any)}</h2>
                        <div className="flex items-center gap-2 mt-2 overflow-x-auto scrollbar-hide pb-1">
                            {STEPS.map((s, i) => (
                                <div key={s} className="flex items-center shrink-0">
                                    <div className={`
                                h-5 w-5 sm:h-6 sm:w-6 rounded-full flex items-center justify-center text-[9px] sm:text-[10px] font-bold mr-1.5 sm:mr-2
                                ${step === i ? 'bg-purple-600 text-white shadow-lg shadow-purple-200' : step > i ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}
                            `}>
                                        {step > i ? <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" /> : i + 1}
                                    </div>
                                    <span className={`text-[9px] sm:text-xs font-black uppercase tracking-wider ${step === i ? 'text-purple-600' : 'text-gray-400'} ${i < STEPS.length - 1 ? 'mr-3 sm:mr-4' : ''}`}>
                                        {t(s.toLowerCase().replace(' ', '') as any)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg shrink-0">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 min-h-[300px]">
                    {step === 0 && (
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl h-64 flex flex-col items-center justify-center bg-gray-50 hover:bg-purple-50 hover:border-purple-200 transition-colors cursor-pointer relative">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} accept=".csv" />
                            <Upload className="h-10 w-10 text-gray-300 mb-4" />
                            <p className="font-bold text-gray-600">Click to upload CSV or drag and drop</p>
                            <p className="text-xs text-gray-400 mt-2">Max file size 5MB</p>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-500">Map columns from your CSV to system fields.</p>
                            <div className="grid grid-cols-2 gap-4">
                                {['Name', 'Phone', 'Area', 'GSTIN'].map(field => (
                                    <div key={field} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50">
                                        <span className="text-xs font-bold text-gray-700">{field}</span>
                                        <ArrowRight className="h-4 w-4 text-gray-300" />
                                        <select className="text-xs font-bold text-purple-600 bg-transparent outline-none">
                                            <option>{field}</option>
                                            <option>Ignore</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
                                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                                <div className="text-xs text-yellow-700">
                                    <strong>Validation Warning:</strong> 1 record has missing phone number.
                                </div>
                            </div>
                            <div className="border border-gray-100 rounded-xl overflow-hidden">
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-gray-50 font-bold text-gray-500">
                                        <tr>
                                            <th className="p-3">Name</th>
                                            <th className="p-3">Phone</th>
                                            <th className="p-3">Area</th>
                                            <th className="p-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {preview.map((row, i) => (
                                            <tr key={i}>
                                                <td className="p-3">{row.Name}</td>
                                                <td className="p-3">{row.Phone || <span className="text-red-400 italic">Missing</span>}</td>
                                                <td className="p-3">{row.Area}</td>
                                                <td className="p-3">
                                                    {row.Phone ? <Check className="h-4 w-4 text-green-500" /> : <X className="h-4 w-4 text-red-500" />}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2">
                                <FileText className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Ready to Import</h3>
                            <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                You are about to import <strong>{preview.length} {type}</strong>.
                                This action will create a draft for approval.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 border-t border-gray-100 p-6 flex justify-between gap-4">
                    <button
                        onClick={() => step > 0 && setStep(step - 1)}
                        disabled={step === 0}
                        className="px-6 py-2.5 rounded-xl text-xs font-black text-gray-400 uppercase tracking-widest disabled:opacity-30 hover:bg-gray-200 transition-all border border-transparent hover:border-gray-300"
                    >
                        {t('back')}
                    </button>
                    <button
                        onClick={() => step === 3 ? handleCommit() : setStep(step + 1)}
                        disabled={step === 0 && !file}
                        className="px-6 py-2.5 rounded-xl purple-gradient text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-purple-200 hover:opacity-90 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95"
                    >
                        {step === 3 ? t('confirmImport') : t('nextStep')}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default CSVImportWizard;
