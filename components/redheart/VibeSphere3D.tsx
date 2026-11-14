'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VibeSphere3DProps {
  activeVibeColor?: number;
  activeVibeId?: string;
  onSelectPattern?: (id: string) => void;
  className?: string;
}

// Module-scope temporary vectors to prevent per-frame GC allocations
const _targetColor = new THREE.Color();
const _currentColor = new THREE.Color();

export const VibeSphere3D: React.FC<VibeSphere3DProps> = ({
  activeVibeColor = 0xf43f5e,
  activeVibeId = 'micro-echo',
  onSelectPattern,
  className = ''
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Keep ref to mutable state so event handlers don't trigger re-renders
  const stateRef = useRef({
    activeColor: activeVibeColor,
    isRotating: true,
    targetRotationX: 0.2,
    targetRotationY: 0,
    currentRotationX: 0.2,
    currentRotationY: 0,
    isDragging: false,
    previousMouseX: 0,
    previousMouseY: 0,
    pulseTime: 0
  });

  useEffect(() => {
    stateRef.current.activeColor = activeVibeColor;
  }, [activeVibeColor]);

  useEffect(() => {
    stateRef.current.isRotating = isRotating;
  }, [isRotating]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.getBoundingClientRect().width || container.clientWidth || 360;
    const height = container.clientHeight || 320;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 4.2);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 1. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xfff5f5, 0x221133, 1.5);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff7799, 1.8);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const corePointLight = new THREE.PointLight(activeVibeColor, 3.5, 8);
    corePointLight.position.set(0, 0, 0);
    scene.add(corePointLight);

    // 2. Procedural 3D Heart Geometry
    const heartShape = new THREE.Shape();
    const x = 0;
    const y = 0;
    // Normalized smooth heart spline
    heartShape.moveTo(x, y + 0.25);
    heartShape.bezierCurveTo(x, y + 0.25, x - 0.25, y + 0.6, x - 0.55, y + 0.6);
    heartShape.bezierCurveTo(x - 0.95, y + 0.6, x - 0.95, y + 0.2, x - 0.95, y + 0.2);
    heartShape.bezierCurveTo(x - 0.95, y - 0.2, x - 0.65, y - 0.65, x, y - 1.05);
    heartShape.bezierCurveTo(x + 0.65, y - 0.65, x + 0.95, y - 0.2, x + 0.95, y + 0.2);
    heartShape.bezierCurveTo(x + 0.95, y + 0.2, x + 0.95, y + 0.6, x + 0.55, y + 0.6);
    heartShape.bezierCurveTo(x + 0.25, y + 0.6, x, y + 0.25, x, y + 0.25);

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.45,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.16,
      bevelThickness: 0.16
    };

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();
    // Rotate to point upward in Three.js coordinates
    heartGeo.rotateZ(Math.PI);
    heartGeo.scale(0.85, 0.85, 0.85);

    // Physical Glass Material for Heart
    const heartMat = new THREE.MeshPhysicalMaterial({
      color: activeVibeColor,
      emissive: activeVibeColor,
      emissiveIntensity: 0.35,
      roughness: 0.12,
      metalness: 0.15,
      transmission: 0.6,
      ior: 1.5,
      transparent: true,
      opacity: 0.88,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });

    const heartMesh = new THREE.Mesh(heartGeo, heartMat);

    // Inner Faceted Crystal Core
    const innerCrystalGeo = new THREE.OctahedronGeometry(0.42, 1);
    const innerCrystalMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: activeVibeColor,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.85,
      wireframe: true
    });
    const innerCrystalMesh = new THREE.Mesh(innerCrystalGeo, innerCrystalMat);
    heartMesh.add(innerCrystalMesh);

    // Main 3D Interactive Group
    const mainGroup = new THREE.Group();
    mainGroup.add(heartMesh);
    scene.add(mainGroup);

    // 3. Orbital Gyroscopic Rings
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xffe4e6,
      emissive: activeVibeColor,
      emissiveIntensity: 0.4,
      metalness: 0.85,
      roughness: 0.2
    });
    const ringGeo1 = new THREE.TorusGeometry(1.4, 0.022, 16, 80);
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3.2;
    ringMesh1.rotation.y = Math.PI / 6;
    mainGroup.add(ringMesh1);

    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: activeVibeColor,
      emissiveIntensity: 0.3,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: true
    });
    const ringGeo2 = new THREE.TorusGeometry(1.68, 0.015, 12, 70);
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.z = Math.PI / 4;
    mainGroup.add(ringMesh2);

    // 4. Emotional Satellites (3 Mood Nodes)
    const nodeGeo = new THREE.SphereGeometry(0.1, 16, 16);
    const node1Mat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, emissive: 0xf43f5e, emissiveIntensity: 0.9 });
    const node2Mat = new THREE.MeshStandardMaterial({ color: 0xfb7185, emissive: 0xfb7185, emissiveIntensity: 0.9 });
    const node3Mat = new THREE.MeshStandardMaterial({ color: 0xf472b6, emissive: 0xf472b6, emissiveIntensity: 0.9 });

    const node1 = new THREE.Mesh(nodeGeo, node1Mat);
    const node2 = new THREE.Mesh(nodeGeo, node2Mat);
    const node3 = new THREE.Mesh(nodeGeo, node3Mat);
    mainGroup.add(node1);
    mainGroup.add(node2);
    mainGroup.add(node3);

    // 5. Procedural Stardust / Sparkle Cloud
    const particleCount = 140;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 1.2 + Math.random() * 1.0;
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particlePoints = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particlePoints);

    // 6. Contact Grounding Shadow
    const shadowGeo = new THREE.CircleGeometry(1.1, 32);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x9f1239,
      transparent: true,
      opacity: 0.12,
      depthWrite: false
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.35;
    scene.add(shadowMesh);

    // Mouse & Touch Controls
    const handlePointerDown = (clientX: number, clientY: number) => {
      stateRef.current.isDragging = true;
      stateRef.current.previousMouseX = clientX;
      stateRef.current.previousMouseY = clientY;
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
      if (!stateRef.current.isDragging) return;
      const deltaX = clientX - stateRef.current.previousMouseX;
      const deltaY = clientY - stateRef.current.previousMouseY;
      stateRef.current.targetRotationY += deltaX * 0.008;
      stateRef.current.targetRotationX += deltaY * 0.008;
      // Clamp vertical tilt
      stateRef.current.targetRotationX = Math.max(-0.6, Math.min(0.6, stateRef.current.targetRotationX));
      stateRef.current.previousMouseX = clientX;
      stateRef.current.previousMouseY = clientY;
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const onMouseDown = (e: MouseEvent) => handlePointerDown(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => handlePointerMove(e.clientX, e.clientY);
    const onMouseUp = () => handlePointerUp();

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const onTouchEnd = () => handlePointerUp();

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.getBoundingClientRect().width || container.clientWidth || 360;
      const newH = container.clientHeight || 320;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Smooth Exponential Damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      animationFrameId = requestAnimationFrame(renderLoop);
      const delta = Math.min(clock.getDelta(), 0.1);
      stateRef.current.pulseTime += delta * 1.5;

      // Auto rotation when enabled and not dragging
      if (stateRef.current.isRotating && !stateRef.current.isDragging) {
        stateRef.current.targetRotationY += delta * 0.5;
      }

      // Exponential damping for buttery smooth momentum
      stateRef.current.currentRotationY = THREE.MathUtils.damp(
        stateRef.current.currentRotationY,
        stateRef.current.targetRotationY,
        8,
        delta
      );
      stateRef.current.currentRotationX = THREE.MathUtils.damp(
        stateRef.current.currentRotationX,
        stateRef.current.targetRotationX,
        8,
        delta
      );

      mainGroup.rotation.y = stateRef.current.currentRotationY;
      mainGroup.rotation.x = stateRef.current.currentRotationX;

      // Gentle floating breathing animation
      const heartBeat = Math.sin(stateRef.current.pulseTime * 2.2) * 0.05 + 1.0;
      heartMesh.scale.set(heartBeat, heartBeat, heartBeat);
      heartMesh.position.y = Math.sin(stateRef.current.pulseTime * 1.2) * 0.08;

      // Counter-rotate inner crystal & rings
      innerCrystalMesh.rotation.x += delta * 0.8;
      innerCrystalMesh.rotation.y -= delta * 0.6;
      ringMesh1.rotation.z += delta * 0.35;
      ringMesh2.rotation.z -= delta * 0.25;

      // Orbiting Mood Satellites along parametric paths
      const t = stateRef.current.pulseTime;
      node1.position.set(Math.cos(t * 0.9) * 1.4, Math.sin(t * 0.9) * 0.7, Math.sin(t * 0.9) * 1.4);
      node2.position.set(Math.cos(t * 0.7 + 2.1) * 1.68, Math.sin(t * 0.7 + 2.1) * 0.85, Math.sin(t * 0.7 + 2.1) * 1.68);
      node3.position.set(Math.cos(t * 0.8 + 4.2) * 1.5, -Math.sin(t * 0.8 + 4.2) * 0.8, Math.sin(t * 0.8 + 4.2) * 1.5);

      // Smooth color morphing to target active vibe color
      _targetColor.setHex(stateRef.current.activeColor);
      _currentColor.lerp(_targetColor, 0.08);

      heartMat.color.copy(_currentColor);
      heartMat.emissive.copy(_currentColor);
      innerCrystalMat.emissive.copy(_currentColor);
      corePointLight.color.copy(_currentColor);
      ringMat1.emissive.copy(_currentColor);

      renderer.render(scene, camera);
    };

    renderLoop();

    // Cleanup resources strictly
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      // Dispose Geometries and Materials
      heartGeo.dispose();
      heartMat.dispose();
      innerCrystalGeo.dispose();
      innerCrystalMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      node1Mat.dispose();
      node2Mat.dispose();
      node3Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      renderer.dispose();

      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, []);

  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-b from-gray-950 via-slate-900 to-pink-950/70 border border-pink-500/20 shadow-2xl ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3D Canvas Mount Point */}
      <div ref={mountRef} className="w-full h-64 md:h-80 lg:h-96 cursor-grab active:cursor-grabbing" />

      {/* Top HUD Badge */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-semibold text-pink-300">
          <span className="w-2 h-2 rounded-full bg-pink-500"></span>
          Siya 3D Vibe Core
        </div>
      </div>

      {/* Bottom Floating Control Dock */}
      <div className="absolute bottom-3 right-3 flex items-center justify-end text-xs text-white/80 pointer-events-auto">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsRotating(!isRotating)}
            className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-pink-100 border border-white/10 transition-all cursor-pointer"
            title="Toggle Auto Spin"
          >
            {isRotating ? 'Pause Spin' : 'Auto Spin'}
          </button>
          <button
            type="button"
            onClick={() => {
              stateRef.current.targetRotationX = 0.2;
              stateRef.current.targetRotationY = 0;
            }}
            className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-pink-100 border border-white/10 transition-all cursor-pointer"
            title="Reset Angle"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
