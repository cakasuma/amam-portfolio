"use client";
import { useTranslation } from "@/app/i18n/client";
import { use, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import PageLayout, {
  PageHeader,
  Section,
  ContentGrid,
} from "@/app/components/PageLayout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Snackbar,
} from "@/components/ui";

interface ContactProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function Contact({ params }: ContactProps) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  }>({});
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  }>({ isOpen: false, message: "", type: "success" });

  type FormField = keyof typeof formData;

  const validateField = (name: FormField, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return t("form.errors.name-required") || "Name is required";
        if (value.trim().length < 2)
          return t("form.errors.name-min") || "Name must be at least 2 characters";
        break;
      case "email":
        if (!value.trim()) return t("form.errors.email-required") || "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return t("form.errors.email-invalid") || "Please enter a valid email address";
        break;
      case "subject":
        if (!value.trim()) return t("form.errors.subject-required") || "Subject is required";
        if (value.trim().length < 3)
          return t("form.errors.subject-min") || "Subject must be at least 3 characters";
        break;
      case "message":
        if (!value.trim()) return t("form.errors.message-required") || "Message is required";
        if (value.trim().length < 10)
          return t("form.errors.message-min") || "Message must be at least 10 characters";
        break;
    }
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const errors: typeof formErrors = {};
    Object.keys(formData).forEach((key) => {
      const field = key as FormField;
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    setFormErrors(errors);

    // If there are errors, don't submit
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({
          isOpen: true,
          type: "success",
          message: data.message || t("form.success") || "Message sent successfully!",
        });
        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
        setFormErrors({});
      } else {
        setSnackbar({
          isOpen: true,
          type: "error",
          message: data.error || t("form.error") || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSnackbar({
        isOpen: true,
        type: "error",
        message: t("form.error") || "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const field = name as FormField;
    
    setFormData({
      ...formData,
      [field]: value,
    });

    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors({
        ...formErrors,
        [field]: undefined,
      });
    }
  };

  return (
    <PageLayout>
      {/* Header */}
      <PageHeader
        title={t("title") || "Get In Touch"}
        subtitle={
          t("subtitle") ||
          "Let's discuss your next project and bring your ideas to life"
        }
        level={1}
      />

      <ContentGrid columns={2} gap="lg">
        {/* Contact Information */}
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

              {/* Social Links */}
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

        {/* Contact Form */}
        <Section>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-success text-3xl">✉️</span>
                {t("form.title") || "Send Message"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-foreground font-medium mb-2"
                  >
                    {t("form.name") || "Your Name"}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-input border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                      formErrors.name
                        ? "border-error focus:ring-error focus:border-error"
                        : "border-border focus:ring-secondary focus:border-secondary"
                    }`}
                    placeholder={
                      t("form.name-placeholder") || "Enter your full name"
                    }
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-error">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-foreground font-medium mb-2"
                  >
                    {t("form.email") || "Email Address"}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-input border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                      formErrors.email
                        ? "border-error focus:ring-error focus:border-error"
                        : "border-border focus:ring-secondary focus:border-secondary"
                    }`}
                    placeholder={
                      t("form.email-placeholder") || "your.email@example.com"
                    }
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-error">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-foreground font-medium mb-2"
                  >
                    {t("form.subject") || "Subject"}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-input border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                      formErrors.subject
                        ? "border-error focus:ring-error focus:border-error"
                        : "border-border focus:ring-secondary focus:border-secondary"
                    }`}
                    placeholder={
                      t("form.subject-placeholder") || "What's this about?"
                    }
                  />
                  {formErrors.subject && (
                    <p className="mt-1 text-sm text-error">{formErrors.subject}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-foreground font-medium mb-2"
                  >
                    {t("form.message") || "Message"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className={`w-full px-4 py-3 bg-input border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 resize-none transition-all duration-300 ${
                      formErrors.message
                        ? "border-error focus:ring-error focus:border-error"
                        : "border-border focus:ring-secondary focus:border-secondary"
                    }`}
                    placeholder={
                      t("form.message-placeholder") ||
                      "Tell me about your project or inquiry..."
                    }
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-sm text-error">{formErrors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="w-full"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t("form.sending") || "Sending..."
                    : t("form.submit") || "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Section>
      </ContentGrid>

      {/* Additional Information */}
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

      {/* Snackbar Notification */}
      <Snackbar
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, isOpen: false })}
        duration={5000}
      />
    </PageLayout>
  );
}
