import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';

// Enhanced Gooey Filter with stronger effect
const GooeyFilter = ({ id = "goo-filter" }) => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 25 -11" 
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const VisualPreview = () => {
  // Add console log to verify component is rendering
  useEffect(() => {
    console.log("VisualPreview component mounted");
  }, []);

  // Generate a grid of dots
  const gridSize = 20;
  const dots = useMemo(() => Array.from({ length: gridSize * gridSize }).map((_, index) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    return { id: index, row, col };
  }), [gridSize]);

  // Site-specific colors
  const colors = {
    background: '#FEFFFA',
    foreground: '#1A1A1A',
    secondary: '#5A5A5A',
  };

  // Animation settings
  const animationDuration = 5;

  return (
    <div className="flex items-center justify-center w-full h-full p-4">
      <div
        className="relative max-w-3xl w-full aspect-video overflow-hidden rounded-xl border border-gray-200 shadow-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Enhanced Gooey Filter */}
        <GooeyFilter id="goo-filter" />

        {/* Container for Dots with enhanced gooey filter */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ filter: 'url(#goo-filter)' }}>
          <div className="relative" style={{ width: '100%', height: '100%' }}>
            {dots.map(dot => {
              // Calculate distance from center
              const centerX = gridSize / 2 - 0.5;
              const centerY = gridSize / 2 - 0.5;
              const distanceFromCenter = Math.sqrt(
                Math.pow(dot.col - centerX, 2) +
                Math.pow(dot.row - centerY, 2)
              );

              // Define several "zones" based on distance from center
              const maxRadius = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));
              const normalizedDistance = distanceFromCenter / maxRadius;
              
              // REVISED ZONES with lighter center:
              const isCore = distanceFromCenter <= 2.5;
              const isDarkMiddleRing = distanceFromCenter > 2.5 && distanceFromCenter <= 4;
              const isDarkOuterRing = distanceFromCenter > 4 && distanceFromCenter <= 5.5;
              const isLightMiddleRing = distanceFromCenter > 5.5 && distanceFromCenter <= 7;
              const isOuterFade = distanceFromCenter > 7;
              
              // Determine dot attributes based on zone
              let baseSize;
              let baseOpacity;
              let shouldAnimate;
              let animationType;
              let dotColor;
              
              if (isCore) {
                // Center core - light gray, smaller
                baseSize = 4;
                baseOpacity = 0.4;
                shouldAnimate = true;
                animationType = "subtle";
                dotColor = colors.secondary;
              } else if (isDarkMiddleRing) {
                // Dark middle ring - largest, animated
                baseSize = 8;
                baseOpacity = 0.9;
                shouldAnimate = true;
                animationType = "gooey";
                dotColor = colors.foreground;
              } else if (isDarkOuterRing) {
                // Dark outer ring - still dark but slightly smaller
                baseSize = 6;
                baseOpacity = 0.8;
                shouldAnimate = true;
                animationType = "gooey";
                dotColor = colors.foreground;
              } else if (isLightMiddleRing) {
                // Light middle ring - medium gray again
                baseSize = 4;
                baseOpacity = 0.5;
                shouldAnimate = true;
                animationType = "pulse";
                dotColor = colors.secondary;
              } else {
                // Extended fade for outer dots
                const distanceFromLightRing = distanceFromCenter - 7;
                const maxFadeDistance = maxRadius - 7;
                const fadeRatio = Math.max(0, 1 - (distanceFromLightRing / maxFadeDistance) * 1.1);
                
                baseSize = Math.max(0.5, 3 * Math.pow(fadeRatio, 0.9));
                baseOpacity = Math.max(0, 0.4 * fadeRatio);
                shouldAnimate = false;
                animationType = "none";
                dotColor = colors.secondary;
              }
              
              // Random stagger for animation
              const randomDelay = dot.id * 0.01 + Math.random() * 0.5;

              // Define animation patterns based on type
              let scaleAnimation;
              let positionAnimation;
              
              switch (animationType) {
                case "gooey":
                  scaleAnimation = [1, 1.8, 1.4, 0.9, 1.2, 1];
                  positionAnimation = {
                    x: [0, 3, -2, 0],
                    y: [0, -2, 3, 0]
                  };
                  break;
                case "pulse":
                  scaleAnimation = [1, 1.2, 1];
                  positionAnimation = {
                    x: 0,
                    y: 0
                  };
                  break;
                case "subtle":
                  scaleAnimation = [1, 1.1, 0.95, 1];
                  positionAnimation = {
                    x: [0, 1, -1, 0],
                    y: [0, -1, 1, 0]
                  };
                  break;
                default:
                  scaleAnimation = 1;
                  positionAnimation = {
                    x: 0,
                    y: 0
                  };
              }

              return (
                <motion.div
                  key={dot.id}
                  className="absolute rounded-full"
                  style={{
                    width: `${baseSize}px`,
                    height: `${baseSize}px`,
                    left: `${(dot.col / gridSize) * 100}%`,
                    top: `${(dot.row / gridSize) * 100}%`,
                    backgroundColor: dotColor,
                    opacity: baseOpacity,
                    transform: `translate(-50%, -50%)`,
                  }}
                  // Conditional animation based on zone
                  animate={{
                    scale: shouldAnimate ? scaleAnimation : 1,
                    x: shouldAnimate ? positionAnimation.x : 0,
                    y: shouldAnimate ? positionAnimation.y : 0,
                  }}
                  transition={{
                    scale: shouldAnimate
                      ? {
                          duration: animationDuration,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: randomDelay,
                          repeatDelay: 0.5
                        }
                      : { duration: 0 },
                    x: shouldAnimate
                      ? {
                          duration: animationDuration * 1.2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: randomDelay,
                        }
                      : { duration: 0 },
                    y: shouldAnimate
                      ? {
                          duration: animationDuration,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: randomDelay + 0.3,
                        }
                      : { duration: 0 }
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Text overlay */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-8 pointer-events-none">
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

export default VisualPreview;