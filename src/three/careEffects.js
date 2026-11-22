import * as THREE from 'three';

/**
 * Creates 3D particle & lighting systems for the animated Basic Care modes:
 * - 'riego': Falling glossy water droplets + hydration shimmer
 * - 'luz': Volumetric golden sunbeam + rotating sun spot + photosynthetic motes
 * - 'sustrato': Porous drainage airflow & mineral particles + warm breeze sway
 */
export function createCareEffects(scene) {
  const effectsGroup = new THREE.Group();
  scene.add(effectsGroup);

  // ==================== 1. WATER DROPLETS (RIEGO) ====================
  const dropletCount = 85;
  const dropletGeo = new THREE.SphereGeometry(0.028, 8, 8);
  dropletGeo.scale(0.85, 1.45, 0.85);
  const dropletMat = new THREE.MeshPhysicalMaterial({
    color: 0x7be0ff,
    emissive: 0x165b75,
    emissiveIntensity: 0.45,
    roughness: 0.05,
    transmission: 0.7,
    transparent: true,
    opacity: 0.85,
  });

  const rainGroup = new THREE.Group();
  const droplets = [];
  for (let i = 0; i < dropletCount; i++) {
    const drop = new THREE.Mesh(dropletGeo, dropletMat);
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * 0.95;
    drop.position.set(
      Math.cos(angle) * radius,
      1.2 + Math.random() * 2.4,
      Math.sin(angle) * radius
    );
    rainGroup.add(drop);
    droplets.push({
      mesh: drop,
      speed: 2.2 + Math.random() * 1.4,
      angle,
      radius,
    });
  }
  rainGroup.visible = false;
  effectsGroup.add(rainGroup);

  // ==================== 2. GOLDEN SUNBEAM (LUZ SOLAR) ====================
  const sunGroup = new THREE.Group();
  const beamGeo = new THREE.ConeGeometry(1.55, 4.6, 32, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xffdf7a,
    transparent: true,
    opacity: 0.11,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const sunBeam = new THREE.Mesh(beamGeo, beamMat);
  sunBeam.position.set(0.95, 2.2, 0.65);
  sunBeam.rotation.z = 0.36;
  sunBeam.rotation.x = -0.22;
  sunGroup.add(sunBeam);

  const sunLight = new THREE.PointLight(0xffd269, 0, 12);
  sunLight.position.set(2.2, 3.8, 1.8);
  sunGroup.add(sunLight);

  // Photosynthetic golden motes
  const moteCount = 60;
  const motePositions = new Float32Array(moteCount * 3);
  for (let i = 0; i < moteCount; i++) {
    motePositions[i * 3] = (Math.random() - 0.5) * 2.6;
    motePositions[i * 3 + 1] = 0.2 + Math.random() * 2.8;
    motePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.6;
  }
  const moteGeo = new THREE.BufferGeometry();
  moteGeo.setAttribute('position', new THREE.BufferAttribute(motePositions, 3));
  const moteMat = new THREE.PointsMaterial({
    color: 0xffe484,
    size: 0.055,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const sunMotes = new THREE.Points(moteGeo, moteMat);
  sunGroup.add(sunMotes);
  sunGroup.visible = false;
  effectsGroup.add(sunGroup);

  // ==================== 3. SUBSTRATE AIRFLOW & DRAINAGE (SUSTRATO) ====================
  const airflowGroup = new THREE.Group();
  const airCount = 70;
  const airPositions = new Float32Array(airCount * 3);
  const airMeta = [];
  for (let i = 0; i < airCount; i++) {
    const ang = Math.random() * Math.PI * 2;
    const rad = 0.45 + Math.random() * 1.1;
    const y = -0.5 + Math.random() * 2.5;
    airPositions[i * 3] = Math.cos(ang) * rad;
    airPositions[i * 3 + 1] = y;
    airPositions[i * 3 + 2] = Math.sin(ang) * rad;
    airMeta.push({ ang, rad, speed: 0.6 + Math.random() * 0.9 });
  }
  const airGeo = new THREE.BufferGeometry();
  airGeo.setAttribute('position', new THREE.BufferAttribute(airPositions, 3));
  const airMat = new THREE.PointsMaterial({
    color: 0x95d5b2,
    size: 0.05,
    transparent: true,
    opacity: 0.78,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const airPoints = new THREE.Points(airGeo, airMat);
  airflowGroup.add(airPoints);
  airflowGroup.visible = false;
  effectsGroup.add(airflowGroup);

  // ==================== FRAME UPDATE ====================
  function update(dt, elapsed, activeCare, plantParts) {
    const isRain = activeCare === 'riego';
    const isSun = activeCare === 'luz';
    const isAir = activeCare === 'sustrato';

    rainGroup.visible = isRain;
    sunGroup.visible = isSun;
    airflowGroup.visible = isAir;

    // 1. Update Rain
    if (isRain) {
      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i];
        d.mesh.position.y -= d.speed * dt;
        if (d.mesh.position.y < 0.06) {
          d.mesh.position.y = 2.7 + Math.random() * 1.1;
          const ang = Math.random() * Math.PI * 2;
          const r = Math.random() * 0.9;
          d.mesh.position.x = Math.cos(ang) * r;
          d.mesh.position.z = Math.sin(ang) * r;
        }
      }
      // Subtle hydrated leaf plumpness pulse
      const plump = 1 + Math.sin(elapsed * 4.5) * 0.035;
      plantParts.leafMeshes.forEach(({ mesh, baseScale }) => {
        mesh.scale.set(baseScale * plump, baseScale * plump, baseScale * plump);
      });
    } else {
      plantParts.leafMeshes.forEach(({ mesh, baseScale }) => {
        mesh.scale.lerp(new THREE.Vector3(baseScale, baseScale, baseScale), 0.1);
      });
    }

    // 2. Update Sunbeam
    sunLight.intensity = THREE.MathUtils.lerp(sunLight.intensity, isSun ? 6.5 : 0, 0.08);
    if (isSun) {
      sunBeam.rotation.y = elapsed * 0.35;
      sunMotes.rotation.y = elapsed * 0.25;
      sunMotes.position.y = Math.sin(elapsed * 1.4) * 0.12;
    }

    // 3. Update Airflow & Gentle Breeze Sway
    const swayAmp = isAir ? 0.065 : 0.016;
    const swayFreq = isAir ? 3.2 : 1.3;
    plantParts.plantGroup.rotation.z = Math.sin(elapsed * swayFreq) * swayAmp;
    plantParts.plantGroup.rotation.x = Math.cos(elapsed * swayFreq * 0.8) * swayAmp * 0.6;
    plantParts.flowerGroup.rotation.z = Math.sin(elapsed * swayFreq * 1.4) * swayAmp * 1.3;

    if (isAir) {
      const posAttr = airGeo.attributes.position;
      for (let i = 0; i < airCount; i++) {
        const m = airMeta[i];
        m.ang += m.speed * dt;
        let y = posAttr.getY(i) + dt * 0.55;
        if (y > 2.4) y = -0.55;
        posAttr.setXYZ(i, Math.cos(m.ang) * m.rad, y, Math.sin(m.ang) * m.rad);
      }
      posAttr.needsUpdate = true;
    }
  }

  return { update };
}
