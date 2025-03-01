export const fallbackLng = 'en'
export const languages = [fallbackLng, 'id']
export const cookieName = 'i18next'
export const defaultNS = 'translation'

export function getOptions (lng = fallbackLng, ns: string | string[] = defaultNS) {
    return {
      // debug: true,
      supportedLngs: languages,
      fallbackLng,
      lng,
      fallbackNS: defaultNS,
      defaultNS,
      ns
    }
  }