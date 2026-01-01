"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface GoogleAnalyticsProps {
  GA_TRACKING_ID?: string;
}

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Google Analytics tracking function
export const gtag = (...args: unknown[]) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
};

// Track page views
export const pageview = (url: string, trackingId?: string) => {
  if (trackingId) {
    gtag("config", trackingId, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Internal component that uses useSearchParams
function AnalyticsTracker({ trackingId }: { trackingId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? '?' + searchParams.toString() : '');
    pageview(url, trackingId);
  }, [pathname, searchParams, trackingId]);

  return null;
}

// Google Analytics component
export default function GoogleAnalytics({
  GA_TRACKING_ID,
}: GoogleAnalyticsProps) {
  const trackingId = GA_TRACKING_ID || process.env.NEXT_PUBLIC_GA_ID;

  if (!trackingId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${trackingId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      {/* Wrap the tracker in Suspense for SSR compatibility */}
      <Suspense fallback={null}>
        <AnalyticsTracker trackingId={trackingId} />
      </Suspense>
    </>
  );
}

// Custom hook for tracking events
export const useAnalytics = () => {
  return {
    trackEvent: event,
    trackPageView: pageview,
  };
};
