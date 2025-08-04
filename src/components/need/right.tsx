import Image from "next/image";
import React from "react";

function Right() {
  return (
    <div className="relative">
      {/* Patient Treatment Image */}
      <div className="relative mb-8">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/images/need/right_pic.svg"
            alt="Patient receiving aesthetic treatment"
            width={500}
            height={350}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Mobile App Screenshot */}
      <div className="absolute -left-20 -bottom-20 bg-[#E5CDB9] rounded-3xl p-2 shadow-2xl max-w-md overflow-visible hidden md:block">
        <div className="relative">
          <Image
            src="/images/need/mobile.svg"
            alt="Mobile app interface"
            width={560}
            height={535}
            className="relative -mb-24 w-full h-auto object-cover rounded-2xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Right;
