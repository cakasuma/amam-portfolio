"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-4 py-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            {t("title")}
          </h1>
          <p className="text-blue-200 text-base md:text-lg mb-4 md:mb-8 max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 md:gap-12">
          {/* Contact Information */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
              {t("info.title")}
            </h2>
            <p className="text-blue-200 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              {t("info.description")}
            </p>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/30 rounded-lg flex items-center justify-center border border-blue-400/30 flex-shrink-0">
                  <FaEnvelope className="text-blue-300 text-sm md:text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white text-sm md:text-base">
                    {t("info.email.label")}
                  </h3>
                  <p className="text-blue-200 text-sm md:text-base truncate">
                    mustofa.amami@email.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/30 rounded-lg flex items-center justify-center border border-blue-400/30 flex-shrink-0">
                  <FaPhone className="text-blue-300 text-sm md:text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white text-sm md:text-base">
                    {t("info.phone.label")}
                  </h3>
                  <p className="text-blue-200 text-sm md:text-base">
                    +62 123 456 7890
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600/30 rounded-lg flex items-center justify-center border border-blue-400/30 flex-shrink-0">
                  <FaMapMarkerAlt className="text-blue-300 text-sm md:text-base" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white text-sm md:text-base">
                    {t("info.location.label")}
                  </h3>
                  <p className="text-blue-200 text-sm md:text-base">
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 md:mt-8">
              <h3 className="font-semibold text-white mb-3 md:mb-4 text-sm md:text-base">
                {t("info.social.title")}
              </h3>
              <div className="flex gap-3 md:gap-4">
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 bg-blue-600/30 rounded-lg flex items-center justify-center hover:bg-blue-600/50 transition-colors border border-blue-400/30"
                >
                  <FaLinkedin className="text-blue-300 text-sm md:text-base" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20"
                >
                  <FaGithub className="text-white text-sm md:text-base" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 md:w-10 md:h-10 bg-blue-600/30 rounded-lg flex items-center justify-center hover:bg-blue-600/50 transition-colors border border-blue-400/30"
                >
                  <FaTwitter className="text-blue-300 text-sm md:text-base" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-6">
              {t("form.title")}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-white font-medium mb-2 text-sm md:text-base"
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
                  className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm text-sm md:text-base"
                  placeholder={t("form.name-placeholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-white font-medium mb-2 text-sm md:text-base"
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
                  className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm text-sm md:text-base"
                  placeholder={t("form.email-placeholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-white font-medium mb-2 text-sm md:text-base"
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
                  className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm text-sm md:text-base"
                  placeholder={t("form.subject-placeholder")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-white font-medium mb-2 text-sm md:text-base"
                >
                  {t("form.message")}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 md:px-4 md:py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none backdrop-blur-sm text-sm md:text-base"
                  placeholder={t("form.message-placeholder")}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 md:py-3 px-4 md:px-6 rounded-xl font-semibold transition-colors text-sm md:text-base"
              >
                {t("form.submit")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
