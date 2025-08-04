// components/PhoneWithScroll.tsx
import Image from "next/image";

const PhoneWithScroll = () => {
    return (
        <div className="relative md:w-[500px] w-[250px] w- md:h-[800px] h-[200px] mx-auto overflow-hidden">
            {/* Phone hand image as background */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                <Image
                    src="/images/hero/hand.svg"
                    alt="Phone Frame"
                    fill
                    className="object-bottom object-contain"
                    priority
                />
            </div>

            {/* Scrollable screen area */}
            {/* Try different positioning values */}
            <div
                className="absolute md:top-[150px] top-[5px] md:left-[70px] left-[70px] md:w-[255px] md:h-[540px] w-[80px] h-[170px] overflow-y-scroll rounded-2xl z-20 scrollbar-hidden"
            >
                <div className="w-full h-full ">
                    <Image
                        src="/images/hero/random.png"
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