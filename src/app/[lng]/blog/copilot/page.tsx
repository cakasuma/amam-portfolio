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
import {
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaArrowLeft,
  FaMobileAlt,
  FaRobot,
  FaCodeBranch,
  FaCommentDots,
  FaCheckCircle,
  FaTerminal,
} from "react-icons/fa";
import { SiGithub } from "react-icons/si";

interface CopilotBlogProps {
  params: Promise<{
    lng: string;
  }>;
}

// Visual mockup: Copilot Agent terminal output
function AgentMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-border my-6 shadow-lg">
      {/* Window chrome */}
      <div className="bg-accent/20 px-4 py-2 flex items-center gap-2 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-error/70" />
        <span className="w-3 h-3 rounded-full bg-warning/70" />
        <span className="w-3 h-3 rounded-full bg-success/70" />
        <span className="ml-3 text-xs text-text-muted font-mono flex items-center gap-1.5">
          <FaTerminal className="w-3 h-3" />
          Copilot Agent — VS Code
        </span>
      </div>
      {/* Terminal body */}
      <div className="bg-[#1e1e1e] p-5 font-mono text-sm space-y-1.5">
        <p className="text-text-muted text-xs mb-3">
          # Prompt: &quot;Add input validation to the registration form and write tests&quot;
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-white">Reading</span>{" "}
          <span className="text-[#ce9178]">src/components/RegistrationForm.tsx</span>
          <span className="text-[#808080]">…</span>
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-white">Writing validation logic to</span>{" "}
          <span className="text-[#ce9178]">RegistrationForm.tsx</span>
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-white">Creating</span>{" "}
          <span className="text-[#ce9178]">src/components/__tests__/RegistrationForm.test.tsx</span>
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-white">Running</span>{" "}
          <span className="text-[#dcdcaa]">npm test</span>
          <span className="text-[#808080]">…</span>
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-[#4ec9b0]">✓ All 8 tests passed</span>
        </p>
        <p className="mt-3 text-[#608b4e] text-xs">
          # Done — 3 files changed, 94 insertions(+), 2 deletions(-)
        </p>
      </div>
    </div>
  );
}

// Visual mockup: GitHub PR review comment from Copilot
function PRCommentMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-border my-6 shadow-lg">
      {/* PR header bar */}
      <div className="bg-accent/20 px-4 py-2.5 flex items-center gap-2 border-b border-border">
        <FaCodeBranch className="w-4 h-4 text-text-muted" />
        <span className="text-xs text-text-muted font-mono">
          feature/user-registration ← main
        </span>
        <span className="ml-auto px-2 py-0.5 bg-secondary/20 text-secondary text-xs rounded-full font-medium border border-secondary/30">
          Open
        </span>
      </div>
      {/* PR comment thread */}
      <div className="bg-card p-4 space-y-3">
        {/* Copilot review comment */}
        <div className="flex gap-3">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#24292f] flex items-center justify-center">
            <SiGithub className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-foreground">
                github-copilot
              </span>
              <span className="px-1.5 py-0.5 bg-secondary/20 text-secondary text-xs rounded font-medium">
                AI
              </span>
              <span className="text-xs text-text-muted">just now</span>
            </div>
            <div className="bg-accent/5 border border-border rounded-lg p-3 text-sm text-text-secondary space-y-2">
              <p>
                <span className="font-semibold text-foreground">
                  Potential issue on line 42
                </span>{" "}
                — The email validation regex does not account for internationalized domain names (IDNs). Consider using a library like{" "}
                <code className="text-secondary bg-accent/10 px-1 rounded text-xs">
                  validator.js
                </code>{" "}
                for more robust validation.
              </p>
              <div className="bg-[#1e1e1e] rounded p-2 font-mono text-xs">
                <p className="text-[#f44747]">
                  - const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                </p>
                <p className="text-[#4ec9b0]">
                  + import validator from &apos;validator&apos;;
                </p>
                <p className="text-[#4ec9b0]">
                  + if (!validator.isEmail(email)) return false;
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button className="text-xs text-text-muted hover:text-secondary transition-colors flex items-center gap-1">
                <FaCheckCircle className="w-3 h-3" /> Apply suggestion
              </button>
              <button className="text-xs text-text-muted hover:text-secondary transition-colors flex items-center gap-1">
                <FaCommentDots className="w-3 h-3" /> Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Visual mockup: GitHub Mobile Copilot Chat
function MobileMockup() {
  return (
    <div className="flex justify-center my-6">
      <div className="w-64 rounded-3xl overflow-hidden border-4 border-border shadow-2xl">
        {/* Phone status bar */}
        <div className="bg-[#1c1c1e] px-4 pt-3 pb-1 flex justify-between text-[10px] text-[#ebebf5]/60">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        {/* App header */}
        <div className="bg-[#1c1c1e] px-3 py-2 flex items-center gap-2 border-b border-white/10">
          <SiGithub className="w-5 h-5 text-white" />
          <span className="text-white text-sm font-semibold">Copilot</span>
          <FaMobileAlt className="w-3.5 h-3.5 text-white/50 ml-auto" />
        </div>
        {/* Chat messages */}
        <div className="bg-[#000000] px-3 py-3 space-y-3 min-h-[260px]">
          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-[#0A84FF] text-white text-xs rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
              What does this PR change?
            </div>
          </div>
          {/* Copilot response */}
          <div className="flex gap-2 items-start">
            <div className="w-6 h-6 rounded-full bg-[#24292f] flex-shrink-0 flex items-center justify-center mt-0.5">
              <SiGithub className="w-3 h-3 text-white" />
            </div>
            <div className="bg-[#1c1c1e] text-[#ebebf5] text-xs rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%] space-y-1">
              <p>
                This PR adds email validation to the registration form and includes 8 unit tests.
              </p>
              <p className="text-[#ebebf5]/60">
                3 files changed · +94 −2
              </p>
            </div>
          </div>
          {/* User follow-up */}
          <div className="flex justify-end">
            <div className="bg-[#0A84FF] text-white text-xs rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
              Are there any concerns?
            </div>
          </div>
          {/* Copilot response 2 */}
          <div className="flex gap-2 items-start">
            <div className="w-6 h-6 rounded-full bg-[#24292f] flex-shrink-0 flex items-center justify-center mt-0.5">
              <SiGithub className="w-3 h-3 text-white" />
            </div>
            <div className="bg-[#1c1c1e] text-[#ebebf5] text-xs rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
              The regex on line 42 may miss internationalized domains. I&apos;ve left a review comment about it.
            </div>
          </div>
        </div>
        {/* Input bar */}
        <div className="bg-[#1c1c1e] px-3 py-2 flex items-center gap-2">
          <div className="flex-1 bg-[#2c2c2e] rounded-full px-3 py-1.5 text-xs text-[#ebebf5]/40">
            Ask Copilot…
          </div>
        </div>
      </div>
    </div>
  );
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
          title="GitHub Copilot in 2025: Agents, PR Reviews & Coding on the Go"
          subtitle="How Copilot grew from a smart autocomplete into an autonomous teammate — and why you can use it anywhere, including your phone"
          level={1}
          animate={false}
        />

        {/* Meta */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-text-muted text-sm mt-4">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" />
            March 2025
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            10 min read
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
            <article className="space-y-10 text-text-secondary leading-relaxed">

              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <SiGithub className="w-6 h-6 text-secondary" />
                  From Autocomplete to Autonomous Agent
                </h2>
                <p>
                  When GitHub Copilot first launched, it felt like a very clever
                  autocomplete — one that could finish your function after reading a comment.
                  That was already useful enough. But over the past year, Copilot has quietly
                  grown into something much more interesting: an AI that can take on entire
                  tasks end-to-end, leave review comments on your PRs like a senior teammate,
                  and even follow you away from your desk via the GitHub mobile app.
                </p>
                <p className="mt-4">
                  If your mental model of Copilot is still &quot;it fills in my code as I type&quot;,
                  this post is for you. Let me walk through the three changes that have made
                  Copilot genuinely indispensable in my day-to-day workflow.
                </p>
              </section>

              {/* Copilot Agents */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <FaRobot className="w-6 h-6 text-secondary" />
                  Copilot Agents: Let It Do the Whole Thing
                </h2>
                <p>
                  Agent mode is the headline feature of modern Copilot. Instead of
                  suggesting the next line, you give Copilot a goal — &quot;add input validation
                  to the registration form and write tests for it&quot; — and it figures out the
                  steps on its own: reading the relevant files, making the changes, running
                  tests, and fixing failures until everything is green.
                </p>

                <AgentMockup />

                <p>
                  What makes this feel different from just pasting code into Chat is that
                  Copilot operates on your actual workspace. It reads the files it needs,
                  edits them, runs your terminal commands, and iterates. It&apos;s the difference
                  between asking someone for advice and handing them the keyboard.
                </p>
                <p className="mt-4">
                  Agent mode is available today in VS Code (as &quot;Copilot Edits&quot; and the
                  experimental agent panel), JetBrains IDEs, and increasingly through GitHub
                  itself for Copilot Workspace. The sweet spot for agents right now:
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      icon: "🧪",
                      title: "Writing test suites",
                      description:
                        "Give it a module and ask for full coverage — it reads the code, writes tests, runs them, and fixes failures.",
                    },
                    {
                      icon: "♻️",
                      title: "Refactoring",
                      description:
                        "Rename a concept across the whole codebase, migrate to a new API, or split a large file — without touching every file yourself.",
                    },
                    {
                      icon: "🐛",
                      title: "Bug fixing",
                      description:
                        "Paste a failing test or error log. Copilot traces the cause, makes a fix, and confirms the test passes.",
                    },
                    {
                      icon: "📄",
                      title: "Boilerplate generation",
                      description:
                        "Scaffold a new feature end-to-end: component, service, types, and tests — all consistent with your existing patterns.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-4 bg-accent/5 rounded-lg border border-border"
                    >
                      <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        <span>{item.icon}</span> {item.title}
                      </h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4">
                  One thing I&apos;ve learned: be specific about the outcome you want, not the
                  steps. &quot;Add form validation&quot; is fine; &quot;use Zod, keep existing field names,
                  and make sure error messages are inline&quot; is much better. The more
                  constraints you give it, the less back-and-forth you need.
                </p>
              </section>

              {/* PR Comments */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <FaCodeBranch className="w-6 h-6 text-secondary" />
                  Copilot on Pull Requests: Your Always-Available Reviewer
                </h2>
                <p>
                  One of the most underrated Copilot features is its ability to review
                  pull requests. Once enabled for a repository, Copilot automatically
                  reviews every PR and posts inline comments — the same way a human
                  reviewer would — pointing out potential bugs, suggesting improvements,
                  and flagging anything that looks off.
                </p>

                <PRCommentMockup />

                <p>
                  The comments appear in the standard GitHub PR review interface. You can
                  respond to them, apply the suggested one-line fixes directly from the diff
                  view, or dismiss them just like any other review comment. There&apos;s no
                  separate workflow to learn.
                </p>
                <p className="mt-4">
                  Beyond line-level review comments, Copilot also generates a plain-language
                  PR summary at the top — a quick paragraph explaining what changed and why —
                  which is handy when you&apos;re reviewing someone else&apos;s work and want
                  context before you dive into the diff.
                </p>

                <div className="mt-4 p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <FaCommentDots className="w-4 h-4 text-secondary" />
                    What Copilot PR reviews catch well
                  </h3>
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                      Edge cases the author missed (empty arrays, null values, boundary conditions)
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                      Inconsistency with patterns used elsewhere in the codebase
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                      Security concerns in input handling or data access
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                      Missing error handling or inadequate logging
                    </li>
                    <li className="flex items-start gap-2">
                      <FaCheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                      Opportunities to simplify logic or remove duplication
                    </li>
                  </ul>
                </div>
                <p className="mt-4">
                  It is not a replacement for human review — it occasionally flags things that
                  are intentional, and it won&apos;t catch issues that require deep domain
                  knowledge. But as a first pass that runs before anyone else even looks at
                  the PR, it catches a surprising amount. On my team, the number of review
                  rounds before merge dropped noticeably after we enabled it.
                </p>
              </section>

              {/* Mobile */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <FaMobileAlt className="w-6 h-6 text-secondary" />
                  Copilot on Mobile: Code Review in Your Pocket
                </h2>
                <p>
                  This one surprised me more than I expected. GitHub&apos;s mobile app (iOS and
                  Android) now has Copilot Chat built right in. That means you can pull up
                  a PR on your phone during your commute and ask Copilot to summarise the
                  changes, explain a confusing diff, or tell you if there are any concerns
                  — all in plain English, without needing to mentally parse the raw diff on
                  a small screen.
                </p>

                <MobileMockup />

                <p>
                  You can chat with Copilot about the specific PR you&apos;re looking at, ask it
                  general questions about the repository, or even explore files. It&apos;s the same
                  model as the desktop, just in a conversational format that works well
                  on a phone.
                </p>
                <p className="mt-4">
                  In practice, I use it mostly for three things away from my desk:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-2 pl-2 text-sm">
                  <li>
                    <span className="font-semibold text-foreground">Quick PR triage</span> — checking
                    if a PR is ready to review or still needs work, without opening a laptop
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Async code questions</span> — asking
                    about a piece of code someone mentioned in a message, so I can respond
                    with something useful
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Catching up after meetings</span> — getting
                    a plain-English summary of what changed while I was in calls
                  </li>
                </ul>
                <p className="mt-4">
                  To enable it: update the GitHub app on iOS or Android, navigate to any
                  repository or pull request, and look for the Copilot icon in the toolbar.
                  Sign in with your GitHub account that has Copilot enabled and you&apos;re ready.
                </p>
              </section>

              {/* Practical Tips */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  💡 Tips That Actually Help
                </h2>
                <ul className="space-y-5">
                  <li>
                    <h3 className="font-semibold text-foreground">
                      Be specific about constraints, not just goals
                    </h3>
                    <p>
                      &quot;Add error handling&quot; gives Copilot too much freedom. &quot;Add error handling
                      using our existing{" "}
                      <code className="text-secondary bg-accent/10 px-1 rounded text-sm">
                        AppError
                      </code>{" "}
                      class, log with the existing logger, and return a 422 for validation
                      errors&quot; gives it exactly what it needs.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-foreground">
                      Ask agents to explain what they did
                    </h3>
                    <p>
                      After an agent finishes a task, follow up with &quot;explain the changes you
                      made&quot;. It forces you to actually review the output and often surfaces
                      decisions that need your input.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-foreground">
                      Treat PR review comments as a starting point
                    </h3>
                    <p>
                      Copilot&apos;s review comments are suggestions, not verdicts. Use them to
                      catch things you might have missed, but dismiss anything that doesn&apos;t
                      apply to your context. Over time you get a feel for which categories
                      of comment are reliable for your codebase.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-foreground">
                      Use mobile Copilot for async, not deep work
                    </h3>
                    <p>
                      The mobile experience shines for quick questions and triage. For anything
                      requiring actual editing or multi-turn investigation, wait until you&apos;re
                      back at your desk with the full IDE experience.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-foreground">
                      Always review before merging
                    </h3>
                    <p>
                      Agent-generated code is often surprisingly good, but it is not infallible.
                      Read through changes before committing them, especially in security-sensitive
                      areas. Copilot moves fast — your job is to make sure it moved in the right
                      direction.
                    </p>
                  </li>
                </ul>
              </section>

              {/* Considerations */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  ⚠️ Things Worth Knowing
                </h2>
                <ul className="space-y-3">
                  <li>
                    <span className="font-semibold text-foreground">Agents can go sideways:</span>{" "}
                    Occasionally an agent will loop on a failing test or make a change that
                    breaks something else. Set a time limit in your head — if it&apos;s been more
                    than a few iterations without progress, take back the keyboard.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">PR reviews are noisy at first:</span>{" "}
                    When you first enable Copilot reviews on a large codebase, it will flag
                    patterns that are actually fine for your project. Spend 20 minutes on
                    the first few PRs dismissing and categorising — it gets much cleaner quickly.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Mobile is read-heavy by design:</span>{" "}
                    The mobile Copilot is great for understanding and discussion, not for
                    large-scale edits. Don&apos;t try to use it to write features on your phone —
                    that&apos;s not the use case it was built for.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Security always needs human eyes:</span>{" "}
                    For authentication flows, cryptography, or data access, don&apos;t rely solely
                    on Copilot&apos;s review comment or agent output. These areas need careful human
                    review regardless of what AI suggests.
                  </li>
                </ul>
              </section>

              {/* Conclusion */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  🎯 Final Thoughts
                </h2>
                <p>
                  The version of Copilot in 2025 is meaningfully different from the one that
                  launched. Agents let you delegate whole tasks rather than individual lines.
                  PR review integration means every pull request gets a first-pass review
                  before any human looks at it. And mobile support means you can stay
                  informed and answer questions about your codebase from anywhere.
                </p>
                <p className="mt-4">
                  None of these features replace the judgment, taste, or domain knowledge
                  that good engineers bring — but they do eliminate a lot of the friction
                  that gets in the way of shipping. If you haven&apos;t revisited Copilot recently,
                  it&apos;s worth a fresh look.
                </p>
              </section>

              {/* Tags */}
              <section>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {["github-copilot", "copilot-agents", "ai", "productivity", "mobile", "code-review"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-accent/10 text-accent border-accent/20 rounded-full text-sm border font-medium"
                      >
                        #{tag}
                      </span>
                    )
                  )}
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
