import { usingTranslation } from "@/app/i18n";

interface FooterProps {
  lng: string;
}

// Evaluated once at build time — cacheComponents forbids runtime `new Date()`
// inside a server component without a request-data dependency.
const CURRENT_YEAR = new Date().getFullYear();

export async function Footer({ lng }: FooterProps) {
  const { t } = await usingTranslation(lng, "footer");

  return (
    <footer className="bg-background/10 backdrop-blur-sm border-t border-border/50 py-8 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted">
              © {CURRENT_YEAR} Mustofa Amami. {t("rights-reserved")}
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-primary transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
