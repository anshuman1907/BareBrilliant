import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { STATIC_PAGE_LINKS } from "../lib/staticPageLinks.js";
import styles from "./Footer.module.css";

export function Footer(): ReactElement {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul className={styles.nav}>
          {STATIC_PAGE_LINKS.map((page) => (
            <li key={page.slug}>
              <Link to={`/${page.slug}`}>{page.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <span>&copy; {new Date().getFullYear()} Bare Brilliant</span>
    </footer>
  );
}
