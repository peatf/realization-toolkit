import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface OrganicBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  intensity?: 'subtle' | 'medium' | 'strong';
  colorScheme?: 'default' | 'warm' | 'cool' | 'contrast';
  isStatic?: boolean; // Renamed from 'static' to 'isStatic'
}

const OrganicBackgroundEffect: React.FC<OrganicBackgroundProps> = ({
  className = "",
  style = {},
  intensity = 'medium',
  colorScheme = 'default',
  isStatic = false // Renamed from 'static' to 'isStatic'
}) => {
  // Colors based on the visual preview component
  const colors = {
    mint: '#AFCEAE',
    lavender: '#B0B7D8',
    raspberry: '#AA4369',
    copper: '#C2995F',
    background: '#FEFFFA',
    foreground: '#1A1A1A',
    secondary: '#5A5A5A',
  };

  // Generate noise points for the gritty texture - reduced when static
  const [noisePoints, setNoisePoints] = useState([]);
  
  useEffect(() => {
    // Create a texture with more white space but covering the shapes
    const points = [];
    const centerX = 50;
    const centerY = 50;
    const MAX_RADIUS = 65;
    
    // Reduce point count for static mode
    const pointCount = isStatic 
      ? (intensity === 'subtle' ? 40 : intensity === 'medium' ? 60 : 90)
      : (intensity === 'subtle' ? 80 : intensity === 'medium' ? 120 : 180);
    
    for (let i = 0; i < pointCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = MAX_RADIUS * Math.pow(Math.random(), 0.8);
      
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      const distanceRatio = radius / MAX_RADIUS;
      const sizeVariation = Math.random() * 0.7 + 0.3;
      
      const size = (3.0 * (1 - distanceRatio * 0.5)) * sizeVariation;
      const opacity = Math.max(0.05, 0.6 * (1 - distanceRatio * 0.6)) * (Math.random() * 0.3 + 0.5);
      
      let colorIndex = Math.floor(Math.random() * 4);
      const colorSet = {
        'default': [colors.mint, colors.lavender, colors.raspberry, colors.copper],
        'warm': [colors.copper, colors.raspberry, colors.copper, colors.mint],
        'cool': [colors.mint, colors.lavender, colors.mint, colors.lavender],
        'contrast': [colors.raspberry, colors.lavender, colors.mint, colors.copper]
      };
      
      const color = colorSet[colorScheme][colorIndex];
      
      points.push({ x, y, size, color, opacity });
    }
    
    setNoisePoints(points);
  }, [intensity, colorScheme, isStatic]); // Changed 'static' to 'isStatic'

  // Define organic shape paths
  const organicShapePaths = [
    // Central blob (similar to "Philosophy" shape)
    "M60,40 C80,30 90,50 85,70 C80,90 60,95 40,90 C20,85 15,65 25,50 C35,35 50,45 60,40 Z",
    // Left shape (similar to "Practices")
    "M30,35 C40,25 55,35 60,50 C65,65 55,80 40,85 C25,90 15,75 15,60 C15,45 20,45 30,35 Z",
    // Right shape (similar to "Design for Sustainability")
    "M75,50 C90,45 100,55 105,70 C110,85 100,95 85,100 C70,105 60,95 55,80 C50,65 60,55 75,50 Z",
    // Additional blob for more coverage
    "M25,50 C35,40 50,45 55,55 C60,65 55,80 45,85 C35,90 20,85 15,75 C10,65 15,60 25,50 Z"
  ];

  return (
    <div 
      className={`absolute inset-0 overflow-hidden rounded-xl ${className}`}
      style={{
        ...style,
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
        zIndex: 0
      }}
    >
      {/* Organic shape gradient blobs */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {organicShapePaths.map((path, index) => (
          <div 
            key={index}
            className="absolute inset-0"
            style={{ 
              opacity: 0.8 - (index * 0.05)
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 120 120" preserveAspectRatio="none">
              <defs>
                <radialGradient
                  id={`gradient-${colorScheme}-${index}`}
                  cx={index % 2 === 0 ? "30%" : "70%"}
                  cy={index % 3 === 0 ? "30%" : "60%"}
                  r="70%"
                  fx={index % 2 === 0 ? "25%" : "75%"}
                  fy={index % 3 === 0 ? "25%" : "65%"}
                >
                  <stop
                    offset="0%"
                    stopColor={[colors.mint, colors.lavender, colors.raspberry, colors.copper][index % 4]}
                    stopOpacity="0.9"
                  />
                  <stop
                    offset="40%"
                    stopColor={[colors.lavender, colors.raspberry, colors.copper, colors.mint][index % 4]}
                    stopOpacity="0.8"
                  />
                  <stop
                    offset="70%"
                    stopColor={[colors.raspberry, colors.copper, colors.mint, colors.lavender][index % 4]}
                    stopOpacity="0.7"
                  />
                  <stop
                    offset="100%"
                    stopColor={[colors.copper, colors.mint, colors.lavender, colors.raspberry][index % 4]}
                    stopOpacity="0.5"
                  />
                </radialGradient>
                <filter id={`blur-${colorScheme}-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation={intensity === 'subtle' ? 10 : intensity === 'medium' ? 7 : 5} />
                </filter>
              </defs>
              {isStatic ? ( // Changed 'static' to 'isStatic'
                // Static version - no animations
                <path
                  d={path}
                  fill={`url(#gradient-${colorScheme}-${index})`}
                  filter={`url(#blur-${colorScheme}-${index})`}
                />
              ) : (
                // Animated version
                <motion.path
                  d={path}
                  fill={`url(#gradient-${colorScheme}-${index})`}
                  filter={`url(#blur-${colorScheme}-${index})`}
                  animate={{
                    d: [
                      path,
                      // Slightly modified path for animation
                      path.replace(/(\d+),(\d+)/g, (match, p1, p2) => {
                        const x = parseInt(p1) + (Math.random() * 10 - 5);
                        const y = parseInt(p2) + (Math.random() * 10 - 5);
                        return `${x},${y}`;
                      }),
                      // Another variation
                      path.replace(/(\d+),(\d+)/g, (match, p1, p2) => {
                        const x = parseInt(p1) - (Math.random() * 8 - 4);
                        const y = parseInt(p2) - (Math.random() * 8 - 4);
                        return `${x},${y}`;
                      }),
                      path
                    ],
                    opacity: [0.8, 0.7, 0.9, 0.8].map(v => v - (index * 0.05)),
                    scale: [1, 1.03, 0.98, 1],
                    rotate: [0, index % 2 === 0 ? 5 : -5, index % 2 === 0 ? -3 : 3, 0],
                  }}
                  transition={{
                    duration: 15 + index * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                />
              )}
            </svg>
          </div>
        ))}
      </div>

      {/* Gritty texture overlay */}
      <div className="absolute inset-0">
        {noisePoints.map((point, index) => (
          isStatic ? ( // Changed 'static' to 'isStatic'
            // Static version - no animations
            <div
              key={index}
              className="absolute rounded-full"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: `${point.size}px`,
                height: `${point.size}px`,
                backgroundColor: point.color,
                opacity: point.opacity,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ) : (
            // Animated version
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: `${point.size}px`,
                height: `${point.size}px`,
                backgroundColor: point.color,
                opacity: point.opacity,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                opacity: [
                  point.opacity, 
                  point.opacity * 0.6, 
                  point.opacity * 0.8, 
                  point.opacity
                ],
                scale: [
                  1, 
                  Math.random() * 0.3 + 0.85, 
                  Math.random() * 0.2 + 0.9, 
                  1
                ],
              }}
              transition={{
                duration: Math.random() * 4 + 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 3,
              }}
            />
          )
        ))}
      </div>

      {/* Rest of the component remains unchanged */}
      {/* ... */}
    </div>
  );
};

export default OrganicBackgroundEffect;