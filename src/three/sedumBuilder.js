import * as THREE from 'three';

/**
 * Creates a thick, fleshy spatulate succulent leaf geometry characteristic of Sedum praealtum.
 */
function createSucculentLeafGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  shape.bezierCurveTo(0.11, 0.08, 0.23, 0.34, 0.19, 0.62);
  shape.bezierCurveTo(0.16, 0.8, 0.06, 0.92, 0, 0.95);
  shape.bezierCurveTo(-0.06, 0.92, -0.16, 0.8, -0.19, 0.62);
  shape.bezierCurveTo(-0.23, 0.34, -0.11, 0.08, 0, 0);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.065,
    bevelEnabled: true,
    bevelThickness: 0.038,
    bevelSize: 0.032,
    bevelSegments: 4,
    curveSegments: 14,
  });

  // Center thickness and gently cup the leaf upward along its length
  geo.translate(0, 0, -0.032);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const cup = x * x * 0.45 + y * y * 0.14;
    pos.setZ(i, z + cup);
  }
  geo.computeVertexNormals();
  // Rotate so leaf extends along +Z/+Y nicely when placed radially
  geo.rotateX(-Math.PI / 2);
  return geo;
}

/**
 * Creates a 5-petal star-shaped yellow-reddish Sedum flower.
 */
function createStarFlower(petalMat, centerMat) {
  const flower = new THREE.Group();
  const petalGeo = new THREE.ConeGeometry(0.035, 0.12, 4);
  petalGeo.scale(1, 1, 0.35);
  petalGeo.translate(0, 0.06, 0);

  for (let i = 0; i < 5; i++) {
    const p = new THREE.Mesh(petalGeo, petalMat);
    p.rotation.z = (i / 5) * Math.PI * 2;
    p.rotation.x = 1.25;
    flower.add(p);
  }

  const center = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 10), centerMat);
  center.position.y = 0.015;
  flower.add(center);

  return flower;
}

/**
 * Builds a complete rosette crown of fleshy Sedum praealtum leaves using golden-angle phyllotaxis.
 */
function buildRosette(leafGeo, leafMaterials, leafCount, baseScale, leafMeshes) {
  const rosette = new THREE.Group();
  const goldenAngle = 2.39996323; // ~137.5 degrees

  for (let i = 0; i < leafCount; i++) {
    const t = i / leafCount; // 0 = inner young leaves, 1 = outer mature leaves
    const angle = i * goldenAngle;
    const matIdx = Math.min(
      leafMaterials.length - 1,
      Math.floor(t * leafMaterials.length)
    );
    const leaf = new THREE.Mesh(leafGeo, leafMaterials[matIdx]);
    leaf.castShadow = true;
    leaf.receiveShadow = true;

    const scale = baseScale * (0.42 + t * 0.68);
    leaf.scale.set(scale, scale, scale);

    // Pitch outward more for outer leaves
    const tilt = 0.25 + t * 1.12;
    const holder = new THREE.Group();
    holder.rotation.y = angle;
    holder.position.y = (1 - t) * 0.22 * baseScale;

    leaf.rotation.x = -tilt;
    leaf.position.z = 0.04 * baseScale;
    holder.add(leaf);
    rosette.add(holder);

    leafMeshes.push({ mesh: leaf, baseScale: scale, phase: i * 0.35 });
  }

  return rosette;
}

/**
 * Builds the complete high-craft 3D Sedum praealtum scene assembly.
 */
export function buildSedumScene() {
  const rootGroup = new THREE.Group();
  const plantGroup = new THREE.Group();
  const flowerGroup = new THREE.Group();
  const clocheGroup = new THREE.Group();
  const leafMeshes = [];

  // 1. Dark Botanical Pedestal
  const pedestalMat = new THREE.MeshStandardMaterial({
    color: 0x0d261c,
    roughness: 0.42,
    metalness: 0.15,
  });
  const pedestalBase = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.78, 0.22, 64), pedestalMat);
  pedestalBase.position.y = -0.78;
  pedestalBase.receiveShadow = true;
  rootGroup.add(pedestalBase);

  const pedestalRim = new THREE.Mesh(
    new THREE.TorusGeometry(1.56, 0.045, 16, 64),
    new THREE.MeshStandardMaterial({ color: 0x1b4332, roughness: 0.3, metalness: 0.3 })
  );
  pedestalRim.rotation.x = Math.PI / 2;
  pedestalRim.position.y = -0.66;
  rootGroup.add(pedestalRim);

  // 2. Artisan Terracotta Pot (LatheGeometry with subtle ribbing)
  const potPoints = [
    new THREE.Vector2(0.0, -0.67),
    new THREE.Vector2(0.56, -0.67),
    new THREE.Vector2(0.68, -0.45),
    new THREE.Vector2(0.76, -0.2),
    new THREE.Vector2(0.82, 0.04),
    new THREE.Vector2(0.85, 0.12),
    new THREE.Vector2(0.76, 0.12),
    new THREE.Vector2(0.72, -0.02),
  ];
  const potGeo = new THREE.LatheGeometry(potPoints, 48);
  const potMat = new THREE.MeshStandardMaterial({
    color: 0x7c4a32,
    roughness: 0.78,
    metalness: 0.05,
  });
  const potMesh = new THREE.Mesh(potGeo, potMat);
  potMesh.castShadow = true;
  potMesh.receiveShadow = true;
  rootGroup.add(potMesh);

  // Decorative subtle horizontal rings on pot
  for (let r = 0; r < 5; r++) {
    const y = -0.52 + r * 0.13;
    const rad = 0.65 + r * 0.043;
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(rad, 0.011, 8, 48),
      new THREE.MeshStandardMaterial({ color: 0x673c27, roughness: 0.85 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = y;
    rootGroup.add(ring);
  }

  // 3. Porous Soil + Mineral Perlite Pebbles (Drainage substrate)
  const soilMat = new THREE.MeshStandardMaterial({
    color: 0x261d17,
    roughness: 0.96,
  });
  const soil = new THREE.Mesh(new THREE.SphereGeometry(0.76, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), soilMat);
  soil.scale.set(1, 0.22, 1);
  soil.position.y = 0.01;
  soil.receiveShadow = true;
  rootGroup.add(soil);

  const pebbleGeo = new THREE.DodecahedronGeometry(0.036, 0);
  const pebbleColors = [0xcfd8d3, 0x8e8477, 0x5c534a, 0xd8d2c5];
  for (let p = 0; p < 38; p++) {
    const ang = Math.random() * Math.PI * 2;
    const dist = 0.15 + Math.random() * 0.56;
    const pebble = new THREE.Mesh(
      pebbleGeo,
      new THREE.MeshStandardMaterial({
        color: pebbleColors[p % pebbleColors.length],
        roughness: 0.85,
      })
    );
    pebble.position.set(
      Math.cos(ang) * dist,
      0.06 + (1 - dist / 0.76) * 0.08,
      Math.sin(ang) * dist
    );
    pebble.scale.set(
      0.6 + Math.random() * 0.9,
      0.45 + Math.random() * 0.5,
      0.6 + Math.random() * 0.9
    );
    pebble.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    rootGroup.add(pebble);
  }

  // 4. Branching Succulent Stems
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x4b6e44,
    roughness: 0.58,
    metalness: 0.05,
  });

  const branches = [
    {
      points: [
        new THREE.Vector3(0, 0.05, 0),
        new THREE.Vector3(0.04, 0.65, 0.03),
        new THREE.Vector3(0.0, 1.32, 0.02),
      ],
      radius: 0.09,
      rosetteCount: 28,
      rosetteScale: 0.82,
      hasFlowers: true,
    },
    {
      points: [
        new THREE.Vector3(0.02, 0.35, 0.02),
        new THREE.Vector3(-0.38, 0.78, 0.25),
        new THREE.Vector3(-0.62, 1.18, 0.42),
      ],
      radius: 0.065,
      rosetteCount: 22,
      rosetteScale: 0.66,
      hasFlowers: false,
    },
    {
      points: [
        new THREE.Vector3(0.02, 0.42, -0.02),
        new THREE.Vector3(0.42, 0.82, -0.18),
        new THREE.Vector3(0.64, 1.16, -0.32),
      ],
      radius: 0.065,
      rosetteCount: 22,
      rosetteScale: 0.65,
      hasFlowers: true,
    },
    {
      points: [
        new THREE.Vector3(-0.02, 0.3, -0.04),
        new THREE.Vector3(-0.24, 0.68, -0.42),
        new THREE.Vector3(-0.42, 0.98, -0.62),
      ],
      radius: 0.055,
      rosetteCount: 18,
      rosetteScale: 0.55,
      hasFlowers: false,
    },
    {
      points: [
        new THREE.Vector3(0.04, 0.28, 0.04),
        new THREE.Vector3(0.32, 0.64, 0.4),
        new THREE.Vector3(0.52, 0.96, 0.58),
      ],
      radius: 0.055,
      rosetteCount: 18,
      rosetteScale: 0.56,
      hasFlowers: false,
    },
  ];

  // 5. Fleshy Succulent Leaf Materials (waxy clearcoat + natural color gradient)
  const leafGeo = createSucculentLeafGeometry();
  const leafMaterials = [
    new THREE.MeshPhysicalMaterial({
      color: 0x74c66c, // bright fresh inner lime-emerald
      roughness: 0.26,
      metalness: 0.02,
      clearcoat: 0.45,
      clearcoatRoughness: 0.25,
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x4ca154, // rich succulent green
      roughness: 0.28,
      metalness: 0.02,
      clearcoat: 0.42,
      clearcoatRoughness: 0.28,
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x357a43, // mature deeper emerald
      roughness: 0.32,
      metalness: 0.03,
      clearcoat: 0.38,
      clearcoatRoughness: 0.3,
    }),
    new THREE.MeshPhysicalMaterial({
      color: 0x45733d, // outer sun-kissed olive-green
      roughness: 0.35,
      metalness: 0.03,
      clearcoat: 0.35,
      clearcoatRoughness: 0.32,
    }),
  ];

  // Flower Materials (yellow, reddish-amber, greenish buds)
  const petalYellowMat = new THREE.MeshStandardMaterial({
    color: 0xf4c430,
    emissive: 0x4a3500,
    emissiveIntensity: 0.25,
    roughness: 0.38,
  });
  const petalReddishMat = new THREE.MeshStandardMaterial({
    color: 0xd96b43,
    emissive: 0x3a1205,
    emissiveIntensity: 0.2,
    roughness: 0.42,
  });
  const flowerCenterMat = new THREE.MeshStandardMaterial({
    color: 0xa63a2b,
    roughness: 0.4,
  });
  const stalkMat = new THREE.MeshStandardMaterial({
    color: 0x6b8f54,
    roughness: 0.5,
  });

  branches.forEach((b, bIdx) => {
    const curve = new THREE.CatmullRomCurve3(b.points);
    const tubeGeo = new THREE.TubeGeometry(curve, 20, b.radius, 12, false);
    const stemMesh = new THREE.Mesh(tubeGeo, stemMat);
    stemMesh.castShadow = true;
    stemMesh.receiveShadow = true;
    plantGroup.add(stemMesh);

    const tip = b.points[b.points.length - 1];
    const prev = b.points[b.points.length - 2];
    const dir = new THREE.Vector3().subVectors(tip, prev).normalize();

    const rosette = buildRosette(
      leafGeo,
      leafMaterials,
      b.rosetteCount,
      b.rosetteScale,
      leafMeshes
    );
    rosette.position.copy(tip);
    rosette.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    plantGroup.add(rosette);

    // Add arching inflorescence flower clusters on selected crowns
    if (b.hasFlowers) {
      const stalkCount = bIdx === 0 ? 3 : 2;
      for (let s = 0; s < stalkCount; s++) {
        const ang = (s / stalkCount) * Math.PI * 2 + bIdx;
        const spread = 0.26 + s * 0.06;
        const height = 0.85 + (s % 2) * 0.22;

        const p0 = tip.clone().add(new THREE.Vector3(0, 0.08, 0));
        const p1 = tip
          .clone()
          .add(new THREE.Vector3(Math.cos(ang) * spread * 0.5, height * 0.65, Math.sin(ang) * spread * 0.5));
        const p2 = tip
          .clone()
          .add(new THREE.Vector3(Math.cos(ang) * spread, height, Math.sin(ang) * spread));

        const stalkCurve = new THREE.CatmullRomCurve3([p0, p1, p2]);
        const stalk = new THREE.Mesh(
          new THREE.TubeGeometry(stalkCurve, 14, 0.018, 8, false),
          stalkMat
        );
        flowerGroup.add(stalk);

        // Cluster of 5 star flowers at stalk tip
        for (let f = 0; f < 5; f++) {
          const fAng = (f / 5) * Math.PI * 2;
          const useRed = f % 3 === 0;
          const star = createStarFlower(
            useRed ? petalReddishMat : petalYellowMat,
            flowerCenterMat
          );
          star.position.copy(p2).add(
            new THREE.Vector3(
              Math.cos(fAng) * 0.09,
              (f % 2) * 0.06,
              Math.sin(fAng) * 0.09
            )
          );
          star.rotation.set(
            (Math.random() - 0.5) * 0.5,
            fAng,
            (Math.random() - 0.5) * 0.5
          );
          flowerGroup.add(star);
        }
      }
    }
  });

  plantGroup.add(flowerGroup);
  rootGroup.add(plantGroup);

  // 6. Luxury Crystal-Clear Glass Cloche Dome (toggleable)
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xeaf7f0,
    transparent: true,
    opacity: 0.26,
    roughness: 0.06,
    metalness: 0.05,
    transmission: 0.85,
    ior: 1.45,
    thickness: 0.25,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    side: THREE.FrontSide,
    depthWrite: false,
  });

  const domeCyl = new THREE.Mesh(
    new THREE.CylinderGeometry(1.48, 1.48, 2.3, 48, 1, true),
    glassMat
  );
  domeCyl.position.y = 0.5;
  clocheGroup.add(domeCyl);

  const domeTop = new THREE.Mesh(
    new THREE.SphereGeometry(1.48, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    glassMat
  );
  domeTop.scale.set(1, 0.45, 1);
  domeTop.position.y = 1.65;
  clocheGroup.add(domeTop);

  // Glass handle knob on top
  const domeKnob = new THREE.Mesh(new THREE.SphereGeometry(0.11, 20, 16), glassMat);
  domeKnob.position.y = 2.38;
  clocheGroup.add(domeKnob);

  rootGroup.add(clocheGroup);

  return {
    rootGroup,
    plantGroup,
    flowerGroup,
    clocheGroup,
    leafMeshes,
    leafMaterials,
  };
}
