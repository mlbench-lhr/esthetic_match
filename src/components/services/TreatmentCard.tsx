interface TreatmentCardProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  bgColor?: string;
}

// components/TreatmentCard.tsx
import Image from 'next/image';

const TreatmentCard: React.FC<TreatmentCardProps> = ({
  imageSrc,
  title,
  subtitle,
  bgColor = "bg-black/20"
}) => {
  return (
    <div className="relative w-[300px] h-[560px] rounded-2xl overflow-hidden group cursor-pointer">
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${bgColor}`} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
        {/* Top label */}
        <div className="flex flex-col justify-start">
          <span className="p4 font-bold uppercase ">
            Treatments
          </span>
          <div className="space-y-4">
            <div className='text-[30px] font-light'>
              <h3 className=" leading-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="">
                  {subtitle}
                </p>
              )}
            </div>

            <button className="text-xs font-medium tracking-wider uppercase bg-white/20 px-4 py-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
              Details
            </button>
          </div>
        </div>

        {/* Bottom content */}

      </div>
    </div>
  );
};

export default TreatmentCard;