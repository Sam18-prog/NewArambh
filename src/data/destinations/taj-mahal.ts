import { Destination } from '@/types/destination';

export const tajMahalDestination: Destination = {
  id: 'taj-mahal',
  slug: 'taj-mahal',
  name: 'The Taj Mahal',
  shortName: 'Taj Mahal',
  hindiName: 'ताज महल',
  subtitle: 'The Crown of Palaces and eternal masterpiece of Mughal architecture',
  description:
    'An iconic white Makrana marble mausoleum complex on the Yamuna riverbank, celebrated worldwide for its perfect symmetry, soaring onion dome, four monumental minarets, and paradise Charbagh gardens.',
  detailedHistory: [
    'Commissioned in 1631 by the fifth Mughal Emperor Shah Jahan to honor his favorite chief consort, Arjumand Banu Begum (better known as Mumtaz Mahal), who died giving birth to their fourteenth child in Burhanpur.',
    'Construction commenced in 1632 under imperial architect Ustad Ahmad Lahori. Over 20,000 stone carvers, calligraphers, inlay artists, and masons worked for over 17 years until the main mausoleum was completed in 1648, with the surrounding gardens and outbuildings completed by 1653.',
    'Unlike traditional Mughal tomb layouts where the mausoleum stood at the geometric center of a walled garden, Shah Jahan elevated the tomb upon a colossal marble terrace directly overlooking the Yamuna River, transforming the entire 300-meter Charbagh garden into a dramatic ceremonial approach.'
  ],
  location: 'Agra, Uttar Pradesh, India',
  city: 'Agra',
  state: 'Uttar Pradesh',
  country: 'India',
  period: '1631–1648 CE (Mughal Empire, Shah Jahan)',
  category: 'heritage',
  categoryLabel: 'Heritage Architecture',
  heritageClassification: 'unesco',
  unescoInscriptionYear: 1983,
  unescoUrl: 'https://whc.unesco.org/en/list/252/',
  officialUrl: 'https://asi.nic.in/taj-mahal-agra/',
  thumbnailUrl: '/images/destinations/taj-mahal-thumb.jpg',
  heroImageUrl: '/images/destinations/taj-mahal.jpg',
  galleryImages: [
    {
      url: '/images/destinations/taj-mahal.jpg',
      caption: 'The white Makrana marble mausoleum mirrored in the axial Charbagh reflecting canal.',
      credit: 'UNESCO World Heritage Photographic Archive (Public Domain)',
      alt: 'The Taj Mahal at sunset reflected in the water canal'
    }
  ],
  isDemo: true,
  reconstructionType: 'Authentic 3D Digital Reconstruction',
  availableModes: ['map', 'tour', 'inspect'],
  landmarks: [
    {
      id: 'taj-landmark-1',
      destinationId: 'taj-mahal',
      name: 'Main Mausoleum (Rauza-i-Munawwara)',
      hindiName: 'मुख्य मकबरा (रौज़ा-ए-मुनव्वरा)',
      category: 'Imperial Funerary Architecture',
      mapCoordinates: { x: 50, y: 26 },
      shortDescription: 'The radiant white marble tomb chamber housing the cenotaphs of Mumtaz Mahal and Shah Jahan.',
      detailedDescription:
        'The primary mausoleum follows the hasht-bihisht ("eight paradises") Baghdadi octagonal plan with chamfered corners. Clad in pure Makrana white marble, it features four monumental arched iwans and intricate Pietra Dura gemstone inlays using lapis lazuli, jade, crystal, and carnelian.',
      historicalSignificance:
        'Serves as the resting place of Emperor Shah Jahan and Mumtaz Mahal, embodying spiritual metaphors of the Throne of God (Arsh) and Paradise described in Quranic eschatology.',
      architecturalHighlights: [
        '56.6-meter square plan with chamfered corners forming an unequal octagon.',
        'Pietra Dura (Parchin Kari) floral inlays using 28 distinct varieties of precious stones.',
        'Octagonal pierced marble jali screen enclosing the central cenotaphs.',
        'Elevated white marble terrace standing 7 meters above the Charbagh garden floor.'
      ],
      gallery: [
        {
          id: 'taj-l1-img1',
          url: '/images/destinations/taj-mahal.jpg',
          caption: 'The main octagonal mausoleum viewed from the central reflecting pool.',
          alt: 'Taj Mahal main mausoleum facade',
          credit: 'UNESCO Public Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'Taj Mahal Inscription #252',
          url: 'https://whc.unesco.org/en/list/252/',
          authorOrPublisher: 'UNESCO World Heritage Centre'
        },
        {
          title: 'Monograph on the Taj Mahal, Agra',
          url: 'https://asi.nic.in/taj-mahal-agra/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'taj-landmark-2',
      destinationId: 'taj-mahal',
      name: 'Central Bulbous Dome & Chhatris',
      hindiName: 'केंद्रीय अमृत गुंबद एवं छतरियां',
      category: 'Dome & Vault Engineering',
      mapCoordinates: { x: 50, y: 22 },
      shortDescription: 'The iconic double-shell onion dome soaring 73 meters high, flanked by four symmetrical pillared chhatris.',
      detailedDescription:
        'The bulbous dome—termed Amrud (guava dome) for its swelling outline—rises atop an elevated cylindrical drum. Built with a sophisticated double-shell structure, the inner dome preserves acoustic intimacy inside the burial chamber while the towering outer shell crowns the Agra skyline.',
      historicalSignificance:
        'Symbolizes the vault of heaven resting upon the earthly square foundation, crowned by a 9.5-meter gilded bronze Kalash finial bearing the Islamic crescent moon.',
      architecturalHighlights: [
        'Outer shell reaches 35 meters above the roof terrace; inner shell reaches 24 meters.',
        'Four octagonal pillared chhatris visually balance and anchor the central dome.',
        'Gilded bronze finial combining Hindu Kalash water-pot iconography with the Mughal crescent.'
      ],
      gallery: [
        {
          id: 'taj-l2-img1',
          url: '/images/destinations/taj-mahal.jpg',
          caption: 'The central bulbous dome flanked by corner pillared kiosks.',
          alt: 'Taj Mahal dome profile',
          credit: 'UNESCO World Heritage Centre'
        }
      ],
      sourceReferences: [
        {
          title: 'The Complete Taj Mahal and the Riverfront Gardens of Agra',
          url: 'https://whc.unesco.org/en/list/252/',
          authorOrPublisher: 'Ebba Koch (Thames & Hudson / UNESCO)'
        }
      ]
    },
    {
      id: 'taj-landmark-3',
      destinationId: 'taj-mahal',
      name: 'Four Monumental Minarets',
      hindiName: 'चार विशाल मीनारें',
      category: 'Structural & Seismic Engineering',
      mapCoordinates: { x: 71, y: 34 },
      shortDescription: 'Four 40-meter tall three-tiered minarets engineered with an intentional outward tilt for earthquake safety.',
      detailedDescription:
        'Standing at the four corners of the elevated marble plinth, each minaret is divided into three equal stages by projecting railed balconies. To protect the main tomb from seismic collapses, the towers were engineered to lean slightly outward (~0.7 degrees) so they would fall away from the mausoleum.',
      historicalSignificance:
        'Frames the central tomb into a three-dimensional spatial cube, establishing absolute bilateral symmetry across the riverfront.',
      architecturalHighlights: [
        'Over 40 meters tall from the marble terrace to the crowning bronze finials.',
        'Three cantilevered balconies supported by intricately carved corbel brackets.',
        'Calculated outward inclination as a proactive seismic defense.'
      ],
      gallery: [
        {
          id: 'taj-l3-img1',
          url: '/images/destinations/taj-mahal.jpg',
          caption: 'Corner minaret standing as a sentinel on the marble terrace.',
          alt: 'Taj Mahal minaret detail',
          credit: 'Archaeological Survey of India'
        }
      ],
      sourceReferences: [
        {
          title: 'Architectural Conservation of the Taj Mahal Minarets',
          url: 'https://asi.nic.in/taj-mahal-agra/',
          authorOrPublisher: 'Archaeological Survey of India (ASI)'
        }
      ]
    },
    {
      id: 'taj-landmark-4',
      destinationId: 'taj-mahal',
      name: 'Grand Pishtaq (Vaulted Iwan Facade)',
      hindiName: 'भव्य पिश्ताक (कुरानिक सुलेख)',
      category: 'Facade & Epigraphy',
      mapCoordinates: { x: 50, y: 32 },
      shortDescription: 'The monumental pointed arch portal framing the entrance, bordered by optically corrected Quranic calligraphy.',
      detailedDescription:
        'The monumental 33-meter southern archway (Pishtaq) features recessed vaulting adorned with black marble calligraphy executed by royal calligrapher Amanat Khan Shirazi. Letters gradually enlarge toward the top so they appear uniformly proportioned from the ground.',
      historicalSignificance:
        'Marks the ceremonial threshold into the sacred funerary space, concluding with the Quranic invitation: "Enter thou into My Paradise."',
      architecturalHighlights: [
        'Pointed cusped Timurid-style vault recessed 2.5 meters into the marble facade.',
        'Optically corrected black marble Quranic calligraphy from Surah Al-Fajr.',
        'Intricate floral spandrels inlaid with semi-precious carnelian and lapis lazuli.'
      ],
      gallery: [
        {
          id: 'taj-l4-img1',
          url: '/images/destinations/taj-mahal.jpg',
          caption: 'The monumental South Pishtaq framing the main doorway.',
          alt: 'Taj Mahal South Pishtaq archway',
          credit: 'UNESCO Public Record'
        }
      ],
      sourceReferences: [
        {
          title: 'Epigraphy and Calligraphy of the Taj Mahal',
          url: 'https://asi.nic.in/taj-mahal-agra/',
          authorOrPublisher: 'Archaeological Survey of India (ASI Epigraphical Series)'
        }
      ]
    },
    {
      id: 'taj-landmark-5',
      destinationId: 'taj-mahal',
      name: 'Charbagh Gardens & Reflecting Pool',
      hindiName: 'चारबाग़ एवं अल-हौज़ अल-कौसर',
      category: 'Landscape & Hydraulic Architecture',
      mapCoordinates: { x: 50, y: 64 },
      shortDescription: 'The quadripartite paradise garden layout with its axial reflecting pool mirroring the white marble monument.',
      detailedDescription:
        'Laid out according to the Persian Charbagh (four-quartered garden) concept representing the four rivers of Paradise. In the center lies the raised marble lotus tank (Al-Hawd al-Kawthar), flanked by a long reflecting canal bordered by solemn evergreen cypress trees.',
      historicalSignificance:
        'Envisioned as an earthly recreation of Jannat (Paradise), with the still waters creating a perfect double reflection of the luminous tomb.',
      architecturalHighlights: [
        'Rigid four-part geometric division separated by axial stone walkways and channels.',
        'Central raised marble tank with scalloped edges and five fountain spouts.',
        'Subterranean copper piping engineered to equalize pressure across all fountains simultaneously.'
      ],
      gallery: [
        {
          id: 'taj-l5-img1',
          url: '/images/destinations/taj-mahal.jpg',
          caption: 'The axial reflecting canal capturing the mirror reflection of the Taj Mahal.',
          alt: 'Taj Mahal reflecting pool and garden',
          credit: 'UNESCO World Heritage Archive'
        }
      ],
      sourceReferences: [
        {
          title: 'The Mughal Garden: Interpretation, Conservation and Implications',
          url: 'https://whc.unesco.org/en/list/252/',
          authorOrPublisher: 'M. Hussain & J. L. Wescoat (UNESCO)'
        }
      ]
    }
  ],
  timeline: [
    {
      year: '1631',
      title: 'Death of Mumtaz Mahal',
      description: 'Empress Mumtaz Mahal passes away in Burhanpur. Emperor Shah Jahan vows to erect an unprecedented memorial.'
    },
    {
      year: '1632',
      title: 'Construction Begins',
      description: 'Foundation wells are dug along the Yamuna River bank under chief architect Ustad Ahmad Lahori.'
    },
    {
      year: '1648',
      title: 'Main Mausoleum Completed',
      description: 'The white marble tomb, dome, and Quranic calligraphy bands are finished after 16 years of labor.'
    },
    {
      year: '1653',
      title: 'Complex Fully Inundated',
      description: 'The Charbagh gardens, Great Gate, and flanking red sandstone buildings are formally completed.'
    },
    {
      year: '1983',
      title: 'UNESCO World Heritage Inscription',
      description: 'Inscribed on the UNESCO World Heritage List under Criterion (i) as a masterpiece of human creative genius.'
    }
  ],
  quickFacts: [
    { label: 'Built By', value: 'Mughal Emperor Shah Jahan' },
    { label: 'Chief Architect', value: 'Ustad Ahmad Lahori' },
    { label: 'Construction Period', value: '1632–1653 CE (21 years)' },
    { label: 'Primary Material', value: 'Makrana White Marble from Rajasthan' },
    { label: 'Dome Height', value: '73 meters (240 feet)' },
    { label: 'UNESCO Ref', value: 'Inscription #252 (1983)' }
  ],
  architecturalSignificance:
    'Represents the highest artistic and technical peak of Mughal architecture. Features rigorous bilateral symmetry, modular proportioning based on the Shahjahani gaz unit, double-shell dome engineering, and optical perspective adjustments on the calligraphic portals.',
  culturalSignificance:
    'Universal monument to eternal devotion and Indo-Islamic cultural synthesis, celebrated in Rabindranath Tagore’s poetry as "a teardrop on the cheek of time."',
  historicalReferences: [
    {
      title: 'Taj Mahal — UNESCO World Heritage Centre',
      organization: 'UNESCO World Heritage Centre',
      url: 'https://whc.unesco.org/en/list/252/',
      relevantClaim: 'Inscribed in 1983 under Criterion (i) as the supreme achievement in the whole range of Indo-Islamic architecture.',
      lastVerifiedDate: '2026-11'
    },
    {
      title: 'Taj Mahal, Agra — Archaeological Survey of India',
      organization: 'Archaeological Survey of India (ASI)',
      url: 'https://asi.nic.in/taj-mahal-agra/',
      relevantClaim: 'Centrally protected national monument administered under the Ancient Monuments and Archaeological Sites and Remains Act.',
      lastVerifiedDate: '2026-11'
    }
  ],
  assetCredits: [
    {
      assetName: 'Taj Mahal Sunset Photograph',
      source: 'UNESCO / Unsplash Open Heritage Records',
      creator: 'Public Heritage Archives',
      license: 'Public Domain / Free Educational Use'
    }
  ],
  stats: {
    estimatedVisitMinutes: 20,
    hotspotsCount: 5,
    yearBuilt: '1648 CE'
  },
  tags: ['UNESCO', 'Mughal', 'Agra', 'Marble', 'Tomb', 'Dome', 'Minaret', 'Charbagh'],
  mapConfig: {
    viewBox: '0 0 500 500',
    schematicDisclaimer: 'Schematic educational site map — not to scale.',
    aspectRatio: '1/1'
  }
};
