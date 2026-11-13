import { Landmark } from './landmark';
import { SceneCollider } from './collision';

export type HeritageClassification = 'unesco' | 'cultural';

export type DestinationCategory =
  | 'forts-palaces'
  | 'religious'
  | 'monuments'
  | 'archaeological'
  | 'stepwells'
  | 'heritage'
  | 'museums'
  | 'natural';

export type ExplorationMode = 'walk' | 'inspect' | 'tour' | 'map' | '3d';

export interface DestinationThreeConfig {
  spawnPosition: [number, number, number];
  spawnLookAt?: [number, number, number];
  boundaries: { minX: number; maxX: number; minZ: number; maxZ: number };
  allowJump: boolean;
  modelUrl?: string;
  colliders?: SceneCollider[];
  cameraPresets?: Record<string, { position: [number, number, number]; target: [number, number, number] }>;
  skyPreset?: 'daylight' | 'sunset' | 'desert' | 'coastal';
}

export interface GalleryItem {
  url: string;
  caption: string;
  credit?: string;
  alt?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  source?: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface ArchitecturalGlossaryItem {
  term: string;
  hindiTerm?: string;
  definition: string;
}

export interface AssetCredit {
  assetName: string;
  source: string;
  creator: string;
  license: string;
  notes?: string;
}

export interface DestinationStats {
  estimatedVisitMinutes: number;
  hotspotsCount: number;
  yearBuilt?: string;
}

export interface HistoricalReference {
  title: string;
  organization: string;
  url: string;
  relevantClaim: string;
  lastVerifiedDate?: string;
}

export interface SiteMapConfig {
  viewBox: string;
  schematicDisclaimer: string;
  aspectRatio?: string;
}

export interface Destination {
  id: string;
  slug: string;
  name: string;
  /** Short or card display name, e.g. "Taj Mahal", "Somnath Mandir" */
  shortName?: string;
  hindiName?: string;
  subtitle: string;
  description: string;
  detailedHistory: string[];
  location: string;
  city: string;
  state: string;
  country: string;
  period: string;
  category: DestinationCategory;
  categoryLabel: string;
  heritageClassification: HeritageClassification;
  unescoInscriptionYear?: number;
  unescoUrl?: string;
  officialUrl?: string;
  thumbnailUrl: string;
  heroImageUrl: string;
  galleryImages: GalleryItem[];
  isDemo?: boolean;
  reconstructionType: 'Authentic 3D Digital Reconstruction' | 'Educational Recreation' | 'Architectural Study' | 'Schematic Digital Exploration';
  availableModes: ExplorationMode[];
  landmarks: Landmark[];
  timeline: TimelineEvent[];
  quickFacts: QuickFact[];
  architecturalSignificance: string;
  culturalSignificance: string;
  glossary?: ArchitecturalGlossaryItem[];
  historicalReferences: HistoricalReference[];
  assetCredits: AssetCredit[];
  stats: DestinationStats;
  tags: string[];
  mapConfig: SiteMapConfig;
  threeConfig?: DestinationThreeConfig;
}
