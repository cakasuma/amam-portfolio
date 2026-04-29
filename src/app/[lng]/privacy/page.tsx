import type { Metadata } from "next";
import Link from "next/link";

interface PrivacyPageProps {
  params: Promise<{ lng: string }>;
}

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for mustofaamami.dev, including analytics and advertising data practices.",
};

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { lng } = await params;

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-muted mb-8">Last updated: April 29, 2026</p>

      <div className="space-y-6 text-foreground/90 leading-relaxed">
        <p>
          This Privacy Policy explains how Mustofa Amami ("we", "our", or "us")
          collects, uses, and protects information when you visit this website.
        </p>

        <h2 className="text-2xl font-semibold">Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Basic usage data such as pages visited, referral source, and browser type.</li>
          <li>Information you submit through the contact form, such as name, email, and message.</li>
          <li>Cookies and similar technologies used for analytics and ad personalization.</li>
        </ul>

        <h2 className="text-2xl font-semibold">How We Use Information</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>To operate, maintain, and improve this website.</li>
          <li>To respond to inquiries submitted via our contact form.</li>
          <li>To measure performance and understand audience engagement.</li>
          <li>To support advertising services such as Google AdSense.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Google AdSense and Third-Party Ads</h2>
        <p>
          We may use Google AdSense and other advertising partners that use cookies to
          serve ads based on your prior visits to this and other websites. Google&apos;s
          use of advertising cookies enables it and its partners to serve ads to users
          based on browsing behavior.
        </p>
        <p>
          You can opt out of personalized advertising by visiting Google Ads Settings.
        </p>

        <h2 className="text-2xl font-semibold">Data Sharing</h2>
        <p>
          We do not sell your personal information. We may share limited data with
          trusted service providers (for example analytics, hosting, and advertising)
          to run this website.
        </p>

        <h2 className="text-2xl font-semibold">Your Choices</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>You can disable cookies in your browser settings.</li>
          <li>You may contact us to request deletion of information submitted via forms.</li>
        </ul>

        <h2 className="text-2xl font-semibold">Contact</h2>
        <p>
          If you have privacy-related questions, contact us through the{" "}
          <Link href={`/${lng}/contact`} className="text-primary hover:underline">
            contact page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
