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

console.log('=== VERIFYING PHASE 13 GENERATED STATIC OUTPUT ===\n');

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

// 2. Verify Destination Landing Pages & Phase 13 Features
for (const dest of DESTINATIONS) {
  const landingPath = path.resolve(`.next/server/app/explore/${dest.id}.html`);
  assert(fs.existsSync(landingPath), `Destination landing page exists: ${dest.id}.html`);
  const landingHtml = fs.readFileSync(landingPath, 'utf8');
  assert(landingHtml.includes('Explore 3D Walkthrough') || landingHtml.includes('3D Walkthrough'), `${dest.id} has 3D Walkthrough option`);
  assert(landingHtml.includes('Drone View'), `${dest.id} has "Drone View" aerial option`);
  assert(landingHtml.includes('Guided Tour'), `${dest.id} has "Guided Tour" option`);
  assert(landingHtml.includes('2D Site Map'), `${dest.id} has "2D Site Map" option`);
  assert(landingHtml.includes('Heritage Audio Guide'), `${dest.id} has Multilingual Audio Guide Player`);
  assert(landingHtml.includes('Heritage Photo Gallery'), `${dest.id} has Heritage Photo Gallery 2.0`);
  assert(landingHtml.includes('Historical Timeline'), `${dest.id} has Historical Timeline`);
  assert(landingHtml.includes('Knowledge Challenge'), `${dest.id} has Knowledge Challenge Quiz module`);
  assert(landingHtml.includes('Feature Availability Status'), `${dest.id} has Centralized Capability Status Matrix`);
}

// 3. Verify Dedicated 3D Walkthrough Pages
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
assert(!somnathLanding.includes('UNESCO World Heritage Site ('), 'Somnath Mandir is NEVER labeled as UNESCO World Heritage Site with year');
assert(somnathLanding.includes('Culturally Significant Monument'), 'Somnath Mandir is properly labeled Culturally Significant');

const dwarkaLanding = fs.readFileSync(path.resolve('.next/server/app/explore/dwarkadhish.html'), 'utf8');
assert(!dwarkaLanding.includes('UNESCO World Heritage Site ('), 'Dwarka Mandir is NEVER labeled as UNESCO World Heritage Site with year');
assert(dwarkaLanding.includes('Culturally Significant Monument'), 'Dwarka Mandir is properly labeled Culturally Significant');

// 6. Verify Phase 13 New Pages
// Architectural Glossary (/learn/glossary)
const glossaryPath = path.resolve('.next/server/app/learn/glossary.html');
assert(fs.existsSync(glossaryPath), 'learn/glossary.html exists in build output');
const glossaryHtml = fs.readFileSync(glossaryPath, 'utf8');
assert(glossaryHtml.includes('Heritage Architectural Glossary'), 'glossary contains Heritage Architectural Glossary title');
assert(glossaryHtml.includes('Chhatri'), 'glossary documents Chhatri');
assert(glossaryHtml.includes('Jali'), 'glossary documents Jali');
assert(glossaryHtml.includes('Shikhara'), 'glossary documents Shikhara');
assert(glossaryHtml.includes('Charbagh'), 'glossary documents Charbagh');
assert(glossaryHtml.includes('Stepwell'), 'glossary documents Stepwell');

// Knowledge Quizzes (/learn/quiz)
const quizPath = path.resolve('.next/server/app/learn/quiz.html');
assert(fs.existsSync(quizPath), 'learn/quiz.html exists in build output');
const quizHtml = fs.readFileSync(quizPath, 'utf8');
assert(quizHtml.includes('Heritage Quiz &amp; Knowledge Challenges') || quizHtml.includes('Heritage Quiz'), 'quiz page contains title');
assert(quizHtml.includes('Monument-Specific Quizzes'), 'quiz contains Mode 1: Monument-Specific Quizzes');
assert(quizHtml.includes('Landmark Identification'), 'quiz contains Mode 2: Landmark Identification');
assert(quizHtml.includes('Architectural Knowledge'), 'quiz contains Mode 3: Architectural Knowledge');
assert(quizHtml.includes('Grand Mixed Heritage Challenge'), 'quiz contains Mode 4: Mixed Heritage Challenge');

// Monument Comparison (/learn/compare)
const comparePath = path.resolve('.next/server/app/learn/compare.html');
assert(fs.existsSync(comparePath), 'learn/compare.html exists in build output');
const compareHtml = fs.readFileSync(comparePath, 'utf8');
assert(compareHtml.includes('Monument Comparison'), 'compare page contains title');
assert(compareHtml.includes('Architectural Tradition'), 'compare page breaks down architectural traditions');
assert(compareHtml.includes('Primary Materials'), 'compare page breaks down primary construction materials');

// Timelines Explorer (/learn/timelines)
const timelinesPath = path.resolve('.next/server/app/learn/timelines.html');
assert(fs.existsSync(timelinesPath), 'learn/timelines.html exists in build output');
const timelinesHtml = fs.readFileSync(timelinesPath, 'utf8');
assert(timelinesHtml.includes('Heritage Timelines &amp; Epochs') || timelinesHtml.includes('Heritage Timelines'), 'timelines page contains title');

// My Heritage Collection (/my-heritage)
const heritagePath = path.resolve('.next/server/app/my-heritage.html');
assert(fs.existsSync(heritagePath), 'my-heritage.html exists in build output');
const heritageHtml = fs.readFileSync(heritagePath, 'utf8');
assert(heritageHtml.includes('My Heritage Collection'), 'my-heritage page contains title');
assert(heritageHtml.includes('Saved Destinations'), 'my-heritage contains Saved Destinations tab');
assert(heritageHtml.includes('Favorite Landmarks'), 'my-heritage contains Favorite Landmarks tab');
assert(heritageHtml.includes('Guided Journeys'), 'my-heritage contains Guided Journeys tab');
assert(heritageHtml.includes('Quiz History'), 'my-heritage contains Quiz History tab');
assert(heritageHtml.includes('Local Privacy Guarantee'), 'my-heritage contains Local Privacy Guarantee notice');

// About Page (/about)
const aboutPath = path.resolve('.next/server/app/about.html');
assert(fs.existsSync(aboutPath), 'about.html exists in build output');
const aboutHtml = fs.readFileSync(aboutPath, 'utf8');
assert(aboutHtml.includes('Walk Through History, From Anywhere'), 'about.html contains official tagline');
assert(aboutHtml.includes('Curatorial Integrity'), 'about.html documents curatorial integrity');
assert(aboutHtml.includes('Zero Software Budget'), 'about.html documents zero software budget');

// Licenses & Attribution Register
const licensesHtmlPath = path.resolve('.next/server/app/licenses.html');
assert(fs.existsSync(licensesHtmlPath), 'licenses.html exists');
const licensesHtml = fs.readFileSync(licensesHtmlPath, 'utf8');
assert(licensesHtml.includes('Asset Register &amp; Licensing Attribution') || licensesHtml.includes('Licensing Attribution'), 'licenses.html contains Licensing Attribution heading');

// Drone View Configurations for all 9 destinations
const droneConfigFile = fs.readFileSync(path.resolve('src/data/scene-configs/droneConfigs.ts'), 'utf8');
for (const dest of DESTINATIONS) {
  assert(droneConfigFile.includes(`'${dest.id}'`), `Drone configuration defined for ${dest.id}`);
  assert(droneConfigFile.includes(`destinationId: '${dest.id}'`), `Destination ID properly mapped for ${dest.id} drone config`);
}

// Multilingual Audio Narrations for all 9 destinations
const audioConfigFile = fs.readFileSync(path.resolve('src/data/destinationAudioContent.ts'), 'utf8');
for (const dest of DESTINATIONS) {
  assert(audioConfigFile.includes(`'${dest.id}'`), `Audio narration defined for ${dest.id}`);
}
assert(audioConfigFile.includes('en: {'), 'English audio guides defined');
assert(audioConfigFile.includes('hi: {'), 'Hindi audio guides defined');
assert(audioConfigFile.includes('gu: {'), 'Gujarati audio guides defined');

console.log(`\n========================================`);
console.log(`SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log(`========================================\n`);

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
