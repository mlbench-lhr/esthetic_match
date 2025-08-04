import React from 'react';
import Image from 'next/image';

interface TestimonialImageProps {
  src: string;
  alt: string;
}

const TestimonialImage: React.FC<TestimonialImageProps> = ({ src, alt }) => {
  return (
    <div className="relative  rounded-2xl overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={500}
        height={580}
        className="object-cover"
      />
    </div>
  );
};

export default TestimonialImage;
