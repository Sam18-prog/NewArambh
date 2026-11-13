export interface LandmarkGalleryItem {
  id: string;
  url: string;
  caption: string;
  alt: string;
  credit?: string;
  sourceUrl?: string;
}

export interface LandmarkSourceReference {
  title: string;
  url: string;
  authorOrPublisher: string;
  licenseNote?: string;
}

export interface Landmark {
  id: string;
  destinationId: string;
  name: string;
  hindiName?: string;
  category: string;
  /** Percentage coordinates (0-100) or SVG viewBox coordinates for map placement */
  mapCoordinates: {
    x: number;
    y: number;
  };
  /** 3D world space coordinate [x, y, z] for in-scene beacons and guided tour */
  position3D?: [number, number, number];
  shortDescription: string;
  detailedDescription: string;
  historicalSignificance: string;
  architecturalHighlights: string[];
  gallery: LandmarkGalleryItem[];
  sourceReferences: LandmarkSourceReference[];
  audioUrl?: string;
}
