import { Html, RoundedBox, useTexture } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { MotionValue } from "framer-motion";
import type { Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import * as THREE from "three";
import type { HomeCategorySlug, HomeItem } from "../../../lib/homepageData.js";

type HomeHeroFloatingPanelProps = {
  isDimmed: boolean;
  item: HomeItem;
  onSelectCategory: (category: HomeCategorySlug) => void;
  parallaxIndex?: number;
  position: [number, number, number];
  scale?: number;
  scrollProgress?: MotionValue<number>;
};

export function HomeHeroFloatingPanel({
  isDimmed,
  item,
  onSelectCategory,
  parallaxIndex = 0,
  position,
  scale = 1,
  scrollProgress
}: HomeHeroFloatingPanelProps) {
  const [isHovered, setIsHovered] = useState(false);
  const groupRef = useRef<Group>(null);
  const imageMeshRef = useRef<Mesh>(null);
  const frameMaterialRef = useRef<MeshPhysicalMaterial>(null);
  const glowMeshRef = useRef<Mesh>(null);
  const hovered = useRef(false);
  const hoverBoost = useRef(1);
  const targetOpacity = useRef(1);
  const hoverLift = useRef(0);
  const glowOpacity = useRef(0);
  const bobOffset = useMemo(() => Math.random() * Math.PI * 2, []);
  const parallaxSpeed = useMemo(() => 3 + (parallaxIndex % 4) * 1.1, [parallaxIndex]);
  const texture = useTexture(item.imageUrl);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime + bobOffset;
    const progress = scrollProgress?.get() ?? 0;
    const eased = THREE.MathUtils.smoothstep(progress, 0, 1);

    groupRef.current.position.y = position[1] + Math.sin(elapsed * 0.6) * 0.15;
    hoverLift.current = THREE.MathUtils.lerp(hoverLift.current, hovered.current ? 0.45 : 0, delta * 6);
    groupRef.current.position.z = position[2] + eased * parallaxSpeed + hoverLift.current;
    groupRef.current.rotation.y = Math.sin(elapsed * 0.3) * 0.08;
    groupRef.current.rotation.x = Math.cos(elapsed * 0.25) * 0.05;
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      hovered.current ? 0.025 : 0,
      delta * 5
    );

    const scrollFade = 1 - THREE.MathUtils.smoothstep(eased, 0.55, 0.95);
    hoverBoost.current = THREE.MathUtils.lerp(hoverBoost.current, hovered.current ? 1.14 : 1, delta * 6);
    groupRef.current.scale.setScalar(scale * scrollFade * hoverBoost.current);

    targetOpacity.current = THREE.MathUtils.lerp(targetOpacity.current, isDimmed ? 0.25 : 1, delta * 3);
    const material = imageMeshRef.current?.material as MeshStandardMaterial | undefined;
    if (material) {
      material.opacity = targetOpacity.current;
    }

    const frameMaterial = frameMaterialRef.current;
    if (frameMaterial) {
      frameMaterial.emissive.set(hovered.current ? "#7c5a28" : "#000000");
      frameMaterial.emissiveIntensity = THREE.MathUtils.lerp(
        frameMaterial.emissiveIntensity,
        hovered.current ? 0.8 : 0.12,
        delta * 6
      );
      frameMaterial.color.lerp(new THREE.Color(hovered.current ? "#1a1208" : "#0a0806"), delta * 6);
    }

    if (glowMeshRef.current) {
      glowOpacity.current = THREE.MathUtils.lerp(glowOpacity.current, hovered.current ? 0.35 : 0, delta * 5);
      glowMeshRef.current.scale.setScalar(THREE.MathUtils.lerp(glowMeshRef.current.scale.x, hovered.current ? 1.08 : 0.92, delta * 5));
      const glowMaterial = glowMeshRef.current.material as MeshStandardMaterial;
      glowMaterial.opacity = glowOpacity.current * scrollFade;
    }

  });

  const goToCategory = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelectCategory(item.categorySlug);
  };

  const setHovered = (value: boolean) => (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    hovered.current = value;
    setIsHovered(value);
    document.body.style.cursor = value ? "pointer" : "auto";
  };

  return (
    <group
      ref={groupRef}
      position={position}
      scale={scale}
      onClick={goToCategory}
      onPointerDown={goToCategory}
      onPointerOut={setHovered(false)}
      onPointerOver={setHovered(true)}
    >
      <mesh ref={glowMeshRef} position={[0, 0, -0.08]} scale={0.92}>
        <planeGeometry args={[2.35, 2.95]} />
        <meshStandardMaterial color="#cba15c" opacity={0} roughness={0.2} transparent />
      </mesh>
      <RoundedBox args={[2, 2.6, 0.08]} radius={0.12} smoothness={4}>
        <meshPhysicalMaterial
          ref={frameMaterialRef}
          clearcoat={0.6}
          color="#0a0806"
          emissive="#000000"
          emissiveIntensity={0.12}
          ior={1.4}
          metalness={0.2}
          roughness={0.15}
          thickness={0.4}
          transmission={0.6}
        />
      </RoundedBox>
      <mesh ref={imageMeshRef} position={[0, 0, 0.05]}>
        <planeGeometry args={[1.8, 2.4]} />
        <meshStandardMaterial map={texture} roughness={0.4} transparent />
      </mesh>
      <mesh position={[0, 0, 0.09]} onClick={goToCategory} onPointerDown={goToCategory}>
        <planeGeometry args={[2, 2.6]} />
        <meshBasicMaterial opacity={0.001} transparent />
      </mesh>
      <Html
        center
        distanceFactor={7}
        pointerEvents="none"
        position={[0, -1.85, 0.18]}
        style={{
          opacity: isHovered ? 1 : 0,
          transform: `translate3d(0, ${isHovered ? "-4px" : "0px"}, 0)`,
          transition: "opacity 180ms ease, transform 180ms ease"
        }}
      >
        <div
          style={{
            padding: "0.55rem 0.9rem",
            border: "1px solid rgba(203, 161, 92, 0.38)",
            borderRadius: "999px",
            background: "rgba(8, 7, 6, 0.82)",
            backdropFilter: "blur(10px)",
            color: "#f3ece1",
            fontSize: "0.7rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.32)"
          }}
        >
          {`Open ${item.categoryLabel} Catalog`}
        </div>
      </Html>
    </group>
  );
}
