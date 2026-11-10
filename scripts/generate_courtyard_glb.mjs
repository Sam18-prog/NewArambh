import fs from 'fs';
import path from 'path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

// Polyfills for Node environment if needed by GLTFExporter
if (typeof window === 'undefined') {
  global.window = {};
}

class NodeFileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload({ target: this });
      if (this.onloadend) this.onloadend({ target: this });
    });
  }
}
global.FileReader = NodeFileReader;

const scene = new THREE.Scene();
scene.name = 'HeritageCourtyardScene';

// PBR Materials
const sandstoneMat = new THREE.MeshStandardMaterial({
  color: 0xb5733c,
  roughness: 0.85,
  metalness: 0.05,
  name: 'SandstonePBR',
});

const darkSandstoneMat = new THREE.MeshStandardMaterial({
  color: 0x7c3f19,
  roughness: 0.9,
  metalness: 0.02,
  name: 'DarkSandstonePBR',
});

const lightStoneMat = new THREE.MeshStandardMaterial({
  color: 0xd4a373,
  roughness: 0.8,
  metalness: 0.05,
  name: 'LightStonePBR',
});

const goldAccentMat = new THREE.MeshStandardMaterial({
  color: 0xf59e0b,
  roughness: 0.35,
  metalness: 0.75,
  name: 'GoldAccentPBR',
});

const waterMat = new THREE.MeshStandardMaterial({
  color: 0x0284c7,
  roughness: 0.1,
  metalness: 0.3,
  transparent: true,
  opacity: 0.85,
  name: 'WaterPBR',
});

const brassLampMat = new THREE.MeshStandardMaterial({
  color: 0xd97706,
  roughness: 0.4,
  metalness: 0.8,
  name: 'BrassLampPBR',
});

// 1. Ground Courtyard Platform
const groundGeo = new THREE.BoxGeometry(44, 0.4, 44);
const groundMesh = new THREE.Mesh(groundGeo, sandstoneMat);
groundMesh.position.y = -0.2;
groundMesh.name = 'CourtyardPlinth';
groundMesh.receiveShadow = true;
scene.add(groundMesh);

// 2. Central Mandapa (Pillared Hall) at (0, 0, 0)
const mandapaGroup = new THREE.Group();
mandapaGroup.name = 'CentralMandapa';

// Octagonal Plinth
const plinthGeo = new THREE.CylinderGeometry(5.8, 6.2, 0.6, 8);
const plinthMesh = new THREE.Mesh(plinthGeo, darkSandstoneMat);
plinthMesh.position.y = 0.3;
plinthMesh.receiveShadow = true;
mandapaGroup.add(plinthMesh);

// 8 Carved Pillars in Octagon
const pillarRadius = 4.6;
const pillarCount = 8;
for (let i = 0; i < pillarCount; i++) {
  const angle = (i * Math.PI * 2) / pillarCount;
  const px = Math.cos(angle) * pillarRadius;
  const pz = Math.sin(angle) * pillarRadius;

  const pillarGroup = new THREE.Group();
  pillarGroup.position.set(px, 0.6, pz);

  // Base
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.7), darkSandstoneMat);
  base.position.y = 0.2;
  pillarGroup.add(base);

  // Shaft
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 4.0, 12), lightStoneMat);
  shaft.position.y = 2.4;
  shaft.castShadow = true;
  pillarGroup.add(shaft);

  // Capital & Bracket
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.26, 0.4, 8), darkSandstoneMat);
  cap.position.y = 4.6;
  pillarGroup.add(cap);

  mandapaGroup.add(pillarGroup);
}

// Corbelled Dome Ceiling & Ring
const ringGeo = new THREE.TorusGeometry(pillarRadius, 0.25, 8, 24);
const ringMesh = new THREE.Mesh(ringGeo, darkSandstoneMat);
ringMesh.rotation.x = Math.PI / 2;
ringMesh.position.y = 5.3;
mandapaGroup.add(ringMesh);

// Domed Cap
const domeGeo = new THREE.SphereGeometry(3.6, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.48);
const domeMesh = new THREE.Mesh(domeGeo, sandstoneMat);
domeMesh.position.y = 5.2;
domeMesh.castShadow = true;
mandapaGroup.add(domeMesh);

// Golden Finial (Kalash)
const finial = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.2, 8), goldAccentMat);
finial.position.y = 8.5;
mandapaGroup.add(finial);

scene.add(mandapaGroup);

// 3. Sunken Stepwell (Baori) at (-11, 0, 4)
const stepwellGroup = new THREE.Group();
stepwellGroup.name = 'BaoriStepwell';
stepwellGroup.position.set(-11, 0, 4);

// Outer Rim
const rim = new THREE.Mesh(new THREE.BoxGeometry(9, 0.3, 9), darkSandstoneMat);
rim.position.y = 0.15;
stepwellGroup.add(rim);

// Stepped Terraces
const step1 = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.5, 7.5), sandstoneMat);
step1.position.y = -0.25;
stepwellGroup.add(step1);

const step2 = new THREE.Mesh(new THREE.BoxGeometry(6.0, 0.5, 6.0), darkSandstoneMat);
step2.position.y = -0.75;
stepwellGroup.add(step2);

// Water Surface
const water = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 4.5), waterMat);
water.rotation.x = -Math.PI / 2;
water.position.y = -0.9;
stepwellGroup.add(water);

scene.add(stepwellGroup);

// 4. North & East Colonnaded Walls & Jharokha Balconies
const northWall = new THREE.Mesh(new THREE.BoxGeometry(38, 7.5, 1.2), sandstoneMat);
northWall.position.set(0, 3.75, -18);
northWall.castShadow = true;
northWall.receiveShadow = true;
northWall.name = 'NorthWall';
scene.add(northWall);

const eastWall = new THREE.Mesh(new THREE.BoxGeometry(1.2, 7.5, 38), sandstoneMat);
eastWall.position.set(18, 3.75, 0);
eastWall.castShadow = true;
eastWall.receiveShadow = true;
eastWall.name = 'EastWall';
scene.add(eastWall);

const westWall = new THREE.Mesh(new THREE.BoxGeometry(1.2, 7.5, 38), sandstoneMat);
westWall.position.set(-18, 3.75, 0);
westWall.castShadow = true;
westWall.receiveShadow = true;
westWall.name = 'WestWall';
scene.add(westWall);

// East Colonnade Perforated Jali Screen Gallery at (17.3, 2.5, 0)
const eastJaliGroup = new THREE.Group();
eastJaliGroup.name = 'EastJaliScreen';
eastJaliGroup.position.set(17.3, 2.5, 0);

// Outer Carved Stone Frame
const jaliFrame = new THREE.Mesh(new THREE.BoxGeometry(0.35, 3.8, 5.2), darkSandstoneMat);
jaliFrame.castShadow = true;
eastJaliGroup.add(jaliFrame);

// Inner Perforated Lattice Screen
const jaliPanel = new THREE.Mesh(new THREE.BoxGeometry(0.15, 3.2, 4.4), lightStoneMat);
eastJaliGroup.add(jaliPanel);

// Decorative Stone Balustrade / Sill
const jaliSill = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.4, 5.6), sandstoneMat);
jaliSill.position.y = -1.9;
eastJaliGroup.add(jaliSill);

scene.add(eastJaliGroup);

// Jharokha Balconies projecting from North Wall
const jharokhaGroup = new THREE.Group();
jharokhaGroup.name = 'OrnateJharokha';
jharokhaGroup.position.set(0, 4.2, -17.2);

const jharokhaBase = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.4, 1.8), darkSandstoneMat);
jharokhaGroup.add(jharokhaBase);

const jharokhaCanopy = new THREE.Mesh(new THREE.ConeGeometry(2.4, 1.4, 4), darkSandstoneMat);
jharokhaCanopy.rotation.y = Math.PI / 4;
jharokhaCanopy.position.y = 2.4;
jharokhaGroup.add(jharokhaCanopy);

const jaliScreen = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.8, 0.1), lightStoneMat);
jaliScreen.position.set(0, 1.1, 0.8);
jharokhaGroup.add(jaliScreen);

scene.add(jharokhaGroup);

// 5. Ceremonial Torana Gateway at South Threshold (0, 0, 16)
const toranaGroup = new THREE.Group();
toranaGroup.name = 'ToranaGateway';
toranaGroup.position.set(0, 0, 16);

// Left & Right Columns
const colLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 6.2, 12), lightStoneMat);
colLeft.position.set(-3.5, 3.1, 0);
colLeft.castShadow = true;
toranaGroup.add(colLeft);

const colRight = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.48, 6.2, 12), lightStoneMat);
colRight.position.set(3.5, 3.1, 0);
colRight.castShadow = true;
toranaGroup.add(colRight);

// Cusped Arch Beams
const beam1 = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.45, 0.6), darkSandstoneMat);
beam1.position.y = 5.8;
toranaGroup.add(beam1);

const beam2 = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.4, 0.5), goldAccentMat);
beam2.position.y = 6.6;
toranaGroup.add(beam2);

// Center Ornamental Medallion
const medallion = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.2, 16), goldAccentMat);
medallion.rotation.x = Math.PI / 2;
medallion.position.y = 7.3;
toranaGroup.add(medallion);

scene.add(toranaGroup);

// 6. Courtyard Brass Oil Lamps / Lanterns
const lampPositions = [
  [-3.2, 0.6, -3.2],
  [3.2, 0.6, -3.2],
  [-3.2, 0.6, 3.2],
  [3.2, 0.6, 3.2],
];
lampPositions.forEach(([lx, ly, lz], idx) => {
  const lamp = new THREE.Group();
  lamp.position.set(lx, ly, lz);
  lamp.name = `BrassDiya_${idx + 1}`;

  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.22, 1.1, 8), brassLampMat);
  stand.position.y = 0.55;
  lamp.add(stand);

  const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.1, 0.18, 12), goldAccentMat);
  bowl.position.y = 1.15;
  lamp.add(bowl);

  scene.add(lamp);
});

// Export to Binary GLB
const exporter = new GLTFExporter();
exporter.parse(
  scene,
  (gltf) => {
    const outputDir = path.resolve('public/models/heritage-courtyard');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, 'scene.glb');
    fs.writeFileSync(outputPath, Buffer.from(gltf));
    const stats = fs.statSync(outputPath);
    console.log(`Successfully exported binary GLB to ${outputPath}`);
    console.log(`Model file size: ${(stats.size / 1024).toFixed(2)} KB`);
  },
  (error) => {
    console.error('An error occurred while exporting the GLTF:', error);
    process.exit(1);
  },
  { binary: true }
);
