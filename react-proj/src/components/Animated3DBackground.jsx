import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const Animated3DBackground = () => {
  const mountRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { theme } = { theme: 'light' };
  
  // Handle mouse movement
  const handleMouseMove = (event) => {
    setMousePosition({
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1,
    });
  };

  // Handle window resize
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // Initialize sizes
    handleResize();

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Scene setup
    const scene = new THREE.Scene();
    
    // Set background based on theme
    const bgColor = theme === 'dark' ? 0x121212 : 0xf5f5f5;
    scene.background = new THREE.Color(bgColor);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear any existing canvas
    if (mountRef.current.childNodes.length > 0) {
      mountRef.current.removeChild(mountRef.current.childNodes[0]);
    }
    
    mountRef.current.appendChild(renderer.domElement);

    // Create geometry objects
    const objects = [];
    const shapeTypes = [
      'icosahedron', 'dodecahedron', 'octahedron', 'tetrahedron', 'sphere'
    ];
    
    // Colors based on theme
    const baseColor = theme === 'dark' ? 0x60cddb : 0x50afc0;
    const accentColor = theme === 'dark' ? 0x7e22ce : 0x3b82f6;
    
    for (let i = 0; i < 25; i++) {
      let geometry;
      const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      
      // Create different geometries
      switch (shapeType) {
        case 'icosahedron':
          geometry = new THREE.IcosahedronGeometry(Math.random() * 0.5 + 0.5, 0);
          break;
        case 'dodecahedron':
          geometry = new THREE.DodecahedronGeometry(Math.random() * 0.5 + 0.5, 0);
          break;
        case 'octahedron':
          geometry = new THREE.OctahedronGeometry(Math.random() * 0.5 + 0.5, 0);
          break;
        case 'tetrahedron':
          geometry = new THREE.TetrahedronGeometry(Math.random() * 0.5 + 0.5, 0);
          break;
        case 'sphere':
          geometry = new THREE.SphereGeometry(Math.random() * 0.5 + 0.5, 16, 16);
          break;
        default:
          geometry = new THREE.BoxGeometry(1, 1, 1);
      }
      
      // Randomize color between base and accent with opacity
      const colorChoice = Math.random() < 0.7 ? baseColor : accentColor;
      const material = new THREE.MeshPhongMaterial({
        color: colorChoice,
        transparent: true,
        opacity: theme === 'dark' ? 0.15 : 0.12,
        flatShading: true,
        wireframe: Math.random() > 0.7
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      
      // Random position across the screen
      mesh.position.x = (Math.random() - 0.5) * 40;
      mesh.position.y = (Math.random() - 0.5) * 30;
      mesh.position.z = (Math.random() - 0.5) * 30;
      
      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      
      // Random movement attributes
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        positionSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        originalPosition: { ...mesh.position }
      };
      
      scene.add(mesh);
      objects.push(mesh);
    }
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(
      theme === 'dark' ? 0x404040 : 0x707070
    );
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point lights
    const pointLight1 = new THREE.PointLight(
      theme === 'dark' ? 0x60cddb : 0x50afc0, 
      0.5, 
      50
    );
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(
      theme === 'dark' ? 0x7e22ce : 0x3b82f6, 
      0.5, 
      50
    );
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);
    
    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Update camera and geometry based on mouse position
      camera.position.x += (mousePosition.x * 10 - camera.position.x) * 0.05;
      camera.position.y += (mousePosition.y * 10 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Update all objects
      objects.forEach(object => {
        // Rotate objects
        object.rotation.x += object.userData.rotationSpeed.x;
        object.rotation.y += object.userData.rotationSpeed.y;
        object.rotation.z += object.userData.rotationSpeed.z;
        
        // Float objects around their original position in a sine wave pattern
        const time = Date.now() * 0.001;
        const { originalPosition } = object.userData;
        
        object.position.x = originalPosition.x + Math.sin(time * 0.5) * 1;
        object.position.y = originalPosition.y + Math.cos(time * 0.3) * 1;
        object.position.z = originalPosition.z + Math.sin(time * 0.2) * 1;
        
        // Interactive response to mouse
        object.scale.x = 1 + Math.sin(time * 0.7) * 0.2;
        object.scale.y = 1 + Math.sin(time * 0.7) * 0.2;
        object.scale.z = 1 + Math.sin(time * 0.7) * 0.2;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      
      if (mountRef.current && mountRef.current.childNodes.length > 0) {
        mountRef.current.removeChild(mountRef.current.childNodes[0]);
      }
      
      // Dispose of geometries and materials
      objects.forEach(object => {
        object.geometry.dispose();
        object.material.dispose();
      });
      
      // Clear scene
      while (scene.children.length > 0) {
        const object = scene.children[0];
        scene.remove(object);
      }
      
      renderer.dispose();
    };
  }, [theme, dimensions]); // Re-run when theme or dimensions change

  return (
    <div 
      ref={mountRef} 
      className="fixed top-0 left-0 w-full h-full z-[-1] pointer-events-none"
      style={{
        opacity: 0.9,
        mixBlendMode: 'normal'
      }}
    />
  );
};

export default Animated3DBackground;