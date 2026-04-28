"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import {
  HeroSection,
  PageHeader,
  AnimatedCard,
} from "@/app/components/PageLayout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AnimatedCard className="text-center max-w-2xl mx-auto p-8">
        <HeroSection>
          <PageHeader
            title="Oops! Something went wrong"
            subtitle="We apologize for the inconvenience. Please try again or go back to the homepage."
          />

          <div className="text-6xl mb-8 animate-pulse">🛠️</div>

          <div className="space-y-4 mb-8">
            <p className="text-text-secondary">
              An unexpected error has occurred. This has been automatically
              reported to our team.
            </p>

            {/* Show error details in development */}
            {process.env.NODE_ENV === "development" && (
              <details className="text-left">
                <summary className="cursor-pointer text-sm text-text-muted">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-4 p-4 bg-card border border-border rounded-lg text-xs overflow-auto">
                  {error.message}
                  {error.digest && (
                    <div className="mt-2">
                      <strong>Digest:</strong> {error.digest}
                    </div>
                  )}
                </pre>
              </details>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={reset}
              variant="cta"
              size="lg"
              className="inline-flex items-center gap-2"
            >
              🔄 Try Again
            </Button>

            <Link href="/en" passHref>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                🏠 Go Home
              </Button>
            </Link>
          </div>
        </HeroSection>
      </AnimatedCard>
    </div>
  );
}
