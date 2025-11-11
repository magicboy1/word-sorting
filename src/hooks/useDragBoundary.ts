import { useCallback } from 'react';

export function useDragBoundary() {
  const checkBoundary = useCallback((e: DragEvent) => {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    const buffer = 50; // Buffer zone from viewport edges

    // Check top boundary
    if (e.clientY < buffer) {
      window.scrollBy({ top: -20, behavior: 'smooth' });
    }
    // Check bottom boundary
    if (e.clientY > viewportHeight - buffer) {
      window.scrollBy({ top: 20, behavior: 'smooth' });
    }
    // Check left boundary
    if (e.clientX < buffer) {
      window.scrollBy({ left: -20, behavior: 'smooth' });
    }
    // Check right boundary
    if (e.clientX > viewportWidth - buffer) {
      window.scrollBy({ left: 20, behavior: 'smooth' });
    }
  }, []);

  return checkBoundary;
}