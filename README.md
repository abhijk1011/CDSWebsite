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
- **Arc carousel** carries the fifteen counters on the home page and on What
  we sell. See below.
- **Counter dialog** flies its mark from the tile into the panel.
- **Franchise steps** stack as you scroll so earlier steps stay readable.

## The arc carousel

`src/components/counters/` holds the counter carousel. Cards ride the rim of a
huge invisible circle whose centre sits far below the viewport, so only the top
of the arc is visible and the row is cropped by the section edge.

Per card, given `progress`:

```
angle   = wrap(i - progress) * GAP
x       = R * sin(angle)
y       = R * (1 - cos(angle))
rotate  = angle                    // tangent to the arc
scale   = 1 - abs(angleDeg) * 0.006
```

`wrap` folds the offset into a half open range around zero, which is what
recycles the cards endlessly rather than running out at either end.

Notes on the implementation, and where it departs from the obvious approach:

- **Vanilla, not GSAP.** Draggable with inertia means the InertiaPlugin, which
  is a paid Club GSAP plugin. A throw with friction is about twenty lines, so
  the site takes no licence dependency for it.
- **One rAF loop, no React re-renders.** Transforms are written straight onto
  DOM nodes held in refs. A state update per frame across fifteen cards would
  drop frames on a mid range phone and buy nothing.
- **The loop pauses when the section is off screen.** Idle drift would
  otherwise turn frames forever behind whatever the visitor is reading.
- **Fading is measured in pixels from the centre of the screen, not degrees of
  arc.** Degrees look right at one viewport width and wrong at every other
  one, leaving a half faded card sitting in plain sight like a rendering bug.
- **Pointer capture is claimed lazily**, only once a gesture passes six pixels.
  Capturing on pointerdown retargets the click that follows onto the drag
  surface, so a tap would never reach the card underneath.
- **The vertical wheel is left alone.** Only horizontal wheel and trackpad
  intent is claimed, and `touch-action: pan-y` lets a vertical swipe scroll the
  page. Taking either would trap the visitor inside the section.
- **Reduced motion** swaps the whole thing for a plain snapping row.

Tuning lives in `readConfig()` in `ArcCarousel.tsx`: radius, gap, card width
and the fade bounds, with separate values below 768px.

### Placeholder artwork

`public/live` and `public/counters` currently hold generated SVG panels, one
per dish and one per counter, built by `scripts/make-dish-art.mjs` from each
item's real colours. They are stand ins, not photography: every stock image
host is blocked by the build environment's egress policy, so rather than ship
empty panels the set is generated locally. Each one is deterministic from its
name, and the whole set weighs under 300KB.

Replace any file with a real photograph of the same name and nothing else has
to change. Drop the JPEGs in, delete the matching SVG, and update the path in
the content file if the extension differs. Once real photographs are in place
the drawn mark can come off the counter cards, in `ArcCard.tsx`.

### The live panel on the home page

The live section rotates through dishes, and the picture behind the name
changes with it. Each menu item in `src/content/live.ts` takes an optional
`image`:

```ts
{ name: "Pani puri", image: "/live/pani-puri.jpg" }
```

Drop the files into `public/live/`. Landscape or square both work, the panel
crops to fill. On a laptop the panel takes the right of the section and its
left edge is masked away so the photograph resolves into the background behind
the copy; on a phone it becomes a card beneath the text, where a masked edge
would eat the words. The mask is on the picture layer only, never on the dish
name. Without a photograph the panel shows the name on a warm ground, which is
a deliberate design rather than an empty slot.

### Adding video to the cards

Each counter takes an optional `video` and `poster` in `src/content/categories.ts`:

```ts
{ id: "sweets", video: "/counters/sweets.mp4", poster: "/counters/sweets.jpg" }
```

Drop the files into `public/counters/`. Clips should be short, silent and a few
seconds long. Only cards within about two positions of centre are played; the
rest are paused, so a full set does not decode fifteen streams at once. Without
a clip the card falls back to the counter's drawn mark, which is the current
state of every card.

### Checking it

```bash
node scripts/verify-arc.mjs
```

Drives a real browser and asserts that dragging moves the arc, that arrow keys
and the buttons step it, that a still click opens the counter while a drag does
not, that reduced motion renders the snapping row, and that nothing overflows
horizontally at 320, 390, 768 and 1440.

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
