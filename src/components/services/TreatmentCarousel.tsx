"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import TreatmentCard from "./TreatmentCard";

interface Treatment {
  id: number;
  imageSrc: string;
  title: string;
  detail: string;
}

const TreatmentCarousel = ({ treatments }: { treatments: Treatment[] }) => {
  return (
    <div className="relative w-full">
      {/* Custom Navigation Buttons */}
      <div className="lg:px-4">
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={16} // adjust for tighter or looser spacing
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
        >
          {treatments.map((treatment) => (
            <SwiperSlide key={treatment.id} className="lg:!w-[300px] !w-[280px]">
              <TreatmentCard
                imageSrc={treatment.imageSrc}
                title={treatment.title}
                detail={treatment.detail}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TreatmentCarousel;
