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

function fetchEndpoint(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${urlPath}`, (res) => {
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

async function runVerification() {
  console.log('--- STARTING PHASE 12 ENDPOINT AUDIT ---');
  let passCount = 0;
  let failCount = 0;

  // 1. Homepage Audit
  const homeRes = await fetchEndpoint('/');
  if (homeRes.statusCode === 200 && homeRes.body.includes('Walk Through History, From Anywhere')) {
    console.log('✓ [200] Homepage (/) verified with official tagline.');
    passCount++;
  } else {
    console.error('✗ Homepage failed check:', homeRes.statusCode);
    failCount++;
  }

  // 2. Explore Catalog Audit
  const exploreRes = await fetchEndpoint('/explore');
  if (exploreRes.statusCode === 200 && exploreRes.body.includes('Walk Through History, From Anywhere.')) {
    console.log('✓ [200] Explore Catalog (/explore) verified.');
    passCount++;
  } else {
    console.error('✗ Explore catalog failed check:', exploreRes.statusCode);
    failCount++;
  }

  // Check that all 9 destination cards are rendered in catalog
  for (const d of DESTINATIONS) {
    if (exploreRes.body.includes(d.expectedShort)) {
      console.log(`  ✓ Destination card verified in catalog: ${d.expectedShort}`);
      passCount++;
    } else {
      console.error(`  ✗ Destination card NOT found in catalog: ${d.expectedShort}`);
      failCount++;
    }
  }

  // 3. Destination Landing Pages, 3D Walkthroughs, and 2D Maps
  for (const d of DESTINATIONS) {
    console.log(`\nTesting Destination: ${d.id}`);

    // A. Detail / Landing Page
    const detailRes = await fetchEndpoint(`/explore/${d.id}`);
    if (detailRes.statusCode === 200) {
      const has3DButton = detailRes.body.includes('Explore 3D Walkthrough');
      const has2DButton = detailRes.body.includes('2D Site Map');
      const hasTourButton = detailRes.body.includes('Guided Tour');

      if (has3DButton && has2DButton && hasTourButton) {
        console.log(`  ✓ [200] Landing page /explore/${d.id} has Explore 3D, Guided Tour & 2D Site Map CTAs.`);
        passCount++;
      } else {
        console.error(`  ✗ Missing CTA on /explore/${d.id}: 3D=${has3DButton}, 2D=${has2DButton}, Tour=${hasTourButton}`);
        failCount++;
      }

      // Check cultural classification integrity
      if (d.type === 'cultural') {
        const hasCultural = detailRes.body.includes('Culturally Significant');
        if (hasCultural) {
          console.log(`  ✓ Cultural integrity badge confirmed on /explore/${d.id}.`);
          passCount++;
        } else {
          console.error(`  ✗ Cultural integrity failed on /explore/${d.id}`);
          failCount++;
        }
      }
    } else {
      console.error(`  ✗ Failed /explore/${d.id}: status ${detailRes.statusCode}`);
      failCount++;
    }

    // B. Dedicated 3D Walkthrough Page (/explore/[id]/3d)
    const threeDRes = await fetchEndpoint(`/explore/${d.id}/3d`);
    if (threeDRes.statusCode === 200 && (threeDRes.body.includes('Initializing 3D Canvas Client') || threeDRes.body.includes('3D Walkthrough'))) {
      console.log(`  ✓ [200] Dedicated 3D Walkthrough /explore/${d.id}/3d verified.`);
      passCount++;
    } else {
      console.error(`  ✗ Failed /explore/${d.id}/3d: status ${threeDRes.statusCode}`);
      failCount++;
    }

    // C. Dedicated 2D Site Map Page (/explore/[id]/map)
    const mapRes = await fetchEndpoint(`/explore/${d.id}/map`);
    if (mapRes.statusCode === 200 && mapRes.body.includes('Site Map')) {
      console.log(`  ✓ [200] Dedicated 2D Map /explore/${d.id}/map verified.`);
      passCount++;
    } else {
      console.error(`  ✗ Failed /explore/${d.id}/map: status ${mapRes.statusCode}`);
      failCount++;
    }

    // D. Universal Experience Portal (/explore/[id]/experience)
    const expRes = await fetchEndpoint(`/explore/${d.id}/experience`);
    if (expRes.statusCode === 200) {
      console.log(`  ✓ [200] Experience Portal /explore/${d.id}/experience verified.`);
      passCount++;
    } else {
      console.error(`  ✗ Failed /explore/${d.id}/experience: status ${expRes.statusCode}`);
      failCount++;
    }
  }

  // 4. Licenses Page Audit
  const licRes = await fetchEndpoint('/licenses');
  if (licRes.statusCode === 200 && licRes.body.includes('Asset Licensing Register')) {
    console.log('\n✓ [200] Licenses page (/licenses) verified.');
    passCount++;
  } else {
    console.error('✗ Licenses page failed:', licRes.statusCode);
    failCount++;
  }

  console.log(`\n========================================`);
  console.log(`AUDIT RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
  console.log(`========================================`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error('Fatal audit error:', err);
  process.exit(1);
});
