"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";
import PageLayout, {
  PageHeader,
  Section,
  CTASection,
} from "@/app/components/PageLayout";
import { Card, CardContent, Button } from "@/components/ui";
import { FaCalendarAlt, FaClock, FaTag, FaArrowRight } from "react-icons/fa";

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
        "Exploring the new features and improvements in Next.js 15, including the app router, server components, and enhanced performance optimizations.",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Development",
      featured: true,
    },
    {
      id: 2,
      title: "Building Responsive Layouts with Tailwind CSS",
      excerpt:
        "A comprehensive guide to creating beautiful, responsive layouts using Tailwind CSS utility classes and best practices for modern web design.",
      date: "2024-01-10",
      readTime: "8 min read",
      category: "CSS",
      featured: true,
    },
    {
      id: 3,
      title: "TypeScript Best Practices in 2024",
      excerpt:
        "Learn the latest TypeScript best practices and patterns that will make your code more maintainable, type-safe, and developer-friendly.",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "TypeScript",
      featured: false,
    },
    {
      id: 4,
      title: "State Management in React Applications",
      excerpt:
        "Comparing different state management solutions and when to use each one in your React projects, from useState to Zustand.",
      date: "2023-12-28",
      readTime: "10 min read",
      category: "React",
      featured: false,
    },
    {
      id: 5,
      title: "The Future of Web Development",
      excerpt:
        "Exploring emerging trends in web development including WebAssembly, edge computing, and the evolution of JavaScript frameworks.",
      date: "2023-12-20",
      readTime: "7 min read",
      category: "Trends",
      featured: false,
    },
  ];

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  return (
    <PageLayout maxWidth="5xl">
      {/* Header */}
      <PageHeader
        title={t("title") || "Blog"}
        subtitle={
          t("subtitle") ||
          "Thoughts, tutorials, and insights about web development and technology"
        }
        level={1}
      />

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <Section id="featured-posts" ariaLabel="Featured blog posts">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <span className="text-secondary text-3xl">⭐</span>
              {t("featured-posts.title") || "Featured Posts"}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              {t("featured-posts.description") || "Hand-picked articles covering the latest in web development and programming"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="group h-full" hover>
                  <CardContent className="p-6">
                    {/* Post Meta */}
                    <header className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-accent/10 text-accent border-accent/20 rounded-full text-sm border font-medium flex items-center gap-1">
                        <FaTag className="w-3 h-3" />
                        {post.category}
                      </span>
                      <span className="text-text-muted text-sm flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                      <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                        {t("featured") || "Featured"}
                      </span>
                    </header>

                    {/* Post Content */}
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-200">
                      <Link
                        href={`/${lng}/blog/${post.id}`}
                        className="hover:underline"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Post Footer */}
                    <footer className="flex items-center justify-between">
                      <time
                        className="text-text-muted text-sm flex items-center gap-1"
                        dateTime={post.date}
                      >
                        <FaCalendarAlt className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString(
                          lng === "id" ? "id-ID" : "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </time>

                      <Link
                        href={`/${lng}/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors group-hover:translate-x-1 duration-200"
                      >
                        {t("read-more") || "Read More"}
                        <FaArrowRight className="w-3 h-3" />
                      </Link>
                    </footer>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </Section>
      )}

      {/* Regular Posts */}
      <Section id="recent-posts" ariaLabel="Recent blog posts">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
            <span className="text-warning text-3xl">📝</span>
            {t("recent-posts.title") || "Recent Posts"}
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            {t("recent-posts.description") || "Latest articles and tutorials from my development journey"}
          </p>
        </div>

        <div className="space-y-6">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="group" hover>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Post Content */}
                    <div className="flex-1">
                      {/* Post Meta */}
                      <header className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-accent/10 text-accent border-accent/20 rounded-full text-sm border font-medium flex items-center gap-1">
                          <FaTag className="w-3 h-3" />
                          {post.category}
                        </span>
                        <span className="text-text-muted text-sm flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </header>

                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-200">
                        <Link
                          href={`/${lng}/blog/${post.id}`}
                          className="hover:underline"
                        >
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-text-secondary mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Post Footer */}
                      <footer className="flex items-center justify-between">
                        <time
                          className="text-text-muted text-sm flex items-center gap-1"
                          dateTime={post.date}
                        >
                          <FaCalendarAlt className="w-3 h-3" />
                          {new Date(post.date).toLocaleDateString(
                            lng === "id" ? "id-ID" : "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>

                        <Link
                          href={`/${lng}/blog/${post.id}`}
                          className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors group-hover:translate-x-1 duration-200"
                        >
                          {t("read-more") || "Read More"}
                          <FaArrowRight className="w-3 h-3" />
                        </Link>
                      </footer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </div>
      </Section>

      {/* Newsletter Signup */}
      <CTASection
        title={t("newsletter.title") || "Stay Updated"}
        description={
          t("newsletter.description") ||
          "Subscribe to my newsletter to get the latest articles and tutorials delivered directly to your inbox."
        }
        variant="secondary"
      >
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder={
              t("newsletter.placeholder") || "Enter your email address"
            }
            className="flex-1 px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary transition-all duration-300"
          />
          <Button variant="cta" size="md">
            {t("newsletter.button") || "Subscribe"}
          </Button>
        </div>
        <p className="text-text-muted text-sm mt-4 max-w-md mx-auto">
          {t("newsletter.privacy") || "No spam, unsubscribe at any time. I respect your privacy and will only send valuable content."}
        </p>
      </CTASection>
    </PageLayout>
  );
}
