import Image from "next/image";
import React from "react";

function Right() {
  return (
    <div className="relative overflow-visible xl:min-h-[600px] 2xl:min-h-[700px]">
      {/* Patient Treatment Image */}
      <div className="relative mb-8 lg:max-w-full mx-auto">
        <div className="rounded-2xl overflow-hidden ">
          <img
            src="/images/need/right_pic.webp"
            alt="Patient receiving aesthetic treatment"
            className="w-[569px] h-[773px] lg:mx-auto object-cover"
          />
        </div>
      </div>

      {/* Mobile App Screenshot - Fixed positioning relative to the right container */}
      <div className="absolute rounded-3xl p-2 hidden xl:block z-10
                      xl:left-[-3rem] xl:top-[40rem] xl:w-65 xl:h-[32rem]
                      2xl:right-[-8rem] 2xl:top-[30rem] 2xl:w-70 2xl:h-[34rem]">
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