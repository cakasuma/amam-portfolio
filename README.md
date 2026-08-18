# amam-portfolio

Personal portfolio of **Mustofa Ghaleb Amami** — a bilingual (English /
Indonesian) Next.js site with a résumé, project portfolio, aggregated writing,
and a working contact form.

Live at [mustofaamami.dev](https://mustofaamami.dev).

## Features

- **Bilingual** — English and Indonesian, with the locale in the URL
- **Light and dark themes** — following the OS preference, overridable, persisted
- **Résumé as a page and a PDF** — both generated from the same content
- **Aggregated blog** — site-hosted posts and Dev.to articles in one list
- **Contact form** — validated, rate-limited, delivered by email
- **Server-rendered throughout** — no client-side animation runtime

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
i18next · next-themes · Resend · jsPDF · Vercel

## Quick start

```bash
git clone https://github.com/cakasuma/amam-portfolio.git
cd amam-portfolio
npm install
npm run dev
```

Open <http://localhost:3000>. Every environment variable is optional locally —
the app degrades rather than failing. See
[`docs/development.md`](docs/development.md) for the full setup.

## Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run verify     # All three — must pass before merge
```

## How this repository is organised

| Path | Contents |
| --- | --- |
| [`openspec/`](openspec/) | What the system does, and proposed changes |
| [`docs/`](docs/) | Architecture, development, ADRs, runbooks |
| [`.claude/skills/`](.claude/skills/) | Repeatable procedures, agent-invocable |
| [`AGENTS.md`](AGENTS.md) | Entry point for AI coding assistants |
| `src/` | Application code |

This project practises spec-driven development: behaviour is specified in
[`openspec/specs/`](openspec/specs/) before it is built, and changes are
proposed in [`openspec/changes/`](openspec/changes/) before they are
implemented. [`docs/adr/0005`](docs/adr/0005-spec-driven-development.md)
explains why.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md). In short: `npm run verify` must pass,
copy ships in both locales, and behaviour changes start with a proposal.

## Licence

MIT.

## Contact

- Email — [amammustofa@gmail.com](mailto:amammustofa@gmail.com)
- LinkedIn — [Mustofa Ghaleb Amami](https://www.linkedin.com/in/mustofa-ghaleb-amami)
- GitHub — [cakasuma](https://github.com/cakasuma)
- X — [@cakasuma](https://x.com/cakasuma)
