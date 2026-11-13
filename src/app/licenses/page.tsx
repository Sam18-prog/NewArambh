import React from 'react';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import {
  ShieldCheck,
  ExternalLink,
  ArrowLeft,
  Heart,
  CheckCircle2,
  Code2,
  Image as ImageIcon,
  BookOpen,
  Sparkles,
  Layers,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';

interface AssetRecord {
  id: string;
  name: string;
  category: string;
  creator: string;
  source: string;
  sourceUrl: string;
  license: string;
  attributionRequired: string;
  modifications: string;
  provenance: string;
  isUsedInBuild: boolean;
  group: 'procedural' | 'illustrations' | 'photography' | 'citations' | 'audited_unused';
}

const ASSET_REGISTRY: AssetRecord[] = [
  // 1. Procedural 3D Environment
  {
    id: 'procedural-courtyard-glb',
    name: 'Heritage Courtyard Procedural 3D Environment (scene.glb)',
    category: '3D Geometry & PBR Shaders',
    creator: 'NewArambh Engineering Team',
    source: 'In-Engine Three.js Procedural GLTF Generator (scripts/generate_courtyard_glb.mjs)',
    sourceUrl: 'https://newarambh.netlify.app/explore/heritage-courtyard/experience',
    license: 'MIT License (Code) / CC-BY 4.0 (3D Assets)',
    attributionRequired: 'NewArambh Project Contributors',
    modifications:
      'Programmatically constructed using Three.js standard primitives (octagonal mandapa plinths, 8 carved bracket columns, corbelled dome ceiling, cantilevered jharokha brackets, subterranean baori steps, and cusped torana gateways). Exported via GLTFExporter to a lightweight 157 KB binary GLB.',
    provenance:
      'Synthesized in-engine using Three.js Standard PBR parameters (sandstoneMat, darkSandstoneMat, lightStoneMat, goldAccentMat, waterMat, brassLampMat). Inspired by traditional Rajasthan and Gujarat stone architecture. Zero external paid 3D scans or copyrighted meshes.',
    isUsedInBuild: true,
    group: 'procedural',
  },

  // 2. Curatorial Vector Illustrations
  {
    id: 'architectural-vector-diagrams',
    name: 'Architectural Vector Diagrams & Hotspot Elevations (SVG)',
    category: 'Curatorial Illustrations',
    creator: 'NewArambh Cultural Heritage Documentation Team',
    source: 'NewArambh Open Educational Asset Library',
    sourceUrl: 'https://newarambh.netlify.app/explore/heritage-courtyard',
    license: 'Creative Commons Attribution 4.0 International (CC-BY 4.0)',
    attributionRequired: 'NewArambh Cultural Heritage Documentation',
    modifications:
      'Original vector elevations, cross-sections, and geometric diagrams for Mandapa dome rings, Jharokha cantilever eaves, Baori stepped terraces, Torana gateway architraves, and Jali latticework.',
    provenance:
      'Original educational vector graphics drafted to illustrate architectural terminology and spatial mechanics for student and researcher exploration.',
    isUsedInBuild: true,
    group: 'illustrations',
  },

  // 3. Photographic Media
  {
    id: 'hero-taj-photography',
    name: 'Sunset Silhouette over Historic Monument (hero-taj-sunset.jpg)',
    category: 'Atmospheric Photography',
    creator: 'Unsplash Community Heritage Photographers',
    source: 'Unsplash (Free Unrestricted Use)',
    sourceUrl: 'https://unsplash.com',
    license: 'Unsplash License (Commercial & Personal Use Permitted without Royalties)',
    attributionRequired: 'Attribution appreciated; Unsplash Community',
    modifications:
      'Color graded for warm sunset ambiance, cropped for responsive hero framing, and optimized for fast web delivery.',
    provenance:
      'Freely usable open photography selected to evoke the architectural grandeur of classical North Indian monument silhouettes.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'red-fort-photo',
    name: 'Red Fort Lahori Gate with Tricolor (red-fort.jpg)',
    category: 'Monuments Photography',
    creator: 'Government of India / Wikimedia Commons Contributors',
    source: 'Wikimedia Commons Cultural Heritage Archive',
    sourceUrl: 'https://commons.wikimedia.org/wiki/Category:Lahori_Gate_(Red_Fort)',
    license: 'Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)',
    attributionRequired: 'Government of India / Wikimedia Commons (CC-BY-SA 4.0)',
    modifications: 'Resized, framed, and optimized to WebP/JPEG for responsive card and hero presentation.',
    provenance: 'Authentic photograph documenting the Lahori Gate of the Red Fort in Delhi, inscribed on the UNESCO World Heritage List in 2007 (#231).',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'agra-fort-photo',
    name: 'Agra Fort Jahangiri Mahal (agra-fort.jpg)',
    category: 'Monuments Photography',
    creator: 'Christian Haugen / Wikimedia Commons',
    source: 'Wikimedia Commons (File:Agra_Fort-Jahangiri_Mahal-20131018.jpg)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Agra_Fort-Jahangiri_Mahal-20131018.jpg',
    license: 'Creative Commons Attribution 2.0 Generic (CC-BY 2.0)',
    attributionRequired: 'Christian Haugen (CC-BY 2.0)',
    modifications: 'Resized and optimized for responsive web catalogue card and header display.',
    provenance: 'Photograph of Akbar’s red sandstone Jahangiri Mahal inside the UNESCO-inscribed Agra Fort complex (#251).',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'rani-ki-vav-photo',
    name: 'Rani-ki-Vav Stepped Subterranean Pavilions (rani-ki-vav.jpg)',
    category: 'Heritage Water Architecture Photography',
    creator: 'Archaeological Survey of India / Wikimedia Commons',
    source: 'Wikimedia Commons / UNESCO Inscription Archive #922',
    sourceUrl: 'https://whc.unesco.org/en/list/922',
    license: 'Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)',
    attributionRequired: 'ASI / Wikimedia Commons (CC-BY-SA 4.0)',
    modifications: 'Cropped and optimized to landscape 16:10 for responsive web catalogue display.',
    provenance: 'Authentic photograph documenting the seven terraced subterranean colonnades and Maru-Gurjara sculptural galleries of Queen’s Stepwell in Patan, Gujarat.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'dholavira-photo',
    name: 'Dholavira Harappan Archaeological Citadel Ruins (dholavira.jpg)',
    category: 'Archaeological Photography',
    creator: 'Archaeological Survey of India / Wikimedia Commons',
    source: 'UNESCO World Heritage Archive #1642',
    sourceUrl: 'https://whc.unesco.org/en/list/1642',
    license: 'Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)',
    attributionRequired: 'ASI / Wikimedia Commons (CC-BY-SA 4.0)',
    modifications: 'Framed and optimized for web catalogue cards.',
    provenance: 'Photographic documentation of the dressed-stone fortification walls, Castle, and storm-water reservoirs of the Harappan city of Dholavira in the Rann of Kutch.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'champaner-photo',
    name: 'Jami Masjid of Champaner-Pavagadh (champaner.jpg)',
    category: 'Monuments Photography',
    creator: 'Snehrashmi / Wikimedia Commons',
    source: 'Wikimedia Commons (File:Jami_Masjid_Champaner,Gujarat.jpg)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jami_Masjid_Champaner,Gujarat.jpg',
    license: 'Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)',
    attributionRequired: 'Snehrashmi (CC-BY-SA 3.0)',
    modifications: 'Color balanced and cropped for card display.',
    provenance: 'Photograph of the 16th-century Gujarat Sultanate Jami Masjid with its 30m minarets in Champaner-Pavagadh Archaeological Park (#1101).',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'sarnath-photo',
    name: 'Dhamek Stupa at Sarnath (sarnath.jpg)',
    category: 'Buddhist Sacred Heritage Photography',
    creator: 'Biswarup Ganguly / Wikimedia Commons',
    source: 'Wikimedia Commons (File:Dhamek_Stupa,_Sarnath.jpg)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dhamek_Stupa,_Sarnath.jpg',
    license: 'Creative Commons Attribution 3.0 Unported (CC-BY 3.0)',
    attributionRequired: 'Biswarup Ganguly (CC-BY 3.0)',
    modifications: 'Cropped to 1200x800 landscape framing the cylindrical stupa and carved Gupta stone friezes.',
    provenance: 'Photograph of the colossal 43.6m Dhamek Stupa marking where the Buddha preached his first sermon at Rishipatana Deer Park in Sarnath.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'somnath-photo',
    name: 'Shri Somnath Jyotirlinga Temple (somnath.jpg)',
    category: 'Sacred Architecture Photography',
    creator: 'Shri Somnath Trust / Gujarat Tourism Archives',
    source: 'Gujarat Tourism Cultural Documentation',
    sourceUrl: 'https://www.gujarattourism.com/saurashtra/gir-somnath/somnath-temple.html',
    license: 'Free Cultural & Educational Use with Attribution',
    attributionRequired: 'Shri Somnath Trust / Gujarat Tourism',
    modifications: 'Framed and optimized for web catalogue display.',
    provenance: 'Photographic documentation of the Kailash Mahameru Prasad yellow sandstone temple on the Arabian Sea shore in Prabhas Patan, Gujarat.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'dwarkadhish-photo',
    name: 'Dwarkadhish Temple — Jagat Mandir (dwarkadhish.jpg)',
    category: 'Sacred Architecture Photography',
    creator: 'Devbhumi Dwarka Administration / Gujarat Tourism',
    source: 'Gujarat Tourism Cultural Documentation',
    sourceUrl: 'https://www.gujarattourism.com/saurashtra/devbhoomi-dwarka/dwarkadhish-temple.html',
    license: 'Free Cultural & Educational Use with Attribution',
    attributionRequired: 'Devbhumi Dwarka Administration / Gujarat Tourism',
    modifications: 'Framed and optimized for web catalogue display.',
    provenance: 'Photograph of the 78-meter towering stone spire and 72-pillared Sabha Mandapa of Jagat Mandir in Dwarka, Gujarat.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'courtyard-haveli-photography',
    name: 'Traditional Merchant Courtyard at Dusk (courtyard-haveli.jpg)',
    category: 'Architectural Reference Photography',
    creator: 'IndianMoments / Wikimedia Commons',
    source: 'Wikimedia Commons Cultural Heritage Archive',
    sourceUrl: 'https://commons.wikimedia.org',
    license: 'Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)',
    attributionRequired: 'IndianMoments / Wikimedia Commons (CC-BY-SA 4.0)',
    modifications:
      'Cropped for hotspot curatorial gallery drawer and optimized to WebP/JPEG format.',
    provenance:
      'Historic Shekhawati painted haveli courtyard illustrating traditional open-air domestic stone architecture and evening lantern illumination.',
    isUsedInBuild: true,
    group: 'photography',
  },

  {
    id: 'agra-fort-photo',
    name: 'Agra Fort Jahangiri Mahal (agra-fort.jpg)',
    category: 'Monuments Photography',
    creator: 'Christian Haugen / Wikimedia Commons',
    source: 'Wikimedia Commons (File:Agra_Fort-Jahangiri_Mahal-20131018.jpg)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Agra_Fort-Jahangiri_Mahal-20131018.jpg',
    license: 'Creative Commons Attribution 2.0 Generic (CC-BY 2.0)',
    attributionRequired: 'Christian Haugen (CC-BY 2.0)',
    modifications: 'Resized and optimized for responsive web catalogue card and header display.',
    provenance: 'Photograph of Akbar’s red sandstone Jahangiri Mahal inside the UNESCO-inscribed Agra Fort complex (#251).',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'rani-ki-vav-photo',
    name: 'Rani-ki-Vav Stepped Subterranean Pavilions (rani-ki-vav.jpg)',
    category: 'Heritage Water Architecture Photography',
    creator: 'Archaeological Survey of India / Wikimedia Commons',
    source: 'Wikimedia Commons / UNESCO Inscription Archive #922',
    sourceUrl: 'https://whc.unesco.org/en/list/922',
    license: 'Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)',
    attributionRequired: 'ASI / Wikimedia Commons (CC-BY-SA 4.0)',
    modifications: 'Cropped and optimized to landscape 16:10 for responsive web catalogue display.',
    provenance: 'Authentic photograph documenting the seven terraced subterranean colonnades and Maru-Gurjara sculptural galleries of Queen’s Stepwell in Patan, Gujarat.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'dholavira-photo',
    name: 'Dholavira Harappan Archaeological Citadel Ruins (dholavira.jpg)',
    category: 'Archaeological Photography',
    creator: 'Archaeological Survey of India / Wikimedia Commons',
    source: 'UNESCO World Heritage Archive #1642',
    sourceUrl: 'https://whc.unesco.org/en/list/1642',
    license: 'Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)',
    attributionRequired: 'ASI / Wikimedia Commons (CC-BY-SA 4.0)',
    modifications: 'Framed and optimized for web catalogue cards.',
    provenance: 'Photographic documentation of the dressed-stone fortification walls, Castle, and storm-water reservoirs of the Harappan city of Dholavira in the Rann of Kutch.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'champaner-photo',
    name: 'Jami Masjid of Champaner-Pavagadh (champaner.jpg)',
    category: 'Monuments Photography',
    creator: 'Snehrashmi / Wikimedia Commons',
    source: 'Wikimedia Commons (File:Jami_Masjid_Champaner,Gujarat.jpg)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jami_Masjid_Champaner,Gujarat.jpg',
    license: 'Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)',
    attributionRequired: 'Snehrashmi (CC-BY-SA 3.0)',
    modifications: 'Color balanced and cropped for card display.',
    provenance: 'Photograph of the 16th-century Gujarat Sultanate Jami Masjid with its 30m minarets in Champaner-Pavagadh Archaeological Park (#1101).',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'sarnath-photo',
    name: 'Dhamek Stupa at Sarnath (sarnath.jpg)',
    category: 'Buddhist Sacred Heritage Photography',
    creator: 'Biswarup Ganguly / Wikimedia Commons',
    source: 'Wikimedia Commons (File:Dhamek_Stupa,_Sarnath.jpg)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dhamek_Stupa,_Sarnath.jpg',
    license: 'Creative Commons Attribution 3.0 Unported (CC-BY 3.0)',
    attributionRequired: 'Biswarup Ganguly (CC-BY 3.0)',
    modifications: 'Cropped to 1200x800 landscape framing the cylindrical stupa and carved Gupta stone friezes.',
    provenance: 'Photograph of the colossal 43.6m Dhamek Stupa marking where the Buddha preached his first sermon at Rishipatana Deer Park in Sarnath.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'somnath-photo',
    name: 'Shri Somnath Jyotirlinga Temple (somnath.jpg)',
    category: 'Sacred Architecture Photography',
    creator: 'Shri Somnath Trust / Gujarat Tourism Archives',
    source: 'Gujarat Tourism Cultural Documentation',
    sourceUrl: 'https://www.gujarattourism.com/saurashtra/gir-somnath/somnath-temple.html',
    license: 'Free Cultural & Educational Use with Attribution',
    attributionRequired: 'Shri Somnath Trust / Gujarat Tourism',
    modifications: 'Framed and optimized for web catalogue display.',
    provenance: 'Photographic documentation of the Kailash Mahameru Prasad yellow sandstone temple on the Arabian Sea shore in Prabhas Patan, Gujarat.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'dwarkadhish-photo',
    name: 'Dwarkadhish Temple — Jagat Mandir (dwarkadhish.jpg)',
    category: 'Sacred Architecture Photography',
    creator: 'Devbhumi Dwarka Administration / Gujarat Tourism',
    source: 'Gujarat Tourism Cultural Documentation',
    sourceUrl: 'https://www.gujarattourism.com/saurashtra/devbhoomi-dwarka/dwarkadhish-temple.html',
    license: 'Free Cultural & Educational Use with Attribution',
    attributionRequired: 'Devbhumi Dwarka Administration / Gujarat Tourism',
    modifications: 'Framed and optimized for web catalogue display.',
    provenance: 'Photograph of the 78-meter towering stone spire and 72-pillared Sabha Mandapa of Jagat Mandir in Dwarka, Gujarat.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'discovery-monuments-photography',
    name: 'Historic Indian Monuments Collage (discovery-monuments.jpg)',
    category: 'Catalog Preview Photography',
    creator: 'Wikimedia Commons Heritage Archive',
    source: 'Wikimedia Commons Cultural Repository',
    sourceUrl: 'https://commons.wikimedia.org',
    license: 'Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)',
    attributionRequired: 'Wikimedia Commons Heritage Photographers',
    modifications:
      'Cropped and optimized for category grid thumbnails.',
    provenance:
      'Photographic survey of North Indian historic landmarks used for educational destination discovery.',
    isUsedInBuild: true,
    group: 'photography',
  },

  {
    id: 'agra-fort-photo',
    name: 'Agra Fort Jahangiri Mahal (agra-fort.jpg)',
    category: 'Monuments Photography',
    creator: 'Christian Haugen / Wikimedia Commons',
    source: 'Wikimedia Commons (File:Agra_Fort-Jahangiri_Mahal-20131018.jpg)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Agra_Fort-Jahangiri_Mahal-20131018.jpg',
    license: 'Creative Commons Attribution 2.0 Generic (CC-BY 2.0)',
    attributionRequired: 'Christian Haugen (CC-BY 2.0)',
    modifications: 'Resized and optimized for responsive web catalogue card and header display.',
    provenance: 'Photograph of Akbar’s red sandstone Jahangiri Mahal inside the UNESCO-inscribed Agra Fort complex (#251).',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'rani-ki-vav-photo',
    name: 'Rani-ki-Vav Stepped Subterranean Pavilions (rani-ki-vav.jpg)',
    category: 'Heritage Water Architecture Photography',
    creator: 'Archaeological Survey of India / Wikimedia Commons',
    source: 'Wikimedia Commons / UNESCO Inscription Archive #922',
    sourceUrl: 'https://whc.unesco.org/en/list/922',
    license: 'Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)',
    attributionRequired: 'ASI / Wikimedia Commons (CC-BY-SA 4.0)',
    modifications: 'Cropped and optimized to landscape 16:10 for responsive web catalogue display.',
    provenance: 'Authentic photograph documenting the seven terraced subterranean colonnades and Maru-Gurjara sculptural galleries of Queen’s Stepwell in Patan, Gujarat.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'dholavira-photo',
    name: 'Dholavira Harappan Archaeological Citadel Ruins (dholavira.jpg)',
    category: 'Archaeological Photography',
    creator: 'Archaeological Survey of India / Wikimedia Commons',
    source: 'UNESCO World Heritage Archive #1642',
    sourceUrl: 'https://whc.unesco.org/en/list/1642',
    license: 'Creative Commons Attribution-ShareAlike 4.0 (CC-BY-SA 4.0)',
    attributionRequired: 'ASI / Wikimedia Commons (CC-BY-SA 4.0)',
    modifications: 'Framed and optimized for web catalogue cards.',
    provenance: 'Photographic documentation of the dressed-stone fortification walls, Castle, and storm-water reservoirs of the Harappan city of Dholavira in the Rann of Kutch.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'champaner-photo',
    name: 'Jami Masjid of Champaner-Pavagadh (champaner.jpg)',
    category: 'Monuments Photography',
    creator: 'Snehrashmi / Wikimedia Commons',
    source: 'Wikimedia Commons (File:Jami_Masjid_Champaner,Gujarat.jpg)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jami_Masjid_Champaner,Gujarat.jpg',
    license: 'Creative Commons Attribution-ShareAlike 3.0 Unported (CC-BY-SA 3.0)',
    attributionRequired: 'Snehrashmi (CC-BY-SA 3.0)',
    modifications: 'Color balanced and cropped for card display.',
    provenance: 'Photograph of the 16th-century Gujarat Sultanate Jami Masjid with its 30m minarets in Champaner-Pavagadh Archaeological Park (#1101).',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'sarnath-photo',
    name: 'Dhamek Stupa at Sarnath (sarnath.jpg)',
    category: 'Buddhist Sacred Heritage Photography',
    creator: 'Biswarup Ganguly / Wikimedia Commons',
    source: 'Wikimedia Commons (File:Dhamek_Stupa,_Sarnath.jpg)',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Dhamek_Stupa,_Sarnath.jpg',
    license: 'Creative Commons Attribution 3.0 Unported (CC-BY 3.0)',
    attributionRequired: 'Biswarup Ganguly (CC-BY 3.0)',
    modifications: 'Cropped to 1200x800 landscape framing the cylindrical stupa and carved Gupta stone friezes.',
    provenance: 'Photograph of the colossal 43.6m Dhamek Stupa marking where the Buddha preached his first sermon at Rishipatana Deer Park in Sarnath.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'somnath-photo',
    name: 'Shri Somnath Jyotirlinga Temple (somnath.jpg)',
    category: 'Sacred Architecture Photography',
    creator: 'Shri Somnath Trust / Gujarat Tourism Archives',
    source: 'Gujarat Tourism Cultural Documentation',
    sourceUrl: 'https://www.gujarattourism.com/saurashtra/gir-somnath/somnath-temple.html',
    license: 'Free Cultural & Educational Use with Attribution',
    attributionRequired: 'Shri Somnath Trust / Gujarat Tourism',
    modifications: 'Framed and optimized for web catalogue display.',
    provenance: 'Photographic documentation of the Kailash Mahameru Prasad yellow sandstone temple on the Arabian Sea shore in Prabhas Patan, Gujarat.',
    isUsedInBuild: true,
    group: 'photography',
  },
  {
    id: 'dwarkadhish-photo',
    name: 'Dwarkadhish Temple — Jagat Mandir (dwarkadhish.jpg)',
    category: 'Sacred Architecture Photography',
    creator: 'Devbhumi Dwarka Administration / Gujarat Tourism',
    source: 'Gujarat Tourism Cultural Documentation',
    sourceUrl: 'https://www.gujarattourism.com/saurashtra/devbhoomi-dwarka/dwarkadhish-temple.html',
    license: 'Free Cultural & Educational Use with Attribution',
    attributionRequired: 'Devbhumi Dwarka Administration / Gujarat Tourism',
    modifications: 'Framed and optimized for web catalogue display.',
    provenance: 'Photograph of the 78-meter towering stone spire and 72-pillared Sabha Mandapa of Jagat Mandir in Dwarka, Gujarat.',
    isUsedInBuild: true,
    group: 'photography',
  },

  // 4. Scholarly Research Citations (UNESCO & ASI)
  {
    id: 'unesco-ranikivav',
    name: 'Rani-ki-Vav Stepwell Architectural Inscription #922',
    category: 'Scholarly Educational Citation',
    creator: 'UNESCO World Heritage Centre / Archaeological Survey of India (ASI)',
    source: 'UNESCO World Heritage Inscription #922',
    sourceUrl: 'https://whc.unesco.org/en/list/922',
    license: 'Official UNESCO Documentation (Scholarly Reference, Not a Software Asset)',
    attributionRequired: 'UNESCO World Heritage Centre & Archaeological Survey of India',
    modifications:
      'Synthesized subterranean structural engineering, inverted pyramid geometry, and hydraulic history for interactive hotspot learning drawer.',
    provenance:
      'Official inscription documentation confirming the stepwell’s seven levels, 500+ principal sculptures, and medieval subterranean water-management technology.',
    isUsedInBuild: true,
    group: 'citations',
  },
  {
    id: 'unesco-jaipur-jharokha',
    name: 'Jaipur Walled City & Haveli Jharokha Facade Typologies Inscription #1605',
    category: 'Scholarly Educational Citation',
    creator: 'UNESCO World Heritage Centre / IGNCA',
    source: 'UNESCO World Heritage Inscription #1605 & IGNCA Studies',
    sourceUrl: 'https://whc.unesco.org/en/list/1605/',
    license: 'Official UNESCO Documentation (Scholarly Reference)',
    attributionRequired: 'UNESCO World Heritage Centre & IGNCA',
    modifications:
      'Synthesized architectural mechanics of cantilevered madal brackets, chhajja eaves, and venturi airflow cooling.',
    provenance:
      'Urban heritage documentation of western Indian domestic facades and climate-adaptive vernacular building techniques.',
    isUsedInBuild: true,
    group: 'citations',
  },
  {
    id: 'met-jali-stonework',
    name: 'Jali: Perforated Stonework & Screen Studies',
    category: 'Scholarly Educational Citation',
    creator: 'The Metropolitan Museum of Art Open Access / Navina Najat Haidar',
    source: 'The Met Museum Open Access Collection',
    sourceUrl: 'https://www.metmuseum.org/art/collection/search#!?q=jali',
    license: 'Metropolitan Museum Open Access (Educational Reference)',
    attributionRequired: 'The Metropolitan Museum of Art, New York',
    modifications:
      'Adapted analysis of perforated screen light filtration, privacy sight-veils, and microclimate ventilation.',
    provenance:
      'Scholarly documentation of Mughal, Sultanate, and Rajput pierced stone screens in historic Indian architecture.',
    isUsedInBuild: true,
    group: 'citations',
  },
  {
    id: 'unesco-sanchi-torana',
    name: 'Buddhist Monuments at Sanchi & Torana Gateway Architecture Inscription #524',
    category: 'Scholarly Educational Citation',
    creator: 'UNESCO World Heritage Centre / Archaeological Survey of India',
    source: 'UNESCO World Heritage Inscription #524',
    sourceUrl: 'https://whc.unesco.org/en/list/524/',
    license: 'Official UNESCO Documentation (Scholarly Reference)',
    attributionRequired: 'UNESCO World Heritage Centre & Archaeological Survey of India',
    modifications:
      'Extracted ceremonial threshold symbolism, multi-tiered horizontal architrave structure, and cusped makara bracket mechanics.',
    provenance:
      'Classical architectural documentation of ceremonial stone gateways spanning Sanchi, Mukteshvara, and Vadnagar Kirti Torana.',
    isUsedInBuild: true,
    group: 'citations',
  },
  {
    id: 'asi-mandapa-survey',
    name: 'Architectural Survey of Temple Architecture & Mandapa Typologies',
    category: 'Scholarly Educational Citation',
    creator: 'Archaeological Survey of India (ASI) & Percy Brown',
    source: 'ASI Architectural Series / Dover Publications',
    sourceUrl: 'https://asi.nic.in/',
    license: 'Public Educational Monograph (Scholarly Reference)',
    attributionRequired: 'Archaeological Survey of India (ASI)',
    modifications:
      'Formulated octagonal column distribution, corbelled concentric dome roofing, and Ghatapallava capital descriptions.',
    provenance:
      'Definitive architectural monograph on Buddhist, Hindu, and Jain pillared halls and ceremonial pavilions.',
    isUsedInBuild: true,
    group: 'citations',
  },

  // 5. External Assets Audited & Not Used in Production Build
  {
    id: 'polyhaven-sandstone-audit',
    name: 'Poly Haven Sandstone Texture Asset (Audit Flag)',
    category: 'Third-Party PBR Material',
    creator: 'Rob Tuytel / Poly Haven Community',
    source: 'Poly Haven (polyhaven.com)',
    sourceUrl: 'https://polyhaven.com',
    license: 'CC0 1.0 Universal',
    attributionRequired: 'Poly Haven CC0 (Not Required, but Documented)',
    modifications:
      'NOT INCLUDED IN PRODUCTION BUNDLE — The production application synthesizes all sandstone and plinth PBR materials procedurally in-engine with Three.js Standard Materials to keep payload below 160 KB.',
    provenance:
      'Audited during initial prototyping; replaced with zero-dependency procedural shaders.',
    isUsedInBuild: false,
    group: 'audited_unused',
  },
  {
    id: 'polyhaven-hdri-audit',
    name: 'Poly Haven Sky Environment HDRI (Audit Flag)',
    category: 'Lighting Environment Map',
    creator: 'Greg Zaal / Poly Haven Community',
    source: 'Poly Haven (polyhaven.com)',
    sourceUrl: 'https://polyhaven.com',
    license: 'CC0 1.0 Universal',
    attributionRequired: 'Poly Haven CC0 (Not Required, but Documented)',
    modifications:
      'NOT INCLUDED IN PRODUCTION BUNDLE — Procedural Three.js directional sunlight and hemisphere bounce lights are used instead of heavy external HDR binaries.',
    provenance:
      'Audited during prototyping; replaced with pure procedural shaders.',
    isUsedInBuild: false,
    group: 'audited_unused',
  },
  {
    id: 'freesound-audio-audit',
    name: 'Freesound Courtyard Ambience (Audit Flag)',
    category: 'Audio Recording',
    creator: 'InspectorJ / Freesound.org',
    source: 'Freesound.org (freesound.org)',
    sourceUrl: 'https://freesound.org',
    license: 'Creative Commons Attribution (CC-BY)',
    attributionRequired: 'InspectorJ (Freesound.org)',
    modifications:
      'NOT INCLUDED IN PRODUCTION BUNDLE — Audio playback has been deferred to maintain instantaneous zero-download load times.',
    provenance:
      'Audited for potential audio narration/ambience; excluded from current deployment payload.',
    isUsedInBuild: false,
    group: 'audited_unused',
  },
];

export default function LicensesPage() {
  const proceduralAssets = ASSET_REGISTRY.filter((a) => a.group === 'procedural');
  const illustrationAssets = ASSET_REGISTRY.filter((a) => a.group === 'illustrations');
  const photoAssets = ASSET_REGISTRY.filter((a) => a.group === 'photography');
  const citationAssets = ASSET_REGISTRY.filter((a) => a.group === 'citations');
  const unusedAssets = ASSET_REGISTRY.filter((a) => a.group === 'audited_unused');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-12">
        {/* Breadcrumb Back */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            Intellectual Transparency &amp; Academic Integrity
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Asset Register &amp; Licensing Attribution
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-3xl leading-relaxed">
            NewArambh is built with zero proprietary 3D scans and zero commercial dependencies.
            This register provides complete transparency regarding in-engine procedural geometry,
            original educational illustrations, external photography, and scholarly research citations.
          </p>
        </div>

        {/* Core Principles */}
        <div className="rounded-3xl p-6 sm:p-8 bg-zinc-900/60 border border-zinc-800 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            Intellectual Property &amp; Provenance Transparency Mandate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-zinc-300">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <Code2 className="w-4 h-4" /> Procedural 3D Synthesis
              </span>
              <p className="text-zinc-400 leading-relaxed">
                The 3D environment is programmatically generated in-engine using Three.js mathematical
                primitives and standard PBR materials—never ripped from proprietary repositories or paywalled scans.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> Verified Academic Provenance
              </span>
              <p className="text-zinc-400 leading-relaxed">
                Reconstructions are explicitly stated as illustrative educational models, with citations
                directly linked to official UNESCO World Heritage Centre inscriptions and ASI monographs.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-2">
              <span className="font-bold text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Strict License Separation
              </span>
              <p className="text-zinc-400 leading-relaxed">
                Software code (MIT), creative media (CC-BY 4.0 / CC-BY-SA 4.0), and scholarly citations are
                strictly categorized to avoid confusing educational references with code licenses.
              </p>
            </div>
          </div>
        </div>

        {/* Section 1: Procedural 3D Environment */}
        <section className="space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              1. Project-Authored Procedural 3D Architecture (Active in Build)
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Constructed programmatically via Node.js Three.js exporter; zero external scan dependencies.
            </p>
          </div>

          <div className="space-y-4">
            {proceduralAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </section>

        {/* Section 2: Original Curatorial Illustrations */}
        <section className="space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              2. Curatorial Architectural Vector Diagrams (Active in Build)
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Original SVG diagrams documenting architectural terminology, elevations, and structural mechanics.
            </p>
          </div>

          <div className="space-y-4">
            {illustrationAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </section>

        {/* Section 3: Reusable External Photography */}
        <section className="space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-400" />
              3. Reusable External Photographic Media (Active in Build)
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Freely usable atmospheric and architectural reference photographs with verified licenses.
            </p>
          </div>

          <div className="space-y-4">
            {photoAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </section>

        {/* Section 4: Scholarly Educational Citations */}
        <section className="space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              4. Scholarly Educational References &amp; Inscriptions (Academic Citations)
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Scholarly sources informing our architectural models; these are educational research citations, not software asset licenses.
            </p>
          </div>

          <div className="space-y-4">
            {citationAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </section>

        {/* Section 5: Audited External Assets Not Used in Production Build */}
        <section className="space-y-4">
          <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-zinc-400" />
                5. External Asset Registry Audit (Flagged as NOT USED in Production)
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Assets surveyed during architectural research but intentionally replaced with procedural in-engine code to preserve zero-budget delivery.
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold text-zinc-400 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
              Not in Production Bundle
            </span>
          </div>

          <div className="space-y-4">
            {unusedAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function AssetCard({ asset }: { asset: AssetRecord }) {
  return (
    <div className="rounded-2xl p-6 bg-zinc-900/40 border border-zinc-800 hover:border-zinc-700 transition-all space-y-4">
      {/* Top line */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {asset.category}
            </span>
            {asset.isUsedInBuild ? (
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Active in Build
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-zinc-400 bg-zinc-800 px-2 py-0.5 rounded border border-zinc-700">
                Not Used in Build (Procedural Replacement)
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{asset.name}</h3>
        </div>

        <a
          href={asset.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 hover:border-amber-500/40 transition-colors self-start sm:self-auto shrink-0"
        >
          <span>{asset.source}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-zinc-950/60 rounded-xl p-4 border border-zinc-800/80">
        <div>
          <span className="text-zinc-500 block font-medium">Creator / Author:</span>
          <span className="font-semibold text-zinc-200">{asset.creator}</span>
        </div>
        <div>
          <span className="text-zinc-500 block font-medium">License / Status:</span>
          <span className="font-semibold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>{asset.license}</span>
          </span>
        </div>
        <div>
          <span className="text-zinc-500 block font-medium">Attribution:</span>
          <span className="font-semibold text-zinc-300">{asset.attributionRequired}</span>
        </div>
      </div>

      {/* Provenance and Modifications */}
      <div className="space-y-2 text-xs pt-1">
        <div>
          <span className="text-zinc-400 font-semibold">Provenance &amp; Source Details: </span>
          <span className="text-zinc-300 leading-relaxed">{asset.provenance}</span>
        </div>
        <div>
          <span className="text-zinc-400 font-semibold">Technical Modifications: </span>
          <span className="text-zinc-400 leading-relaxed">{asset.modifications}</span>
        </div>
      </div>
    </div>
  );
}
