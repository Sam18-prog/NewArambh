export type DestinationCategory =
  | 'religious'
  | 'monuments'
  | 'forts-palaces'
  | 'museums'
  | 'heritage'
  | 'natural';

export type ExplorationMode = 'walk' | 'inspect' | 'tour';

export interface GalleryItem {
  url: string;
  caption: string;
  credit?: string;
}

export interface ArchitecturalHighlight {
  title: string;
  category: string;
  description: string;
  hotspotRef?: string;
}

export interface HistoricalContext {
  period: string;
  architecturalStyle: string;
  significance: string;
  detailedStory: string[];
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

export interface Destination {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  location: string;
  period: string;
  category: DestinationCategory;
  categoryLabel: string;
  thumbnailUrl: string;
  heroImageUrl: string;
  galleryImages: GalleryItem[];
  isDemo: boolean;
  reconstructionType: 'Illustrative Reconstruction' | 'Historical Scan' | 'Museum Curation';
  availableModes: ExplorationMode[];
  highlights: ArchitecturalHighlight[];
  historicalContext: HistoricalContext;
  assetCredits: AssetCredit[];
  stats: DestinationStats;
  tags: string[];
}
