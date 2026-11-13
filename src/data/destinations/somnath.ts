import { Destination } from '@/types/destination';

export const somnathDestination: Destination = {
  id: 'somnath',
  slug: 'somnath',
  name: 'Somnath Temple',
  shortName: 'Somnath Mandir',
  hindiName: 'सोमनाथ मंदिर (प्रभात पाटन)',
  subtitle: 'The eternal Jyotirlinga shrine of Lord Shiva rising upon the Arabian Sea coast',
  description:
    'A revered Hindu pilgrimage destination traditionally celebrated as the first (Adya) among the twelve sacred Jyotirlinga shrines of India. Reconstructed in magnificent Chaulukya (Kailash Mahameru Prasad) architectural style and dedicated to the nation by President Dr. Rajendra Prasad in 1951.',
  detailedHistory: [
    'Mentioned in the Rigveda and the Skanda Purana’s Prabhasa Khanda, the shrine at Prabhas Patan has been a paramount pilgrimage center for millennia, situated at the sacred confluence of the mythical Saraswati, Hiran, and Kapila rivers.',
    'Over centuries, the temple witnessed successive destructions and faithful reconstructions by royal patrons including the Maitrakas of Vallabhi, the Chaulukya King Kumarapala, and the Maratha queen Ahilyabai Holkar of Indore in 1783.',
    'Following Indian independence in 1947, Deputy Prime Minister Sardar Vallabhbhai Patel pledged the reconstruction of the grand temple. Guided by master architect Prabhashankar Sompura, the current temple was built in classical Chaulukya sandstone masonry, culminating in its formal consecration in May 1951.'
  ],
  location: 'Prabhas Patan, Gir Somnath, Gujarat, India',
  city: 'Prabhas Patan, Veraval',
  state: 'Gujarat',
  country: 'India',
  period: '1951 CE Reconstruction (Ancient Holy Site)',
  category: 'religious',
  categoryLabel: 'Religious Places & Temples',
  heritageClassification: 'cultural',
  officialUrl: 'https://girsomnath.nic.in/tourist-place/the-somnath-temple/',
  thumbnailUrl: '/images/destinations/somnath-thumb.jpg',
  heroImageUrl: '/images/destinations/somnath.jpg',
  galleryImages: [
    {
      url: '/images/destinations/somnath.jpg',
      caption: 'The majestic sandstone Shikhara of Somnath Temple fronting the Arabian Sea.',
      credit: 'Shree Somnath Trust Public Documentation',
      alt: 'Somnath Temple in Prabhas Patan, Gujarat'
    }
  ],
  reconstructionType: 'Schematic Digital Exploration',
  availableModes: ['map', 'tour', 'inspect'],
  landmarks: [
    {
      id: 'somnath-landmark-1',
      destinationId: 'somnath',
      name: 'Main Temple Exterior',
      hindiName: 'मंदिर का मुख्य बहिर्भाग',
      category: 'Chaulukya Temple Architecture',
      mapCoordinates: { x: 50, y: 50 },
      shortDescription: 'The colossal yellow sandstone temple constructed in the classical Kailash Mahameru Prasad architectural plan.',
      detailedDescription:
        'The main temple is constructed entirely of dressed golden sandstone from Dhrangadhra quarries, assembled without modern cement or iron bars using ancient interlocking stone joinery. The layout comprises the Garbhagriha (sanctum sanctorum), the intermediate Antarala, the spacious Gudhamandapa (assembly hall), and three grand entrance porches (Mukhamandapas).',
      historicalSignificance:
        'A triumphant 20th-century revival of medieval Indian temple architecture, supervised by master Sompura sthapatis.',
      architecturalHighlights: [
        'Built strictly in accordance with classical Shilpa Shastra canons.',
        'High stone plinth (Pitha) carved with tiered elephant, horse, and human friezes.',
        'Triple-columned porticos facing north, south, and east.'
      ],
      gallery: [
        {
          id: 'sn-l1-img1',
          url: '/images/destinations/somnath.jpg',
          caption: 'Golden sandstone exterior of Somnath Temple.',
          alt: 'Somnath Temple exterior',
          credit: 'Shree Somnath Trust'
        }
      ],
      sourceReferences: [
        {
          title: 'The Somnath Temple — District Administration Gir Somnath',
          url: 'https://girsomnath.nic.in/tourist-place/the-somnath-temple/',
          authorOrPublisher: 'Government of Gujarat'
        }
      ]
    },
    {
      id: 'somnath-landmark-2',
      destinationId: 'somnath',
      name: 'Main Shikhara and Kalash',
      hindiName: 'मुख्य शिखर एवं स्वर्ण कलश',
      category: 'Temple Spire & Finials',
      mapCoordinates: { x: 50, y: 44 },
      shortDescription: 'The soaring 155-foot pyramidal Shikhara crowned with a massive 10-tonne gold-plated Kalash and flag mast.',
      detailedDescription:
        'Soaring 155 feet (47 meters) above the coastal sands, the main Shikhara is composed of intricate cluster spirelets (Urushringas) ascending in rhythmic tiers toward the crowning Amalaka. Atop the spire rests a solid stone Kalash weighing nearly 10 tonnes, gold-plated with copper, supporting a 27-foot-tall flag pole that carries the sacred temple Dhwaja.',
      historicalSignificance:
        'The defining silhouette of Somnath, visible miles away across the Arabian Sea to returning fishing vessels and pilgrims.',
      architecturalHighlights: [
        '155-foot tall multi-turreted Nagara-style Chaulukya tower.',
        'Massive ribbed Amalaka stone ring crowning the spire.',
        'Golden Kalash and 27-foot flag pole carrying the saffron flag depicting the Trishul.'
      ],
      gallery: [
        {
          id: 'sn-l2-img1',
          url: '/images/destinations/somnath.jpg',
          caption: 'The soaring 155-foot Shikhara of Somnath Temple.',
          alt: 'Somnath Shikhara and Kalash',
          credit: 'District Tourism Portal Gir Somnath'
        }
      ],
      sourceReferences: [
        {
          title: 'Sompura Architecture of Somnath',
          url: 'https://girsomnath.nic.in/tourist-place/the-somnath-temple/',
          authorOrPublisher: 'Shree Somnath Trust Research Archives'
        }
      ]
    },
    {
      id: 'somnath-landmark-3',
      destinationId: 'somnath',
      name: 'Architectural Carvings & Mandapa',
      hindiName: 'उत्कीर्ण प्रस्तर शिल्प एवं नृत्य मंडप',
      category: 'Stone Sculptural Friezes',
      mapCoordinates: { x: 50, y: 58 },
      shortDescription: 'Exquisitely sculpted horizontal bands depicting celestial dancers, musicians, deities, and sacred flora.',
      detailedDescription:
        'The outer walls of the Gudhamandapa and sanctum are covered in continuous horizontal stone courses (Tharas). The Gajathara (elephant band), Asvathara (horse band), and Narathara (human narrative band) are capped by majestic standing figures of Lord Shiva in his diverse manifestations, accompanied by Brahma, Vishnu, Surya, and the Ashta Dikpalas.',
      historicalSignificance:
        'Exemplifies traditional Gujarati stone craftsmanship preserving oral sculptural traditions uninterrupted for centuries.',
      architecturalHighlights: [
        'Hundreds of individual hand-chiseled sandstone deities in recessed niches.',
        'Domed mandapa ceiling carved with concentric lotus petal corbels.',
        'Heavy fluted stone columns with bracket capitals bearing flying celestial figures.'
      ],
      gallery: [
        {
          id: 'sn-l3-img1',
          url: '/images/destinations/somnath.jpg',
          caption: 'Carved sculptural friezes on the southern mandapa wall.',
          alt: 'Carvings at Somnath Temple',
          credit: 'Shree Somnath Trust'
        }
      ],
      sourceReferences: [
        {
          title: 'The Art and Architecture of Somnath',
          url: 'https://girsomnath.nic.in/tourist-place/the-somnath-temple/',
          authorOrPublisher: 'Gujarat Tourism'
        }
      ]
    },
    {
      id: 'somnath-landmark-4',
      destinationId: 'somnath',
      name: 'Temple Surroundings & Digvijay Dwar',
      hindiName: 'परिसर एवं दिग्विजय द्वार',
      category: 'Sacred Courtyard & Portals',
      mapCoordinates: { x: 50, y: 72 },
      shortDescription: 'The spacious granite-paved prakara courtyard entered via the monumental Digvijay Dwar gateway.',
      detailedDescription:
        'The temple is enclosed within a broad fortified courtyard paved in polished granite. Visitors enter through the Digvijay Dwar, a monumental ceremonial gateway named in honor of Jam Saheb Digvijaysinhji of Nawanagar, a key patron of the temple’s modern revival. Also in the courtyard stands the historic Baan Stambh (Arrow Pillar).',
      historicalSignificance:
        'A serene gathering ground accommodating thousands of pilgrims daily, providing sheltered corridors and sacred pradakshina paths.',
      architecturalHighlights: [
        'Monumental multi-storey Digvijay Dwar gatehouse with carved balconies.',
        'Historic Baan Stambh (Arrow Pillar) pointing directly southward.',
        'Spacious coastal perimeter wall shielding the complex from tidal squalls.'
      ],
      gallery: [
        {
          id: 'sn-l4-img1',
          url: '/images/destinations/somnath.jpg',
          caption: 'Digvijay Dwar gateway and the granite temple courtyard.',
          alt: 'Temple surroundings at Somnath',
          credit: 'Gujarat Tourism Public Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Pilgrimage Infrastructure at Somnath',
          url: 'https://girsomnath.nic.in/tourist-place/the-somnath-temple/',
          authorOrPublisher: 'District Administration Gir Somnath'
        }
      ]
    },
    {
      id: 'somnath-landmark-5',
      destinationId: 'somnath',
      name: 'Arabian Sea-Facing Setting & Baan Stambh',
      hindiName: 'अरब सागर तटीय प्राचीर एवं बाण स्तंभ',
      category: 'Coastal Setting & Ancient Geography',
      mapCoordinates: { x: 50, y: 32 },
      shortDescription: 'The dramatic sea-facing cliff terrace and the ancient Baan Stambh indicating an unobstructed sea path to Antarctica.',
      detailedDescription:
        'The temple is built right at the water’s edge where the roaring waves of the Arabian Sea crash against the high stone sea-wall. In the courtyard stands the famous Baan Stambh (Arrow Pillar) with an ancient Sanskrit inscription stating that from this point on the globe, an arrow travels south to the South Pole (Antarctica) without encountering a single landmass.',
      historicalSignificance:
        'A testament to the astonishing geographical knowledge of ancient Indian navigators and astronomers.',
      architecturalHighlights: [
        'Heavy fortified basalt sea-wall engineered to withstand monsoon tidal surges.',
        'Baan Stambh arrow marker pointing due South across the open ocean.',
        'Sea-promenade walkway offering breathtaking sunset views over the coastal waters.'
      ],
      gallery: [
        {
          id: 'sn-l5-img1',
          url: '/images/destinations/somnath.jpg',
          caption: 'The temple sea-wall overlooking the crashing Arabian Sea waves.',
          alt: 'Arabian Sea setting of Somnath',
          credit: 'Gujarat Tourism'
        }
      ],
      sourceReferences: [
        {
          title: 'The Arrow Pillar of Somnath',
          url: 'https://girsomnath.nic.in/tourist-place/the-somnath-temple/',
          authorOrPublisher: 'Shree Somnath Trust'
        }
      ]
    },
    {
      id: 'somnath-landmark-6',
      destinationId: 'somnath',
      name: 'Triveni Sangam (Nearby Sacred Confluence)',
      hindiName: 'त्रिवेणी संगम (पवित्र संगम स्थल)',
      category: 'Sacred Hydrological Geography',
      mapCoordinates: { x: 78, y: 78 },
      shortDescription: 'A separately identified sacred river confluence 2km east, where Hiran, Kapila, and Saraswati rivers meet the ocean.',
      detailedDescription:
        'Located approximately 2 kilometers east of the main temple complex, the Triveni Sangam is the holy confluence where the rivers Hiran, Kapila, and the subterranean Saraswati meet the Arabian Sea. It is traditionally revered as a sacred spot for spiritual ablutions and ancestor rites, and marks the vicinity where Lord Krishna completed his earthly pastimes (Dehotsarg Teerth).',
      historicalSignificance:
        'Separately identified sacred location of immense antiquity, inextricably linked to the religious sanctity of the Somnath pilgrimage circuit.',
      architecturalHighlights: [
        'Stone ghat steps descending to the river confluence.',
        'Ancient shrines and parasols dedicated to Lord Krishna and Baladeva.',
        'Serene confluence view where tranquil river currents blend into sea waves.'
      ],
      gallery: [
        {
          id: 'sn-l6-img1',
          url: '/images/destinations/somnath.jpg',
          caption: 'Stepped ghats at the sacred Triveni Sangam.',
          alt: 'Triveni Sangam near Somnath',
          credit: 'Gujarat Tourism Public Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Triveni Sangam and Dehotsarg Teerth',
          url: 'https://girsomnath.nic.in/tourist-place/the-somnath-temple/',
          authorOrPublisher: 'District Administration Gir Somnath'
        }
      ]
    }
  ],
  timeline: [
    {
      year: 'c. 1st Mill. BCE',
      title: 'Ancient Prabhas Teerth Mentioned',
      description: 'Prabhas Patan is venerated in the Rigveda and Mahabharata as a holy seaside shrine of the Moon God Chandra.'
    },
    {
      year: '1169 CE',
      title: 'Kumarapala’s Stone Temple',
      description: 'Chaulukya King Kumarapala constructs a grand stone temple in the majestic Kailash Mahameru style.'
    },
    {
      year: '1783 CE',
      title: 'Ahilyabai Holkar’s Shrine',
      description: 'Queen Ahilyabai Holkar of Indore constructs a protected underground Shiva temple nearby to preserve worship.'
    },
    {
      year: '1947 CE',
      title: 'Sardar Patel’s Pledge',
      description: 'Sardar Vallabhbhai Patel visits Prabhas Patan and pledges the public reconstruction of the historic temple.'
    },
    {
      year: '1951 CE',
      title: 'Pran Pratishtha Consecration',
      description: 'President Dr. Rajendra Prasad dedicates the newly completed Chaulukya temple to the Indian nation.'
    }
  ],
  quickFacts: [
    { label: 'Deity', value: 'Lord Shiva (First of 12 Jyotirlingas)' },
    { label: 'Architectural Style', value: 'Chaulukya / Kailash Mahameru Prasad' },
    { label: 'Chief Architect', value: 'Prabhashankar Sompura' },
    { label: 'Shikhara Height', value: '155 feet (47 meters)' },
    { label: 'Crowning Kalash', value: '10 tonnes gold-plated stone' },
    { label: 'Classification', value: 'Culturally Significant (Protected Pilgrimage)' }
  ],
  architecturalSignificance:
    'Built without modern iron or concrete using classical interlocked dry-sandstone joinery. The multi-tiered Shikhara, projecting pillared porches, and deeply carved horizontal friezes showcase the living traditions of the Sompura master builder community of Gujarat.',
  culturalSignificance:
    'Revered across India as the "Shrine Eternal," standing as a symbol of cultural resilience and sacred devotion against centuries of destruction and reconstruction.',
  historicalReferences: [
    {
      title: 'The Somnath Temple — District Administration Gir Somnath',
      organization: 'Government of Gujarat',
      url: 'https://girsomnath.nic.in/tourist-place/the-somnath-temple/',
      relevantClaim: 'Official district portal describing the temple history, architecture, and sacred pilgrimage geography.',
      lastVerifiedDate: '2026-11'
    },
    {
      title: 'Shree Somnath Trust Official Records',
      organization: 'Shree Somnath Trust',
      url: 'https://girsomnath.nic.in/tourist-place/the-somnath-temple/',
      relevantClaim: 'Statutory religious and cultural trust administering the temple complex under Gujarat state trust legislation.',
      lastVerifiedDate: '2026-11'
    }
  ],
  assetCredits: [
    {
      assetName: 'Somnath Temple Architectural Schematic Vector',
      source: 'NewArambh Open Heritage Library',
      creator: 'NewArambh Curatorial Team',
      license: 'CC-BY 4.0'
    }
  ],
  stats: {
    estimatedVisitMinutes: 25,
    hotspotsCount: 6,
    yearBuilt: '1951 CE'
  },
  tags: ['Cultural', 'Gujarat', 'Somnath', 'Jyotirlinga', 'Shiva', 'Chaulukya', 'Arabian Sea', 'Temple'],
  mapConfig: {
    viewBox: '0 0 500 500',
    schematicDisclaimer: 'Schematic educational site map — not to scale.',
    aspectRatio: '1/1'
  }
};
