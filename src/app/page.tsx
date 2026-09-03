import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Presenters from '@/components/Presenters';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Presenters />
      </main>
    </>
  );
}
