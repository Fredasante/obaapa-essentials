import { client } from "@/sanity/client";

// Keys are normalized via normalizeColorKey: lowercased, with spaces/hyphens
// stripped. So "Off White", "off-white", and "OffWhite" all resolve to the
// same entry.
//
// Includes the full CSS / X11 named-color palette (per W3C CSS Color Module
// Level 4) plus common fashion-industry names that aren't in the CSS spec
// (burgundy, terracotta, dusty rose, rose gold, etc.).
const colorMap: Record<string, string> = {
  // ── Neutrals: whites & off-whites ──────────────────────────────
  white: "#FFFFFF",
  snow: "#FFFAFA",
  ghostwhite: "#F8F8FF",
  floralwhite: "#FFFAF0",
  ivory: "#FFFFF0",
  mintcream: "#F5FFFA",
  azure: "#F0FFFF",
  lightcyan: "#E0FFFF",
  honeydew: "#F0FFF0",
  aliceblue: "#F0F8FF",
  lavenderblush: "#FFF0F5",
  mistyrose: "#FFE4E1",
  seashell: "#FFF5EE",
  oldlace: "#FDF5E6",
  linen: "#FAF0E6",
  antiquewhite: "#FAEBD7",
  papayawhip: "#FFEFD5",
  blanchedalmond: "#FFEBCD",
  bisque: "#FFE4C4",
  cornsilk: "#FFF8DC",
  beige: "#F5F5DC",
  whitesmoke: "#F5F5F5",
  offwhite: "#FAF9F6",
  cream: "#FFFDD0",
  eggshell: "#F0EAD6",
  alabaster: "#EDEADE",
  bone: "#E3DAC9",
  pearl: "#EAE0C8",
  vanilla: "#F3E5AB",
  oatmeal: "#DDD3B8",
  champagne: "#F7E7CE",
  nude: "#E3BC9A",
  greige: "#BAB2A5",

  // ── Neutrals: blacks ───────────────────────────────────────────
  black: "#000000",
  jet: "#0A0A0A",
  onyx: "#0F0F0F",
  ebony: "#555D50",

  // ── Neutrals: grays ────────────────────────────────────────────
  gray: "#808080",
  grey: "#808080",
  dimgray: "#696969",
  dimgrey: "#696969",
  darkgray: "#A9A9A9",
  darkgrey: "#A9A9A9",
  lightgray: "#D3D3D3",
  lightgrey: "#D3D3D3",
  silver: "#C0C0C0",
  gainsboro: "#DCDCDC",
  slategray: "#708090",
  slategrey: "#708090",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  darkslategray: "#2F4F4F",
  darkslategrey: "#2F4F4F",
  slate: "#64748B",
  charcoal: "#36454F",
  ash: "#B2BEB5",
  smoke: "#738276",
  gunmetal: "#2A3439",
  graphite: "#383838",
  pewter: "#8E9295",
  platinum: "#E5E4E2",
  stone: "#888C8D",

  // ── Browns & earth tones ───────────────────────────────────────
  brown: "#A52A2A",
  saddlebrown: "#8B4513",
  sienna: "#A0522D",
  chocolate: "#D2691E",
  darkchocolate: "#3F1F0F",
  peru: "#CD853F",
  goldenrod: "#DAA520",
  darkgoldenrod: "#B8860B",
  rosybrown: "#BC8F8F",
  sandybrown: "#F4A460",
  burlywood: "#DEB887",
  wheat: "#F5DEB3",
  tan: "#D2B48C",
  taupe: "#483C32",
  midtaupe: "#8B7E74",
  khaki: "#F0E68C",
  darkkhaki: "#BDB76B",
  camel: "#C19A6B",
  sand: "#C2B280",
  hazel: "#8E7618",
  cognac: "#9A463D",
  caramel: "#AF6F09",
  mocha: "#967259",
  cocoa: "#7B3F00",
  coffee: "#6F4E37",
  espresso: "#4B3621",
  chestnut: "#954535",
  mahogany: "#C04000",
  walnut: "#5C4033",
  rust: "#B7410E",
  terracotta: "#E2725B",
  brick: "#CB4154",

  // ── Reds ───────────────────────────────────────────────────────
  red: "#FF0000",
  darkred: "#8B0000",
  firebrick: "#B22222",
  crimson: "#DC143C",
  indianred: "#CD5C5C",
  scarlet: "#FF2400",
  ruby: "#9B111E",
  cherry: "#990F02",
  wine: "#722F37",
  burgundy: "#800020",
  bordeaux: "#5C0120",
  oxblood: "#4A0404",
  maroon: "#800000",

  // ── Pinks ──────────────────────────────────────────────────────
  pink: "#FFC0CB",
  lightpink: "#FFB6C1",
  hotpink: "#FF69B4",
  deeppink: "#FF1493",
  palevioletred: "#DB7093",
  mediumvioletred: "#C71585",
  rose: "#FF66CC",
  blush: "#FFE1DC",
  blushpink: "#FFE1DC",
  dustyrose: "#C0737A",
  salmon: "#FA8072",
  lightsalmon: "#FFA07A",
  darksalmon: "#E9967A",
  lightcoral: "#F08080",
  coral: "#FF7F50",
  fuchsia: "#FF00FF",
  magenta: "#8E1A5C",

  // ── Oranges ────────────────────────────────────────────────────
  orange: "#FFA500",
  darkorange: "#FF8C00",
  orangered: "#FF4500",
  tomato: "#FF6347",
  peach: "#FFE5B4",
  peachpuff: "#FFDAB9",
  apricot: "#FBCEB1",
  tangerine: "#F28500",
  ochre: "#CC7722",

  // ── Yellows ────────────────────────────────────────────────────
  yellow: "#FFFF00",
  lightyellow: "#FFFFE0",
  lemonchiffon: "#FFFACD",
  lightgoldenrodyellow: "#FAFAD2",
  palegoldenrod: "#EEE8AA",
  moccasin: "#FFE4B5",
  navajowhite: "#FFDEAD",
  gold: "#D4AF37",
  yellowgold: "#FFD700",
  mustard: "#FFDB58",
  lemon: "#FFF44F",
  amber: "#FFBF00",
  saffron: "#F4C430",

  // ── Greens ─────────────────────────────────────────────────────
  green: "#008000",
  lightgreen: "#90EE90",
  darkgreen: "#006400",
  forestgreen: "#228B22",
  forest: "#228B22",
  seagreen: "#2E8B57",
  mediumseagreen: "#3CB371",
  darkseagreen: "#8FBC8F",
  lightseagreen: "#20B2AA",
  springgreen: "#00FF7F",
  mediumspringgreen: "#00FA9A",
  palegreen: "#98FB98",
  limegreen: "#32CD32",
  lime: "#00FF00",
  yellowgreen: "#9ACD32",
  greenyellow: "#ADFF2F",
  lawngreen: "#7CFC00",
  chartreuse: "#7FFF00",
  olive: "#808000",
  olivedrab: "#6B8E23",
  emerald: "#50C878",
  jade: "#00A86B",
  mint: "#98FF98",
  mintgreen: "#98FF98",
  pistachio: "#93C572",
  sage: "#98A869",
  moss: "#8A9A5B",
  pine: "#01796F",
  hunter: "#355E3B",
  kelly: "#4CBB17",
  army: "#4B5320",
  military: "#4B5320",
  teal: "#008080",
  darkteal: "#014D4E",
  darkcyan: "#008B8B",
  cyan: "#00FFFF",
  aqua: "#00FFFF",
  aquamarine: "#7FFFD4",
  mediumaquamarine: "#66CDAA",
  turquoise: "#40E0D0",
  paleturquoise: "#AFEEEE",
  mediumturquoise: "#48D1CC",
  darkturquoise: "#00CED1",
  seafoam: "#9FE2BF",
  tiffany: "#0ABAB5",
  tiffanyblue: "#0ABAB5",
  cadetblue: "#5F9EA0",

  // ── Blues ──────────────────────────────────────────────────────
  blue: "#0000FF",
  lightblue: "#ADD8E6",
  darkblue: "#00008B",
  mediumblue: "#0000CD",
  midnightblue: "#191970",
  midnight: "#191970",
  navy: "#000080",
  navyblue: "#000080",
  royalblue: "#4169E1",
  royal: "#4169E1",
  steelblue: "#4682B4",
  lightsteelblue: "#B0C4DE",
  dodgerblue: "#1E90FF",
  cornflowerblue: "#6495ED",
  cornflower: "#6495ED",
  deepskyblue: "#00BFFF",
  skyblue: "#87CEEB",
  sky: "#87CEEB",
  lightskyblue: "#87CEFA",
  babyblue: "#89CFF0",
  powderblue: "#B0E0E6",
  cobalt: "#0047AB",
  denim: "#1560BD",
  indigo: "#4B0082",
  periwinkle: "#CCCCFF",
  carolinablue: "#56A0D3",
  cerulean: "#007BA7",

  // ── Purples ────────────────────────────────────────────────────
  purple: "#800080",
  darkmagenta: "#8B008B",
  darkviolet: "#9400D3",
  blueviolet: "#8A2BE2",
  darkorchid: "#9932CC",
  mediumorchid: "#BA55D3",
  orchid: "#DA70D6",
  mediumpurple: "#9370DB",
  rebeccapurple: "#663399",
  slateblue: "#6A5ACD",
  mediumslateblue: "#7B68EE",
  darkslateblue: "#483D8B",
  violet: "#7F00FF",
  paleviolet: "#EE82EE",
  thistle: "#D8BFD8",
  lavender: "#E6E6FA",
  deeplavender: "#B57EDC",
  lilac: "#C8A2C8",
  plum: "#8E4585",
  paleplum: "#DDA0DD",
  mauve: "#E0B0FF",
  dustymauve: "#915F6D",
  eggplant: "#614051",
  aubergine: "#3D0734",

  // ── Metallics ──────────────────────────────────────────────────
  bronze: "#CD7F32",
  copper: "#B87333",
  rosegold: "#B76E79",

  // ── Multi-color sentinel ───────────────────────────────────────
  multicolor: "#9CA3AF",
  multi: "#9CA3AF",
  mixed: "#9CA3AF",
  assorted: "#9CA3AF",
};

const normalizeColorKey = (name: string): string =>
  name.toLowerCase().replace(/[\s-]+/g, "");

export const getColorValue = (colorName: string): string => {
  return colorMap[normalizeColorKey(colorName)] || "#9CA3AF";
};

const categoryDisplayNames: Record<string, string> = {
  fashion: "Fashion",
  foods: "Foods",
  spices: "Spices",
  "teas-and-herbs": "Teas and Herbs",
  others: "Others",
};

export const formatCategoryName = (slug: string): string => {
  return (
    categoryDisplayNames[slug] ||
    slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

interface FetchProductsParams {
  page: number;
  perPage: number;
  category?: string;
  color?: string;
}

export const fetchPaginatedProducts = async ({
  page,
  perPage,
  category,
  color,
}: FetchProductsParams) => {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  const filters: string[] = ["stockQuantity > 0"];

  if (category) filters.push(`category == "${category}"`);
  if (color) filters.push(`"${color}" in colors`);

  const filterString = `&& ${filters.join(" && ")}`;

  const productsQuery = `
    *[_type == "product" ${filterString}] | order(_createdAt desc) [$start...$end] {
      _id,
      name,
      slug,
      price,
      discountPrice,
      description,
      category,
      stockQuantity,
      isFeatured,
      "mainImageUrl": mainImage.asset->url
    }
  `;

  const countQuery = `count(*[_type == "product" ${filterString}])`;

  try {
    const [products, totalCount] = await Promise.all([
      client.fetch(productsQuery, { start, end }),
      client.fetch(countQuery),
    ]);

    return { products, totalCount };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalCount: 0 };
  }
};

export const fetchCategories = async () => {
  const query = `
    *[_type == "product" && defined(category) && stockQuantity > 0] {
      category
    }
  `;

  try {
    const data = await client.fetch(query);

    if (!data || data.length === 0) {
      return [];
    }

    const categoryMap = new Map<string, number>();

    data.forEach((product: any) => {
      const category = product.category;
      if (category) {
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
      }
    });

    const categories = Array.from(categoryMap.entries()).map(
      ([value, count]) => ({
        name: value,
        displayName: formatCategoryName(value),
        products: count,
      }),
    );

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchColors = async () => {
  const query = `
    *[_type == "product" && defined(colors) && stockQuantity > 0] {
      colors
    }
  `;

  try {
    const data = await client.fetch(query);

    if (!data || data.length === 0) {
      return [];
    }

    const allColors = data.flatMap((item: any) => item.colors || []);
    const uniqueColors = Array.from(new Set(allColors)).sort();

    return uniqueColors.map((color: string) => ({
      name: color,
      products: data.filter((item: any) => item.colors?.includes(color)).length,
    }));
  } catch (error) {
    console.error("Error fetching colors:", error);
    return [];
  }
};
