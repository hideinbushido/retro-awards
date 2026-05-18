import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Music, Tv } from 'lucide-react';
import Navbar from '@/components/Navbar';
import OpeningNominees from '@/components/OpeningNominees';
import AnimeNominees from '@/components/AnimeNominees';
import { YEARS } from '@/lib/firestore';
import { nominees } from '@/data/nominees';

type Props = { params: Promise<{ year: string }> };

export async function generateStaticParams() {
  return YEARS.map((y) => ({ year: String(y) }));
}

export default async function YearPage({ params }: Props) {
  const { year: yearStr } = await params;
  const year = Number(yearStr);

  if (!YEARS.includes(year)) notFound();

  const currentIndex = YEARS.indexOf(year);
  const prevYear = YEARS[currentIndex - 1] ?? null;
  const nextYear = YEARS[currentIndex + 1] ?? null;

  const yearData = nominees[year] ?? { openings: [], animes: [] };

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto px-4">

          {/* ── HEADER ── */}
          <div className="text-center mb-16 pt-8">
            <div className="flex items-center justify-center gap-6 mb-6">
              {nextYear ? (
                <Link href={`/annee/${nextYear}`}
                  className="flex items-center gap-1 text-xs font-bold tracking-widest btn-neon px-3 py-1.5 rounded"
                >
                  <ChevronLeft size={14} /> {nextYear}
                </Link>
              ) : <div className="w-20" />}

              <span className="font-black neon-text" style={{ fontSize: '5rem', lineHeight: 1 }}>{year}</span>

              {prevYear ? (
                <Link href={`/annee/${prevYear}`}
                  className="flex items-center gap-1 text-xs font-bold tracking-widest btn-neon px-3 py-1.5 rounded"
                >
                  {prevYear} <ChevronRight size={14} />
                </Link>
              ) : <div className="w-20" />}
            </div>

            <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>
              2 CATÉGORIES · {yearData.openings.length + yearData.animes.length} NOMINÉS
            </p>
            <div className="h-px w-32 mx-auto mt-4" style={{ background: 'linear-gradient(to right, transparent, var(--neon), transparent)' }} />
          </div>

          {/* ── OPENING ── */}
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded flex items-center justify-center"
                style={{ background: 'rgba(0,255,204,0.1)', border: '1px solid var(--border)' }}
              >
                <Music size={18} style={{ color: 'var(--neon)' }} />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--neon)' }}>CATÉGORIE 01</p>
                <h2 className="text-xl font-black" style={{ color: 'var(--sepia)' }}>Meilleur Opening</h2>
              </div>
              <div className="flex-1 h-px ml-4" style={{ background: 'linear-gradient(to right, var(--border), transparent)' }} />
            </div>
            {yearData.openings.length === 0 ? (
              <EmptyState message="Aucun opening nominé pour cette année." />
            ) : (
              <OpeningNominees year={year} openings={yearData.openings} />
            )}
          </section>

          {/* ── ANIME ── */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded flex items-center justify-center"
                style={{ background: 'rgba(0,255,204,0.1)', border: '1px solid var(--border)' }}
              >
                <Tv size={18} style={{ color: 'var(--neon)' }} />
              </div>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--neon)' }}>CATÉGORIE 02</p>
                <h2 className="text-xl font-black" style={{ color: 'var(--sepia)' }}>Anime de l'Année</h2>
              </div>
              <div className="flex-1 h-px ml-4" style={{ background: 'linear-gradient(to right, var(--border), transparent)' }} />
            </div>
            {yearData.animes.length === 0 ? (
              <EmptyState message="Aucun anime nominé pour cette année." />
            ) : (
              <AnimeNominees year={year} animes={yearData.animes} />
            )}
          </section>

          <div className="text-center mt-16">
            <Link href="/#timeline" className="btn-neon px-6 py-3 rounded text-sm inline-flex items-center gap-2">
              <ChevronLeft size={16} /> Retour à la timeline
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-12 rounded-lg"
      style={{ border: '1px dashed var(--border)', color: 'var(--sepia-dim)' }}
    >
      <p className="text-sm">{message}</p>
    </div>
  );
}
