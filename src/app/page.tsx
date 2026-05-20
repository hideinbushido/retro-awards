import Navbar from '@/components/Navbar';
import BackgroundMusic from '@/components/BackgroundMusic';
import HomeCarousel from '@/components/HomeCarousel';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <BackgroundMusic src="/Moonlit Save Point.mp3" />
      <main className="fixed inset-0 pt-16 overflow-hidden">
        <HomeCarousel />
      </main>
    </>
  );
}
