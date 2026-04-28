"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { Snackbar } from "@/components/ui/Snackbar";

interface FormLabels {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  subject: string;
  subjectPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  sending: string;
  submit: string;
  success: string;
  error: string;
  rateLimit: string;
  errors: {
    nameRequired: string;
    nameMin: string;
    emailRequired: string;
    emailInvalid: string;
    subjectRequired: string;
    subjectMin: string;
    messageRequired: string;
    messageMin: string;
  };
}

type FormField = "name" | "email" | "subject" | "message";

export function ContactForm({ labels }: { labels: FormLabels }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<Record<FormField, string>>>({});
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  }>({ isOpen: false, message: "", type: "success" });

  const validateField = (name: FormField, value: string): string | undefined => {
    const v = value.trim();
    switch (name) {
      case "name":
        if (!v) return labels.errors.nameRequired;
        if (v.length < 2) return labels.errors.nameMin;
        break;
      case "email":
        if (!v) return labels.errors.emailRequired;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return labels.errors.emailInvalid;
        break;
      case "subject":
        if (!v) return labels.errors.subjectRequired;
        if (v.length < 3) return labels.errors.subjectMin;
        break;
      case "message":
        if (!v) return labels.errors.messageRequired;
        if (v.length < 10) return labels.errors.messageMin;
        break;
    }
    return undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<Record<FormField, string>> = {};
    (Object.keys(formData) as FormField[]).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) errors[field] = err;
    });

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbar({
          isOpen: true,
          type: "success",
          message: data.message || labels.success,
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setFormErrors({});
      } else if (response.status === 429) {
        setSnackbar({ isOpen: true, type: "error", message: labels.rateLimit });
      } else {
        setSnackbar({
          isOpen: true,
          type: "error",
          message: data.error || labels.error,
        });
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setSnackbar({ isOpen: true, type: "error", message: labels.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const field = name as FormField;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 bg-input border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
      hasError
        ? "border-error focus:ring-error focus:border-error"
        : "border-border focus:ring-secondary focus:border-secondary"
    }`;

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div>
          <label htmlFor="name" className="block text-foreground font-medium mb-2">
            {labels.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass(!!formErrors.name)}
            placeholder={labels.namePlaceholder}
            autoComplete="name"
          />
          {formErrors.name && <p className="mt-1 text-sm text-error">{formErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-foreground font-medium mb-2">
            {labels.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass(!!formErrors.email)}
            placeholder={labels.emailPlaceholder}
            autoComplete="email"
          />
          {formErrors.email && <p className="mt-1 text-sm text-error">{formErrors.email}</p>}
        </div>

        <div>
          <label htmlFor="subject" className="block text-foreground font-medium mb-2">
            {labels.subject}
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={inputClass(!!formErrors.subject)}
            placeholder={labels.subjectPlaceholder}
          />
          {formErrors.subject && <p className="mt-1 text-sm text-error">{formErrors.subject}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-foreground font-medium mb-2">
            {labels.message}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`${inputClass(!!formErrors.message)} resize-none`}
            placeholder={labels.messagePlaceholder}
          />
          {formErrors.message && <p className="mt-1 text-sm text-error">{formErrors.message}</p>}
        </div>

        <Button
          type="submit"
          variant="outline"
          size="lg"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? labels.sending : labels.submit}
        </Button>
      </form>

      <Snackbar
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        type={snackbar.type}
        onClose={() => setSnackbar({ ...snackbar, isOpen: false })}
        duration={5000}
      />
    </>
  );
}
