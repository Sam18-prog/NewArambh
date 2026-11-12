import fs from 'fs';
import path from 'path';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

// Polyfills for Node environment required by GLTFExporter
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
scene.name = 'TajMahalMonumentComplex';

// ==========================================
// PBR MATERIALS FOR THE TAJ MAHAL
// ==========================================

// 1. Polished Makrana White Marble (for main tomb, dome, minarets, plinth)
const whiteMarbleMat = new THREE.MeshStandardMaterial({
  color: 0xfafafa,
  roughness: 0.28,
  metalness: 0.04,
  name: 'MakranaWhiteMarblePBR',
});

// 2. Off-White Accent Marble (cornices, mouldings, railings)
const accentMarbleMat = new THREE.MeshStandardMaterial({
  color: 0xededed,
  roughness: 0.35,
  metalness: 0.02,
  name: 'AccentMarblePBR',
});

// 3. Red Sandstone (for terrace platform, pathways, Great Gate)
const redSandstoneMat = new THREE.MeshStandardMaterial({
  color: 0x8f3c2c,
  roughness: 0.85,
  metalness: 0.02,
  name: 'AgraRedSandstonePBR',
});

// 4. Dark Red Sandstone (accents, base moldings)
const darkSandstoneMat = new THREE.MeshStandardMaterial({
  color: 0x6e2c1e,
  roughness: 0.9,
  metalness: 0.02,
  name: 'DarkRedSandstonePBR',
});

// 5. Pietra Dura Inlay & Shadow Dark Stone (arched recesses, geometric borders)
const pietraDuraDarkMat = new THREE.MeshStandardMaterial({
  color: 0x1e2229,
  roughness: 0.45,
  metalness: 0.1,
  name: 'PietraDuraInlayPBR',
});

// 6. Gilded Brass / Gold Finials (crescent, kalash spires)
const goldFinialMat = new THREE.MeshStandardMaterial({
  color: 0xf59e0b,
  roughness: 0.22,
  metalness: 0.85,
  name: 'GildedBronzeKalashPBR',
});

// 7. Reflecting Pool Water (Al-Hawd al-Kawthar)
const poolWaterMat = new THREE.MeshStandardMaterial({
  color: 0x0284c7,
  roughness: 0.08,
  metalness: 0.35,
  transparent: true,
  opacity: 0.85,
  name: 'ReflectingWaterPBR',
});

// 8. Garden Lawns (Charbagh Quadrants)
const lawnMat = new THREE.MeshStandardMaterial({
  color: 0x225e36,
  roughness: 0.95,
  metalness: 0.0,
  name: 'CharbaghLawnPBR',
});

// 9. Cypress Tree Foliage
const cypressMat = new THREE.MeshStandardMaterial({
  color: 0x163821,
  roughness: 0.9,
  metalness: 0.0,
  name: 'CypressFoliagePBR',
});

// 10. Cypress Tree Trunk
const trunkMat = new THREE.MeshStandardMaterial({
  color: 0x3d271d,
  roughness: 0.9,
  metalness: 0.0,
  name: 'TreeTrunkPBR',
});

// ==========================================
// 1. COMPLEX GROUNDS & EXPANDED SITE LAYOUT
// ==========================================

// Base site foundation
const siteGroundGeo = new THREE.BoxGeometry(110, 0.4, 150);
const siteGround = new THREE.Mesh(siteGroundGeo, redSandstoneMat);
siteGround.position.set(0, -0.2, 10);
siteGround.receiveShadow = true;
siteGround.name = 'SiteGround';
scene.add(siteGround);

// Perimeter Enclosure Walls (East, West, South boundary)
const westWall = new THREE.Mesh(new THREE.BoxGeometry(1.6, 6.0, 150), redSandstoneMat);
westWall.position.set(-52, 3.0, 10);
westWall.castShadow = true;
westWall.receiveShadow = true;
scene.add(westWall);

const eastWall = new THREE.Mesh(new THREE.BoxGeometry(1.6, 6.0, 150), redSandstoneMat);
eastWall.position.set(52, 3.0, 10);
eastWall.castShadow = true;
eastWall.receiveShadow = true;
scene.add(eastWall);

const northYamunaWall = new THREE.Mesh(new THREE.BoxGeometry(105, 4.0, 2.0), darkSandstoneMat);
northYamunaWall.position.set(0, 2.0, -62);
scene.add(northYamunaWall);

// ==========================================
// 2. SOUTHERN GREAT GATE (Darwaza-i-rauza) at Z = 68
// ==========================================
const greatGate = new THREE.Group();
greatGate.position.set(0, 0, 68);
greatGate.name = 'Darwaza_i_Rauza';

// Main gateway block
const gateBody = new THREE.Mesh(new THREE.BoxGeometry(32, 15, 8), redSandstoneMat);
gateBody.position.y = 7.5;
gateBody.castShadow = true;
gateBody.receiveShadow = true;
greatGate.add(gateBody);

// Central portal arch recess (opening facing North towards Taj Mahal)
const gateIwan = new THREE.Mesh(new THREE.BoxGeometry(11, 10.5, 3.5), pietraDuraDarkMat);
gateIwan.position.set(0, 5.25, -2.4);
greatGate.add(gateIwan);

// Marble framing bands around the portal arch
const gateFrame = new THREE.Mesh(new THREE.BoxGeometry(12.6, 12, 0.4), whiteMarbleMat);
gateFrame.position.set(0, 6.0, -3.9);
greatGate.add(gateFrame);

// Inner walkway tunnel through the gate
const gateTunnel = new THREE.Mesh(new THREE.BoxGeometry(5.0, 4.5, 8.4), pietraDuraDarkMat);
gateTunnel.position.set(0, 2.25, 0);
greatGate.add(gateTunnel);

// Gate Corner octagonal towers with chhatris
[-16, 16].forEach((gx) => {
  const tower = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 16.5, 8), redSandstoneMat);
  tower.position.set(gx, 8.25, 0);
  tower.castShadow = true;
  greatGate.add(tower);

  // Tower chhatri cupola
  const chhatriDome = new THREE.Mesh(new THREE.SphereGeometry(1.5, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), whiteMarbleMat);
  chhatriDome.position.set(gx, 16.5, 0);
  greatGate.add(chhatriDome);
});

// 11 decorative chhatris / guldastas along the top parapet
for (let i = 0; i < 11; i++) {
  const gx = -12.5 + i * 2.5;
  const miniDome = new THREE.Mesh(new THREE.SphereGeometry(0.55, 8, 8, 0, Math.PI * 2, 0, Math.PI * 0.5), whiteMarbleMat);
  miniDome.position.set(gx, 15.2, 0);
  greatGate.add(miniDome);
}

scene.add(greatGate);

// ==========================================
// 3. CHARBAGH FOUR-PART GARDEN & REFLECTING POOL
// ==========================================
const gardenGroup = new THREE.Group();
gardenGroup.name = 'CharbaghGardens';

// Four Sunken Lawn Quadrants
const lawnCoords = [
  { x: -24, z: 23, w: 32, l: 30 }, // South-West
  { x: 24, z: 23, w: 32, l: 30 },  // South-East
  { x: -24, z: 53, w: 32, l: 24 }, // North-West
  { x: 24, z: 53, w: 32, l: 24 },  // North-East
];

lawnCoords.forEach((c, idx) => {
  const lawn = new THREE.Mesh(new THREE.BoxGeometry(c.w, 0.15, c.l), lawnMat);
  lawn.position.set(c.x, 0.08, c.z);
  lawn.receiveShadow = true;
  lawn.name = `GardenLawn_${idx + 1}`;
  gardenGroup.add(lawn);

  // Inner decorative ornamental stone walkways around each lawn
  const walkway = new THREE.Mesh(new THREE.BoxGeometry(c.w + 1.2, 0.12, c.l + 1.2), redSandstoneMat);
  walkway.position.set(c.x, 0.06, c.z);
  walkway.receiveShadow = true;
  gardenGroup.add(walkway);
});

// Central Axis Long Reflecting Pool (Al-Hawd al-Kawthar canal)
// Extends from Z = 10 to Z = 60 (Length 50m, Width 6.6m)
const poolGroup = new THREE.Group();
poolGroup.name = 'ReflectingPool_AlHawdAlKawthar';

// Sandstone Raised Curb
const poolCurb = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.4, 50), redSandstoneMat);
poolCurb.position.set(0, 0.2, 36);
poolCurb.receiveShadow = true;
poolGroup.add(poolCurb);

// White Marble Inner Coping / Rim
const poolRim = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.45, 49), whiteMarbleMat);
poolRim.position.set(0, 0.22, 36);
poolGroup.add(poolRim);

// Water Basin
const poolWater = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 48), poolWaterMat);
poolWater.rotation.x = -Math.PI / 2;
poolWater.position.set(0, 0.35, 36);
poolWater.name = 'ReflectingPoolWater';
poolGroup.add(poolWater);

// Center Raised Lotus Tank (Hawd al-Kawthar) at (0, 0.5, 36)
const lotusTank = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.6, 10.5), whiteMarbleMat);
lotusTank.position.set(0, 0.3, 36);
lotusTank.castShadow = true;
lotusTank.receiveShadow = true;
poolGroup.add(lotusTank);

const lotusWater = new THREE.Mesh(new THREE.PlaneGeometry(8.8, 8.8), poolWaterMat);
lotusWater.rotation.x = -Math.PI / 2;
lotusWater.position.set(0, 0.61, 36);
poolGroup.add(lotusWater);

// Central Lotus Fountain Spout Base
const fountainBase = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.2, 0.6, 12), whiteMarbleMat);
fountainBase.position.set(0, 0.8, 36);
poolGroup.add(fountainBase);

const fountainJet = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 8), goldFinialMat);
fountainJet.position.set(0, 1.25, 36);
poolGroup.add(fountainJet);

gardenGroup.add(poolGroup);

// Symmetrical Colonnade of Cypress Trees flanking the Reflecting Canal
const cypressZPositions = [14, 21, 28, 44, 51, 58];
cypressZPositions.forEach((cz) => {
  [-5.2, 5.2].forEach((cx) => {
    const tree = new THREE.Group();
    tree.position.set(cx, 0, cz);

    // Trunk
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.2, 8), trunkMat);
    trunk.position.y = 0.6;
    tree.add(trunk);

    // Slender Cypress Foliage Cone (distinctive Mediterranean/Mughal cypress form)
    const foliage = new THREE.Mesh(new THREE.ConeGeometry(0.75, 4.5, 8), cypressMat);
    foliage.position.y = 3.4;
    foliage.castShadow = true;
    tree.add(foliage);

    const foliageTop = new THREE.Mesh(new THREE.ConeGeometry(0.5, 2.4, 8), cypressMat);
    foliageTop.position.y = 4.8;
    tree.add(foliageTop);

    gardenGroup.add(tree);
  });
});

scene.add(gardenGroup);

// ==========================================
// 4. THE MONUMENTAL ELEVATED PLATFORMS
// ==========================================

// Lower Red Sandstone Terrace (Chameli Farsh)
// Extends from Z = 8 to Z = -58, Width 94m, Height 1.2m
const sandstoneTerrace = new THREE.Mesh(new THREE.BoxGeometry(94, 1.2, 66), redSandstoneMat);
sandstoneTerrace.position.set(0, 0.6, -25);
sandstoneTerrace.receiveShadow = true;
sandstoneTerrace.name = 'SandstoneTerrace_ChameliFarsh';
scene.add(sandstoneTerrace);

// Upper High White Makrana Marble Plinth (Marmar Farsh)
// Symmetrical square 56m x 56m, Height 2.2m (elevation y = 1.2 to y = 3.4)
const marblePlinthGroup = new THREE.Group();
marblePlinthGroup.position.set(0, 1.2, -25);
marblePlinthGroup.name = 'MarblePlinth_MarmarFarsh';

const marblePlinth = new THREE.Mesh(new THREE.BoxGeometry(56, 2.2, 56), whiteMarbleMat);
marblePlinth.position.y = 1.1;
marblePlinth.receiveShadow = true;
marblePlinth.castShadow = true;
marblePlinthGroup.add(marblePlinth);

// Moulded Cornice edge around marble plinth
const plinthCornice = new THREE.Mesh(new THREE.BoxGeometry(57.2, 0.35, 57.2), accentMarbleMat);
plinthCornice.position.y = 2.15;
marblePlinthGroup.add(plinthCornice);

// South Entrance Central Marble Stairway (Access to plinth from garden)
const plinthStairs = new THREE.Mesh(new THREE.BoxGeometry(8.0, 1.1, 4.2), whiteMarbleMat);
plinthStairs.position.set(0, 0.55, 28.1);
plinthStairs.receiveShadow = true;
marblePlinthGroup.add(plinthStairs);

const plinthStairUpper = new THREE.Mesh(new THREE.BoxGeometry(6.6, 1.1, 2.2), whiteMarbleMat);
plinthStairUpper.position.set(0, 1.65, 27.1);
marblePlinthGroup.add(plinthStairUpper);

scene.add(marblePlinthGroup);

// ==========================================
// 5. FOUR MONUMENTAL THREE-TIER MINARETS
// ==========================================
// Positioned at the 4 corners of the 56m x 56m marble plinth (X = ±25, Z = -25 ± 25)
const minaretGroup = new THREE.Group();
minaretGroup.name = 'FourMinarets';

const minaretCorners = [
  { x: -24.5, z: -49.5, name: 'Minaret_NorthWest' },
  { x: 24.5, z: -49.5, name: 'Minaret_NorthEast' },
  { x: -24.5, z: -0.5, name: 'Minaret_SouthWest' },
  { x: 24.5, z: -0.5, name: 'Minaret_SouthEast' },
];

minaretCorners.forEach((pos) => {
  const minaret = new THREE.Group();
  minaret.position.set(pos.x, 3.4, pos.z);
  minaret.name = pos.name;

  // Intentional outward seismic tilt (Mughal engineering marvel: leans ~0.7 degrees away from tomb)
  const tiltAngleX = pos.z < -25 ? -0.012 : 0.012;
  const tiltAngleZ = pos.x < 0 ? -0.012 : 0.012;
  minaret.rotation.set(tiltAngleX, 0, tiltAngleZ);

  // 1. Octagonal Base Plinth
  const baseGeo = new THREE.CylinderGeometry(2.3, 2.6, 2.4, 8);
  const baseMesh = new THREE.Mesh(baseGeo, whiteMarbleMat);
  baseMesh.position.y = 1.2;
  baseMesh.castShadow = true;
  minaret.add(baseMesh);

  // 2. Tier 1 Shaft (Height 9.5m)
  const tier1 = new THREE.Mesh(new THREE.CylinderGeometry(1.65, 1.85, 9.5, 16), whiteMarbleMat);
  tier1.position.y = 7.15;
  tier1.castShadow = true;
  minaret.add(tier1);

  // Balcony 1 with bracketed corbels
  const balcony1 = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 1.65, 0.6, 16), accentMarbleMat);
  balcony1.position.y = 12.0;
  balcony1.castShadow = true;
  minaret.add(balcony1);

  // Balcony 1 Jali Railing
  const railing1 = new THREE.Mesh(new THREE.CylinderGeometry(2.25, 2.25, 0.45, 16, 1, true), whiteMarbleMat);
  railing1.position.y = 12.45;
  minaret.add(railing1);

  // 3. Tier 2 Shaft (Height 8.5m)
  const tier2 = new THREE.Mesh(new THREE.CylinderGeometry(1.48, 1.62, 8.5, 16), whiteMarbleMat);
  tier2.position.y = 16.7;
  tier2.castShadow = true;
  minaret.add(tier2);

  // Balcony 2
  const balcony2 = new THREE.Mesh(new THREE.CylinderGeometry(1.95, 1.48, 0.55, 16), accentMarbleMat);
  balcony2.position.y = 21.1;
  minaret.add(balcony2);

  // 4. Tier 3 Shaft (Height 7.5m)
  const tier3 = new THREE.Mesh(new THREE.CylinderGeometry(1.32, 1.45, 7.5, 16), whiteMarbleMat);
  tier3.position.y = 25.0;
  tier3.castShadow = true;
  minaret.add(tier3);

  // Upper Gallery Balcony
  const balcony3 = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.32, 0.5, 16), accentMarbleMat);
  balcony3.position.y = 28.95;
  minaret.add(balcony3);

  // 5. Crown: Octagonal Pillared Chhatri Cupola
  const chhatriPillars = 8;
  for (let p = 0; p < chhatriPillars; p++) {
    const angle = (p * Math.PI * 2) / chhatriPillars;
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 2.2, 8), whiteMarbleMat);
    col.position.set(Math.cos(angle) * 1.3, 30.2, Math.sin(angle) * 1.3);
    minaret.add(col);
  }

  // Chhatri Fluted Dome
  const cupola = new THREE.Mesh(new THREE.SphereGeometry(1.5, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.55), whiteMarbleMat);
  cupola.position.y = 31.3;
  cupola.castShadow = true;
  minaret.add(cupola);

  // Gilded Bronze Kalash Finial
  const finial = new THREE.Mesh(new THREE.ConeGeometry(0.25, 1.8, 8), goldFinialMat);
  finial.position.y = 33.2;
  minaret.add(finial);

  minaretGroup.add(minaret);
});

scene.add(minaretGroup);

// ==========================================
// 6. MAIN MAUSOLEUM (Rauza-i-Munawwara) at (0, 3.4, -25)
// ==========================================
const mausoleumGroup = new THREE.Group();
mausoleumGroup.position.set(0, 3.4, -25);
mausoleumGroup.name = 'MainMausoleum_RauzaIMunawwara';

// Chamfered Cubical Main Chamber: 26m width, 26m depth, 15m height
// Base central body
const mainBody = new THREE.Mesh(new THREE.BoxGeometry(23.4, 15, 23.4), whiteMarbleMat);
mainBody.position.y = 7.5;
mainBody.castShadow = true;
mainBody.receiveShadow = true;
mausoleumGroup.add(mainBody);

// Chamfered Corner Blocks (Rotated 45 degrees to complete the Baghdadi Octagon plan)
const cornerOffsets = [
  [-11.2, -11.2],
  [11.2, -11.2],
  [-11.2, 11.2],
  [11.2, 11.2],
];

cornerOffsets.forEach(([cx, cz]) => {
  const cornerBlock = new THREE.Mesh(new THREE.BoxGeometry(5.2, 15, 5.2), whiteMarbleMat);
  cornerBlock.rotation.y = Math.PI / 4;
  cornerBlock.position.set(cx, 7.5, cz);
  cornerBlock.castShadow = true;
  cornerBlock.receiveShadow = true;
  mausoleumGroup.add(cornerBlock);

  // Recessed two-tier alcoves on chamfered corners (lower & upper arched niches)
  const nicheLower = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.2, 0.6), pietraDuraDarkMat);
  nicheLower.rotation.y = Math.PI / 4;
  nicheLower.position.set(cx * 1.05, 3.8, cz * 1.05);
  mausoleumGroup.add(nicheLower);

  const nicheUpper = new THREE.Mesh(new THREE.BoxGeometry(2.4, 4.2, 0.6), pietraDuraDarkMat);
  nicheUpper.rotation.y = Math.PI / 4;
  nicheUpper.position.set(cx * 1.05, 10.2, cz * 1.05);
  mausoleumGroup.add(nicheUpper);
});

// ==========================================
// 7. FOUR GRAND PISHTAQ IWANS (Vaulted Arches)
// ==========================================
// Cardinal directions: South (front), North (Yamuna side), East, West
const pishtaqFaces = [
  { rotY: 0, zOff: 11.8, xOff: 0, name: 'Pishtaq_South_Entrance' },
  { rotY: Math.PI, zOff: -11.8, xOff: 0, name: 'Pishtaq_North_Yamuna' },
  { rotY: Math.PI / 2, zOff: 0, xOff: 11.8, name: 'Pishtaq_East' },
  { rotY: -Math.PI / 2, zOff: 0, xOff: -11.8, name: 'Pishtaq_West' },
];

pishtaqFaces.forEach((face) => {
  const pishtaq = new THREE.Group();
  pishtaq.position.set(face.xOff, 0, face.zOff);
  pishtaq.rotation.y = face.rotY;
  pishtaq.name = face.name;

  // Projecting Monumental Outer Frame
  const frameWidth = 14.8;
  const frameHeight = 17.2;
  const frameMesh = new THREE.Mesh(new THREE.BoxGeometry(frameWidth, frameHeight, 0.8), whiteMarbleMat);
  frameMesh.position.y = frameHeight / 2;
  frameMesh.castShadow = true;
  pishtaq.add(frameMesh);

  // Pietra Dura Quranic Calligraphy Border Trim
  const borderTrim = new THREE.Mesh(new THREE.BoxGeometry(13.2, 15.6, 0.9), pietraDuraDarkMat);
  borderTrim.position.y = frameHeight / 2 - 0.4;
  pishtaq.add(borderTrim);

  // Recessed Arched Iwan Vault
  const vaultWidth = 9.8;
  const vaultHeight = 13.5;
  const vaultRecess = new THREE.Mesh(new THREE.BoxGeometry(vaultWidth, vaultHeight, 3.2), pietraDuraDarkMat);
  vaultRecess.position.set(0, vaultHeight / 2, -1.2);
  pishtaq.add(vaultRecess);

  // Inner Vault Pointed Arch Top Mockup
  const archTop = new THREE.Mesh(new THREE.CylinderGeometry(vaultWidth / 2, vaultWidth / 2, 3.2, 16, 1, false, 0, Math.PI), whiteMarbleMat);
  archTop.rotation.z = Math.PI / 2;
  archTop.position.set(0, vaultHeight - 1.2, -1.2);
  pishtaq.add(archTop);

  // Inner Marble Door Lattice & Threshold
  const doorway = new THREE.Mesh(new THREE.BoxGeometry(3.6, 5.5, 0.4), pietraDuraDarkMat);
  doorway.position.set(0, 2.75, -2.6);
  pishtaq.add(doorway);

  // Intricate marble screen framing around the inner door
  const doorTrim = new THREE.Mesh(new THREE.BoxGeometry(4.4, 6.2, 0.2), whiteMarbleMat);
  doorTrim.position.set(0, 3.1, -2.4);
  pishtaq.add(doorTrim);

  mausoleumGroup.add(pishtaq);
});

// ==========================================
// 8. ROOF TERRACE, CORNICE & PARAPET
// ==========================================
const roofCornice = new THREE.Mesh(new THREE.BoxGeometry(26.8, 0.6, 26.8), accentMarbleMat);
roofCornice.position.y = 15.3;
mausoleumGroup.add(roofCornice);

// Decorative Crenellated Marble Parapet (Balustrade)
const roofParapet = new THREE.Mesh(new THREE.BoxGeometry(26.2, 0.75, 26.2), whiteMarbleMat);
roofParapet.position.y = 15.8;
mausoleumGroup.add(roofParapet);

// ==========================================
// 9. CENTRAL HIGH BULBOUS ONION DOME (Amrud)
// ==========================================
const domeGroup = new THREE.Group();
domeGroup.position.set(0, 15.6, 0);
domeGroup.name = 'CentralBulbousDome';

// 1. High Cylindrical Drum (Tambour)
const drumHeight = 5.2;
const drumRadius = 6.4;
const drum = new THREE.Mesh(new THREE.CylinderGeometry(drumRadius, drumRadius, drumHeight, 32), whiteMarbleMat);
drum.position.y = drumHeight / 2;
drum.castShadow = true;
domeGroup.add(drum);

// Inlaid Band around Drum
const drumBand = new THREE.Mesh(new THREE.CylinderGeometry(drumRadius + 0.1, drumRadius + 0.1, 0.6, 32), pietraDuraDarkMat);
drumBand.position.y = 2.6;
domeGroup.add(drumBand);

// Decorative Molded Lotus Petal Base ring
const petalBase = new THREE.Mesh(new THREE.CylinderGeometry(6.8, 6.2, 0.8, 32), accentMarbleMat);
petalBase.position.y = drumHeight + 0.4;
domeGroup.add(petalBase);

// 2. Bulbous Double-Shell Onion Dome (Amrud Profile)
// Lower bulbous swelling
const bulbSwelling = new THREE.Mesh(
  new THREE.SphereGeometry(7.2, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.52),
  whiteMarbleMat
);
bulbSwelling.position.y = drumHeight + 2.8;
bulbSwelling.scale.set(1.0, 1.25, 1.0); // Slight vertical elongation
bulbSwelling.castShadow = true;
bulbSwelling.receiveShadow = true;
domeGroup.add(bulbSwelling);

// Upper Pointed Cap & Lotus Cresting (Kalas)
const domePeak = new THREE.Mesh(new THREE.ConeGeometry(3.6, 4.2, 32), whiteMarbleMat);
domePeak.position.y = drumHeight + 11.2;
domePeak.castShadow = true;
domeGroup.add(domePeak);

// 3. Crowning Gilded Bronze Finial (Mughal Kalash with Crescent Moon)
// Height ~4.2m
const finialStem = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.35, 3.2, 16), goldFinialMat);
finialStem.position.y = drumHeight + 14.6;
domeGroup.add(finialStem);

const finialOrb1 = new THREE.Mesh(new THREE.SphereGeometry(0.7, 16, 12), goldFinialMat);
finialOrb1.position.y = drumHeight + 13.8;
domeGroup.add(finialOrb1);

const finialOrb2 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 12), goldFinialMat);
finialOrb2.position.y = drumHeight + 15.2;
domeGroup.add(finialOrb2);

// Crescent Moon Horns on top of finial
const crescent = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.12, 8, 24, Math.PI * 1.3), goldFinialMat);
crescent.rotation.x = Math.PI / 2;
crescent.position.y = drumHeight + 16.4;
domeGroup.add(crescent);

mausoleumGroup.add(domeGroup);

// ==========================================
// 10. FOUR CORNER ROOF CHHATRIS (Kiosks)
// ==========================================
// Surrounding the central onion dome atop the roof terrace
const chhatriOffsets = [
  [-8.2, -8.2],
  [8.2, -8.2],
  [-8.2, 8.2],
  [8.2, 8.2],
];

chhatriOffsets.forEach(([cx, cz], idx) => {
  const roofChhatri = new THREE.Group();
  roofChhatri.position.set(cx, 15.6, cz);
  roofChhatri.name = `RoofChhatri_${idx + 1}`;

  // Octagonal Base Plinth
  const chhatriPlinth = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.5, 0.6, 8), accentMarbleMat);
  chhatriPlinth.position.y = 0.3;
  roofChhatri.add(chhatriPlinth);

  // 8 Slender Carved Columns
  for (let c = 0; c < 8; c++) {
    const angle = (c * Math.PI * 2) / 8;
    const colX = Math.cos(angle) * 1.8;
    const colZ = Math.sin(angle) * 1.8;

    const column = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 3.2, 8), whiteMarbleMat);
    column.position.set(colX, 2.0, colZ);
    column.castShadow = true;
    roofChhatri.add(column);
  }

  // Chhatri Eaves & Cornice (Chhajja)
  const chhajja = new THREE.Mesh(new THREE.CylinderGeometry(2.7, 2.0, 0.3, 8), accentMarbleMat);
  chhajja.position.y = 3.65;
  roofChhatri.add(chhajja);

  // Chhatri Domed Cupola
  const dome = new THREE.Mesh(new THREE.SphereGeometry(2.1, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.52), whiteMarbleMat);
  dome.position.y = 3.8;
  dome.castShadow = true;
  roofChhatri.add(dome);

  // Golden Brass Finial
  const chhatriFinial = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.4, 8), goldFinialMat);
  chhatriFinial.position.y = 5.8;
  roofChhatri.add(chhatriFinial);

  mausoleumGroup.add(roofChhatri);
});

scene.add(mausoleumGroup);

// ==========================================
// EXPORT TO BINARY GLB
// ==========================================
const exporter = new GLTFExporter();
exporter.parse(
  scene,
  (gltf) => {
    const outputDir = path.resolve('public/models/taj-mahal');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, 'scene.glb');
    fs.writeFileSync(outputPath, Buffer.from(gltf));
    const stats = fs.statSync(outputPath);
    console.log(`Successfully exported binary Taj Mahal GLB to ${outputPath}`);
    console.log(`Model file size: ${(stats.size / 1024).toFixed(2)} KB`);
  },
  (error) => {
    console.error('An error occurred while exporting the GLTF:', error);
    process.exit(1);
  },
  { binary: true }
);
