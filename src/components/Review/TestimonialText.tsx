import React from 'react';

interface TestimonialTextProps {
  quote: string;
  author: string;
  subtitle: string;
}

const TestimonialText: React.FC<TestimonialTextProps> = ({ quote, author, subtitle }) => {
  return (
    <div className="flex flex-col justify-between h-full max-w-md text-grey_primary">
      <div>
        <p className="h5 font-base leading-relaxed mb-8">
          {quote}
        </p>
      </div>
      
      <div>
        <h3 className="h5 font-base mb-1">
          {author}
        </h3>
        <p className="font-light p2">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default TestimonialText;