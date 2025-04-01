import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Product} from '../data/productData';

interface ProductCarouselProps {
  products?: Product[];
  title?: string;
  subtitle?: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products = [],
  title = "Featured Tools",
  subtitle = "Explore our toolkit"
}) => {
  {
    id: 1,
    image: "/api/placeholder/500/500",
    alt: "Cut citrus fruits.",
    title: "Lorem Ipsum",
    tip: "Citrus fruits are rich in vitamin C and antioxidants."
  },
  {
    id: 2,
    image: "/api/placeholder/500/500",
    alt: "Sliced mango.",
    title: "Dolor Sit",
    tip: "Mangoes are packed with vitamins, minerals, and antioxidants."
  },
  {
    id: 3,
    image: "/api/placeholder/500/500",
    alt: "A bunch of blueberries.",
    title: "Amet Consectetur",
    tip: "Blueberries are low in calories but high in nutrients."
  },
  {
    id: 4,
    image: "/api/placeholder/500/500",
    alt: "A pineapple sitting on a table.",
    title: "Adipiscing Elit",
    tip: "Pineapples contain enzymes that can ease digestion."
  },
  {
    id: 5,
    image: "/api/placeholder/500/500",
    alt: "Frozen raspberries.",
    title: "Nunc Tortor",
    tip: "Raspberries are high in fiber and vitamin C."
  },
  {
    id: 6,
    image: "/api/placeholder/500/500",
    alt: "A sliced strawberry.",
    title: "Metus Mollis",
    tip: "Strawberries are nutritious and low in calories."
  }
];

const ProductCarousel: React.FC<ProductCarouselProps> = ({
  products = defaultProducts,
  title = "Featured Products",
  subtitle = "Explore our collection"
}) => {
  const [activeTip, setActiveTip] = useState<number | null>(null);
  
  const openTip = (id: number) => {
    setActiveTip(id);
  };

  const closeTip = () => {
    setActiveTip(null);
  };

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-mist-100/70 to-mist-100/40"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-mist-600 tracking-widest uppercase text-sm block mb-4">
            {subtitle}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-mist-800 mb-6 font-extralight">
            {title}
          </h2>
        </div>
        
        <div className="min-h-screen font-sans text-white text-uppercase tracking-wider text-sm flex justify-center items-center">
          {/* Main carousel list - preserving original horizontal scroll design */}
          <ul className="list-none w-full max-w-4xl flex overflow-x-auto overflow-y-hidden pb-8 scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-white outline-none">
            {products.map((product) => (
              <li 
                key={product.id}
                className="flex-none w-full max-w-xs sticky top-0 left-0 flex justify-center items-start h-80 relative ml-4 first:ml-0 md:left-auto cursor-pointer outline-none overflow-hidden"
                style={{ 
                  // This preserves the original CSS functionality where items are positioned with $left: ($i * 2.2rem) - 2.2rem;
                  left: `${(product.id * 2.2) - 2.2}rem` 
                }}
                onClick={() => openTip(product.id)}
              >
                <span className="absolute top-0 left-0 block p-3 h-full writing-vertical-lr text-center rotate-180">
                  {product.title}
                </span>
                
                {/* Gradient overlay - with rounded corners on the red side */}
                <div className="absolute top-1/2 left-0 -translate-y-1/2 h-full w-full -z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/80 to-transparent rounded-l-3xl"></div>
                </div>
                
                {/* Image - preserving original style */}
                <img
                  src={product.image}
                  alt={product.alt}
                  className="block h-80 w-full object-cover absolute top-1/2 left-0 -translate-y-1/2 -z-20"
                />
              </li>
            ))}
          </ul>
          
          {/* Tip Card Modal with dots pattern */}
          {activeTip !== null && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
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
                className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative text-gray-800 border-0 outline-none"
                onClick={(e) => e.stopPropagation()}
                style={{
                  animation: 'zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              >
                <button 
                  onClick={closeTip} 
                  className="absolute top-3 right-3 p-1 hover:bg-gray-100 rounded-full border-0 outline-none"
                  aria-label="Close tip"
                >
                  <X size={20} className="text-gray-700" />
                </button>
                {products.find(p => p.id === activeTip) && (
                  <>
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 border-0 outline-none shadow-md">
                      <img 
                        src={products.find(p => p.id === activeTip)?.image} 
                        alt={products.find(p => p.id === activeTip)?.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-3 uppercase tracking-wider">
                      {products.find(p => p.id === activeTip)?.title}
                    </h3>
                    <p className="text-gray-700 text-center">
                      {products.find(p => p.id === activeTip)?.tip}
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Add keyframe animations */}
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
            
            /* Add writing-mode vertical style */
            .writing-vertical-lr {
              writing-mode: vertical-lr;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
