import Image from 'next/image'

export default function AppDownload() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#"
            className="inline-flex items-center bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <Image
              src="/google-play-icon.png"
              alt="Google Play"
              width={24}
              height={24}
              className="mr-3"
            />
            <div className="text-left">
              <div className="text-xs text-gray-300">GET IT ON</div>
              <div className="text-lg font-semibold">Google Play</div>
            </div>
          </a>

          <a
            href="#"
            className="inline-flex items-center bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
          >
            <Image
              src="/app-store-icon.png"
              alt="App Store"
              width={24}
              height={24}
              className="mr-3"
            />
            <div className="text-left">
              <div className="text-xs text-gray-300">Download on the</div>
              <div className="text-lg font-semibold">App Store</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}