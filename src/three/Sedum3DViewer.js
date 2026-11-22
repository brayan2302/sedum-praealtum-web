import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import htm from 'htm';
import { buildSedumScene } from './sedumBuilder.js';
import { createCareEffects } from './careEffects.js';
import { Icon } from '../components/Icon.js';

const html = htm.bind(React.createElement);

const DEFAULT_CAM_POS = new THREE.Vector3(3.6, 2.35, 4.1);
const DEFAULT_TARGET = new THREE.Vector3(0, 1.05, 0);

export function Sedum3DViewer({
  hotspots,
  activeHotspotId,
  onSelectHotspot,
  activeCare,
  showCloche,
  autoRotate,
  resetSignal,
}) {
  const containerRef = useRef(null);
  const stateRef = useRef({
    activeCare,
    showCloche,
    autoRotate,
    desiredCamPos: null,
    desiredTarget: null,
  });
  const [projectedPins, setProjectedPins] = useState([]);

  // Keep refs synced with props
  useEffect(() => {
    stateRef.current.activeCare = activeCare;
  }, [activeCare]);

  useEffect(() => {
    stateRef.current.showCloche = showCloche;
  }, [showCloche]);

  useEffect(() => {
    stateRef.current.autoRotate = autoRotate;
  }, [autoRotate]);

  // Smoothly focus camera when a hotspot is chosen
  useEffect(() => {
    if (!activeHotspotId) return;
    const hs = hotspots.find((h) => h.id === activeHotspotId);
    if (hs) {
      stateRef.current.desiredCamPos = new THREE.Vector3(...hs.cameraPos);
      stateRef.current.desiredTarget = new THREE.Vector3(...hs.target);
    }
  }, [activeHotspotId, hotspots]);

  // Reset camera when requested
  useEffect(() => {
    if (resetSignal > 0) {
      stateRef.current.desiredCamPos = DEFAULT_CAM_POS.clone();
      stateRef.current.desiredTarget = DEFAULT_TARGET.clone();
    }
  }, [resetSignal]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 480;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Scene & Studio Environment
    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environmentIntensity = 0.72;

    // Camera
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.copy(DEFAULT_CAM_POS);

    // OrbitControls (Full 3D freedom: rotate, zoom, pan)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(DEFAULT_TARGET);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = true;
    controls.minDistance = 1.8;
    controls.maxDistance = 8.5;
    controls.maxPolarAngle = Math.PI * 0.56;
    controls.autoRotate = stateRef.current.autoRotate;
    controls.autoRotateSpeed = 1.05;

    // Stop camera lerp if user starts dragging manually
    const onControlStart = () => {
      stateRef.current.desiredCamPos = null;
      stateRef.current.desiredTarget = null;
    };
    controls.addEventListener('start', onControlStart);

    // Lighting setup (Moody dark-botanical luxury studio)
    const ambient = new THREE.AmbientLight(0xd8f3dc, 0.45);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xfff5e4, 2.2);
    keyLight.position.set(4.5, 6.5, 4.0);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    const rimLight = new THREE.SpotLight(0x74c69d, 4.0, 14, Math.PI / 4, 0.6);
    rimLight.position.set(-4.0, 3.6, -3.5);
    scene.add(rimLight);

    const underGlow = new THREE.PointLight(0x2d6a4f, 1.8, 7);
    underGlow.position.set(0, -0.4, 1.8);
    scene.add(underGlow);

    // Build 3D Sedum praealtum & Care Effects
    const plantParts = buildSedumScene();
    scene.add(plantParts.rootGroup);
    const careEffects = createCareEffects(scene);

    // Subtle floating ambient dust particles around the specimen
    const dustCount = 45;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 4.5;
      dustPos[i * 3 + 1] = -0.4 + Math.random() * 3.8;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustPoints = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0x95d5b2,
        size: 0.032,
        transparent: true,
        opacity: 0.45,
      })
    );
    scene.add(dustPoints);

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    const clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();
    let frameId = 0;
    let frameCounter = 0;

    function animate() {
      frameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      controls.autoRotate = stateRef.current.autoRotate;

      // Smooth camera transition to hotspot
      if (stateRef.current.desiredCamPos && stateRef.current.desiredTarget) {
        camera.position.lerp(stateRef.current.desiredCamPos, 0.075);
        controls.target.lerp(stateRef.current.desiredTarget, 0.075);
        if (camera.position.distanceTo(stateRef.current.desiredCamPos) < 0.04) {
          stateRef.current.desiredCamPos = null;
          stateRef.current.desiredTarget = null;
        }
      }

      // Smoothly lift & fade glass cloche dome on toggle
      const clocheTargetY = stateRef.current.showCloche ? 0 : 2.2;
      plantParts.clocheGroup.position.y = THREE.MathUtils.lerp(
        plantParts.clocheGroup.position.y,
        clocheTargetY,
        0.08
      );
      plantParts.clocheGroup.visible = plantParts.clocheGroup.position.y < 1.95;

      // Update care simulations (water droplets, sunbeam, airflow sway)
      careEffects.update(dt, elapsed, stateRef.current.activeCare, plantParts);

      // Gentle ambient dust drift
      dustPoints.rotation.y = elapsed * 0.04;

      controls.update();
      renderer.render(scene, camera);

      // Update 2D projected hotspot pins every 2 frames for silky performance
      frameCounter++;
      if (frameCounter % 2 === 0) {
        const w = container.clientWidth;
        const h = container.clientHeight;
        const pins = hotspots.map((hs) => {
          tempVec.set(...hs.position);
          // Account for slight plant sway
          tempVec.project(camera);
          const x = (tempVec.x * 0.5 + 0.5) * w;
          const y = (-tempVec.y * 0.5 + 0.5) * h;
          const visible = tempVec.z < 1;
          return { id: hs.id, label: hs.label, x, y, visible };
        });
        setProjectedPins(pins);
      }
    }

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', onControlStart);
      controls.dispose();
      pmrem.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [hotspots]);

  return html`
    <div
      ref=${containerRef}
      className="relative w-full h-full min-h-[380px] sm:min-h-[460px] rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none"
    >
      <!-- Projected 3D Hotspot Pins -->
      ${projectedPins.map((pin) => {
        if (!pin.visible) return null;
        const isActive = pin.id === activeHotspotId;
        return html`
          <button
            key=${pin.id}
            type="button"
            onClick=${(e) => {
              e.stopPropagation();
              onSelectHotspot(pin.id);
            }}
            style=${{
              transform: `translate(-50%, -50%) translate(${pin.x}px, ${pin.y}px)`,
            }}
            className=${`absolute top-0 left-0 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer shadow-lg ${
              isActive
                ? 'bg-mint-400 text-forest-950 ring-4 ring-mint-400/35'
                : 'bg-forest-950/85 text-white border border-mint-300/40 hover:bg-mint-400 hover:text-forest-950'
            }`}
          >
            <span
              className=${`w-2 h-2 rounded-full ${
                isActive ? 'bg-forest-950' : 'bg-mint-400 animate-pulse'
              }`}
            ></span>
            <span>${pin.label}</span>
          </button>
        `;
      })}

      <!-- Bottom-left 3D Interaction Hint -->
      <div
        className="pointer-events-none absolute bottom-3 left-3 z-20 px-3 py-1.5 rounded-full bg-forest-950/75 backdrop-blur-md border border-white/10 text-[11px] text-white/75 flex items-center gap-2"
      >
        <${Icon} name="move-3d" className="w-3.5 h-3.5 text-mint-300" />
        <span>Arrastra para rotar 360° · Rueda para zoom · Clic derecho para mover</span>
      </div>
    </div>
  `;
}
