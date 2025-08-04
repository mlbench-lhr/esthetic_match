import React from "react";
import Image from "next/image";
import StoreButtons from "../features/StoreButtons";

const HeroSection: React.FC = () => {
  return (
    <section className="relative">
      <div className="relative z-10 container py-20 px-6 max-w-[1230px] mx-auto">
        <div className="md:h-full ">
          {/* Hero Image Container */}
          <div className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl h-[400px] md:h-full">
            <Image
              src="/images/footer/pic.svg" // Replace with your actual image path
              alt="Skincare consultation"
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />

            {/* Overlay Content */}
            <div className="absolute inset-0  bg-opacity-20 flex flex-col justify-end items-start md:p-8 p-4 ">
              <h1 className="text-white h1 font-bold mb-4">
                Smart Choices, Beautiful Results.
              </h1>
              <div className="flex md:flex-row flex-col justify-between w-full">
                <p className="text-white tp2 max-w-lg font-normal">
                Connect with experts and take control of your skin journey — all
                in one smart app.
              </p>
              <div className="flex flex-row gap-4">
                <StoreButtons
                  href="#"
                  icon="images/features/playstore.svg"
                  topText="GET IT ON"
                  bottomText="Google Play"
                />
                <StoreButtons
                  href="#"
                  icon="images/features/apple.svg"
                  topText="Download on the"
                  bottomText="App Store"
                />
              </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
