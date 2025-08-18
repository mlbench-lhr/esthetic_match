'use client'
import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  return (
    <footer className=" text-white max-w-[1230px] mx-auto">
      <div className="container mx-auto px-6 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* App Section */}
          <div>
            <h3 className="h2 font-light ">App</h3>
            <h4 className="h2 font-light mb-8">Learn</h4>
            <div className="space-y-4 flex flex-col">
              <span onClick={() => scrollToSection("faqs")} className="p2 cursor-pointer">
                FAQs
              </span>
              <span onClick={() => scrollToSection("about")} className="p2 cursor-pointer">
                About
              </span>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="h2 font-light mb-8">Contact</h3>
            <div className="space-y-4">
              <p className="p2">Email: help@estheticmatch.com</p>
              <p className="p2">Location: New York, NY</p>
            </div>
          </div>

          {/* Logo Section */}
          <div className="flex justify-start lg:justify-end">
            <div className="text-right">
              <div className="flex items-center gap-2 ">
                <Image
                  src="/images/footer/logo.svg"
                  alt="logo"
                  width={50}
                  height={50}
                />
                <span className="h4 font-extrabold">ESTHETIC MATCH</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-16 mb-8 lg:px-6 max-w-screen-xl mx-auto grid lg:grid-cols-3 items-center">
          {/* Left placeholder (can be empty) */}
          <div></div>

          {/* Social Media Icons - Center Column */}
          <div className="flex lg:justify-center gap-6">
            {["instagram", "twitter", "facebook", "youtube", "tiktok"].map(
              (platform) => (
                <a
                  key={platform}
                  href="#"
                  className="w-8 h-8 hover:opacity-70 transition-opacity"
                >
                  <Image
                    src={`/images/footer/${platform}.webp`}
                    alt={platform}
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </a>
              )
            )}
          </div>

          {/* Copyright - Right Column */}
          <div className="lg:text-right lg:mt-0 mt-5">
            <p className="text-sm whitespace-nowrap">
              © Esthetic Match Inc, all rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
