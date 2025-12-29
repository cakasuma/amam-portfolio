/* eslint-disable react-hooks/rules-of-hooks */

'use client'

import { useEffect, useState, useMemo } from 'react'
import i18next, { TFunction} from 'i18next'
import { initReactI18next, useTranslation as useTranslationOrg } from 'react-i18next'
import { useCookies } from 'react-cookie'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions, languages, cookieName } from './settings'

const runsOnServerSide = typeof window === 'undefined'

// 
interface I18nOptions {
    lng: string | undefined;
    detection: {
        order: string[];
    };
    preload: string[];
}

// Initialize i18next with better performance settings
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .use(resourcesToBackend((language: string, namespace: string) => import(`./locales/${language}/${namespace}.json`)))
    .init<I18nOptions>({
        ...getOptions(),
        lng: undefined, // let detect the language on client side
        detection: {
            order: ['path', 'htmlTag', 'cookie', 'navigator'],
        },
        preload: runsOnServerSide ? languages : [],
        // Performance optimizations
        react: {
            useSuspense: false, // Disable suspense for better performance
        },
        interpolation: {
            escapeValue: false, // React already escapes values
        },
    })


interface UseTranslationReturn {
    t: TFunction;
    i18n: typeof i18next;
}

export function useTranslation(lng: string, ns?: string | string[], options?: Record<string, unknown>): UseTranslationReturn {
    const [cookies, setCookie] = useCookies([cookieName])
    const ret = useTranslationOrg(ns, options) as UseTranslationReturn
    const { i18n } = ret
    if (runsOnServerSide && lng && i18n.resolvedLanguage !== lng) {
        i18n.changeLanguage(lng)
    } else {
        const [activeLng, setActiveLng] = useState<string>(i18n.resolvedLanguage || 'en')
        useEffect(() => {
            if (activeLng === i18n.resolvedLanguage) return
            setActiveLng(i18n.resolvedLanguage || 'en')
        }, [activeLng, i18n.resolvedLanguage])
        useEffect(() => {
            if (!lng || i18n.resolvedLanguage === lng) return
            i18n.changeLanguage(lng)
        }, [lng, i18n])
        useEffect(() => {
            if (cookies.i18next === lng) return
            setCookie(cookieName, lng, { path: '/' })
        }, [lng, cookies.i18next, setCookie])
    }
    return ret
}