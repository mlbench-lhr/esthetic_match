import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface NavigationButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
}
const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick }) => {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  
  return (
    <button
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow border border-gray-100"
      aria-label={`Navigate ${direction}`}
    >
      <Icon size={20} className="text-gray-600" />
    </button>
  );
};

export default NavigationButton;