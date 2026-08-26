/**
 * The live counter menu.
 *
 * This is a transcription of the board that hangs above the counter, section
 * for section and price for price. Anything not on that board does not belong
 * in this file. When the board changes, change this file and nothing else:
 * every surface that shows the menu reads from here.
 */

export type MenuItem = {
  name: string;
  note?: string;
  /** Rupees, as printed on the board. */
  price?: string;
  /** Draws the counter favourite mark. Reserve it for genuine favourites. */
  hot?: boolean;
  /**
   * Photograph of the dish, shown on the home page live panel as the name
   * rotates. Drop files into /public/live and set the path here, for example
   * "/live/pani-puri.jpg". Landscape or square both work: the panel crops to
   * fill. Items without one simply never take a turn in the rotation.
   */
  image?: string;
};

export type MenuSection = {
  id: string;
  name: string;
  kicker: string;
  /** Roughly how long the counter takes to hand it over. */
  wait: string;
  items: MenuItem[];
};

export const pureVeg = true;

/** No onion, no garlic, no potato. Printed on the board, so it is a promise. */
export const jain = true;

/**
 * Prices move. Saying when these were read off the board is the difference
 * between a page that is current and a page that merely looks current.
 */
export const pricesAsOf = "August 2026";

/** The small print at the foot of the board, word for word. */
export const boardNotes = [
  "Parcel charges are extra",
  "An order once placed cannot be cancelled",
  "No onion, no garlic and no potato in anything above",
];

export const menu: MenuSection[] = [
  {
    id: "chaat",
    name: "Chaat",
    kicker: "Assembled the second you order",
    wait: "About 4 minutes",
    items: [
      { image: "/live/pani-puri.jpg", name: "Pani puri", price: "60" },
      { image: "/live/masala-puri.jpg", name: "Masala puri", price: "60" },
      { name: "Chutney puri", price: "70" },
      { image: "/live/bhel-puri.jpg", name: "Bhel puri", price: "70" },
      { image: "/live/sev-puri.jpg", name: "Sev puri", price: "70" },
      { name: "Cheese sev puri", price: "90" },
      { name: "Cheese bhel puri", price: "90" },
      { image: "/live/dahi-puri.jpg", name: "Dahi puri", price: "90" },
      { name: "Dahi wada", price: "60" },
      { name: "Dahi papdi chaat", price: "90" },
      { name: "Samosa with chutney", price: "30" },
      { image: "/live/samosa-chaat.jpg", name: "Samosa chaat", price: "60" },
      { name: "Dahi samosa chaat", price: "70" },
      { name: "Cheese samosa chaat", price: "80" },
      { name: "Dahi khasta kachori", price: "60" },
      { image: "/live/ragda-pattice.jpg", name: "Ragda pattice", price: "60" },
    ],
  },
  {
    id: "burger",
    name: "Burger",
    kicker: "Griddled patty, toasted bun",
    wait: "About 8 minutes",
    items: [
      { image: "/live/burger.jpg", name: "Burger", price: "70" },
      { image: "/live/cheese-burger.jpg", name: "Cheese burger", price: "90" },
      { image: "/live/peri-peri-burger.jpg", name: "Peri peri burger", price: "90" },
      { name: "Schezwan burger", price: "90" },
    ],
  },
  {
    id: "sandwich",
    name: "Sandwich",
    kicker: "Off the grill press",
    wait: "About 6 minutes",
    items: [
      { image: "/live/veg-sandwich.jpg", name: "Veg sandwich", price: "60" },
      { image: "/live/toast-sandwich.jpg", name: "Toast sandwich", price: "75" },
      { image: "/live/cheese-chilli-toast.jpg", name: "Cheese chilli toast", price: "100" },
    ],
  },
  {
    id: "frankie",
    name: "Frankie",
    kicker: "Rolled to order, wrapped in paper",
    wait: "About 8 minutes",
    items: [
      { image: "/live/veg-frankie.jpg", name: "Veg frankie", price: "90" },
      { image: "/live/veg-cheese-frankie.jpg", name: "Veg cheese frankie", price: "110" },
      { name: "Veg cheese manchurian", price: "130" },
      { name: "Veg cheese schezwan", price: "130" },
    ],
  },
  {
    id: "dabeli",
    name: "Dabeli",
    kicker: "Kutchi masala, pressed on the tawa",
    wait: "About 5 minutes",
    items: [
      { image: "/live/butter-dabeli.jpg", name: "Butter dabeli", price: "50" },
      { image: "/live/cheese-dabeli.jpg", name: "Cheese dabeli", price: "70" },
    ],
  },
  {
    id: "pizza",
    name: "Pizza",
    kicker: "Stretched, topped and baked to order",
    wait: "About 12 minutes",
    items: [
      { image: "/live/classic-margherita.jpg", name: "Classic margherita", price: "265" },
      { image: "/live/four-cheese.jpg", name: "Four cheese", price: "295" },
      { name: "Mexican", price: "305" },
      { image: "/live/peri-peri-pizza.jpg", name: "Peri peri", price: "305" },
      { image: "/live/tandoori-pizza.jpg", name: "Tandoori", price: "305" },
      { name: "Chinese retreat", price: "315" },
      { name: "English retreat", price: "315" },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    kicker: "Shaken over ice at the cold counter",
    wait: "About 5 minutes",
    items: [
      { image: "/live/mint-mojito.jpg", name: "Mint mojito", price: "145" },
      { name: "Green apple mojito", price: "155" },
      { name: "Passion fruit mojito", price: "155" },
      { image: "/live/blue-lagoon-mojito.jpg", name: "Blue lagoon mojito", price: "155" },
      { name: "Green screwdriver", price: "195" },
      { image: "/live/sunset.jpg", name: "Sunset", price: "195" },
      { name: "Blueberry lavender", price: "195" },
      { name: "Cinderella", price: "195" },
      { name: "Jamun shots", price: "125" },
      { image: "/live/guava-shots.jpg", name: "Guava shots", price: "125" },
    ],
  },
];
