'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  textBoxContent: string;
}

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: HeroSlide[] = [
    {
      id: 1,
      image: '/images/hero-1.jpg',
      title: 'Special Dish of the Day',
      textBoxContent:
        'Chefs choice for the day. Locally sourced when possible, thoughtfully seasoned, and plated with care. Ask for todays selection.',
    },
    {
      id: 2,
      image: '/images/hero-2.jpg',
      title: 'Fresh & Organic',
      textBoxContent:
        'Thoughtfully sourced, minimally processed, and full of life. Every plate centers on organic ingredients and straightforward technique.',
    },
    {
      id: 3,
      image: '/images/hero-3.jpg',
      title: 'Cozy Atmosphere',
      textBoxContent:
        'Warm lighting, natural textures, and low music create an intimate setting for unhurried meals and good conversation.',
    },
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: number) => setCurrentSlide(index);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden scroll-mt-20">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col md:flex-row items-center justify-center h-full px-4 sm:px-6">
              {/* Text box */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div
                  className="
                    bg-black/60 backdrop-blur-sm rounded-xl 
                    p-3 sm:p-4 md:p-8 
                    shadow-2xl border-2 border-orange-500 
                    text-center md:text-left
                    max-w-[260px] sm:max-w-sm md:max-w-lg
                  "
                >
                  <h3 className="text-base sm:text-lg md:text-3xl font-bold text-white mb-2">
                    {slide.title}
                  </h3>
                  <p className="text-white text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                    {slide.textBoxContent}
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1.5 px-4 sm:py-2 sm:px-5 rounded-full text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg">
                    Discover More
                  </button>
                </div>
              </div>

              {/* Empty right half for desktop */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          </div>
        ))}
      </div>

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-orange-500 rounded-full hover:bg-orange-600 shadow-md transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-orange-500 rounded-full hover:bg-orange-600 shadow-md transition-all"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 w-full flex justify-center space-x-2 sm:space-x-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-orange-500 scale-110' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;