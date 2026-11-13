import { Destination } from '@/types/destination';

export const redFortDestination: Destination = {
  id: 'red-fort',
  slug: 'red-fort',
  name: 'Red Fort Complex (Lal Qila)',
  shortName: 'Red Fort',
  hindiName: 'लाल किला परिसर',
  subtitle: 'The majestic red sandstone seat of Mughal imperial governance in Shahjahanabad',
  description:
    'A monumental 17th-century palace-fort complex built by Emperor Shah Jahan along the Yamuna River in Delhi. Known for its massive 33-meter defensive walls, vaulted bazaar, ornate marble audience halls, and the celestial Nahr-i-Behisht water system.',
  detailedHistory: [
    'In 1638, Emperor Shah Jahan decided to shift the Mughal capital from Agra to Delhi and founded the walled city of Shahjahanabad. Construction of the Red Fort (Qila-i-Mubarak, or "The Blessed Fort") commenced under the supervision of architects Ustad Ahmad and Ustad Hamid in 1639 and concluded in 1648.',
    'The fort served as the principal residence of the Mughal emperors for nearly 200 years until the revolt of 1857. It became the epicenter of cultural refinement, hosting Persian poetic gatherings, master miniature painters, and imperial court ceremonies.',
    'The complex synthesizes Persian palace architecture, Timurid geometric layouts, and indigenous Indian red sandstone craftsmanship, serving as a template for subsequent palatial architecture across northern India.'
  ],
  location: 'Old Delhi, New Delhi, India',
  city: 'New Delhi',
  state: 'Delhi',
  country: 'India',
  period: '1639–1648 CE (Mughal Empire, Shah Jahan)',
  category: 'forts-palaces',
  categoryLabel: 'Forts & Palaces',
  heritageClassification: 'unesco',
  unescoInscriptionYear: 2007,
  unescoUrl: 'https://whc.unesco.org/en/list/231/',
  officialUrl: 'https://asi.nic.in/red-fort-delhi/',
  thumbnailUrl: '/images/destinations/red-fort-thumb.jpg',
  heroImageUrl: '/images/destinations/red-fort.jpg',
  galleryImages: [
    {
      url: '/images/destinations/red-fort.jpg',
      caption: 'Monumental Lahori Gate and the octagonal ramparts of the Red Fort.',
      credit: 'Archaeological Survey of India Heritage Archive',
      alt: 'Red Fort Lahori Gate in Delhi'
    }
  ],
  reconstructionType: 'Schematic Digital Exploration',
  availableModes: ['map', 'tour', 'inspect'],
  landmarks: [
    {
      id: 'redfort-landmark-1',
      destinationId: 'red-fort',
      name: 'Lahori Gate',
      hindiName: 'लाहौरी दरवाज़ा',
      category: 'Monumental Gateways',
      mapCoordinates: { x: 18, y: 55 },
      shortDescription: 'The primary ceremonial entrance to the Red Fort, flanked by octagonal towers and crowned with white marble cupolas.',
      detailedDescription:
        'Named for its orientation toward the historical city of Lahore, this imposing red sandstone gate rises 33 meters high. Flanked by twin semi-octagonal bastions, it was later fortified with a barbican wall by Emperor Aurangzeb. Today, it is where the Prime Minister of India addresses the nation on Independence Day.',
      historicalSignificance:
        'The ceremonial threshold between the bustling urban fabric of Chandni Chowk and the imperial palace precinct.',
      architecturalHighlights: [
        'Soaring multi-tiered battlements flanked by semi-octagonal defensive towers.',
        'Seven miniature marble chhatris crowning the center parapet.',
        'Barbican outer courtyard added during Aurangzeb’s reign to protect the main entrance.'
      ],
      gallery: [
        {
          id: 'rf-l1-img1',
          url: '/images/destinations/red-fort.jpg',
          caption: 'Lahori Gate frontal elevation and defensive ramparts.',
          alt: 'Lahori Gate at Red Fort',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Red Fort Complex Inscription #231',
          url: 'https://whc.unesco.org/en/list/231/',
          authorOrPublisher: 'UNESCO World Heritage Centre'
        }
      ]
    },
    {
      id: 'redfort-landmark-2',
      destinationId: 'red-fort',
      name: 'Chatta Chowk (Meena Bazaar)',
      hindiName: 'छत्ता चौक (मीना बाज़ार)',
      category: 'Covered Palatial Markets',
      mapCoordinates: { x: 30, y: 55 },
      shortDescription: 'A rare 17th-century covered vaulted arcade lined with two-storey merchant shops.',
      detailedDescription:
        'Directly following the Lahori Gate is Chatta Chowk ("covered market"), an innovative vaulted indoor bazaar modeled after marketplaces Shah Jahan observed in Persia. Historically, high-ranking royal merchants sold luxury silks, brocades, gemstones, perfumes, and jewels directly to imperial courtiers and royal ladies.',
      historicalSignificance:
        'One of the earliest and finest examples of an enclosed commercial shopping arcade integrated within a royal fortress.',
      architecturalHighlights: [
        'Two-storey arcade spanning 70 meters in length.',
        'Central cross-vaulted octagonal hall (Chatrashala) filtering sunlight and air.',
        'Originally decorated with fine stucco plaster and floral ceiling murals.'
      ],
      gallery: [
        {
          id: 'rf-l2-img1',
          url: '/images/destinations/red-fort.jpg',
          caption: 'Vaulted corridor of the Chatta Chowk arcade.',
          alt: 'Chatta Chowk at Red Fort',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'The Red Fort, Delhi: Monograph',
          url: 'https://asi.nic.in/red-fort-delhi/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'redfort-landmark-3',
      destinationId: 'red-fort',
      name: 'Diwan-i-Aam (Hall of Public Audience)',
      hindiName: 'दीवान-ए-आम (जन साधारण सभा)',
      category: 'Imperial Audience Architecture',
      mapCoordinates: { x: 52, y: 55 },
      shortDescription: 'The grand pillared red sandstone assembly hall featuring the Emperor’s elevated marble throne jharokha.',
      detailedDescription:
        'A magnificent hypostyle pavilion measuring 540 square meters, supported by 27 multi-faceted sandstone columns dividing the space into three bays. At the rear stands the Emperor’s marble baldachin throne (Nashiman-i-Zill-i-Ilahi), adorned with Italian Florentine pietra dura inlays including depictions of Orpheus taming wild animals with his harp.',
      historicalSignificance:
        'The arena of daily imperial justice where the Emperor heard petitions from subjects and reviewed military regiments.',
      architecturalHighlights: [
        'Nine engraved cusped arches spanning the facade facing a vast open courtyard.',
        'Intricately carved white marble royal throne baldachin resting on four bulbous columns.',
        'Florentine Pietra Dura inlays crafted by European master lapidary Austin of Bordeaux.'
      ],
      gallery: [
        {
          id: 'rf-l3-img1',
          url: '/images/destinations/red-fort.jpg',
          caption: 'The pillared hall of Diwan-i-Aam showing cusped arches.',
          alt: 'Diwan-i-Aam at Red Fort',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Mughal Architecture: An Outline of Its History and Development',
          url: 'https://whc.unesco.org/en/list/231/',
          authorOrPublisher: 'Ebba Koch (UNESCO)'
        }
      ]
    },
    {
      id: 'redfort-landmark-4',
      destinationId: 'red-fort',
      name: 'Diwan-i-Khas (Hall of Private Audience)',
      hindiName: 'दीवान-ए-खास (विशिष्ट सभा)',
      category: 'Imperial Funerary & Statecraft',
      mapCoordinates: { x: 70, y: 44 },
      shortDescription: 'The pure white marble pavilion where the Peacock Throne stood, inscribed: "If there is paradise on earth, it is here."',
      detailedDescription:
        'Overlooking the Yamuna River, this exquisite white marble pavilion is supported by square fluted pillars decorated with delicate floral pietra dura work and gilded foliate carvings. Here, Shah Jahan received royal princes, ambassadors, and state ministers atop the famed jeweled Peacock Throne (Takht-i-Taus).',
      historicalSignificance:
        'The intellectual and geopolitical heart of the Mughal Empire, bearing the famous Persian couplet by Amir Khusrow on its corner arches.',
      architecturalHighlights: [
        'Polished white marble floor with open arcades framing cooling river breezes.',
        'Gilded silver ceiling and polychrome pietra dura floral dados.',
        'Central marble pedestal that originally supported the legendary Peacock Throne.'
      ],
      gallery: [
        {
          id: 'rf-l4-img1',
          url: '/images/destinations/red-fort.jpg',
          caption: 'The delicate marble arcades of Diwan-i-Khas.',
          alt: 'Diwan-i-Khas at Red Fort',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Red Fort UNESCO World Heritage Advisory Evaluation #231',
          url: 'https://whc.unesco.org/en/list/231/',
          authorOrPublisher: 'ICOMOS'
        }
      ]
    },
    {
      id: 'redfort-landmark-5',
      destinationId: 'red-fort',
      name: 'Rang Mahal (Palace of Colours)',
      hindiName: 'रंग महल (रंगों का महल)',
      category: 'Imperial Zenana Architecture',
      mapCoordinates: { x: 70, y: 65 },
      shortDescription: 'The chief residential palace for imperial consorts, featuring a sunken carved lotus fountain and mirrored ceilings.',
      detailedDescription:
        'Situated south of the Diwan-i-Khas, the Rang Mahal served as the primary residence of the chief royal wives. The palace derived its name from its vibrantly painted ceilings and mirrored mosaics (Sheesh Mahal). In the center of the hall lies an exquisite sunken marble pool carved in the form of an open blooming lotus flower.',
      historicalSignificance:
        'Central pavilion of the imperial Zenana (private women’s quarters), cooled by continuous streams of flowing canal water.',
      architecturalHighlights: [
        'Central sunken lotus-shaped marble basin with scalloped petals.',
        'Convex mirrored glass mosaics embedded into floral wall plaster.',
        'Water canal channel flowing directly through the center of the palace floor.'
      ],
      gallery: [
        {
          id: 'rf-l5-img1',
          url: '/images/destinations/red-fort.jpg',
          caption: 'Lotus fountain basin inside the Rang Mahal.',
          alt: 'Rang Mahal at Red Fort',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Monograph on the Red Fort Palaces',
          url: 'https://asi.nic.in/red-fort-delhi/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'redfort-landmark-6',
      destinationId: 'red-fort',
      name: 'Nahr-i-Behisht (Stream of Paradise)',
      hindiName: 'नहर-ए-बहिश्त (स्वर्ग की धारा)',
      category: 'Hydraulic & Landscape Engineering',
      mapCoordinates: { x: 72, y: 55 },
      shortDescription: 'A continuous water canal connecting all royal riverfront pavilions, cooling the palaces naturally.',
      detailedDescription:
        'Fed by water diverted from the Yamuna River via the historic Western Yamuna Canal, the Nahr-i-Behisht flowed continuously through the center of the Shah Burj tower, Hammam, Diwan-i-Khas, Rang Mahal, and Mumtaz Mahal. It cooled the living spaces during scorching Delhi summers and powered fountains and cascaded water chutes (chadars).',
      historicalSignificance:
        'Masterpiece of pre-modern passive microclimate cooling and hydraulic engineering inside a desert-border imperial fortress.',
      architecturalHighlights: [
        'Raised marble channel with shallow cascades (chadars) creating gentle white-noise acoustics.',
        'Continuous subterranean pressure systems powering multiple bubbling fountains.',
        'Engineered slope maintaining steady water circulation before emptying into the palace gardens.'
      ],
      gallery: [
        {
          id: 'rf-l6-img1',
          url: '/images/destinations/red-fort.jpg',
          caption: 'The marble canal running through the pavilion floors.',
          alt: 'Nahr-i-Behisht canal at Red Fort',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Hydraulic Systems in Mughal Forts',
          url: 'https://whc.unesco.org/en/list/231/',
          authorOrPublisher: 'UNESCO / ASI Research Studies'
        }
      ]
    },
    {
      id: 'redfort-landmark-7',
      destinationId: 'red-fort',
      name: 'Moti Masjid (Pearl Mosque)',
      hindiName: 'मोती मस्जिद (मुक्ता मस्जिद)',
      category: 'Imperial Sacred Architecture',
      mapCoordinates: { x: 64, y: 36 },
      shortDescription: 'A private royal mosque constructed entirely of glistening white marble by Emperor Aurangzeb in 1659.',
      detailedDescription:
        'Commissioned by Aurangzeb shortly after his accession to serve as his private place of daily worship adjacent to the royal bedchambers (Khabgah). Built entirely from fine white marble with grey veining, the prayer hall features three bulbous domes and a high brass-covered entrance door, oriented slightly askew to align precisely with Mecca.',
      historicalSignificance:
        'A jewel of later 17th-century Mughal sacred architecture, standing in intimate contrast to the monumental red sandstone surrounding it.',
      architecturalHighlights: [
        'Three ribbed bulbous domes originally covered in gilded copper.',
        'Intricate marble floor carved with outlines of individual prayer rugs (musallahs).',
        'High enclosing screen wall shielding the Emperor from the outside courtyard.'
      ],
      gallery: [
        {
          id: 'rf-l7-img1',
          url: '/images/destinations/red-fort.jpg',
          caption: 'White marble prayer hall and triple domes of Moti Masjid.',
          alt: 'Moti Masjid at Red Fort',
          credit: 'ASI Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Moti Masjid Architectural Survey',
          url: 'https://asi.nic.in/red-fort-delhi/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    }
  ],
  timeline: [
    {
      year: '1639',
      title: 'Foundation Stone Laid',
      description: 'Emperor Shah Jahan initiates construction of Shahjahanabad and the royal fortress Qila-i-Mubarak.'
    },
    {
      year: '1648',
      title: 'Formal Inauguration',
      description: 'The fortress is inaugurated as the imperial residence with grand celebrations and the installation of the Peacock Throne.'
    },
    {
      year: '1659',
      title: 'Moti Masjid Added',
      description: 'Emperor Aurangzeb constructs the private white marble Pearl Mosque inside the fort.'
    },
    {
      year: '1857',
      title: 'The Great Uprising',
      description: 'The last Mughal Emperor Bahadur Shah Zafar is captured; the fort passes to British administration.'
    },
    {
      year: '2007',
      title: 'UNESCO World Heritage Inscription',
      description: 'Inscribed on the UNESCO World Heritage List for its outstanding universal value in representing Mughal creativity and urban planning.'
    }
  ],
  quickFacts: [
    { label: 'Commissioned By', value: 'Mughal Emperor Shah Jahan' },
    { label: 'Construction Period', value: '1639–1648 CE (9 years)' },
    { label: 'Perimeter Wall Height', value: '18 to 33 meters (60–110 ft)' },
    { label: 'Primary Material', value: 'Agra Red Sandstone & Makrana Marble' },
    { label: 'Total Enclosure Area', value: '254 acres (103 hectares)' },
    { label: 'UNESCO Ref', value: 'Inscription #231 (2007)' }
  ],
  architecturalSignificance:
    'The architectural planning of the Red Fort represents the zenith of Mughal palatial design, blending Persian, Timurid, and Indian regional traditions into an integrated urban citadel that influenced later Rajasthani and Sikh fortifications.',
  culturalSignificance:
    'An enduring symbol of Indian sovereignty and historic nationhood, where the national tricolor flag is unfurled every Independence Day from the ramparts of Lahori Gate.',
  historicalReferences: [
    {
      title: 'Red Fort Complex — UNESCO World Heritage Centre',
      organization: 'UNESCO World Heritage Centre',
      url: 'https://whc.unesco.org/en/list/231/',
      relevantClaim: 'Inscribed in 2007 as an outstanding example of Mughal architecture and planning, synthesizing Persian, Timurid, and Hindu traditions.',
      lastVerifiedDate: '2026-11'
    },
    {
      title: 'Red Fort, Delhi — Archaeological Survey of India',
      organization: 'Archaeological Survey of India (ASI)',
      url: 'https://asi.nic.in/red-fort-delhi/',
      relevantClaim: 'National protected monument and museum complex under the statutory protection of the Archaeological Survey of India.',
      lastVerifiedDate: '2026-11'
    }
  ],
  assetCredits: [
    {
      assetName: 'Red Fort Architectural Elevation Vector',
      source: 'NewArambh Cultural Heritage Library',
      creator: 'NewArambh Curatorial Team',
      license: 'CC-BY 4.0'
    }
  ],
  stats: {
    estimatedVisitMinutes: 25,
    hotspotsCount: 7,
    yearBuilt: '1648 CE'
  },
  tags: ['UNESCO', 'Mughal', 'Delhi', 'Sandstone', 'Fortress', 'Shah Jahan', 'Lahori Gate', 'Palace'],
  mapConfig: {
    viewBox: '0 0 500 500',
    schematicDisclaimer: 'Schematic educational site map — not to scale.',
    aspectRatio: '1/1'
  }
};
