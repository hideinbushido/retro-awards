import Link from 'next/link';
import { ChevronLeft, Music } from 'lucide-react';
import Navbar from '@/components/Navbar';
import YearTimeline from '@/components/YearTimeline';

export default function OpeningPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen px-4 md:px-8" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto">

          <div className="text-center py-12 mb-8">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}
            >
              <Music size={24} style={{ color: 'var(--neon)' }} />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--neon)' }}>
              CATÉGORIE 01
            </p>
            <h1 className="text-3xl md:text-5xl font-black mb-3" style={{ color: 'var(--sepia)' }}>Opening</h1>
            <p className="text-xs tracking-widest" style={{ color: 'var(--sepia-dim)' }}>
              Choisis une année pour voter
            </p>
            <div className="h-px w-24 mx-auto mt-4" style={{ background: 'linear-gradient(to right, transparent, var(--neon), transparent)' }} />
          </div>

          <YearTimeline basePath="opening" />

          <div className="text-center mt-12">
            <Link href="/" className="btn-neon px-6 py-3 rounded text-sm inline-flex items-center gap-2">
              <ChevronLeft size={16} /> Retour
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
