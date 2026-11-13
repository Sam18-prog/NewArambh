import { Destination } from '@/types/destination';

export const agraFortDestination: Destination = {
  id: 'agra-fort',
  slug: 'agra-fort',
  name: 'Agra Fort',
  shortName: 'Agra Fort',
  hindiName: 'आगरा का किला',
  subtitle: 'The red sandstone walled imperial citadel of Akbar, Jahangir, and Shah Jahan',
  description:
    'A colossal 16th-century Mughal fortress rising along the banks of the Yamuna River. Comprising 2.5-kilometer semicircular defensive walls, royal palaces, private audience halls, and the octagonal Musamman Burj tower overlooking the distant Taj Mahal.',
  detailedHistory: [
    'Originally a brick fortress known as Badalgarh, Agra Fort was captured and entirely reconstructed in fine red sandstone by Emperor Akbar the Great between 1565 and 1573. Over 4,000 workers were employed daily over eight years to erect its monumental double-rampart walls.',
    'Akbar’s grandson, Shah Jahan, transformed the military citadel into an opulent palatial residence by adding white Makrana marble pavilions including the Khas Mahal, Diwan-i-Khas, and the Sheesh Mahal mirror palace.',
    'During his final eight years of life (1658–1666), after being deposed by his son Aurangzeb, Shah Jahan was confined inside the fort’s Musamman Burj, where he spent his days gazing out across the Yamuna River at his beloved Taj Mahal.'
  ],
  location: 'Agra, Uttar Pradesh, India',
  city: 'Agra',
  state: 'Uttar Pradesh',
  country: 'India',
  period: '1565–1573 CE (Expanded through 1658 CE)',
  category: 'forts-palaces',
  categoryLabel: 'Forts & Palaces',
  heritageClassification: 'unesco',
  unescoInscriptionYear: 1983,
  unescoUrl: 'https://whc.unesco.org/en/list/251/',
  officialUrl: 'https://asi.nic.in/agra-fort-agra/',
  thumbnailUrl: '/images/destinations/agra-fort-thumb.jpg',
  heroImageUrl: '/images/destinations/agra-fort.jpg',
  galleryImages: [
    {
      url: '/images/destinations/agra-fort.jpg',
      caption: 'Massive red sandstone ramparts and bastions of Agra Fort.',
      credit: 'Archaeological Survey of India Heritage Archive',
      alt: 'Agra Fort ramparts in Agra'
    }
  ],
  reconstructionType: 'Schematic Digital Exploration',
  availableModes: ['map', 'tour', 'inspect'],
  landmarks: [
    {
      id: 'agrafort-landmark-1',
      destinationId: 'agra-fort',
      name: 'Amar Singh Gate',
      hindiName: 'अमर सिंह दरवाज़ा',
      category: 'Fortified Entrances',
      mapCoordinates: { x: 30, y: 78 },
      shortDescription: 'The heavily fortified southern entry portal with drawbridge, right-angled bends, and massive circular bastions.',
      detailedDescription:
        'Originally named Akbar Darwaza and later renamed after Rathore hero Rao Amar Singh of Nagaur, this gate was designed with formidable defense mechanics. It features an outer drawbridge across the deep crocodile moat, a steep ramp flanked by high walls, and a sharp 90-degree turn engineered to neutralize enemy war elephants.',
      historicalSignificance:
        'The primary surviving public entrance to the fort, illustrating Akbar’s innovative military defensive architecture.',
      architecturalHighlights: [
        'Curved drawbridge crossing the 10-meter deep water moat.',
        'Right-angled blind-turn gateway rendering battering rams ineffective.',
        'Intricate glazed tilework and carved bracket details on the upper facade.'
      ],
      gallery: [
        {
          id: 'af-l1-img1',
          url: '/images/destinations/agra-fort.jpg',
          caption: 'Amar Singh Gate showing military ramparts and defensive bastions.',
          alt: 'Amar Singh Gate at Agra Fort',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Agra Fort Inscription #251',
          url: 'https://whc.unesco.org/en/list/251/',
          authorOrPublisher: 'UNESCO World Heritage Centre'
        }
      ]
    },
    {
      id: 'agrafort-landmark-2',
      destinationId: 'agra-fort',
      name: 'Jahangir Palace (Jahangiri Mahal)',
      hindiName: 'जहाँगीरी महल',
      category: 'Imperial Residential Palaces',
      mapCoordinates: { x: 55, y: 70 },
      shortDescription: 'The oldest surviving residential palace in Agra Fort, showcasing Akbar’s synthesis of Rajput and Islamic styles.',
      detailedDescription:
        'Built by Akbar for his son Jahangir (Prince Salim) and the royal women, this grand red sandstone palace is renowned for its trans-cultural architecture. It features heavy serpentine stone brackets, Gujarat-style carved lintels, deep eaves (chhajjas), and an open central courtyard without arches, reflecting traditional indigenous carpentry translated into solid sandstone.',
      historicalSignificance:
        'Supreme architectural testament to Akbar’s religious tolerance and deliberate patronage of indigenous Indian craftsmen.',
      architecturalHighlights: [
        'Transverse stone ceiling beams resting on multi-tiered peacock and lotus brackets.',
        'Fine white marble inlay geometric panels set into deep red sandstone.',
        'Monolithic bowl of Jahangir (Hauz-i-Jahangiri) carved from a single piece of porphyry rock.'
      ],
      gallery: [
        {
          id: 'af-l2-img1',
          url: '/images/destinations/agra-fort.jpg',
          caption: 'Carved brackets and sandstone court of Jahangiri Mahal.',
          alt: 'Jahangir Palace at Agra Fort',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Agra Fort Palaces Survey',
          url: 'https://asi.nic.in/agra-fort-agra/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'agrafort-landmark-3',
      destinationId: 'agra-fort',
      name: 'Khas Mahal',
      hindiName: 'खास महल (शाही शयनकक्ष)',
      category: 'Imperial Living Quarters',
      mapCoordinates: { x: 68, y: 55 },
      shortDescription: 'Shah Jahan’s pristine white marble private sleeping palace overlooking the Anguri Bagh grape garden.',
      detailedDescription:
        'Constructed between 1636 and 1637, the Khas Mahal (Aramgah-i-Muqaddas) served as Shah Jahan’s private apartment. Built from polished Makrana marble, it is flanked by two gilded pavilions with curved Bengali chhajja roofs (Bangla pavilions) and overlooks the lush sunken geometric parterres of the Anguri Bagh.',
      historicalSignificance:
        'Showcases Shah Jahan’s transition from Akbar’s austere red sandstone to delicate, gilded white marble luxury.',
      architecturalHighlights: [
        'Curved curved eaves (Bangaldar roofs) derived from regional Bengal vernacular architecture.',
        'Polychrome floral wall paintings and ceiling gold leafing.',
        'Air-conditioned cavity walls built with hollow clay tiles for summer insulation.'
      ],
      gallery: [
        {
          id: 'af-l3-img1',
          url: '/images/destinations/agra-fort.jpg',
          caption: 'Khas Mahal marble arcades facing the garden.',
          alt: 'Khas Mahal at Agra Fort',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Shah Jahan’s Marble Architecture in Agra Fort',
          url: 'https://whc.unesco.org/en/list/251/',
          authorOrPublisher: 'UNESCO Heritage Monograph'
        }
      ]
    },
    {
      id: 'agrafort-landmark-4',
      destinationId: 'agra-fort',
      name: 'Diwan-i-Aam (Hall of Public Audience)',
      hindiName: 'दीवान-ए-आम',
      category: 'Imperial Court Architecture',
      mapCoordinates: { x: 42, y: 48 },
      shortDescription: 'The vast hypostyle red sandstone hall where the Emperor administered justice to thousands of subjects.',
      detailedDescription:
        'Originally an open wooden assembly area under Akbar, Shah Jahan reconstructed this monumental hall in 1628 with 27 bays of white-plastered sandstone columns and three rows of multi-cusped arches. At the back is the raised alcove throne (Jharokha-i-Daulat Khana) where the Emperor sat adorned with gemstones.',
      historicalSignificance:
        'The primary ceremonial theater of public Mughal statecraft, where foreign ambassadors presented credentials.',
      architecturalHighlights: [
        'Three aisles of cusped arches finished in gleaming white shell plaster (chunam).',
        'Inlaid white marble imperial throne canopy with pietra dura floral motifs.',
        'Raised sandstone podium where court clerks (Wazirs) received petitions.'
      ],
      gallery: [
        {
          id: 'af-l4-img1',
          url: '/images/destinations/agra-fort.jpg',
          caption: 'The vast colonnade of Diwan-i-Aam.',
          alt: 'Diwan-i-Aam at Agra Fort',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Agra Fort Monograph #251',
          url: 'https://whc.unesco.org/en/list/251/',
          authorOrPublisher: 'UNESCO World Heritage Centre'
        }
      ]
    },
    {
      id: 'agrafort-landmark-5',
      destinationId: 'agra-fort',
      name: 'Diwan-i-Khas (Hall of Private Audience)',
      hindiName: 'दीवान-ए-खास',
      category: 'Imperial Privy Council',
      mapCoordinates: { x: 62, y: 38 },
      shortDescription: 'An exquisite marble pavilion with double columns, where the black marble throne of Jahangir overlooks the Yamuna.',
      detailedDescription:
        'Erected in 1635, this white marble pavilion consists of two halls connected by three delicate cusped arches. Outside on the open river terrace rests the monumental Black Marble Throne (Takht-i-Jahangir) carved from a single slab of Belgian black slate in Allahabad in 1602.',
      historicalSignificance:
        'Reserved exclusively for confidential state discussions with chief ministers, commanders, and honored foreign diplomats.',
      architecturalHighlights: [
        'Coupled marble columns with floral capitals inlaid with lapis lazuli and jasper.',
        'Black marble throne bearing Persian inscriptions and royal chronograms.',
        'Elevated open terrace commanding panoramic views across the river plain.'
      ],
      gallery: [
        {
          id: 'af-l5-img1',
          url: '/images/destinations/agra-fort.jpg',
          caption: 'Delicate double columns of the Diwan-i-Khas.',
          alt: 'Diwan-i-Khas at Agra Fort',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Imperial Inscriptions of Agra Fort',
          url: 'https://asi.nic.in/agra-fort-agra/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'agrafort-landmark-6',
      destinationId: 'agra-fort',
      name: 'Musamman Burj (Octagonal Tower)',
      hindiName: 'मुसम्मन बुर्ज (अष्टकोणीय बुर्ज)',
      category: 'Imperial Palatial Towers',
      mapCoordinates: { x: 74, y: 44 },
      shortDescription: 'The octagonal white marble tower where Shah Jahan spent his final years gazing at the Taj Mahal.',
      detailedDescription:
        'Perched dramatically over the river on the eastern rampart, the Musamman Burj is an octagonal multi-storey tower built by Shah Jahan for Mumtaz Mahal. It features exquisite pierced marble jali screens, floral pietra dura inlay, and a central scalloped fountain basin. In this tower, Shah Jahan was kept under house arrest by Aurangzeb until his death in 1666.',
      historicalSignificance:
        'Poignant monument of imperial tragedy and artistic perfection, offering an unbroken line of sight to the Taj Mahal downstream.',
      architecturalHighlights: [
        'Delicate floral pietra dura inlays covering every marble surface.',
        'Octagonal pierced marble lattice balustrades filtering cool river winds.',
        'Pachisi courtyard paved in black and white marble squares for imperial board games.'
      ],
      gallery: [
        {
          id: 'af-l6-img1',
          url: '/images/destinations/agra-fort.jpg',
          caption: 'Musamman Burj projecting over the Yamuna River.',
          alt: 'Musamman Burj at Agra Fort',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'The Incarceration of Shah Jahan: Historic Records',
          url: 'https://whc.unesco.org/en/list/251/',
          authorOrPublisher: 'UNESCO Heritage Monograph'
        }
      ]
    }
  ],
  timeline: [
    {
      year: '1565',
      title: 'Akbar Begins Construction',
      description: 'Emperor Akbar demolishes the ruined brick fort of Badalgarh and begins erecting red sandstone ramparts.'
    },
    {
      year: '1573',
      title: 'Sandstone Citadel Completed',
      description: 'The monumental double-walled defense system and Jahangiri Mahal are finished after eight years of work.'
    },
    {
      year: '1628',
      title: 'Shah Jahan’s Marble Additions',
      description: 'Shah Jahan rebuilds core audience halls and palaces in pure white Makrana marble.'
    },
    {
      year: '1658',
      title: 'Shah Jahan Confined',
      description: 'Aurangzeb seizes power; Shah Jahan is imprisoned within the Musamman Burj.'
    },
    {
      year: '1983',
      title: 'UNESCO World Heritage Inscription',
      description: 'Inscribed on the UNESCO World Heritage List under Criterion (iii) as a masterpiece of Mughal architecture.'
    }
  ],
  quickFacts: [
    { label: 'Reconstructed By', value: 'Mughal Emperor Akbar (1565–1573)' },
    { label: 'Key Additions By', value: 'Jahangir & Shah Jahan' },
    { label: 'Rampart Circumference', value: '2.5 kilometers (1.5 miles)' },
    { label: 'Wall Height', value: '21 meters (70 feet)' },
    { label: 'UNESCO Ref', value: 'Inscription #251 (1983)' }
  ],
  architecturalSignificance:
    'Represents an extraordinary architectural evolution from Akbar’s muscular, synthesis-driven red sandstone military fortress to Shah Jahan’s refined, delicate white marble palatial retreat.',
  culturalSignificance:
    'The premier power center of the Mughal Empire during its golden age, housing four successive emperors and serving as the capital of northern India.',
  historicalReferences: [
    {
      title: 'Agra Fort — UNESCO World Heritage Centre',
      organization: 'UNESCO World Heritage Centre',
      url: 'https://whc.unesco.org/en/list/251/',
      relevantClaim: 'Inscribed in 1983 as an outstanding example of Mughal architecture and imperial residential fortification.',
      lastVerifiedDate: '2026-11'
    },
    {
      title: 'Agra Fort, Agra — Archaeological Survey of India',
      organization: 'Archaeological Survey of India (ASI)',
      url: 'https://asi.nic.in/agra-fort-agra/',
      relevantClaim: 'Centrally protected Monument of National Importance under the administrative custody of ASI Agra Circle.',
      lastVerifiedDate: '2026-11'
    }
  ],
  assetCredits: [
    {
      assetName: 'Agra Fort Architectural Diagram',
      source: 'NewArambh Open Heritage Library',
      creator: 'NewArambh Curatorial Team',
      license: 'CC-BY 4.0'
    }
  ],
  stats: {
    estimatedVisitMinutes: 22,
    hotspotsCount: 6,
    yearBuilt: '1573 CE'
  },
  tags: ['UNESCO', 'Mughal', 'Agra', 'Sandstone', 'Marble', 'Akbar', 'Shah Jahan', 'Fortress'],
  mapConfig: {
    viewBox: '0 0 500 500',
    schematicDisclaimer: 'Schematic educational site map — not to scale.',
    aspectRatio: '1/1'
  }
};
