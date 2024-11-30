import { useState, useEffect } from "react";
import { assets } from "../assets/assets";

const banners = [
  {
    title: "Latest Arrivals",
    subtitle: "SHOP NOW",
    description: "OUR BESTSELLERS",
    image: assets.hero_img,
  },
  {
    title: "New Deals",
    subtitle: "CHECK NOW",
    description: "HOT DEALS",
    image: assets.deals_img,
  },
  {
    title: "Best Sellers",
    subtitle: "BUY NOW",
    description: "TOP PRODUCTS",
    image: assets.best_img,
  },
  {
    title: "Winter Essentials",
    subtitle: "DISCOVER",
    description: "NEW COLLECTION",
    image: assets.winter_img,
  },
];

const Hero = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    banners.forEach((banner) => {
      const img = new Image();
      img.src = banner.image;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
      setFade(true);
    }, 300);
  };

  return (
    <div className="relative flex flex-col sm:flex-row border border-gray-400 z-10 ">
      {/* Left Side (Text Content) */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 bg-gradient-to-b from-white to-gray-100">
        <div
          className={`text-[#414141] transition-opacity duration-500 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-gradient-to-r from-gray-400 to-gray-900"></p>
            <p className="font-medium text-sm md:text-base tracking-wide">
              {banners[currentBanner].description}
            </p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-gray-900 font-semibold tracking-wider drop-shadow-md">
            {banners[currentBanner].title}
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base text-gray-600 uppercase tracking-wider">
              {banners[currentBanner].subtitle}
            </p>
            <p className="w-8 md:w-11 h-[2px] bg-gradient-to-l from-gray-400 to-gray-900"></p>
          </div>
        </div>
      </div>
      {/* Right Side (Image) */}
      <div className="relative w-full sm:w-1/2">
        <div className="w-full h-64 sm:h-[400px] bg-gray-200 overflow-hidden relative">
          <img
            src={banners[currentBanner].image}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
            alt="Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
