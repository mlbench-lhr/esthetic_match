// components/PhoneWithScroll.tsx
import Image from "next/image";

const PhoneWithScroll = () => {
    return (
        <div className="relative lg:w-[500px] w-[250px] lg:h-[800px] h-[500px] mx-auto overflow-hidden">
            {/* Phone hand image as background */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                <Image
                    src="/images/hero/hand.svg"
                    alt="Phone Frame"
                    width={300}
                    height={700}
                    className="object-contain"
                    priority
                />
            </div>


            {/* Scrollable screen area */}
            {/* Try different positioning values */}
            <div
                className="absolute bottom-1  lg:left-[130px] left-[65px] lg:w-[240px] lg:h-[495px] w-[120px] h-[245px] overflow-y-scroll lg:rounded-4xl rounded-2xl z-20 scrollbar-hidden"
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