export type HomeCategory = {
  slug: string;
  label: string;
  imageUrl: string;
};

export type HomeCategorySlug = HomeCategory["slug"];

export type HomeItem = {
  id: string;
  categorySlug: string;
  categoryLabel: string;
  title: string;
  imageUrl: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  detail: string;
};

const unsplash = (id: string): string =>
  `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

export const HOME_CATEGORIES: ReadonlyArray<HomeCategory> = [
  { slug: "rings", label: "Rings", imageUrl: unsplash("1605100804763-247f67b3557e") },
  { slug: "necklaces", label: "Necklaces", imageUrl: unsplash("1515562141207-7a88fb7ce338") },
  { slug: "earrings", label: "Earrings", imageUrl: unsplash("1535632066927-ab7c9ab60908") },
  { slug: "bracelets", label: "Bracelets", imageUrl: unsplash("1611591437281-460bfbe1220a") },
  { slug: "bridal", label: "Bridal", imageUrl: unsplash("1596944924616-7b38e7cfac36") }
];

export const HOME_ITEMS: ReadonlyArray<HomeItem> = [
  {
    id: "ring-solitaire",
    categorySlug: "rings",
    categoryLabel: "Rings",
    title: "Solitaire Halo Ring",
    imageUrl: unsplash("1605100804763-247f67b3557e")
  },
  {
    id: "necklace-pearl",
    categorySlug: "necklaces",
    categoryLabel: "Necklaces",
    title: "Pearl Strand Necklace",
    imageUrl: unsplash("1515562141207-7a88fb7ce338")
  },
  {
    id: "earrings-sapphire",
    categorySlug: "earrings",
    categoryLabel: "Earrings",
    title: "Sapphire Drop Earrings",
    imageUrl: unsplash("1535632066927-ab7c9ab60908")
  },
  {
    id: "bracelet-rose-gold",
    categorySlug: "bracelets",
    categoryLabel: "Bracelets",
    title: "Rose Gold Link Bracelet",
    imageUrl: unsplash("1611591437281-460bfbe1220a")
  },
  {
    id: "bridal-stack",
    categorySlug: "bridal",
    categoryLabel: "Bridal",
    title: "Bridal Stacking Set",
    imageUrl: unsplash("1596944924616-7b38e7cfac36")
  },
  {
    id: "necklace-pendant",
    categorySlug: "necklaces",
    categoryLabel: "Necklaces",
    title: "Layered Pendant Necklace",
    imageUrl: unsplash("1599643478518-a784e5dc4c8f")
  },
  {
    id: "bracelet-diamond",
    categorySlug: "bracelets",
    categoryLabel: "Bracelets",
    title: "Diamond Tennis Bracelet",
    imageUrl: unsplash("1573408301185-9146fe634ad0")
  }
];

export const HOME_FEATURED_ITEMS = HOME_ITEMS.slice(0, 4);

export const HOME_TESTIMONIALS: ReadonlyArray<Testimonial> = [
  {
    id: "t1",
    quote:
      "The craftsmanship is unlike anything I have owned before. My engagement ring still catches the light exactly the way it did the day it arrived.",
    name: "Meera K.",
    detail: "Bridal Collection"
  },
  {
    id: "t2",
    quote:
      "Every piece feels considered, not mass-produced. The pearl necklace has become the one thing I never take off.",
    name: "Ananya R.",
    detail: "Necklaces Collection"
  },
  {
    id: "t3",
    quote:
      "I bought the tennis bracelet as a gift for myself, and it was worth every rupee. It photographs even better in person.",
    name: "Divya S.",
    detail: "Bracelets Collection"
  }
];

export const HOME_ABOUT_IMAGE = unsplash("1611652022419-a9419f74343d");
