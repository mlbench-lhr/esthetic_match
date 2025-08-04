
import Image from 'next/image';

export interface NavigationButtonProps {
  src: string;
  className: string;
}
const NavigationButton: React.FC<NavigationButtonProps> = ({src, className }) => {
  
  return (
    <button
      className={`w-12 h-12 rounded-full  shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow border border-gray-100 ${className}`}
    >
      <Image
      src={src}
      alt={src}
      width={60}
      height={60}
      className="text-gray-600" />
    </button>
  );
};

export default NavigationButton;