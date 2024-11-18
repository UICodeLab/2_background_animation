import * as THREE from 'three'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Trail, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

export default function App() {
    return (
      <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
        <h1 style={{
          color: "white",
          position: "absolute",
          top: "80%",
          left: "20%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Arial, sans-serif",
          zIndex: 10,
        }}>
          Background Animation
        </h1>
        <Canvas 
          camera={{ position: [0, 0, 8], rotation: [-0.4, 0.4, 0] }}
        >
          <color attach="background" args={['black']} />
          <Float speed={4} rotationIntensity={1} floatIntensity={2}>
            <TiltedAtom />
          </Float>
          <EffectComposer>
            <Bloom intensity={2.0} mipmapBlur luminanceThreshold={0} radius={0.9} />
          </EffectComposer>
        </Canvas>        
      </div>
    );
  }  

function TiltedAtom(props) {
  return (
    <group rotation={[Math.PI / 6, Math.PI / 6, 0]} {...props}>
      <Atom />
    </group>
  )
}

function Atom(props) {
    const colorPalette = [
        "#FEDDEE", "#27ECFC", "#FFCF52", "#FF63B0",
        "#EBF9E5", "#6AA6F9", "#FFF2D0", "#7AF8CB",
        "#26C2FA", "#F33EE7", "#FAD16A", "#FF844E",
        "#07D2FB", "#3E4FEC", "#FECEF7", "#0066F4",
        "#FDFF97", "#FD91E4", "#FFE926", "#F948DD"
      ];
      
      function getRandomColor() {
        const colorHex = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        return new THREE.Color(colorHex);
      }
      
      const electrons = [
        { radius: 1, speed: 0.57, color: getRandomColor() },
        { radius: 2, speed: 0.83, color: getRandomColor() },
        { radius: 3, speed: 0.68, color: getRandomColor() },
        { radius: 4, speed: 0.22, color: getRandomColor() },
        { radius: 5, speed: 0.74, color: getRandomColor() },
        { radius: 6, speed: 0.39, color: getRandomColor() },
        { radius: 7, speed: 0.48, color: getRandomColor() },
        { radius: 8, speed: 0.31, color: getRandomColor() },
        { radius: 9, speed: 0.65, color: getRandomColor() },
        { radius: 10, speed: 0.77, color: getRandomColor() },
        { radius: 11, speed: 0.51, color: getRandomColor() },
        { radius: 12, speed: 0.45, color: getRandomColor() },
        { radius: 13, speed: 0.62, color: getRandomColor() },
        { radius: 14, speed: 0.88, color: getRandomColor() },
        { radius: 15, speed: 0.55, color: getRandomColor() },
        { radius: 16, speed: 0.33, color: getRandomColor() },
        { radius: 17, speed: 0.73, color: getRandomColor() },
        { radius: 18, speed: 0.46, color: getRandomColor() },
        { radius: 19, speed: 0.54, color: getRandomColor() },
        { radius: 20, speed: 0.71, color: getRandomColor() },
        { radius: 1.5, speed: 0.38, color: getRandomColor() },
        { radius: 2.5, speed: 0.56, color: getRandomColor() },
        { radius: 3.5, speed: 0.48, color: getRandomColor() },
        { radius: 4.5, speed: 0.75, color: getRandomColor() },
        { radius: 5.5, speed: 0.29, color: getRandomColor() },
        { radius: 6.5, speed: 0.35, color: getRandomColor() },
        { radius: 7.5, speed: 0.43, color: getRandomColor() },
        { radius: 8.5, speed: 0.52, color: getRandomColor() },
        { radius: 9.5, speed: 0.67, color: getRandomColor() },
        { radius: 10.5, speed: 0.88, color: getRandomColor() },
        { radius: 11.5, speed: 0.44, color: getRandomColor() },
        { radius: 12.5, speed: 0.58, color: getRandomColor() },
        { radius: 13.5, speed: 0.65, color: getRandomColor() },
        { radius: 14.5, speed: 0.72, color: getRandomColor() },
        { radius: 15.5, speed: 0.79, color: getRandomColor() },
        { radius: 16.5, speed: 0.82, color: getRandomColor() },
        { radius: 17.5, speed: 0.46, color: getRandomColor() },
        { radius: 18.5, speed: 0.34, color: getRandomColor() },
        { radius: 19.5, speed: 0.66, color: getRandomColor() },
        { radius: 20.5, speed: 0.53, color: getRandomColor() },
        { radius: 1.2, speed: 0.21, color: getRandomColor() },
        { radius: 3.8, speed: 0.43, color: getRandomColor() },
        { radius: 2.5, speed: 0.37, color: getRandomColor() },
        { radius: 4.1, speed: 0.59, color: getRandomColor() },
        { radius: 1.9, speed: 0.31, color: getRandomColor() },
        { radius: 2.8, speed: 0.49, color: getRandomColor() },
        { radius: 3.6, speed: 0.72, color: getRandomColor() },
        { radius: 1.7, speed: 0.68, color: getRandomColor() },
        { radius: 4.9, speed: 0.41, color: getRandomColor() },
        { radius: 2.3, speed: 0.57, color: getRandomColor() }
      ];
      
       
  return (
    <group {...props}>
      {electrons.map((electron, index) => (
        <Electron key={index} {...electron} />
      ))}
    </group>
  )
}

function Electron({ radius = 6, speed = 1, color = new THREE.Color(1, 1, 1), ...props }) {
  const ref = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    ref.current.position.set(
      Math.sin(t) * radius, 
      (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 
      0
    )
  })
  return (
    <group {...props}>
      <Trail local width={2} length={20} color={color} attenuation={(t) => t * t}>
        <mesh ref={ref}>
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </Trail>
    </group>
  )
}
