/**
 * The counters at CDS. Order here is the order on the page.
 * Item lists are a starting point: edit freely, nothing else depends on them.
 * House style reminder: no dash characters in any visible copy.
 */

export type Group =
  | "Sweet counter"
  | "Farsan and snacks"
  | "Pantry and gifting"
  | "Imported aisle"
  | "Charliee label";

export type Category = {
  id: string;
  name: string;
  group: Group;
  /** Two or three words. Sits under the name on the tile. */
  tagline: string;
  /** One or two sentences. Shown when the tile opens. */
  blurb: string;
  items: string[];
  /** Key into the mark set in src/components/marks.tsx */
  mark: string;
  /**
   * Optional short clip for the arc carousel. Muted, looping, a few seconds
   * long. Drop files into /public/counters and set the paths here. Without
   * one the card falls back to its drawn mark, which is the current state.
   */
  video?: string;
  /** Still frame shown before the clip loads, and the fallback if it fails. */
  poster?: string;
  /** Marks the handful of counters that carry the home page. */
  featured?: boolean;
};

export const groups: Group[] = [
  "Sweet counter",
  "Farsan and snacks",
  "Pantry and gifting",
  "Imported aisle",
  "Charliee label",
];

export const categories: Category[] = [
  {
    id: "sweets",
    name: "Sweets",
    group: "Sweet counter",
    tagline: "Mithai, by the kilo",
    blurb:
      "The counter people queue at through Diwali week. Ghee forward, set that morning, boxed while you wait.",
    items: [
      "Kaju katli",
      "Mohanthal",
      "Ghari",
      "Penda",
      "Mysore pak",
      "Soan papdi",
      "Anjeer barfi",
      "Kaju roll",
      "Malai barfi",
      "Dry fruit halwa",
    ],
    mark: "sweets",
    featured: true,
  },
  {
    id: "live-sweets",
    name: "Live sweets",
    group: "Sweet counter",
    tagline: "Made in front of you",
    blurb:
      "Chhena work that cannot sit on a shelf. Dropped into syrup at the counter and handed over still warm.",
    items: [
      "Rasgulla",
      "Gulab jamun",
      "Malai sandwich",
      "Rasmalai",
      "Chhena murki",
      "Jalebi",
      "Hot halwa",
    ],
    mark: "liveSweets",
    featured: true,
  },
  {
    id: "cakes",
    name: "Cakes",
    group: "Sweet counter",
    tagline: "Built to your brief",
    blurb:
      "Every cake is made to order. Bring a photo, a colour, a flavour or a rough idea and we will work to it.",
    items: [
      "Custom themes",
      "Photo print tops",
      "Tiered cakes",
      "Egg and eggless",
      "Cupcakes",
      "Brownie slabs",
      "Jar cakes",
      "Sugar free options",
    ],
    mark: "cakes",
    featured: true,
  },
  {
    id: "bakery",
    name: "Bakery",
    group: "Sweet counter",
    tagline: "Out of the oven daily",
    blurb:
      "The tea time shelf. Baked in small runs so the khari still shatters when you bite it.",
    items: [
      "Butter khari",
      "Nankhatai",
      "Cream rolls",
      "Veg puffs",
      "Cookies",
      "Rusk and toast",
      "Bread",
      "Croissants",
    ],
    mark: "bakery",
  },
  {
    id: "chocolate",
    name: "Chocolate",
    group: "Sweet counter",
    tagline: "Indian and imported",
    blurb:
      "A wall of it. Everyday bars at one end, single origin and gift boxes at the other.",
    items: [
      "Imported bars",
      "Truffles",
      "Dragees",
      "Gift boxes",
      "Couverture for baking",
      "Festive moulds",
      "Chocolate hampers",
    ],
    mark: "chocolate",
  },
  {
    id: "namkeen",
    name: "Namkeen",
    group: "Farsan and snacks",
    tagline: "Gujarat, salted",
    blurb:
      "Farsan the way south Gujarat expects it. Fried fresh, sold by weight, never softened by a long shelf life.",
    items: [
      "Bhavnagri gathiya",
      "Sev",
      "Chevdo",
      "Fafda",
      "Tikha mitha",
      "Farali chevdo",
      "Ratlami sev",
      "Bhujia",
      "Chakli",
      "Papdi",
    ],
    mark: "namkeen",
    featured: true,
  },
  {
    id: "khakhra",
    name: "Khakhra",
    group: "Farsan and snacks",
    tagline: "Pressed thin",
    blurb:
      "Roasted on the tawa and pressed by hand until it snaps clean. The travel food of every Gujarati household.",
    items: [
      "Methi",
      "Jeera",
      "Masala",
      "Pudina",
      "Bhakhri khakhra",
      "Cheese chilli",
      "Panipuri khakhra",
      "Plain",
    ],
    mark: "khakhra",
  },
  {
    id: "banana-chips",
    name: "Banana chips",
    group: "Farsan and snacks",
    tagline: "Fried in coconut oil",
    blurb:
      "Kerala style, sliced straight into the kadai. The pepper batch goes first, every single day.",
    items: [
      "Salted",
      "Pepper",
      "Coconut oil fried",
      "Sharkara varatti",
      "Jackfruit chips",
      "Tapioca chips",
    ],
    mark: "bananaChips",
  },
  {
    id: "makhana",
    name: "Makhana",
    group: "Farsan and snacks",
    tagline: "Roasted, not fried",
    blurb:
      "Fox nuts roasted in small batches. The snack you can eat a bowl of without thinking twice.",
    items: [
      "Roasted salted",
      "Peri peri",
      "Cheese",
      "Caramel",
      "Tandoori",
      "Plain phool makhana",
    ],
    mark: "makhana",
  },
  {
    id: "dry-fruits",
    name: "Dry fruits",
    group: "Pantry and gifting",
    tagline: "Graded and dated",
    blurb:
      "Bought by grade, not by guess. Ask for the grade you want and we will show you the sack it came from.",
    items: [
      "Mamra almonds",
      "California almonds",
      "Cashew W180 and W240",
      "Pistachio",
      "Walnut kernels",
      "Raisins",
      "Anjeer",
      "Apricot",
      "Dates",
      "Mixed berries",
    ],
    mark: "dryFruits",
    featured: true,
  },
  {
    id: "saffron",
    name: "Saffron",
    group: "Pantry and gifting",
    tagline: "Mongra and Sargol",
    blurb:
      "Kept in tins, weighed on a jeweller scale. One gram is enough to tell you whether it is the real thing.",
    items: [
      "Kashmiri Mongra",
      "Iranian Sargol",
      "One gram tins",
      "Two gram tins",
      "Five gram tins",
      "Gift presentation boxes",
    ],
    mark: "saffron",
  },
  {
    id: "mouth-freshener",
    name: "Mouth freshener",
    group: "Pantry and gifting",
    tagline: "The end of the meal",
    blurb:
      "Mukhwas by the scoop, in the jars near the till. Sweet at one end, sharp and digestive at the other.",
    items: [
      "Saunf mix",
      "Silver coated elaichi",
      "Paan mukhwas",
      "Dhaniya dal",
      "Digestive goli",
      "Sugar coated saunf",
      "Tuti fruity mix",
    ],
    mark: "mouthFreshener",
  },
  {
    id: "imported",
    name: "Imported shelf",
    group: "Imported aisle",
    tagline: "Flown in",
    blurb:
      "The aisle people drive over from the next town for. Coffee, biscuits, sauces and confectionery you will not find locally.",
    items: [
      "Coffee",
      "Chocolates",
      "Biscuits",
      "Sauces",
      "Pasta",
      "Breakfast cereal",
      "Syrups",
      "Crisps",
    ],
    mark: "imported",
    featured: true,
  },
  {
    id: "classic-sodas",
    name: "Classic sodas",
    group: "Imported aisle",
    tagline: "Glass bottle only",
    blurb:
      "Imported cans and glass bottles, including the cane sugar recipes. It really does taste different.",
    items: [
      "Coke",
      "Sprite",
      "Fanta",
      "Schweppes",
      "Pepsi",
      "Mountain Dew",
      "Cane sugar glass bottles",
    ],
    mark: "sodas",
  },
  {
    id: "charliee",
    name: "Charliee",
    group: "Charliee label",
    tagline: "Our own name on it",
    blurb:
      "The house label. We put the Charliee name on a product only once it outsells everything beside it.",
    items: [
      "Charliee namkeen",
      "Charliee makhana",
      "Charliee dry fruit packs",
      "Charliee mukhwas",
      "Charliee gift hampers",
      "Charliee festive boxes",
    ],
    mark: "charliee",
    featured: true,
  },
];

export const featured = categories.filter((c) => c.featured);
export const byId = (id: string) => categories.find((c) => c.id === id);
