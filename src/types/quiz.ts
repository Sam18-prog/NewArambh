export type QuizMode = 'destination' | 'landmark' | 'architecture' | 'mixed';

export interface QuizQuestion {
  id: string;
  mode: QuizMode;
  destinationId?: string;
  destinationName?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  reference: string;
  imageUrl?: string;
  topic: string;
}

export interface QuizResult {
  mode: QuizMode;
  destinationId?: string;
  destinationName?: string;
  score: number;
  total: number;
  percentage: number;
  revisitTopics: string[];
}
