import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './App.css';

function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.06,
    });

    const particleCount = 1200;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const radius = 7;

    for (let i = 0; i < particleCount; i++) {
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleSphere = new THREE.Points(particlesGeometry, particleMaterial);
    scene.add(particleSphere);

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);

      particleSphere.rotation.y += 0.001;
      particleSphere.rotation.x += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="App" ref={mountRef}>
      <h3 className="centered-text">Background Animation</h3>
    </div>
  );
}

export default App;
