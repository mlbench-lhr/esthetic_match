import Image from "next/image";

export default function StoreButtons({ 
  href, 
  icon, 
  topText, 
  bottomText 
}: { 
  href: string, 
  icon: string, 
  topText: string, 
  bottomText: string 
}) {
  return (
    <a 
      href={href} 
      className="inline-flex items-center bg-white lg:px-3 lg:py-2 px-2 py-1 rounded-lg shadow-md transform transition-transform hover:-translate-y-2"
    >
      <Image 
        src={icon} 
        alt={bottomText} 
        width={24} 
        height={24} 
        className="w-6 h-6 mr-2" 
      />
      <div>
        <div className="text-10 font-bold">{topText}</div>
        <div className="text-22 font-bold">{bottomText}</div>
      </div>
    </a>
  );
}
