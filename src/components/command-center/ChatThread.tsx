import { useRef, useEffect } from "react";
import { Bot, User } from "lucide-react";
import { ChatMessage, DraftCard as DraftCardType } from "@/store/types";
import DraftCard from "@/components/shared/DraftCard";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
    messages: ChatMessage[];
    drafts: DraftCardType[];
    isTyping?: boolean;
}

const ChatThread = ({ messages, drafts, isTyping }: Props) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    return (
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-6 space-y-5">
            {messages.map((msg) => {
                const draft = msg.draftId ? drafts.find(d => d.id === msg.draftId) : null;
                return (
                    <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''} animate-fade-in`}>
                        {msg.role === 'ai' && (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100 mt-0.5">
                                <Bot className="h-3.5 w-3.5 text-purple-600" />
                            </div>
                        )}
                        <div className={`space-y-2 ${msg.role === 'user' ? 'max-w-sm md:max-w-lg' : 'max-w-full md:max-w-5xl flex-1'}`}>
                            {msg.role === 'user' ? (
                                <div className="rounded-2xl rounded-br-md bg-purple-600 px-4 py-2.5 text-xs text-white shadow-sm">
                                    {msg.content}
                                </div>
                            ) : (
                                <>
                                    <p className="text-xs text-gray-600 leading-relaxed bg-gray-50/50 p-2 rounded-lg -ml-2">{t(msg.content as any) || msg.content}</p>
                                    {draft && <DraftCard draft={draft} />}
                                </>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* Typing indicator */}
            {isTyping && (
                <div className="flex gap-3 animate-fade-in">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-100">
                        <Bot className="h-3.5 w-3.5 text-purple-600" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl bg-gray-100 px-3 py-2">
                        {[0, 1, 2].map(i => (
                            <span
                                key={i}
                                className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default ChatThread;
