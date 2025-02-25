import React, { useState, useEffect, useRef } from 'react';

const AnimatedCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [projectHovered, setProjectHovered] = useState(false);
  const [skillHovered, setSkillHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorDotRef = useRef(null);
  const trailDotsRef = useRef([]);
  const requestRef = useRef(null);
  const trailPositions = useRef(Array(5).fill({ x: 0, y: 0 }));
  
  // Handle cursor position updates
  const onMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    
    // Update trail positions with delay
    trailPositions.current = [
      { x: e.clientX, y: e.clientY },
      ...trailPositions.current.slice(0, trailPositions.current.length - 1)
    ];
  };
  
  // Handle mouse events
  const onMouseDown = () => setClicked(true);
  const onMouseUp = () => setClicked(false);
  const onMouseLeave = () => setHidden(true);
  const onMouseEnter = () => setHidden(false);
  
  // Toggle cursor appearance when hovering interactive elements
  useEffect(() => {
    const handleElementHoverEvents = () => {
      // Basic interactive elements
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach(el => {
        el.addEventListener('mouseover', () => {
          const isButton = el.tagName.toLowerCase() === 'button' || 
                           el.getAttribute('role') === 'button' ||
                           el.classList.contains('btn');
          
          setLinkHovered(!isButton);
          setButtonHovered(isButton);
          setProjectHovered(false);
          setSkillHovered(false);
          setCursorText('');
        });
        
        el.addEventListener('mouseout', () => {
          setLinkHovered(false);
          setButtonHovered(false);
        });
      });
      
      // Project cards
      document.querySelectorAll('.project-card, [data-cursor="view"]').forEach(el => {
        el.addEventListener('mouseover', () => {
          setProjectHovered(true);
          setLinkHovered(false);
          setButtonHovered(false);
          setSkillHovered(false);
          setCursorText('View');
        });
        
        el.addEventListener('mouseout', () => {
          setProjectHovered(false);
          setCursorText('');
        });
      });
      
      // Skill elements
      document.querySelectorAll('.skill-item, [data-cursor="skill"]').forEach(el => {
        el.addEventListener('mouseover', () => {
          setSkillHovered(true);
          setProjectHovered(false);
          setLinkHovered(false);
          setButtonHovered(false);
          
          // Try to get the skill name from data attribute
          const skillName = el.getAttribute('data-skill-name');
          setCursorText(skillName || 'Skill');
        });
        
        el.addEventListener('mouseout', () => {
          setSkillHovered(false);
          setCursorText('');
        });
      });
    };
    
    handleElementHoverEvents();
    
    // Implement magnetic effect on buttons and other interactive elements
    const handleMagneticEffect = () => {
      document.querySelectorAll('button, a.btn, [role="button"], .magnetic-element').forEach(button => {
        button.addEventListener('mousemove', (e) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          // Calculate distance from center
          const distance = Math.sqrt(x * x + y * y);
          const maxDistance = Math.max(rect.width, rect.height) / 2;
          
          // Stronger effect for closer elements
          const strength = 0.15 * (1 - Math.min(1, distance / maxDistance));
          
          // Move the button slightly toward cursor
          button.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
          // Add a smooth transition back
          button.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
          button.style.transform = 'translate(0px, 0px)';
          
          // Remove transition after animation completes
          setTimeout(() => {
            button.style.transition = '';
          }, 500);
        });
      });
    };
    
    handleMagneticEffect();
    
    // Set up mouse event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);
  
  // Animation loop for smooth cursor movement with spring physics
  useEffect(() => {
    let cursorSpeed = { x: 0, y: 0 };
    let cursorPosition = { x: 0, y: 0 };
    const springFactor = 0.15;
    const ease = 0.25;
    
    const animateCursor = () => {
      if (cursorRef.current && cursorRingRef.current && cursorDotRef.current) {
        // Spring physics for main cursor
        const dx = position.x - cursorPosition.x;
        const dy = position.y - cursorPosition.y;
        
        // Update velocity with spring physics
        cursorSpeed.x += dx * springFactor;
        cursorSpeed.y += dy * springFactor;
        
        // Apply damping to slow down movement
        cursorSpeed.x *= ease;
        cursorSpeed.y *= ease;
        
        // Update position
        cursorPosition.x += cursorSpeed.x;
        cursorPosition.y += cursorSpeed.y;
        
        // Apply to cursor elements
        cursorRingRef.current.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
        cursorDotRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
        
        // Calculate trail positions with spring effect
        const trailPositionsWithSpring = [position];
        let lastPos = position;
        
        for (let i = 1; i < 5; i++) {
          // Each trail point follows the previous one with delay
          const prevPos = trailPositionsWithSpring[i-1];
          const trailSpringFactor = springFactor * (0.8 - i * 0.15);
          
          // Get the current position or use the last calculated one
          const currentPos = trailPositions.current[i] || lastPos;
          
          // Calculate new position with spring physics
          const tx = prevPos.x - currentPos.x;
          const ty = prevPos.y - currentPos.y;
          
          const newX = currentPos.x + tx * trailSpringFactor;
          const newY = currentPos.y + ty * trailSpringFactor;
          
          trailPositionsWithSpring.push({ x: newX, y: newY });
          lastPos = { x: newX, y: newY };
        }
        
        // Update trail dots with spring physics
        trailDotsRef.current.forEach((dot, index) => {
          if (dot) {
            const trailPos = trailPositionsWithSpring[index + 1] || trailPositionsWithSpring[trailPositionsWithSpring.length - 1];
            dot.style.transform = `translate(${trailPos.x}px, ${trailPos.y}px)`;
            
            // Visual effects for trail
            dot.style.opacity = 1 - (index * 0.2);
            dot.style.scale = 1 - (index * 0.15);
            
            // Add color variation
            const hue = 200 + index * 10; // Blue range
            dot.style.backgroundColor = `hsla(${hue}, 80%, 60%, ${1 - index * 0.15})`;
          }
        });
      }
      
      requestRef.current = requestAnimationFrame(animateCursor);
    };
    
    requestRef.current = requestAnimationFrame(animateCursor);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [position]);
  
  // Create refs for trail dots
  useEffect(() => {
    trailDotsRef.current = trailDotsRef.current.slice(0, 5);
  }, []);
  
  return (
    <>
      <div 
        ref={cursorRef} 
        className="cursor-container fixed top-0 left-0 z-50 pointer-events-none"
        style={{ opacity: hidden ? 0 : 1 }}
      >
        {/* Main cursor ring */}
        <div
          ref={cursorRingRef}
          className={`cursor-ring fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-blue-500 transition-all duration-200 ease-out ${
            clicked ? 'scale-75' : ''
          } ${linkHovered ? 'scale-150 border-blue-400' : ''} ${
            buttonHovered ? 'scale-0' : ''
          } ${projectHovered ? 'scale-300 w-16 h-16 border-teal-400 bg-teal-50 opacity-90' : ''} ${
            skillHovered ? 'scale-250 w-24 h-24 border-purple-400 bg-purple-50 opacity-80' : ''
          }`}
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            marginLeft: projectHovered ? '-32px' : skillHovered ? '-48px' : '-16px',
            marginTop: projectHovered ? '-32px' : skillHovered ? '-48px' : '-16px',
            transitionProperty: 'width, height, border, margin, transform, background, opacity'
          }}
        >
          {/* Conditional text inside the cursor ring */}
          {(projectHovered || skillHovered) && (
            <div className={`absolute inset-0 flex items-center justify-center text-xs font-medium
              ${projectHovered ? 'text-teal-700' : 'text-purple-700'}`}>
              {cursorText}
            </div>
          )}
          
          {/* Project icon */}
          {projectHovered && !cursorText && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Main cursor dot */}
        <div
          ref={cursorDotRef}
          className={`cursor-dot fixed top-0 left-0 w-3 h-3 bg-blue-600 rounded-full transition-all duration-200 ${
            clicked ? 'scale-50' : ''
          } ${linkHovered ? 'scale-150 bg-blue-400' : ''} ${
            buttonHovered ? 'scale-200 bg-white opacity-30' : ''
          } ${projectHovered || skillHovered ? 'opacity-0' : ''}`}
          style={{ 
            transform: `translate(${position.x}px, ${position.y}px)`,
            marginLeft: '-6px',
            marginTop: '-6px',
            transitionProperty: 'width, height, opacity, margin, transform, background'
          }}
        />
        
        {/* Trail dots */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            ref={el => trailDotsRef.current[index] = el}
            className="cursor-trail fixed top-0 left-0 w-1 h-1 rounded-full bg-blue-500 opacity-50"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
              marginLeft: '-2px',
              marginTop: '-2px',
            }}
          />
        ))}
      </div>
      
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
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

export default AnimatedCursor;