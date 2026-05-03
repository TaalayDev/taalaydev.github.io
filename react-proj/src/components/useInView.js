import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook for detecting when an element enters the viewport.
 * @param {number} threshold - Intersection ratio threshold (0-1)
 * @returns {[React.RefObject, boolean]}
 */
export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          // Once visible, stop observing
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isInView];
}
