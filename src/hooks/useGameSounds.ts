import { Howl } from 'howler';
import { useCallback, useEffect, useRef } from 'react';

export function useGameSounds() {
  const sounds = useRef<Record<string, Howl>>({});

  useEffect(() => {
    // Initialize sounds with local files
    sounds.current = {
      correct: new Howl({
        src: ['/sounds/correct.mp3'],
        volume: 0.5,
        rate: 1.2,
        html5: true,
        preload: true,
        onloaderror: () => console.warn('Failed to load correct sound'),
      }),
      wrong: new Howl({
        src: ['/sounds/wrong.mp3'],
        volume: 0.4,
        html5: true,
        preload: true,
        onloaderror: () => console.warn('Failed to load wrong sound'),
      }),
      levelUp: new Howl({
        src: ['/sounds/level-up.mp3'],
        volume: 0.6,
        rate: 1.1,
        html5: true,
        preload: true,
        onloaderror: () => console.warn('Failed to load level-up sound'),
      }),
      gameComplete: new Howl({
        src: ['/sounds/game-complete.mp3'],
        volume: 0.7,
        html5: true,
        preload: true,
        onloaderror: () => console.warn('Failed to load game-complete sound'),
      }),
      drag: new Howl({
        src: ['/sounds/drag.mp3'],
        volume: 0.3,
        html5: true,
        preload: true,
        onloaderror: () => console.warn('Failed to load drag sound'),
      }),
    };

    // Preload all sounds
    Object.values(sounds.current).forEach(sound => sound.load());

    return () => {
      // Cleanup sounds on unmount
      Object.values(sounds.current).forEach(sound => sound.unload());
    };
  }, []);

  const playSound = useCallback((soundName: 'correct' | 'wrong' | 'levelUp' | 'gameComplete' | 'drag') => {
    try {
      const sound = sounds.current[soundName];
      if (sound && sound.state() === 'loaded') {
        sound.play();
      }
    } catch (error) {
      console.warn(`Error playing sound ${soundName}:`, error);
    }
  }, []);

  return { playSound };
}