"use client";
import React from "react";
import TreatmentCarousel from "./TreatmentCarousel";
import NavigationButton from "./NavigationButton";
interface Treatment {
  id: number;
  imageSrc: string;
  title: string;
  detail: string;
}

function Services() {
  const treatments: Treatment[] = [
    {
      id: 1,
      imageSrc: "/images/services/image1.png", // Replace with actual image paths
      title: "Aesthetic Medicine",
      detail: "Facial, body, and intimate treatments for beautification and rejuvenation — from injectables to skin boosters and advanced energy-based technologies."
    },
    {
      id: 2,
      imageSrc: "/images/services/image2.png",
      title: "Aesthetic Surgery",
      detail: "Surgical procedures designed to restore harmony between body and mind — boosting self-confidence through personalized body contouring, breast surgery, rhinoplasty, and more."
    },
    {
      id: 3,
      imageSrc: "/images/services/image3.png",
      title: "Weight Loss & Metabolic Health",
      detail: "From medical weight-loss treatments and appetite-regulating therapies to access to dietitians and bariatric surgery guidance — everything to support sustainable results."
    },
    {
      id: 4,
      imageSrc: "/images/services/image4.png",
      title: "IV Therapy & Wellness Boosts",
      detail: "From medical weight-loss treatments and appetite-regulating therapies to access to dietitians and bariatric surgery guidance — everything to support sustainable results."
    },
    {
      id: 5,
      imageSrc: "/images/services/image5.png",
      title: "Aesthetic Dentistry",
      detail: "Smile makeovers made easy: veneers, teeth whitening, invisible aligners, and more — all to help you smile with confidence."
    },
    {
      id: 6,
      imageSrc: "/images/services/image6.png",
      title: "Hair Restoration & Scalp Health",
      detail: "Hair transplants, anti-hair loss treatments, and regenerative therapies for hair growth — tailored to both men and women."
    },
    {
      id: 7,
      imageSrc: "/images/services/image7.png",
      title: "Laser Hair Removal",
      detail: "Permanent hair reduction for face, body, and hairline sculpting — using the latest technologies suited to every skin type."
    },
    {
      id: 8,
      imageSrc: "/images/services/image8.png",
      title: "Body Shaping & Muscle Toning",
      detail: "Sculpt your body with non-invasive muscle stimulation technologies — for a stronger, more defined physique without the gym."
    },
  ];

  return (
    <div id="services" className="min-h-[950px] bg-gray-50 py-20">
      <div className="max-w-[1480px] mx-auto px-8">
        {/* Header */}
        <div className="mb-16 flex md:flex-row flex-col justify-between items-center">
          <h1 className="h1 font-light text-black_primary mb-4">
            All Aesthetic Universes in one App
          </h1>
          <div className="flex gap-2">
            <NavigationButton
              src="/images/services/left_chevron.svg"
              className="custom-prev"
            />
            <NavigationButton
              src="/images/services/right_chevron.svg"
              className="custom-next"
            />
          </div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <TreatmentCarousel treatments={treatments} />
        </div>
      </div>
    </div>
  );
}

export default Services;
