/**
 * The live counter menu.
 *
 * Prices are deliberately absent: the board in store is the source of truth
 * and we would rather show nothing than show a stale number. Each item takes
 * an optional `price` string, so filling them in is the only change needed.
 */

export type MenuItem = {
  name: string;
  note?: string;
  price?: string;
  /** Draws the small flame mark. Reserve it for genuine favourites. */
  hot?: boolean;
  /**
   * Photograph of the dish, shown on the home page live panel as the name
   * rotates. Drop files into /public/live and set the path here, for example
   * "/live/pani-puri.jpg". Landscape or square both work: the panel crops to
   * fill. Without one the panel shows the dish name on a warm ground, which
   * is the current state of every item.
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

export const menu: MenuSection[] = [
  {
    id: "pizza",
    name: "Pizza",
    kicker: "Stretched, topped and baked to order",
    wait: "About 12 minutes",
    items: [
      { image: "/live/margherita.svg", name: "Margherita" },
      { image: "/live/corn-and-cheese.svg", name: "Corn and cheese" },
      { image: "/live/paneer-tikka.svg", name: "Paneer tikka", hot: true },
      { name: "Veggie supreme" },
      { name: "Tandoori paneer" },
      { name: "Cheese burst", note: "Double layer" },
      { name: "Makhani paneer" },
      { name: "Jain pizza", note: "No onion, no garlic" },
    ],
  },
  {
    id: "sandwich",
    name: "Sandwich and toast",
    kicker: "Off the grill press",
    wait: "About 6 minutes",
    items: [
      { image: "/live/bombay-masala-toast.svg", name: "Bombay masala toast", hot: true },
      { image: "/live/grilled-cheese.svg", name: "Grilled cheese" },
      { image: "/live/paneer-tikka-grill.svg", name: "Paneer tikka grill" },
      { name: "Corn cheese grill" },
      { name: "Cheese chilli toast" },
      { name: "Club sandwich", note: "Three layers" },
      { name: "Chocolate sandwich", note: "For the children, mostly" },
    ],
  },
  {
    id: "chaat",
    name: "Chaat",
    kicker: "Assembled the second you order",
    wait: "About 4 minutes",
    items: [
      { image: "/live/pani-puri.svg", name: "Pani puri", hot: true },
      { image: "/live/sev-puri.svg", name: "Sev puri" },
      { image: "/live/bhel-puri.svg", name: "Bhel puri" },
      { name: "Dahi puri" },
      { name: "Ragda pattice" },
      { name: "Samosa chaat" },
      { name: "Chole tikki" },
      { name: "Dahi vada" },
    ],
  },
  {
    id: "tawa",
    name: "From the tawa",
    kicker: "Butter, and plenty of it",
    wait: "About 10 minutes",
    items: [
      { image: "/live/pav-bhaji.svg", name: "Pav bhaji", hot: true },
      { image: "/live/cheese-pav-bhaji.svg", name: "Cheese pav bhaji" },
      { image: "/live/vada-pav.svg", name: "Vada pav" },
      { name: "Dabeli" },
      { name: "Masala pav" },
      { name: "Tawa sandwich" },
    ],
  },
  {
    id: "sweets",
    name: "Live sweets",
    kicker: "Straight out of the syrup",
    wait: "Handed over warm",
    items: [
      { image: "/live/jalebi.svg", name: "Jalebi", hot: true },
      { image: "/live/gulab-jamun.svg", name: "Gulab jamun", note: "Served hot" },
      { image: "/live/rasgulla.svg", name: "Rasgulla" },
      { name: "Malai sandwich" },
      { name: "Rasmalai" },
      { name: "Chhena murki" },
      { name: "Hot halwa", note: "Winter only" },
    ],
  },
  {
    id: "drinks",
    name: "Cold counter",
    kicker: "Shaken, blended and poured",
    wait: "About 5 minutes",
    items: [
      { image: "/live/cold-coffee.svg", name: "Cold coffee", hot: true },
      { image: "/live/mango-shake.svg", name: "Mango shake", note: "Valsad hafus, in season" },
      { image: "/live/chocolate-shake.svg", name: "Chocolate shake" },
      { name: "Fresh lime soda" },
      { name: "Masala chaas" },
      { name: "Falooda" },
      { name: "Kulfi shake" },
    ],
  },
];
