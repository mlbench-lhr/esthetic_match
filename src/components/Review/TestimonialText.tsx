import React from 'react';

interface TestimonialTextProps {
  quote: string;
  author: string;
  subtitle: string;
}

const TestimonialText: React.FC<TestimonialTextProps> = ({ quote, author, subtitle }) => {
  return (
    <div className="flex flex-col justify-between h-full max-w-lg text-grey_primary">
      <div>
        <p className="text-22 font-base leading-relaxed mb-8">
          {quote}
        </p>
      </div>
      
      <div>
        <p className="text-30 font-base mb-1">
          {author}
        </p>
        <p className="font-light text-18">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default TestimonialText;