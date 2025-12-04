"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { fallbackLng, languages } from "@/app/i18n/settings";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect browser language and redirect to appropriate locale
    const browserLang =
      typeof window !== "undefined"
        ? navigator.language?.split("-")[0]
        : fallbackLng;
    const supportedLang = languages.includes(browserLang)
      ? browserLang
      : fallbackLng;
    router.replace(`/${supportedLang}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-pulse text-lg">Loading...</div>
    </div>
  );
}
