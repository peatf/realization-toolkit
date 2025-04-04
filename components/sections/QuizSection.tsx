import React from 'react';

const QuizSection = () => {
  return (
    <div className="quiz-container w-full bg-white rounded-lg shadow-lg overflow-hidden">
      <iframe
        src="https://alignment-cards.vercel.app"
        title="Alignment Cards Quiz"
        width="100%"
        height="600px"
        style={{
          border: 'none',
          backgroundColor: 'white',
          minHeight: '600px'
        }}
      />
    </div>
  );
};

export default QuizSection;
