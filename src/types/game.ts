export interface GameState {
  score: number;
  level: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  screen: 'start' | 'game' | 'complete';
  feedback: {
    type: 'success' | 'error' | null;
    message: string;
    isVisible: boolean;
  };
}

export interface SafetyQuestion {
  id: string;
  tip: string;
  question: string;
  choices: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
}