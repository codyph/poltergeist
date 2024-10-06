"use client";

import React, { useRef, useState, useEffect, MutableRefObject } from "react";
import * as THREE from "three";
import StarPopover from "./StarPopover";
import { toScreenPosition } from "../utils/screenPosition";
import { generateStarsData } from "../utils/starData";
import { Exoplanet } from "../fetch-exoplanets/route";
// Scene Setup Helper Functions

const createScene = () => new THREE.Scene();

const createCamera = () => {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(0, 2, 0);
  camera.lookAt(0, 0, 0);
  return camera;
};

const createRenderer = (mountRef: MutableRefObject<HTMLDivElement | null>) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  mountRef.current?.appendChild(renderer.domElement);
  return renderer;
};

const createLights = (scene: THREE.Scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(500, 1000, 750);
  scene.add(ambientLight);
  scene.add(directionalLight);
};

const createGround = (
  scene: THREE.Scene,
  planetName: string,
  textureLoader: THREE.TextureLoader,
  renderer: THREE.WebGLRenderer
) => {

  const planetTextures = [
    "/textures/planets/mars.jpg",
    "/textures/planets/jupiter.jpg",
    "/textures/planets/mercury.jpg",
    "/textures/planets/neptune.jpg",
    "/textures/planets/venus.jpg",
  ]

  const bumpMaps = [
    "/textures/bumpMaps/bump1.jpg",
    "/textures/bumpMaps/bump2.jpg",
    "/textures/bumpMaps/bump3.jpg",
  ];

  let randomTexture = planetTextures[Math.floor(Math.random() * planetTextures.length)];
  let randomBumpMap = bumpMaps[Math.floor(Math.random() * bumpMaps.length)];
  let randomAngle = Math.random() * 2;
  if (planetName == "Earth") {
    randomTexture = "/textures/planets/earth.jpg";
    randomAngle = 1.0/40.0
  }


  const groundTexture = textureLoader.load(
    randomTexture,
    (texture) => {
      const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
      texture.anisotropy = maxAnisotropy;

      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = THREE.LinearMipMapLinearFilter;

      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.wrapS = THREE.ClampToEdgeWrapping;
    }
  );
  groundTexture.rotation = Math.PI * randomAngle;

  const bumpMap = textureLoader.load(randomBumpMap);

  const groundGeometry = new THREE.SphereGeometry(10, 400, 400);
  const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundTexture,
    bumpMap: bumpMap,
    bumpScale: 10,
    side: THREE.DoubleSide,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -8.25;
  scene.add(ground);

  return { groundGeometry, groundMaterial };
};

const createStars = (scene: THREE.Scene, starVertices: Float32Array) => {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 1.5,
    sizeAttenuation: true,
  });

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  return { starGeometry, starMaterial, stars };
};

const createHoverSphere = (scene: THREE.Scene) => {
  const hoverGeometry = new THREE.SphereGeometry(2, 16, 16);
  const hoverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const hoverSphere = new THREE.Mesh(hoverGeometry, hoverMaterial);
  hoverSphere.visible = false;
  scene.add(hoverSphere);

  return { hoverGeometry, hoverMaterial, hoverSphere };
};

// Main Component

export default function SkyViewer({planet}: {planet: Exoplanet}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedStar, setSelectedStar] = useState(null);
  const [hoveredStar, setHoveredStar] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const scene = createScene();
    const camera = createCamera();
    const renderer = createRenderer(mountRef);

    createLights(scene);

    const textureLoader = new THREE.TextureLoader();
    const { groundGeometry, groundMaterial } = createGround(
      scene,
      planet.pl_name,
      textureLoader,
      renderer
    );

    const { starVertices, starsData } = generateStarsData(10000);
    const { starGeometry, starMaterial, stars } = createStars(
      scene,
      starVertices
    );

    const { hoverGeometry, hoverMaterial, hoverSphere } =
      createHoverSphere(scene);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      if (isDragging.current) return;

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObject(stars);

      if (intersects.length > 0) {
        const { index, point } = intersects[0];
        //@ts-expect-error shut the fu ts
        const star = starsData[index];
        const screenPos = toScreenPosition(
          new THREE.Vector3(point.x, point.y, point.z),
          camera
        );
        setSelectedStar({ ...star, screenPosition: screenPos });
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging.current) {
        const movementX = -event.movementX || 0;
        const movementY = -event.movementY || 0;
        const sensitivity = 0.002;

        yawRef.current -= movementX * sensitivity;
        pitchRef.current -= movementY * sensitivity;

        const maxPitch = Math.PI / 2 - 0.1;
        pitchRef.current = Math.max(
          -maxPitch,
          Math.min(maxPitch, pitchRef.current)
        );
      } else {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(stars);

        if (intersects.length > 0) {
          const { index } = intersects[0];
          //@ts-expect-error shut the fu ts
          const star = starsData[index];

          setHoveredStar(star);
          hoverSphere.position.set(
            star.position.x,
            star.position.y,
            star.position.z
          );
          hoverSphere.visible = true;
          renderer.domElement.style.cursor = "pointer";
          setMousePosition({ x: event.clientX, y: event.clientY });
        } else {
          setHoveredStar(null);
          hoverSphere.visible = false;
          renderer.domElement.style.cursor = "default";
        }
      }
    };

    const handleMouseDown = () => {
      isDragging.current = true;
      renderer.domElement.style.cursor = "grabbing";
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      renderer.domElement.style.cursor = "default";
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    renderer.domElement.addEventListener("click", handleClick);
    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    renderer.domElement.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      camera.rotation.order = "YXZ";
      camera.rotation.y = yawRef.current;
      camera.rotation.x = pitchRef.current;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.domElement.removeEventListener("click", handleClick);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      renderer.domElement.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);
      mountRef.current?.removeChild(renderer.domElement);

      groundGeometry.dispose();
      groundMaterial.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      hoverGeometry.dispose();
      hoverMaterial.dispose();
      renderer.dispose();
    };
  }, [planet]);

  const closeDialog = () => setSelectedStar(null);

  return (
    <>
      <div
        ref={mountRef}
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          margin: 0,
          position: "relative",
        }}
      />
      {selectedStar && (
        <StarPopover star={selectedStar} onClose={closeDialog} />
      )}
    </>
  );
}
