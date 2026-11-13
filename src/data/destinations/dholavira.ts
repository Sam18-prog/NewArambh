import { Destination } from '@/types/destination';

export const dholaviraDestination: Destination = {
  id: 'dholavira',
  slug: 'dholavira',
  name: 'Dholavira: A Harappan City',
  shortName: 'Dholavira',
  hindiName: 'धोलावीरा: हड़प्पा कालीन नगर',
  subtitle: 'The ancient stone metropolis and hydraulic marvel of the Indus Valley Civilisation',
  description:
    'An extraordinary Bronze Age urban settlement on Khadir Bet island in the Great Rann of Kutch (c. 3000–1500 BCE). Distinguished by its massive ashlar stone fortifications, tripartite urban division, monumental rock-cut water reservoirs, and the famous 10-character Indus Signboard.',
  detailedHistory: [
    'Occupied for over 1,500 years across seven distinct cultural stages (c. 3000–1500 BCE), Dholavira represents the most complete and best-preserved fortified city of the Indus Valley Civilisation (Harappan Civilisation) in South Asia.',
    'Discovered by archaeologist J. P. Joshi in 1968 and excavated extensively by Dr. R. S. Bisht of the Archaeological Survey of India between 1990 and 2005, revealing an unprecedented urban plan divided into Citadel, Middle Town, and Lower Town surrounded by sixteen giant water reservoirs.',
    'Surrounded by salty desert marshlands on Khadir Bet island, the Harappan engineers devised a visionary water conservation system, harnessing the monsoon torrents of two seasonal storm streams (Manhar and Mansar) through a network of dams, weirs, and stone-cut holding basins that stored over 300,000 cubic meters of fresh water.'
  ],
  location: 'Khadir Bet, Kutch, Gujarat, India',
  city: 'Khadir Bet, Bhachau',
  state: 'Gujarat',
  country: 'India',
  period: 'c. 3000–1500 BCE (Indus Valley Civilisation)',
  category: 'archaeological',
  categoryLabel: 'Archaeological Sites',
  heritageClassification: 'unesco',
  unescoInscriptionYear: 2021,
  unescoUrl: 'https://whc.unesco.org/en/list/1642/',
  officialUrl: 'https://asi.nic.in/dholavira-kutch/',
  thumbnailUrl: '/images/destinations/dholavira-thumb.jpg',
  heroImageUrl: '/images/destinations/dholavira.jpg',
  galleryImages: [
    {
      url: '/images/destinations/dholavira.jpg',
      caption: 'The massive stone-cut Citadel and Harappan reservoir system of Dholavira.',
      credit: 'Archaeological Survey of India Heritage Archive',
      alt: 'Dholavira archaeological site in Kutch, Gujarat'
    }
  ],
  reconstructionType: 'Schematic Digital Exploration',
  availableModes: ['map', 'tour', 'inspect'],
  landmarks: [
    {
      id: 'dholavira-landmark-1',
      destinationId: 'dholavira',
      name: 'The Citadel (Acropolis)',
      hindiName: 'दुर्ग (सिटाडेल)',
      category: 'Fortified Acropolis',
      mapCoordinates: { x: 38, y: 55 },
      shortDescription: 'The elevated stone-walled fortress overlooking the entire city, built with dressed stone masonry and towering bastions.',
      detailedDescription:
        'The Citadel stands at the southwestern zone of the city, rising commands over the ceremonial ground and residential quarters. Unlike Indus cities like Mohenjo-daro which used sun-dried bricks, Dholavira’s Citadel was built using dressed limestone blocks and white marble veneer with massive circular corner bastions.',
      historicalSignificance:
        'The administrative, ceremonial, and elite residence of Dholavira’s governing council and priest-merchants.',
      architecturalHighlights: [
        'Massive double-rampart walls up to 18 meters thick at the base.',
        'Imposing North Gate chamber where the famous 10-character Indus Signboard was unearthed.',
        'High polished limestone pillar bases and monolithic door sockets.'
      ],
      gallery: [
        {
          id: 'dh-l1-img1',
          url: '/images/destinations/dholavira.jpg',
          caption: 'Stone walls and gateways of the Dholavira Citadel.',
          alt: 'Citadel walls at Dholavira',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Dholavira: A Harappan City Inscription #1642',
          url: 'https://whc.unesco.org/en/list/1642/',
          authorOrPublisher: 'UNESCO World Heritage Centre'
        }
      ]
    },
    {
      id: 'dholavira-landmark-2',
      destinationId: 'dholavira',
      name: 'Castle and Bailey Areas',
      hindiName: 'प्रसाद एवं उप-प्राचीर (कैसल व बेली)',
      category: 'Elite Administrative Enclosures',
      mapCoordinates: { x: 42, y: 48 },
      shortDescription: 'The fortified inner sanctuary (Castle) and its adjoining defensive terrace (Bailey).',
      detailedDescription:
        'The Citadel is bisected into two specialized sectors: the supreme "Castle" where the chief administrator resided, and the adjoining "Bailey" terrace to the west, which housed military guards, retainers, and workshop craftsmen.',
      historicalSignificance:
        'Demonstrates sophisticated hierarchical division of space within Bronze Age civic governance.',
      architecturalHighlights: [
        'Paved stone streets with subterranean stone drain covers.',
        'Guard rooms flanking monumental stone staircase ramps.',
        'Inner ceremonial courtyard with carved drainage slopes.'
      ],
      gallery: [
        {
          id: 'dh-l2-img1',
          url: '/images/destinations/dholavira.jpg',
          caption: 'Castle and Bailey partition walls.',
          alt: 'Castle and Bailey at Dholavira',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Excavations at Dholavira (1990–2005)',
          url: 'https://asi.nic.in/dholavira-kutch/',
          authorOrPublisher: 'R. S. Bisht (Archaeological Survey of India)'
        }
      ]
    },
    {
      id: 'dholavira-landmark-3',
      destinationId: 'dholavira',
      name: 'Middle Town (Madhyama Nagara)',
      hindiName: 'मध्यम नगर',
      category: 'Civic Urban Planning',
      mapCoordinates: { x: 48, y: 32 },
      shortDescription: 'The fortified settlement of traders, officials, and master craftspeople, laid out on a grid of wide stone avenues.',
      detailedDescription:
        'Situated to the north of the Citadel and separated by an expansive ceremonial stadium, the Middle Town is enclosed by its own independent stone fortification wall. It features multi-room houses, shell-working and bead-making workshops, and wide streets intersecting at perfect right angles.',
      historicalSignificance:
        'Pioneering evidence of deliberate civic urban zoning, housing the flourishing merchant and artisan classes of the Harappan civilization.',
      architecturalHighlights: [
        'Grid-pattern stone avenues up to 5 meters wide.',
        'Sophisticated individual house drains connecting to primary stone-covered sewers.',
        'Dedicated copper smithing, carnelian bead, and marine shell bangle workshops.'
      ],
      gallery: [
        {
          id: 'dh-l3-img1',
          url: '/images/destinations/dholavira.jpg',
          caption: 'Grid streets and residential stone foundations of Middle Town.',
          alt: 'Middle Town at Dholavira',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Urban Planning in the Indus Civilization',
          url: 'https://whc.unesco.org/en/list/1642/',
          authorOrPublisher: 'UNESCO Heritage Monograph'
        }
      ]
    },
    {
      id: 'dholavira-landmark-4',
      destinationId: 'dholavira',
      name: 'Lower Town (Avama Nagara)',
      hindiName: 'अधो नगर (निचला नगर)',
      category: 'Residential Urban Quarters',
      mapCoordinates: { x: 68, y: 35 },
      shortDescription: 'The expansive residential zone for the general urban population, protected within the outer city perimeter.',
      detailedDescription:
        'Occupying the eastern portion of the enclosed city, the Lower Town provided spacious residential accommodation for farmers, laborers, and service communities. Excavations reveal multi-roomed dwellings with private courtyards, bathing platforms, and soak pits.',
      historicalSignificance:
        'Illustrates that even everyday working communities enjoyed sanitation, stone-paved lanes, and protection within the colossal fortified city boundary.',
      architecturalHighlights: [
        'Houses organized into self-contained residential blocks.',
        'Clay-lined silos and stone grain-storage structures.',
        'Direct access to eastern and northern water reservoirs.'
      ],
      gallery: [
        {
          id: 'dh-l4-img1',
          url: '/images/destinations/dholavira.jpg',
          caption: 'Stone foundations and streets of the Lower Town.',
          alt: 'Lower Town at Dholavira',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Dholavira Archaeological Reports',
          url: 'https://asi.nic.in/dholavira-kutch/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'dholavira-landmark-5',
      destinationId: 'dholavira',
      name: 'Reservoir Systems & Dams',
      hindiName: 'जलाशय प्रणाली एवं बांध',
      category: 'Bronze Age Hydraulic Engineering',
      mapCoordinates: { x: 50, y: 78 },
      shortDescription: 'Sixteen colossal rock-cut water reservoirs engineered around the city to harvest and store seasonal monsoon floods.',
      detailedDescription:
        'The defining achievement of Dholavira is its hydraulic management system. Surrounded by sixteen massive stone-cut reservoirs capable of storing an estimated 300,000 cubic meters of rainwater, the system channeled runoff from the ephemeral Manhar and Mansar torrents through masonry dams, siltation traps, and interconnecting canals.',
      historicalSignificance:
        'The earliest and most advanced hydraulic engineering system discovered anywhere in the ancient Bronze Age world.',
      architecturalHighlights: [
        'East Reservoir measuring 73 meters long, 29 meters wide, and over 10 meters deep.',
        'Rock-cut stairs descending into the reservoir basin with water level gauge marks.',
        'Masonry check-dams and stone feeder channels with desilting chambers.'
      ],
      gallery: [
        {
          id: 'dh-l5-img1',
          url: '/images/destinations/dholavira.jpg',
          caption: 'The monumental stone-cut East Reservoir showing descending steps.',
          alt: 'Reservoir systems at Dholavira',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Hydraulic Architecture of Harappan Dholavira',
          url: 'https://whc.unesco.org/en/list/1642/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'dholavira-landmark-6',
      destinationId: 'dholavira',
      name: 'Archaeological Remains & Indus Signboard',
      hindiName: 'पुरातात्विक अवशेष एवं धोलावीरा साइनबोर्ड',
      category: 'Ancient Epigraphy & Artifacts',
      mapCoordinates: { x: 38, y: 40 },
      shortDescription: 'The famous ten-character gypsum signboard, polished limestone pillars, and monumental ceremonial stadium.',
      detailedDescription:
        'In a guardroom beside the Northern Gate of the Citadel, archaeologists discovered nine monumental wooden characters made of white crystalline gypsum inlay (the Dholavira Signboard), each letter 37cm tall. Also excavated was a vast 283-meter-long ceremonial stadium with stepped stone seating for thousands of spectators.',
      historicalSignificance:
        'The longest single inscribed text of the undeciphered Indus script, providing profound clues to Bronze Age public communication.',
      architecturalHighlights: [
        'The Dholavira Signboard: 10 large characters made of mineral gypsum paste.',
        'Grand ceremonial ground (283m × 47m) flanked by tiered stone seating.',
        'Rare polished monolithic limestone column drums and decorative capitals.'
      ],
      gallery: [
        {
          id: 'dh-l6-img1',
          url: '/images/destinations/dholavira.jpg',
          caption: 'Ceremonial ground and Northern Gate where the Signboard was found.',
          alt: 'Indus Signboard location at Dholavira',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'The Dholavira Signboard and Indus Epigraphy',
          url: 'https://whc.unesco.org/en/list/1642/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    }
  ],
  timeline: [
    {
      year: 'c. 3000 BCE',
      title: 'Stage I: Pre-Harappan Settlement',
      description: 'Founding of the first fortified settlement on Khadir Bet utilizing mud-brick and local sandstone.'
    },
    {
      year: 'c. 2600 BCE',
      title: 'Stage III: Urban Expansion & Reservoirs',
      description: 'Citadel, Middle Town, and the monumental stone water reservoir system are fully engineered.'
    },
    {
      year: 'c. 1900 BCE',
      title: 'Stage V: Late Harappan Transition',
      description: 'Gradual decline as climatic changes reduce monsoon rainfall in the Rann of Kutch.'
    },
    {
      year: '1968',
      title: 'Archaeological Discovery',
      description: 'Archaeologist J. P. Joshi discovers the site during an exploratory survey of the Kutch desert.'
    },
    {
      year: '2021',
      title: 'UNESCO World Heritage Inscription',
      description: 'Inscribed on the UNESCO World Heritage List under Criteria (iii) and (iv) as an exceptional Harappan metropolis.'
    }
  ],
  quickFacts: [
    { label: 'Civilisation', value: 'Indus Valley (Harappan Civilisation)' },
    { label: 'Date of Settlement', value: 'c. 3000–1500 BCE (Bronze Age)' },
    { label: 'Excavated By', value: 'Dr. R. S. Bisht & ASI (1990–2005)' },
    { label: 'Primary Building Material', value: 'Dressed Limestone, Sandstone & Gypsum' },
    { label: 'Site Dimensions', value: 'Fortified perimeter covering 100 hectares' },
    { label: 'UNESCO Ref', value: 'Inscription #1642 (2021)' }
  ],
  architecturalSignificance:
    'Dholavira represents a triumph of stone construction in a civilisation primarily celebrated for brickwork. Its tripartite urban division, monumental rock-cut water reservoirs, and stone-paved sewage networks demonstrate supreme urban foresight.',
  culturalSignificance:
    'Key commercial gateway connecting maritime trade routes across the Arabian Sea to ancient Mesopotamia, Oman, and the Indus heartland.',
  historicalReferences: [
    {
      title: 'Dholavira: a Harappan City — UNESCO World Heritage Centre',
      organization: 'UNESCO World Heritage Centre',
      url: 'https://whc.unesco.org/en/list/1642/',
      relevantClaim: 'Inscribed in 2021 as one of the most remarkable and best preserved urban settlements in South Asia from the 3rd to mid-2nd millennium BCE.',
      lastVerifiedDate: '2026-11'
    },
    {
      title: 'Dholavira Excavations — Archaeological Survey of India',
      organization: 'Archaeological Survey of India (ASI)',
      url: 'https://asi.nic.in/dholavira-kutch/',
      relevantClaim: 'Centrally protected archaeological site under the jurisdiction of the ASI Vadodara Circle.',
      lastVerifiedDate: '2026-11'
    }
  ],
  assetCredits: [
    {
      assetName: 'Dholavira Site Plan Schematic Vector',
      source: 'NewArambh Open Heritage Library',
      creator: 'NewArambh Curatorial Team',
      license: 'CC-BY 4.0'
    }
  ],
  stats: {
    estimatedVisitMinutes: 28,
    hotspotsCount: 6,
    yearBuilt: 'c. 2600 BCE'
  },
  tags: ['UNESCO', 'Harappan', 'Indus Valley', 'Gujarat', 'Kutch', 'Bronze Age', 'Reservoir', 'Archaeology'],
  mapConfig: {
    viewBox: '0 0 500 500',
    schematicDisclaimer: 'Schematic educational site map — not to scale.',
    aspectRatio: '1/1'
  }
};
