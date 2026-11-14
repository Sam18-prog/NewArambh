'use client';

export interface SavedDestination {
  id: string;
  name: string;
  location: string;
  thumbnailUrl: string;
  savedAt: string;
  heritageClassification?: 'unesco' | 'cultural';
}

export interface SavedLandmark {
  id: string;
  destinationId: string;
  destinationName: string;
  name: string;
  category: string;
  thumbnailUrl?: string;
  savedAt: string;
}

export interface QuizScoreRecord {
  id: string;
  quizMode: string;
  destinationId?: string;
  destinationName?: string;
  score: number;
  total: number;
  percentage: number;
  completedAt: string;
}

export interface JourneyProgressRecord {
  destinationId: string;
  destinationName: string;
  currentStopIndex: number;
  totalStops: number;
  completed: boolean;
  lastVisitedAt: string;
}

export interface UserHeritageCollection {
  version: string;
  savedDestinations: SavedDestination[];
  savedLandmarks: SavedLandmark[];
  quizScores: QuizScoreRecord[];
  journeyProgress: Record<string, JourneyProgressRecord>;
}

const STORAGE_KEY = 'newarambh_collection_v1';

const defaultCollection: UserHeritageCollection = {
  version: '1.0',
  savedDestinations: [],
  savedLandmarks: [],
  quizScores: [],
  journeyProgress: {},
};

function getStorageSafe(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function subscribeToCollection(callback: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('newarambh_collection_updated', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('newarambh_collection_updated', callback);
    window.removeEventListener('storage', callback);
  };
}

export function loadUserCollection(): UserHeritageCollection {
  const storage = getStorageSafe();
  if (!storage) return defaultCollection;

  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return defaultCollection;
    const parsed = JSON.parse(raw);
    return {
      version: parsed.version || '1.0',
      savedDestinations: Array.isArray(parsed.savedDestinations) ? parsed.savedDestinations : [],
      savedLandmarks: Array.isArray(parsed.savedLandmarks) ? parsed.savedLandmarks : [],
      quizScores: Array.isArray(parsed.quizScores) ? parsed.quizScores : [],
      journeyProgress: typeof parsed.journeyProgress === 'object' && parsed.journeyProgress !== null ? parsed.journeyProgress : {},
    };
  } catch (err) {
    console.warn('Could not parse local collection:', err);
    return defaultCollection;
  }
}

export function saveUserCollection(collection: UserHeritageCollection): boolean {
  const storage = getStorageSafe();
  if (!storage) return false;

  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(collection));
    // Dispatch storage event so all components on the page react
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('newarambh_collection_updated'));
    }
    return true;
  } catch (err) {
    console.warn('Could not write to local storage:', err);
    return false;
  }
}

export function toggleBookmarkDestination(dest: {
  id: string;
  name: string;
  location: string;
  thumbnailUrl: string;
  heritageClassification?: 'unesco' | 'cultural';
}): boolean {
  const col = loadUserCollection();
  const exists = col.savedDestinations.some((d) => d.id === dest.id);

  if (exists) {
    col.savedDestinations = col.savedDestinations.filter((d) => d.id !== dest.id);
  } else {
    col.savedDestinations.push({
      id: dest.id,
      name: dest.name,
      location: dest.location,
      thumbnailUrl: dest.thumbnailUrl,
      savedAt: new Date().toISOString(),
      heritageClassification: dest.heritageClassification,
    });
  }

  saveUserCollection(col);
  return !exists;
}

export function isDestinationBookmarked(destId: string): boolean {
  const col = loadUserCollection();
  return col.savedDestinations.some((d) => d.id === destId);
}

export function toggleSaveLandmark(landmark: {
  id: string;
  destinationId: string;
  destinationName: string;
  name: string;
  category: string;
  thumbnailUrl?: string;
}): boolean {
  const col = loadUserCollection();
  const exists = col.savedLandmarks.some((l) => l.id === landmark.id && l.destinationId === landmark.destinationId);

  if (exists) {
    col.savedLandmarks = col.savedLandmarks.filter(
      (l) => !(l.id === landmark.id && l.destinationId === landmark.destinationId)
    );
  } else {
    col.savedLandmarks.push({
      ...landmark,
      savedAt: new Date().toISOString(),
    });
  }

  saveUserCollection(col);
  return !exists;
}

export function isLandmarkSaved(destId: string, landmarkId: string): boolean {
  const col = loadUserCollection();
  return col.savedLandmarks.some((l) => l.id === landmarkId && l.destinationId === destId);
}

export function recordQuizScore(record: Omit<QuizScoreRecord, 'id' | 'completedAt'>): void {
  const col = loadUserCollection();
  const newRecord: QuizScoreRecord = {
    ...record,
    id: `quiz-${Date.now()}`,
    completedAt: new Date().toISOString(),
  };
  col.quizScores.unshift(newRecord);
  // Keep last 30 scores
  if (col.quizScores.length > 30) {
    col.quizScores = col.quizScores.slice(0, 30);
  }
  saveUserCollection(col);
}

export function updateJourneyProgress(
  destinationId: string,
  destinationName: string,
  stopIndex: number,
  totalStops: number
): void {
  const col = loadUserCollection();
  const isComplete = stopIndex >= totalStops - 1;
  col.journeyProgress[destinationId] = {
    destinationId,
    destinationName,
    currentStopIndex: stopIndex,
    totalStops,
    completed: isComplete,
    lastVisitedAt: new Date().toISOString(),
  };
  saveUserCollection(col);
}

export function clearUserCollection(): void {
  const storage = getStorageSafe();
  if (!storage) return;
  storage.removeItem(STORAGE_KEY);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('newarambh_collection_updated'));
  }
}
