import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to detect when an element is visible in the viewport
 * and trigger animations accordingly
 */
export const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  
  const {
    threshold = 0.1,        // How much of the element needs to be visible
    triggerOnce = true,     // Only trigger animation once
    rootMargin = '0px',     // Margin around the root
  } = options;
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        const visible = entry.isIntersecting;
        setIsVisible(visible);
        
        if (visible && triggerOnce && !hasAnimated) {
          setHasAnimated(true);
          // If we only want to trigger once and element is visible,
          // disconnect the observer
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, triggerOnce, hasAnimated]);
  
  return { ref, isVisible, hasAnimated };
};

/**
 * Component that wraps children with scroll-triggered animations
 */
const ScrollAnimation = ({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  duration = 500,
  triggerOnce = true,
  threshold = 0.1,
  className = '',
  ...props 
}) => {
  const { ref, isVisible } = useScrollAnimation({
    triggerOnce,
    threshold,
  });
  
  // Define animation classes
  const animations = {
    'fade-up': 'opacity-0 translate-y-8',
    'fade-down': 'opacity-0 -translate-y-8',
    'fade-left': 'opacity-0 translate-x-8',
    'fade-right': 'opacity-0 -translate-x-8',
    'zoom-in': 'opacity-0 scale-95',
    'zoom-out': 'opacity-0 scale-105',
  };
  
  const baseClass = animations[animation] || animations['fade-up'];
  
  return (
    <div
      ref={ref}
      className={`transition-all ${baseClass} ${
        isVisible 
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100' 
          : ''
      } ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;