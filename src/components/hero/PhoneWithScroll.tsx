// components/PhoneWithScroll.tsx
import Image from "next/image";

const PhoneWithScroll = () => {
    return (
        <div className="relative w-[300px] h-[600px] mx-auto overflow-hidden">
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
                className="absolute top-[210px] left-[40px] w-[155px] h-[350px] overflow-y-scroll rounded-2xl z-20 scrollbar-hidden"
            >
                <div className="w-full h-full ">
                    <Image
                        src="/images/hero/random.png"
                        alt="Scrolling content"
                        width={226}
                        height={1000}
                        className="object-cover rounded-2xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default PhoneWithScroll;