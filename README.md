# Proudly Open Source

**Discover open-source software worth using.**

Proudly Open Source is a community-driven directory for discovering, evaluating, and sharing open-source projects — free-to-use tools, developer utilities, frameworks, libraries, self-hosted apps, and open alternatives to paid software. The goal is simple: make great open-source work easy to find, easy to judge, and easy to champion.

---

## Why This Exists

Finding the _right_ open-source project is still unnecessarily hard. Search results are noisy, stars are a poor signal of quality, and most "alternatives" lists are thin affiliate pages. Proudly Open Source is built to fix that:

- **Curated, not scraped** — every listing is reviewed for accuracy, licensing, and hosting model.
- **Honest signals** — community upvotes, real comments, and verified ownership instead of inflated metrics.
- **Transparent monetization** — sponsorship only. No ads, no tracking pixels, no pay-to-rank.
- **Open by default** — the codebase, the data model, and the moderation process are all public.

---

## What You'll Find

- **Project listings** with categories, tags, licenses, pricing model, source availability, and hosting model (SaaS, self-hosted, or both).
- **Open alternatives** to popular proprietary products, mapped explicitly so users can judge fit.
- **Community signal** — upvotes and threaded comments so maintainers and users can talk directly.
- **Verified ownership** — maintainers can claim their project through GitHub repository verification, so the listing is backed by the people who actually build it.
- **Sponsorship, done honestly** — clearly labeled sponsored placements, never disguised as organic results.

---

## Design Principles

1. **Accuracy over volume.** A smaller, correct directory beats a large, stale one.
2. **Licensing clarity.** Every project shows its license and hosting model. "Open source" and "free to use" are not the same thing, and the UI should never imply they are.
3. **No dark patterns.** No fake urgency, no hidden sponsored rows, no vote manipulation.
4. **Maintainer-friendly.** Claiming a listing is fast, verification is transparent, and maintainers can respond to comments in the same thread.
5. **Privacy-respecting.** Hashed IPs at most, no third-party ad trackers, no cross-site profiling.

---

## Who It's For

- **Developers** evaluating a library, framework, or self-hosted tool before committing.
- **Teams** looking for open alternatives to paid SaaS products.
- **Maintainers** who want their project discovered by the right audience.
- **Sponsors** who want to support open-source discovery without relying on intrusive advertising.

---

## Status

Proudly Open Source is in active development. The foundation is in place — project scaffolding, quality tooling, and open-source infrastructure — and the product surface (listings, search, claiming, voting, comments, sponsorship) is being built out.

Work in progress and planned:

- Software discovery, search, and filtering
- Project listings with categories, tags, and licenses
- Open alternatives and recommendations
- Submission and claim flows for maintainers
- Community features (voting, threaded comments)

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Testing:** Vitest + Testing Library
- **Quality:** ESLint, Prettier, Husky, lint-staged, Commitlint (Conventional Commits)
- **CI:** GitHub Actions

---

## Deployment

The frontend, API and admin apps deploy to three separate Vercel projects. Each
one has a manual GitHub Actions workflow, so releases are always an explicit
choice rather than a side effect of a push.

See [docs/deployment.md](docs/deployment.md) for the Vercel project settings,
required repository secrets and the deploy steps.

---

## Contributing

Contributions are welcome — from bug reports and documentation fixes to new features and data corrections.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. It covers coding conventions, commit message format, branch strategy, and the review process.

Good first issues are labeled [`good first issue`](../../labels/good%20first%20issue) in the issue tracker. If you're unsure where to start, open a discussion and ask.

---

## Security

Please do **not** report security vulnerabilities in public GitHub issues. See [SECURITY.md](SECURITY.md) for the responsible disclosure process.

---

## Support

See [SUPPORT.md](SUPPORT.md) for guidance on where to ask questions, how to report bugs, and how feature requests are triaged.

---

## License

Released under the [MIT License](LICENSE). Dependency licenses and third-party assets remain the property of their respective owners and must be respected.

---

## Acknowledgements

Thanks to every contributor, maintainer, and user who helps make open source more discoverable — and to the projects that inspired this one.

---

**Proudly open source. Proudly discoverable.**
