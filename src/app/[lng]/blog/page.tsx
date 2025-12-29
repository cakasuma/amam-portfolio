"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import PageLayout, {
  PageHeader,
  Section,
  CTASection,
} from "@/app/components/PageLayout";
import { Card, CardContent, Button } from "@/components/ui";
import { FaCalendarAlt, FaClock, FaTag, FaExternalLinkAlt, FaHeart, FaComment } from "react-icons/fa";
import { SiDevdotto } from "react-icons/si";
import { getBlogPosts, BlogPost } from "@/lib/devto";

interface BlogProps {
  params: Promise<{
    lng: string;
  }>;
}

// Loading skeleton component
function BlogPostSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="h-6 w-20 bg-accent/30 rounded-full"></div>
          <div className="h-4 w-24 bg-accent/20 rounded"></div>
        </div>
        <div className="h-6 w-3/4 bg-accent/30 rounded mb-3"></div>
        <div className="h-4 w-full bg-accent/20 rounded mb-2"></div>
        <div className="h-4 w-2/3 bg-accent/20 rounded mb-4"></div>
        <div className="flex items-center justify-between">
          <div className="h-4 w-28 bg-accent/20 rounded"></div>
          <div className="h-4 w-20 bg-accent/20 rounded"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Blog({ params }: BlogProps) {
  const { lng } = use(params);
  const { t, ready } = useTranslation(lng, "blog");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const posts = await getBlogPosts();
      setBlogPosts(posts);
    } catch (err) {
      setError("Failed to load blog posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const featuredPosts = blogPosts.filter((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  // Show loading state until translations are ready
  if (!ready) {
    return (
      <PageLayout maxWidth="5xl">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted">Loading...</div>
        </div>
      </PageLayout>
    );
  }

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

      {/* Dev.to Attribution */}
      <Section id="devto-attribution" ariaLabel="Content source">
        <div className="flex items-center justify-center gap-2 text-text-secondary mb-8">
          <SiDevdotto className="w-6 h-6" />
          <span className="text-sm">
            {t("powered-by") || "Articles from"}{" "}
            <a 
              href="https://dev.to/cakasuma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-secondary hover:underline font-medium"
            >
              dev.to/cakasuma
            </a>
          </span>
        </div>
      </Section>

      {/* Loading State */}
      {loading && (
        <Section id="loading" ariaLabel="Loading blog posts">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[1, 2, 3, 4].map((i) => (
              <BlogPostSkeleton key={i} />
            ))}
          </div>
        </Section>
      )}

      {/* Error State */}
      {error && !loading && (
        <Section id="error" ariaLabel="Error loading blog posts">
          <div className="text-center py-12">
            <p className="text-error mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => fetchPosts()}
            >
              {t("retry") || "Try Again"}
            </Button>
          </div>
        </Section>
      )}

      {/* Empty State */}
      {!loading && !error && blogPosts.length === 0 && (
        <Section id="empty" ariaLabel="No blog posts">
          <div className="text-center py-12">
            <p className="text-text-secondary mb-4">
              {t("no-posts") || "No blog posts found. Check back later!"}
            </p>
            <a 
              href="https://dev.to/cakasuma" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-secondary hover:underline"
            >
              {t("visit-devto") || "Visit my Dev.to profile"}
              <FaExternalLinkAlt className="w-3 h-3" />
            </a>
          </div>
        </Section>
      )}

      {/* Featured Posts */}
      {!loading && featuredPosts.length > 0 && (
        <Section id="featured-posts" ariaLabel="Featured blog posts">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <span className="text-secondary text-3xl">⭐</span>
              {t("featured-posts.title") || "Featured Posts"}
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              {t("featured-posts.description") || "Popular articles with the most engagement from the community"}
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
                    {/* Cover Image */}
                    {post.coverImage && (
                      <div className="mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl relative h-48">
                        <Image 
                          src={post.coverImage} 
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                      </div>
                    )}
                    
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
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {post.title}
                      </a>
                    </h3>

                    <p className="text-text-secondary mb-4 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-4 mb-4 text-text-muted text-sm">
                      <span className="flex items-center gap-1">
                        <FaHeart className="w-3 h-3 text-error" />
                        {post.reactionsCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaComment className="w-3 h-3" />
                        {post.commentsCount}
                      </span>
                    </div>

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

                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors group-hover:translate-x-1 duration-200"
                      >
                        {t("read-on-devto") || "Read on Dev.to"}
                        <FaExternalLinkAlt className="w-3 h-3" />
                      </a>
                    </footer>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </Section>
      )}

      {/* Regular Posts */}
      {!loading && regularPosts.length > 0 && (
        <Section id="recent-posts" ariaLabel="Recent blog posts">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <span className="text-warning text-3xl">📝</span>
              {t("recent-posts.title") || "All Posts"}
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
                      {/* Cover Image */}
                      {post.coverImage && (
                        <div className="md:w-48 h-48 md:h-32 flex-shrink-0 overflow-hidden rounded-lg relative">
                          <Image 
                            src={post.coverImage} 
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      )}
                      
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
                          <span className="flex items-center gap-1 text-text-muted text-sm">
                            <FaHeart className="w-3 h-3 text-error" />
                            {post.reactionsCount}
                          </span>
                          <span className="flex items-center gap-1 text-text-muted text-sm">
                            <FaComment className="w-3 h-3" />
                            {post.commentsCount}
                          </span>
                        </header>

                        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-200">
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            {post.title}
                          </a>
                        </h3>

                        <p className="text-text-secondary mb-4 leading-relaxed line-clamp-2">
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

                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors group-hover:translate-x-1 duration-200"
                          >
                            {t("read-on-devto") || "Read on Dev.to"}
                            <FaExternalLinkAlt className="w-3 h-3" />
                          </a>
                        </footer>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))}
          </div>
        </Section>
      )}

      {/* Follow on Dev.to CTA */}
      <CTASection
        title={t("follow.title") || "Follow Me on Dev.to"}
        description={
          t("follow.description") ||
          "Get notified about new articles and join the discussion. I regularly share insights about web development, programming tips, and tech tutorials."
        }
        variant="secondary"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://dev.to/cakasuma"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="cta" size="md" className="inline-flex items-center gap-2">
              <SiDevdotto className="w-5 h-5" />
              {t("follow.button") || "Follow on Dev.to"}
            </Button>
          </a>
        </div>
        <p className="text-text-muted text-sm mt-4 max-w-md mx-auto">
          {t("follow.note") || "Join the community and never miss a post!"}
        </p>
      </CTASection>
    </PageLayout>
  );
}
