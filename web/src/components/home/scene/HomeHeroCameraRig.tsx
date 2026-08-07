import { useFrame, useThree } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

type HomeHeroCameraRigProps = {
  enableParallax: boolean;
  scrollProgress?: MotionValue<number>;
};

export function HomeHeroCameraRig({
  enableParallax,
  scrollProgress
}: HomeHeroCameraRigProps): null {
  const { camera, pointer } = useThree();

  useFrame((_, delta) => {
    const progress = scrollProgress?.get() ?? 0;
    const eased = THREE.MathUtils.smoothstep(progress, 0, 1);
    const parallaxX = enableParallax ? pointer.x * 0.6 : 0;
    const parallaxY = enableParallax ? pointer.y * 0.3 : 0;
    const targetX = parallaxX + Math.sin(eased * Math.PI * 0.5) * 1.4;
    const targetY = 0.6 + parallaxY + eased * 0.9;
    const targetZ = 6.5 - eased * 4.2;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3, delta);
    camera.lookAt(0, 1 + eased * 0.6, -2 + eased * 1.5);
  });

  return null;
}
