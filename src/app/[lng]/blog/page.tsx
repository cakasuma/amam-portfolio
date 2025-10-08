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
    <motion.main
      className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="max-w-4xl mx-auto">
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

        {/* Blog Posts */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 border border-border/50 group hover:bg-background/15 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                    {post.category}
                  </span>
                  <span className="text-muted text-sm">{post.readTime}</span>
                </div>
                <time className="text-muted text-sm" dateTime={post.date}>
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

              <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              <p className="text-muted mb-4">{post.excerpt}</p>

              <Link
                href="#"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {t("read-more")} →
              </Link>
            </motion.article>
          ))}
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-border/50 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("newsletter.title")}
            </h2>
            <p className="text-muted mb-6">{t("newsletter.description")}</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 px-4 py-2 bg-background/20 border border-border/50 rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
                {t("newsletter.button")}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
}
