import HomeCarousel from '@/components/HomeCarousel';
import Vcr from '@/components/home/Vcr';
import s from '@/components/home/home.module.css';

export default function CarrouselPage() {
  return (
    <div className={`${s.root} vhs`}>
      <Vcr />
      <main className="fixed inset-0 pt-16 overflow-hidden">
        <HomeCarousel />
      </main>
    </div>
  );
}
