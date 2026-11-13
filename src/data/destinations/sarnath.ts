import { Destination } from '@/types/destination';

export const sarnathDestination: Destination = {
  id: 'sarnath',
  slug: 'sarnath',
  name: 'Ancient Buddhist Site of Sarnath',
  shortName: 'Sarnath',
  hindiName: 'सारनाथ का प्राचीन बौद्ध स्थल',
  subtitle: 'The sacred Deer Park where Lord Buddha preached his First Sermon and set in motion the Wheel of Law',
  description:
    'One of the four paramount holy places of Buddhism, located 10 kilometers northeast of Varanasi. Comprising two inscribed UNESCO component parts: the monumental Chaukhandi Stupa and the Archaeological Remains of Sarnath including the colossal Dhamek Stupa, ancient monasteries, and the Ashokan Lion Capital pillar site.',
  detailedHistory: [
    'Following his enlightenment under the Bodhi tree at Bodh Gaya, Gautama Buddha journeyed to the Isipatana Deer Park (Mrigadava) at Sarnath in c. 528 BCE. Here he delivered his first discourse, the Dhammacakkappavattana Sutta ("Turning of the Wheel of Law"), to his five former ascetic companions, establishing the sacred Buddhist Sangha (monastic community).',
    'During the 3rd century BCE, Mauryan Emperor Ashoka visited Sarnath and erected the monumental Dharmarajika Stupa and a 15-meter polished sandstone pillar topped by the four-lion capital, which was later adopted as the official State Emblem of modern India.',
    'Sarnath flourished as a major international center of Buddhist philosophy, art, and monastic education under the Gupta and Pala dynasties (4th–12th centuries CE), known worldwide for the delicate Sarnath school of Buddhist sculpture, until its destruction in the late 12th century.'
  ],
  location: 'Varanasi, Uttar Pradesh, India',
  city: 'Varanasi',
  state: 'Uttar Pradesh',
  country: 'India',
  period: '6th Century BCE – 12th Century CE (Mauryan to Gupta)',
  category: 'religious',
  categoryLabel: 'Religious Places & Temples',
  heritageClassification: 'unesco',
  unescoInscriptionYear: 2026,
  unescoUrl: 'https://whc.unesco.org/en/list/927/',
  officialUrl: 'https://asi.nic.in/sarnath-varanasi/',
  thumbnailUrl: '/images/destinations/sarnath-thumb.jpg',
  heroImageUrl: '/images/destinations/sarnath.jpg',
  galleryImages: [
    {
      url: '/images/destinations/sarnath.jpg',
      caption: 'The towering cylindrical Dhamek Stupa rising in the sacred Deer Park of Sarnath.',
      credit: 'Archaeological Survey of India Heritage Archive',
      alt: 'Dhamek Stupa at Sarnath, Varanasi'
    }
  ],
  reconstructionType: 'Schematic Digital Exploration',
  availableModes: ['map', 'tour', 'inspect'],
  landmarks: [
    {
      id: 'sarnath-landmark-1',
      destinationId: 'sarnath',
      name: 'Chaukhandi Stupa (Component Part I)',
      hindiName: 'चौखंडी स्तूप',
      category: 'Monumental Stupa Architecture',
      mapCoordinates: { x: 50, y: 85 },
      shortDescription: 'The massive terraced brick stupa marking where the Buddha was reunited with his five former companions.',
      detailedDescription:
        'Situated 800 meters south of the main monastic precinct, Chaukhandi Stupa forms one of the two discrete component parts of the UNESCO property. Built as a terraced rectangular brick stupa during the Gupta period (4th–6th centuries CE), it was later crowned in 1588 CE with an octagonal red sandstone tower built by Raja Todar Mal’s son Govardhan to commemorate the visit of Mughal Emperor Humayun.',
      historicalSignificance:
        'A designated component part of the UNESCO World Heritage property, marking the exact geographical spot where the Buddha first met the Panchavargiya monks upon arriving in Sarnath.',
      architecturalHighlights: [
        'Multi-tiered stepped rectangular brick terraces built with ancient mud mortar.',
        'Superimposed 16th-century octagonal Mughal watchtower with arched openings.',
        'High vantage point commanding views across the entire historic landscape.'
      ],
      gallery: [
        {
          id: 'sn-l1-img1',
          url: '/images/destinations/sarnath.jpg',
          caption: 'Chaukhandi Stupa with its crowning octagonal Mughal tower.',
          alt: 'Chaukhandi Stupa at Sarnath',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Ancient Buddhist Site of Sarnath Inscription #927',
          url: 'https://whc.unesco.org/en/list/927/',
          authorOrPublisher: 'UNESCO World Heritage Centre'
        }
      ]
    },
    {
      id: 'sarnath-landmark-2',
      destinationId: 'sarnath',
      name: 'Archaeological Remains of Sarnath (Component Part II)',
      hindiName: 'सारनाथ का पुरातात्विक क्षेत्र',
      category: 'Excavated Monastic Precinct',
      mapCoordinates: { x: 50, y: 48 },
      shortDescription: 'The main protected archaeological zone encompassing excavated monastic courtyards, votive stupas, and ancient walkways.',
      detailedDescription:
        'The primary inscribed monastic area contains the excavated layers of centuries of Buddhist devotion. It includes paved circumambulatory paths (Pradakshina-pathas), clusters of hundreds of miniature votive stupas offered by pilgrims, and deep brick drainage canals that served the ancient monastic community.',
      historicalSignificance:
        'The heart of the UNESCO inscribed property, documenting continuous monastic development from the Mauryan Emperor Ashoka to the 12th century Gahadavala dynasty.',
      architecturalHighlights: [
        'Over 200 carved stone and brick votive stupas of varied historical epochs.',
        'Preserved brick circumambulatory pathways connecting ancient shrines.',
        'Paved stone courtyards reflecting centuries of international pilgrim veneration.'
      ],
      gallery: [
        {
          id: 'sn-l2-img1',
          url: '/images/destinations/sarnath.jpg',
          caption: 'Excavated monastic remains and votive stupas across Sarnath.',
          alt: 'Archaeological Remains at Sarnath',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Sarnath Excavation Reports',
          url: 'https://asi.nic.in/sarnath-varanasi/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'sarnath-landmark-3',
      destinationId: 'sarnath',
      name: 'Dhamek Stupa',
      hindiName: 'धमेख स्तूप',
      category: 'Colossal Sacred Stupas',
      mapCoordinates: { x: 50, y: 38 },
      shortDescription: 'The colossal 43.6-meter cylindrical stupa marking the revered spot where the Buddha proclaimed the Four Noble Truths.',
      detailedDescription:
        'The colossal Dhamek Stupa (from Dharma Chakra, or "Wheel of Law") is the most imposing monument at Sarnath. Built in 500 CE over an earlier Mauryan foundation, it rises to a height of 43.6 meters with a base diameter of 28 meters. Its lower stone section is covered in masterly Gupta floral scroll carvings, geometric chevrons, and swastika medallions.',
      historicalSignificance:
        'The definitive physical landmark marking the turning of the Wheel of Dharma (Dharmachakra Pravartana) and the birth of the Buddhist Sangha.',
      architecturalHighlights: [
        'Massive cylindrical stone base rising 13 meters, surmounted by a brick dome.',
        'Eight arched niches in the cardinal directions that originally held life-size Buddha statues.',
        'Intricate Gupta stone carvings displaying birds, leafy creepers, and geometric fretwork.'
      ],
      gallery: [
        {
          id: 'sn-l3-img1',
          url: '/images/destinations/sarnath.jpg',
          caption: 'Delicate Gupta floral carvings wrapping the stone base of Dhamek Stupa.',
          alt: 'Dhamek Stupa at Sarnath',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Dhamek Stupa Architectural Study',
          url: 'https://whc.unesco.org/en/list/927/',
          authorOrPublisher: 'UNESCO World Heritage Centre'
        }
      ]
    },
    {
      id: 'sarnath-landmark-4',
      destinationId: 'sarnath',
      name: 'Ancient Monastic Remains (Viharas)',
      hindiName: 'प्राचीन बौद्ध विहार (मठ)',
      category: 'Monastic Residential Architecture',
      mapCoordinates: { x: 30, y: 40 },
      shortDescription: 'The excavated brick foundations of historic Buddhist monasteries where resident monks lived and studied.',
      detailedDescription:
        'Excavations have revealed several large monasteries (Viharas I to VII), most notably the massive 12th-century Dharmachakra Jina Vihara built by Queen Kumaradevi of the Gahadavala dynasty. Each monastery typically followed a standard quadrangular plan with a central courtyard surrounded by individual monk cells and an entrance gateway.',
      historicalSignificance:
        'Provides tangible archaeological evidence of daily monastic life, institutional organization, and scholarly training in ancient India.',
      architecturalHighlights: [
        'Quadrangular brick plans with open central assembly courtyards.',
        'Individual monks’ cells with raised sleeping platforms and clay lamp niches.',
        'Ingenious brick water-well and covered drainage networks.'
      ],
      gallery: [
        {
          id: 'sn-l4-img1',
          url: '/images/destinations/sarnath.jpg',
          caption: 'Brick foundations of Monastery VII at Sarnath.',
          alt: 'Monastic Remains at Sarnath',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Buddhist Monasteries of Sarnath',
          url: 'https://asi.nic.in/sarnath-varanasi/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'sarnath-landmark-5',
      destinationId: 'sarnath',
      name: 'Archaeological and Sculptural Remains (Ashoka Pillar Site)',
      hindiName: 'अशोक स्तंभ स्थल एवं धर्मराजिका स्तूप',
      category: 'Mauryan Imperial Relics',
      mapCoordinates: { x: 65, y: 45 },
      shortDescription: 'The original sandstone pillar base of Emperor Ashoka and the sacred circular foundations of the Dharmarajika Stupa.',
      detailedDescription:
        'Near the Main Shrine lies the stone base of the famous Ashoka Pillar erected in 250 BCE. It bears an inscription warning against schisms in the Buddhist order. The magnificent four-lion capital that once crowned this column is preserved in the nearby archaeological museum and serves as the National Emblem of India.',
      historicalSignificance:
        'The physical nexus of Emperor Ashoka’s patronage of Buddhism and the source of India’s most revered national symbol.',
      architecturalHighlights: [
        'Intact lower section of the monolithic polished Chunar sandstone pillar.',
        'Mauryan Brahmi script edicts warning monks against creating division.',
        'Concentric brick foundation rings of the ancient Dharmarajika Stupa.'
      ],
      gallery: [
        {
          id: 'sn-l5-img1',
          url: '/images/destinations/sarnath.jpg',
          caption: 'Base of the Ashoka Pillar enclosed in the archaeological park.',
          alt: 'Ashoka Pillar site at Sarnath',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'The Ashokan Inscriptions and Pillars at Sarnath',
          url: 'https://whc.unesco.org/en/list/927/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    }
  ],
  timeline: [
    {
      year: 'c. 528 BCE',
      title: 'The First Sermon',
      description: 'Gautama Buddha delivers the Dhammacakkappavattana Sutta at Isipatana, founding the Buddhist Sangha.'
    },
    {
      year: 'c. 250 BCE',
      title: 'Emperor Ashoka’s Visit',
      description: 'Emperor Ashoka erects the monolithic stone pillar with the Lion Capital and builds the Dharmarajika Stupa.'
    },
    {
      year: '500 CE',
      title: 'Dhamek Stupa Reconstructed',
      description: 'The colossal Dhamek Stupa is rebuilt in carved stone and brick during the golden age of Gupta Buddhist art.'
    },
    {
      year: '1114 CE',
      title: 'Kumaradevi’s Monastery Built',
      description: 'Queen Kumaradevi constructs the grand Dharmachakra Jina Vihara, the last great Buddhist monastery at Sarnath.'
    },
    {
      year: '2026',
      title: 'UNESCO World Heritage Inscription',
      description: 'Inscribed on the UNESCO World Heritage List for its profound spiritual, historical, and architectural universal value.'
    }
  ],
  quickFacts: [
    { label: 'Religious Tradition', value: 'Buddhism (First Sermon Site)' },
    { label: 'Founding Period', value: '6th Century BCE (Buddha’s Era)' },
    { label: 'Dhamek Stupa Height', value: '43.6 meters (143 feet)' },
    { label: 'UNESCO Components', value: '2 Parts: Chaukhandi Stupa & Main Remains' },
    { label: 'National Significance', value: 'Site of the Lion Capital (Emblem of India)' },
    { label: 'UNESCO Ref', value: 'Inscription #927 (2026)' }
  ],
  architecturalSignificance:
    'Sarnath preserves over 1,500 years of Buddhist architectural evolution—from early Mauryan monolithic polished stone pillars and brick tumuli to colossal Gupta cyclopean stupas and elaborate medieval Gahadavala quadrangular viharas.',
  culturalSignificance:
    'One of the four paramount international pilgrimage destinations of world Buddhism, reverently visited by millions of pilgrims and scholars from across Asia.',
  historicalReferences: [
    {
      title: 'Ancient Buddhist Site of Sarnath — UNESCO World Heritage Centre',
      organization: 'UNESCO World Heritage Centre',
      url: 'https://whc.unesco.org/en/list/927/',
      relevantClaim: 'Inscribed in 2026 as the sacred site of Buddha’s first discourse, comprising two component parts: Chaukhandi Stupa and Archaeological Remains of Sarnath.',
      lastVerifiedDate: '2026-11'
    },
    {
      title: 'Sarnath, Varanasi — Archaeological Survey of India',
      organization: 'Archaeological Survey of India (ASI)',
      url: 'https://asi.nic.in/sarnath-varanasi/',
      relevantClaim: 'Centrally protected monument of national importance under the ASI Sarnath Circle.',
      lastVerifiedDate: '2026-11'
    }
  ],
  assetCredits: [
    {
      assetName: 'Sarnath Site Blueprint Vector',
      source: 'NewArambh Open Heritage Library',
      creator: 'NewArambh Curatorial Team',
      license: 'CC-BY 4.0'
    }
  ],
  stats: {
    estimatedVisitMinutes: 25,
    hotspotsCount: 5,
    yearBuilt: '500 CE'
  },
  tags: ['UNESCO', 'Buddhist', 'Sarnath', 'Varanasi', 'Stupa', 'Ashoka', 'Dhamek', 'Archaeology'],
  mapConfig: {
    viewBox: '0 0 500 500',
    schematicDisclaimer: 'Schematic educational site map — not to scale.',
    aspectRatio: '1/1'
  }
};
