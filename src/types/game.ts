export interface GameState {
  score: number;
  level: number;
  correctWords: string[];
  isGameComplete: boolean;
  showLevelComplete: boolean;
  feedback: {
    type: 'success' | 'error' | null;
    message: string;
    isVisible: boolean;
  };
}

export interface Word {
  id: string;
  text: string;
  isCorrect: boolean;
}