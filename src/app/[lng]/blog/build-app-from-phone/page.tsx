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
  FaRocket,
  FaCheckCircle,
  FaTerminal,
} from "react-icons/fa";
import { SiGithub, SiVercel } from "react-icons/si";

interface BuildAppBlogProps {
  params: Promise<{
    lng: string;
  }>;
}

// Visual mockup: Claude on mobile browser generating a project
function ClaudeMockup() {
  return (
    <div className="flex justify-center my-6">
      <div className="w-72 rounded-3xl overflow-hidden border-4 border-border shadow-2xl">
        {/* Phone status bar */}
        <div className="bg-[#1c1c1e] px-4 pt-3 pb-1 flex justify-between text-[10px] text-[#ebebf5]/60">
          <span>9:41</span>
          <span>●●●</span>
        </div>
        {/* Browser chrome */}
        <div className="bg-[#1c1c1e] px-3 py-2 border-b border-white/10">
          <div className="bg-[#2c2c2e] rounded-lg px-3 py-1.5 text-[10px] text-[#ebebf5]/50 text-center">
            claude.ai
          </div>
        </div>
        {/* Chat UI */}
        <div className="bg-[#0d1117] px-3 py-3 space-y-3 min-h-[280px]">
          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-[#7c3aed] text-white text-xs rounded-2xl rounded-tr-sm px-3 py-2 max-w-[85%]">
              Build me a calculator app with a clean UI. Use HTML, CSS, and vanilla JS. Mobile-friendly.
            </div>
          </div>
          {/* Claude response */}
          <div className="flex gap-2 items-start">
            <div className="w-6 h-6 rounded-full bg-[#7c3aed]/20 border border-[#7c3aed]/40 flex-shrink-0 flex items-center justify-center mt-0.5 text-[10px] font-bold text-[#a78bfa]">
              C
            </div>
            <div className="bg-[#161b22] text-[#e6edf3] text-xs rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%] space-y-1 border border-[#30363d]">
              <p>Here&apos;s a complete calculator app:</p>
              <div className="bg-[#0d1117] rounded-lg p-2 font-mono text-[10px] text-[#a5d6ff] border border-[#30363d] mt-1">
                <p className="text-[#ff7b72]">📁 calculator/</p>
                <p className="pl-2 text-[#e6edf3]">├── index.html</p>
                <p className="pl-2 text-[#e6edf3]">├── style.css</p>
                <p className="pl-2 text-[#e6edf3]">└── script.js</p>
              </div>
              <p className="text-[#ebebf5]/60 text-[10px] mt-1">All files ready to paste into GitHub ↗</p>
            </div>
          </div>
        </div>
        {/* Input bar */}
        <div className="bg-[#1c1c1e] px-3 py-2 flex items-center gap-2 border-t border-white/10">
          <div className="flex-1 bg-[#2c2c2e] rounded-full px-3 py-1.5 text-xs text-[#ebebf5]/40">
            Message Claude…
          </div>
        </div>
      </div>
    </div>
  );
}

// Visual mockup: GitHub Copilot Agent updating the project
function CopilotAgentMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-border my-6 shadow-lg">
      {/* Window chrome */}
      <div className="bg-accent/20 px-4 py-2 flex items-center gap-2 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-error/70" />
        <span className="w-3 h-3 rounded-full bg-warning/70" />
        <span className="w-3 h-3 rounded-full bg-success/70" />
        <span className="ml-3 text-xs text-text-muted font-mono flex items-center gap-1.5">
          <FaTerminal className="w-3 h-3" />
          GitHub Copilot Agent — Browser
        </span>
      </div>
      {/* Terminal body */}
      <div className="bg-[#1e1e1e] p-5 font-mono text-sm space-y-1.5">
        <p className="text-text-muted text-xs mb-3">
          # Prompt: &quot;Add a calculation history panel on the right side&quot;
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-white">Reading</span>{" "}
          <span className="text-[#ce9178]">index.html</span>
          <span className="text-[#808080]">…</span>
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-white">Reading</span>{" "}
          <span className="text-[#ce9178]">script.js</span>
          <span className="text-[#808080]">…</span>
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-white">Adding history panel to</span>{" "}
          <span className="text-[#ce9178]">index.html</span>
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-white">Updating history logic in</span>{" "}
          <span className="text-[#ce9178]">script.js</span>
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-white">Styling panel in</span>{" "}
          <span className="text-[#ce9178]">style.css</span>
        </p>
        <p>
          <span className="text-[#4ec9b0]">●</span>{" "}
          <span className="text-[#9cdcfe]">Copilot</span>
          <span className="text-[#808080]"> › </span>
          <span className="text-[#4ec9b0]">✓ Committed — 3 files changed, 47 insertions(+)</span>
        </p>
        <p className="mt-3 text-[#608b4e] text-xs">
          # Done — history panel is live on your preview URL
        </p>
      </div>
    </div>
  );
}

// Visual mockup: Vercel deployment success
function VercelMockup() {
  return (
    <div className="rounded-xl overflow-hidden border border-border my-6 shadow-lg">
      {/* Header bar */}
      <div className="bg-accent/20 px-4 py-2.5 flex items-center gap-2 border-b border-border">
        <SiVercel className="w-4 h-4 text-text-muted" />
        <span className="text-xs text-text-muted font-mono">
          vercel.com — calculator
        </span>
        <span className="ml-auto px-2 py-0.5 bg-success/20 text-success text-xs rounded-full font-medium border border-success/30">
          ● Ready
        </span>
      </div>
      {/* Deployment details */}
      <div className="bg-card p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Production Deployment</p>
            <p className="text-xs text-text-muted mt-0.5">Triggered by push to main</p>
          </div>
          <span className="text-xs text-text-muted">1m 12s ago</span>
        </div>
        {/* Build steps */}
        <div className="space-y-2 font-mono text-xs">
          {[
            { label: "Cloning repository", done: true },
            { label: "Installing dependencies", done: true },
            { label: "Building project", done: true },
            { label: "Deploying to edge network", done: true },
          ].map((step) => (
            <div key={step.label} className="flex items-center gap-2 text-text-secondary">
              <FaCheckCircle className="w-3 h-3 text-success flex-shrink-0" />
              <span>{step.label}</span>
            </div>
          ))}
        </div>
        {/* Preview URL */}
        <div className="bg-accent/5 border border-border rounded-lg p-3">
          <p className="text-xs text-text-muted mb-1">Production URL</p>
          <p className="text-sm font-mono text-secondary">
            calculator.amammustofa.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BuildAppBlogPost({ params }: BuildAppBlogProps) {
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
          title="Build & Ship a Real App From Your Phone — No Laptop Needed"
          subtitle="You don't need a laptop to ship a real app. With Claude, GitHub Copilot, and Vercel, I built two live apps entirely from my phone. Here's the exact workflow."
          level={1}
          animate={false}
        />
        {/* Meta */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-text-muted text-sm mt-4">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="w-3 h-3" />
            March 2026
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="w-3 h-3" />
            5 min read
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
                  <FaMobileAlt className="w-6 h-6 text-secondary" />
                  The Old Way Was Gated
                </h2>
                <p>
                  For most of computing history, building software required a dedicated machine. You needed a laptop, a
                  development environment set up just right, a code editor, a terminal, package managers — and hours of
                  configuration before you ever wrote a single line of your actual idea.
                </p>
                <p className="mt-4">
                  That&apos;s a high bar. And it kept a lot of people out. That bar just got a lot lower.
                </p>
                <p className="mt-4">
                  I shipped two live apps from my phone. No laptop. No local dev environment. No IDE. Just me, my phone,
                  and three tools: <strong className="text-foreground">Claude</strong>,{" "}
                  <strong className="text-foreground">GitHub Copilot</strong>, and{" "}
                  <strong className="text-foreground">Vercel</strong>.
                </p>
              </section>

              {/* The Three Tools */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <FaRocket className="w-6 h-6 text-secondary" />
                  The Three Tools (And What Each One Does)
                </h2>
                <p>
                  Think of this as a three-person team, except each &quot;person&quot; is an AI tool — and they each
                  have a very specific job.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  {[
                    {
                      icon: "🤖",
                      title: "Claude",
                      role: "Starts the project",
                      description:
                        "Describe what you want in plain English. Claude writes the full boilerplate: file structure, code, configuration, everything. No setup, no scaffolding — just a complete starting point.",
                    },
                    {
                      icon: "⚡",
                      title: "GitHub Copilot",
                      role: "Handles updates",
                      description:
                        "Once your project exists, Copilot Agent reads your entire codebase and makes changes based on plain-language instructions. It edits the right files, commits, and pushes — all from your browser.",
                    },
                    {
                      icon: "🚀",
                      title: "Vercel",
                      role: "Previews & ships",
                      description:
                        "Connect your GitHub repo to Vercel once, and every push triggers an automatic deployment. Real preview URL to share and test. When you're happy, deploy to production with a tap.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-4 bg-accent/5 rounded-lg border border-border"
                    >
                      <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        <span>{item.icon}</span>
                        {item.title}
                      </h3>
                      <p className="text-xs text-secondary font-medium mb-2">{item.role}</p>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4">
                  That&apos;s the whole stack. Three tools, three clear roles, zero laptop.
                </p>
              </section>

              {/* Step 1: Claude */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="text-secondary text-xl font-mono">01</span>
                  Start with Claude
                </h2>
                <p>
                  Open{" "}
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary underline"
                  >
                    claude.ai
                  </a>{" "}
                  on your phone&apos;s browser. Write something like:{" "}
                  <em>
                    &quot;Build me a calculator app with a clean UI. Use HTML, CSS, and vanilla JavaScript. Keep it
                    simple and mobile-friendly.&quot;
                  </em>
                </p>
                <ClaudeMockup />
                <p>
                  Claude responds with a complete project. Copy the files into your GitHub repository — you can create
                  one and paste files right in the browser at github.com. No terminal, no clone, no setup.
                </p>
              </section>

              {/* Step 2: Copilot */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="text-secondary text-xl font-mono">02</span>
                  Iterate with Copilot Agent
                </h2>
                <p>
                  Open GitHub Copilot in your browser with Agent mode turned on. Point it at your repo. Now make
                  requests:{" "}
                  <em>&quot;Add a calculation history panel on the side.&quot;</em> or{" "}
                  <em>&quot;Make the buttons larger on mobile.&quot;</em>
                </p>
                <CopilotAgentMockup />
                <p>
                  Copilot reads your existing code, makes the right edits, and commits them. You don&apos;t touch a
                  single file manually. Repeat this as many times as you need — each iteration is just a sentence.
                </p>
              </section>

              {/* Step 3: Vercel */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <span className="text-secondary text-xl font-mono">03</span>
                  Preview and Ship with Vercel
                </h2>
                <p>
                  Every commit you push triggers a build on Vercel. You get a preview URL — a real, live, shareable
                  link — within a minute or two. Test it on your phone. Send it to a friend. When it&apos;s ready,
                  promote it to your production domain.
                </p>
                <VercelMockup />
                <p>
                  That&apos;s the full loop. Claude starts it. Copilot refines it. Vercel ships it. All from your phone.
                </p>
              </section>

              {/* Real Proof */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <SiGithub className="w-6 h-6 text-secondary" />
                  Real Proof: Apps I Built This Way
                </h2>
                <p>
                  I didn&apos;t just theorize about this workflow — I used it to ship two real apps.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  {[
                    {
                      url: "https://calculator.amammustofa.com",
                      domain: "calculator.amammustofa.com",
                      description:
                        "A fully functional calculator app with calculation history. Described it to Claude, had Copilot add the history feature, and Vercel had it live at my domain in under an hour. All from my phone.",
                    },
                    {
                      url: "https://hijriah.amammustofa.com",
                      domain: "hijriah.amammustofa.com",
                      description:
                        "An Islamic Hijriah ↔ Gregorian calendar converter. A real utility app, with real users, built without ever opening a laptop.",
                    },
                  ].map((app) => (
                    <div
                      key={app.domain}
                      className="p-4 bg-accent/5 rounded-lg border border-border"
                    >
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-mono text-secondary underline font-semibold"
                      >
                        {app.domain}
                      </a>
                      <p className="text-sm mt-2">{app.description}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4">Both apps are live right now. Both were built entirely on mobile.</p>
              </section>

              {/* Why It Matters */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  💡 Why This Matters
                </h2>
                <p>
                  The common narrative is that AI tools make existing developers faster. That&apos;s true. But the more
                  interesting thing is what happens at the edges — when people who couldn&apos;t build before suddenly
                  can.
                </p>
                <p className="mt-4">
                  You don&apos;t need a CS degree. You don&apos;t need to memorize syntax. You don&apos;t even need a
                  laptop. If you have an idea and a phone, you have a development environment.
                </p>
                <p className="mt-4">
                  The bottleneck used to be access to tools and knowledge. Now it&apos;s just whether you have something
                  worth building. That&apos;s a meaningful shift.
                </p>
              </section>

              {/* Try It Tonight */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  🚀 Try It Tonight
                </h2>
                <p>Here&apos;s a 30-minute starting point:</p>
                <ul className="space-y-5 mt-4">
                  <li>
                    <h3 className="font-semibold text-foreground">
                      1. Open Claude and describe your app
                    </h3>
                    <p>
                      Go to{" "}
                      <a
                        href="https://claude.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary underline"
                      >
                        claude.ai
                      </a>{" "}
                      on your phone. Describe an app you&apos;ve been meaning to build. Be specific about what it should
                      do and look like. Copy Claude&apos;s output into a new GitHub repo — create one and paste files
                      right in the browser.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-foreground">
                      2. Use Copilot Agent to iterate
                    </h3>
                    <p>
                      Open{" "}
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary underline"
                      >
                        github.com
                      </a>{" "}
                      and enable GitHub Copilot with Agent mode. Navigate to your repo. Ask Copilot to make a change,
                      add a feature, or fix something. Let it do the work and commit.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-foreground">
                      3. Deploy on Vercel
                    </h3>
                    <p>
                      Go to{" "}
                      <a
                        href="https://vercel.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary underline"
                      >
                        vercel.com
                      </a>{" "}
                      and connect your repo. Import it, set your domain if you have one, and deploy. Your app will be
                      live at a real URL in minutes.
                    </p>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-secondary/5 border border-secondary/20 rounded-lg">
                  <p className="text-foreground font-semibold">
                    Your phone is already a development environment. You just didn&apos;t know it yet.
                  </p>
                </div>
              </section>

              {/* Tags */}
              <section>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                  {["claude", "copilot", "vercel", "mobile", "ai", "productivity"].map(
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
