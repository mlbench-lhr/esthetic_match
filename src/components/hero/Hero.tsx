'use client'
import DownloadButton from './DownloadButton'
import PhoneWithScroll from './PhoneWithScroll'
import { useTranslation } from "react-i18next";

export default function Hero() {
    const { t } = useTranslation();
    return (
        <div id="home" className="relative lg:h-screen lg:min-h-[1200px] min-h-screen bg-white">
            {/* Background Medical Scene Image */}
            <div
                className="absolute inset-0  bg-center bg-no-repeat opacity-60 z-0"
                style={{
                    backgroundImage: "url('/images/hero/background.svg')", // Your medical scene background
                    backgroundPosition: 'center'
                }}
            >
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex items-start h-full max-w-6xl mx-auto pt-40 ">
                {/* Left Content */}
                <div className="w-full  pr-0 lg:pr-16 text-center">
                    <h2 className="h2 font-bold text-black_primary leading-tight mb-6">
                        {t("hero.title")}
                    </h2>

                    <p className="text-36 mb-8 leading-relaxed text-black_primary max-w-4xl mx-auto">
                      {t("hero.subtitle")}
                    </p>

                    <DownloadButton text={t("hero.download")} className='py-4 items-center rounded-full'/>
                    {/* <PhoneWithScroll /> */}
                </div>
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10">
                <PhoneWithScroll />
            </div>

        </div>
    )
}