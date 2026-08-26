/**
 * Long form copy for About and Franchise.
 *
 * TODO for the CDS team: the founding year, the counts in `stats` and the
 * franchise numbers are placeholders. Everything else is safe to keep.
 * House style: no dash characters in visible copy.
 */

export const about = {
  eyebrow: "About us",
  title: "A day to day store that refuses to be ordinary.",
  standfirst:
    "CDS stands for Charliee Day to Day Stores. Two shops in south Gujarat, one in Valsad and one in Vapi, built around a simple idea: the things you buy every week deserve the same care as the things you buy once a year.",
  chapters: [
    {
      n: "01",
      title: "The counter came first",
      body: "We started the way most good food shops start, with one counter and a queue that was slightly too long for it. Sweets in the morning, farsan by the afternoon, and a stream of regulars who told us exactly what we were getting wrong. We listened, mostly.",
    },
    {
      n: "02",
      title: "Then it kept growing",
      body: "A khakhra shelf became a farsan wall. A jar of mukhwas became a gifting counter. Somebody asked for imported coffee and we found a supplier. Fifteen counters later, the shop still runs on the same rule: if a regular asks for it twice, we stock it.",
    },
    {
      n: "03",
      title: "Live, because it has to be",
      body: "Chhena will not wait. Jalebi will not wait. A pizza that sat under a lamp is a different food to one that did not. So the live counter was never a gimmick for us, it was the only honest way to sell those things.",
    },
    {
      n: "04",
      title: "Charliee on the label",
      body: "Our own name goes on a product only after it has outsold everything next to it on the shelf. That is a slow way to build a brand. It is also the only way we know how.",
    },
  ],
  values: [
    {
      title: "Weighed in front of you",
      body: "The scale faces the customer. It always has. You should be able to read your own weight without leaning over the counter.",
    },
    {
      title: "Small batches, short shelves",
      body: "We would rather run out at eight in the evening than sell you something fried on Tuesday. Empty trays are a good sign.",
    },
    {
      title: "Grades, not guesses",
      body: "Cashew is sold as W180 or W240. Saffron is Mongra or Sargol. If we cannot name the grade, we do not stock it.",
    },
    {
      title: "Ask and we will find it",
      body: "Half the imported aisle exists because a regular asked. The request book by the till is genuinely read.",
    },
  ],
  /** TODO: confirm every number here before launch. */
  stats: [
    { value: 2, suffix: "", label: "Stores in south Gujarat" },
    { value: 15, suffix: "", label: "Counters under one roof" },
    { value: 900, suffix: "+", label: "Products on the shelf" },
    { value: 7, suffix: "", label: "Days a week, every week" },
  ],
} as const;

export const franchise = {
  eyebrow: "Franchise",
  title: "Run the counter in your city.",
  standfirst:
    "CDS works because it is a lot of small, well run counters in one room. That is a model that travels. If you know your city and you are willing to stand behind the scale yourself, we should talk.",
  steps: [
    {
      n: "01",
      title: "You get in touch",
      body: "Tell us the city, the catchment and the square footage you are looking at. A phone call is usually enough to know whether it is worth going further.",
      detail: "About a week",
    },
    {
      n: "02",
      title: "We look at the site together",
      body: "Footfall, frontage, parking, the shops either side of you. We visit. A CDS in the wrong location is worse for us than no CDS at all.",
      detail: "Two to three weeks",
    },
    {
      n: "03",
      title: "Layout and fit out",
      body: "We plan the counter layout, the cold chain, the live kitchen and the gifting wall with you, then hand you a drawing your contractor can build from.",
      detail: "Six to ten weeks",
    },
    {
      n: "04",
      title: "Training at our counter",
      body: "You and your team spend time in Valsad or Vapi. Not a slideshow. Actual shifts, on an actual counter, through an actual evening rush.",
      detail: "Two weeks",
    },
    {
      n: "05",
      title: "You open",
      body: "We are in your store for the first fortnight. After that we are a phone call away, and we visit through every festival season.",
      detail: "Opening day",
    },
  ],
  offer: [
    {
      title: "The full counter plan",
      body: "Fifteen counters, worked out. Which ones carry the rent, which ones bring people in and where each one sits in the room.",
    },
    {
      title: "Supply on our terms",
      body: "You buy at the price we buy at. Sweets, farsan, dry fruit, imported stock and the Charliee label, all on one order.",
    },
    {
      title: "Live kitchen setup",
      body: "Equipment list, kitchen layout, recipes and the standards we hold our own counters to. Chefs trained by our chefs.",
    },
    {
      title: "The brand, properly",
      body: "Signage, packaging, uniforms, festive artwork and a launch campaign for your city. Not a logo file and good luck.",
    },
    {
      title: "Festive planning",
      body: "Diwali, Raksha Bandhan and wedding season are most of the year. We plan your stock and your staffing for them with you.",
    },
    {
      title: "Someone who picks up",
      body: "One person at CDS owns your store. You have their number. They visit, and they answer.",
    },
  ],
  /** TODO: confirm all of these commercial figures before launch. */
  facts: [
    { label: "Space needed", value: "1,200 to 2,500 sq ft" },
    { label: "Ideal frontage", value: "25 ft and up" },
    { label: "Team at opening", value: "10 to 16 people" },
    { label: "Time to open", value: "About four months" },
  ],
  closing:
    "We are opening slowly and choosing carefully, so there is no application portal and no sales team. You will speak to the family that runs the stores.",
} as const;

export const contact = {
  eyebrow: "Contact",
  title: "Come to the counter.",
  standfirst:
    "Two stores, both open seven days a week. Call ahead for a large sweet order, a custom cake or a festive hamper and it will be ready when you arrive.",
  reasons: [
    "A custom cake",
    "A festive hamper",
    "A bulk sweet order",
    "A corporate gifting list",
    "Franchise enquiry",
    "Something else",
  ],
} as const;
