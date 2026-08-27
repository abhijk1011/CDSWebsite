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
  /**
   * The number printed beside the item on the counter board. People order by
   * it, so it belongs on the page: it is the one detail that ties this list
   * to the board a customer is standing in front of.
   */
  code?: string;
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
      { image: "/live/pani-puri.jpg", name: "Pani puri", code: "1001947", price: "60" },
      { image: "/live/masala-puri.jpg", name: "Masala puri", code: "1001948", price: "60" },
      { name: "Chutney puri", code: "1003645", price: "70" },
      { image: "/live/bhel-puri.jpg", name: "Bhel puri", code: "1001951", price: "70" },
      { image: "/live/sev-puri.jpg", name: "Sev puri", code: "1001949", price: "70" },
      { name: "Cheese sev puri", code: "1001950", price: "90" },
      { name: "Cheese bhel puri", code: "1001952", price: "90" },
      { image: "/live/dahi-puri.jpg", name: "Dahi puri", code: "1001953", price: "90" },
      { name: "Dahi wada", code: "1001968", price: "60" },
      { name: "Dahi papdi chaat", code: "1001955", price: "90" },
      { name: "Samosa with chutney", code: "1001970", price: "30" },
      { image: "/live/samosa-chaat.jpg", name: "Samosa chaat", code: "1001969", price: "60" },
      { name: "Dahi samosa chaat", code: "1001972", price: "70" },
      { name: "Cheese samosa chaat", code: "1001973", price: "80" },
      { name: "Dahi khasta kachori", code: "1001974", price: "60" },
      { image: "/live/ragda-pattice.jpg", name: "Ragda pattice", code: "1002067", price: "60" },
    ],
  },
  {
    id: "burger",
    name: "Burger",
    kicker: "Griddled patty, toasted bun",
    wait: "About 8 minutes",
    items: [
      { image: "/live/burger.jpg", name: "Burger", code: "1003041", price: "70" },
      { image: "/live/cheese-burger.jpg", name: "Cheese burger", code: "1003042", price: "90" },
      { image: "/live/peri-peri-burger.jpg", name: "Peri peri burger", code: "1003043", price: "90" },
      { name: "Schezwan burger", code: "1003044", price: "90" },
    ],
  },
  {
    id: "sandwich",
    name: "Sandwich",
    kicker: "Off the grill press",
    wait: "About 6 minutes",
    items: [
      { image: "/live/veg-sandwich.jpg", name: "Veg sandwich", code: "1003046", price: "60" },
      { image: "/live/toast-sandwich.jpg", name: "Toast sandwich", code: "1003669", price: "75" },
      { image: "/live/cheese-chilli-toast.jpg", name: "Cheese chilli toast", code: "1003070", price: "100" },
    ],
  },
  {
    id: "frankie",
    name: "Frankie",
    kicker: "Rolled to order, wrapped in paper",
    wait: "About 8 minutes",
    items: [
      { image: "/live/veg-frankie.jpg", name: "Veg frankie", code: "1003060", price: "90" },
      { image: "/live/veg-cheese-frankie.jpg", name: "Veg cheese frankie", code: "1003061", price: "110" },
      { name: "Veg cheese manchurian", code: "1003062", price: "130" },
      { name: "Veg cheese schezwan", code: "1003063", price: "130" },
    ],
  },
  {
    id: "dabeli",
    name: "Dabeli",
    kicker: "Kutchi masala, pressed on the tawa",
    wait: "About 5 minutes",
    items: [
      { image: "/live/butter-dabeli.jpg", name: "Butter dabeli", code: "1003096", price: "50" },
      { image: "/live/cheese-dabeli.jpg", name: "Cheese dabeli", code: "1003097", price: "70" },
    ],
  },
  {
    id: "pizza",
    name: "Pizza",
    kicker: "Stretched, topped and baked to order",
    wait: "About 12 minutes",
    items: [
      { image: "/live/classic-margherita.jpg", name: "Classic margherita", code: "1003075", price: "265" },
      { image: "/live/four-cheese.jpg", name: "Four cheese", code: "1003076", price: "295" },
      { name: "Mexican", code: "1003077", price: "305" },
      { image: "/live/peri-peri-pizza.jpg", name: "Peri peri", code: "1003078", price: "305" },
      { image: "/live/tandoori-pizza.jpg", name: "Tandoori", code: "1003079", price: "305" },
      { name: "Chinese retreat", code: "1003080", price: "315" },
      { name: "English retreat", code: "1003081", price: "315" },
    ],
  },
  {
    id: "beverages",
    name: "Beverages",
    kicker: "Shaken over ice at the cold counter",
    wait: "About 5 minutes",
    items: [
      { image: "/live/mint-mojito.jpg", name: "Mint mojito", code: "1003098", price: "145" },
      { name: "Green apple mojito", code: "1003100", price: "155" },
      { name: "Passion fruit mojito", code: "1003101", price: "155" },
      { image: "/live/blue-lagoon-mojito.jpg", name: "Blue lagoon mojito", code: "1003099", price: "155" },
      { name: "Green screwdriver", code: "1003104", price: "195" },
      { image: "/live/sunset.jpg", name: "Sunset", code: "1003106", price: "195" },
      { name: "Blueberry lavender", code: "1003102", price: "195" },
      { name: "Cinderella", code: "1003103", price: "195" },
      { name: "Jamun shots", code: "1003108", price: "125" },
      { image: "/live/guava-shots.jpg", name: "Guava shots", code: "1003107", price: "125" },
    ],
  },
];
