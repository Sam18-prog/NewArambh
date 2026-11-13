import fs from 'fs';
import path from 'path';
import { tajMahalDestination } from '../src/data/destinations/taj-mahal.ts';
import { redFortDestination } from '../src/data/destinations/red-fort.ts';
import { agraFortDestination } from '../src/data/destinations/agra-fort.ts';
import { raniKiVavDestination } from '../src/data/destinations/rani-ki-vav.ts';
import { dholaviraDestination } from '../src/data/destinations/dholavira.ts';
import { champanerPavagadhDestination } from '../src/data/destinations/champaner-pavagadh.ts';
import { sarnathDestination } from '../src/data/destinations/sarnath.ts';
import { somnathDestination } from '../src/data/destinations/somnath.ts';
import { dwarkadhishDestination } from '../src/data/destinations/dwarkadhish.ts';

const destinations = [
  tajMahalDestination,
  redFortDestination,
  agraFortDestination,
  raniKiVavDestination,
  dholaviraDestination,
  champanerPavagadhDestination,
  sarnathDestination,
  somnathDestination,
  dwarkadhishDestination,
];

const outputPath = path.resolve('src/data/destinations.json');
fs.writeFileSync(outputPath, JSON.stringify(destinations, null, 2), 'utf-8');
console.log(`Synced ${destinations.length} destinations to ${outputPath}`);
