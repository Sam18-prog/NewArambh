export type CapabilityStatus = 'AVAILABLE' | 'BETA' | 'COMING_SOON' | 'UNAVAILABLE';

export interface DestinationCapabilities {
  destinationId: string;
  name: string;
  siteMap2D: CapabilityStatus;
  guidedJourney: CapabilityStatus;
  photoGallery: CapabilityStatus;
  historicalTimeline: CapabilityStatus;
  heritageQuiz: CapabilityStatus;
  audioGuide: {
    en: CapabilityStatus;
    hi: CapabilityStatus;
    gu: CapabilityStatus;
  };
  walkthrough3D: CapabilityStatus;
  droneView: CapabilityStatus;
  notes?: string;
}
