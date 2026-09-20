import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Presenters from '@/components/Presenters';
import Comments from '@/components/Comments';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Presenters />
        <section className="px-4 pb-20 md:pb-28" style={{ background: 'var(--bg)' }}>
          <Comments scope="accueil" title="Le mur des Retro Awards" />
        </section>
      </main>
    </>
  );
}
