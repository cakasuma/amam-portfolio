"use client";
import { motion } from "motion/react";
import Link from "@/app/components/MotionLink";
import { use } from "react";
import { useTranslation } from "@/app/i18n/client";

interface HomeProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function Home({ params }: HomeProps) {
  const { lng } = use(params);
  const { t } = useTranslation(lng);
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
        <Link href="/[lng]/resume" as={`/${lng}/resume`}>
          {t("to-resume-page")}
        </Link>
      </motion.div>
    </motion.main>
  );
}
