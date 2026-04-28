'use client'

import { useEffect, useState } from 'react'
import i18next, { TFunction } from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import { useCookies } from 'react-cookie'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, cookieName } from './settings'

const runsOnServerSide = typeof window === 'undefined'

if (!i18next.isInitialized) {
    i18next
        .use(initReactI18next)
        .use(LanguageDetector)
        .use(
            resourcesToBackend(
                (language: string, namespace: string) =>
                    import(`./locales/${language}/${namespace}.json`)
            )
        )
        .init({
            ...getOptions(),
            lng: undefined,
            detection: {
                order: ['path', 'htmlTag', 'cookie', 'navigator'],
            },
            // Only preload the namespace we need; other lngs lazy-load on switch
            preload: runsOnServerSide ? [] : undefined,
            react: {
                useSuspense: false,
            },
            interpolation: {
                escapeValue: false,
            },
            // Reduce overhead from missing-key callbacks
            saveMissing: false,
            partialBundledLanguages: true,
        })
}

interface UseTranslationReturn {
    t: TFunction;
    i18n: typeof i18next;
    ready: boolean;
}

export function useTranslation(
    lng: string,
    ns?: string | string[],
    options?: Record<string, unknown>
): UseTranslationReturn {
    const [cookies, setCookie] = useCookies([cookieName])
    const ret = useTranslationOrg(ns, options) as Omit<UseTranslationReturn, 'ready'>
    const { i18n } = ret

    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng)
    }

    const namespaceToCheck = Array.isArray(ns) ? ns[0] : (ns || 'translation')
    const initialReady =
        runsOnServerSide || i18n.hasResourceBundle(lng, namespaceToCheck)
    const [ready, setReady] = useState(initialReady)

    useEffect(() => {
        if (runsOnServerSide) return
        if (i18n.resolvedLanguage !== lng) {
            i18n.changeLanguage(lng)
        }
        const check = () => {
            const isReady = i18n.hasResourceBundle(lng, namespaceToCheck)
            setReady((prev) => (prev === isReady ? prev : isReady))
        }
        check()
        i18n.on('languageChanged', check)
        i18n.on('loaded', check)
        return () => {
            i18n.off('languageChanged', check)
            i18n.off('loaded', check)
        }
    }, [lng, namespaceToCheck, i18n])

    useEffect(() => {
        if (runsOnServerSide) return
        if (cookies.i18next === lng) return
        setCookie(cookieName, lng, { path: '/' })
    }, [lng, cookies.i18next, setCookie])

    return { ...ret, ready }
}
