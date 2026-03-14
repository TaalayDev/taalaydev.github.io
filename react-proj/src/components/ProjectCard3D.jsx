import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Github, Globe, ArrowUpRight } from 'lucide-react';

// Constants for the 3D effect
const MAX_ROTATION = 8; // Reducing slightly for a more subtle premium feel
const PERSPECTIVE = 1200; // Increasing perspective for flatter, more modern look
const TRANSITION_DURATION = 300; // Quicker, snappier

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
    const rotateY = ((x / cardSize.width) * 2 - 1) * MAX_ROTATION;
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
    const iconClass = "w-3.5 h-3.5";
    switch (platform.toLowerCase()) {
      case 'sourcecode':
        return <Github className={iconClass} />;
      case 'web':
        return <Globe className={iconClass} />;
      default:
        return <ExternalLink className={iconClass} />;
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl md:min-h-[480px] h-auto w-full"
      style={{
        perspective: `${PERSPECTIVE}px`,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="h-full flex flex-col relative rounded-2xl overflow-hidden bg-[#0F0F0F] border border-white/10 shadow-2xl"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
          transitionDuration: isHovering ? '0ms' : `${TRANSITION_DURATION}ms`,
        }}
      >
        {/* Spotlight Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
            zIndex: 10,
          }}
        />

        {/* Image Section */}
        <div className="h-56 relative overflow-hidden bg-[#050505]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent z-10" />
          <img
            src={project.image}
            alt={project.name}
            className="absolute w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-80 group-hover:opacity-100"
            style={{
              transformZ: '20px',
            }}
          />

        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col relative z-20">
          {/* Title & Desc */}
          <div style={{ transform: 'translateZ(30px)' }}>
            <h3 className="text-2xl font-semibold text-white tracking-tight mb-3 group-hover:text-blue-200 transition-colors">
              {project.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">
              {project.description}
            </p>
          </div>

          {/* Tech stack tags */}
          <div
            className="flex flex-wrap gap-2 mb-8"
            style={{ transform: 'translateZ(20px)' }}
          >
            {project.stack.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2.5 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/5 rounded-md backdrop-blur-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Platform links */}
          <div
            className="mt-auto flex flex-wrap gap-3"
            style={{ transform: 'translateZ(40px)' }}
          >
            {Object.entries(project.platforms).map(([platform, url], platformIndex) => (
              <a
                key={platformIndex}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-200 backdrop-blur-md border border-white/10 hover:border-white/20"
              >
                {getPlatformIcon(platform)}
                <span className="capitalize">{platform}</span>
                <ArrowUpRight className="w-3 h-3 opacity-50" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const ProjectGrid3D = ({ projects }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
      {projects.map((project, index) => (
        <ProjectCard3D key={index} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid3D;