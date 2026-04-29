import type { Metadata } from "next";
import Link from "next/link";

interface TermsPageProps {
  params: Promise<{ lng: string }>;
}

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for using mustofaamami.dev.",
};

export default async function TermsPage({ params }: TermsPageProps) {
  const { lng } = await params;

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms and Conditions</h1>
      <p className="text-muted mb-8">Last updated: April 29, 2026</p>

      <div className="space-y-6 text-foreground/90 leading-relaxed">
        <p>
          By accessing and using this website, you agree to these Terms and
          Conditions. If you do not agree, please do not use the site.
        </p>

        <h2 className="text-2xl font-semibold">Use of Website</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You agree to use this website only for lawful purposes.</li>
          <li>You must not attempt to interfere with site security or availability.</li>
          <li>You must not misuse contact forms for spam or abusive content.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Intellectual Property</h2>
        <p>
          Unless otherwise stated, website content (text, branding, and original
          materials) belongs to Mustofa Amami and is protected by applicable laws.
        </p>

        <h2 className="text-2xl font-semibold">Third-Party Links and Services</h2>
        <p>
          This site may contain links to third-party websites and may include services
          such as analytics and advertising providers. We are not responsible for the
          practices or content of third-party services.
        </p>

        <h2 className="text-2xl font-semibold">Disclaimer</h2>
        <p>
          The website is provided "as is" without warranties of any kind. We do not
          guarantee uninterrupted or error-free operation.
        </p>

        <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
        <p>
          To the extent permitted by law, we are not liable for any indirect,
          incidental, or consequential damages arising from your use of this website.
        </p>

        <h2 className="text-2xl font-semibold">Changes to Terms</h2>
        <p>
          We may update these Terms and Conditions from time to time. Updated terms
          will be posted on this page with the revised date.
        </p>

        <h2 className="text-2xl font-semibold">Contact</h2>
        <p>
          Questions about these terms can be submitted via the{" "}
          <Link href={`/${lng}/contact`} className="text-primary hover:underline">
            contact page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
