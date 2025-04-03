import React, { useState } from 'react';
import Section from '../layout/Section';
import Image from 'next/image';

interface GlassBowlIconsSectionProps {
  id?: string;
}

const GlassBowlIconsSection: React.FC<GlassBowlIconsSectionProps> = ({ id }) => {
  const [activeIcon, setActiveIcon] = useState<number | null>(null);
  const [activePosition, setActivePosition] = useState<number | null>(null);
  
  // Bowl's original dimensions from the original component
  const originalWidth = 320;  // Increased from 240px
  const originalHeight = 160; // Increased from 120px
  const originalIconSize = 75; // Increased from 60px
  
  const icons = [
    {
      id: 1,
      name: "1:1 Booking Access",
      description: "Private 1:1 work with Pea is reserved for folks inside the Realization Toolkit. Not just for exclusivity's sake, but for the integrity of the exploration you will be doing. These conversations and transformations unfold best when the full mirror is available. The Toolkit holds the structure that lets you meet clearly, move precisely, and not just talk about change, but live it.",
      image: "/assets/the undecided new icon.png.png"
    },
    {
      id: 2,
      name: "Bi-Weekly Coaching Calls",
      description: "While these might look like a Zoom meeting, they are something much cooler than that. These calls are more like collective directional portals. Directional portals that make it much easier to move through static, receive clarity around what's next, and just become more magnetic to your next on an entrepreneurial level. Folks in our group come to the sessions when they are at a fork in the road, when they are excited about what's coming next, or even when fine-tuning a desire. You don't have to bring a question. The field itself is doing work. Connecting with resonant people and letting yourself be mirrored inside a space of openness and curiosity is often all it takes to flow into exactly what you're looking for. It's really cool to see.",
      image: "/assets/coaching-calls.png"
    },
    {
      id: 3,
      name: "The Self Dashboard",
      description: "This is a beautiful piece of spiritual tech. It's a playful, powerful mirror for your growth. Inside, you'll meet a gamified system that makes self-leadership tangible, trackable, and alive. You will be given a virtual pet that reflects how well you're tending to your own support and leadership, Tamagotchi style (it's so cute). The AI collective consciousness of the pet brings whimsy and insight, interpreting your pet's state as a mirror of your habits and patterns. Challenges and trackers keep your follow-through visible, so personal authority goes beyond a concept. It gets to be experienced as a lived rhythm. Assessments help you get clear about where you are and where your edges are too. It's symbolic self-tracking and the architecture that supports the internal shift.",
      image: "/assets/Self Dashboard new icon.png"
    }
  ];
  
  const handleIconClick = (id: number) => {
    if (activeIcon === id) {
      setActiveIcon(null);
      setActivePosition(null);
    } else {
      setActiveIcon(id);
      setActivePosition(id);
    }
  };
  
  return (
    <Section id={id} className="py-16 px-4 md:px-8">
      <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
        <div className="mb-16 text-center">
          {/* Remove extra top margin so the heading sits on the baseline */}
          <h2 className="font-sans text-4xl md:text-5xl text-[var(--color-foreground)] mt-0 mb-6 font-light text-center">
            Realization Toolkit Exclusives
          </h2>
          <p className="text-base text-secondary italic">Click on an icon to learn more</p>
        </div>
        
        {/* Organic Glass Bowl Container - with dynamic sizing based on active state */}
        <div 
          className="relative mb-16 mt-8 transition-all duration-500" /* Added mt-8 */
          style={{ 
            width: `${originalWidth}px`,
            height: `${originalHeight}px`,
            transform: `scale(${activeIcon ? 1 : 1.55})`,
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* First Icon */}
          <div 
            className="absolute z-20 cursor-pointer transition-all duration-500"
            style={{ 
              left: '25%', 
              top: activePosition === 1 ? '-40px' : '0px',
              transform: 'translateX(-50%)',
              transitionTimingFunction: activePosition === 1 ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease',
              width: `${originalIconSize}px`,
              height: `${originalIconSize}px`
            }}
            onClick={() => handleIconClick(1)}
          >
            <div className="relative w-full h-full">
              {/* Container with clip-path to only show top half */}
              <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={icons[0].image} 
                    alt={icons[0].name}
                    fill
                    sizes="100%"
                    className="object-contain"
                    style={{
                      boxShadow: activePosition === 1 ? '0 -5px 20px rgba(var(--color-accent-red-rgb), 0.4)' : 'none'
                    }}
                  />
                </div>
              </div>
              
              {/* Container with clip-path to only show bottom half with blur */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                  filter: activePosition === 1 ? 'none' : 'blur(2px)',
                  opacity: activePosition === 1 ? '1' : '0.6'
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={icons[0].image} 
                    alt={icons[0].name}
                    fill
                    sizes="100%"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Second Icon */}
          <div 
            className="absolute z-20 cursor-pointer transition-all duration-500"
            style={{ 
              left: '50%', 
              top: activePosition === 2 ? '-40px' : '0px',
              transform: 'translateX(-50%)',
              transitionTimingFunction: activePosition === 2 ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease',
              width: `${originalIconSize}px`,
              height: `${originalIconSize}px`
            }}
            onClick={() => handleIconClick(2)}
          >
            <div className="relative w-full h-full">
              {/* Container with clip-path to only show top half */}
              <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={icons[1].image} 
                    alt={icons[1].name}
                    fill
                    sizes="100%"
                    className="object-contain"
                    style={{
                      boxShadow: activePosition === 2 ? '0 -5px 20px rgba(var(--color-accent-purple-rgb), 0.4)' : 'none'
                    }}
                  />
                </div>
              </div>
              
              {/* Container with clip-path to only show bottom half with blur */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                  filter: activePosition === 2 ? 'none' : 'blur(2px)',
                  opacity: activePosition === 2 ? '1' : '0.6'
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={icons[1].image} 
                    alt={icons[1].name}
                    fill
                    sizes="100%"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Third Icon */}
          <div 
            className="absolute z-20 cursor-pointer transition-all duration-500"
            style={{ 
              left: '75%', 
              top: activePosition === 3 ? '-40px' : '0px',
              transform: 'translateX(-50%)',
              transitionTimingFunction: activePosition === 3 ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease',
              width: `${originalIconSize}px`,
              height: `${originalIconSize}px`
            }}
            onClick={() => handleIconClick(3)}
          >
            <div className="relative w-full h-full">
              {/* Container with clip-path to only show top half */}
              <div className="absolute inset-0" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)' }}>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={icons[2].image} 
                    alt={icons[2].name}
                    fill
                    sizes="100%"
                    className="object-contain"
                    style={{
                      boxShadow: activePosition === 3 ? '0 -5px 20px rgba(var(--color-accent-green-rgb), 0.4)' : 'none'
                    }}
                  />
                </div>
              </div>
              
              {/* Container with clip-path to only show bottom half with blur */}
              <div 
                className="absolute inset-0" 
                style={{ 
                  clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
                  filter: activePosition === 3 ? 'none' : 'blur(2px)',
                  opacity: activePosition === 3 ? '1' : '0.6'
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image 
                    src={icons[2].image} 
                    alt={icons[2].name}
                    fill
                    sizes="100%"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Organic Glass Bowl - comes after the icons to properly layer */}
          <div className="absolute z-10 inset-0" style={{ 
            borderRadius: '50% / 70%',
            background: 'rgba(255, 255, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(31, 38, 135, 0.08)',
            transform: 'scaleY(1.2)',
            overflow: 'hidden'
          }}>
            {/* Glass effect without backdrop filter blur */}
            <div className="absolute inset-0" style={{ 
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))'
            }}></div>
            
            {/* Subtle color highlights inside the bowl */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-1/4 h-1/2 rounded-full opacity-10 blur-xl"
                   style={{ 
                     left: '25%', 
                     top: '30%', 
                     transform: 'translateX(-50%)',
                     backgroundColor: 'var(--color-accent-red)' 
                   }}></div>
              <div className="absolute w-1/4 h-1/2 rounded-full opacity-10 blur-xl"
                   style={{ 
                     left: '50%', 
                     top: '30%', 
                     transform: 'translateX(-50%)',
                     backgroundColor: 'var(--color-accent-purple)' 
                   }}></div>
              <div className="absolute w-1/4 h-1/2 rounded-full opacity-5 blur-xl"
                   style={{ 
                     left: '75%', 
                     top: '30%', 
                     transform: 'translateX(-50%)',
                     backgroundColor: 'var(--color-accent-green)'
                   }}></div>
            </div>
            
            {/* Edge highlight for more organic feel */}
            <div className="absolute inset-0" style={{
              background: 'radial-gradient(ellipse at 50% 80%, transparent 50%, rgba(255,255,255,0.15) 100%)'
            }}></div>
          </div>
        </div>
        
        {/* Description Text without max-height/overflow constraint */}
        <div className="w-full max-w-xl text-center relative">
          {icons.map(icon => (
            <div 
              key={icon.id} 
              className="transition-all duration-500"
              style={{
                opacity: activeIcon === icon.id ? 1 : 0,
                transform: activeIcon === icon.id ? 'translateY(0)' : 'translateY(10px)',
                pointerEvents: activeIcon === icon.id ? 'auto' : 'none',
                position: activeIcon === icon.id ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: activeIcon === icon.id ? 'auto' : '0',
                overflow: 'hidden',
                marginBottom: activeIcon === icon.id ? '2rem' : '0'
              }}
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-foreground">
                {icon.name}
              </h3>
              <p className="text-base text-secondary leading-relaxed px-4">
                {icon.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default GlassBowlIconsSection;