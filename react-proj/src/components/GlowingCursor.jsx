import React, { useState, useEffect, useRef } from 'react';

const GlowingCursor = () => {
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isActiveClickable, setIsActiveClickable] = useState(false);
  const endX = useRef(0);
  const endY = useRef(0);

  useEffect(() => {
    const onMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
      endX.current = e.clientX;
      endY.current = e.clientY;
      setIsVisible(true);
    };

    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);

    // Global link hover detection
    const onMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over clickable elements
      const isClickable = target.closest('a') ||
        target.closest('button') ||
        target.closest('.project-card') ||
        window.getComputedStyle(target).cursor === 'pointer';

      setIsActiveClickable(!!isClickable);
    };


    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  // Smooth follow animation loop
  useEffect(() => {
    let animationFrameId;
    // Current position of the outer circle (for interpolation)
    let curX = 0;
    let curY = 0;

    const animate = () => {
      // Lerp factor - lower is smoother/slower, higher is snappier
      const delay = 0.12;

      // Interpolate current position towards target position
      curX += (endX.current - curX) * delay;
      curY += (endY.current - curY) * delay;

      if (cursorOuterRef.current && cursorInnerRef.current) {
        cursorOuterRef.current.style.top = `${curY}px`;
        cursorOuterRef.current.style.left = `${curX}px`;
        cursorInnerRef.current.style.top = `${endY.current}px`;
        cursorInnerRef.current.style.left = `${endX.current}px`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []); // Only run once on mount

  // Base styles for the cursor elements
  const styles = {
    cursorOuter: {
      position: 'fixed',
      borderRadius: '50%',
      pointerEvents: 'none',
      width: '40px',
      height: '40px',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      backgroundColor: isActiveClickable ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
      transition: 'width 0.3s, height 0.3s, background-color 0.3s, transform 0.3s',
      transform: `translate(-50%, -50%) scale(${isActive ? 0.8 : (isActiveClickable ? 1.5 : 1)})`,
      mixBlendMode: 'difference', // Key for the "premium" look on any bg
      zIndex: 9999,
    },
    cursorInner: {
      position: 'fixed',
      borderRadius: '50%',
      width: '8px',
      height: '8px',
      pointerEvents: 'none',
      backgroundColor: 'white',
      transition: 'width 0.3s, height 0.3s, opacity 0.3s',
      transform: 'translate(-50%, -50%)',
      mixBlendMode: 'difference',
      zIndex: 9999,
      // Hide inner dot when hovering clickable to reduce clutter
      opacity: isActiveClickable ? 0 : 1,
    }
  };

  // Dont render on mobile
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorOuterRef}
        style={{ ...styles.cursorOuter, opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={cursorInnerRef}
        style={{ ...styles.cursorInner, opacity: isVisible ? (isActiveClickable ? 0 : 1) : 0 }}
      />

      {/* Hide default cursor globally */}
      <style>{`
        body, a, button, input {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

export default GlowingCursor;