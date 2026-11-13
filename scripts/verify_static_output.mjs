import fs from 'fs';
import path from 'path';

const DESTINATIONS = [
  { id: 'taj-mahal', expectedShort: 'Taj Mahal', type: 'unesco' },
  { id: 'red-fort', expectedShort: 'Red Fort', type: 'unesco' },
  { id: 'rani-ki-vav', expectedShort: 'Rani-ki-Vav', type: 'unesco' },
  { id: 'dholavira', expectedShort: 'Dholavira', type: 'unesco' },
  { id: 'somnath', expectedShort: 'Somnath Mandir', type: 'cultural' },
  { id: 'dwarkadhish', expectedShort: 'Dwarka Mandir', type: 'cultural' },
  { id: 'agra-fort', expectedShort: 'Agra Fort', type: 'unesco' },
  { id: 'champaner-pavagadh', expectedShort: 'Champaner-Pavagadh', type: 'unesco' },
  { id: 'sarnath', expectedShort: 'Sarnath', type: 'unesco' },
];

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`✓ ${message}`);
    passCount++;
  } else {
    console.error(`✗ FAIL: ${message}`);
    failCount++;
  }
}

console.log('=== VERIFYING GENERATED STATIC OUTPUT ===\n');

// 1. Verify Explore Catalog Page
const exploreHtmlPath = path.resolve('.next/server/app/explore.html');
assert(fs.existsSync(exploreHtmlPath), 'explore.html exists in build output');
const exploreHtml = fs.readFileSync(exploreHtmlPath, 'utf8');

assert(exploreHtml.includes('Walk Through History, From Anywhere'), 'explore.html contains official tagline');
assert(exploreHtml.includes('Discover India<!-- -->&#x27;<!-- -->s cultural heritage') || exploreHtml.includes('Discover India'), 'explore.html contains official description');

for (const dest of DESTINATIONS) {
  assert(exploreHtml.includes(dest.expectedShort), `explore.html renders card for ${dest.expectedShort}`);
}

assert(exploreHtml.includes('Cultural'), 'explore.html renders Cultural badges for non-UNESCO monuments');

// 2. Verify Destination Landing Pages & Options (Image 1)
for (const dest of DESTINATIONS) {
  const landingPath = path.resolve(`.next/server/app/explore/${dest.id}.html`);
  assert(fs.existsSync(landingPath), `Destination landing page exists: ${dest.id}.html`);
  const landingHtml = fs.readFileSync(landingPath, 'utf8');
  assert(landingHtml.includes('Explore 3D Walkthrough'), `${dest.id} has "Explore 3D Walkthrough" option`);
  assert(landingHtml.includes('Drone View'), `${dest.id} has "Drone View" aerial option`);
  assert(landingHtml.includes('Guided Tour'), `${dest.id} has "Guided Tour" option`);
  assert(landingHtml.includes('2D Site Map'), `${dest.id} has "2D Site Map" option`);
}

// 3. Verify Dedicated 3D Walkthrough Pages (Image 2)
for (const dest of DESTINATIONS) {
  const threeDPath = path.resolve(`.next/server/app/explore/${dest.id}/3d.html`);
  assert(fs.existsSync(threeDPath), `Dedicated 3D Walkthrough page exists: ${dest.id}/3d.html`);
}

// 4. Verify Dedicated 2D Site Map Pages
for (const dest of DESTINATIONS) {
  const mapPath = path.resolve(`.next/server/app/explore/${dest.id}/map.html`);
  assert(fs.existsSync(mapPath), `Dedicated 2D Site Map page exists: ${dest.id}/map.html`);
}

// 5. Verify Cultural vs UNESCO integrity
const somnathLanding = fs.readFileSync(path.resolve('.next/server/app/explore/somnath.html'), 'utf8');
assert(!somnathLanding.includes('UNESCO World Heritage Site'), 'Somnath Mandir is NEVER labeled as UNESCO World Heritage Site');
assert(somnathLanding.includes('Culturally Significant Monument'), 'Somnath Mandir is properly labeled Culturally Significant');

const dwarkaLanding = fs.readFileSync(path.resolve('.next/server/app/explore/dwarkadhish.html'), 'utf8');
assert(!dwarkaLanding.includes('UNESCO World Heritage Site'), 'Dwarka Mandir is NEVER labeled as UNESCO World Heritage Site');
assert(dwarkaLanding.includes('Culturally Significant Monument'), 'Dwarka Mandir is properly labeled Culturally Significant');

// 6. Verify Licenses & Attribution Register
const licensesHtmlPath = path.resolve('.next/server/app/licenses.html');
assert(fs.existsSync(licensesHtmlPath), 'licenses.html exists');
const licensesHtml = fs.readFileSync(licensesHtmlPath, 'utf8');
assert(licensesHtml.includes('Asset Register &amp; Licensing Attribution') || licensesHtml.includes('Licensing Attribution'), 'licenses.html contains Licensing Attribution heading');
assert(licensesHtml.includes('Creative Commons') || licensesHtml.includes('CC BY') || licensesHtml.includes('Public Domain'), 'licenses.html contains open source license information');

// 7. Verify Drone View Configurations for all 9 destinations
const droneConfigFile = fs.readFileSync(path.resolve('src/data/scene-configs/droneConfigs.ts'), 'utf8');
for (const dest of DESTINATIONS) {
  assert(droneConfigFile.includes(`'${dest.id}'`), `Drone configuration defined for ${dest.id}`);
  assert(droneConfigFile.includes(`destinationId: '${dest.id}'`), `Destination ID properly mapped for ${dest.id} drone config`);
}
assert(droneConfigFile.includes('aerialOverview'), 'Aerial overview presets defined in drone configuration');
assert(droneConfigFile.includes('birdsEye'), "Bird's eye top-down presets defined in drone configuration");

console.log(`\n========================================`);
console.log(`SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
