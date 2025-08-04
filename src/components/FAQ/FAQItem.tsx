'use client'
import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer?: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg text-gray-900 pr-8">{question}</span>
        <div className="flex-shrink-0">
          <svg
            className={`w-6 h-6 text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-45' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </div>
      </button>
      {isOpen && answer && (
        <div className="pb-6 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  );
};

export default FAQItem;