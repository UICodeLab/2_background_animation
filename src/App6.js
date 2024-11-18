import React, { useEffect } from "react";
import * as THREE from "three";

const App = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      7.5,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(-3, -10, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const gridSize = 60;
    const gridSpacing = 0.15;

    const positions = [];
    const colors = [];
    const edges = [];

    for (let i = 0; i < gridSize - 1; i++) {
      for (let j = 0; j < gridSize - 1; j++) {
        const x0 = (i - gridSize / 2) * gridSpacing;
        const y0 = (j - gridSize / 2) * gridSpacing;
        const x1 = ((i + 1) - gridSize / 2) * gridSpacing;
        const y1 = ((j + 1) - gridSize / 2) * gridSpacing;

        const z0 = 0;
        const z1 = 0;

        const v0 = positions.length / 3;
        positions.push(x0, y0, z0);
        positions.push(x1, y0, z1);
        positions.push(x0, y1, z0);
        positions.push(x1, y1, z1);

        edges.push(v0, v0 + 1);
        edges.push(v0, v0 + 2);
        edges.push(v0 + 1, v0 + 3);
        edges.push(v0 + 2, v0 + 3);

        for (let k = 0; k < 4; k++) {
          const distanceFromCenter = Math.sqrt(
            Math.pow(positions[v0 * 3], 2) + Math.pow(positions[v0 * 3 + 1], 2)
          );
          const colorFactor = Math.sin(distanceFromCenter * 2.0) * 0.5 + 0.5;
          colors.push(colorFactor, 1.0 - colorFactor, 0.5);
        }
      }
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    pointGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3)
    );

    const pointMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
    });

    const points = new THREE.Points(pointGeometry, pointMaterial);
    scene.add(points);

    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    edgeGeometry.setIndex(edges);

    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x6498c7,
    });

    const lines = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    scene.add(lines);

    let time = 0;
    const animate = () => {
      time += 0.01;

      const positionArray = pointGeometry.attributes.position.array;
      for (let i = 0; i < positionArray.length / 3; i++) {
        const x = positionArray[i * 3];
        const y = positionArray[i * 3 + 1];

        positionArray[i * 3 + 2] =
          0.3 * Math.sin(time + x) + 0.3 * Math.cos(time + y);
      }
      pointGeometry.attributes.position.needsUpdate = true;

      edgeGeometry.attributes.position.array.set(positionArray);
      edgeGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      <h1 style={styles.heading}>Background Animation</h1>
    </>
  );
};

const styles = {
  heading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "2rem",
    fontFamily: "Arial, sans-serif",
    zIndex: 1000,
  },
};

export default App;
