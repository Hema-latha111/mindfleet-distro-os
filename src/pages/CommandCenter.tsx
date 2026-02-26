import { useChatStore, useDraftStore, useUserStore } from "@/store";
import { useSearchParams } from "react-router-dom";
import ChatThread from "@/components/command-center/ChatThread";
import ChatInput from "@/components/command-center/ChatInput";
import ContextPanel from "@/components/command-center/ContextPanel";
import { Sparkles, ChevronDown, ChevronUp, LayoutPanelLeft } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";

// Global UI event logging helper
const ui_event = (name: string, payload: any) => {
  console.log(`[UI_EVENT] ${name}`, payload);
};

const CommandCenter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as "today" | "drafts" | "dispatch" | "warnings" | "recent") || "today";
  const [isContextOpen, setIsContextOpen] = useState(false);

  const { messages, isTyping, sendMessage } = useChatStore();
  const { drafts, updateDraftStatus } = useDraftStore();
  const { currentUser } = useUserStore();
  const { t } = useTranslation();

  const handleSendMessage = (text: string, attachments?: File[]) => {
    ui_event("SEND_MESSAGE", { user_id: currentUser.id, role: currentUser.role, text });
    sendMessage(text, currentUser);
  };

  const setTab = (tab: string) => {
    ui_event("NAV_CHANGE", { route: "/command-center", tab });
    setSearchParams({ tab });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-[calc(100vh-9rem)] lg:h-[calc(100vh-7rem)] relative -mt-1 md:-mt-0">
      {/* ── Chat Section ── */}
      <div className="flex flex-col rounded-2xl border border-purple-100 bg-white overflow-hidden shadow-sm flex-1 min-w-0 h-full">
        {/* Chat Header */}
        <div className="flex items-center gap-3 border-b border-purple-100 px-4 md:px-6 py-3 shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100">
            <Sparkles className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-gray-900">{t('commandCenter')}</h2>
            <p className="text-[10px] text-gray-500">{t('aiAssistedControl')}</p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setIsContextOpen(!isContextOpen)}
              className={`lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isContextOpen ? 'bg-purple-600 text-white shadow-md' : 'bg-purple-50 text-purple-600 border border-purple-100'
                }`}
            >
              <LayoutPanelLeft className="h-3.5 w-3.5" />
              {t('intelligence')}
              {isContextOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
            <span className="hidden sm:flex items-center gap-1.5 rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse-soft" />
              {t('aiActive')}
            </span>
          </div>
        </div>

        <ChatThread
          messages={messages}
          drafts={drafts}
          isTyping={isTyping}
        />

        <ChatInput
          onSend={handleSendMessage}
          disabled={isTyping}
        />
      </div>

      {/* ── Context Panel ── */}
      <div className={`
        ${isContextOpen ? 'flex' : 'hidden'} lg:flex
        absolute lg:relative top-[56px] lg:top-0 left-0 right-0 z-10 lg:z-0
        bg-white/80 backdrop-blur-xl lg:bg-transparent
        p-4 lg:p-0 border-b lg:border-none border-purple-100
        max-h-[70vh] lg:max-h-none overflow-hidden transition-all duration-300 shadow-2xl lg:shadow-none
      `}>
        <ContextPanel
          activeTab={activeTab}
          onTabChange={(tab) => { setTab(tab); setIsContextOpen(false); }}
          drafts={drafts}
        />
      </div>
    </div>
  );
};

export default CommandCenter;
