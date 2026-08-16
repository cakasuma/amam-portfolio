/**
 * Single source of truth for the resume's structure.
 *
 * The resume page and the PDF route both render from these keys, so adding or
 * reordering a role means editing this file plus the locale JSON — never hand
 * renumbering markup in two places.
 */

export interface ExperienceEntry {
  key: string;
  /** Semantic accent used for the left border and company name on the page. */
  accent: "secondary" | "info" | "warning" | "success";
}

export const EXPERIENCE_ENTRIES: ExperienceEntry[] = [
  { key: "job1", accent: "secondary" },
  { key: "job2", accent: "info" },
  { key: "job3", accent: "info" },
  { key: "job4", accent: "warning" },
  { key: "job5", accent: "warning" },
  { key: "job6", accent: "success" },
];

export const HIGHLIGHT_KEYS = ["stat1", "stat2", "stat3", "stat4"];

export const CERTIFICATION_KEYS = ["cert1", "cert2", "cert3"];

/**
 * Skill groups. Labels come from translations; the tools themselves are proper
 * nouns and stay untranslated.
 */
export const SKILL_GROUPS = [
  {
    labelKey: "skills.frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Styled Components",
      "SCSS",
      "Gatsby",
    ],
  },
  {
    labelKey: "skills.mobile",
    items: [
      "React Native",
      "Redux",
      "Redux Saga",
      "MobX",
      "iOS & Android release pipelines",
    ],
  },
  {
    labelKey: "skills.backend",
    items: [
      "Node.js",
      "Express",
      "REST APIs",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "NGINX",
    ],
  },
  {
    labelKey: "skills.platform",
    items: ["AWS", "Cloudflare", "GitHub Actions CI/CD", "OutSystems", "Vercel"],
  },
  {
    labelKey: "skills.practice",
    items: [
      "OAuth2 / OpenID Connect",
      "Passkeys & WebAuthn",
      "MFA (TOTP)",
      "Trusted device & app integrity",
      "KYC & identity verification",
      "Design systems",
      "SLO / SLI & observability",
      "Disaster recovery",
      "Internationalisation (i18n)",
      "Testing (Jest, Mocha)",
      "Architecture & code review",
    ],
  },
  {
    labelKey: "skills.leadership",
    items: [
      "Team leadership",
      "Mentoring & coaching",
      "Cross-functional delivery",
      "Technical instruction",
      "Stakeholder management",
    ],
  },
];
