import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  buttonContent: ReactNode;
}

const Modal = ({ isOpen, onClose, children, buttonContent }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="z-[10000] fixed inset-0 flex justify-center items-center bg-[#1D1D23] bg-opacity-50 p-4">
      <div className="relative bg-[#2B2B31] shadow-lg p-4 md:px-6 rounded-2xl w-full max-w-[350px] md:max-w-lg max-h-[90vh] overflow-y-auto">
        <button
          className="top-5 right-4 absolute text-gray-500 hover:text-black"
          onClick={onClose}
        >
          {buttonContent}
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
