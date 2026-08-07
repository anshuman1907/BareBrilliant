import { Environment, Sparkles } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, type ReactElement } from "react";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import {
  HOME_ITEMS,
  type HomeCategorySlug,
  type HomeItem
} from "../../../lib/homepageData.js";
import { HomeHeroCameraRig } from "./HomeHeroCameraRig.js";
import { HomeHeroFloatingPanel } from "./HomeHeroFloatingPanel.js";
import { HomeHeroGemCluster } from "./HomeHeroGemCluster.js";

const PANEL_LAYOUT: [number, number, number][] = [
  [-2.6, 1.55, 0],
  [2.5, 0.85, -1],
  [-1.7, -0.55, 1],
  [2.1, -0.75, -1.5],
  [0, -1.15, 0.5],
  [-2.9, 0.35, -2],
  [2.9, 1.95, -2.5]
];

const MOBILE_PANEL_LAYOUT: [number, number, number][] = [
  [-1.5, 2.1, -1],
  [1.5, 1.3, -1.5],
  [-1.3, -1.05, -0.5],
  [1.4, -1.85, -2]
];

type HomeHeroSceneProps = {
  activeCategory: HomeCategorySlug | null;
  enableParallax: boolean;
  isMobile: boolean;
  onSelectCategory: (category: HomeCategorySlug) => void;
  scrollProgress?: MotionValue<number>;
};

function ResponsivePanels({
  activeCategory,
  baseScale,
  layout,
  onSelectCategory,
  panels,
  scrollProgress
}: {
  activeCategory: HomeCategorySlug | null;
  baseScale: number;
  layout: [number, number, number][];
  onSelectCategory: (category: HomeCategorySlug) => void;
  panels: readonly HomeItem[];
  scrollProgress?: MotionValue<number>;
}) {
  const { size } = useThree((state) => state);
  const spread = THREE.MathUtils.clamp(size.width / 1600, 0.58, 1);

  return (
    <>
      {panels.map((item, index) => {
        const [x, y, z] = layout[index % layout.length] ?? layout[0]!;
        return (
          <HomeHeroFloatingPanel
            key={item.id}
            isDimmed={activeCategory !== null && activeCategory !== item.categorySlug}
            item={item}
            onSelectCategory={onSelectCategory}
            parallaxIndex={index}
            position={[x * spread, y * spread, z]}
            scale={baseScale}
            scrollProgress={scrollProgress}
          />
        );
      })}
    </>
  );
}

export function HomeHeroScene({
  activeCategory,
  enableParallax,
  isMobile,
  onSelectCategory,
  scrollProgress
}: HomeHeroSceneProps): ReactElement {
  const panels = isMobile ? HOME_ITEMS.slice(0, 4) : HOME_ITEMS;
  const layout = isMobile ? MOBILE_PANEL_LAYOUT : PANEL_LAYOUT;
  const particleCount = isMobile ? 400 : 1200;

  return (
    <Canvas
      camera={{ position: [0, 0.6, 6.5], fov: isMobile ? 60 : 45 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ alpha: false, antialias: true }}
    >
      <color attach="background" args={["#050403"]} />
      <fog attach="fog" args={["#050403", 8, 20]} />
      <ambientLight intensity={0.4} />
      <directionalLight color="#f3ece1" intensity={1.2} position={[4, 6, 4]} />
      <pointLight color="#cba15c" intensity={0.6} position={[-4, -2, 2]} />
      <pointLight color="#e9d3a3" intensity={2} position={[1.5, 3, 1]} />

      <Suspense fallback={null}>
        <Environment preset="night" />
        <HomeHeroGemCluster />
        <ResponsivePanels
          activeCategory={activeCategory}
          baseScale={isMobile ? 0.75 : 1}
          layout={layout}
          onSelectCategory={onSelectCategory}
          panels={panels}
          scrollProgress={scrollProgress}
        />
        <Sparkles
          color="#e9d3a3"
          count={particleCount}
          opacity={0.6}
          scale={[12, 8, 10]}
          size={2}
          speed={0.3}
        />
      </Suspense>

      <HomeHeroCameraRig enableParallax={enableParallax} scrollProgress={scrollProgress} />
    </Canvas>
  );
}
