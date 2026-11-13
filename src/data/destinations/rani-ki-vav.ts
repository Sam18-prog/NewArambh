import { Destination } from '@/types/destination';

export const raniKiVavDestination: Destination = {
  id: 'rani-ki-vav',
  slug: 'rani-ki-vav',
  name: 'Rani-ki-Vav (The Queen’s Stepwell)',
  shortName: 'Rani-ki-Vav',
  hindiName: 'रानी की वाव (पाटन)',
  subtitle: 'The masterwork of subterranean Maru-Gurjara water architecture and sculpture',
  description:
    'An extraordinary 11th-century subterranean stepwell built by Queen Udayamati on the banks of the Saraswati River. Designed as an inverted temple honoring the sanctity of water, descending seven storeys deep with over 500 principal high-relief sculptures.',
  detailedHistory: [
    'Constructed around 1063 CE during the Chaulukya (Solanki) dynasty by Queen Udayamati in memory of her deceased husband King Bhimadeva I (1022–1064 CE), as recorded in Merutunga’s 1304 text Prabandha Chintamani.',
    'Over centuries, the Saraswati River changed course and silted over the monumental stepwell with massive flood sediments, preserving the delicate sandstone sculptures in near-immaculate condition for nearly eight centuries until scientific excavation by the Archaeological Survey of India in the 1980s.',
    'Engineered in the Maru-Gurjara architectural style, the stepwell is oriented west-to-east, measuring 65 meters in length, 20 meters in width, and 28 meters in depth. Its architectural layout combines functional aquifer access with profound spiritual cosmology.'
  ],
  location: 'Patan, Gujarat, India',
  city: 'Patan',
  state: 'Gujarat',
  country: 'India',
  period: 'c. 1063 CE (Chaulukya Dynasty, Queen Udayamati)',
  category: 'stepwells',
  categoryLabel: 'Stepwells & Water Architecture',
  heritageClassification: 'unesco',
  unescoInscriptionYear: 2014,
  unescoUrl: 'https://whc.unesco.org/en/list/922/',
  officialUrl: 'https://asi.nic.in/rani-ki-vav-patan/',
  thumbnailUrl: '/images/destinations/rani-ki-vav-thumb.jpg',
  heroImageUrl: '/images/destinations/rani-ki-vav.jpg',
  galleryImages: [
    {
      url: '/images/destinations/rani-ki-vav.jpg',
      caption: 'The seven descending terraced levels and pillared pavilions of Rani-ki-Vav.',
      credit: 'Archaeological Survey of India Heritage Archive',
      alt: 'Rani-ki-Vav stepwell in Patan, Gujarat'
    }
  ],
  reconstructionType: 'Schematic Digital Exploration',
  availableModes: ['map', 'tour', 'inspect'],
  landmarks: [
    {
      id: 'ranikivav-landmark-1',
      destinationId: 'rani-ki-vav',
      name: 'Entrance Staircase',
      hindiName: 'प्रवेश सोपान मार्ग',
      category: 'Stepped Thresholds',
      mapCoordinates: { x: 18, y: 50 },
      shortDescription: 'The broad eastern stepped entry ramp where visitors leave ground level and begin descending into the cool earth.',
      detailedDescription:
        'The monument begins at ground level on the east with an expansive open stepped corridor leading downward. As visitors descend the first stone flights, the outside desert heat is replaced by natural subterranean cooling and acoustic quiet.',
      historicalSignificance:
        'Represents the conceptual threshold into the subterranean inverted temple, preparing the visitor to transition from the mortal world to the sacred depths.',
      architecturalHighlights: [
        'Stepped flight measuring 20 meters across, engineered with drainage channels.',
        'Flanked by sculpted retaining walls decorated with geometric floral bands.',
        'Wide landing terraces providing resting spaces for pilgrims.'
      ],
      gallery: [
        {
          id: 'rkv-l1-img1',
          url: '/images/destinations/rani-ki-vav.jpg',
          caption: 'Eastern stepped descent into Rani-ki-Vav.',
          alt: 'Entrance staircase at Rani-ki-Vav',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Rani-ki-Vav Inscription #922',
          url: 'https://whc.unesco.org/en/list/922/',
          authorOrPublisher: 'UNESCO World Heritage Centre'
        }
      ]
    },
    {
      id: 'ranikivav-landmark-2',
      destinationId: 'rani-ki-vav',
      name: 'Seven Descending Levels',
      hindiName: 'सात अवतरण स्तर (सप्त-भूमि)',
      category: 'Subterranean Terraces',
      mapCoordinates: { x: 40, y: 50 },
      shortDescription: 'Seven distinct terraced levels descending 28 meters below ground level, each supported by intricately carved pavilions.',
      detailedDescription:
        'The stepwell descends through seven distinct storeys of stepped corridors, pillared pavilions, and recessed galleries. Each level features pillared walkways allowing visitors to descend directly to the water level regardless of seasonal monsoon fluctuations.',
      historicalSignificance:
        'A technical masterpiece of medieval hydraulic engineering designed to withstand immense subterranean lateral earth pressure for a millennium.',
      architecturalHighlights: [
        'Total depth of 28 meters (over 90 feet) below the ground surface.',
        'Carefully calculated stepped ratios preventing lateral collapse of the desert sand walls.',
        'Continuous horizontal stone bracing connecting opposite wall faces.'
      ],
      gallery: [
        {
          id: 'rkv-l2-img1',
          url: '/images/destinations/rani-ki-vav.jpg',
          caption: 'Looking down through the tiered descending levels.',
          alt: 'Seven levels of Rani-ki-Vav',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Stepwells of Gujarat: Inverted Architecture',
          url: 'https://whc.unesco.org/en/list/922/',
          authorOrPublisher: 'UNESCO / ASI Research Monographs'
        }
      ]
    },
    {
      id: 'ranikivav-landmark-3',
      destinationId: 'rani-ki-vav',
      name: 'Pillared Pavilions (Mandapas)',
      hindiName: 'स्तंभयुक्त मंडप',
      category: 'Subterranean Structural Pavilions',
      mapCoordinates: { x: 55, y: 50 },
      shortDescription: 'Multi-tiered colonnaded pavilions spanning the corridor, providing structural support and shaded communal resting areas.',
      detailedDescription:
        'At regular intervals along the descent, the trench is spanned by multi-storey pillared pavilions (mandapas). These stone colonnades are decorated with cusped brackets, pot-and-foliage (Ghatapallava) capitals, and carved lintels that stabilize the side walls while providing shaded rest for travelers.',
      historicalSignificance:
        'Translates classical freestanding temple pavilion engineering directly into subterranean structural bracing.',
      architecturalHighlights: [
        'Multi-storey pavilion frames with octagonal and square fluted pillars.',
        'Stone beam grid designed to distribute earth pressure across transverse arches.',
        'Exquisitely carved bracket figures of Apsaras and Nayikas.'
      ],
      gallery: [
        {
          id: 'rkv-l3-img1',
          url: '/images/destinations/rani-ki-vav.jpg',
          caption: 'Pillared pavilions supporting the subterranean corridor.',
          alt: 'Pillared pavilions at Rani-ki-Vav',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Chaulukya Architecture of Gujarat',
          url: 'https://asi.nic.in/rani-ki-vav-patan/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'ranikivav-landmark-4',
      destinationId: 'rani-ki-vav',
      name: 'Sculptural Galleries',
      hindiName: 'मूर्तिकला वीथिकाएं',
      category: 'Medieval Stone Sculpture',
      mapCoordinates: { x: 68, y: 50 },
      shortDescription: 'More than 500 major stone sculptures and over 1,000 minor reliefs lining the vertical side walls of every level.',
      detailedDescription:
        'The retaining walls of the seven terraces are adorned with an astonishing pantheon of Hindu iconography. The panels depict the ten avatars of Vishnu (Dasavatara), celestial maidens (Apsaras), Dikpalas (guardians of cardinal directions), and scenes of daily 11th-century life with breathtaking anatomical precision.',
      historicalSignificance:
        'Recognized by UNESCO as the pinnacle of Maru-Gurjara sculptural art, displaying unsurpassed mastery of movement, ornamentation, and spiritual symbolism.',
      architecturalHighlights: [
        'Over 500 monumental high-relief sculptures in pristine white sandstone niches.',
        'High-relief Apsaras applying makeup, wringing hair, and playing musical instruments.',
        'Intricate jewelry, drapery, and hair ornaments carved in microscopic detail.'
      ],
      gallery: [
        {
          id: 'rkv-l4-img1',
          url: '/images/destinations/rani-ki-vav.jpg',
          caption: 'High-relief sculptural panels on the third terrace.',
          alt: 'Sculptural galleries at Rani-ki-Vav',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Iconography of Rani-ki-Vav',
          url: 'https://whc.unesco.org/en/list/922/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'ranikivav-landmark-5',
      destinationId: 'rani-ki-vav',
      name: 'Central Deep Well (Kupa)',
      hindiName: 'केंद्रीय कूप (जल स्रोत)',
      category: 'Hydraulic Well Architecture',
      mapCoordinates: { x: 84, y: 50 },
      shortDescription: 'The massive circular stone well shaft at the western terminus, penetrating the natural groundwater aquifer.',
      detailedDescription:
        'At the deepest western end of the monument is the massive circular well shaft, measuring 10 meters in diameter and descending to the natural subterranean aquifer. Even inside the circular well walls, every stone course is carved with rings of decorative brackets and sculptural niches.',
      historicalSignificance:
        'The physical and sacred climax of the stepwell, providing perennial drinking water and irrigation to the surrounding arid plains of Patan.',
      architecturalHighlights: [
        'Circular stone shaft reinforced with interlocking ashlar masonry without mortar keys.',
        'Submerged stone galleries allowing maintenance during low-water summer months.',
        'Direct connection to the ancient hydrological floodplains of the Saraswati River.'
      ],
      gallery: [
        {
          id: 'rkv-l5-img1',
          url: '/images/destinations/rani-ki-vav.jpg',
          caption: 'Circular carved well shaft at the western terminus.',
          alt: 'Central well shaft at Rani-ki-Vav',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Hydraulic Systems in Ancient Indian Stepwells',
          url: 'https://whc.unesco.org/en/list/922/',
          authorOrPublisher: 'UNESCO / ASI Documentation'
        }
      ]
    },
    {
      id: 'ranikivav-landmark-6',
      destinationId: 'rani-ki-vav',
      name: 'Vishnu-Related Sculptural Panels (Sheshashayi Vishnu)',
      hindiName: 'शेषशायी विष्णु फलक',
      category: 'Masterpiece Sacred Sculpture',
      mapCoordinates: { x: 78, y: 38 },
      shortDescription: 'The master relief of Lord Vishnu reclining peacefully upon the thousand-headed serpent Sheshanaga on the ocean of milk.',
      detailedDescription:
        'The spiritual dedication of Rani-ki-Vav to Lord Vishnu is celebrated in three colossal reliefs of Sheshashayi Vishnu placed at the water level. Vishnu reclines upon the coiled serpent Sheshanaga on the cosmic ocean (Kshirasagara), watched by Lakshmi, Brahma rising from his navel, and the celestial pantheon.',
      historicalSignificance:
        'The crowning devotional centerpiece of the stepwell, sanctifying water as the cosmic primordial element from which the universe emerged.',
      architecturalHighlights: [
        'Multi-figure composition carved with fluid depth and graceful tranquility.',
        'Thousand hoods of Sheshanaga forming a protective canopy above Vishnu’s crown.',
        'Positioned so that rising seasonal water would submerge and ritually wash the feet of the deity.'
      ],
      gallery: [
        {
          id: 'rkv-l6-img1',
          url: '/images/destinations/rani-ki-vav.jpg',
          caption: 'Sheshashayi Vishnu panel at water level.',
          alt: 'Sheshashayi Vishnu sculpture at Rani-ki-Vav',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Vaishnava Iconography in Rani-ki-Vav',
          url: 'https://whc.unesco.org/en/list/922/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    }
  ],
  timeline: [
    {
      year: '1063',
      title: 'Commissioned by Queen Udayamati',
      description: 'Queen Udayamati commissions the stepwell as a grand memorial for King Bhimadeva I of the Chaulukya dynasty.'
    },
    {
      year: '1304',
      title: 'Historical Chronicle Record',
      description: 'Merutunga records in Prabandha Chintamani that Queen Udayamati built a stepwell surpassing all others in Sahasralinga.'
    },
    {
      year: 'c. 1350',
      title: 'Silting by Saraswati River',
      description: 'Floods deposit silt and sand over the monument, creating a subterranean time capsule for over 700 years.'
    },
    {
      year: '1986',
      title: 'ASI Excavation & Restoration',
      description: 'The Archaeological Survey of India methodically unearths the stepwell, revealing its intact sculptures.'
    },
    {
      year: '2014',
      title: 'UNESCO World Heritage Inscription',
      description: 'Inscribed on the UNESCO World Heritage List under Criteria (i) and (iv) as an exceptional example of subterranean architecture.'
    }
  ],
  quickFacts: [
    { label: 'Built By', value: 'Queen Udayamati (Chaulukya Dynasty)' },
    { label: 'Construction Date', value: 'c. 1063 CE (11th Century)' },
    { label: 'Depth', value: '28 meters (92 feet)' },
    { label: 'Length & Width', value: '65m long × 20m wide' },
    { label: 'Number of Levels', value: '7 Terraced Subterranean Storeys' },
    { label: 'UNESCO Ref', value: 'Inscription #922 (2014)' }
  ],
  architecturalSignificance:
    'Rani-ki-Vav was designed as an inverted temple highlighting the sacredness of water. Divided into seven levels with pillared pavilions, stepped corridors, and retaining walls adorned with over 500 major sculptures in the Maru-Gurjara style.',
  culturalSignificance:
    'Exemplifies the ancient Indian ethos of Jal Mandir (water sanctuary), where water conservation was elevated to an act of spiritual devotion and public service.',
  historicalReferences: [
    {
      title: 'Rani-ki-Vav (the Queen’s Stepwell) at Patan, Gujarat — UNESCO',
      organization: 'UNESCO World Heritage Centre',
      url: 'https://whc.unesco.org/en/list/922/',
      relevantClaim: 'Inscribed in 2014 under Criteria (i) and (iv) as a subterranean masterpiece of water management and architectural art.',
      lastVerifiedDate: '2026-11'
    },
    {
      title: 'Rani-ki-Vav, Patan — Archaeological Survey of India',
      organization: 'Archaeological Survey of India (ASI)',
      url: 'https://asi.nic.in/rani-ki-vav-patan/',
      relevantClaim: 'Centrally protected national monument under the ASI Vadodara Circle.',
      lastVerifiedDate: '2026-11'
    }
  ],
  assetCredits: [
    {
      assetName: 'Rani-ki-Vav Architectural Elevation Vector',
      source: 'NewArambh Open Heritage Library',
      creator: 'NewArambh Curatorial Team',
      license: 'CC-BY 4.0'
    }
  ],
  stats: {
    estimatedVisitMinutes: 24,
    hotspotsCount: 6,
    yearBuilt: '1063 CE'
  },
  tags: ['UNESCO', 'Stepwell', 'Gujarat', 'Patan', 'Water', 'Chaulukya', 'Vishnu', 'Subterranean'],
  mapConfig: {
    viewBox: '0 0 500 500',
    schematicDisclaimer: 'Schematic educational site map — not to scale.',
    aspectRatio: '1/1'
  }
};
