import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Music } from 'lucide-react';
import Navbar from '@/components/Navbar';
import OpeningNominees from '@/components/OpeningNominees';
import { YEARS } from '@/lib/firestore';
import { nominees } from '@/data/nominees';

type Props = { params: Promise<{ year: string }> };

export async function generateStaticParams() {
  return YEARS.map((y) => ({ year: String(y) }));
}

export default async function OpeningYearPage({ params }: Props) {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
  if (!YEARS.includes(year)) notFound();

  const idx = YEARS.indexOf(year);
  const prevYear = YEARS[idx - 1] ?? null;
  const nextYear = YEARS[idx + 1] ?? null;
  const openings = nominees[year]?.openings ?? [];

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Music size={14} style={{ color: 'var(--neon)' }} />
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--neon)' }}>
                Meilleur Opening
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 mb-4">
              {nextYear ? (
                <Link href={`/opening/${nextYear}`} className="flex items-center gap-1 text-xs font-bold btn-neon px-3 py-1.5 rounded">
                  <ChevronLeft size={14} /> {nextYear}
                </Link>
              ) : <div className="w-20" />}

              <span className="font-black neon-text" style={{ fontSize: '4rem', lineHeight: 1 }}>{year}</span>

              {prevYear ? (
                <Link href={`/opening/${prevYear}`} className="flex items-center gap-1 text-xs font-bold btn-neon px-3 py-1.5 rounded">
                  {prevYear} <ChevronRight size={14} />
                </Link>
              ) : <div className="w-20" />}
            </div>

            <div className="h-px w-32 mx-auto" style={{ background: 'linear-gradient(to right, transparent, var(--neon), transparent)' }} />
          </div>

          {openings.length === 0 ? (
            <div className="text-center py-16 rounded-lg" style={{ border: '1px dashed var(--border)', color: 'var(--sepia-dim)' }}>
              <p className="text-sm">Aucun opening nominé pour {year}.</p>
            </div>
          ) : (
            <OpeningNominees year={year} openings={openings} />
          )}

          <div className="text-center mt-12">
            <Link href="/opening" className="btn-neon px-6 py-3 rounded text-sm inline-flex items-center gap-2">
              <ChevronLeft size={16} /> Toutes les années
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
