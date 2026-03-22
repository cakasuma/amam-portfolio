// Dev.to API types and utilities
// API Documentation: https://developers.forem.com/api

export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  tag_list: string[];
  slug: string;
  url: string;
  reading_time_minutes: number;
  cover_image: string | null;
  social_image: string | null;
  canonical_url: string;
  positive_reactions_count: number;
  comments_count: number;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  url: string;
  coverImage: string | null;
  featured: boolean;
  reactionsCount: number;
  commentsCount: number;
  isInternal?: boolean;
}

// Static blog posts that are hosted on this site (not from dev.to)
export const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    id: 0,
    title: "GitHub Copilot in 2025: Agents, PR Reviews & Coding on the Go",
    excerpt:
      "Copilot has grown far beyond autocomplete. Discover how Copilot Agents can autonomously complete multi-step tasks, how PR review comments help your whole team ship cleaner code, and how you can use Copilot from your phone — anywhere, anytime.",
    date: "2025-03-01T00:00:00Z",
    readTime: "10 min read",
    category: "AI Tools",
    tags: ["github-copilot", "copilot-agents", "ai", "productivity", "mobile", "code-review"],
    url: "/blog/copilot",
    coverImage: null,
    featured: true,
    reactionsCount: 0,
    commentsCount: 0,
    isInternal: true,
  },
  {
    id: 1,
    title: "Build & Ship a Real App From Your Phone — No Laptop Needed",
    excerpt:
      "You don't need a laptop to ship a real app. With Claude, GitHub Copilot, and Vercel, I built two live apps entirely from my phone. Here's the exact workflow.",
    date: "2026-03-21T00:00:00Z",
    readTime: "5 min read",
    category: "AI Tools",
    tags: ["claude", "copilot", "vercel", "mobile", "ai", "productivity"],
    url: "/blog/build-app-from-phone",
    coverImage: null,
    featured: true,
    reactionsCount: 0,
    commentsCount: 0,
    isInternal: true,
  },
];

const DEVTO_API_BASE = "https://dev.to/api";
const DEVTO_USERNAME = "cakasuma";

/**
 * Fetches articles from dev.to for the specified username
 */
export async function fetchDevToArticles(
  username: string = DEVTO_USERNAME,
  perPage: number = 30
): Promise<DevToArticle[]> {
  const response = await fetch(
    `${DEVTO_API_BASE}/articles?username=${username}&per_page=${perPage}`,
    {
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch dev.to articles: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Transforms dev.to articles to blog post format
 */
export function transformArticleToBlogPost(article: DevToArticle): BlogPost {
  // Determine category from tags (use first non-empty tag or default to "Development")
  const firstTag = article.tag_list.find(tag => tag && tag.trim().length > 0);
  const category = firstTag
    ? firstTag.charAt(0).toUpperCase() + firstTag.slice(1)
    : "Development";

  return {
    id: article.id,
    title: article.title,
    excerpt: article.description,
    date: article.published_at,
    readTime: `${article.reading_time_minutes} min read`,
    category,
    tags: article.tag_list,
    url: article.url,
    coverImage: article.cover_image || article.social_image,
    featured: article.positive_reactions_count > 50, // Featured if more than 50 reactions
    reactionsCount: article.positive_reactions_count,
    commentsCount: article.comments_count,
  };
}

/**
 * Fetches and transforms blog posts from dev.to, merged with static posts
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const articles = await fetchDevToArticles();
    const devToPosts = articles.map(transformArticleToBlogPost);
    return [...STATIC_BLOG_POSTS, ...devToPosts];
  } catch (error) {
    console.error("Error fetching blog posts from dev.to:", error);
    return [...STATIC_BLOG_POSTS];
  }
}
