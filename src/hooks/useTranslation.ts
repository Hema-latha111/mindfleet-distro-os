import { useSettingsStore } from '@/store';
import { translations, TranslationKeys } from '@/translations';

export const useTranslation = () => {
    const { settings } = useSettingsStore();
    const lang = settings.language || 'en';

    const t = (key: TranslationKeys, variables?: Record<string, any>): string => {
        const langTranslations = (translations as any)[lang] || translations['en'];
        let translation = langTranslations[key] || translations['en'][key] || key;

        if (variables) {
            Object.entries(variables).forEach(([name, value]) => {
                translation = translation.replace(`{{${name}}}`, String(value));
            });
        }

        return translation;
    };

    return { t, lang };
};
