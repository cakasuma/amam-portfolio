---
name: add-project
description: Add a project or subdomain web app to the portfolio page. Use when asked to showcase a new project, add something to the portfolio, or list a new web app on the site.
---

# Add a portfolio entry

Entries live in `src/app/[lng]/portfolio/page.tsx` in two separate lists. Pick
the right one:

- **`projects`** — case-study work, shown in Featured and Other Projects
  sections. Carries a `featured` flag.
- **Web apps** (ids in the 100s) — small tools hosted on `*.amammustofa.com`
  subdomains, shown in their own section above the projects.

## 1. Add the entry

```ts
{
  id: <next unused id in that list>,
  title: "Project Name",
  description: "What it does and who it is for. Two sentences, concrete.",
  image: "/projects/<slug>.svg",
  technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
  demoUrl: "https://…" ,   // or null
  githubUrl: "https://…",  // or null
  featured: false,         // `projects` list only
}
```

`demoUrl` and `githubUrl` are nullable by design. A `null` renders a disabled
"Private Project" / "Private Repo" control rather than omitting the button, so
card layouts stay uniform — that is specified behaviour, not an accident. Use
`null` rather than `"#"`.

## 2. Add the image

Project imagery is served from this site, never hot-linked. Add
`public/projects/<slug>.svg`, matching the visual weight of the existing files
there. If you only have a raster screenshot, add it as `.png` under the same
directory and reference it with the correct extension.

## 3. Check the technology names

Reuse the exact strings already used by other entries — `"Next.js"`, not
`"NextJS"`; `"Tailwind CSS"`, not `"TailwindCSS"`. These render as visible
chips, and inconsistency shows.

## 4. Descriptions and locales

The page's own chrome — headings, button labels, the "Featured" badge — is
translated through the `portfolio` namespace. Project titles and descriptions
are currently English-only, held in the source array. Adding an entry does not
require a translation change; changing the page's chrome does.

If you are asked to translate project descriptions, that is a behavioural change
to the capability — write a proposal with `openspec-propose` rather than
restructuring the array in passing.

## 5. Verify

```bash
npm run verify
```

Then load `/en/portfolio` and `/id/portfolio` and confirm:

- The entry appears in the intended section, and featured entries lead.
- The image renders at the same scale as its neighbours.
- Present links open in a new tab; absent ones render as disabled controls.

The behaviour this page must satisfy is specified in
`openspec/specs/portfolio-showcase/spec.md`.
