export interface StaticPageLink {
  label: string;
  slug: string;
}

export const STATIC_PAGE_LINKS: StaticPageLink[] = [
  { label: "Terms & Conditions", slug: "terms-conditions" },
  { label: "Privacy Policy", slug: "privacy-policy" },
  { label: "Shipping & Returns", slug: "shipping-returns" },
  { label: "About Us", slug: "about-us" },
  { label: "Contact Us", slug: "contact-us" }
];
