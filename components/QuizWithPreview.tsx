import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VisualPreview from './VisualPreview';

// Fix the import path - adjust based on your actual file structure
import QuizSection from '../components/sections/QuizSection';
// OR if it's directly in the sections folder at project root:
// import QuizSection from '../sections/QuizSection';

const QuizWithPreview = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  
  const handlePreviewClick = () => {
    setShowQuiz(true);
  };
  
  return (
    <div className="quiz-wrapper relative h-full">
      <AnimatePresence mode="wait">
        {!showQuiz ? (
          <motion.div 
            key="preview"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handlePreviewClick} 
            className="cursor-pointer h-full"
          >
            <VisualPreview />
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