# CDS on Shopify: the build prompt

Paste **everything below the horizontal rule** into the Claude session that is
connected to your Shopify store. It is written to be self contained: the
palette, the type, every page, all the menu data and the full railway ordering
spec are inside it, so that session does not need to see this repository to do
the work.

Two things you may want to edit before you paste:

1. **Appendix D** points at image files in this repo. If that Claude cannot
   reach GitHub, upload the folders to Shopify Files yourself first and tell it
   the file names are already there.
2. Anything in the spec marked `SETTING` is a number you can change later from
   the theme editor. The defaults are sensible, not sacred.

---

# Build the CDS store on Shopify

You are building the complete Shopify storefront for **CDS, Charliee Day to Day
Stores**, a two shop day to day store in south Gujarat, India. A reference
website already exists and its design is approved. Your job is to rebuild it on
Shopify, faithfully, with three deliberate changes that are listed under
"What changes from the reference" below.

Work as a senior design engineer, not a theme installer. The bar is a store
that looks bespoke, not a Dawn preset with the colours swapped.

---

## 0. Non negotiables

Read these first. Everything after this section is detail.

1. **No moving strips of text or icons. Anywhere.** The reference site has a
   scrolling shelf of counter names under the hero, and a second scrolling
   ticker on the What we sell page. Both are deleted. Do not build a marquee, a
   ticker, an infinite logo rail, an auto scrolling word band or an announcement
   bar that slides. Static announcement text is fine. Nothing that moves on its
   own horizontally, on any page, in any section.
2. **Mobile is the primary design surface.** Design every section at 390px
   first, then let it grow. If a layout is beautiful on a laptop and merely fine
   on a phone, it is wrong. Test at 360, 390 and 430 wide.
3. **Only live snacks are purchasable, and only for railway station delivery.**
   Every other page is a showcase. No add to cart, no price tags and no cart
   icon anywhere outside the live snacks ordering module. Home delivery does not
   exist yet, so never imply it.
4. **No dash characters in customer facing copy.** No em dash, no en dash, no
   hyphen, in any heading, paragraph, button, label, form hint, error message,
   email or metafield value a shopper can read. Use commas, full stops or a
   middot. Hyphens are fine inside handles, slugs, CSS classes and file names.
   This is a house style rule the brand enforces, so treat a hyphen in visible
   copy as a bug.
5. **The merchant must be able to add things without a developer.** New counter
   categories on What we sell, and new dishes on the live snacks board, both
   have to be addable from the Shopify admin. Section 4 specifies how.
6. **Currency INR, timezone Asia/Kolkata, locale en IN.** Every time
   calculation in the ordering module is in IST, whatever the shopper's device
   clock says.

---

## 1. What changes from the reference

The reference site is approved as it stands, except for these three things.

| # | Change | Where |
| - | ------ | ----- |
| 1 | Delete both scrolling strips and never reintroduce the pattern | Home hero, What we sell |
| 2 | Replace the Charliee section with a new design, specified in section 6.1.5 | Home |
| 3 | Add a railway station ordering module, specified in section 7 | Live snacks |

Everything else is a faithful port: same information architecture, same
sections in the same order, same voice, same palette, same type.

---

## 2. The brand facts

Use these verbatim. They are the source of truth for every page and every
metafield.

**Brand**

- Short name: CDS
- Full name: Charliee Day to Day Stores
- Promise line: Where the everyday feels like an occasion.
- Region line: Valsad · Vapi · Gujarat
- Description, for meta tags: A day to day store from Gujarat carrying sweets,
  farsan, bakery, dry fruits, chocolate and a live snack counter under one roof.

**Stores**

| | Vapi | Valsad |
| - | - | - |
| Label | The Vapi counter | The Valsad counter |
| Address | Shop No. 1, 2, 3, 4, Opposite Ashadham School, Koparli Road, Vapi Station Road | Shop No. 3/4, Bina Park, Tithal Road, Zinnat Nagar |
| Pin | Vapi, Gujarat 396191 | Valsad, Gujarat 396001 |
| Phone | +91 95122 77746 | +91 70390 47746 |
| WhatsApp | 919512277746 | 917039047746 |
| Serves station | Vapi Junction | Valsad |

**Hours**: every day of the week, 9:30 am to 10:00 pm. Note line: "Festival
weeks run longer. Call ahead and we will keep the counter warm."

**Social**: Instagram https://www.instagram.com/cdsstores/ and Facebook
https://www.facebook.com/CDSstores/

**Delivery partners** (walk in alternatives, shown on the live snacks page):
Zomato brand colour #E23744, Swiggy brand colour #FC8019. Use the official
marks only if the real SVG files are supplied. Otherwise use the brand colour
behind a neutral glyph and the partner name set in type. Never hand draw
somebody's trademark.

---

## 3. The design system

This is the whole system. Implement it once as CSS custom properties in a
single theme asset and use it everywhere. Do not invent additional colours.

### 3.1 Palette

```
--cream:            #FDF8F2   /* the default page ground */
--clay:             #F0DDCC   /* the second, warmer ground */
--cocoa:            #3A231A   /* headings, and the dark feature bands */
--smoke:            #4A4034   /* a second plane inside dark bands */
--caramel:          #8A5A3B   /* small type, eyebrows, captions */
--body:             #5A473C   /* running text */
--muted:            #9A9089   /* placeholders only, never content */
--on-dark:          #FDF8F2
--on-dark-muted:    #C9B4A3
--terracotta-100:   #F6E3DA
--terracotta-600:   #BE5F3C   /* the accent. Underlines, marks, active state */
--terracotta-700:   #A34A2C   /* links, focus rings */
--terracotta-800:   #7E3820
--hairline:         rgba(138, 90, 59, 0.18)
--hairline-strong:  rgba(138, 90, 59, 0.30)
--hairline-dark:    rgba(253, 248, 242, 0.14)
```

Shadows are always brown tinted, never grey or black:

```
--shadow-card: 0 2px 12px rgba(58, 35, 26, 0.06);
--shadow-lift: 0 6px 20px rgba(58, 35, 26, 0.10);
--shadow-deep: 0 18px 48px rgba(58, 35, 26, 0.14);
--shadow-ring: 0 0 0 3px rgba(190, 95, 60, 0.28);
```

**Allocation across a full scroll**: cream 60, clay 15, cocoa 12, caramel 6,
terracotta 5, smoke 2. Terracotta never appears in running text. Emphasis comes
from a drawn mark, not from colouring a word.

### 3.2 Type

- Display: **Fraunces**, variable, with the optical size, SOFT and WONK axes.
  Headings use `font-variation-settings: "SOFT" 28, "WONK" 1, "opsz" 144`, which
  is what gives them warmth. A plainer variant for smaller headings uses
  `"SOFT" 14, "WONK" 0, "opsz" 72`.
- Text: **Inter**.
- Shopify's font picker does not carry Fraunces. Upload both families as woff2
  into theme assets and declare them with `@font-face` and `font-display: swap`.
  Self hosting also removes a third party request, which matters on a phone on
  Indian mobile data. Preload only the two faces used above the fold.
- Headings: weight 400, `letter-spacing: -0.022em`, `line-height: 0.95`,
  `text-wrap: balance`. Paragraphs get `text-wrap: pretty`.

Scale, all fluid:

```
--text-mega:    clamp(3rem, 12.5vw, 11rem)
--text-display: clamp(2.6rem, 8vw, 7rem)
--text-h1:      clamp(2.25rem, 6.4vw, 5.25rem)
--text-h2:      clamp(2rem, 5vw, 4rem)
--text-h3:      clamp(1.4rem, 2.6vw, 2.05rem)
--text-lead:    clamp(1.05rem, 1.65vw, 1.375rem)
```

The eyebrow, used above almost every heading: Inter, 11px, weight 500,
`letter-spacing: 0.18em`, uppercase, caramel.

### 3.3 Layout

- Page shell: `width: 100%; max-width: 90rem; margin-inline: auto;` with
  `padding-inline: clamp(1.25rem, 5vw, 4.5rem)`.
- Section rhythm: 80px vertical padding on a phone, 112px from md up.
- Radii: 16px on cards, 24px on large panels, full pills on buttons.
- Rules and borders are always the hairline colour, 1px, never a grey.

### 3.4 Motion

- Easing: `cubic-bezier(0.23, 1, 0.32, 1)` for everything that enters or
  settles. `cubic-bezier(0.32, 0.72, 0, 1)` for drawers and sheets.
- Durations: 160 to 200ms for hover and press, 600 to 800ms for entrances.
- Entrances: content rises 16px and fades in, once, on scroll into view. Use
  IntersectionObserver, not a library. Headings use a line by line mask reveal
  where each line translates up from 105 percent inside an overflow hidden
  parent, staggered about 80ms.
- Press feedback on every button and card: `scale(0.98)` on `:active`.
- Honour `prefers-reduced-motion: reduce` completely: no transforms, no
  parallax, no auto rotation. Opacity and colour only. Nothing on this site is
  load bearing motion, so the reduced version must read perfectly.
- Do not add smooth scroll libraries. Native scrolling on a phone beats
  hijacked scrolling every time.

### 3.5 Texture and chrome

- A fine paper grain sits over the whole page: a tiny inline SVG turbulence,
  `position: fixed`, `mix-blend-mode: multiply`, `opacity: 0.28`,
  `pointer-events: none`, above surfaces and below content.
- Header: fixed, transparent over the hero, then at 24px of scroll it takes
  `rgba(253, 248, 242, 0.82)` with `backdrop-filter: blur(20px)` and a hairline
  bottom border. Over a dark hero, the logo and nav go cream until it takes its
  background.
- Header right side: a "Call the counter" pill that dials Vapi, and on the live
  snacks page an additional terracotta pill, "Order to your train", that jumps
  to the ordering module.
- Mobile menu: full screen cocoa panel, links set large in Fraunces, store
  phone numbers at the bottom. Locks body scroll while open, closes on Escape.
- Footer, cocoa: the promise line set large, a "Find your nearest counter"
  outline button, three link columns (Pages, Counters, Visit), then the word CDS
  set enormous at 7 percent opacity as a stamp, then a smoke coloured sub band
  with the copyright and social links.

### 3.6 Accessibility floor

- Focus visible everywhere: 2px terracotta 700 outline, 3px offset.
- Tap targets 44px minimum. Form controls 48px tall on a phone.
- Contrast: body on cream and on clay, on dark muted on cocoa, all pass AA.
- Every image needs real alt text. Decorative art gets `alt=""`.
- The ordering module must be completable with a keyboard and readable by a
  screen reader, including the countdown, which announces politely.

---

## 4. How the content is modelled in Shopify

This is the part that decides whether the merchant can run the site without
calling anybody. Set all of it up with the Admin GraphQL API before you build
a single section.

### 4.1 The fifteen counters, as collections

Create each counter in Appendix A as a **collection**, not a metaobject. A
collection keeps the door open: today the counters are a showcase, and the day
CDS decides to sell dry fruit online the products are already sitting in the
right place with no migration.

Create these **collection metafield definitions** in the `cds` namespace:

| Key | Type | Use |
| - | - | - |
| `group` | single line text | One of: Sweet counter, Farsan and snacks, Pantry and gifting, Imported aisle, Charliee label |
| `tagline` | single line text | Two or three words, sits under the name |
| `blurb` | multi line text | One or two sentences, shown when the tile opens |
| `items` | list of single line text | What sits on that counter |
| `mark` | single line text | Key for the drawn icon, see 5.3 |
| `featured` | boolean | Carries the home page |
| `sort` | integer | Order on the page |

Give every collection its photograph as the collection image. Files are listed
in Appendix D.

Adding a sixteenth counter is then: create a collection, fill the metafields,
upload an image. The page picks it up with no code change. Say this to the
merchant in your handover notes.

### 4.2 The live snacks board, as products

Every dish in Appendix B becomes a **product**, because these are the only
things that get sold and they need real prices, real inventory and real line
items at checkout.

- One **collection per board section**: Chaat, Burger, Sandwich, Frankie,
  Dabeli, Pizza, Beverages. Collection metafields in `cds`: `kicker` (single
  line text), `wait` (single line text, for example "About 4 minutes"), `sort`
  (integer).
- Product fields: title, one image, price, vendor "CDS Live Counter",
  product type set to the section name.
- Product metafields in `cds`:

| Key | Type | Use |
| - | - | - |
| `board_code` | single line text | The number printed on the counter board. People order by it, so it is shown |
| `hot` | boolean | Counter favourite, draws a small mark |
| `note` | single line text | Optional one line description |
| `available_today` | boolean | The kitchen's on and off switch, defaults true |
| `prep_minutes` | integer | Used to tell a customer how long the order needs |
| `railway` | boolean | Whether this dish can go to a train, defaults true |

- **Critically: uncheck "This is a physical product" on every dish.** With
  shipping not required, Shopify's checkout skips the address and shipping rate
  steps entirely and goes straight to contact details and payment. The station,
  coach and seat are captured by the ordering module as order attributes
  instead. This is the single decision that makes the checkout short enough to
  finish on a platform.
- Also create one product, **Station delivery**, price `SETTING` default ₹30,
  also not requiring shipping, not published to search, added automatically as
  one line by the ordering module.
- Inventory: do not track. The kitchen's control is `available_today`.

Adding a dish is then: create a product, set price and metafields, add it to the
section collection. It appears on the board and in the ordering module.

### 4.3 Stations, as a metaobject

Create a metaobject definition `station` so new stations can be added from the
admin later:

| Field | Type |
| - | - |
| `name` | single line text, for example "Vapi Junction" |
| `code` | single line text, for example "VAPI" |
| `store` | single line text, "Vapi" or "Valsad" |
| `store_phone` | single line text |
| `cutoff_minutes` | integer, default 45 |
| `open_from` | single line text, "09:30" |
| `open_to` | single line text, "22:00" |
| `active` | boolean |

Seed two entries: Vapi Junction served by the Vapi store, and Valsad served by
the Valsad store. The ordering module reads its station list from here, so
adding Bilimora or Surat later is an admin task, not a code change.

### 4.4 The Charliee label, as a collection

One collection, handle `charliee`, holding the house label products. Product
metafield `cds.tag` carries the short category shown on the card, for example
"Namkeen" or "Mukhwas". These products are **not purchasable**: they render
through a showcase product template with no price and no form, and the cart
guard in section 7.9 refuses them.

### 4.5 Pages, navigation and settings

- Pages: About us, Franchise, Contact, plus Shopify's required policy pages
  (refund, privacy, terms, and a short "Railway delivery terms" page).
- Main menu, in this order: What we sell, Live snacks, About us, Franchise,
  Contact. The header CTA sits outside the menu.
- Store settings: currency INR, timezone Asia/Kolkata, weight unit kg, customer
  accounts optional, checkout requiring phone number.
- Set the theme's SEO defaults, the favicon and the social share image.

---

## 5. Theme implementation

### 5.1 Approach

Start from **Dawn** as the base for its cart, checkout and predictive search
plumbing, then replace the presentation layer wholesale. Publish nothing until
the whole thing is reviewed on a preview link.

Write theme files with the Admin GraphQL `themeFilesUpsert` mutation. Every
page is a JSON template that composes custom sections, so the merchant can
reorder and re edit from the theme editor.

Sections to build, each with a proper `{% schema %}` so copy is editable:

```
sections/cds-hero.liquid
sections/cds-counter-arc.liquid
sections/cds-live-teaser.liquid
sections/cds-stat-band.liquid
sections/cds-charliee-shelf.liquid
sections/cds-franchise-teaser.liquid
sections/cds-page-header.liquid
sections/cds-counter-grid.liquid
sections/cds-live-board.liquid
sections/cds-railway-order.liquid
sections/cds-order-out.liquid
sections/cds-about-chapters.liquid
sections/cds-values.liquid
sections/cds-franchise-steps.liquid
sections/cds-contact.liquid
snippets/cds-marks.liquid
snippets/cds-reveal.liquid
assets/cds-system.css
assets/cds-reveal.js
assets/cds-railway.js
```

Do not ship Dawn's default CSS on top of yours. Strip what you do not use.

### 5.2 Front end rules

- Vanilla JS only. No jQuery, no carousel libraries, no animation libraries.
  Horizontal carousels are CSS scroll snap with `scroll-behavior: smooth`, which
  is what makes them feel native under a thumb.
- Every interactive piece is a small custom element with its own JS file, loaded
  with `defer`. Nothing blocks render.
- Images: Shopify's `image_url` with a `srcset`, `loading="lazy"` on everything
  except the hero, explicit width and height so nothing shifts.
- Target Lighthouse mobile: performance 90 or better, accessibility 100, CLS
  under 0.05. State the numbers you actually get in your handover.

### 5.3 The drawn marks

The reference site draws a small line icon per counter: sweets, live sweets,
cakes, bakery, chocolate, namkeen, khakhra, banana chips, makhana, dry fruits,
saffron, mouth freshener, imported, sodas, charliee. Rebuild these as a single
Liquid snippet holding inline SVG symbols, keyed by the `cds.mark` metafield,
drawn at 1.5px stroke in `currentColor`, on a 24 by 24 grid. Keep them simple
and confident. They are used at 24 to 32px, so detail is wasted.

---

## 6. The pages

### 6.1 Home

Order of sections, top to bottom.

#### 6.1.1 Hero

Full height, cream. Eyebrow "Valsad · Vapi · Gujarat" beside a live **Open now**
pill that computes from the store hours in IST and reads either "Open now, until
10:00 pm" or "Opens at 9:30 am", with a small terracotta dot.

Headline, in Fraunces at display size, revealed line by line:

> Where the everyday
> feels like an *occasion*.

The word "occasion" carries a hand drawn terracotta underline that draws itself
in once, over 800ms, after the lines land. Standfirst:

> Charliee Day to Day Stores. Fifteen counters under one roof in Valsad and
> Vapi, from the sweets set that morning to the live kitchen at the back.
> Everything weighed in front of you.

Two buttons: "See what we sell" (solid cocoa) and "The live counter" (outline).

**The scrolling shelf of counter names that sat at the bottom of this hero is
deleted.** Do not replace it with anything that moves. If the hero feels like it
needs a floor, use a static hairline rule.

#### 6.1.2 The counter arc

The signature section. Full viewport height, cocoa ground, cream type. Heading
"Walk the shop, counter by counter." with the eyebrow "Fifteen counters".

The fifteen counter collections are laid out as cards on a shallow **arc**: the
cards sit along a curve, the centre card upright and full size, its neighbours
rotated and dropped slightly, falling away toward both edges. It is dragged
horizontally with a pointer or a thumb, with momentum. Each card is a portrait
photograph with the counter name and tagline over a gradient scrim.

Below the arc, a bar on a smoke ground: the active counter's name and position
on the left, previous and next buttons on the right.

Tapping a card opens that counter's detail: the blurb and the full item list,
in a sheet that rises from the bottom on a phone and as a panel on a laptop.
No prices, no buy button.

On a phone the arc shows one card and a slice of each neighbour, and drag is the
only control the thumb needs. Make sure the drag never fights the page's
vertical scroll: lock the axis once the gesture's direction is known.

Intro line, laptop only: "Every counter has its own rhythm. The sweets go early,
the farsan goes at four, and the live kitchen never really stops. Drag through
them, or open one to see what sits on it." Below it, a link, "See every counter
in full".

#### 6.1.3 The live counter teaser

Clay ground, hairline top and bottom. Eyebrow "The live counter" beside the Open
now pill. Heading "Some things cannot wait on a shelf."

Laptop: the copy sits left, and a photograph panel takes the right 54 percent
with its left edge feathered into the clay, cycling slowly through dish
photographs with the dish name and its section. Paragraph:

> A pani puri filled five minutes ago is a soggy thing, and a pizza that sat
> under a lamp is a different food to one that did not. The kitchen at the back
> runs through the day, and every one of the 46 items on this board is made
> after you order it.

Then the seven section names as pills, then "See the live menu".

Phone: the paragraph and pills are dropped, and a **reel** takes their place: a
scroll snap strip of dish photographs, each with its name, that a thumb pushes
through. It advances on its own only while the section is in view, pauses on
touch, and stops entirely under reduced motion. This is a paged carousel, not a
marquee: it snaps, it has a position indicator, and a person is in charge of it.
That distinction matters, the banned pattern is unstoppable sliding text.

#### 6.1.4 The stat band

Cream. Heading "A shop is only as good as the day it is having." beside:

> We would rather run out of something at eight in the evening than sell you a
> tray that was fried on Tuesday. Empty trays are a good sign, and our regulars
> know it.

Four tiles on clay, hairline gapped, numbers counting up once on scroll into
view, in tabular figures: **2** Stores in south Gujarat · **15** Counters under
one roof · **900+** Products on the shelf · **7** Days a week, every week.

Expose all four numbers and labels as section settings.

#### 6.1.5 The Charliee shelf, rebuilt

This section is being redesigned. The old version, a paragraph beside a wall of
parallax product photographs, is out. Build this instead.

**The idea.** Charliee is the house label, a full product range of our own, and
the section has to make that feel like a brand within a brand rather than a
footnote. It shows a handful of packs, beautifully, and says plainly that the
whole range is on the shelf at every CDS store. Nothing is for sale here.

**The surface.** Full bleed cocoa, with a soft radial warmth behind the packs
going from `#42291E` at the centre to `#2A1912` at the edges. Coming after the
cream stat band and before the cream franchise teaser, it reads as a lit room.

**Structure, top to bottom.**

1. **The stamp.** The word `Charliee` set in Fraunces at
   `clamp(4rem, 26vw, 16rem)`, cream at 7 percent opacity, running wider than
   the container so it is cropped by both edges, sitting behind everything.
   `aria-hidden`. It does not move.
2. **The words**, kept short, 24px inset on a phone:
   - Eyebrow, in terracotta 600: `The house label`
   - Heading, Fraunces, cream, mask revealed:
     **A whole shelf that answers to our name.**
   - One paragraph, on dark muted, maximum 2 lines on a phone:
     "Namkeen, makhana, mukhwas, dry fruit packs and the festive boxes. We put
     the Charliee name on a product only once it outsells everything beside it,
     which is a slow way to build a range and the only way we know how."
3. **The shelf.** A full bleed horizontal scroll snap rail of pack cards. This
   is the piece that has to be phenomenal on a phone.
   - Card width `76vw`, capped at 320px. `scroll-snap-align: start`,
     `scroll-snap-type: x mandatory`, `scroll-padding-inline-start: 24px`,
     `-webkit-overflow-scrolling: touch`, scrollbar hidden. The next card peeks
     by about 18 percent, which is what tells a thumb the rail moves.
   - Each card: a 4 by 5 product photograph on a slightly lighter panel,
     20px radius, the pack lit by a soft elliptical glow beneath it so it reads
     as standing rather than floating. Under the image, the product title in
     Fraunces at 20px cream, and the `cds.tag` value in the eyebrow style in
     caramel.
   - A small circular seal in the top right of each image, an embossed stamp
     reading `CDS · Charliee` around the ring, cream at 40 percent. Drawn as
     inline SVG, one snippet, reused.
   - **The shelf line.** Under the row of cards, a 1px rule in cream at 12
     percent running the full bleed width, with a soft downward gradient shadow
     under each card meeting it. The cards sit on the shelf. This is the detail
     that makes the section, do not skip it.
   - Under the rule, a segmented progress indicator, one short segment per card,
     the active one filling terracotta 600 as the rail scrolls. Driven by scroll
     position, not by a timer.
   - The rail **never auto advances**. It moves when a person moves it.
   - From 1024px up: show 3.5 cards, add a previous and next pair of circular
     outline buttons up beside the heading, and keep the same snapping.
4. **The claim.** Below the rail, centred, inside a pill with a hairline dark
   border: **"Every one of these is on the shelf at both CDS stores."** Under it,
   two small chips, `Vapi` and `Valsad`, each with a 12px map pin, linking to the
   Contact page.
5. **One quiet link**, cream, underlined at 30 percent: "How we choose what
   carries the name", to the About page.

**Data.** The rail reads a collection chosen in the section schema, defaulting
to `charliee`, with a `SETTING` for how many packs to show, default 8. Product
image, title and `cds.tag` fill the card. A new pack on the shelf is a product
added to that collection, nothing more.

**Section settings to expose**: eyebrow, heading, paragraph, collection, pack
count, claim line, link label and target.

**What not to do here**: no prices, no add to cart, no "shop now", no auto
playing rail, no parallax on a phone, no more than one line of caption per card.

#### 6.1.6 The franchise teaser

Cream ground, a single large clay card with a hairline border and a 24px radius.
Left: eyebrow "Franchise", heading "Run the counter in your city.", the
standfirst from Appendix C, and a "How the model works" button. Right: four
facts in a hairline gapped grid on cream, Space needed 1,200 to 2,500 sq ft ·
Ideal frontage 25 ft and up · Team at opening 10 to 16 people · Time to open
about four months. Then the closing line under them.

### 6.2 What we sell

- Page header: eyebrow "What we sell", heading "Fifteen counters, one room.",
  standfirst "Sweets set that morning, farsan fried the same afternoon, an
  imported aisle people drive in for and a gifting counter that carries most of
  October. Tap any counter to see what sits on it." Beside it a small
  definition list: Counters 15 · Lines listed (sum of all item lists) · Groups 5.
- The same counter arc section as the home page, with the heading "Every
  counter, on a single arc." and no "see every counter" link.
- Then the plain list: heading "Or browse them the plain way." and a grid of all
  fifteen counters, grouped under their five group headings, each tile carrying
  the mark, the name, the tagline and an expandable item list. Tiles are anchor
  targets so the footer can link straight to one.
- **The scrolling ticker of counter names that sat between the grid and the
  closing section is deleted.** Put nothing in its place. The grid ends, the
  closing section begins.
- Closing section, cream, centred, maximum 3 columns of measure: eyebrow "Not on
  the list", heading "Ask, and we will usually find it.", and "Half of the
  imported aisle exists because a regular asked for something we did not carry.
  There is a request book by the till and somebody actually reads it."

### 6.3 Live snacks

Keep this page exactly as the reference has it, and **add** the ordering module.

1. **Hero**: one photograph, full bleed, minimum 76svh on a phone and 86svh
   above, the headline sitting on it. Two gradient scrims, one weighting the
   bottom where the headline sits, one darkening the top where the transparent
   header floats. The photograph rises slowly and the layer fades as it leaves.
   Carries the dish count, how many are pictured, and the "No onion, no garlic,
   no potato" promise.
2. **Sticky section rail**: the seven section names as pills, the active one
   marked by a pill that slides between them, driven by an IntersectionObserver
   biased to whatever owns the upper third of the screen. The active pill
   scrolls itself back into view on a narrow screen.
3. **The board**, seven chapters in order. Each chapter: a number, the section
   name, the kicker and the wait time. Then the photographed dishes as cards,
   two across on a phone and three from lg, each with the photograph, the name,
   the board code and the price, and a small mark on counter favourites. If a
   section has an odd number of photographed dishes the last card runs wide.
   Then the rest of that section's dishes as a plain, dense list.
4. **The board's small print**, exactly as it reads at the counter: "Parcel
   charges are extra", "An order once placed cannot be cancelled", "No onion, no
   garlic and no potato in anything above", then "Prices read off the counter
   board in August 2026. The number beside each item is the code to give at the
   counter."
5. **The railway ordering module.** Section 7. It sits here, after the board and
   before the closing section.
6. **The closing section**, cocoa: "Come to the counter, or have it sent.", the
   Zomato and Swiggy buttons, and both store addresses with a call button each.
   Update its paragraph so it no longer implies these are the only ways to
   order:

   > Everything is best about ninety seconds after it leaves the tawa, which is
   > an argument for eating it here. If you are passing through on a train, order
   > above and we will meet you on the platform. Otherwise both stores are on
   > Zomato and Swiggy.

Also add, on a phone only, a **sticky bottom bar** on this page: a terracotta
pill, "Order to your train", that scrolls to the module. It appears once the
hero has left the screen and hides while the module itself is in view. It sits
above the safe area inset.

### 6.4 About us

Page header: eyebrow "About us", heading "A day to day store that refuses to be
ordinary.", standfirst from Appendix C. Then:

- **Four chapters**, numbered 01 to 04, each a heading and a paragraph, laid out
  as a two column list on a laptop and a stack on a phone. Copy in Appendix C.
- **Four values**, on a clay band, heading "Four rules we have never had a
  reason to break.", as four cream tiles in a hairline gapped grid.
- **A cocoa band** carrying the four statistics again.
- **Both stores**, on cream, heading "Two shops, both worth the drive.", each
  with its address, phone, hours and a map link.

### 6.5 Franchise

Page header, then the five steps as a numbered vertical sequence with a
connecting hairline and a duration beside each, heading "Five steps, about four
months." Then, on clay, the six things CDS provides, heading "Not a logo file
and good luck." Then a cocoa closing band, "You will speak to the family, not a
sales team.", with the closing paragraph and a call button. Copy in Appendix C.

### 6.6 Contact

Page header: eyebrow "Contact", heading "Come to the counter.", standfirst "Two
stores, both open seven days a week. Call ahead for a large sweet order, a
custom cake or a festive hamper and it will be ready when you arrive."

Two columns on a laptop, stacked on a phone:

- Left: both stores in full, each with the address, a phone link, a WhatsApp
  link, the hours and an embedded map or a static map image linking out to
  Google Maps.
- Right: an enquiry form, heading "Ask us something." Fields: which store (two
  large toggle buttons), reason (a select carrying: A custom cake, A festive
  hamper, A bulk sweet order, A corporate gifting list, Franchise enquiry,
  Something else), name, message.

  Submit does two things: it posts through Shopify's own contact form so there
  is a record in the admin, and it then opens WhatsApp to the chosen store with
  the message prefilled. WhatsApp is where these conversations actually happen
  and it leaves the sender a copy of what they asked for. If you can only do one
  reliably, keep the WhatsApp handoff and make that explicit in the button
  label.

---

## 7. The railway station ordering module

This is the only place on the site where money changes hands. Build it
carefully. It sits inside the live snacks page at the anchor
`#order-to-your-train` and nothing above it on that page changes.

### 7.1 What it does, in one paragraph

CDS delivers hot food from its live counter **to trains stopping at the station
its store sits beside**. The Vapi store delivers to Vapi Junction. The Valsad
store delivers to Valsad station. A passenger tells us their train, their
arrival time, their PNR, their coach and their seat, chooses from the live
board, pays on Shopify, and a runner hands the parcel over at the coach door
when the train pulls in. There is no home delivery and no delivery anywhere
else. That comes later.

### 7.2 The rule that governs everything

**An order must be placed at least 45 minutes before the train reaches the
station.** Not 30. Forty five, because the kitchen cooks after you order and
somebody then has to walk to a platform.

That means, for a train arriving at 2:30 pm, ordering closes at 1:45 pm. The
value is per station and editable (`station.cutoff_minutes`, default 45), but it
is never below 45 without the merchant deliberately changing it.

Two more time rules:

- The arrival time must fall inside the store's opening hours, 9:30 am to 10:00
  pm. A train at 6:00 am cannot be served.
- Orders may be placed for today or the next two days, no further. `SETTING`.

All of this is computed in **Asia/Kolkata**, never in the device's timezone.

### 7.3 The flow, on a phone

Three steps in one section, no page reloads, with a small stepper at the top
showing where you are. Each step's panel is a `<fieldset>` with a legend, so the
whole thing is keyboard and screen reader complete.

**Step 1: Your train**

| Field | Control | Validation |
| - | - | - |
| Station | Two large tappable cards, one per active `station` metaobject, each showing the station name and which CDS store serves it | Required |
| Day | Chips: Today, Tomorrow, and a date input for the day after | Required, within the allowed window |
| Train number | Numeric input, `inputmode="numeric"` | Exactly 5 digits |
| Arrival time at this station | Time input, plus quick chips for the next few half hours that are still orderable | Required, inside opening hours, and at least 45 minutes away |
| PNR | Numeric input | Exactly 10 digits |
| Coach | Text input, uppercased as typed, placeholder `S4` | 1 to 3 characters, letter then digits, for example S4, B2, A1, D1 |
| Seat or berth numbers | Text input, comma separated, placeholder `43, 44` | 1 to 6 numbers, each 1 to 99 |
| Mobile number | Tel input | 10 digits, starting 6 to 9 |
| Name | Text input | Required |

The moment a valid station and arrival time exist, show a **standing line**
under the step, and keep it visible for the rest of the flow:

> Ordering for the 2:30 pm train closes at **1:45 pm**. That is 1 hour 12 minutes
> from now.

The countdown updates every 30 seconds. Under 15 minutes it turns terracotta
and counts every second. At zero, see 7.7.

**Step 2: The order**

The board again, but transactional. Only products that are in a section
collection, have `available_today` true and `railway` true. Each row: the dish
name, the board code, the price, and a stepper with a large minus, the count,
and a large plus. Sections are collapsible, chaat open by default. A search
field at the top filters by name or code, which is faster than scrolling 46
items on a phone.

A **sticky cart bar** across the bottom of the viewport at all times once
something is in it: item count, total, and "Review order". Above the safe area
inset. It must never cover the last row of the list, so pad the list by the
bar's height.

Show the kitchen time honestly, from the maximum `prep_minutes` in the cart:
"This order needs about 12 minutes at the counter."

Minimum order value `SETTING`, default ₹200, enforced before step 3 with the
message "Station orders start at ₹200. Add a little more and we will bring it
to your seat."

**Step 3: Confirm and pay**

- A summary card, in plain language:
  > **Vapi Junction, platform side.** Train 12934, coach S4, seats 43 and 44.
  > Arriving 2:30 pm today. We will meet you at the coach door.
- The items, with quantities and line totals.
- Station delivery ₹30 as its own line.
- The total.
- The countdown again, larger.
- An acknowledgement checkbox: "I understand that an order once placed cannot be
  cancelled, and that we will call this number if we cannot find the coach."
- One primary button: **Pay ₹740 securely**, showing the actual total.
- Small print under it: "Payment is taken by Shopify. Your card details never
  touch us."

Tapping it builds the Shopify cart and sends the shopper to `/checkout`.

### 7.4 What gets written to the order

Use the AJAX Cart API. Clear the cart first, so a stale cart can never ride
along. Then add each dish with **line item properties** and set **cart
attributes** for the journey.

Cart attributes, exact keys:

```
service            = "railway-delivery"
station            = "Vapi Junction"
station_code       = "VAPI"
store              = "Vapi"
train_number       = "12934"
coach              = "S4"
seats              = "43, 44"
pnr                = "1234567890"
arrival_at_ist     = "2026-09-03 14:30"
arrival_at_iso     = "2026-09-03T14:30:00+05:30"
order_by_ist       = "2026-09-03 13:45"
placed_at_iso      = "2026-09-03T12:33:11+05:30"   /* from server time, see 7.6 */
passenger_name     = "..."
contact_phone      = "..."
_cutoff_minutes    = "45"
_client_version    = "1"
```

Keys with a leading underscore are internal and are not displayed to the
customer. Everything a staff member needs to run the order is deliberately
without an underscore so it shows up in the admin, on the packing slip and in
the order confirmation email.

Also set the cart `note` to a single readable line, because that is what prints:

```
RAILWAY · Vapi Junction · Train 12934 · Coach S4 · Seats 43, 44 · Arr 14:30 · PNR 1234567890 · 9xxxxxxxxx
```

Each dish line carries the board code as a line item property, so the kitchen
reads the same numbers it reads on its own board.

### 7.5 Checkout

- Because no dish requires shipping, checkout collects contact details and
  payment only. Confirm this in a real test order before you call it done.
- Enable a payment gateway that suits India: Shopify Payments if available on
  this store, otherwise Razorpay or PayU with UPI, cards and net banking. **UPI
  must work**, it is how most of these orders will be paid.
- Cash on delivery is off for railway orders. A runner on a platform cannot
  make change.
- Set the checkout to require a phone number.
- Order confirmation email: add the journey details near the top, not buried.
  The customer should see coach, seat, arrival and the store's phone number
  without scrolling.

### 7.6 Getting the time right

The device clock is not trustworthy and neither is a cached page. Use three
sources and take the strictest answer.

1. **Liquid renders the current IST time** into a data attribute when the page
   is built. Good enough to build the initial slot list.
2. **The browser fetches server time on load and before pay**: request
   `/cart.js` and read the `Date` response header. That is Shopify's own clock,
   in UTC, and a shopper cannot change it by changing their phone's clock.
   Convert to IST by adding 5 hours 30 minutes. Recompute the cutoff against
   this value immediately before building the cart, and refuse if it has passed.
3. **The order is validated again after it is placed**, see 7.8.

Never do date arithmetic with `new Date()` on the shopper's clock alone.

### 7.7 When the window closes

If the countdown reaches zero while somebody is in the flow:

- The pay button is disabled at once.
- A banner replaces the countdown: "Ordering for the 2:30 pm train has closed.
  We need 45 minutes to cook and reach the platform. Pick a later train and your
  basket stays as it is."
- One tap, "Choose another train", takes them back to step 1 with the time
  cleared and everything else, including the basket, kept.

The same message covers the case where somebody lands on the page after hours,
except it names the opening time: "The counter opens at 9:30 am. Orders for
trains from 10:15 am onwards can be placed then."

### 7.8 Enforcing the rule on the server side

Client side checks are for the shopper's benefit. They are not security. Add at
least one real check behind them, in this order of preference.

1. **Best: a cart and checkout validation Shopify Function.** Read the cart
   attributes, compare `arrival_at_iso` against the server's own clock, and
   block checkout with the message "Ordering for this train has closed" when the
   gap is under `cutoff_minutes`. Also block when `service` is
   `railway-delivery` and the required attributes are missing, and when a non
   railway product is in the cart. Before choosing this route, confirm with the
   Shopify docs tools that validation functions are available on this store's
   plan, and confirm you can actually deploy a function here. If you cannot
   deploy, say so plainly and use option 2 rather than pretending option 1 is in
   place.
2. **Fallback: catch it immediately after the order.** A Shopify Flow triggered
   on order creation, filtered to orders tagged `railway`, that alerts the store
   by email and SMS the moment an order lands, so a human sees every one within
   a minute. Pair it with the rule written into the Railway delivery terms page:
   an order that arrives inside the 45 minute window is refunded in full and the
   customer is called. Staff can act on that in seconds because the arrival time
   is in the order's attributes and its tags.
3. **Always, regardless**: tag every order at creation with `railway`,
   `station:vapi` or `station:valsad`, `train:12934` and `date:2026-09-03`, so
   the admin can be filtered into a usable run sheet for the day.

Be honest in your handover about which of these you actually shipped.

### 7.9 The cart guard

The cart must only ever contain live snack products and the station delivery
fee. On every cart change, and again before checkout, check every line: if any
line is not in a live board section collection and is not the delivery fee,
remove it and show "Only live counter items can be ordered to a train. The rest
of the shop is at the counter." This is what stops a stray Charliee or counter
product from reaching checkout if a link is ever shared.

### 7.10 Copy for the module

Use these, they are dash free and in the brand's voice.

- Section eyebrow: `Order to your train`
- Section heading: `We will meet you on the platform.`
- Standfirst: `Passing through Vapi or Valsad? Order from the live counter and
  we will bring it to your coach door when your train pulls in. Cooked after you
  order, handed over hot, at least 45 minutes from now.`
- Three small assurances under the standfirst, as chips with tiny marks:
  `Cooked after you order` · `Handed over at your coach` · `Paid securely on Shopify`
- Step titles: `Your train`, `The order`, `Confirm and pay`
- The one line that has to be unmissable, set beside the arrival time field:
  `We need 45 minutes. Order by 1:45 pm for a 2:30 pm train.`
- A closing note under the module: `We deliver to Vapi Junction and Valsad
  station only. Home delivery is coming later. Everything else on this site is
  sold at the counter.`

Error messages, all of them written like a person:

| Case | Message |
| - | - |
| PNR wrong length | `A PNR is 10 digits. Check the ticket and try again.` |
| Train number wrong | `Train numbers are 5 digits, like 12934.` |
| Time too close | `That is under 45 minutes away. The kitchen needs the time. Pick a later train.` |
| Outside hours | `The counter runs 9:30 am to 10:00 pm. We cannot reach a train outside those hours.` |
| Coach format | `Coach looks like S4, B2 or A1.` |
| Phone | `We need a 10 digit mobile number. The runner will call it if the coach moves.` |
| Under minimum | `Station orders start at ₹200.` |
| Nothing selected | `Add something from the board first.` |

### 7.11 Edge cases you must handle

- **Train delayed.** Say on the confirmation and in the email: "If your train is
  running late, call the counter on the number below and we will hold the
  parcel." Do not build automatic rescheduling.
- **Two orders on one PNR.** Allowed. Tag the second `repeat-pnr` so staff can
  see it is intentional.
- **A dish sells out after the order.** The kitchen turns `available_today` off,
  which removes it from the module. For orders already placed, staff call. Note
  this in the handover.
- **Abandoned checkout emails.** An email chasing a basket for a train that has
  already left is worse than no email. Suppress or shorten the abandoned
  checkout flow for carts tagged `railway` if the plan allows it, and say so
  either way.
- **Someone reaches `/checkout` without going through the module.** The cart
  guard and the validation function both catch it. If neither is available, the
  order still arrives tagged without a train, and the Flow alert catches it.
- **Slow connection.** The whole module must work on 3G. No large JS payload, no
  blocking fonts, optimistic UI on the steppers.

### 7.12 What staff see

Write a short **Railway orders runbook** as an unlisted page or a handover note:
how to filter the admin by the `railway` tag, how to read the attributes, what
to do about a late train, and how to refund an order that came in inside the
window. Two hundred words, plain language, in English and, if you can, Gujarati.

---

## 8. Order of work

1. Store settings, currency, timezone, policies, payment gateway.
2. Metafield definitions, the `station` metaobject, and the collections.
3. Products: 46 dishes, the delivery fee, and the Charliee packs. Images
   uploaded to Files and attached.
4. The theme skeleton: design tokens, fonts, header, footer, page shell.
5. Home, section by section, mobile first, ending with the Charliee shelf.
6. What we sell, then About, Franchise, Contact.
7. Live snacks, the board first.
8. The ordering module, then the server side enforcement, then a real test
   order paid with a real method and refunded.
9. Accessibility and Lighthouse pass, on a phone profile.
10. Handover notes: how to add a counter, how to add a dish, how to turn a dish
    off for the day, how to change the 45 minute rule, and exactly which of the
    7.8 options is live.

Show a preview link at the end of step 5 and again at the end of step 8. Do not
publish the theme without being asked.

---

## 9. Acceptance checklist

Do not report done until every line is true, and say which ones you verified by
actually looking rather than by reasoning.

**Global**

- [ ] There is no marquee, ticker or auto scrolling strip anywhere on the site.
- [ ] No hyphen, en dash or em dash appears in any customer facing string.
- [ ] Every page is checked at 360, 390 and 430 wide, and nothing overflows the
      viewport horizontally.
- [ ] Fonts are self hosted, and there is no flash of unstyled text.
- [ ] Reduced motion removes all transforms and auto motion, and every page
      still reads.
- [ ] Lighthouse mobile: performance 90 or better, accessibility 100.

**Content model**

- [ ] Adding a collection with the `cds` metafields makes a new counter appear
      on What we sell and in the arc, with no code change. Prove it by adding a
      test counter and then deleting it.
- [ ] Adding a product to a section collection makes a new dish appear on the
      board and in the ordering module. Prove it the same way.
- [ ] Setting `available_today` to false removes a dish from the ordering
      module but leaves it on the board with a quiet "off today" mark.

**Charliee shelf**

- [ ] The rail snaps, peeks the next card, and never moves on its own.
- [ ] The shelf line and the pack shadows are present.
- [ ] The claim about both stores is on screen without scrolling past the rail.
- [ ] No price, no add to cart, nowhere in the section.

**Ordering module**

- [ ] A train 44 minutes away cannot be ordered for. A train 46 minutes away
      can. Test both.
- [ ] Changing the phone's clock forward by two hours does not let a closed
      window reopen.
- [ ] The countdown reaching zero disables payment and keeps the basket.
- [ ] A real test order reaches checkout with every attribute present, pays,
      and appears in the admin tagged and readable.
- [ ] The order confirmation email shows coach, seat, arrival time and the store
      phone number near the top.
- [ ] A non live product added to the cart by hand is removed by the guard.
- [ ] Checkout asks for no shipping address.

---

## 10. How to work

- Ask before doing anything destructive to existing store data.
- Prefer the Admin GraphQL API over manual admin steps, so the work is
  repeatable, and keep a record of the mutations you ran.
- When a Shopify capability is uncertain, check the developer documentation
  tools rather than guessing, and tell me what you found.
- If something in this brief is not possible on this store's plan, say so and
  propose the nearest thing. Do not silently substitute.
- Report progress at each milestone in section 8 with a preview link.

---

# Appendix A: the fifteen counters

Create one collection each, in this order, with the metafields from section 4.1.
`featured` marks the counters the home page leans on.

**1. Sweets** · handle `sweets` · group Sweet counter · mark `sweets` · featured
Tagline: Mithai, by the kilo
Blurb: The counter people queue at through Diwali week. Ghee forward, set that morning, boxed while you wait.
Items: Kaju katli, Mohanthal, Ghari, Penda, Mysore pak, Soan papdi, Anjeer barfi, Kaju roll, Malai barfi, Dry fruit halwa

**2. Live sweets** · handle `live-sweets` · group Sweet counter · mark `liveSweets` · featured
Tagline: Made in front of you
Blurb: Chhena work that cannot sit on a shelf. Dropped into syrup at the counter and handed over still warm.
Items: Rasgulla, Gulab jamun, Malai sandwich, Rasmalai, Chhena murki, Jalebi, Hot halwa

**3. Cakes** · handle `cakes` · group Sweet counter · mark `cakes` · featured
Tagline: Built to your brief
Blurb: Every cake is made to order. Bring a photo, a colour, a flavour or a rough idea and we will work to it.
Items: Custom themes, Photo print tops, Tiered cakes, Egg and eggless, Cupcakes, Brownie slabs, Jar cakes, Sugar free options

**4. Bakery** · handle `bakery` · group Sweet counter · mark `bakery`
Tagline: Out of the oven daily
Blurb: The tea time shelf. Baked in small runs so the khari still shatters when you bite it.
Items: Butter khari, Nankhatai, Cream rolls, Veg puffs, Cookies, Rusk and toast, Bread, Croissants

**5. Chocolate** · handle `chocolate` · group Sweet counter · mark `chocolate`
Tagline: Indian and imported
Blurb: A wall of it. Everyday bars at one end, single origin and gift boxes at the other.
Items: Imported bars, Truffles, Dragees, Gift boxes, Couverture for baking, Festive moulds, Chocolate hampers

**6. Namkeen** · handle `namkeen` · group Farsan and snacks · mark `namkeen` · featured
Tagline: Gujarat, salted
Blurb: Farsan the way south Gujarat expects it. Fried fresh, sold by weight, never softened by a long shelf life.
Items: Bhavnagri gathiya, Sev, Chevdo, Fafda, Tikha mitha, Farali chevdo, Ratlami sev, Bhujia, Chakli, Papdi

**7. Khakhra** · handle `khakhra` · group Farsan and snacks · mark `khakhra`
Tagline: Pressed thin
Blurb: Roasted on the tawa and pressed by hand until it snaps clean. The travel food of every Gujarati household.
Items: Methi, Jeera, Masala, Pudina, Bhakhri khakhra, Cheese chilli, Panipuri khakhra, Plain

**8. Banana chips** · handle `banana-chips` · group Farsan and snacks · mark `bananaChips`
Tagline: Fried in coconut oil
Blurb: Kerala style, sliced straight into the kadai. The pepper batch goes first, every single day.
Items: Salted, Pepper, Coconut oil fried, Sharkara varatti, Jackfruit chips, Tapioca chips

**9. Makhana** · handle `makhana` · group Farsan and snacks · mark `makhana`
Tagline: Roasted, not fried
Blurb: Fox nuts roasted in small batches. The snack you can eat a bowl of without thinking twice.
Items: Roasted salted, Peri peri, Cheese, Caramel, Tandoori, Plain phool makhana

**10. Dry fruits** · handle `dry-fruits` · group Pantry and gifting · mark `dryFruits` · featured
Tagline: Graded and dated
Blurb: Bought by grade, not by guess. Ask for the grade you want and we will show you the sack it came from.
Items: Mamra almonds, California almonds, Cashew W180 and W240, Pistachio, Walnut kernels, Raisins, Anjeer, Apricot, Dates, Mixed berries

**11. Saffron** · handle `saffron` · group Pantry and gifting · mark `saffron`
Tagline: Mongra and Sargol
Blurb: Kept in tins, weighed on a jeweller scale. One gram is enough to tell you whether it is the real thing.
Items: Kashmiri Mongra, Iranian Sargol, One gram tins, Two gram tins, Five gram tins, Gift presentation boxes

**12. Mouth freshener** · handle `mouth-freshener` · group Pantry and gifting · mark `mouthFreshener`
Tagline: The end of the meal
Blurb: Mukhwas by the scoop, in the jars near the till. Sweet at one end, sharp and digestive at the other.
Items: Saunf mix, Silver coated elaichi, Paan mukhwas, Dhaniya dal, Digestive goli, Sugar coated saunf, Tuti fruity mix

**13. Imported shelf** · handle `imported` · group Imported aisle · mark `imported` · featured
Tagline: Flown in
Blurb: The aisle people drive over from the next town for. Coffee, biscuits, sauces and confectionery you will not find locally.
Items: Coffee, Chocolates, Biscuits, Sauces, Pasta, Breakfast cereal, Syrups, Crisps

**14. Classic sodas** · handle `classic-sodas` · group Imported aisle · mark `sodas`
Tagline: Glass bottle only
Blurb: Imported cans and glass bottles, including the cane sugar recipes. It really does taste different.
Items: Coke, Sprite, Fanta, Schweppes, Pepsi, Mountain Dew, Cane sugar glass bottles

**15. Charliee** · handle `charliee-counter` · group Charliee label · mark `charliee` · featured
Tagline: Our own name on it
Blurb: The house label. We put the Charliee name on a product only once it outsells everything beside it.
Items: Charliee namkeen, Charliee makhana, Charliee dry fruit packs, Charliee mukhwas, Charliee gift hampers, Charliee festive boxes

Note the handle: the counter tile is `charliee-counter` so it does not collide
with the `charliee` product collection that feeds the home page shelf.

---

# Appendix B: the live counter board

Transcribed from the board that hangs above the counter. Prices are in rupees
and were read off the board in **August 2026**, which the page states. The code
is the number printed beside the item, and customers order by it, so it is shown
on the card and carried into the order.

Whole board: pure vegetarian, and **no onion, no garlic, no potato**, which is
printed on the board and is therefore a promise.

None of the items is currently marked a counter favourite. Leave `cds.hot` false
on all of them and let the merchant switch on a few from the admin.

**Chaat** · handle `chaat` · kicker "Assembled the second you order" · wait "About 4 minutes" · prep 4

| Code | Item | ₹ | Photograph |
| - | - | - | - |
| 1001947 | Pani puri | 60 | yes |
| 1001948 | Masala puri | 60 | yes |
| 1003645 | Chutney puri | 70 | |
| 1001951 | Bhel puri | 70 | yes |
| 1001949 | Sev puri | 70 | yes |
| 1001950 | Cheese sev puri | 90 | |
| 1001952 | Cheese bhel puri | 90 | |
| 1001953 | Dahi puri | 90 | yes |
| 1001968 | Dahi wada | 60 | |
| 1001955 | Dahi papdi chaat | 90 | |
| 1001970 | Samosa with chutney | 30 | |
| 1001969 | Samosa chaat | 60 | yes |
| 1001972 | Dahi samosa chaat | 70 | |
| 1001973 | Cheese samosa chaat | 80 | |
| 1001974 | Dahi khasta kachori | 60 | |
| 1002067 | Ragda pattice | 60 | yes |

**Burger** · handle `burger` · kicker "Griddled patty, toasted bun" · wait "About 8 minutes" · prep 8

| Code | Item | ₹ | Photograph |
| - | - | - | - |
| 1003041 | Burger | 70 | yes |
| 1003042 | Cheese burger | 90 | yes |
| 1003043 | Peri peri burger | 90 | yes |
| 1003044 | Schezwan burger | 90 | |

**Sandwich** · handle `sandwich` · kicker "Off the grill press" · wait "About 6 minutes" · prep 6

| Code | Item | ₹ | Photograph |
| - | - | - | - |
| 1003046 | Veg sandwich | 60 | yes |
| 1003669 | Toast sandwich | 75 | yes |
| 1003070 | Cheese chilli toast | 100 | yes |

**Frankie** · handle `frankie` · kicker "Rolled to order, wrapped in paper" · wait "About 8 minutes" · prep 8

| Code | Item | ₹ | Photograph |
| - | - | - | - |
| 1003060 | Veg frankie | 90 | yes |
| 1003061 | Veg cheese frankie | 110 | yes |
| 1003062 | Veg cheese manchurian | 130 | |
| 1003063 | Veg cheese schezwan | 130 | |

**Dabeli** · handle `dabeli` · kicker "Kutchi masala, pressed on the tawa" · wait "About 5 minutes" · prep 5

| Code | Item | ₹ | Photograph |
| - | - | - | - |
| 1003096 | Butter dabeli | 50 | yes |
| 1003097 | Cheese dabeli | 70 | yes |

**Pizza** · handle `pizza` · kicker "Stretched, topped and baked to order" · wait "About 12 minutes" · prep 12

| Code | Item | ₹ | Photograph |
| - | - | - | - |
| 1003075 | Classic margherita | 265 | yes |
| 1003076 | Four cheese | 295 | yes |
| 1003077 | Mexican | 305 | |
| 1003078 | Peri peri | 305 | yes |
| 1003079 | Tandoori | 305 | yes |
| 1003080 | Chinese retreat | 315 | |
| 1003081 | English retreat | 315 | |

**Beverages** · handle `beverages` · kicker "Shaken over ice at the cold counter" · wait "About 5 minutes" · prep 5

| Code | Item | ₹ | Photograph |
| - | - | - | - |
| 1003098 | Mint mojito | 145 | yes |
| 1003100 | Green apple mojito | 155 | |
| 1003101 | Passion fruit mojito | 155 | |
| 1003099 | Blue lagoon mojito | 155 | yes |
| 1003104 | Green screwdriver | 195 | |
| 1003106 | Sunset | 195 | yes |
| 1003102 | Blueberry lavender | 195 | |
| 1003103 | Cinderella | 195 | |
| 1003108 | Jamun shots | 125 | |
| 1003107 | Guava shots | 125 | yes |

Forty six items, twenty five of them photographed.

**Board small print**, shown at the foot of the page word for word:

- Parcel charges are extra
- An order once placed cannot be cancelled
- No onion, no garlic and no potato in anything above

---

# Appendix C: the long copy

Use this exactly. It is already dash free.

## About

Standfirst: CDS stands for Charliee Day to Day Stores. Two shops in south
Gujarat, one in Valsad and one in Vapi, built around a simple idea: the things
you buy every week deserve the same care as the things you buy once a year.

**01 The counter came first.** We started the way most good food shops start,
with one counter and a queue that was slightly too long for it. Sweets in the
morning, farsan by the afternoon, and a stream of regulars who told us exactly
what we were getting wrong. We listened, mostly.

**02 Then it kept growing.** A khakhra shelf became a farsan wall. A jar of
mukhwas became a gifting counter. Somebody asked for imported coffee and we
found a supplier. Fifteen counters later, the shop still runs on the same rule:
if a regular asks for it twice, we stock it.

**03 Live, because it has to be.** Chhena will not wait. Jalebi will not wait. A
pizza that sat under a lamp is a different food to one that did not. So the live
counter was never a gimmick for us, it was the only honest way to sell those
things.

**04 Charliee on the label.** Our own name goes on a product only after it has
outsold everything next to it on the shelf. That is a slow way to build a brand.
It is also the only way we know how.

**The four values**, under the heading "Four rules we have never had a reason to
break.":

- **Weighed in front of you.** The scale faces the customer. It always has. You
  should be able to read your own weight without leaning over the counter.
- **Small batches, short shelves.** We would rather run out at eight in the
  evening than sell you something fried on Tuesday. Empty trays are a good sign.
- **Grades, not guesses.** Cashew is sold as W180 or W240. Saffron is Mongra or
  Sargol. If we cannot name the grade, we do not stock it.
- **Ask and we will find it.** Half the imported aisle exists because a regular
  asked. The request book by the till is genuinely read.

## Franchise

Standfirst: CDS works because it is a lot of small, well run counters in one
room. That is a model that travels. If you know your city and you are willing to
stand behind the scale yourself, we should talk.

**The five steps**, under "Five steps, about four months.":

- **01 You get in touch.** About a week. Tell us the city, the catchment and the
  square footage you are looking at. A phone call is usually enough to know
  whether it is worth going further.
- **02 We look at the site together.** Two to three weeks. Footfall, frontage,
  parking, the shops either side of you. We visit. A CDS in the wrong location
  is worse for us than no CDS at all.
- **03 Layout and fit out.** Six to ten weeks. We plan the counter layout, the
  cold chain, the live kitchen and the gifting wall with you, then hand you a
  drawing your contractor can build from.
- **04 Training at our counter.** Two weeks. You and your team spend time in
  Valsad or Vapi. Not a slideshow. Actual shifts, on an actual counter, through
  an actual evening rush.
- **05 You open.** Opening day. We are in your store for the first fortnight.
  After that we are a phone call away, and we visit through every festival
  season.

**What CDS provides**, under "Not a logo file and good luck.":

- **The full counter plan.** Fifteen counters, worked out. Which ones carry the
  rent, which ones bring people in and where each one sits in the room.
- **Supply on our terms.** You buy at the price we buy at. Sweets, farsan, dry
  fruit, imported stock and the Charliee label, all on one order.
- **Live kitchen setup.** Equipment list, kitchen layout, recipes and the
  standards we hold our own counters to. Chefs trained by our chefs.
- **The brand, properly.** Signage, packaging, uniforms, festive artwork and a
  launch campaign for your city. Not a logo file and good luck.
- **Festive planning.** Diwali, Raksha Bandhan and wedding season are most of
  the year. We plan your stock and your staffing for them with you.
- **Someone who picks up.** One person at CDS owns your store. You have their
  number. They visit, and they answer.

Closing: We are opening slowly and choosing carefully, so there is no
application portal and no sales team. You will speak to the family that runs the
stores.

## Numbers to confirm before launch

These are the current figures on the reference site. Ask me to confirm them
before you publish, and expose every one as a theme setting so they can be
corrected without a developer:

- 2 stores, 15 counters, 900+ products, 7 days a week
- 1,200 to 2,500 sq ft, 25 ft frontage, 10 to 16 people, about four months
- Opening hours 9:30 am to 10:00 pm, seven days

---

# Appendix D: images

The reference site's photography lives in the GitHub repository
`abhijk1011/CDSWebsite`, on the branch `claude/shopify-store-migration-eqdp01`,
under `public/`. Upload them to Shopify Files with `stagedUploadsCreate` and
`fileCreate`, then attach them.

- `public/counters/` : fifteen counter photographs, named by handle, for example
  `sweets.jpg`, `dry-fruits.jpg`, `classic-sodas.jpg`. Attach each as its
  collection image.
- `public/live/` : twenty five dish photographs, named by dish, for example
  `pani-puri.jpg`, `four-cheese.jpg`, `mint-mojito.jpg`. Attach each to its
  product. The first of them also serves as the live snacks hero.
- `public/charliee/` : twelve Charliee pack photographs, `charliee-01.jpg`
  through `charliee-12.jpg`, all 1200 by 1500, four by five portrait. Use these
  for the Charliee shelf cards until real pack shots replace them, and keep the
  four by five ratio when they do.

If you cannot reach the repository, tell me and I will upload the folders to
Shopify Files myself before you start.

---

# One last thing

The reference site's own summary of itself is a good test of whether you have
built the right thing: *a day to day store from Gujarat carrying sweets, farsan,
bakery, dry fruits, chocolate and a live snack counter under one roof, where the
everyday feels like an occasion.* It is warm, it is confident, and it never
shouts. If a section you have built feels like a template, it is not finished.
