'use client';

import Image from 'next/image';

interface BulletPoint {
  id: string;
  text: string;
}

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  introText?: string;
  bulletPoints?: BulletPoint[];
  phoneNumber?: string;
  mainImage?: string;
  secondaryMedia?: string; // Can be image path or YouTube URL
}

// Helper function to check if string is a YouTube URL
function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function AboutSection({
  title = "Crafted with Heart, Served with Soul",
  subtitle = "Seasonal ingredients, wood-fired flavors, and a little bit of home",
  description = "We’re a neighborhood kitchen inspired by simple, honest cooking. Our team sources peak-season produce, bakes fresh each morning, and slow-cooks stocks and sauces the old-fashioned way. Whether it’s a quiet weekday lunch or a lively dinner with friends, we want every plate to feel warm, generous, and thoughtfully made.",
  introText = "Step into our warm, inviting space where every detail has been thoughtfully crafted to create an unforgettable dining experience. From the moment you arrive, you'll feel the passion and dedication that goes into every aspect of our restaurant.",
  bulletPoints = [
    { id: '1', text: 'Locally sourced produce and sustainably raised meats, prepared fresh every day.' },
    { id: '2', text: 'House-made pastas, breads, and desserts—crafted in small batches for maximum flavor.' },
    { id: '3', text: 'Welcoming, unpretentious hospitality with a menu that changes with the seasons.' }
  ],
  phoneNumber = "+1 2233 44556 77",
  mainImage = "/images/dining.jpg",
  secondaryMedia = "https://youtu.be/kRCH8kD1GD0?si=MN-xp3NEBRS2fLtD"
}: AboutSectionProps) {
  const isVideo = isYouTubeUrl(secondaryMedia);
  const videoId = isVideo ? getYouTubeVideoId(secondaryMedia) : null;

  return (
    <section id="about" className="py-20 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.2em] text-gray-400">ABOUT US</p>
          <h2 className="mt-2 font-display text-4xl font-bold text-gray-900">
            {title.includes('Our Story') ? (
              <>
                Discover <span className="text-orange-500">Our Story</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="font-body text-xl text-gray-600 mt-4">
            {subtitle}
          </p>
        </div>

        {/* 2-column layout */}
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          {/*big image*/}
          <div className="space-y-6">
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={mainImage}
                alt="Restaurant dining area"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* CTA box */}
            <div className="rounded-xl border-2 border-orange-500 px-6 py-6 text-center bg-white shadow-lg">
              <div className="text-gray-800 font-medium text-lg">Book a Table</div>
              <a
                href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                className="mt-2 inline-block text-2xl font-bold text-orange-600 tracking-wide hover:text-orange-700 transition-colors"
              >
                {phoneNumber}
              </a>
            </div>
          </div>

          {/* bullet list */}
          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed font-body text-lg">
              {introText}
            </p>

            <ul className="space-y-4">
              {bulletPoints.map((point) => (
                <Bullet key={point.id}>
                  {point.text}
                </Bullet>
              ))}
            </ul>

            <p className="text-gray-700 leading-relaxed font-body">
              {description}
            </p>

            {/* Secondary Media - Image or YouTube Video */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-lg">
              {isVideo && videoId ? (
                // YouTube Video Player
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
                  title="About our restaurant"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                // Image with Play Button (for non-video media)
                <>
                  <Image
                    src={secondaryMedia}
                    alt="Restaurant media"
                    fill
                    className="object-cover"
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** check bullet item */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-orange-600">
        <svg
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 fill-white"
          aria-hidden="true"
        >
          <path d="M9 16.2l-3.5-3.5L4 14.2 9 19l11-11-1.5-1.5z" />
        </svg>
      </span>
      <span className="text-gray-700 leading-relaxed font-body">{children}</span>
    </li>
  );
}
