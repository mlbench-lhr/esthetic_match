"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import TestimonialSlide from "./TestimonialSlide";
import { TestimonialContent } from "./types/testimonial";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface TestimonialSliderProps {
  testimonials: TestimonialContent[];
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({
  testimonials,
}) => {
  return (
    <div className="relative lg:min-h-[800px] md:min-h-[1400px] min-h-[1000px] bg-black_primary">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="testimonial-swiper"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialSlide content={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10 w-full"></div>
      <style jsx global>{`
        .swiper-pagination {
          position: absolute !important;
          bottom: 32px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
          width: auto !important;
          display: flex !important;
          justify-content: center !important;
          gap: 8px !important;
          z-index: 10 !important;
        }

        .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          border-radius: 50% !important;
          cursor: pointer !important;
          transition: all 0.3s ease !important;
          opacity: 1 !important;
        }

        .swiper-pagination-bullet-active {
          background: white !important;
          transform: scale(1.2) !important;
        }

        
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
