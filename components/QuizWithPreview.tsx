import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import VisualPreview from './VisualPreview';
// Fix this import path:
import QuizSection from './sections/QuizSection';

const QuizWithPreview = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  
  const handlePreviewClick = () => {
    setShowQuiz(true);
  };
  
  return (
    <div className="quiz-wrapper">
      <AnimatePresence mode="wait">
        {!showQuiz ? (
          <motion.div 
            key="preview"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handlePreviewClick} 
            className="cursor-pointer"
          >
            <VisualPreview />
          </motion.div>
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <QuizSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizWithPreview;