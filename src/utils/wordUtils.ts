export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function getRandomizedWords(correctWords: string[], incorrectWords: string[]) {
  const allWords = [
    ...correctWords.map(word => ({ word, isCorrect: true })),
    ...incorrectWords.map(word => ({ word, isCorrect: false }))
  ];
  
  return shuffleArray(allWords);
}