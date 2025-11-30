import { useState } from 'react';
import { motion } from 'framer-motion';

const GlassCardGrittyGradientBlob = () => {
  const [hovered, setHovered] = useState(false);

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
    <div className="flex items-center justify-center w-full h-full p-4">
      <motion.div
        className="relative max-w-3xl w-full aspect-video overflow-hidden shadow-glass-card rounded-card bg-white/15 backdrop-blur-xl border border-white/30 transition-all duration-300"
        whileHover={{
          y: -5,
          boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.3)',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
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
                    <stop offset="0%" stopColor={index % 2 === 0 ? 'var(--color-accent-green)' : 'var(--color-accent-lavender)'} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={index % 2 === 0 ? 'var(--color-accent-sand)' : 'var(--color-accent-taupe)'} stopOpacity="0.5" />
                  </radialGradient>
                  <filter id={`blur-${index}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="7" />
                  </filter>
                </defs>
                <motion.path
                  d={path}
                  fill={`url(#gradient-${index})`}
                  filter={`url(#blur-${index})`}
                  animate={{
                    d: [
                      path,
                      path.replace(/(\d+),(\d+)/g, (match, p1, p2) => {
                        const x = parseInt(p1) + (Math.random() * 12 - 6);
                        const y = parseInt(p2) + (Math.random() * 12 - 6);
                        return `${x},${y}`;
                      }),
                      path
                    ],
                    rotate: [0, index % 2 === 0 ? 5 : -5, 0],
                  }}
                  transition={{
                    duration: 10 + index * 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Optimized CSS-based Noise Texture */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg%20viewBox=%220%200%20200%20200%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22noiseFilter%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.65%22%20numOctaves=%223%22%20stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url%28%23noiseFilter%29%22/%3E%3C/svg%3E')] bg-repeat" />

        {/* Overlay layer for enhanced glass effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 border-t border-l border-white/50 mix-blend-overlay pointer-events-none" />

        {/* Text overlay */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center pb-8 pointer-events-none z-10 transition-transform duration-300" style={{ transform: hovered ? 'translateY(-5px)' : 'translateY(0)' }}>
          <div className="text-center">
            <div className="font-light tracking-tight leading-tight text-foreground">
              <span className="text-lg tracking-wide">Tool Discovery Evaluation</span>
            </div>
            <div className={`mt-2 text-xs text-text-secondary transition-all duration-300 ${hovered ? 'opacity-100 scale-105' : 'opacity-70 scale-100'}`}>
              click to experience
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GlassCardGrittyGradientBlob;