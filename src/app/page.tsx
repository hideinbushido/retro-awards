import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Presenters from '@/components/Presenters';
import HomeCarousel from '@/components/HomeCarousel';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Presenters />

        <section id="editions" className="relative py-16 md:py-20 px-4" style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)' }}>
          <div className="max-w-5xl mx-auto text-center mb-10 md:mb-12">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--neon)' }}>
              15 années
            </p>
            <h2 className="font-black mb-3" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', color: 'var(--sepia)' }}>
              Les éditions, année par année
            </h2>
            <p className="text-xs md:text-sm" style={{ color: 'var(--sepia-dim)' }}>
              Utilise les flèches ou la frise en bas pour naviguer.
            </p>
          </div>
          <div className="relative w-full h-[75vh] md:h-screen max-h-[820px] rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
            <HomeCarousel />
          </div>
        </section>
      </main>
    </>
  );
}
