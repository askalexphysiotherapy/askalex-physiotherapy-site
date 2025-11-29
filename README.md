# Ask Alex Physiotherapy – Marketing Website

A production-ready marketing site built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. All content is managed through a single JSON source of truth.

## Tech Stack

- **Next.js 14+** with App Router in `/app`
- **TypeScript** for type safety
- **TailwindCSS** with PostCSS and autoprefixer
- **Framer Motion** for tasteful animations (respects `prefers-reduced-motion`)
- **Zod** for JSON schema validation
- **Lucide React** for icons
- **Inter** font from Google Fonts

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

4. **Type checking:**
   ```bash
   npm run typecheck
   ```

5. **Linting:**
   ```bash
   npm run lint
   ```

## Content Management

All site content is managed through `content/site.json`. This single source of truth includes:
- Brand information (name, logo, colors, contact)
- Header and footer configuration
- Page content (home, about, services, FAQ, contact, legal)
- Form field definitions
- Navigation structure

The JSON is validated at build time using Zod schemas in `lib/content.ts`. If the JSON structure doesn't match the schema, the build will fail with clear error messages.

### Updating Content

1. Edit `content/site.json`
2. The Zod schema in `lib/content.ts` will validate the structure
3. All components and pages automatically use the updated content

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with Header/Footer
│   ├── page.tsx            # Home page
│   ├── about/              # About page
│   ├── services/           # Services page with deep linking
│   ├── faq/                # FAQ page with JSON-LD
│   ├── contact/            # Contact form page
│   ├── terms-of-service/   # Terms page
│   └── privacy-policy/     # Privacy page
├── components/             # Reusable components
│   ├── Header.tsx          # Sticky header with topbar
│   ├── Footer.tsx          # Footer with columns
│   ├── MobileNav.tsx       # Mobile burger menu
│   ├── FloatingCTA.tsx    # Floating mobile CTA
│   ├── Card.tsx            # Card component
│   ├── Chip.tsx            # Chip/pill component
│   ├── Accordion.tsx       # FAQ accordion
│   ├── Table.tsx           # Comparison table
│   └── Reveal.tsx          # Framer Motion reveal
├── lib/
│   ├── content.ts          # Zod schema + content loader
│   ├── utils.ts            # Utility functions (cn)
│   └── hooks.ts            # Custom hooks (usePrefersReducedMotion)
├── content/
│   └── site.json           # Single source of truth for all content
└── public/                 # Static assets

```

## Features

### Pages

- **Home (`/`)**: Hero section, learn cards, services teaser
- **About (`/about`)**: Hero with image overlay, values grid, testimonials, credentials
- **Services (`/services`)**: Service cards with expand/collapse, comparison table, expertise grid
  - Deep linking: `/services#home`, `/services#clinic`, `/services#online`
- **FAQ (`/faq`)**: Jump navigation, accordion FAQs, JSON-LD structured data
- **Contact (`/contact`)**: Dynamic form from JSON, conditional postcode field, consent validation, UTM tracking
- **Terms (`/terms-of-service`)**: Legal terms from JSON
- **Privacy (`/privacy-policy`)**: Privacy policy from JSON

### Components

- **Header**: Sticky header with optional topbar, responsive burger menu
- **Footer**: Multi-column footer with social links, legal links
- **FloatingCTA**: Mobile-only floating CTA button
- **Form**: Dynamic form generation from JSON field definitions
- **Accordion**: Accessible FAQ accordions
- **Table**: Responsive comparison table

### Styling

- Brand colors mapped from JSON to CSS variables:
  - `--aa-green`: #4CAF50
  - `--aa-blue`: #007B9E
  - `--aa-aqua`: #3BA6A0
  - `--aa-bg`: #EAF4FB
- Tailwind theme extends with `aa-*` color classes
- Rounded-2xl cards, soft shadows, accessible focus rings
- Respects `prefers-reduced-motion`

### Accessibility

- Semantic HTML (landmarks, aria-labels)
- Keyboard navigable menus and accordions
- Focus-visible rings on interactive elements
- Screen reader friendly
- WCAG 2.2 AA compliant

### SEO

- Metadata per route using JSON titles/descriptions
- OpenGraph defaults from brand data
- JSON-LD structured data for FAQ page
- Semantic HTML structure

## Form Handling

The contact form (`/contact`):
- Dynamically generated from `contact.fields` in JSON
- Conditional postcode field (shows when appointment_type = "Home Visit")
- Required consent checkbox validation
- UTM parameter capture
- Currently logs to console (no backend yet)
- Shows success message after submission

## Development Notes

- All copy comes from JSON - no hard-coded text in components
- Type safety enforced via Zod schemas
- Build fails fast if JSON structure is invalid
- Framer Motion animations respect `prefers-reduced-motion`
- Mobile-first responsive design

## License

Copyright © Ask Alex Physiotherapy. All rights reserved.
