import React from 'react';
import TestimonialText from './TestimonialText';
import TestimonialImage from './TestimonialImage';
import { TestimonialContent } from './types/testimonial';

interface TestimonialSlideProps {
  content: TestimonialContent;
}

const TestimonialSlide: React.FC<TestimonialSlideProps> = ({ content }) => {
  return (
    <div className=" flex items-center justify-between">
      <div className="w-full flex lg:flex-row flex-col items-center justify-between gap-16">
        <div className="flex-2">
          <TestimonialText 
            quote={content.quote}
            author={content.author}
            subtitle={content.subtitle}
          />
          
        </div>
        
        <div className="">
          <TestimonialImage 
            src={content.image}
            alt={`${content.author} testimonial`}
          />
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlide;