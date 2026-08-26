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

export const nav = [
  { label: "What we sell", href: "/what-we-sell" },
  { label: "Live snacks", href: "/live-snacks" },
  { label: "About us", href: "/about" },
  { label: "Franchise", href: "/franchise" },
  { label: "Contact", href: "/contact" },
] as const;

export const primaryStore = stores[0];
