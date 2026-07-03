import type { ReactElement } from "react";
import { Link } from "react-router-dom";
import { NAV_CATEGORIES } from "../lib/navCategories.js";
import styles from "./Header.module.css";

export function Header(): ReactElement {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        BareBrilliant
      </Link>
      <nav>
        <ul className={styles.nav}>
          {NAV_CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link to={`/${category.slug}`}>{category.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
