# BhavIshya Invites

**BhavIshya Invites** is a small, client-side tool for creating personalized wedding
invitation links for [Bhavishya's wedding](https://bhavishya-invites.vercel.app/). Pick
the invitation side, enter the guest's name, choose an invitation package, and get a
ready-to-share link in seconds — no accounts, no backend.

> **Live site:** https://bhavishya-invites.vercel.app/

## What it does

- **Pick the invitation side** — Groom (default) or Bride.
- **Enter the guest's name** — trimmed and validated, with Unicode-safe URL encoding.
- **Choose an invitation package** — one of four curated options, each mapping to the
  wedding functions it covers:
  - **Mehfil** — All wedding functions
  - **Mango** — Haldi only
  - **Lotus** — Reception at Velvet Leaf
  - **Sitar** — Anand Karaj + Reception
- **Generate a personalized link** — built on the deployed invite base URL, with guest
  name and package encoded as query parameters (spaces serialized as `%20`, spaces and
  package codes kept lowercase and in a consistent order).
- **Copy and share** — a centered dialog presents the generated link with a one-tap
  **Copy Invite Link** button (Clipboard API, with a legacy/manual fallback), plus an
  **Open link** shortcut to preview the invitation.

## Experience

- Fully responsive and mobile-first — the single-screen layout fills `100dvh` with no
  scroll on modern phones and desktops, and tightens its spacing on short viewports.
- Automatically follows the operating system's light/dark appearance.
- Accessible by default: visible labels, focus styles, live-region copy feedback,
  Escape-to-dismiss dialog, and reduced-motion support.

## Tech

React + TypeScript, built with Vite and styled with Tailwind CSS v4. Everything runs in
the browser — there is no backend, database, authentication, or analytics.
</content>
