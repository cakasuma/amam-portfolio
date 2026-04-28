import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "@/components/icons";
import PageLayout, {
  PageHeader,
  Section,
  ContentGrid,
} from "@/app/components/PageLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { ContactForm } from "@/app/components/ContactForm";
import { usingTranslation } from "@/app/i18n";

interface ContactProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function Contact({ params }: ContactProps) {
  const { lng } = await params;
  const { t } = await usingTranslation(lng, "contact");

  const formLabels = {
    name: t("form.name") || "Your Name",
    namePlaceholder: t("form.name-placeholder") || "Enter your full name",
    email: t("form.email") || "Email Address",
    emailPlaceholder: t("form.email-placeholder") || "your.email@example.com",
    subject: t("form.subject") || "Subject",
    subjectPlaceholder: t("form.subject-placeholder") || "What's this about?",
    message: t("form.message") || "Message",
    messagePlaceholder:
      t("form.message-placeholder") || "Tell me about your project or inquiry...",
    sending: t("form.sending") || "Sending...",
    submit: t("form.submit") || "Send Message",
    success: t("form.success") || "Message sent successfully!",
    error: t("form.error") || "An error occurred. Please try again later.",
    rateLimit: t("form.rate-limit") || "Too many requests. Please try again later.",
    errors: {
      nameRequired: t("form.errors.name-required") || "Name is required",
      nameMin: t("form.errors.name-min") || "Name must be at least 2 characters",
      emailRequired: t("form.errors.email-required") || "Email is required",
      emailInvalid: t("form.errors.email-invalid") || "Please enter a valid email address",
      subjectRequired: t("form.errors.subject-required") || "Subject is required",
      subjectMin: t("form.errors.subject-min") || "Subject must be at least 3 characters",
      messageRequired: t("form.errors.message-required") || "Message is required",
      messageMin: t("form.errors.message-min") || "Message must be at least 10 characters",
    },
  };

  return (
    <PageLayout>
      <PageHeader
        title={t("title") || "Get In Touch"}
        subtitle={
          t("subtitle") || "Let's discuss your next project and bring your ideas to life"
        }
        level={1}
      />

      <ContentGrid columns={2} gap="lg">
        <Section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-secondary text-3xl">📞</span>
                {t("info.title") || "Contact Information"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-text-secondary mb-8 leading-relaxed">
                {t("info.description") ||
                  "I'm always interested in hearing about new opportunities and interesting projects. Feel free to reach out!"}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg border border-border hover:border-secondary/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center border border-secondary/20">
                    <FaEnvelope className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t("info.email.label") || "Email"}
                    </h3>
                    <a
                      href="mailto:amammustofa@gmail.com"
                      className="text-text-secondary hover:text-secondary transition-colors duration-200"
                    >
                      amammustofa@gmail.com
                    </a>
                  </div>
                </div>

                <a
                  href="https://wa.me/60108444970"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg border border-border hover:border-success/50 transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center border border-success/20">
                    <FaPhone className="text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t("info.phone.label") || "WhatsApp"}
                    </h3>
                    <span className="text-text-secondary group-hover:text-success transition-colors duration-200">
                      +60 10-844 4970
                    </span>
                  </div>
                </a>

                <a
                  href="https://maps.google.com/?q=Kuala+Lumpur,+Malaysia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg border border-border hover:border-warning/50 transition-colors duration-200"
                >
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center border border-warning/20">
                    <FaMapMarkerAlt className="text-warning" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {t("info.location.label") || "Location"}
                    </h3>
                    <span className="text-text-secondary group-hover:text-warning transition-colors duration-200">
                      Kuala Lumpur, Malaysia
                    </span>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("info.social.title") || "Connect With Me"}
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://linkedin.com/in/mustofa-ghaleb-amami"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center hover:bg-blue-500/20 transition-all duration-200 border border-blue-500/20 hover:border-blue-500/40 group"
                    aria-label="Visit LinkedIn profile"
                  >
                    <FaLinkedin className="text-blue-500 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                  <a
                    href="https://github.com/cakasuma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center hover:bg-secondary/20 transition-all duration-200 border border-secondary/20 hover:border-secondary/40 group"
                    aria-label="Visit GitHub profile"
                  >
                    <FaGithub className="text-secondary group-hover:scale-110 transition-transform duration-200" />
                  </a>
                  <a
                    href="https://twitter.com/mustofaamami"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-sky-500/10 rounded-lg flex items-center justify-center hover:bg-sky-500/20 transition-all duration-200 border border-sky-500/20 hover:border-sky-500/40 group"
                    aria-label="Visit Twitter profile"
                  >
                    <FaTwitter className="text-sky-500 group-hover:scale-110 transition-transform duration-200" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        <Section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-success text-3xl">✉️</span>
                {t("form.title") || "Send Message"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm labels={formLabels} />
            </CardContent>
          </Card>
        </Section>
      </ContentGrid>

      <Section className="mt-12">
        <Card className="text-center bg-gradient-to-r from-accent/50 to-background-secondary/50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("freelance.title") || "Available for Freelance Projects"}
            </h2>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              {t("freelance.description") ||
                "I'm currently accepting new freelance projects and consulting opportunities. Whether you need a full-stack web application, UI/UX improvements, or technical consultation, I'd love to help bring your vision to life."}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-muted">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                {t("freelance.available") || "Available for new projects"}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-info rounded-full"></span>
                {t("freelance.response") || "Quick response time"}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-warning rounded-full"></span>
                {t("freelance.flexible") || "Flexible scheduling"}
              </span>
            </div>
          </CardContent>
        </Card>
      </Section>
    </PageLayout>
  );
}
