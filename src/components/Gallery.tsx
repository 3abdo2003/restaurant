'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface GallerySlide {
  id: number;
  image: string;
  title: string;
}

const Gallery = () => {
  const slides: GallerySlide[] = [
    { id: 1, image: '/images/dining.jpg', title: 'Dining room' },
    { id: 2, image: '/images/coffee.jpg', title: 'Coffee bar' },
    { id: 3, image: '/images/chef.jpg', title: 'Chef table' },
    { id: 4, image: '/images/bar.jpg', title: 'Bar counter' },
    { id: 5, image: '/images/table.jpg', title: 'Friends at table' },
  ];

  const N = slides.length;
  const loopSlides = [...slides, ...slides, ...slides];
  const initialLogical = 2;
  const [index, setIndex] = useState(N + initialLogical);
  const [offset, setOffset] = useState(0);
  const [paused, setPaused] = useState(false);
  const [transitionOn, setTransitionOn] = useState(true);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const logicalActive = ((index % N) + N) % N;

  const goToLogical = (targetLogical: number) => {
    const candidates = [targetLogical, targetLogical + N, targetLogical + 2 * N];
    let best = candidates[0];
    let bestDist = Math.abs(candidates[0] - index);
    for (let k = 1; k < candidates.length; k++) {
      const d = Math.abs(candidates[k] - index);
      if (d < bestDist) {
        best = candidates[k];
        bestDist = d;
      }
    }
    setIndex(best);
  };

  const nextSlide = () => setIndex((i) => i + 1);
  const prevSlide = () => setIndex((i) => i - 1);

  // Auto-slide
  useEffect(() => {
    if (paused || document.hidden) return;
    const t = setInterval(() => setIndex((i) => i + 1), 5000);
    return () => clearInterval(t);
  }, [paused]);

  const recalcOffset = () => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const firstCard = track.children[0] as HTMLElement | undefined;
    if (!firstCard) return;

    const cardWidth = firstCard.getBoundingClientRect().width;

    const computed = getComputedStyle(track);
    const gap =
      parseFloat(computed.columnGap || '0') ||
      parseFloat(computed.gap || '0') ||
      0;

    const viewportWidth = container.getBoundingClientRect().width;
    const startToActive = (cardWidth + gap) * index;
    const centerOffset = (viewportWidth - cardWidth) / 2;

    setOffset(startToActive - centerOffset);
  };

  useEffect(() => {
    const leftBound = 0;
    const rightBound = 3 * N - 1;
    if (index <= leftBound + 1 || index >= rightBound - 1) {
      const normalized = N + (((index % N) + N) % N);
      setTransitionOn(false);
      setIndex(normalized);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setTransitionOn(true))
      );
    } else {
      recalcOffset();
    }
  }, [index, N]);

  useEffect(() => {
    const ro = new ResizeObserver(() => recalcOffset());
    if (containerRef.current) ro.observe(containerRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // Swipe handling
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      setPaused(true);
      touchStartX.current = e.touches[0].clientX;
      touchDeltaX.current = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
    };

    const onTouchEnd = () => {
      const threshold = 50;
      if (touchDeltaX.current > threshold) {
        prevSlide();
      } else if (touchDeltaX.current < -threshold) {
        nextSlide();
      }
      setTimeout(() => setPaused(false), 300);
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
    <section id="gallery" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.2em] text-gray-400">GALLERY</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-gray-900">
            Check <span className="text-orange-500">Our Gallery</span>
          </h2>
        </div>

        {/* Viewport */}
        <div
          ref={containerRef}
          className="mt-10 relative overflow-hidden select-none py-4 mx-auto max-w-[980px] [touch-action:pan-y]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            ref={trackRef}
            className={[
              'flex items-center justify-start gap-5 sm:gap-6 will-change-transform',
              transitionOn ? 'transition-transform duration-500 ease-out' : '',
            ].join(' ')}
            style={{
              transform: `translateX(-${Math.max(0, offset)}px)`,
            }}
          >
            {loopSlides.map((slide, i) => {
              const isActive = i === index;
              return (
                <button
                  key={`${i}-${slide.id}`}
                  onClick={() => goToLogical((i % N + N) % N)}
                  aria-label={slide.title}
                  className="shrink-0"
                >
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-black/10
                       w-[min(300px,80vw)] aspect-[4/3] shrink-0
                       transition-all duration-300 ease-out
                       ${isActive
                         ? 'scale-105 border-4 border-orange-500'
                         : 'scale-95 opacity-90 hover:scale-100 hover:shadow-lg'}`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center space-x-2 sm:space-x-3 z-30">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToLogical(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                logicalActive === i
                  ? 'bg-orange-500 scale-110'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
