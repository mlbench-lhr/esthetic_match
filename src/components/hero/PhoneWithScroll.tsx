// components/PhoneWithScroll.tsx
import Image from "next/image";

const PhoneWithScroll = () => {
    return (
        <div className="relative w-[130px] h-[150px] sm:w-[190px] sm:h-[150px] 2xl:w-[170px] xl:h-[140px] xl:w-[170px] 2xl:h-[150px]   mx-auto">
            {/* Phone hand image as background */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center z-30 pointer-events-none">
                <img
                    src="/images/hero/hand.svg"
                    alt="Phone Frame"
                    
                    className="object-contain"
                    // priority
                />
            </div>



            {/* Scrollable screen area */}
            {/* Try different positioning values */}
            <div
                className="absolute bottom-1 2xl:left-[5px] 2xl:w-[160px] 2xl:h-[335px] xl:left-[5px] xl:w-[160px] xl:h-[335px] lg:left-[5px] lg:w-[180px] lg:h-[380px] md:left-[5px] md:w-[180px] md:h-[375px] sm:left-[5px] sm:w-[180px] sm:h-[375px] left-[5px] w-[120px] h-[255px] overflow-y-scroll lg:rounded-4xl rounded-2xl z-20 scrollbar-hidden"
            >
                <div className="w-full h-full ">
                    <Image
                        src="/images/hero/content.webp"
                        alt="Scrolling content"
                        width={226}
                        height={1000}
                        className="object-cover w-full rounded-2xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default PhoneWithScroll;