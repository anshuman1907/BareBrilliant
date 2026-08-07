import { MeshTransmissionMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export function HomeHeroGemCluster() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) {
      return;
    }
    meshRef.current.rotation.y += delta * 0.12;
    meshRef.current.rotation.x += delta * 0.04;
  });

  return (
    <mesh ref={meshRef} position={[0, 1.6, -2]} scale={1.8}>
      <icosahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        backside
        chromaticAberration={0.15}
        clearcoat={1}
        clearcoatRoughness={0.05}
        color="#ffedc2"
        distortion={0.15}
        distortionScale={0.4}
        envMapIntensity={1.6}
        ior={2.6}
        resolution={512}
        roughness={0.02}
        samples={10}
        temporalDistortion={0.1}
        thickness={2.2}
        transmission={1}
      />
    </mesh>
  );
}
