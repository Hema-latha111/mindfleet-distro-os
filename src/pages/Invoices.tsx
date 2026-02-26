import { useState, useMemo } from "react";
import {
  FileText, Search, Filter, IndianRupee, Download,
  CreditCard, Clock, CheckCircle, AlertTriangle, Sparkles,
  Calendar, MoreVertical, ChevronRight, TrendingUp, ArrowUpRight, ShieldCheck, Wallet
} from "lucide-react";
import { useInvoiceStore, useUserStore } from "@/store";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import MobileInvoiceList from "@/components/invoices/MobileInvoiceList";
import { toast } from "sonner";
import { useTranslation } from "@/hooks/useTranslation";

const Invoices = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null);
  const [paymentModal, setPaymentModal] = useState({ open: false, invoiceId: "" });

  const { invoices } = useInvoiceStore();
  const { currentUser } = useUserStore();
  const { t } = useTranslation();

  const filtered = useMemo(() => {
    return invoices.filter(i => {
      const matchSearch = i.id.toLowerCase().includes(search.toLowerCase()) ||
        i.shopName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "All" || i.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [invoices, search, statusFilter]);

  const stats = useMemo(() => {
    const total = invoices.reduce((acc, inv) => acc + inv.total, 0);
    const paid = invoices.reduce((acc, inv) => acc + inv.paid, 0);
    const outstanding = invoices.reduce((acc, inv) => acc + inv.outstanding, 0);
    const overdue = invoices.filter(inv => inv.status !== 'PAID' && inv.outstanding > 0).length;
    return { total, paid, outstanding, overdue };
  }, [invoices]);

  const selectedInvoiceData = selectedInvoice ? invoices.find(i => i.id === selectedInvoice) : null;

  if (selectedInvoiceData) {
    return (
      <div className="space-y-6 animate-fade-in pb-20">
        <button
          onClick={() => setSelectedInvoice(null)}
          className="flex items-center gap-1.5 text-xs font-black text-gray-400 uppercase tracking-widest hover:text-purple-600 transition-colors"
        >
          ← {t('backToInvoiceList')}
        </button>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 shrink-0">
              <FileText className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">{t('invoice')} #{selectedInvoiceData.id}</h2>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <span className="text-purple-600 font-black">{selectedInvoiceData.shopName}</span>
                <span>•</span>
                <span>{selectedInvoiceData.createdAt}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <StatusBadge status={selectedInvoiceData.status} size="md" />
            <button className="flex h-10 items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 text-xs font-black text-gray-600 uppercase tracking-widest shadow-sm hover:bg-gray-50 transition-all shrink-0">
              <Download className="h-4 w-4 text-gray-400" /> {t('pdf')}
            </button>
            {selectedInvoiceData.status !== 'PAID' && (
              <button
                onClick={() => {
                  setPaymentModal({ open: true, invoiceId: selectedInvoiceData.id });
                }}
                className="h-10 rounded-xl purple-gradient px-4 text-xs font-black text-white uppercase tracking-widest shadow-lg shadow-purple-100 hover:opacity-90 active:scale-95 transition-all shrink-0"
              >
                {t('recordPayment')}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
              <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('itemizedBreakdown')}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-50 text-left">
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('skuName')}</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">{t('qty')}</th>
                      <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">{t('total')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {selectedInvoiceData.items.map((item, i) => (
                      <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-gray-900 font-black uppercase tracking-tight text-xs">{item.skuName}</td>
                        <td className="px-6 py-4 text-center text-gray-600 font-mono text-xs">{item.qty}</td>
                        <td className="px-6 py-4 text-right text-gray-900 font-black font-mono text-xs">₹{item.line_total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-purple-50/50">
                      <td colSpan={2} className="px-6 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('grandTotal')}</td>
                      <td className="px-6 py-6 text-right text-xl font-black text-purple-700 font-mono">₹{selectedInvoiceData.total.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="rounded-3xl border border-purple-100 bg-purple-50/30 p-6 ai-glow">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-2xl bg-white shadow-sm flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-purple-900 uppercase tracking-widest">{t('invoiceInsights')}</h4>
                  <p className="text-[9px] font-bold text-purple-400 uppercase tracking-widest">AI Generated Advice</p>
                </div>
              </div>
              <p className="text-xs text-purple-800 leading-relaxed font-medium">
                {t('invoiceAutoGenerated')}
                {" "}{t('ownerPrefersDigital')}
                <span className="block mt-2 font-black text-purple-600 underline cursor-pointer uppercase tracking-widest text-[10px]">{t('viewDispatchEvidence')} →</span>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6">{t('paymentSummary')}</h3>
              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('totalAmount')}</span>
                  <span className="text-sm font-black text-gray-900 font-mono">₹{selectedInvoiceData.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t('paidAmount')}</span>
                  <span className="text-sm font-black text-green-600 font-mono">₹{selectedInvoiceData.paid.toLocaleString()}</span>
                </div>
                <div className="h-px bg-gray-50" />
                <div className="flex justify-between items-center pt-2">
                  <div>
                    <span className="text-[10px] font-black text-red-400 uppercase tracking-widest block mb-1">{t('outstanding')}</span>
                    <span className="text-2xl font-black text-red-600 font-mono">₹{selectedInvoiceData.outstanding.toLocaleString()}</span>
                  </div>
                  {selectedInvoiceData.status !== 'PAID' && (
                    <div className="h-12 w-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
                      <Clock className="h-6 w-6" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Verification</h3>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-2xl border border-green-100">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-[10px] font-black text-green-900 uppercase tracking-tight">E-Invoice Validated</p>
                  <p className="text-[8px] font-bold text-green-600 uppercase tracking-widest">Digital Audit Logged</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {paymentModal.open && (
          <PaymentModal
            invoice={selectedInvoiceData}
            onClose={() => setPaymentModal({ open: false, invoiceId: "" })}
            t={t}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">{t('invoicesAndPayments')}</h1>
          <p className="text-sm text-gray-500 font-medium">
            {t('managingInvoices', { count: invoices.length })} · ₹{(stats.outstanding / 100000).toFixed(1)}L {t('outstanding')}
          </p>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <button className="flex h-10 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-[10px] font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest shrink-0">
            <Download className="h-4 w-4 text-gray-400" /> {t('reports')}
          </button>
          <button className="flex h-10 items-center gap-2 rounded-xl purple-gradient px-4 text-[10px] font-black text-white shadow-lg shadow-purple-100 hover:opacity-90 transition-all uppercase tracking-widest shrink-0">
            <Sparkles className="h-4 w-4" /> {t('generateBatch')}
          </button>
        </div>
      </div>

      {/* Mobile-Only Dashboard */}
      <div className="grid grid-cols-2 gap-3 md:hidden">
        <div className="p-4 bg-purple-600 rounded-3xl shadow-xl shadow-purple-100 flex flex-col justify-between h-36 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 bg-white/10 h-28 w-28 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
          <div className="flex items-center justify-between relative z-10">
            <div className="h-8 w-8 rounded-xl bg-white/20 flex items-center justify-center text-white">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="text-[9px] font-black text-white bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-widest">Real-time</span>
          </div>
          <div>
            <p className="text-[9px] font-bold text-purple-100 uppercase tracking-widest mb-1">{t('momRevenue')}</p>
            <h4 className="text-2xl font-black text-white font-mono">₹24.5L</h4>
          </div>
        </div>

        <div className="p-4 bg-white border border-purple-100 rounded-3xl flex flex-col justify-between h-36 hover:border-purple-300 transition-colors shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-8 w-8 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
              <Wallet className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 text-[9px] font-black text-red-500 uppercase tracking-widest bg-red-50 px-2 py-1 rounded-full">
              <AlertTriangle className="h-2.5 w-2.5" /> {t('overdue')}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t('outstandingBalance')}</p>
            <h4 className="text-2xl font-black text-gray-900 font-mono">₹8.2L</h4>
          </div>
        </div>
      </div>

      {/* Desktop Stat Cards */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {[
          { label: t('totalRevenue'), value: "₹24.5L", icon: IndianRupee, color: "text-purple-600", bg: "bg-purple-50" },
          { label: t('paid'), value: "₹16.3L", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
          { label: t('outstanding'), value: "₹8.2L", icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-50" },
          { label: t('overdue'), value: "14", icon: Clock, color: "text-red-500", bg: "bg-red-50" },
        ].map(item => (
          <div key={item.label} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:border-purple-200 transition-colors group">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.bg} ${item.color} mb-3 group-hover:scale-110 transition-transform`}>
              <item.icon className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
            <p className="text-2xl font-black text-gray-900 leading-none mt-1 font-mono">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Desktop Tab Switcher & Search (Desktop Only style modified) */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 h-12 flex-1 hover:border-purple-300 transition-all focus-within:border-purple-400 focus-within:shadow-lg focus-within:shadow-purple-50">
          <Search className="h-4 w-4 text-gray-400 shrink-0" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={t('searchInvoice')}
            className="flex-1 bg-transparent text-sm text-gray-700 font-medium placeholder:text-gray-400 outline-none"
          />
        </div>
        <div className="flex rounded-2xl border border-gray-200 bg-white p-1 overflow-x-auto scrollbar-hide shrink-0">
          {["All", "DRAFT", "SENT", "PARTIAL", "PAID"].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 h-10 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest whitespace-nowrap ${statusFilter === s ? 'purple-gradient text-white shadow-md shadow-purple-100' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'}`}
            >
              {s === 'All' ? t('allInvoices') : s}
            </button>
          ))}
        </div>
      </div>

      {/* View Logic: Table on Desktop, Cards on Mobile */}
      <div className="hidden md:block rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-purple-100">
          <table className="w-full text-sm min-w-[800px] md:min-w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50 text-left">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest w-24">{t('invoiceId')}</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest flex-1">{t('shopDetails')}</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest w-32">{t('total')}</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest w-32">{t('paid')}</th>
                <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest w-32">{t('outstanding')}</th>
                <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest w-32">{t('status')}</th>
                <th className="px-6 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((inv) => (
                <tr
                  key={inv.id}
                  onClick={() => setSelectedInvoice(inv.id)}
                  className="hover:bg-purple-50/30 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-5 text-purple-600 font-black font-mono">#{inv.id}</td>
                  <td className="px-6 py-5">
                    <p className="font-black text-gray-900 uppercase tracking-tight line-clamp-1">{inv.shopName}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">ID: {inv.shopId}</p>
                  </td>
                  <td className="px-6 py-5 text-right font-black text-gray-900 font-mono">₹{inv.total.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right font-black text-green-600 font-mono">₹{inv.paid.toLocaleString()}</td>
                  <td className="px-6 py-5 text-right font-black text-red-500 font-mono">₹{inv.outstanding.toLocaleString()}</td>
                  <td className="px-6 py-5 text-center">
                    <StatusBadge status={inv.status} />
                  </td>
                  <td className="px-6 py-5 text-center">
                    <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-purple-400 group-hover:translate-x-1 transition-all mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <EmptyState icon={FileText} title={t('noInvoicesFound')} />
          </div>
        )}
      </div>

      <MobileInvoiceList invoices={filtered} onSelect={setSelectedInvoice} />

      {paymentModal.open && (
        <PaymentModal
          invoice={invoices.find(i => i.id === paymentModal.invoiceId)!}
          onClose={() => setPaymentModal({ open: false, invoiceId: "" })}
          t={t}
        />
      )}
    </div>
  );
};

const PaymentModal = ({ invoice, onClose, t }: { invoice: any, onClose: () => void, t: any }) => {
  const [amount, setAmount] = useState(invoice.outstanding);
  const [method, setMethod] = useState("Cash");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount > invoice.outstanding) {
      toast.error("Amount cannot exceed outstanding balance!");
      return;
    }
    toast.success(`Payment of ₹${amount} recorded via ${method} for ${invoice.shopName}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
            <CreditCard className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">{t('recordPayment')}</h2>
            <p className="text-xs text-gray-500">Inv #{invoice.id} · {invoice.shopName}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">{t('paymentMethod')}</label>
            <div className="grid grid-cols-3 gap-2">
              {["Cash", "UPI", "Bank"].map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMethod(m)}
                  className={`py-3 rounded-xl border text-xs font-bold transition-all ${method === m ? 'border-purple-600 bg-purple-50 text-purple-600' : 'border-gray-100 bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">{t('amount')} ({t('outstanding')} ₹{invoice.outstanding.toLocaleString()})</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-gray-400 font-bold">₹</span>
              <input
                type="number"
                max={invoice.outstanding}
                className="w-full h-12 rounded-xl border border-gray-100 bg-gray-50 pl-8 pr-4 text-sm font-bold outline-none focus:border-purple-400 focus:bg-white"
                value={amount}
                onChange={e => setAmount(Number(e.target.value))}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 h-12 rounded-xl border border-gray-100 text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all font-black uppercase tracking-widest"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            className="flex-1 h-12 rounded-xl purple-gradient text-sm font-bold text-white shadow-lg shadow-purple-200 transition-all hover:opacity-90 active:scale-95 font-black uppercase tracking-widest"
          >
            {t('confirm')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Invoices;
