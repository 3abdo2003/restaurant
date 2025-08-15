'use client';

import { useState, useEffect, useRef } from 'react';
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

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);
  const goToSlide = (i: number) => setCurrentSlide(i);

  // Auto-advance (paused during interaction)
  const isInteractingRef = useRef(false);
  useEffect(() => {
    if (isInteractingRef.current) return;
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [currentSlide]);

  // Touch swipe (mobile drag)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      isInteractingRef.current = true;
      touchStartX.current = e.touches[0].clientX;
      touchDeltaX.current = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };

    const onTouchEnd = () => {
      const threshold = 50; // px to trigger swipe
      if (touchDeltaX.current > threshold) prevSlide();
      else if (touchDeltaX.current < -threshold) nextSlide();

      // small cooldown so autoplay doesn’t fire immediately
      setTimeout(() => {
        isInteractingRef.current = false;
      }, 300);
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: true });
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative h-[86svh] md:h-screen min-h-[520px] overflow-hidden scroll-mt-20"
    >
      <div
        ref={containerRef}
        className="relative w-full h-full select-none [touch-action:pan-y] md:[touch-action:auto]"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40">
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col md:flex-row items-center justify-center h-full px-4 sm:px-6">
              {/* Text box (you can tweak max-w/padding to size it on mobile) */}
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div
                  className="
                    bg-black/60 backdrop-blur-sm rounded-xl 
                    p-3 sm:p-5 md:p-8 
                    shadow-2xl border-2 border-orange-500 
                    text-center md:text-left
                    max-w-[80vw] sm:max-w-sm md:max-w-lg
                  "
                >
                  <h3 className="text-lg sm:text-xl md:text-3xl font-bold text-white mb-2 leading-snug">
                    {slide.title}
                  </h3>
                  <p className="text-white text-sm sm:text-base md:text-base leading-relaxed mb-4">
                    {slide.textBoxContent}
                  </p>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-full text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg">
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

      {/* Prev/Next buttons — hidden on mobile, visible on md+ (desktop) */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-orange-500 hover:bg-orange-600 shadow-md transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-orange-500 hover:bg-orange-600 shadow-md transition-all"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 sm:bottom-6 w-full flex justify-center gap-2.5 sm:gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-orange-500 scale-110' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
