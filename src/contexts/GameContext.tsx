import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Word {
  id: string;
  text: string;
  category: 'internet' | 'nature' | 'food' | 'transport';
  difficulty: 1 | 2 | 3;
}

export interface GameState {
  screen: 'start' | 'game' | 'complete';
  level: number;
  score: number;
  lives: number;
  streak: number;
  timeLeft: number;
  selectedCategory: 'internet' | 'nature' | 'food' | 'transport';
  currentWords: Word[];
  correctWords: string[];
  gameMode: 'classic' | 'timed' | 'endless';
  powerUps: {
    freeze: number;
    hint: number;
    doublePoints: number;
  };
  isGameActive: boolean;
  feedback: {
    type: 'success' | 'error' | 'hint' | null;
    message: string;
    isVisible: boolean;
  };
}

type GameAction =
  | { type: 'START_GAME'; payload: { mode: 'classic' | 'timed' | 'endless' } }
  | { type: 'SELECT_CATEGORY'; payload: 'internet' | 'nature' | 'food' | 'transport' }
  | { type: 'CORRECT_WORD'; payload: string }
  | { type: 'WRONG_WORD' }
  | { type: 'USE_POWERUP'; payload: 'freeze' | 'hint' | 'doublePoints' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'GAME_OVER' }
  | { type: 'RESET_GAME' }
  | { type: 'TICK_TIMER' }
  | { type: 'SHOW_FEEDBACK'; payload: { type: 'success' | 'error' | 'hint'; message: string } }
  | { type: 'HIDE_FEEDBACK' };

const initialState: GameState = {
  screen: 'start',
  level: 1,
  score: 0,
  lives: 3,
  streak: 0,
  timeLeft: 60,
  selectedCategory: 'internet',
  currentWords: [],
  correctWords: [],
  gameMode: 'classic',
  powerUps: {
    freeze: 2,
    hint: 3,
    doublePoints: 1,
  },
  isGameActive: false,
  feedback: {
    type: null,
    message: '',
    isVisible: false,
  },
};

const WORDS_DATABASE: Record<string, Word[]> = {
  internet: [
    { id: '1', text: 'الإنترنت', category: 'internet', difficulty: 1 },
    { id: '2', text: 'موقع إلكتروني', category: 'internet', difficulty: 1 },
    { id: '3', text: 'بريد إلكتروني', category: 'internet', difficulty: 1 },
    { id: '4', text: 'شبكة اجتماعية', category: 'internet', difficulty: 2 },
    { id: '5', text: 'محرك بحث', category: 'internet', difficulty: 2 },
    { id: '6', text: 'الحوسبة السحابية', category: 'internet', difficulty: 3 },
  ],
  nature: [
    { id: '7', text: 'شجرة', category: 'nature', difficulty: 1 },
    { id: '8', text: 'زهرة', category: 'nature', difficulty: 1 },
    { id: '9', text: 'جبل', category: 'nature', difficulty: 1 },
    { id: '10', text: 'محيط', category: 'nature', difficulty: 2 },
    { id: '11', text: 'غابة مطيرة', category: 'nature', difficulty: 2 },
    { id: '12', text: 'النظام البيئي', category: 'nature', difficulty: 3 },
  ],
  food: [
    { id: '13', text: 'تفاح', category: 'food', difficulty: 1 },
    { id: '14', text: 'خبز', category: 'food', difficulty: 1 },
    { id: '15', text: 'لحم', category: 'food', difficulty: 1 },
    { id: '16', text: 'مأكولات بحرية', category: 'food', difficulty: 2 },
    { id: '17', text: 'خضروات عضوية', category: 'food', difficulty: 2 },
    { id: '18', text: 'المكملات الغذائية', category: 'food', difficulty: 3 },
  ],
  transport: [
    { id: '19', text: 'سيارة', category: 'transport', difficulty: 1 },
    { id: '20', text: 'طائرة', category: 'transport', difficulty: 1 },
    { id: '21', text: 'قطار', category: 'transport', difficulty: 1 },
    { id: '22', text: 'دراجة هوائية', category: 'transport', difficulty: 2 },
    { id: '23', text: 'مركبة كهربائية', category: 'transport', difficulty: 2 },
    { id: '24', text: 'النقل المستدام', category: 'transport', difficulty: 3 },
  ],
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      const categoryWords = WORDS_DATABASE[state.selectedCategory] || [];
      const shuffledWords = [...categoryWords, ...getRandomWordsFromOtherCategories(state.selectedCategory, 4)]
        .sort(() => Math.random() - 0.5);
      
      return {
        ...state,
        screen: 'game',
        gameMode: action.payload.mode,
        currentWords: shuffledWords,
        isGameActive: true,
        timeLeft: action.payload.mode === 'timed' ? 60 : 0,
      };

    case 'SELECT_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case 'CORRECT_WORD':
      const basePoints = 10;
      const difficultyMultiplier = state.currentWords.find(w => w.text === action.payload)?.difficulty || 1;
      const streakBonus = Math.floor(state.streak / 3) * 5;
      const points = basePoints * difficultyMultiplier + streakBonus;

      return {
        ...state,
        score: state.score + points,
        streak: state.streak + 1,
        correctWords: [...state.correctWords, action.payload],
        feedback: {
          type: 'success',
          message: `+${points} نقطة!`,
          isVisible: true,
        },
      };

    case 'WRONG_WORD':
      return {
        ...state,
        lives: state.lives - 1,
        streak: 0,
        feedback: {
          type: 'error',
          message: 'حاول مرة أخرى!',
          isVisible: true,
        },
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

    case 'TICK_TIMER':
      const newTimeLeft = state.timeLeft - 1;
      if (newTimeLeft <= 0 && state.gameMode === 'timed') {
        return {
          ...state,
          timeLeft: 0,
          screen: 'complete',
          isGameActive: false,
        };
      }
      return {
        ...state,
        timeLeft: newTimeLeft,
      };

    case 'RESET_GAME':
      return initialState;

    default:
      return state;
  }
}

function getRandomWordsFromOtherCategories(excludeCategory: string, count: number): Word[] {
  const otherCategories = Object.keys(WORDS_DATABASE).filter(cat => cat !== excludeCategory);
  const randomWords: Word[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomCategory = otherCategories[Math.floor(Math.random() * otherCategories.length)];
    const categoryWords = WORDS_DATABASE[randomCategory];
    const randomWord = categoryWords[Math.floor(Math.random() * categoryWords.length)];
    if (!randomWords.find(w => w.id === randomWord.id)) {
      randomWords.push(randomWord);
    }
  }
  
  return randomWords;
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