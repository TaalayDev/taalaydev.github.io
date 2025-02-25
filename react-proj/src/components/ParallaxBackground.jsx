import React, { useState, useEffect, useRef } from 'react';

const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef(null);
  const shapesRef = useRef([]);
  const { theme } = { theme: 'light' };
  
  // Handle mouse movement to create parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    // Calculate mouse position as percentage of window
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    
    setMousePosition({ x, y });
  };
  
  // Generate shapes data
  const generateShapes = () => {
    const shapes = [];
    const shapeTypes = ['square', 'circle', 'triangle', 'diamond', 'pentagon', 'hexagon'];
    
    for (let i = 0; i < 30; i++) {
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const size = 10 + Math.random() * 40;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const depth = Math.random() * 5 + 1; // Parallax depth - higher = more movement
      const rotation = Math.random() * 360;
      const rotationSpeed = (Math.random() - 0.5) * 0.1;
      const opacity = 0.05 + Math.random() * 0.15;
      
      shapes.push({
        id: i,
        type,
        size,
        x,
        y,
        depth,
        rotation,
        rotationSpeed,
        opacity,
        color: theme === 'dark' ? getRandomDarkColor() : getRandomLightColor()
      });
    }
    
    return shapes;
  };
  
  // Get random color for shapes - light theme
  const getRandomLightColor = () => {
    const colors = [
      '#50afc0', // Teal
      '#3b82f6', // Blue
      '#8b5cf6', // Purple
      '#7dd3fc', // Light blue
      '#c4b5fd', // Lavender
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Get random color for shapes - dark theme
  const getRandomDarkColor = () => {
    const colors = [
      '#67e8f9', // Cyan
      '#60cddb', // Teal
      '#a5b4fc', // Indigo
      '#7e22ce', // Purple
      '#3b82f6', // Blue
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  // Generate SVG path for different shapes
  const getShapePath = (type, size) => {
    const halfSize = size / 2;
    
    switch (type) {
      case 'square':
        return `M${-halfSize},${-halfSize} L${halfSize},${-halfSize} L${halfSize},${halfSize} L${-halfSize},${halfSize} Z`;
      case 'circle':
        return `M0,${-halfSize} A${halfSize},${halfSize} 0 1,0 0,${halfSize} A${halfSize},${halfSize} 0 1,0 0,${-halfSize}`;
      case 'triangle':
        return `M0,${-halfSize} L${halfSize},${halfSize} L${-halfSize},${halfSize} Z`;
      case 'diamond':
        return `M0,${-halfSize} L${halfSize},0 L0,${halfSize} L${-halfSize},0 Z`;
      case 'pentagon': {
        const points = [];
        for (let i = 0; i < 5; i++) {
          const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
          points.push(`${halfSize * Math.cos(angle)},${halfSize * Math.sin(angle)}`);
        }
        return `M${points.join(' L')} Z`;
      }
      case 'hexagon': {
        const points = [];
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI * 2 * i) / 6;
          points.push(`${halfSize * Math.cos(angle)},${halfSize * Math.sin(angle)}`);
        }
        return `M${points.join(' L')} Z`;
      }
      default:
        return `M${-halfSize},${-halfSize} L${halfSize},${-halfSize} L${halfSize},${halfSize} L${-halfSize},${halfSize} Z`;
    }
  };
  
  // Initialize shapes
  const [shapes, setShapes] = useState([]);
  
  useEffect(() => {
    setShapes(generateShapes());
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation loop
    let animationId;
    let lastTime = 0;
    
    const animateShapes = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Update shapes (rotation)
      setShapes(prevShapes => 
        prevShapes.map(shape => ({
          ...shape,
          rotation: shape.rotation + shape.rotationSpeed * deltaTime
        }))
      );
      
      animationId = requestAnimationFrame(animateShapes);
    };
    
    animationId = requestAnimationFrame(animateShapes);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [theme]);
  
  return (
    <div 
      ref={backgroundRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none overflow-hidden"
      style={{
        backgroundColor: 'transparent'
      }}
    >
      {/* Background grid pattern */}
      <div 
        className={`absolute inset-0 ${
          theme === 'dark' 
            ? 'bg-grid-dark opacity-20' 
            : 'bg-grid-light opacity-30'
        }`}
        style={{
          backgroundImage: `linear-gradient(to right, ${theme === 'dark' ? '#333' : '#ccc'} 1px, transparent 1px), 
                           linear-gradient(to bottom, ${theme === 'dark' ? '#333' : '#ccc'} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* SVG shapes */}
      <svg 
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          filter: theme === 'dark' ? 'brightness(1.2)' : 'brightness(1)'
        }}
      >
        <defs>
          <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor={theme === 'dark' ? '#60cddb' : '#50afc0'} stopOpacity="0.2" />
            <stop offset="100%" stopColor={theme === 'dark' ? '#60cddb' : '#50afc0'} stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Add a subtle glow */}
        <circle 
          cx="50%" 
          cy="50%" 
          r="30%" 
          fill="url(#glow)" 
          className="animate-pulse-slow"
        />
        
        {/* Render all shapes */}
        {shapes.map(shape => {
          // Calculate parallax movement based on mouse position and depth
          const moveX = -mousePosition.x * shape.depth * 20;
          const moveY = -mousePosition.y * shape.depth * 20;
          
          return (
            <g 
              key={shape.id}
              transform={`
                translate(${shape.x}%, ${shape.y}%)
                translate(${moveX}px, ${moveY}px)
                rotate(${shape.rotation})
              `}
              style={{ transition: 'transform 0.1s ease-out' }}
            >
              <path
                d={getShapePath(shape.type, shape.size)}
                fill={shape.color}
                opacity={shape.opacity}
                className={`${shape.depth > 3 ? 'animate-float' : ''}`}
                style={{
                  animationDelay: `${shape.id * 0.1}s`,
                  animationDuration: `${5 + shape.id % 3}s`
                }}
              />
            </g>
          );
        })}
      </svg>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(10px); }
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.1; }
        }
        
        .bg-grid-dark {
          background-image: linear-gradient(to right, #333333 1px, transparent 1px),
            linear-gradient(to bottom, #333333 1px, transparent 1px);
        }
        
        .bg-grid-light {
          background-image: linear-gradient(to right, #cccccc 1px, transparent 1px),
            linear-gradient(to bottom, #cccccc 1px, transparent 1px);
        }
      `}</style>
    </div>
  );
};

export default ParallaxBackground;