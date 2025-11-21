import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { safetyQuestions, SafetyQuestion } from '../data/safetyQuestions';

export interface GameState {
  screen: 'start' | 'game' | 'complete';
  level: number;
  score: number;
  currentQuestionIndex: number;
  totalQuestions: number;
  questions: SafetyQuestion[];
  selectedAnswer: string | null;
  showFeedback: boolean;
  isCorrect: boolean | null;
  feedback: {
    type: 'success' | 'error' | null;
    message: string;
    isVisible: boolean;
  };
}

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SELECT_ANSWER'; payload: string }
  | { type: 'SUBMIT_ANSWER' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'RESET_GAME' }
  | { type: 'SHOW_FEEDBACK'; payload: { type: 'success' | 'error'; message: string } }
  | { type: 'HIDE_FEEDBACK' };

const initialState: GameState = {
  screen: 'start',
  level: 1,
  score: 0,
  currentQuestionIndex: 0,
  totalQuestions: safetyQuestions.length,
  questions: safetyQuestions,
  selectedAnswer: null,
  showFeedback: false,
  isCorrect: null,
  feedback: {
    type: null,
    message: '',
    isVisible: false,
  },
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        screen: 'game',
        currentQuestionIndex: 0,
        score: 0,
        selectedAnswer: null,
        showFeedback: false,
        isCorrect: null,
      };

    case 'SELECT_ANSWER':
      return {
        ...state,
        selectedAnswer: action.payload,
      };

    case 'SUBMIT_ANSWER':
      if (!state.selectedAnswer) return state;

      const currentQuestion = state.questions[state.currentQuestionIndex];
      const selectedChoice = currentQuestion.choices.find(
        choice => choice.id === state.selectedAnswer
      );
      const isCorrect = selectedChoice?.isCorrect || false;

      return {
        ...state,
        isCorrect,
        showFeedback: true,
        score: isCorrect ? state.score + 10 : state.score,
        feedback: {
          type: isCorrect ? 'success' : 'error',
          message: isCorrect ? 'إجابة صحيحة!' : 'حاول مرة أخرى!',
          isVisible: true,
        },
      };

    case 'NEXT_QUESTION':
      const nextIndex = state.currentQuestionIndex + 1;

      if (nextIndex >= state.totalQuestions) {
        return {
          ...state,
          screen: 'complete',
        };
      }

      return {
        ...state,
        currentQuestionIndex: nextIndex,
        selectedAnswer: null,
        showFeedback: false,
        isCorrect: null,
        level: Math.floor(nextIndex / 2) + 1,
      };

    case 'SHOW_FEEDBACK':
      return {
        ...state,
        feedback: {
          type: action.payload.type,
          message: action.payload.message,
          isVisible: true,
        },
      };

    case 'HIDE_FEEDBACK':
      return {
        ...state,
        feedback: {
          ...state.feedback,
          isVisible: false,
        },
      };

    case 'RESET_GAME':
      return initialState;

    default:
      return state;
  }
}

const GameContext = createContext<{
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}
