import FeatureIndex from "@/components/features/FeatureIndex";
import Hero from "@/components/hero/Hero";
import Navbarin from "@/components/Navbar";
import Need from "@/components/need/Need";
import Swiper from "@/components/Review/Swiper";
import Services from "@/components/services/Services";
import TreatmentCarousel from "@/components/services/TreatmentCarousel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-[1440px] mx-auto ">
      <Navbarin />
      <Hero />
      <Need />
      <FeatureIndex />
      <Services />
      {/* <Swiper /> */}
    </div>
  );
}
