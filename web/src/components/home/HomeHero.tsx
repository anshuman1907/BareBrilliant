import { Suspense, lazy, useEffect, useRef, useState, type ReactElement } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { HomeCategorySlug } from "../../lib/homepageData.js";
import { HomeHeroNav } from "./HomeHeroNav.js";
import { HomeHeroSearch } from "./HomeHeroSearch.js";
import { HomeHeroSidebar } from "./HomeHeroSidebar.js";
import styles from "./HomeHero.module.css";

const HomeHeroScene = lazy(async () => {
  const module = await import("./scene/HomeHeroScene.js");
  return { default: module.HomeHeroScene };
});

export function HomeHero(): ReactElement {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<HomeCategorySlug | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrollProgressValue, setScrollProgressValue] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    const updateMobile = () => setIsMobile(mediaQuery.matches);

    updateMobile();
    mediaQuery.addEventListener("change", updateMobile);
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);

    return () => mediaQuery.removeEventListener("change", updateMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setScrollProgressValue(value);
  });

  const overlayOpacity =
    scrollProgressValue <= 0.45
      ? 1
      : scrollProgressValue >= 0.7
        ? 0
        : 1 - (scrollProgressValue - 0.45) / 0.25;

  return (
    <section ref={containerRef} className={styles.hero}>
      <div className={styles.stickyStage}>
        <div className={styles.sceneLayer}>
          {mounted ? (
            <Suspense fallback={null}>
              <HomeHeroScene
                activeCategory={activeCategory}
                enableParallax={!isTouch}
                isMobile={isMobile}
                onSelectCategory={(category) => navigate(`/${category}`)}
                scrollProgress={scrollYProgress}
              />
            </Suspense>
          ) : null}
        </div>

        <div className={styles.topFade} />
        <div className={styles.bottomFade} />

        <div style={{ opacity: overlayOpacity }} className={styles.overlay}>
          <HomeHeroNav />
          <div className={styles.overlayBottom}>
            <HomeHeroSidebar activeCategory={activeCategory} onSelect={setActiveCategory} />
            <HomeHeroSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
