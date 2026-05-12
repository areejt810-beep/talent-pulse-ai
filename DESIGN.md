# Design Brief

## Direction

Talent Pulse AI — AI-driven resume analysis and job matching platform with professional, information-dense dashboard aesthetic.

## Tone

Intelligent Precision: no-nonsense, data-driven authority without unnecessary decoration. Like Linear meets premium HR software.

## Differentiation

High-contrast typography + sharp card hierarchy + warm amber accents reserved for AI insights (match scores, recommendations). Density-focused layout maximizes information legibility in a dark theme.

## Color Palette

| Token           | OKLCH           | Role                                    |
| --------------- | --------------- | --------------------------------------- |
| background      | 0.145 0.01 260  | Deep dark base, minimal chroma          |
| foreground      | 0.95 0.008 260  | High contrast text                      |
| card            | 0.18 0.012 260  | Subtle card elevation                   |
| primary         | 0.72 0.16 270   | Deep indigo for UI accents              |
| accent          | 0.72 0.17 70    | Warm amber for AI scores & highlights   |
| muted           | 0.22 0.015 260  | Secondary neutral for disabled states   |
| destructive     | 0.55 0.2 25     | Alert red for warnings & errors         |
| border          | 0.28 0.01 260   | Ultra-subtle ultra-thin borders         |
| sidebar         | 0.18 0.012 260  | Navigation background                   |

## Typography

- Display: Space Grotesk — modern sans-serif for headings and data labels, professional authority
- Body: DM Sans — clean, readable sans-serif for UI text and paragraph content
- Mono: JetBrains Mono — technical monospace for code snippets and formatted data
- Scale: hero `text-5xl font-bold tracking-tight`, h2 `text-3xl font-bold`, label `text-sm font-semibold`, body `text-base`

## Elevation & Depth

Minimal shadow hierarchy: `shadow-subtle` (1px/3px) for cards, `shadow-elevated` (4px/12px) for modal-like elements. Depth through layering and border treatment, not visual drama.

## Structural Zones

| Zone           | Background      | Border                    | Notes                           |
| -------------- | --------------- | ------------------------- | ------------------------------- |
| Header/Nav     | `bg-card`       | `border-b border-border`  | Navigation + branding           |
| Sidebar        | `bg-sidebar`    | `border-r border-border`  | Left navigation, subtle accent  |
| Main Content   | `bg-background` | —                         | Dense card grid with alternation|
| Cards/Sections | `bg-card`       | `border border-border`    | Data containers, subtle rounded |
| Footer         | `bg-card`       | `border-t border-border`  | Info & links                    |

## Spacing & Rhythm

Compact density: 1rem section gaps, 0.5rem micro-spacing between labels and values. Cards use 1.5rem internal padding. Tight line-height (1.4) for body text in dense data views.

## Component Patterns

- Buttons: Primary (indigo `bg-primary`), secondary (muted), destructive (red). Minimal hover lift, focus ring on indigo
- Cards: `rounded-md` (6px), `bg-card`, `border border-border`. Data cards use alternating subtle backgrounds
- Badges: Rounded pills `rounded-full`, `bg-accent text-accent-foreground` for AI scores, `bg-primary` for status tags
- Tables: Compact rows, sticky headers, zebra striping via `bg-muted/30` alternation
- Inputs: `bg-input border-border`, focus ring indigo, no drop-shadow

## Motion

- Entrance: Fade-in + subtle slide on page load (180ms cubic-bezier)
- Hover: Color shift on buttons/links (140ms), slight scale on interactive cards (120ms)
- Decorative: Pulse animation on AI-generated badges, no bouncing or overstated effects

## Constraints

- No decoration beyond card borders and subtle shadows
- No gradient backgrounds; use solid OKLCH tokens only
- Amber accent used sparingly: AI match scores, recommended actions, success states only
- Indigo primary reserved for CTAs, navigation highlights, focus states
- All text must exceed AA contrast (tested on `bg-background` and `bg-card`)

## Signature Detail

Warm amber accent color (70H) reserved exclusively for AI-generated insights—match percentages, recommendation badges, confidence scores. Creates visual distinction between human data and machine intelligence without overwhelming the interface. Category: semantic color restraint.
