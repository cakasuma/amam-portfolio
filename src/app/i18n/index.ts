import {
  createInstance,
  InitOptions,
  TFunction,
  i18n as i18nextInstance,
} from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { getOptions } from "./settings";

// Cache server instances per (lng + ns) so each request reuses already-loaded
// resources instead of paying init cost every render.
const instanceCache = new Map<string, Promise<i18nextInstance>>();

const initI18next = (lng: string, ns?: string | string[]): Promise<i18nextInstance> => {
  const key = `${lng}::${Array.isArray(ns) ? ns.join(",") : ns ?? "translation"}`;
  const cached = instanceCache.get(key);
  if (cached) return cached;

  const promise = (async () => {
    const i18nInstance = createInstance();
    await i18nInstance
      // NOTE: deliberately *not* using initReactI18next here — that module
      // calls React.createContext at evaluation time, which is forbidden in
      // RSC. Server pages only need t() so the React glue is unnecessary.
      .use(
        resourcesToBackend(
          (language: string, namespace: string) =>
            import(`./locales/${language}/${namespace}.json`)
        )
      )
      .init(getOptions(lng, ns) as InitOptions);
    return i18nInstance;
  })();

  instanceCache.set(key, promise);
  return promise;
};

interface UseTranslationOptions {
  keyPrefix?: string;
}

export async function usingTranslation(
  lng: string,
  ns?: string | string[],
  options: UseTranslationOptions = {}
): Promise<{ t: TFunction; i18n: i18nextInstance }> {
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(
      lng,
      Array.isArray(ns) ? ns[0] : ns,
      options.keyPrefix
    ),
    i18n: i18nextInstance,
  };
}
