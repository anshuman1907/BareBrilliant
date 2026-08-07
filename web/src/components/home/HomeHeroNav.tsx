import type { ReactElement } from "react";
import { motion } from "framer-motion";
import styles from "./HomeHero.module.css";

export function HomeHeroNav(): ReactElement {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={styles.heroHeader}
    >
      <span className={styles.brand}>BARE BRILLIANT</span>
      <nav className={styles.heroNav} aria-label="Homepage">
        <a href="#collections">COLLECTIONS</a>
        <span>---</span>
        <a href="#contact">CONTACT</a>
      </nav>
    </motion.header>
  );
}
