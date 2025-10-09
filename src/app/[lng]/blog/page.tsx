"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";

interface BlogProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function Blog({ params }: BlogProps) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "blog");

  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Next.js 15",
      excerpt:
        "Exploring the new features and improvements in Next.js 15, including the app router and server components.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Development",
    },
    {
      id: 2,
      title: "Building Responsive Layouts with Tailwind CSS",
      excerpt:
        "A comprehensive guide to creating beautiful, responsive layouts using Tailwind CSS utility classes.",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "CSS",
    },
    {
      id: 3,
      title: "TypeScript Best Practices in 2024",
      excerpt:
        "Learn the latest TypeScript best practices and patterns that will make your code more maintainable.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "TypeScript",
    },
    {
      id: 4,
      title: "State Management in React Applications",
      excerpt:
        "Comparing different state management solutions and when to use each one in your React projects.",
      date: "2023-12-28",
      readTime: "10 min read",
      category: "React",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold text-white mb-6">{t("title")}</h1>
          <p className="text-blue-200 text-lg mb-8 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Blog Posts */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 group hover:bg-white/15 transition-all duration-300 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <span className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-full text-sm border border-blue-400/30">
                    {post.category}
                  </span>
                  <span className="text-blue-300 text-sm">{post.readTime}</span>
                </div>
                <time className="text-blue-300 text-sm" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString(
                    lng === "id" ? "id-ID" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
              </div>

              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                {post.title}
              </h2>

              <p className="text-blue-200 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <Link
                href="#"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                {t("read-more")} →
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 border border-white/20 text-center shadow-xl">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t("newsletter.title")}
            </h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t("newsletter.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                {t("newsletter.button")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
