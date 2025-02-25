import React, { useState, useEffect, useRef } from 'react';

const GlowingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState('');
  
  const cursorOuterRef = useRef(null);
  const cursorInnerRef = useRef(null);
  const rippleRef = useRef(null);
  const particlesRef = useRef([]);
  
  // Mouse position tracking
  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  // Handle mouse events
  const onMouseDown = () => {
    setClicked(true);
    createRipple();
  };
  
  const onMouseUp = () => {
    setClicked(false);
  };
  
  const onMouseLeave = () => setHidden(true);
  const onMouseEnter = () => setHidden(false);
  
  // Create ripple effect on click
  const createRipple = () => {
    if (rippleRef.current) {
      // Reset animation
      rippleRef.current.style.animation = 'none';
      
      // Trigger reflow
      void rippleRef.current.offsetWidth;
      
      // Start animation
      rippleRef.current.style.left = `${position.x}px`;
      rippleRef.current.style.top = `${position.y}px`;
      rippleRef.current.style.animation = 'ripple-effect 0.8s ease-out forwards';
    }
  };

  // Set up element-specific hover behaviors
  useEffect(() => {
    const setupHoverEffects = () => {
      // Links
      document.querySelectorAll('a').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setHoverType('link');
        });
        
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setHoverType('');
        });
      });
      
      // Buttons
      document.querySelectorAll('button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setHoverType('button');
        });
        
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setHoverType('');
        });
      });
      
      // Images and media
      document.querySelectorAll('img, video, .media').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setHoverType('media');
        });
        
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setHoverType('');
        });
      });
      
      // Project elements
      document.querySelectorAll('.project-card, [data-cursor="project"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setHoverType('project');
        });
        
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setHoverType('');
        });
      });

      // Skills
      document.querySelectorAll('.skill-item, [data-cursor="skill"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          setHoverType('skill');
        });
        
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setHoverType('');
        });
      });
    };
    
    // Set up event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    setupHoverEffects();
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);
  
  // Cursor animation loop
  useEffect(() => {
    const animateCursor = () => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        // Move cursor elements with subtle lag for outer cursor
        cursorOuterRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
        cursorInnerRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }
      
      // Animate particles around cursor for glow effect
      particlesRef.current.forEach((particle, i) => {
        if (particle) {
          const angle = (i / particlesRef.current.length) * Math.PI * 2;
          const radius = 15 + Math.sin(Date.now() * 0.003 + i) * 5;
          
          const x = position.x + Math.cos(angle) * radius;
          const y = position.y + Math.sin(angle) * radius;
          
          particle.style.transform = `translate(${x}px, ${y}px)`;
          particle.style.opacity = 0.4 + Math.sin(Date.now() * 0.003 + i) * 0.3;
        }
      });
      
      requestAnimationFrame(animateCursor);
    };
    
    const animationFrame = requestAnimationFrame(animateCursor);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [position]);
  
  // Create refs for particles
  useEffect(() => {
    particlesRef.current = particlesRef.current.slice(0, 8);
  }, []);
  
  // Get styles based on hover type
  const getCursorStyles = () => {
    const styles = {
      outer: {
        borderColor: 'rgba(100, 108, 255, 0.6)',
        mixBlendMode: 'normal',
      },
      inner: {
        backgroundColor: 'rgba(100, 108, 255, 1)',
      }
    };
    
    // Customize based on hover type
    switch(hoverType) {
      case 'link':
        styles.outer.borderColor = 'rgba(50, 200, 180, 0.8)';
        styles.inner.backgroundColor = 'rgba(50, 200, 180, 1)';
        styles.outer.width = '40px';
        styles.outer.height = '40px';
        styles.outer.marginLeft = '-20px';
        styles.outer.marginTop = '-20px';
        styles.outer.borderWidth = '2px';
        styles.outer.mixBlendMode = 'overlay';
        break;
      case 'button':
        styles.outer.borderColor = 'rgba(255, 100, 130, 0.8)';
        styles.inner.backgroundColor = 'rgba(255, 100, 130, 1)';
        styles.outer.width = '50px';
        styles.outer.height = '50px';
        styles.outer.marginLeft = '-25px';
        styles.outer.marginTop = '-25px';
        styles.outer.borderRadius = '10px';
        styles.inner.width = '6px';
        styles.inner.height = '6px';
        styles.inner.borderRadius = '3px';
        styles.outer.borderWidth = '2px';
        break;
      case 'media':
        styles.outer.borderColor = 'rgba(255, 200, 70, 0.6)';
        styles.inner.backgroundColor = 'rgba(255, 200, 70, 1)';
        styles.outer.width = '60px';
        styles.outer.height = '60px';
        styles.outer.marginLeft = '-30px';
        styles.outer.marginTop = '-30px';
        styles.outer.borderRadius = '50%';
        styles.outer.mixBlendMode = 'multiply';
        styles.outer.borderWidth = '3px';
        break;
      case 'project':
        styles.outer.borderColor = 'rgba(130, 80, 255, 0.6)';
        styles.inner.backgroundColor = 'rgba(130, 80, 255, 1)';
        styles.outer.width = '70px';
        styles.outer.height = '30px';
        styles.outer.marginLeft = '-35px';
        styles.outer.marginTop = '-15px';
        styles.outer.borderRadius = '20px';
        styles.inner.width = '4px';
        styles.inner.height = '4px';
        styles.outer.borderWidth = '2px';
        break;
      case 'skill':
        styles.outer.borderColor = 'rgba(50, 200, 100, 0.6)';
        styles.inner.backgroundColor = 'rgba(50, 200, 100, 1)';
        styles.outer.width = '50px';
        styles.outer.height = '50px';
        styles.outer.marginLeft = '-25px';
        styles.outer.marginTop = '-25px';
        styles.outer.borderRadius = '5px';
        styles.outer.transform = 'rotate(45deg)';
        styles.outer.borderWidth = '2px';
        break;
      default:
        // Default styles
        break;
    }
    
    // Apply clicked state styling
    if (clicked) {
      styles.outer.width = parseInt(styles.outer.width || '30') * 0.8 + 'px';
      styles.outer.height = parseInt(styles.outer.height || '30') * 0.8 + 'px';
      styles.inner.width = '3px';
      styles.inner.height = '3px';
      styles.outer.borderWidth = '3px';
    }
    
    return styles;
  };
  
  const cursorStyles = getCursorStyles();
  
  return (
    <>
      <div 
        className="cursor-container fixed top-0 left-0 z-50 pointer-events-none"
        style={{ opacity: hidden ? 0 : 1 }}
      >
        {/* Outer glow cursor */}
        <div
          ref={cursorOuterRef}
          className="cursor-outer fixed rounded-full border-2 transition-all duration-150 ease-out"
          style={{ 
            width: cursorStyles.outer.width || '30px',
            height: cursorStyles.outer.height || '30px',
            transform: `translate(${position.x}px, ${position.y}px) ${cursorStyles.outer.transform || ''}`,
            marginLeft: cursorStyles.outer.marginLeft || '-15px',
            marginTop: cursorStyles.outer.marginTop || '-15px',
            borderColor: cursorStyles.outer.borderColor,
            borderWidth: cursorStyles.outer.borderWidth || '2px',
            borderRadius: cursorStyles.outer.borderRadius || '50%',
            mixBlendMode: cursorStyles.outer.mixBlendMode || 'normal',
            boxShadow: `0 0 15px ${cursorStyles.outer.borderColor || 'rgba(100, 108, 255, 0.5)'}`,
          }}
        />
        
        {/* Inner dot cursor */}
        <div
          ref={cursorInnerRef}
          className="cursor-inner fixed rounded-full transition-all duration-75"
          style={{ 
            width: cursorStyles.inner.width || '5px',
            height: cursorStyles.inner.height || '5px',
            transform: `translate(${position.x}px, ${position.y}px)`,
            marginLeft: cursorStyles.inner.marginLeft || '-2.5px',
            marginTop: cursorStyles.inner.marginTop || '-2.5px',
            backgroundColor: cursorStyles.inner.backgroundColor,
            borderRadius: cursorStyles.inner.borderRadius || '50%',
            boxShadow: `0 0 8px ${cursorStyles.inner.backgroundColor || 'rgba(100, 108, 255, 0.8)'}`,
          }}
        />
        
        {/* Ripple effect */}
        <div
          ref={rippleRef}
          className="cursor-ripple fixed w-1 h-1 bg-transparent pointer-events-none"
          style={{
            marginLeft: '-40px',
            marginTop: '-40px',
          }}
        />
        
        {/* Particles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className="cursor-particle fixed w-1 h-1 rounded-full opacity-0"
            style={{
              backgroundColor: cursorStyles.inner.backgroundColor || 'rgba(100, 108, 255, 0.8)',
              boxShadow: `0 0 6px ${cursorStyles.inner.backgroundColor || 'rgba(100, 108, 255, 0.8)'}`,
            }}
          />
        ))}
      </div>
      
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        @keyframes ripple-effect {
          0% {
            width: 0px;
            height: 0px;
            opacity: 0.5;
            border: 2px solid ${cursorStyles.outer.borderColor || 'rgba(100, 108, 255, 0.6)'};
          }
          100% {
            width: 80px;
            height: 80px;
            opacity: 0;
            border: 0px solid ${cursorStyles.outer.borderColor || 'rgba(100, 108, 255, 0.6)'};
          }
        }
        
        .cursor-ripple {
          border-radius: 50%;
          position: fixed;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        
        @media (max-width: 768px) {
          .cursor-container {
            display: none;
          }
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default GlowingCursor;