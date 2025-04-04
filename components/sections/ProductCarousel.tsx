import React, { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { Product } from '../../data/productData';
import Section from '../layout/Section';
import { createPortal } from 'react-dom';
import Image from 'next/image';

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  gradientColor?: "blue" | "purple";
  hideScrollbar?: boolean;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products,
  title = "Featured Tools",
  subtitle = "Explore our toolkit",
  gradientColor = "blue",
  hideScrollbar = false
}) => {
  const [activeTip, setActiveTip] = useState<number | null>(null);
  
  const openTip = (id: number) => {
    setActiveTip(id);
  };

  const closeTip = () => {
    setActiveTip(null);
  };

  const gradientClass = gradientColor === "blue" ? "from-blue-500/80" : "from-purple-500/80";
  
  const scrollbarClasses = hideScrollbar 
    ? "scrollbar-none" 
    : "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500";

  return (
    <Section className="overflow-visible">
      {/* Full-width container for the carousel */}
      <div className="w-full px-4 relative z-10">
        {/* Section header - centered with max width */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-mist-600 tracking-widest uppercase text-sm block mb-4">
            {subtitle}
          </span>
          <h2 className="font-sans text-4xl md:text-5xl text-mist-800 mb-6 font-extralight">
            {title}
          </h2>
        </div>
        
        {/* Expanded carousel container - wider on desktop */}
        <div className="relative max-w-full mx-auto">
          {/* Carousel List - with enhanced scrollbar */}
          <ul className={`
            list-none w-full flex overflow-x-auto overflow-y-hidden 
            pb-12 outline-none ${scrollbarClasses} pr-16
            sm:w-[95vw] md:w-[90vw] lg:w-[85vw] xl:w-[80vw] 
            sm:max-w-none mx-auto
          `}
          style={{ 
            WebkitOverflowScrolling: 'touch',
            willChange: 'transform' 
          }}>
            {products.map((product, index) => (
              <li
                key={product.id}
                className="flex-none w-full max-w-[280px] sm:max-w-[320px] sticky top-0 left-0 flex justify-center items-start h-80 relative ml-4 first:ml-0 cursor-pointer outline-none overflow-hidden"
                style={{ 
                  left: `${(product.id * 2.2) - 2.2}rem`,
                  zIndex: products.length - index // This makes earlier cards stack on top
                }}
                onClick={() => openTip(product.id)}
              >
                <span className="absolute top-0 left-0 block p-3 h-full writing-vertical-lr text-center">
                  {product.title}
                </span>
                {/* Gradient overlay with texture */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 h-full w-full z-0 overflow-hidden">
                  <div 
                    className={`absolute inset-0 bg-gradient-to-r ${gradientClass} to-transparent rounded-l-3xl`}
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, ${gradientColor === "blue" ? "rgba(59, 130, 246, 0.8)" : "rgba(168, 85, 247, 0.8)"}, transparent),
                        url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")
                      `,
                      backgroundBlendMode: 'overlay',
                    }}
                  ></div>
                </div>
                {/* Image */}
                <div className="block h-80 w-full absolute top-1/2 left-0 -translate-y-1/2 z-10 relative">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 640px) 280px, 320px" 
                    className="object-contain"
                    priority={product.id <= 2} // Prioritize loading first few images
                  />
                </div>
              </li>
            ))}
          </ul>
          
          {/* Helper text (only shown when scrollbar is hidden) */}
          {hideScrollbar && (
            <div className="flex items-center justify-center text-sm text-gray-500 mt-2">
              <span>Swipe to view more tools</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          )}
        </div>
        
        {/* Tip Card Modal */}
        {activeTip !== null && createPortal(
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            onClick={closeTip}
            style={{
              backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px)',
              backgroundSize: '4px 4px',
              backdropFilter: 'brightness(0.9) blur(3px)',
              animation: 'fadeIn 0.2s ease-out',
              opacity: 1
            }}
          >
            <div 
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-4 sm:p-6 relative text-gray-800 border-0 outline-none"
              onClick={(e) => e.stopPropagation()}
              style={{
                animation: 'zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                maxWidth: '95vw' // Ensure it doesn't overflow on very small devices
              }}
            >
              <button 
                onClick={closeTip}
                className="absolute top-2 sm:top-3 right-2 sm:right-3 p-1 hover:bg-gray-100 rounded-full border-0 outline-none"
                aria-label="Close tip"
              >
                <X size={16} className="text-gray-700 sm:hidden" />
                <X size={20} className="text-gray-700 hidden sm:block" />
              </button>
              {products.find(p => p.id === activeTip) && (
                <>
                  <div className="w-12 h-12 sm:w-16 md:w-20 sm:h-16 md:h-20 rounded-full overflow-hidden mx-auto mb-2 sm:mb-4 border-0 outline-none shadow-md relative">
                    {products.find(p => p.id === activeTip) && (
                      <Image
                        src={products.find(p => p.id === activeTip)?.image || ''}
                        alt={products.find(p => p.id === activeTip)?.alt || ''}
                        fill
                        sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, 80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-center mb-2 sm:mb-3 uppercase tracking-wider">
                    {products.find(p => p.id === activeTip)?.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 text-center">
                    {products.find(p => p.id === activeTip)?.tip}
                  </p>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
      </div>
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes zoomIn {
          from { 
            opacity: 0; 
            transform: scale(0.95) translateY(10px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        /* Enhanced, thicker scrollbar styles */
        ::-webkit-scrollbar {
          height: 12px; /* Increased height for better clickability */
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
          margin: 0 10px; /* Add some margin for better visibility */
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${gradientColor === "blue" ? "#3b82f6" : "#a855f7"}; /* Match gradient color */
          border-radius: 10px;
          border: 3px solid #f1f1f1; /* Creates an inset look */
          min-height: 30px; /* Minimum size */
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${gradientColor === "blue" ? "#2563eb" : "#9333ea"}; /* Darker on hover */
        }
      `}</style>
    </Section>
  );
}; 

export default ProductCarousel;