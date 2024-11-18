import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './App.css';

function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const colors = ['#6528F7', '#A076F9', '#D7BBF5', '#EDE4FF'].map((c) =>
      new THREE.Color(c)
    );

    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const colorsArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = Math.random() * -20;
      sizes[i] = Math.random() * 0.1 + 0.02;

      const color = colors[Math.floor(Math.random() * colors.length)];
      colorsArray[i * 3] = color.r;
      colorsArray[i * 3 + 1] = color.g;
      colorsArray[i * 3 + 2] = color.b;
    }

    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colorsArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.1,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const animate = () => {
      requestAnimationFrame(animate);

      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 2] += 0.01;
        if (positions[i + 2] > 5) {
          positions[i + 2] = -20;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="App">
      <h1 className="text-center">Background Animation</h1>
    </div>
  );
}

export default App;