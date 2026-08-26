# CDS · Charliee Day to Day Stores

Portfolio site for CDS, a day to day store with counters in Valsad and Vapi,
south Gujarat. It is a showcase only: nothing is sold through the site, and
every call to action points at a phone, a WhatsApp thread or the counter itself.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export into ./out
npm run check      # typecheck, house style guard, lint
```

The build is a full static export, so `out/` drops onto Vercel, Netlify,
Cloudflare Pages, GitHub Pages or any plain web host. To move to a Node host
with image optimisation later, remove `output: "export"` and
`images.unoptimized` from `next.config.ts`.

## House style: no dashes

There are no dash characters in any copy a visitor reads. No em dash, no en
dash, no hyphen. Commas, full stops and the middot separator do the work
instead. This is enforced, not just intended:

```bash
npm run check:copy
```

The guard scans every string in `src/content/` and every JSX text node in
`src/`, and it distinguishes prose from slugs, URLs and class names. It runs as
part of `npm run check`. If you add copy with a hyphen in it, the check fails
and names the line.

## Where the content lives

All copy sits in `src/content/` so it can be edited without touching a
component:

| File | Holds |
| --- | --- |
| `site.ts` | Brand, store addresses, phone numbers, opening hours, navigation |
| `categories.ts` | The fifteen counters and everything on them |
| `live.ts` | The live kitchen menu |
| `pages.ts` | About, franchise and contact long form copy |

### Confirm before launch

A few values are placeholders, and each is flagged with a `TODO` comment in the
file:

- **Opening hours** in `site.ts`. Currently 9:30 am to 10:00 pm, seven days.
  These drive the live "Open now" pill, so they need to be right.
- **The stats** in `pages.ts` (`about.stats`): counter count, product count.
- **The franchise figures** in `pages.ts` (`franchise.facts`): square footage,
  team size, time to open.
- **The founding story** in `about.chapters` is written to be true to how the
  shop actually works, but it invents no dates. Add real ones if you want them.
- **Item lists** in `categories.ts` are a plausible starting point per counter.
  Edit freely.

## Design system

The palette and its allocation live in `src/app/globals.css` under `@theme`.
Shares across a full scroll: cream 60, clay 15, cocoa 12, caramel 6,
terracotta 5, smoke 2.

- Terracotta is action only. One primary button per viewport, and it never
  appears in body copy except as a link.
- Cocoa is a surface in exactly two places per page: the footer, and one dark
  feature band. A third makes the scroll feel heavy.
- Every border and shadow is brown tinted. No neutral grey anywhere except
  disabled and placeholder states, which are deliberately outside the brown
  ramp so they never read as active content.
- Type is Fraunces for display and Inter for everything else. The `SOFT`,
  `WONK` and `opsz` axes are what give the headings their warmth.

## Motion

Curves and durations are centralised in `src/lib/motion.ts`. UI stays under
300ms, editorial reveals are allowed longer, and `ease-in` is never used on an
entrance.

Reduced motion is not an afterthought: `MotionConfig reducedMotion="user"`
drops transforms globally, and `useReveal()` in
`src/components/primitives/Reveal.tsx` removes the hidden state entirely rather
than animating it faster, so content can never be stranded at opacity zero.

Signature pieces:

- **Hero shelf** scrolls on its own and speeds up in whichever direction you
  are scrolling.
- **Counter walk** pins the page and travels sideways on desktop, and becomes a
  native snapping carousel on touch. Two behaviours, one set of markup.
- **Counter dialog** flies its mark from the tile into the panel.
- **Franchise steps** stack as you scroll so earlier steps stay readable.

## Checks

`scripts/verify.mjs` drives a real browser and asserts no horizontal overflow at
320, 390 and 768 px, that nothing is stranded invisible under reduced motion,
and that the mobile menu and counter dialog both open and close on Escape.

```bash
npm run build && npx serve out    # or any static server on port 4321
node scripts/verify.mjs
```

## Adding photography

The site is built to look finished without it. Every counter is represented by
a drawn mark in `src/components/marks.tsx` rather than a photo, which is what
keeps the set visually consistent. When real product shots exist they can drop
into the clay tile areas in `CategoryGrid` and `CounterWalk` without a redesign.
