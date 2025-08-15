'use client';
import Hero from '@/components/Hero';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import About from '@/components/About';

export default function Home() {
  return (
    <div className="min-h-screen">
        <Hero />
        <Menu />
        <Gallery />
        <About />
    </div>
  );
}
