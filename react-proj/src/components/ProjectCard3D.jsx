import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';

// Constants for the 3D effect
const MAX_ROTATION = 10; // Maximum rotation in degrees
const PERSPECTIVE = 1000; // Perspective value for 3D effect
const TRANSITION_DURATION = 400; // ms

const ProjectCard3D = ({ project }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cardSize, setCardSize] = useState({ width: 0, height: 0 });
  
  // Update card dimensions when component mounts
  useEffect(() => {
    if (cardRef.current) {
      setCardSize({
        width: cardRef.current.offsetWidth,
        height: cardRef.current.offsetHeight
      });
    }
  }, []);
  
  // Handle mouse movement over the card
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    // Get mouse position relative to the card
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    // Map from [0, width] to [-MAX_ROTATION, MAX_ROTATION]
    const rotateY = ((x / cardSize.width) * 2 - 1) * MAX_ROTATION;
    // Map from [0, height] to [MAX_ROTATION, -MAX_ROTATION] (inverted)
    const rotateX = ((y / cardSize.height) * 2 - 1) * -MAX_ROTATION;
    
    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x, y });
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
  };
  
  // Platform icon helper
  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'sourcecode':
        return <Github className="w-4 h-4" />;
      case 'web':
        return <Globe className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };
  
  return (
    <div
      ref={cardRef}
      className="relative rounded-xl overflow-hidden shadow-lg bg-white"
      style={{
        perspective: `${PERSPECTIVE}px`,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="h-full flex flex-col transition-transform"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transitionDuration: isHovering ? '0ms' : `${TRANSITION_DURATION}ms`,
        }}
      >
        {/* Image Section with 3D depth */}
        <div className="h-48 relative overflow-hidden">
          <img
            src={project.image}
            alt={project.name}
            className="absolute w-full h-full object-cover transition-transform duration-300"
            style={{
              transform: isHovering ? 'scale(1.05)' : 'scale(1)',
              transformStyle: 'preserve-3d',
              transformZ: '20px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          
          {/* Project title with depth */}
          <div 
            className="absolute bottom-0 left-0 p-4 w-full"
            style={{
              transform: 'translateZ(30px)',
            }}
          >
            <h3 className="text-2xl font-bold text-white">{project.name}</h3>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-gray-600 mb-4">{project.description}</p>
          
          {/* Tech stack tags with depth */}
          <div 
            className="flex flex-wrap gap-2 mb-4"
            style={{
              transform: 'translateZ(25px)',
            }}
          >
            {project.stack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Platform links with depth */}
          <div 
            className="mt-auto flex flex-wrap gap-3"
            style={{
              transform: 'translateZ(40px)',
            }}
          >
            {Object.entries(project.platforms).map(([platform, url], platformIndex) => (
              <a
                key={platformIndex}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-105 border border-gray-200"
              >
                {getPlatformIcon(platform)}
                <span className="capitalize">{platform}</span>
              </a>
            ))}
          </div>
        </div>
        
        {/* Highlight effect */}
        {isHovering && (
          <div
            className="absolute pointer-events-none inset-0 rounded-xl"
            style={{
              background: `radial-gradient(circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
              zIndex: 5,
            }}
          />
        )}
      </div>
    </div>
  );
};

const ProjectGrid3D = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {projects.map((project, index) => (
        <ProjectCard3D key={index} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid3D;