import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

// This version will only render on the client
const VisualPreviewNoSSR = dynamic(() => import('./VisualPreview'), { ssr: false });

// Fix the import path - adjust based on your actual file structure
import QuizSection from '../components/sections/QuizSection';
// OR if it's directly in the sections folder at project root:
// import QuizSection from '../sections/QuizSection';

// Find or create the props interface
interface QuizWithPreviewProps {
  id?: string; // Add this line
  // ...any other existing props
}

const QuizWithPreview: React.FC<QuizWithPreviewProps> = ({ id }) => {
  const [showQuiz, setShowQuiz] = useState(false);
  
  const handlePreviewClick = () => {
    setShowQuiz(true);
  };
  
  return (
    <div id={id} className="quiz-container">
      <AnimatePresence mode="wait">
        {!showQuiz ? (
          <motion.div 
            key="preview"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handlePreviewClick} 
            className="cursor-pointer h-full"
          >
            {/* Use the no-SSR version */}
            <VisualPreviewNoSSR />
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full"
          >
            <QuizSection />
            {/* Add close button */}
            <button 
              onClick={() => setShowQuiz(false)} 
              className="mt-4 text-sm text-center w-full py-2 text-gray-600 hover:text-gray-900"
            >
              ← Back to preview
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizWithPreview;