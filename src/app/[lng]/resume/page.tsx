"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";

interface ResumeProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function Resume({ params }: ResumeProps) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "resume");
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t("title")}
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Link href="/[lng]" as={`/${lng}`}>
          {t("back-to-home")}
        </Link>
      </motion.div>
    </motion.main>
  );
}
