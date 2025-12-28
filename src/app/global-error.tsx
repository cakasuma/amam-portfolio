"use client";

import { motion } from "motion/react";
import { Button } from "@/components/ui";
import {
  HeroSection,
  PageHeader,
  AnimatedCard,
} from "@/app/components/PageLayout";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          <AnimatedCard className="text-center max-w-2xl mx-auto p-8">
            <HeroSection>
              <PageHeader
                title="Critical Application Error"
                subtitle="Something went seriously wrong. We're working to fix this issue."
              />

              {/* Error illustration */}
              <motion.div
                className="text-6xl mb-8"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                ⚠️
              </motion.div>

              <div className="space-y-4 mb-8">
                <p className="text-text-secondary">
                  A critical error has occurred. Please refresh the page or try
                  again later.
                </p>

                <p className="text-text-muted text-sm">
                  If this problem persists, please contact support with the
                  error details.
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
                      {error.stack && (
                        <div className="mt-2">
                          <strong>Stack:</strong>
                          <br />
                          {error.stack}
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
                  🔄 Reset Application
                </Button>

                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  size="lg"
                  className="inline-flex items-center gap-2"
                >
                  ↻ Refresh Page
                </Button>
              </div>

              <div className="mt-8 text-xs text-text-muted">
                <p>Error ID: {error.digest || "Unknown"}</p>
                <p>Time: {new Date().toISOString()}</p>
              </div>
            </HeroSection>
          </AnimatedCard>
        </div>
      </body>
    </html>
  );
}
