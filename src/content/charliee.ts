/**
 * The Charliee mosaic: twelve product photographs.
 *
 * Every picture is supplied at one size, 1200 by 1500, four by five portrait.
 * One spec means nothing to get wrong on upload. The mosaic then crops each
 * slot to its own ratio, which is what gives the wall its rhythm without
 * asking anyone to prepare four different crops.
 *
 * Because the crop happens here, keep the product roughly centred in the frame
 * with a little air around it. A slot cropped to a square takes the middle
 * four fifths of the height; a slot cropped to three by four takes the middle
 * of the width.
 *
 * Files live in /public/charliee as charliee-01.jpg through charliee-12.jpg.
 * Drop a real photograph over a placeholder of the same name and nothing here
 * needs to change.
 */

export type CharlieeSlot = {
  src: string;
  /** Tailwind aspect class the mosaic crops this slot to. */
  ratio: "aspect-4/5" | "aspect-square" | "aspect-3/4";
  alt: string;
};

/**
 * Alt text is deliberately generic until the real photographs land, because a
 * caption that names a product the picture does not show is worse than one
 * that describes the set. Replace each with what its picture actually is.
 */
export const charlieeSlots: CharlieeSlot[] = [
  { src: "/charliee/charliee-01.jpg", ratio: "aspect-4/5",    alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-02.jpg", ratio: "aspect-3/4",    alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-03.jpg", ratio: "aspect-square", alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-04.jpg", ratio: "aspect-4/5",    alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-05.jpg", ratio: "aspect-square", alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-06.jpg", ratio: "aspect-4/5",    alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-07.jpg", ratio: "aspect-3/4",    alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-08.jpg", ratio: "aspect-square", alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-09.jpg", ratio: "aspect-4/5",    alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-10.jpg", ratio: "aspect-3/4",    alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-11.jpg", ratio: "aspect-4/5",    alt: "A Charliee pack on the shelf" },
  { src: "/charliee/charliee-12.jpg", ratio: "aspect-square", alt: "A Charliee pack on the shelf" },
];

/**
 * Which slots sit in which column, as indexes into the list above.
 *
 * Three columns on a phone and four from md, so the fourth column is the one
 * that does not appear on a narrow screen. The nine that always show are the
 * first nine, which makes the ordering of the uploads meaningful: put the
 * strongest packs early.
 */
export const charlieeColumns: number[][] = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [9, 10, 11],
];
