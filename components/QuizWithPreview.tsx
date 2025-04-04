import React, { useState } from 'react';
import QuizSection from './sections/QuizSection';
import VisualPreview from './VisualPreview';
import { motion, AnimatePresence } from 'framer-motion';

const QuizWithPreview = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  
  const handleToggleQuiz = () => {
    setShowQuiz(!showQuiz);
  };
  
  return (
    // Remove the fixed min-height that's causing the gap
    <div className="w-full relative">
      <AnimatePresence mode="wait">
        {!showQuiz ? (
          <motion.div 
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div 
              onClick={handleToggleQuiz}
              className="w-full cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 flex items-center justify-center transition-all duration-300">
                <span className="bg-white px-4 py-2 rounded shadow opacity-0 hover:opacity-100 transition-all duration-300">
                  Start Quiz
                </span>
              </div>
              <VisualPreview />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-gray-800">Find Your Tools</h3>
              <button 
                onClick={handleToggleQuiz}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to preview
              </button>
            </div>
            <QuizSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizWithPreview;