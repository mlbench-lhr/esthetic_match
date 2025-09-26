import Image from 'next/image';

export interface NavigationButtonProps {
  src: string;
  className: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ src, className }) => {
  
  return (
    <button
      className={`
        w-12 h-12 rounded-full shadow-lg flex items-center justify-center 
        border border-gray-100 transition-all duration-300 ease-in-out
        hover:shadow-xl hover:scale-105 hover:border-gray-200 
        hover:bg-gray-50 active:scale-95 active:shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
        ${className}
      `}
    >
      <Image
        src={src}
        alt={src}
        width={60}
        height={60}
        className="text-gray-600 transition-opacity duration-300 hover:opacity-80" 
      />
    </button>
  );
};

export default NavigationButton;