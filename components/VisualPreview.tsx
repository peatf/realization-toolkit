import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GlassCardGrittyGradientBlob = () => {
  // Colors from the provided hex codes
  const colors = {
    mint: '#AFCEAE',      // Soft mint green
    lavender: '#B0B7D8',  // Soft lavender blue
    raspberry: '#AA4369', // Rich raspberry
    copper: '#C2995F',    // Warm copper
    background: '#FEFFFA',
    foreground: '#1A1A1A',
    secondary: '#5A5A5A',
  };

  // Generate noise points for the gritty texture
  const [noisePoints, setNoisePoints] = useState([]);
  
  useEffect(() => {
    // Create a texture with more white space but covering the shapes
    const points = [];
    const centerX = 50;
    const centerY = 50;
    const MAX_RADIUS = 65;
    
    for (let i = 0; i < 180; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = MAX_RADIUS * Math.pow(Math.random(), 0.8);
      
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      
      const distanceRatio = radius / MAX_RADIUS;
      const sizeVariation = Math.random() * 0.7 + 0.3;
      
      const size = (3.0 * (1 - distanceRatio * 0.5)) * sizeVariation;
      const opacity = Math.max(0.05, 0.6 * (1 - distanceRatio * 0.6)) * (Math.random() * 0.3 + 0.5);
      
      let colorIndex = Math.floor(Math.random() * 4);
      const color = [colors.mint, colors.lavender, colors.raspberry, colors.copper][colorIndex];
      
      points.push({ x, y, size, color, opacity });
    }
    
    setNoisePoints(points);
  }, []);

  // SVG paths for organic shapes inspired by the landscape map
  const organicShapePaths = [
    // Main central shape (similar to "Service Innovation Processes")
    "M30,30 C45,20 65,25 75,40 C85,55 80,75 65,85 C50,95 30,90 20,75 C10,60 15,40 30,30 Z",
    
    // Upper right shape (similar to "Service Design Practice")
    "M70,20 C85,15 95,25 98,40 C101,55 95,65 80,68 C65,71 55,65 52,50 C49,35 55,25 70,20 Z",
    
    // Lower shape (similar to "Value Creation")
    "M40,65 C55,60 70,65 75,80 C80,95 70,105 55,110 C40,115 25,105 20,90 C15,75 25,70 40,65 Z",
    
    // Right shape (similar to "Design for Sustainability")
    "M75,50 C90,45 100,55 105,70 C110,85 100,95 85,100 C70,105 60,95 55,80 C50,65 60,55 75,50 Z",
    
    // Additional blob for more coverage
    "M25,50 C35,40 50,45 55,55 C60,65 55,80 45,85 C35,90 20,85 15,75 C10,65 15,60 25,50 Z"
  ];

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div
        className="relative max-w-3xl w-full aspect-video overflow-hidden rounded-xl shadow-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
        }}
      >
        {/* Organic shape gradient blobs */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {organicShapePaths.map((path, index) => (
            <motion.div 
              key={index}
              className="absolute inset-0"
              style={{ 
                opacity: 0.8 - (index * 0.05)
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 120 120" preserveAspectRatio="none">
                <defs>
                  <radialGradient
                    id={`gradient-${index}`}
                    cx={index % 2 === 0 ? "30%" : "70%"}
                    cy={index % 3 === 0 ? "30%" : "60%"}
                    r="70%"
                    fx={index % 2 === 0 ? "25%" : "75%"}
                    fy={index % 3 === 0 ? "25%" : "65%"}
                  >
                    <stop
                      offset="0%"
                      stopColor={[colors.mint, colors.lavender, colors.raspberry, colors.copper, colors.mint][index % 5]}
                      stopOpacity="0.9"
                    />
                    <stop
                      offset="40%"
                      stopColor={[colors.lavender, colors.raspberry, colors.copper, colors.mint, colors.lavender][index % 5]}
                      stopOpacity="0.8"
                    />
                    <stop
                      offset="70%"
                      stopColor={[colors.raspberry, colors.copper, colors.mint, colors.lavender, colors.raspberry][index % 5]}
                      stopOpacity="0.7"
                    />
                    <stop
                      offset="100%"
                      stopColor={[colors.copper, colors.mint, colors.lavender, colors.raspberry, colors.copper][index % 5]}
                      stopOpacity="0.5"
                    />
                  </radialGradient>
                  <filter id={`blur-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation={8 - (index % 3)} />
                  </filter>
                </defs>
                <motion.path
                  d={path}
                  fill={`url(#gradient-${index})`}
                  filter={`url(#blur-${index})`}
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
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Gritty texture overlay */}
        <div className="absolute inset-0">
          {noisePoints.map((point, index) => (
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
          ))}
        </div>

        {/* Noise texture filter */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url%28%23noiseFilter%29%22/%3E%3C/svg%3E")',
            opacity: 0.1,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Overlay layer for enhanced glass effect */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)',
            borderTop: '1px solid rgba(255,255,255,0.5)',
            borderLeft: '1px solid rgba(255,255,255,0.5)',
            mixBlendMode: 'overlay',
          }}
        />

        {/* Text overlay - original styling from original code */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-8 pointer-events-none z-10">
          <div className="text-center">
            <div style={{
              fontWeight: 300,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              color: colors.foreground
            }}>
              <span className="text-lg tracking-wide">Tool Discovery Evaluation</span>
            </div>
            <div className="mt-2 text-xs" style={{ color: colors.secondary }}>click to experience</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassCardGrittyGradientBlob;