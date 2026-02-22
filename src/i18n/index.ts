import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';

import en from './en.json';
import ptBR from './pt-BR.json';

const resources = {
  en: { translation: en },
  'pt-BR': { translation: ptBR },
};

const deviceLocale = getLocales()[0]?.languageTag ?? 'en';
const supportedLocales = ['en', 'pt-BR'];
const fallbackLanguage = 'en';

const detectedLanguage = supportedLocales.find(
  (locale) => deviceLocale.startsWith(locale) || deviceLocale === locale
) ?? fallbackLanguage;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectedLanguage,
    fallbackLng: fallbackLanguage,
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: 'v4',
  });

export default i18n;
