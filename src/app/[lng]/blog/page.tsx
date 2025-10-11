"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";
import PageLayout, {
  PageHeader,
  AnimatedCard,
} from "@/app/components/PageLayout";

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
    <PageLayout maxWidth="4xl">
      {/* Header */}
      <PageHeader
        title={t("title") || "Blog"}
        subtitle={
          t("subtitle") ||
          "Thoughts, tutorials, and insights about web development"
        }
      />

      {/* Blog Posts */}
      <AnimatedCard delay={0.2}>
        <div className="space-y-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="card p-6 lg:p-8 group hover-lift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20">
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

              <h2 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {post.title}
              </h2>

              <p className="text-secondary mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              <Link
                href="#"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {t("read-more")} →
              </Link>
            </motion.article>
          ))}
        </div>
      </AnimatedCard>

      {/* Newsletter Signup */}
      <AnimatedCard delay={0.5} className="text-center">
        <div className="bg-gradient-to-r from-primary to-info p-8 lg:p-10 rounded-xl text-white">
          <h2 className="text-3xl font-bold mb-4">{t("newsletter.title")}</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t("newsletter.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("newsletter.placeholder")}
              className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
            />
            <button className="bg-background text-primary hover:bg-accent border border-border px-6 py-3 rounded-xl font-semibold transition-colors focus-ring">
              {t("newsletter.button")}
            </button>
          </div>
        </div>
      </AnimatedCard>
    </PageLayout>
  );
}
