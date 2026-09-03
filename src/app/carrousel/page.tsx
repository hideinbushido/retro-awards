import Navbar from '@/components/Navbar';
import HomeCarousel from '@/components/HomeCarousel';

export default function CarrouselPage() {
  return (
    <>
      <Navbar />
      <main className="fixed inset-0 pt-16 overflow-hidden">
        <HomeCarousel />
      </main>
    </>
  );
}
