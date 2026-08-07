import type { ReactElement } from "react";
import { motion } from "framer-motion";
import styles from "./HomeHero.module.css";

export function HomeHeroSearch(): ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
      className={styles.searchWrap}
    >
      <div className={styles.searchField}>
        <input type="text" placeholder="FIND YOUR PERFECT PIECE..." />
      </div>
    </motion.div>
  );
}
