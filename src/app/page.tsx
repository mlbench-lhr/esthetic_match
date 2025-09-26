import FAQSection from "@/components/FAQ/FAQSection";
import FeatureIndex from "@/components/features/FeatureIndex";
import FooterIndex from "@/components/footer/FooterIndex";
import Hero from "@/components/hero/Hero";
import Navbarin from "@/components/Navbar";
import Need from "@/components/need/Need";
import TestimonialSlider from "@/components/Review/TestimonialSlider";
import Services from "@/components/services/Services";

export default function Home() {
  return (
    <div className=" mx-auto ">
      <Navbarin />
      <Hero />
      <Need />
      <FeatureIndex />
      <Services />
      <TestimonialSlider />
      {/* <FAQSection /> */}
      <FooterIndex />
    </div>
  );
}
