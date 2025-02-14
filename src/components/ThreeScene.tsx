import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

interface ThreeSceneProps {
  modelPath: string;
  containerStyle?: React.CSSProperties;
  modelSize?: number;
  fov?: number;
  near?: number;
  far?: number;
  cameraPosition?: { x: number; y: number; z: number };
  backgroundColor?: number;
  ambientLightIntensity?: number;
  directionalLightIntensity?: number;
  directionalLightPosition?: { x: number; y: number; z: number };
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  minDistance?: number;
  maxDistance?: number;
  rotateOnScroll?: boolean;
  scrollRotationSpeed?: number;
  // New props for speedup rotation
  speedupRotate?: boolean;
  speedupFactor?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  playAnimation?: boolean;
  animationSpeed?: number;
  damping?: boolean;
  dampingFactor?: number;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  onModelLoaded?: (model: THREE.Group, mixer?: THREE.AnimationMixer) => void;
  onClick?: (event: MouseEvent, intersect: THREE.Intersection) => void;
  onHover?: (event: MouseEvent, intersect: THREE.Intersection | null) => void;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({
  modelPath,
  containerStyle = { width: "100%", height: "100%", background: "transparent" },
  modelSize,
  fov = 75,
  near = 0.1,
  far = 1000,
  cameraPosition = { x: 0, y: 0, z: 10 },
  backgroundColor,
  ambientLightIntensity = 0.8,
  directionalLightIntensity = 0.8,
  directionalLightPosition = { x: 5, y: 10, z: 7.5 },
  enableZoom = false,
  enablePan = false,
  enableRotate = true,
  minPolarAngle = Math.PI / 2,
  maxPolarAngle = Math.PI / 2,
  minDistance,
  maxDistance,
  rotateOnScroll = false,
  scrollRotationSpeed = 0.005,
  // Destructure new props with defaults
  speedupRotate = false,
  speedupFactor = 1,
  autoRotate = false,
  autoRotateSpeed = 2.0,
  playAnimation = true,
  animationSpeed = 1.0,
  damping = true,
  dampingFactor = 0.05,
  onLoad,
  onError,
  onModelLoaded,
  onClick,
  onHover,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const modelRef = useRef<THREE.Group | null>(null);
  const scrollRotationDeltaRef = useRef<number>(0);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      fov,
      mount.clientWidth / mount.clientHeight,
      near,
      far
    );
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(
      backgroundColor ?? 0x000000,
      backgroundColor !== undefined ? 1 : 0
    );
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      ambientLightIntensity
    );
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(
      0xffffff,
      directionalLightIntensity
    );
    directionalLight.position.set(
      directionalLightPosition.x,
      directionalLightPosition.y,
      directionalLightPosition.z
    );
    scene.add(directionalLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = damping;
    controls.dampingFactor = dampingFactor;
    controls.enableZoom = enableZoom;
    controls.enablePan = enablePan;
    controls.enableRotate = enableRotate;
    controls.minPolarAngle = minPolarAngle;
    controls.maxPolarAngle = maxPolarAngle;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = autoRotateSpeed;
    if (minDistance !== undefined) controls.minDistance = minDistance;
    if (maxDistance !== undefined) controls.maxDistance = maxDistance;

    // Model loading
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        scene.add(model);
        modelRef.current = model;

        // Center model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        // Scaling
        if (modelSize !== undefined)
          model.scale.set(modelSize, modelSize, modelSize);

        // Animations
        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;
          gltf.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            if (playAnimation) action.play();
          });
        }

        // Callbacks
        if (onModelLoaded) onModelLoaded(model, mixerRef.current || undefined);
        if (onLoad) onLoad();
      },
      undefined,
      (error) => {
        if (onError) onError(error);
        else console.error("Error loading model", error);
      }
    );

    // Event handlers
    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const handleWheel = (event: WheelEvent) => {
      const multiplier = speedupRotate ? speedupFactor : 1;
      scrollRotationDeltaRef.current +=
        event.deltaY * scrollRotationSpeed * multiplier;
    };

    const handleClick = (event: MouseEvent) => {
      if (!onClick || !modelRef.current) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );

      raycasterRef.current.setFromCamera(mouse, camera);
      const intersects = raycasterRef.current.intersectObject(
        modelRef.current,
        true
      );
      if (intersects.length > 0) onClick(event, intersects[0]);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!onHover || !modelRef.current) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );

      raycasterRef.current.setFromCamera(mouse, camera);
      const intersects = raycasterRef.current.intersectObject(
        modelRef.current,
        true
      );
      onHover(event, intersects.length > 0 ? intersects[0] : null);
    };

    // Event listeners
    window.addEventListener("resize", handleResize);
    if (rotateOnScroll) window.addEventListener("wheel", handleWheel);
    if (onClick) renderer.domElement.addEventListener("click", handleClick);
    if (onHover)
      renderer.domElement.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      // Model rotation with smooth damping
      if (modelRef.current) {
        modelRef.current.rotation.y += scrollRotationDeltaRef.current;
        scrollRotationDeltaRef.current *= 0.9; // Decay factor for smooth stop
      }

      // Animation updates
      if (mixerRef.current) {
        mixerRef.current.timeScale = animationSpeed;
        mixerRef.current.update(clock.getDelta());
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (rotateOnScroll) window.removeEventListener("wheel", handleWheel);
      if (onClick)
        renderer.domElement.removeEventListener("click", handleClick);
      if (onHover)
        renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      scene.clear();
    };
  }, [
    modelPath,
    modelSize,
    fov,
    near,
    far,
    cameraPosition,
    backgroundColor,
    ambientLightIntensity,
    directionalLightIntensity,
    directionalLightPosition,
    enableZoom,
    enablePan,
    enableRotate,
    minPolarAngle,
    maxPolarAngle,
    minDistance,
    maxDistance,
    rotateOnScroll,
    scrollRotationSpeed,
    speedupRotate,
    speedupFactor,
    autoRotate,
    autoRotateSpeed,
    playAnimation,
    animationSpeed,
    damping,
    dampingFactor,
    onLoad,
    onError,
    onModelLoaded,
    onClick,
    onHover,
  ]);

  return <div ref={mountRef} style={containerStyle} />;
};

export default ThreeScene;
