interface TreatmentCardProps {
  imageSrc: string;
  title: string;
  detail: string;
}

// components/TreatmentCard.tsx
import Image from "next/image";

const TreatmentCard: React.FC<TreatmentCardProps> = ({
  imageSrc,
  title,
  detail,
}) => {
  return (
    <div className="relative md:w-[300px] md:h-[560px] w-[280px] h-[400px] rounded-2xl overflow-hidden group cursor-pointer">
      <Image src={imageSrc} alt={title} fill className="object-cover" />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 transition-opacity group-hover:opacity-70" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white group overflow-hidden">
        {/* Top label */}
        <div className="flex flex-col justify-start">
          <span className="p4 font-bold uppercase">Treatments</span>
          <div className="space-y-4">
            <div className="text-[30px] font-light">
              <h3 className="leading-tight">{title}</h3>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="relative h-[80px] ">
          {/* Content that slides up on hover - includes both Details label and detail text */}
          <div
            className="
        absolute left-0 right-0 bottom-0 text-center
        translate-y-0 transition-all duration-500
        group-hover:-translate-y-6
        px-2 space-y-2
      "
          >
            <p className="text-sm font-semibold uppercase tracking-widest">
              Details
            </p>
            <div className="text-xs hidden group-hover:block transition-opacity duration-500">
              {detail}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreatmentCard;
