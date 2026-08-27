/**
 * Single source of truth for brand, contact and navigation copy.
 *
 * House style: no dash characters anywhere in visible copy.
 * No em dash, no en dash, no hyphen. Use commas, full stops or the
 * middot separator instead. `npm run check:copy` enforces this.
 */

export const brand = {
  short: "CDS",
  name: "Charliee Day to Day Stores",
  promise: "Where the everyday feels like an occasion.",
  region: "Valsad · Vapi · Gujarat",
  description:
    "A day to day store from Gujarat carrying sweets, farsan, bakery, dry fruits, chocolate and a live snack counter under one roof.",
} as const;

export type Store = {
  slug: string;
  city: string;
  label: string;
  lines: string[];
  pin: string;
  phoneDisplay: string;
  phoneDial: string;
  whatsapp: string;
  mapsQuery: string;
};

/**
 * TODO for the CDS team: confirm these before launch.
 * Addresses and phone numbers are taken from the public listings.
 */
export const stores: Store[] = [
  {
    slug: "vapi",
    city: "Vapi",
    label: "The Vapi counter",
    lines: [
      "Shop No. 1, 2, 3, 4",
      "Opposite Ashadham School",
      "Koparli Road, Vapi Station Road",
    ],
    pin: "Vapi, Gujarat 396191",
    phoneDisplay: "+91 95122 77746",
    phoneDial: "+919512277746",
    whatsapp: "919512277746",
    mapsQuery: "CDS Stores, Koparli Road, Vapi Station Road, Vapi, Gujarat 396191",
  },
  {
    slug: "valsad",
    city: "Valsad",
    label: "The Valsad counter",
    lines: ["Shop No. 3/4, Bina Park", "Tithal Road, Zinnat Nagar"],
    pin: "Valsad, Gujarat 396001",
    phoneDisplay: "+91 70390 47746",
    phoneDial: "+917039047746",
    whatsapp: "917039047746",
    mapsQuery: "CDS Stores, Bina Park, Tithal Road, Zinnat Nagar, Valsad, Gujarat 396001",
  },
];

/** TODO for the CDS team: confirm opening hours. */
export const hours = {
  days: "Every day of the week",
  open: "9:30 am",
  close: "10:00 pm",
  /** 24 hour clock, used to work out whether the counter is open right now. */
  openMinutes: 9 * 60 + 30,
  closeMinutes: 22 * 60,
  note: "Festival weeks run longer. Call ahead and we will keep the counter warm.",
} as const;

export const social = [
  { label: "Instagram", href: "https://www.instagram.com/cdsstores/" },
  { label: "Facebook", href: "https://www.facebook.com/CDSstores/" },
] as const;

/**
 * Delivery partners.
 *
 * TODO for the CDS team: replace each href with the real listing for the
 * store. These point at the partner's own search until then, which is honest
 * about not knowing the outlet rather than sending someone to a dead link.
 *
 * The marks are drawn in `src/components/marks.tsx` from each brand's own
 * colour. To use the official artwork instead, drop `zomato.svg` and
 * `swiggy.svg` into `public/brands` and the button picks them up with no
 * code change.
 */
export type Delivery = {
  id: "zomato" | "swiggy";
  label: string;
  href: string;
  /** The partner's brand colour, used for the button and the mark. */
  colour: string;
};

export const delivery: Delivery[] = [
  {
    id: "zomato",
    label: "Zomato",
    href: "https://www.zomato.com/vapi/restaurants?q=CDS",
    colour: "#E23744",
  },
  {
    id: "swiggy",
    label: "Swiggy",
    href: "https://www.swiggy.com/search?query=CDS",
    colour: "#FC8019",
  },
];

export const nav = [
  { label: "What we sell", href: "/what-we-sell" },
  { label: "Live snacks", href: "/live-snacks" },
  { label: "About us", href: "/about" },
  { label: "Franchise", href: "/franchise" },
  { label: "Contact", href: "/contact" },
] as const;

export const primaryStore = stores[0];
