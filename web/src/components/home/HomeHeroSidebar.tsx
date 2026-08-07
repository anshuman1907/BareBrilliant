import type { ReactElement } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { HOME_CATEGORIES, type HomeCategorySlug } from "../../lib/homepageData.js";
import styles from "./HomeHero.module.css";

type HomeHeroSidebarProps = {
  activeCategory: HomeCategorySlug | null;
  onSelect: (category: HomeCategorySlug | null) => void;
};

export function HomeHeroSidebar({
  activeCategory,
  onSelect
}: HomeHeroSidebarProps): ReactElement {
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
      className={styles.heroSidebar}
    >
      <p>What are you looking for?</p>
      <ul>
        {HOME_CATEGORIES.map((category) => {
          const isRouteActive = location.pathname === `/${category.slug}`;
          const isActive = activeCategory === category.slug || isRouteActive;

          return (
            <li key={category.slug}>
              <Link
                to={`/${category.slug}`}
                data-active={isActive}
                onFocus={() => onSelect(category.slug)}
                onMouseEnter={() => onSelect(category.slug)}
              >
                <span>{"->"}</span>
                {category.label.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
