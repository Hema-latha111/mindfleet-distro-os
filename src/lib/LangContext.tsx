import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "@/lib/i18n";

interface LangContextValue {
    lang: Lang;
    setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
    lang: "en",
    setLang: () => { },
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
    const [lang, setLang] = useState<Lang>("en");
    return (
        <LangContext.Provider value={{ lang, setLang }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => useContext(LangContext);
