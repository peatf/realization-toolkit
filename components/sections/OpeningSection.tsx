import React from 'react';
import { motion } from 'framer-motion';
import Section from '../layout/Section';

const OpeningSection: React.FC = () => {
  return (
    <Section fullHeight className="flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="mb-4"
          >
            <span className="font-mono text-[var(--color-secondary)] tracking-widest uppercase text-sm">
              Realization
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-sans text-5xl md:text-6xl text-[var(--color-foreground)] mb-6 font-light"
          >
            Tools for Transformation
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-[var(--color-secondary)] text-lg max-w-xl mx-auto font-light mb-8"
          >
            Access powerful techniques to realize your potential.
          </motion.p>
        </div>
      </div>
    </Section>
  );
};

export default OpeningSection;