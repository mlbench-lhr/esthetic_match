'use client';

import { useState } from 'react';
import TreatmentCard from './TreatmentCard';
import NavigationButton from './NavigationButton';

interface Treatment {
  id: number;
  imageSrc: string;
  title: string;
  subtitle?: string;
  bgColor?: string;
}

const TreatmentCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const treatments: Treatment[] = [
    {
      id: 1,
      imageSrc: "/images/services/image1.png", // Replace with actual image paths
      title: "Aesthetic",
      subtitle: "Medicine",
      bgColor: ""
    },
    {
      id: 2,
      imageSrc: "/images/services/image1.png",
      title: "Aesthetic",
      subtitle: "Surgery",
      bgColor: ""
    },
    {
      id: 3,
      imageSrc: "/images/services/image1.png",
      title: "Weight Loss &",
      subtitle: "Metabolic Health",
      bgColor: ""
    },
    {
      id: 4,
      imageSrc: "/images/services/image1.png",
      title: "IV Therapy &",
      subtitle: "Wellness Boosts",
      bgColor: ""
    },
    {
      id: 5,
      imageSrc: "/images/services/image1.png",
      title: "Advanced",
      subtitle: "Diagnostics",
      bgColor: ""
    }
  ];

  const nextSlide = (): void => {
    setCurrentIndex((prev: number) => 
      prev === treatments.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = (): void => {
    setCurrentIndex((prev: number) => 
      prev === 0 ? treatments.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative">
      {/* Cards container */}
      <div className="flex gap-6 overflow-hidden">
        <div 
          className="flex gap-6 transition-transform duration-300 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * (192 + 24)}px)` 
          }}
        >
          {treatments.map((treatment: Treatment) => (
            <TreatmentCard
              key={treatment.id}
              imageSrc={treatment.imageSrc}
              title={treatment.title}
              subtitle={treatment.subtitle}
              bgColor={treatment.bgColor}
            />
          ))}
        </div>
      </div>
      
      
    </div>
  );
};

export default TreatmentCarousel;
