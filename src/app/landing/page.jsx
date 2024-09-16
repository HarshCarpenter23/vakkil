"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { FiX } from "react-icons/fi"; // Import the 'X' icon from react-icons

const GradientText = ({ children, className }) => (
  <span
    className={`inline-block text-transparent bg-clip-text ${className}`}
    style={{
      background:
        "radial-gradient(53.67% 201.24% at 49.78% -4.46%, #E7A1DA 0%, #40215C 35.06%, #058BCC 64.5%, #06ADD9 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}
  >
    {children}
  </span>
);

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Justice Symbol Background */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/Union.png"
          layout="fill"
          objectFit="contain"
          quality={100}
          alt="Justice Symbol"
          className="opacity-25"
        />
      </div>

      {/* Navigation with radial gradient */}
      <nav
        className="relative z-10 p-4 rounded-full mt-3 mx-1"
        style={{
          background:
            "radial-gradient(91.24% 5164.4% at 10.13% 33.47%, rgba(99, 17, 233, 0.43) 0%, rgba(3, 28, 249, 0.43) 53%, rgba(0, 216, 255, 0.43) 100%)",
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/vakkil_logo.png"
              width={30}
              height={30}
              alt="Vakkil logo"
              className="mr-2"
            />
            <span className="text-2xl font-bold text-white">Vakkil</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <a href="#" className="text-white hover:text-blue-200">
              For Business
            </a>
            <a href="#" className="text-white hover:text-blue-200">
              FAQ
            </a>
            <a href="/assistant">
              <button className="bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300">
                Get Started →
              </button>
            </a>
          </div>
          <button
            className="sm:hidden text-white transition-transform duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <Menu size={24} />} {/* Toggle icons */}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="sm:hidden absolute z-20 top-26 left-0 right-0 p-4 rounded-b-lg"
          style={{
            background:
              "radial-gradient(91.24% 5164.4% at 10.13% 33.47%, rgba(52, 216, 246, 1) 0%, rgba(52, 216, 246, 1) 53%, rgba(0, 216, 255, 1) 100%)",
          }}
        >
          <a href="#" className="block text-white hover:text-blue-200 py-2">
            For Business
          </a>
          <a href="#" className="block text-white hover:text-blue-200 py-2">
            FAQ
          </a>
          <a href="/assistant" className="block py-2">
            <button className="w-full bg-white text-purple-700 px-4 py-2 rounded-full hover:bg-blue-100 transition duration-300">
              Get Started →
            </button>
          </a>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto flex flex-col lg:flex-row items-center justify-around mt-10 lg:mt-20 px-4 relative z-10">
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">
            <GradientText>Vakkil</GradientText>
          </h1>
          <div className="space-y-2">
            {[
              "AI That Learns The",
              "Facts And Issues",
              "Unique To Your Case",
              "Built By A Litigator For",
              "Litigators",
            ].map((text, index) => (
              <p key={index} className="text-3xl sm:text-4xl font-semibold">
                <GradientText>{text}</GradientText>
              </p>
            ))}
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <Image
            src="/witchy_justice.png"
            width={400}
            height={500}
            alt="Lady Justice"
            className="object-contain"
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
