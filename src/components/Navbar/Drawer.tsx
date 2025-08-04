import React, { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface DrawerProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Drawer = ({ children, isOpen, setIsOpen }: DrawerProps) => {
  return (
    <main
      className={
        " fixed overflow-hidden z-10 bg-opacity-60 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0  "
          : " transition-all delay-500 opacity-0 -translate-x-full  ")
      }
    >
      <section
        className={
          "w-270 max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (isOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <article className="relative w-100 pb-10 flex flex-col space-y-6 h-full">
          <header className="p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center w-8 h-8 mr-2">
                <Image
                  className="block h-full w-full "
                  width={10}
                  height={10}
                  src={"/logo.svg"}
                  alt="esthetic-logo"
                />
              </div>
              <p className="font-extrabold text-lg">ESTHETIC MATCH</p>
            </div>
            <XMarkIcon
              className="block h-6 w-6"
              onClick={() => {
                setIsOpen(false);
              }}
            />
          </header>
          <div
            onClick={() => {
              setIsOpen(false);
            }}
          >
            {children}
          </div>
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
};

export default Drawer;
