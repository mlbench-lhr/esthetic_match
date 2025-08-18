import Image from "next/image";
import React from "react";

function Right() {
  return (
    <div className="relative">
      {/* Patient Treatment Image */}
      <div className="relative mb-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/images/need/right_pic.webp"
            alt="Patient receiving aesthetic treatment"
            width={500}
            height={350}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Mobile App Screenshot */}
      <div className="absolute -left-40 -bottom-20 rounded-3xl p-2 max-w-md overflow-visible hidden lg:block">
        <div className="relative w-[80%] max-w-[360px] aspect-[360/435]">
          <Image
            src="/images/need/mobile.webp"
            alt="Mobile app interface"
            fill
            className="object-cover rounded-2xl"
          />
        </div>


      </div>
    </div>
  );
}

export default Right;
