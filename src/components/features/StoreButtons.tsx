import Image from "next/image";

export default function StoreButtons({ href, icon, topText, bottomText }: { href: string, icon: string, topText: string, bottomText: string }) {
  return (
    <a 
      href={href} 
      className="inline-flex items-center bg-white  lg:px-6 lg:py-3 px-2 py-1 rounded-lg hover:bg-gray-900 transition-colors"
    >
      <Image src={icon} alt={icon} width={24} height={24} className="w-6 h-6 mr-2" />
      <div>
        <div className="text-xs">{topText}</div>
        <div className="text-sm font-semibold">{bottomText}</div>
      </div>
    </a>
  )
}