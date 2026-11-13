import { Destination } from '@/types/destination';

export const champanerPavagadhDestination: Destination = {
  id: 'champaner-pavagadh',
  slug: 'champaner-pavagadh',
  name: 'Champaner-Pavagadh Archaeological Park',
  shortName: 'Champaner-Pavagadh',
  hindiName: 'चांपानेर-पावागढ़ पुरातत्व उद्यान',
  subtitle: 'The medieval capital landscape of fortifications, grand Sultanate mosques, and sacred hill shrines',
  description:
    'A magnificent concentration of largely unexcavated archaeological and living heritage spanning from the 8th to 16th centuries. Set against the dramatic volcanic peak of Pavagadh Hill, featuring monumental mosques of the Gujarat Sultanate, ancient Hindu fortresses, and water harvesting structures.',
  detailedHistory: [
    'Founded in the 8th century by Vanraj Chavda of the Chavda Kingdom and later held by the Khichi Chauhan Rajputs who fortified the imposing volcanic outcrop of Pavagadh Hill.',
    'In 1484, Sultan Mahmud Begada of the Gujarat Sultanate conquered the citadel after a 20-month siege and made Champaner his imperial capital (renamed Muhammadabad), initiating a golden age of Indo-Islamic mosque architecture that synthesized Gujarati stone carving with Islamic geometry.',
    'Abandonment occurred in 1535 following its capture by Mughal Emperor Humayun, preserving the entire 16th-century city layout, fortifications, palaces, and hydraulic engineering untouched by modern urban encroachment.'
  ],
  location: 'Panchmahal, Gujarat, India',
  city: 'Champaner',
  state: 'Gujarat',
  country: 'India',
  period: '8th–16th Century CE (Chauhan & Gujarat Sultanate)',
  category: 'archaeological',
  categoryLabel: 'Archaeological Sites',
  heritageClassification: 'unesco',
  unescoInscriptionYear: 2004,
  unescoUrl: 'https://whc.unesco.org/en/list/1101/',
  officialUrl: 'https://asi.nic.in/champaner-pavagadh-archaeological-park/',
  thumbnailUrl: '/images/destinations/champaner-thumb.jpg',
  heroImageUrl: '/images/destinations/champaner.jpg',
  galleryImages: [
    {
      url: '/images/destinations/champaner.jpg',
      caption: 'Jami Masjid’s monumental minarets set against the volcanic slopes of Pavagadh Hill.',
      credit: 'Archaeological Survey of India Heritage Archive',
      alt: 'Champaner-Pavagadh Archaeological Park in Gujarat'
    }
  ],
  reconstructionType: 'Schematic Digital Exploration',
  availableModes: ['map', 'tour', 'inspect'],
  landmarks: [
    {
      id: 'champaner-landmark-1',
      destinationId: 'champaner-pavagadh',
      name: 'Jami Masjid',
      hindiName: 'जामा मस्जिद',
      category: 'Monumental Sultanate Mosques',
      mapCoordinates: { x: 50, y: 55 },
      shortDescription: 'The crowning masterpiece of the Gujarat Sultanate style, featuring two 30-meter carved minarets and 172 stone pillars.',
      detailedDescription:
        'Completed in 1508 CE by Sultan Mahmud Begada, the Jami Masjid is widely celebrated as one of the finest mosques in western India. Its central entrance portal is flanked by twin five-storey minarets intricately carved with floral arabesques and geometric bands. The prayer hall features a three-tier central dome that draws natural ventilation and soft daylight.',
      historicalSignificance:
        'The primary congregational mosque of Sultan Mahmud Begada’s capital, embodying the absolute pinnacle of Gujarati Islamic architecture.',
      architecturalHighlights: [
        'Twin 30-meter high carved stone minarets with delicate balcony projections.',
        'Prayer hall supported by 172 intricately sculpted stone pillars.',
        'High central dome raised on an octagonal clerestory filtering natural air and light.',
        'Seven mihrabs adorned with delicate perforated stone jali latticework.'
      ],
      gallery: [
        {
          id: 'cp-l1-img1',
          url: '/images/destinations/champaner.jpg',
          caption: 'Facade and minarets of the Jami Masjid.',
          alt: 'Jami Masjid at Champaner',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Champaner-Pavagadh Archaeological Park Inscription #1101',
          url: 'https://whc.unesco.org/en/list/1101/',
          authorOrPublisher: 'UNESCO World Heritage Centre'
        }
      ]
    },
    {
      id: 'champaner-landmark-2',
      destinationId: 'champaner-pavagadh',
      name: 'Kevada Masjid and Cenotaph',
      hindiName: 'केवड़ा मस्जिद एवं छतरी',
      category: 'Sultanate Mosque & Tombs',
      mapCoordinates: { x: 38, y: 65 },
      shortDescription: 'A serene stone mosque situated amidst orchards, flanked by a square floral cenotaph pavilion with fluted columns.',
      detailedDescription:
        'Built during the late 15th century, Kevada Masjid is distinguished by its harmonious relationship with the natural landscape. Opposite the prayer hall stands an elegant open cenotaph pavilion with four corner minarets and carved floral lintels, set within traditional water-harvesting cistern channels.',
      historicalSignificance:
        'Exemplifies the integration of mortuary architecture, garden settings, and hydraulic cooling in provincial Sultanate planning.',
      architecturalHighlights: [
        'Central prayer hall entrance flanked by fluted minarets with carved moldings.',
        'Freestanding square cenotaph with carved eaves and lotus dome.',
        'Sunken rainwater holding cistern integrated directly beneath the ablution court.'
      ],
      gallery: [
        {
          id: 'cp-l2-img1',
          url: '/images/destinations/champaner.jpg',
          caption: 'Kevada Masjid and the open cenotaph pavilion.',
          alt: 'Kevada Masjid at Champaner',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Mosques of the Gujarat Sultanate',
          url: 'https://asi.nic.in/champaner-pavagadh-archaeological-park/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'champaner-landmark-3',
      destinationId: 'champaner-pavagadh',
      name: 'Nagina Masjid (The Jewel Mosque)',
      hindiName: 'नगीना मस्जिद',
      category: 'Refined Stone Architecture',
      mapCoordinates: { x: 62, y: 65 },
      shortDescription: 'The "Jewel Mosque", sculpted from gleaming white stone with exquisite geometric carvings and an ornate tomb canopy.',
      detailedDescription:
        'Constructed in pure white stone, Nagina ("Jewel") Masjid is known for its pristine craftsmanship and delicate proportions. Adjacent to the main prayer hall stands a domed tomb pavilion resting on a raised carved plinth adorned with horizontal geometric moldings of extraordinary delicacy.',
      historicalSignificance:
        'Celebrated for possessing the most refined and intricate stone carving among all the regional mosques of Champaner.',
      architecturalHighlights: [
        'Ornate multi-tier projecting balconies (jharokhas) on the minaret towers.',
        'Tomb plinth carved with stepped geometric and floral friezes.',
        'Perforated jali windows framing views across the surrounding forest.'
      ],
      gallery: [
        {
          id: 'cp-l3-img1',
          url: '/images/destinations/champaner.jpg',
          caption: 'Delicate stone carving of Nagina Masjid.',
          alt: 'Nagina Masjid at Champaner',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Champaner Heritage Monograph',
          url: 'https://whc.unesco.org/en/list/1101/',
          authorOrPublisher: 'UNESCO Heritage Centre'
        }
      ]
    },
    {
      id: 'champaner-landmark-4',
      destinationId: 'champaner-pavagadh',
      name: 'Sahar ki Masjid (Citadel Mosque)',
      hindiName: 'शहर की मस्जिद',
      category: 'Royal Citadel Mosques',
      mapCoordinates: { x: 35, y: 48 },
      shortDescription: 'The private royal mosque of the royal enclosure, featuring five arched portals and large fluted domes.',
      detailedDescription:
        'Located near the eastern gateway of the royal citadel (Bhadra), Sahar ki Masjid served as the private mosque for the Sultan, his nobles, and royal guards. It is characterized by five frontal arched openings, three large central domes, and two slender minarets flanking the central entrance.',
      historicalSignificance:
        'The primary state mosque directly connected to the royal palaces inside the fortified citadel of Muhammadabad.',
      architecturalHighlights: [
        'Five arched entry bays fronting a spacious paved stone court.',
        'Twin slender minarets with relief carvings of dancing leaf patterns.',
        'Large hemispherical central domes resting on squinches.'
      ],
      gallery: [
        {
          id: 'cp-l4-img1',
          url: '/images/destinations/champaner.jpg',
          caption: 'Sahar ki Masjid frontal arches.',
          alt: 'Sahar ki Masjid at Champaner',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'The Citadel of Champaner',
          url: 'https://asi.nic.in/champaner-pavagadh-archaeological-park/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'champaner-landmark-5',
      destinationId: 'champaner-pavagadh',
      name: 'Pavagadh Hill & Sacred Summit',
      hindiName: 'पावागढ़ पहाड़ी एवं कालिका माता शिखर',
      category: 'Sacred Hilltop Landscape',
      mapCoordinates: { x: 50, y: 18 },
      shortDescription: 'The 800-meter volcanic mountain carrying the sacred Kalika Mata temple, ancient caves, and Rajput fortifications.',
      detailedDescription:
        'Dominating the landscape is the dramatic volcanic ridge of Pavagadh Hill, soaring nearly 800 meters above the plains. Reached via an ancient fortified pilgrimage trail passing through defensive bastions, the summit is crowned by the revered Kalika Mata temple, making it an enduring center of Shakti worship since antiquity.',
      historicalSignificance:
        'A sacred pilgrimage destination and nearly impregnable military bastion of the Khichi Chauhan rulers before the Sultanate conquest.',
      architecturalHighlights: [
        'Natural volcanic cliff formations reinforced with medieval stone battlements.',
        'Pilgrimage stone staircase climbing through eight historic defensive gates.',
        'Summit shrine complex revered as one of the 51 sacred Shakti Peethas.'
      ],
      gallery: [
        {
          id: 'cp-l5-img1',
          url: '/images/destinations/champaner.jpg',
          caption: 'The towering peak of Pavagadh Hill rising above Champaner.',
          alt: 'Pavagadh Hill near Champaner',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Cultural Geography of Pavagadh Hill',
          url: 'https://whc.unesco.org/en/list/1101/',
          authorOrPublisher: 'UNESCO World Heritage Centre'
        }
      ]
    },
    {
      id: 'champaner-landmark-6',
      destinationId: 'champaner-pavagadh',
      name: 'Historic Fortification Areas & Gates',
      hindiName: 'ऐतिहासिक प्राचीर एवं प्रवेश द्वार',
      category: 'Military Fortifications',
      mapCoordinates: { x: 25, y: 38 },
      shortDescription: 'Concentric stone fortification walls, battlements, and bastions winding from the valley plain up to the mountain peak.',
      detailedDescription:
        'The defensive network consists of multiple concentric circuits of massive stone walls that connect the valley city to the mountain citadel. Key fortified thresholds include the Atak Gate, Medhi Gate, and Godhra Gate, engineered with arrow slits, machicolations, and elevated watchtowers.',
      historicalSignificance:
        'Illustrates the military strategy of an unassailable mountain fortress defending the trade routes between Gujarat and Malwa.',
      architecturalHighlights: [
        'Dry-stone masonry ramparts following the natural contours of the steep ridge.',
        'Defensive barbicans and multi-level soldier barracks built into the cliff faces.',
        'Rock-cut water cisterns (Talaos) built at high altitudes to sustain prolonged sieges.'
      ],
      gallery: [
        {
          id: 'cp-l6-img1',
          url: '/images/destinations/champaner.jpg',
          caption: 'Ancient stone fortification walls winding up Pavagadh.',
          alt: 'Fortifications at Champaner-Pavagadh',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Military Architecture of Pavagadh Fort',
          url: 'https://asi.nic.in/champaner-pavagadh-archaeological-park/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    }
  ],
  timeline: [
    {
      year: '746 CE',
      title: 'Founding of Champaner',
      description: 'King Vanraj Chavda founds the original settlement near the base of sacred Pavagadh Hill.'
    },
    {
      year: '1484 CE',
      title: 'Sultanate Conquest',
      description: 'Sultan Mahmud Begada captures the Chauhan fortress after a 20-month siege, establishing his capital Muhammadabad.'
    },
    {
      year: '1508 CE',
      title: 'Jami Masjid Completed',
      description: 'The monumental congregational mosque is completed as the architectural crown of the capital.'
    },
    {
      year: '1535 CE',
      title: 'Humayun’s Sack and Abandonment',
      description: 'Mughal Emperor Humayun sacks the city; the capital shifts to Ahmedabad, leaving Champaner frozen in time.'
    },
    {
      year: '2004 CE',
      title: 'UNESCO World Heritage Inscription',
      description: 'Inscribed on the UNESCO World Heritage List under Criteria (iii), (iv), (v), and (vi) as a complete medieval landscape.'
    }
  ],
  quickFacts: [
    { label: 'Built By', value: 'Chavda, Khichi Chauhan & Gujarat Sultans' },
    { label: 'Peak Period', value: '1484–1535 CE (Mahmud Begada)' },
    { label: 'Key Mountain', value: 'Pavagadh Hill (800 meters / 2,600 ft)' },
    { label: 'Protected Area', value: 'Over 1,328 hectares (3,280 acres)' },
    { label: 'UNESCO Ref', value: 'Inscription #1101 (2004)' }
  ],
  architecturalSignificance:
    'The site is the only complete and unchanged Islamic pre-Mughal city in India. It preserves a rare architectural synthesis of Hindu, Jain, and Islamic traditions alongside sophisticated water-retaining structures.',
  culturalSignificance:
    'A living landscape of continuous cultural devotion spanning centuries, where the ancient Shakti temple on Pavagadh Hill coexists with monumental 16th-century Sultanate mosques.',
  historicalReferences: [
    {
      title: 'Champaner-Pavagadh Archaeological Park — UNESCO',
      organization: 'UNESCO World Heritage Centre',
      url: 'https://whc.unesco.org/en/list/1101/',
      relevantClaim: 'Inscribed in 2004 as an outstanding concentration of archaeological, historic, and living cultural heritage.',
      lastVerifiedDate: '2026-11'
    },
    {
      title: 'Champaner-Pavagadh, Gujarat — Archaeological Survey of India',
      organization: 'Archaeological Survey of India (ASI)',
      url: 'https://asi.nic.in/champaner-pavagadh-archaeological-park/',
      relevantClaim: 'Centrally protected archaeological park under the administrative custody of ASI Vadodara Circle.',
      lastVerifiedDate: '2026-11'
    }
  ],
  assetCredits: [
    {
      assetName: 'Champaner-Pavagadh Site Plan Vector',
      source: 'NewArambh Open Heritage Library',
      creator: 'NewArambh Curatorial Team',
      license: 'CC-BY 4.0'
    }
  ],
  stats: {
    estimatedVisitMinutes: 30,
    hotspotsCount: 6,
    yearBuilt: '1508 CE'
  },
  tags: ['UNESCO', 'Gujarat', 'Champaner', 'Pavagadh', 'Mosque', 'Sultanate', 'Hill Fortress', 'Archaeology'],
  mapConfig: {
    viewBox: '0 0 500 500',
    schematicDisclaimer: 'Schematic educational site map — not to scale.',
    aspectRatio: '1/1'
  }
};
