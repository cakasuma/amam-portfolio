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
  AnimatedCard,
} from "@/app/components/PageLayout";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <PageLayout>
      {/* Header */}
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Contact Information */}
        <AnimatedCard delay={0.2} direction="left">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="text-primary">📞</span>
            {t("info.title")}
          </h2>
          <p className="text-secondary mb-8 leading-relaxed">
            {t("info.description")}
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20">
                <FaEnvelope className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {t("info.email.label")}
                </h3>
                <p className="text-secondary">mustofa.amami@email.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center border border-success/20">
                <FaPhone className="text-success" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {t("info.phone.label")}
                </h3>
                <p className="text-secondary">+62 123 456 7890</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center border border-warning/20">
                <FaMapMarkerAlt className="text-warning" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">
                  {t("info.location.label")}
                </h3>
                <p className="text-secondary">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="font-semibold text-foreground mb-4">
              {t("info.social.title")}
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors border border-primary/20"
              >
                <FaLinkedin className="text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-foreground/10 rounded-lg flex items-center justify-center hover:bg-foreground/20 transition-colors border border-foreground/20"
              >
                <FaGithub className="text-foreground" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center hover:bg-info/20 transition-colors border border-info/20"
              >
                <FaTwitter className="text-info" />
              </a>
            </div>
          </div>
        </AnimatedCard>

        {/* Contact Form */}
        <AnimatedCard delay={0.4} direction="right">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <span className="text-success">✉️</span>
            {t("form.title")}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-foreground font-medium mb-2"
              >
                {t("form.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder={t("form.name-placeholder")}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-foreground font-medium mb-2"
              >
                {t("form.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder={t("form.email-placeholder")}
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-foreground font-medium mb-2"
              >
                {t("form.subject")}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                placeholder={t("form.subject-placeholder")}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-foreground font-medium mb-2"
              >
                {t("form.message")}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-input border border-border rounded-xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all duration-300"
                placeholder={t("form.message-placeholder")}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-success hover:from-primary/80 hover:to-success/80 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {t("form.submit")}
            </button>
          </form>
        </AnimatedCard>
      </div>
    </PageLayout>
  );
}
