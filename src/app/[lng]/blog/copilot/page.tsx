"use client";
import { useTranslation } from "@/app/i18n/client";
import { motion } from "motion/react";
import Link from "next/link";
import { use } from "react";
import PageLayout, {
  PageHeader,
  Section,
} from "@/app/components/PageLayout";
import { Card, CardContent } from "@/components/ui";
import { FaCalendarAlt, FaClock, FaTag, FaArrowLeft } from "react-icons/fa";
import { SiGithub } from "react-icons/si";

interface CopilotBlogProps {
  params: Promise<{
    lng: string;
  }>;
}

export default function CopilotBlogPost({ params }: CopilotBlogProps) {
  const { lng } = use(params);
  const { t, ready } = useTranslation(lng, "blog");

  if (!ready) {
    return (
      <PageLayout maxWidth="4xl">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted">Loading...</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout maxWidth="4xl">
      {/* Back link */}
      <Section id="back-link" ariaLabel="Navigation" animate={false}>
        <Link
          href={`/${lng}/blog`}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-secondary transition-colors mb-4"
        >
          <FaArrowLeft className="w-4 h-4" />
          {t("back-to-blog") || "Back to Blog"}
        </Link>
      </Section>

      {/* Article Header */}
      <motion.header
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <PageHeader
          title="GitHub Copilot: Your AI Pair Programmer"
          subtitle="A Practical Guide to Supercharging Your Development Workflow"
          level={1}
          animate={false}
        />

        {/* Meta */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-text-muted text-sm mt-4">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" />
            February 1, 2025
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            8 min read
          </span>
          <span className="flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent border-accent/20 rounded-full border font-medium">
            <FaTag className="w-3 h-3" />
            AI Tools
          </span>
        </div>
      </motion.header>

      {/* Article Body */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-8 md:p-12 prose prose-invert max-w-none">
            <article className="space-y-8 text-text-secondary leading-relaxed">

              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <SiGithub className="w-6 h-6 text-secondary" />
                  What Is GitHub Copilot?
                </h2>
                <p>
                  GitHub Copilot is an AI-powered code completion tool developed by GitHub
                  in collaboration with OpenAI. It acts as your always-available pair
                  programmer, suggesting entire lines, functions, and even complete files
                  based on the context of what you are writing. Powered by OpenAI Codex,
                  Copilot has been trained on billions of lines of public code, giving it a
                  deep understanding of dozens of programming languages and frameworks.
                </p>
                <p className="mt-4">
                  Unlike traditional autocomplete, Copilot understands your intent from
                  natural language comments, function signatures, and surrounding code. This
                  makes it far more powerful — it can write boilerplate, generate test cases,
                  suggest documentation, and even explain unfamiliar code patterns.
                </p>
              </section>

              {/* Getting Started */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  🚀 Getting Started with GitHub Copilot
                </h2>
                <p>
                  Setting up Copilot is straightforward. You need an active GitHub Copilot
                  subscription (individuals can start with a free trial) and the Copilot
                  extension installed in your editor. It supports Visual Studio Code,
                  JetBrains IDEs, Neovim, and Visual Studio.
                </p>
                <ol className="list-decimal list-inside space-y-3 mt-4 pl-2">
                  <li>
                    <span className="font-semibold text-foreground">Sign up</span> — Go to{" "}
                    <a
                      href="https://github.com/features/copilot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline"
                    >
                      github.com/features/copilot
                    </a>{" "}
                    and activate your subscription.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Install the extension</span> — Search
                    for &quot;GitHub Copilot&quot; in your IDE&apos;s extension marketplace and install it.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Authenticate</span> — Sign in
                    with your GitHub account when prompted.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Start coding</span> — Copilot
                    activates automatically. Just write a comment describing what you want and
                    watch the suggestions appear.
                  </li>
                </ol>
              </section>

              {/* Key Features */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  ⭐ Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Inline Code Completion",
                      description:
                        "As you type, Copilot suggests the next line or entire function. Press Tab to accept a suggestion or cycle through alternatives with Alt+].",
                    },
                    {
                      title: "Natural Language to Code",
                      description:
                        "Write a comment like // fetch user data and return as JSON and Copilot generates the full implementation for you.",
                    },
                    {
                      title: "Test Generation",
                      description:
                        "Describe the function you want to test and Copilot can scaffold unit tests, saving significant time on test setup.",
                    },
                    {
                      title: "Copilot Chat",
                      description:
                        "Ask questions about your codebase, request refactors, or get explanations of complex logic — all within your editor.",
                    },
                    {
                      title: "Multi-language Support",
                      description:
                        "Works across JavaScript, TypeScript, Python, Go, Java, C#, Ruby, Rust, and many more languages and frameworks.",
                    },
                    {
                      title: "Context-aware Suggestions",
                      description:
                        "Copilot reads your open files to understand project conventions, variable names, and patterns, making suggestions more relevant.",
                    },
                  ].map((feature) => (
                    <div
                      key={feature.title}
                      className="p-4 bg-accent/5 rounded-lg border border-border"
                    >
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Practical Tips */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  💡 Practical Tips for Getting the Most Out of Copilot
                </h2>
                <ul className="space-y-4">
                  <li>
                    <h3 className="font-semibold text-foreground">Write descriptive comments first</h3>
                    <p>
                      The more context you give Copilot in your comments, the better its
                      suggestions will be. Instead of <code className="text-secondary bg-accent/10 px-1 rounded">// validate input</code>, try{" "}
                      <code className="text-secondary bg-accent/10 px-1 rounded">
                        // validate that email is a valid format and not empty
                      </code>
                      .
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-foreground">Use function signatures as hints</h3>
                    <p>
                      Writing a well-named function signature like{" "}
                      <code className="text-secondary bg-accent/10 px-1 rounded">
                        function calculateMonthlyInterest(principal, rate, months)
                      </code>{" "}
                      gives Copilot enough context to implement the body correctly.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-foreground">Always review suggestions</h3>
                    <p>
                      Copilot is a tool, not a replacement for your judgment. Always read the
                      generated code carefully for correctness, security issues, and alignment
                      with your project&apos;s standards before accepting it.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-foreground">Leverage Copilot Chat for refactoring</h3>
                    <p>
                      Select a block of code, open Copilot Chat, and ask it to refactor for
                      readability, improve performance, or add error handling. It explains
                      what it changed and why.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-foreground">Use it to learn new technologies</h3>
                    <p>
                      Working with an unfamiliar library? Ask Copilot Chat to explain code
                      patterns or generate example usage. It&apos;s like having a senior engineer
                      you can ask any question without hesitation.
                    </p>
                  </li>
                </ul>
              </section>

              {/* Real-world Benefits */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  📈 Real-world Productivity Impact
                </h2>
                <p>
                  According to GitHub&apos;s own research, developers using Copilot complete tasks
                  up to <span className="font-semibold text-foreground">55% faster</span> compared
                  to those who don&apos;t. The biggest gains come from:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4 pl-2">
                  <li>Eliminating boilerplate code (CRUD operations, form validation, API calls)</li>
                  <li>Faster onboarding to new codebases and frameworks</li>
                  <li>Reducing context-switching to look up documentation or Stack Overflow</li>
                  <li>Accelerating test coverage by auto-generating test cases</li>
                  <li>Speeding up code reviews via inline explanations from Copilot Chat</li>
                </ul>
                <p className="mt-4">
                  As a developer who has integrated Copilot into my daily workflow, I
                  personally find the largest wins in writing repetitive utility functions,
                  scaffolding new React components, and generating TypeScript interfaces from
                  JSON payloads — tasks that used to take minutes now take seconds.
                </p>
              </section>

              {/* Considerations */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  ⚠️ Things to Keep in Mind
                </h2>
                <ul className="space-y-3">
                  <li>
                    <span className="font-semibold text-foreground">Security:</span> Never accept
                    Copilot suggestions for authentication, cryptography, or sensitive data
                    handling without a thorough review. AI-generated code can introduce
                    vulnerabilities.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Licensing:</span> Be aware
                    of your organization&apos;s policy on AI-generated code. Copilot can sometimes
                    suggest code similar to open-source projects, which may have licensing
                    implications.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Over-reliance:</span> Use
                    Copilot as an accelerator, not a crutch. Understanding the code you ship
                    remains your responsibility.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Privacy:</span> Check your
                    Copilot settings — you can opt out of allowing GitHub to use your code
                    snippets to improve the model.
                  </li>
                </ul>
              </section>

              {/* Conclusion */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  🎯 Conclusion
                </h2>
                <p>
                  GitHub Copilot is one of the most impactful developer tools to emerge in
                  recent years. When used thoughtfully, it dramatically reduces the time spent
                  on repetitive coding tasks, helps you explore unfamiliar territory faster,
                  and keeps you in a productive flow state.
                </p>
                <p className="mt-4">
                  The key is to treat it as a pair programmer — one that is always available,
                  never judges your questions, and works incredibly fast — but still requires
                  your expertise to guide it and validate its output. Give it a try and see
                  how much more you can ship!
                </p>
              </section>

              {/* Tags */}
              <section>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {["github-copilot", "ai", "productivity", "developer-tools"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-accent/10 text-accent border-accent/20 rounded-full text-sm border font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </section>

            </article>
          </CardContent>
        </Card>
      </motion.div>

      {/* Back to blog link */}
      <Section id="bottom-nav" ariaLabel="Bottom navigation" animate={false} className="mt-8">
        <Link
          href={`/${lng}/blog`}
          className="inline-flex items-center gap-2 text-text-secondary hover:text-secondary transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" />
          {t("back-to-blog") || "Back to Blog"}
        </Link>
      </Section>
    </PageLayout>
  );
}
