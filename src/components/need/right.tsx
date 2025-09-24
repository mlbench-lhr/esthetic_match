import Image from "next/image";
import React from "react";

function Right() {
  return (
    <div className="relative overflow-visible">
      {/* Patient Treatment Image */}
      <div className="relative mb-8">
        <div className="rounded-2xl overflow-hidden">
          <img
            src="/images/need/right_pic.webp"
            alt="Patient receiving aesthetic treatment"
            className="2xl:max-w-[580px] xl:max-w-[550px] lg:max-w-full  object-cover"
          />
        </div>
      </div>

      {/* Mobile App Screenshot - Responsive positioning */}
      <div className="absolute rounded-3xl p-2 hidden xl:block z-10
                      
                      xl:-left-20 xl:-bottom-38 xl:w-55 xl:h-[28rem]
                      2xl:-right-32 2xl:-bottom-48 2xl:w-80 2xl:h-[37rem]">
        <div className="relative w-full h-full">
          <Image
            src="/images/need/mobile.webp"
            alt="Mobile app interface"
            fill
            className="object-cover rounded-2xl"
            sizes="(min-width: 1536px) 320px, (min-width: 1280px) 320px, 256px"
          />
        </div>
      </div>

      {/* Optional: Mobile version - show below main image on smaller screens */}
      {/* <div className="block lg:hidden mt-8">
        <div className="relative w-64 h-80 mx-auto">
          <Image
            src="/images/need/mobile.webp"
            alt="Mobile app interface"
            fill
            className="object-cover rounded-2xl"
            sizes="256px"
          />
        </div>
      </div> */}
    </div>
  );
}

export default Right;