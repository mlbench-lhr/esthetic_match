import BackgroundElements from "./BackgroundElements";
import Features from "./Features";
import HeaderSection from "./HeaderSection";
import StoreButtons from "./StoreButtons";

export default function Hero() {
  return (
    <div className="relative w-full h-screen">
      <BackgroundElements />

      <div className="relative z-10 flex flex-col items-center justify-start pt-20 px-8 h-full">
        <HeaderSection />
        <Features />
        <div className="flex flex-row gap-4">
          <StoreButtons href="#" icon="images/features/playstore.svg" topText="GET IT ON" bottomText="Google Play" />
          <StoreButtons href="#" icon="images/features/apple.svg" topText="Download on the" bottomText="App Store" />
        </div>
      </div>
    </div>
  )
}