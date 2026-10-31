# `@proudlyopensource/ui`

Shared shadcn/ui component library for the Proudly Open Source monorepo.

- **Style:** Nova (`radix-nova`)
- **Base color:** Neutral
- **Icons:** Hugeicons
- **Font:** Google Sans (self-hosted)
- **Theme:** CSS variables with light and dark modes

## Structure

```text
src/
├── components/   shadcn/ui components
├── fonts/        Google Sans woff2 files and @font-face declarations
├── hooks/        Shared React hooks
├── lib/          Utilities (cn, etc.)
└── styles/       Tailwind v4 theme (globals.css)
```

## Usage

Import the shared stylesheet once in each application's root layout:

```tsx
import "@proudlyopensource/ui/globals.css"
```

Import components through the package export:

```tsx
import { Button } from "@proudlyopensource/ui/components/button"
```

## Adding Components

Run the shadcn CLI from an application directory. Components are written into
this package:

```bash
npx shadcn@latest add card -c apps/frontend
```

Dependencies required by shared components must be declared in this package's
`package.json`.

## Theming

All design tokens live in `src/styles/globals.css`. The theme uses OKLCH color
values and the `@theme inline` Tailwind v4 directive. Google Sans is mapped to
`--font-sans` and `--font-heading`.
