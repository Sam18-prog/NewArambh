export interface HotspotGalleryItem {
  id: string;
  url: string;
  caption: string;
  alt: string;
  attribution: string;
  sourceUrl?: string;
}

export interface HotspotSourceReference {
  title: string;
  url: string;
  authorOrPublisher: string;
  licenseNote?: string;
}

export interface EducationalHotspot {
  id: string;
  destinationId: string;
  name: string;
  hindiName?: string;
  category: string;
  position: [number, number, number]; // [x, y, z] in world coordinates
  interactionRadius: number; // in meters (typically 3.5 to 5.0m)
  shortDescription: string;
  detailedDescription: string;
  culturalSignificance: string;
  architecturalDetails: string[];
  gallery: HotspotGalleryItem[];
  sources: HotspotSourceReference[];
  audioUrl?: string;
}
