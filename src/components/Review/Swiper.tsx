'use client'; // ⬅️ This is required at the very top

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Keyboard,
  Navigation,
  Scrollbar,
  Autoplay,
  Pagination,
} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function MySwiper() {
  return (
    <div className="w-full overflow-hidden">
      <div className="w-full overflow-hidden TestimonialSlider-slider-parent">
        <Swiper
          breakpoints={{
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 1,
            },
            1180: {
              slidesPerView: 1,
            },
            1323: {
              slidesPerView: 1,
            },
          }}
          slidesPerView={1}
          speed={4000}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          loop={true}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Keyboard, Navigation, Scrollbar, Autoplay, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className="mob:px-5">
            <img src="/logo.svg" alt="Slide 1" />
          </SwiperSlide>

          <SwiperSlide className="mob:px-5">
            <img src="/logo.svg" alt="Slide 2" />
          </SwiperSlide>

          <SwiperSlide className="mob:px-5">
            <img src="/logo.svg" alt="Slide 3" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default MySwiper;
