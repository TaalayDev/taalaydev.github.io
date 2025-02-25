import React, { useState, useEffect, useRef } from 'react';

const CodeCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hoverState, setHoverState] = useState({
    element: '',
    content: null
  });
  
  const cursorRef = useRef(null);
  const symbolRef = useRef(null);
  const ringRef = useRef(null);
  const dotsRef = useRef([]);
  const requestRef = useRef(null);
  
  // Mouse position tracking
  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  // Mouse events
  const onMouseDown = () => setClicked(true);
  const onMouseUp = () => setClicked(false);
  const onMouseLeave = () => setHidden(true);
  const onMouseEnter = () => setHidden(false);
  
  // Code symbols and states for different elements
  const getSymbolForElement = (element) => {
    switch(element) {
      case 'link':
        return { symbol: '⇒', color: '#3b82f6', rotationDeg: 0 };
      case 'button':
        return { symbol: '⦿', color: '#ec4899', rotationDeg: 0 };
      case 'input':
        return { symbol: '{ }', color: '#8b5cf6', rotationDeg: 0 };
      case 'project':
        return { symbol: '</>', color: '#10b981', rotationDeg: 0 };
      case 'skill':
        return { symbol: '⚙️', color: '#f59e0b', rotationDeg: 0 };
      case 'code':
        return { symbol: '✓', color: '#06b6d4', rotationDeg: 0 };
      default:
        return { symbol: '_', color: '#6366f1', rotationDeg: 0 };
    }
  };
  
  // Setup hover detection
  useEffect(() => {
    const handleElementHoverEvents = () => {
      // Links
      document.querySelectorAll('a, .link').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setHoverState({ element: 'link', content: 'link' });
        });
        
        el.addEventListener('mouseleave', () => {
          setHoverState({ element: '', content: null });
        });
      });
      
      // Buttons
      document.querySelectorAll('button, [role="button"], .btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setHoverState({ element: 'button', content: 'button' });
        });
        
        el.addEventListener('mouseleave', () => {
          setHoverState({ element: '', content: null });
        });
      });
      
      // Inputs
      document.querySelectorAll('input, textarea, select').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setHoverState({ element: 'input', content: 'input' });
        });
        
        el.addEventListener('mouseleave', () => {
          setHoverState({ element: '', content: null });
        });
      });
      
      // Project cards
      document.querySelectorAll('.project-card, [data-cursor="project"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          const projectName = el.getAttribute('data-project-name') || 'project';
          setHoverState({ element: 'project', content: projectName });
        });
        
        el.addEventListener('mouseleave', () => {
          setHoverState({ element: '', content: null });
        });
      });
      
      // Skill items
      document.querySelectorAll('.skill-item, [data-cursor="skill"]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          const skillName = el.getAttribute('data-skill-name') || 'skill';
          setHoverState({ element: 'skill', content: skillName });
        });
        
        el.addEventListener('mouseleave', () => {
          setHoverState({ element: '', content: null });
        });
      });
      
      // Code blocks
      document.querySelectorAll('pre, code, .code-block').forEach(el => {
        el.addEventListener('mouseenter', () => {
          setHoverState({ element: 'code', content: 'code' });
        });
        
        el.addEventListener('mouseleave', () => {
          setHoverState({ element: '', content: null });
        });
      });
    };
    
    // Set up global event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    handleElementHoverEvents();
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    let lastX = position.x;
    let lastY = position.y;
    let velocity = { x: 0, y: 0 };
    
    const animateCursor = () => {
      if (cursorRef.current && symbolRef.current && ringRef.current) {
        // Calculate velocity for dynamic effects
        velocity.x = position.x - lastX;
        velocity.y = position.y - lastY;
        
        lastX = position.x;
        lastY = position.y;
        
        const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
        const tilt = Math.min(speed * 0.5, 10); // Limit tilt angle
        
        // Get symbol and styling based on current hover state
        const { symbol, color, rotationDeg } = getSymbolForElement(hoverState.element);
        
        // Apply cursor position and styling
        cursorRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
        
        // Update the symbol
        symbolRef.current.textContent = symbol;
        symbolRef.current.style.color = color;
        symbolRef.current.style.transform = `rotate(${rotationDeg + (velocity.x * 0.5)}deg)`;
        
        // Animate the ring
        ringRef.current.style.borderColor = color;
        ringRef.current.style.transform = `rotate(${-velocity.x * 0.5}deg)`;
        ringRef.current.style.width = hoverState.element ? '40px' : '30px';
        ringRef.current.style.height = hoverState.element ? '40px' : '30px';
        
        // Animate dots based on velocity
        dotsRef.current.forEach((dot, i) => {
          if (dot) {
            const angle = (Date.now() / 1000 * (i + 1) * 0.5) % (Math.PI * 2);
            const radius = 12 + Math.sin(Date.now() / 500 + i) * 2;
            
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            dot.style.transform = `translate(${x}px, ${y}px)`;
            dot.style.backgroundColor = color;
            dot.style.opacity = 0.6 - (speed * 0.02);
            
            // Size based on velocity
            const dotSize = 2 + Math.min(speed * 0.05, 4);
            dot.style.width = `${dotSize}px`;
            dot.style.height = `${dotSize}px`;
          }
        });
      }
      
      requestRef.current = requestAnimationFrame(animateCursor);
    };
    
    requestRef.current = requestAnimationFrame(animateCursor);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [position, hoverState]);
  
  // Initialize dot refs
  useEffect(() => {
    dotsRef.current = dotsRef.current.slice(0, 8);
  }, []);
  
  return (
    <>
      <div 
        className="code-cursor-container fixed top-0 left-0 z-50 pointer-events-none"
        style={{ opacity: hidden ? 0 : 1 }}
      >
        {/* Main cursor container */}
        <div
          ref={cursorRef}
          className="code-cursor fixed top-0 left-0"
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: clicked ? 'transform 0.1s linear' : 'transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1)',
          }}
        >
          {/* Code symbol cursor */}
          <div 
            ref={symbolRef}
            className="text-center absolute font-mono font-bold transition-all duration-150"
            style={{
              fontSize: hoverState.element ? '20px' : '16px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textShadow: '0 0 3px rgba(0,0,0,0.3)',
              color: getSymbolForElement(hoverState.element).color,
            }}
          >
            {getSymbolForElement(hoverState.element).symbol}
          </div>
          
          {/* Circular ring */}
          <div
            ref={ringRef}
            className="absolute rounded-full border-2 transition-all duration-150"
            style={{
              width: hoverState.element ? '40px' : '30px',
              height: hoverState.element ? '40px' : '30px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              borderColor: getSymbolForElement(hoverState.element).color,
              opacity: clicked ? 0.7 : 1,
              scale: clicked ? '0.9' : '1',
            }}
          />
          
          {/* Interactive text (skill name, project name, etc.) */}
          {hoverState.content && hoverState.element !== 'button' && hoverState.element !== 'code' && (
            <div
              className="absolute whitespace-nowrap rounded-md px-2 py-1 text-white font-mono text-xs transition-all duration-150"
              style={{
                top: hoverState.element === 'link' ? '-30px' : '-40px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: getSymbolForElement(hoverState.element).color,
                opacity: 0.9,
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              }}
            >
              {hoverState.content}
            </div>
          )}
          
          {/* Animated dots */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              ref={el => dotsRef.current[i] = el}
              className="absolute rounded-full"
              style={{
                width: '2px',
                height: '2px',
                top: '50%',
                left: '50%',
                backgroundColor: getSymbolForElement(hoverState.element).color,
                opacity: 0.6,
                transform: 'translate(0, 0)',
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
        
        .code-symbol-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @media (max-width: 768px) {
          .code-cursor-container {
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

export default CodeCursor;