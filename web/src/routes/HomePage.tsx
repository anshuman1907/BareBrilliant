import { useState, type FormEvent, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { HomeHero } from "../components/home/HomeHero.js";
import {
  HOME_ABOUT_IMAGE,
  HOME_CATEGORIES,
  HOME_FEATURED_ITEMS,
  HOME_TESTIMONIALS
} from "../lib/homepageData.js";
import styles from "./HomePage.module.css";

const HOME_FOOTER_GROUPS = [
  {
    heading: "About",
    links: [
      { label: "Our Story", href: "#about", isExternal: true },
      { label: "Craftsmanship", href: "/our-story", isExternal: false },
      { label: "Authenticity & Certification", href: "/faq", isExternal: false }
    ]
  },
  {
    heading: "Guides",
    links: [
      { label: "Diamond Buying Guide", href: "/diamonds", isExternal: false },
      { label: "FAQs", href: "/faq", isExternal: false },
      { label: "Shipping & Returns", href: "/shipping-returns", isExternal: false }
    ]
  },
  {
    heading: "Policies",
    links: [
      { label: "Terms & Conditions", href: "/terms-conditions", isExternal: false },
      { label: "Privacy Policy", href: "/privacy-policy", isExternal: false }
    ]
  },
  {
    heading: "Contact",
    links: [
      { label: "Contact Us", href: "mailto:hello@barebrilliant.com", isExternal: true },
      { label: "Book an Appointment", href: "/contact", isExternal: false }
    ]
  }
] as const;

const SOCIAL_ICONS: ReadonlyArray<{ label: string; path: string }> = [
  {
    label: "Instagram",
    path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm5.25-1.75a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
  },
  {
    label: "Facebook",
    path: "M14 22v-8h2.7l.4-3H14V9.1c0-.87.24-1.46 1.5-1.46H17V5.08C16.72 5.04 15.76 5 14.64 5 12.3 5 10.7 6.42 10.7 9.06V11H8v3h2.7v8H14Z"
  },
  {
    label: "Twitter",
    path: "M21 6.4a7.3 7.3 0 0 1-2.1.58 3.7 3.7 0 0 0 1.6-2.03 7.3 7.3 0 0 1-2.32.89 3.65 3.65 0 0 0-6.22 3.33A10.36 10.36 0 0 1 4.6 5.15a3.65 3.65 0 0 0 1.13 4.87 3.6 3.6 0 0 1-1.65-.46v.05a3.65 3.65 0 0 0 2.93 3.58 3.7 3.7 0 0 1-1.64.06 3.66 3.66 0 0 0 3.41 2.54A7.33 7.33 0 0 1 3 17.4a10.3 10.3 0 0 0 5.6 1.64c6.72 0 10.4-5.57 10.4-10.4l-.01-.47A7.4 7.4 0 0 0 21 6.4Z"
  },
  {
    label: "YouTube",
    path: "M21.6 7.6a2.8 2.8 0 0 0-1.97-2C18 5.2 12 5.2 12 5.2s-6 0-7.63.4a2.8 2.8 0 0 0-1.97 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.4 2.8 2.8 0 0 0 1.97 2c1.63.4 7.63.4 7.63.4s6 0 7.63-.4a2.8 2.8 0 0 0 1.97-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z"
  },
  {
    label: "LinkedIn",
    path: "M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-6.06c0-1.44-.03-3.3-2.01-3.3-2.02 0-2.33 1.58-2.33 3.2V20H9.36V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z"
  }
];

export function HomePage(): ReactElement {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!email.trim()) {
      return;
    }
    setSubscribed(true);
  }

  return (
    <main className={styles.page}>
      <HomeHero />

      <section id="collections" className={styles.section}>
        <p className={styles.sectionLabel}>The Collections</p>
        <h2 className={styles.sectionTitle}>
          Five ways to wear brilliance, each cut for a different moment.
        </h2>
        <div className={styles.collectionGrid}>
          {HOME_CATEGORIES.map((category) => (
            <Link key={category.slug} to={`/${category.slug}`} className={styles.collectionCard}>
              <img src={category.imageUrl} alt={category.label} />
              <span>{category.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className={`${styles.section} ${styles.aboutSection}`}>
        <div className={styles.aboutImageWrap}>
          <img src={HOME_ABOUT_IMAGE} alt="Woman wearing a Bare Brilliant necklace" />
        </div>
        <div className={styles.aboutCopy}>
          <p className={styles.sectionLabel}>Our Story</p>
          <h2 className={styles.sectionTitle}>Brilliance, bared to its simplest form.</h2>
          <p>
            Bare Brilliant began with a simple belief: fine jewelry should feel personal, not
            performative. Every piece is shaped by hand, set stone by stone, and finished until it
            holds light the way it should.
          </p>
          <p>
            No two settings leave our atelier identical, because no two people wearing them are
            either.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.sectionLabel}>Featured Pieces</p>
        <h2 className={styles.sectionTitle}>
          A closer look at the pieces people keep coming back for.
        </h2>
        <div className={styles.featureGrid}>
          {HOME_FEATURED_ITEMS.map((item) => (
            <Link key={item.id} to={`/${item.categorySlug}`} className={styles.featureCard}>
              <img src={item.imageUrl} alt={item.title} />
              <strong>{item.title}</strong>
              <span>{item.categoryLabel.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={`${styles.sectionLabel} ${styles.centeredLabel}`}>What She Wears</p>
        <div className={styles.testimonialGrid}>
          {HOME_TESTIMONIALS.map((testimonial) => (
            <figure key={testimonial.id} className={styles.testimonialCard}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                {testimonial.name}
                <span>{testimonial.detail.toUpperCase()}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <footer id="contact" className={styles.footer}>
        <div className={styles.footerTop}>
          {HOME_FOOTER_GROUPS.map((group) => (
            <nav key={group.heading} aria-label={group.heading} className={styles.footerGroup}>
              <h2 className={styles.footerHeading}>{group.heading}</h2>
              <ul className={styles.footerList}>
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.isExternal ? (
                      <a href={link.href}>{link.label}</a>
                    ) : (
                      <Link to={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <section className={styles.newsletterBlock} aria-label="Newsletter">
            <h2 className={styles.footerHeading}>Stay In The Know</h2>
            <p className={styles.newsletterCopy}>
              Get our latest designs, updates and offers by email.
            </p>
            {subscribed ? (
              <p className={styles.newsletterThanks}>Thanks, we&apos;ll be in touch.</p>
            ) : (
              <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                <label htmlFor="home-footer-email" className={styles.srOnly}>
                  Email address
                </label>
                <input
                  id="home-footer-email"
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" aria-label="Subscribe">
                  &rarr;
                </button>
              </form>
            )}

            <ul className={styles.socialList}>
              {SOCIAL_ICONS.map((icon) => (
                <li key={icon.label}>
                  <a href="#" className={styles.socialIcon} aria-label={icon.label}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={icon.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className={styles.footerBottom}>
          <span>&copy; {new Date().getFullYear()} Bare Brilliant</span>
        </div>
      </footer>
    </main>
  );
}
