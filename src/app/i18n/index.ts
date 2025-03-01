import { createInstance, InitOptions, TFunction, i18n as i18nextInstance } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next';
import { getOptions } from './settings';

const initI18next = async (lng: string, ns?: string | string[]): Promise<typeof i18nInstance> => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init(getOptions(lng, ns) as InitOptions);
  return i18nInstance;
};

interface UseTranslationOptions {
  keyPrefix?: string;
}

export async function usingTranslation(lng: string, ns?: string | string[], options: UseTranslationOptions = {}): Promise<{ t: TFunction; i18n: i18nextInstance }> {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance
  };
}