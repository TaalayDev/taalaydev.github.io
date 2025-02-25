import React, { useRef, useEffect, useState } from 'react';

const ParticleNetwork = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const { theme } = { theme: 'light' };
  
  // Handle window resize
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  
  // Handle mouse movement
  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };
  
  // Initialize canvas and particles
  useEffect(() => {
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  // Update canvas when dimensions change
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0 || dimensions.height === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
    
    // Particle settings based on theme
    const particleColor = theme === 'dark' 
      ? { r: 96, g: 205, b: 219 } // Light blue for dark theme
      : { r: 80, g: 175, b: 192 }; // Teal for light theme
    
    const secondaryColor = theme === 'dark'
      ? { r: 126, g: 34, b: 206 } // Purple for dark theme
      : { r: 59, g: 130, b: 246 }; // Blue for light theme
    
    const bgColor = theme === 'dark'
      ? { r: 18, g: 18, b: 18 } // Dark background
      : { r: 248, g: 250, b: 252 }; // Light background
    
    // Create particles
    const particleCount = Math.min(
      Math.floor(dimensions.width * dimensions.height / 10000),
      100
    );
    
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Randomly select color from primary or secondary
      const useSecondary = Math.random() > 0.7;
      const color = useSecondary ? secondaryColor : particleColor;
      
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: Math.random() * 2 + 1,
        color,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        originX: Math.random() * dimensions.width,
        originY: Math.random() * dimensions.height,
      });
    }
    
    particlesRef.current = particles;
    
    // Animation function
    const animate = () => {
      // Clear canvas with a slight trail effect
      ctx.fillStyle = `rgba(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, 0.1)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        
        // Update particle position
        p.x += p.vx;
        p.y += p.vy;
        
        // Apply gravitational pull to mouse pointer
        if (mousePosition.x && mousePosition.y) {
          const dx = mousePosition.x - p.x;
          const dy = mousePosition.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            // Stronger pull when closer
            const forceFactor = (120 - distance) / 6000;
            p.vx += dx * forceFactor;
            p.vy += dy * forceFactor;
          }
        }
        
        // Apply gentle return force to origin
        const dxOrigin = p.originX - p.x;
        const dyOrigin = p.originY - p.y;
        p.vx += dxOrigin * 0.003;
        p.vy += dyOrigin * 0.003;
        
        // Apply friction/damping
        p.vx *= 0.98;
        p.vy *= 0.98;
        
        // Bounce off edges
        if (p.x < 0 || p.x > dimensions.width) p.vx = -p.vx;
        if (p.y < 0 || p.y > dimensions.height) p.vy = -p.vy;
        
        // Draw particle
        const alpha = theme === 'dark' ? 0.8 : 0.6;
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connections between nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            // Fade opacity based on distance
            const alpha = theme === 'dark' 
              ? 0.2 * (1 - distance / 100) 
              : 0.15 * (1 - distance / 100);
            
            // Average colors for connection
            const r = Math.floor((p.color.r + p2.color.r) / 2);
            const g = Math.floor((p.color.g + p2.color.g) / 2);
            const b = Math.floor((p.color.b + p2.color.b) / 2);
            
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = p.radius * 0.5;
            
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, theme]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
      style={{
        opacity: 0.8,
        mixBlendMode: theme === 'dark' ? 'screen' : 'multiply'
      }}
    />
  );
};

export default ParticleNetwork;