"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Link from "next/link";
import { use, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

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
    <motion.main
      className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-white mb-4">{t("title")}</h1>
          <p className="text-white/80 mb-6">{t("subtitle")}</p>
          <Link
            href={`/${lng}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            ← {t("back-to-home")}
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/50"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t("info.title")}
            </h2>
            <p className="text-muted mb-8">{t("info.description")}</p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <FaEnvelope className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {t("info.email.label")}
                  </h3>
                  <p className="text-muted">mustofa.amami@email.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <FaPhone className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {t("info.phone.label")}
                  </h3>
                  <p className="text-muted">+62 123 456 7890</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                  <FaMapMarkerAlt className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {t("info.location.label")}
                  </h3>
                  <p className="text-muted">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h3 className="font-semibold text-foreground mb-4">
                {t("info.social.title")}
              </h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors"
                >
                  <FaLinkedin className="text-primary" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-foreground/20 rounded-lg flex items-center justify-center hover:bg-foreground/30 transition-colors"
                >
                  <FaGithub className="text-foreground" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center hover:bg-secondary/30 transition-colors"
                >
                  <FaTwitter className="text-secondary" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/50"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">
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
                  className="w-full px-4 py-3 bg-background/20 border border-border/50 rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="w-full px-4 py-3 bg-background/20 border border-border/50 rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="w-full px-4 py-3 bg-background/20 border border-border/50 rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
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
                  className="w-full px-4 py-3 bg-background/20 border border-border/50 rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder={t("form.message-placeholder")}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                {t("form.submit")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.main>
  );
}
