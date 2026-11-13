import { spawn } from 'child_process';
import http from 'http';

const DESTINATIONS = [
  { id: 'taj-mahal', expectedShort: 'Taj Mahal', type: 'unesco' },
  { id: 'red-fort', expectedShort: 'Red Fort', type: 'unesco' },
  { id: 'agra-fort', expectedShort: 'Agra Fort', type: 'unesco' },
  { id: 'rani-ki-vav', expectedShort: 'Rani-ki-Vav', type: 'unesco' },
  { id: 'dholavira', expectedShort: 'Dholavira', type: 'unesco' },
  { id: 'champaner-pavagadh', expectedShort: 'Champaner-Pavagadh', type: 'unesco' },
  { id: 'sarnath', expectedShort: 'Sarnath', type: 'unesco' },
  { id: 'somnath', expectedShort: 'Somnath Mandir', type: 'cultural' },
  { id: 'dwarkadhish', expectedShort: 'Dwarka Mandir', type: 'cultural' },
];

function fetchEndpoint(urlPath, port = 3000) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${port}${urlPath}`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(port = 3000, maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetchEndpoint('/', port);
      if (res.statusCode === 200) {
        return true;
      }
    } catch (err) {
      if (i === maxAttempts - 1) {
        console.error('Wait error:', err.message);
      }
      await delay(500);
    }
  }
  return false;
}

async function main() {
  console.log('Starting Next.js production server in same command session...');
  const server = spawn('cmd.exe', ['/c', 'npm.cmd', 'start', '--', '-p', '3000', '-H', '127.0.0.1'], {
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => {
    const text = d.toString();
    if (text.includes('Ready') || text.includes('Error')) {
      console.log(`[Next.js] ${text.trim()}`);
    }
  });

  const isReady = await waitForServer(3000);
  if (!isReady) {
    console.error('Server failed to start within timeout.');
    server.kill();
    process.exit(1);
  }

  console.log('Server is ready! Running Phase 12 verification test suite...\n');

  let passCount = 0;
  let failCount = 0;

  // 1. Homepage
  const home = await fetchEndpoint('/', 3000);
  if (home.statusCode === 200 && home.body.includes('Walk Through History, From Anywhere')) {
    console.log('✓ [200] Homepage (/) verified with official tagline.');
    passCount++;
  } else {
    console.error('✗ Homepage failed check:', home.statusCode);
    failCount++;
  }

  // 2. Catalog (/explore)
  const explore = await fetchEndpoint('/explore', 3000);
  if (explore.statusCode === 200 && explore.body.includes('Walk Through History, From Anywhere')) {
    console.log('✓ [200] Explore Catalog (/explore) verified.');
    passCount++;
  } else {
    console.error('✗ Explore catalog failed check:', explore.statusCode);
    failCount++;
  }

  for (const d of DESTINATIONS) {
    if (explore.body.includes(d.expectedShort)) {
      console.log(`  ✓ Destination card verified in catalog: ${d.expectedShort}`);
      passCount++;
    } else {
      console.error(`  ✗ Destination card NOT found in catalog: ${d.expectedShort}`);
      failCount++;
    }
  }

  // 3. Destinations
  for (const d of DESTINATIONS) {
    console.log(`\nTesting Destination: ${d.id}`);

    // Detail / Landing Page
    const detail = await fetchEndpoint(`/explore/${d.id}`, 3000);
    if (detail.statusCode === 200) {
      const has3D = detail.body.includes('Explore 3D Walkthrough');
      const has2D = detail.body.includes('2D Site Map');
      const hasTour = detail.body.includes('Guided Tour');
      if (has3D && has2D && hasTour) {
        console.log(`  ✓ [200] Landing page /explore/${d.id} has Explore 3D, Guided Tour & 2D Site Map CTAs.`);
        passCount++;
      } else {
        console.error(`  ✗ Missing CTA on /explore/${d.id}: 3D=${has3D}, 2D=${has2D}, Tour=${hasTour}`);
        failCount++;
      }

      if (d.type === 'cultural') {
        const hasCultural = detail.body.includes('Culturally Significant');
        if (hasCultural) {
          console.log(`  ✓ Cultural integrity badge confirmed on /explore/${d.id}.`);
          passCount++;
        } else {
          console.error(`  ✗ Cultural integrity failed on /explore/${d.id}`);
          failCount++;
        }
      }
    } else {
      console.error(`  ✗ Detail failed: ${detail.statusCode}`);
      failCount++;
    }

    // Dedicated 3D Walkthrough (/explore/[id]/3d)
    const threeD = await fetchEndpoint(`/explore/${d.id}/3d`, 3000);
    if (threeD.statusCode === 200 && (threeD.body.includes('Initializing 3D Canvas Client') || threeD.body.includes('3D Walkthrough'))) {
      console.log(`  ✓ [200] Dedicated 3D Walkthrough /explore/${d.id}/3d verified.`);
      passCount++;
    } else {
      console.error(`  ✗ 3D walkthrough failed: ${threeD.statusCode}`);
      failCount++;
    }

    // Dedicated 2D Map (/explore/[id]/map)
    const map = await fetchEndpoint(`/explore/${d.id}/map`, 3000);
    if (map.statusCode === 200 && map.body.includes('Site Map')) {
      console.log(`  ✓ [200] Dedicated 2D Map /explore/${d.id}/map verified.`);
      passCount++;
    } else {
      console.error(`  ✗ 2D map failed: ${map.statusCode}`);
      failCount++;
    }

    // Universal Experience (/explore/[id]/experience)
    const exp = await fetchEndpoint(`/explore/${d.id}/experience`, 3000);
    if (exp.statusCode === 200) {
      console.log(`  ✓ [200] Experience Portal /explore/${d.id}/experience verified.`);
      passCount++;
    } else {
      console.error(`  ✗ Experience portal failed: ${exp.statusCode}`);
      failCount++;
    }
  }

  // 4. Licenses Page
  const lic = await fetchEndpoint('/licenses', 3000);
  if (lic.statusCode === 200 && (lic.body.includes('Asset Register') || lic.body.includes('Licensing Attribution'))) {
    console.log('\n✓ [200] Licenses page (/licenses) verified.');
    passCount++;
  } else {
    console.error('✗ Licenses failed:', lic.statusCode);
    failCount++;
  }

  console.log(`\n========================================`);
  console.log(`TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
  console.log(`========================================`);

  server.kill('SIGINT');
  process.exit(failCount > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
