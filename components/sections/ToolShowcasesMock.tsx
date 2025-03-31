// Mock component for Tool Showcases with updated aesthetic
import { motion } from 'framer-motion';
import { GlassModule } from '../ui/NeumorphicUI';

const ToolShowcasesMock: React.FC = () => {
  return (
    <section id="tools" className="py-24 md:py-36 relative overflow-hidden">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-mist-100/60 to-sage-50/50"></div>
      
      {/* Soft blurred orbs in background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/5 right-1/3 w-80 h-80 rounded-full bg-sky-200/30 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/5 w-72 h-72 rounded-full bg-peach-200/20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <GlassModule
          className="max-w-3xl mx-auto text-center mb-20 p-10 rounded-3xl"
          blur="md"
          opacity="low"
        >
          <span className="font-mono text-mist-600 tracking-widest uppercase text-sm block mb-4">
            Toolkit Index
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-mist-800 mb-6 font-extralight">
            Transformative Tools
          </h2>
          <p className="text-mist-700 text-lg font-light">
            Explore our suite of digital tools designed to enhance your journey
            toward self-discovery and personal transformation.
          </p>
        </GlassModule>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {['Frequency Generator', 'Meditation Guide', 'Pattern Recognition', 'Resonance Mapper', 'Constellation Viewer', 'Ritual Builder'].map((tool, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
              className="foggy-glass rounded-3xl p-8 border border-white/20 hover:border-white/30"
            >
              <FloatingElement
                className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 
                         flex items-center justify-center text-xl mb-6"
                amplitude={5}
                duration={8}
              >
                <span className="text-mist-600">{['✧', '○', '⟡', '⌘', '◇', '□'][index]}</span>
              </FloatingElement>
              
              <h3 className="text-xl font-serif text-mist-800 mb-3 font-light">{tool}</h3>
              <p className="text-mist-700 font-light leading-relaxed">
                {`Experience the transformative power of our ${tool.toLowerCase()} tool, designed to enhance your personal journey.`}
              </p>
              <a href="#" className="inline-block mt-5 text-sky-400/80 font-light hover:text-sky-500/90 transition-colors duration-slower">
                Learn more →
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
