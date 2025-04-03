import React from 'react';
import Section from '../layout/Section';
import { motion } from 'framer-motion';

const OpeningSection: React.FC = () => {
  return (
    // Keep the fixed height that's working
    <Section className="flex items-center justify-center overflow-hidden h-[30vh]">
      <div className="container mx-auto px-4 text-center">
        {/* Re-implement text with motion animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tight mb-4">
            REALIZATION
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-light mb-4">
          Spiritual Technology for Innovators
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="max-w-lg mx-auto text-lg text-gray-600">
          A collection of living tools to create beautiful things.
          </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default OpeningSection;