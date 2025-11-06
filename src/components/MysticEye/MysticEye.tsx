import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const EyeCore = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z = time * 0.5;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z = -time * 0.3;
    }
  });

  return (
    <group>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.2}>
        <MeshDistortMaterial
          color="#00d9ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#00d9ff"
          emissiveIntensity={0.5}
        />
      </Sphere>

      <mesh ref={innerRingRef} rotation={[0, 0, 0]}>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial
          color="#ff3366"
          emissive="#ff3366"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <mesh ref={outerRingRef} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.8, 0.03, 16, 100]} />
        <meshStandardMaterial
          color="#9b7ede"
          emissive="#9b7ede"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      <pointLight position={[0, 0, 0]} intensity={2} color="#00d9ff" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ff3366" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#9b7ede" />
    </group>
  );
};

const MysticEye = () => {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <EyeCore />
      </Canvas>
    </div>
  );
};

export default MysticEye;
