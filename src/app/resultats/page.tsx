import Link from 'next/link';
import { Trophy, ChevronLeft, Music, Tv } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { YEARS, getOpenings, getAnimes } from '@/lib/firestore';

export const revalidate = 60;

export default async function ResultatsPage() {
  const results = await Promise.all(
    YEARS.map(async (year) => {
      const [openings, animes] = await Promise.all([
        getOpenings(year).catch(() => []),
        getAnimes(year).catch(() => []),
      ]);
      const topOpening = openings.sort((a, b) => b.votes - a.votes)[0] ?? null;
      const topAnime = animes.sort((a, b) => b.votes - a.votes)[0] ?? null;
      return { year, topOpening, topAnime };
    })
  );

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen px-4 md:px-8" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center py-12 mb-8">
            <Trophy size={32} className="mx-auto mb-4" style={{ color: 'var(--neon)' }} />
            <h1 className="text-3xl md:text-5xl font-black mb-3" style={{ color: 'var(--sepia)' }}>
              Résultats
            </h1>
            <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>
              Les gagnants de chaque année — 2019 à 2005
            </p>
            <div className="h-px w-24 mx-auto mt-4" style={{ background: 'linear-gradient(to right, transparent, var(--neon), transparent)' }} />
          </div>

          <div className="flex flex-col gap-4">
            {results.map(({ year, topOpening, topAnime }) => (
              <Link
                key={year}
                href={`/annee/${year}`}
                className="retro-card rounded-lg p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 group"
              >
                {/* Year */}
                <span
                  className="font-black text-3xl shrink-0 group-hover:neon-text transition-all"
                  style={{ color: 'var(--sepia)', minWidth: '5rem' }}
                >
                  {year}
                </span>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Opening winner */}
                  <div className="flex items-start gap-2">
                    <Music size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--neon)' }} />
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: 'var(--sepia-dim)' }}>
                        Meilleur Opening
                      </p>
                      {topOpening ? (
                        <>
                          <p className="text-sm font-bold" style={{ color: 'var(--sepia)' }}>{topOpening.animeName}</p>
                          <p className="text-xs" style={{ color: 'var(--neon)' }}>{topOpening.openingTitle}</p>
                          <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>{topOpening.votes} vote{topOpening.votes !== 1 ? 's' : ''}</p>
                        </>
                      ) : (
                        <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>Pas encore de votes</p>
                      )}
                    </div>
                  </div>

                  {/* Anime winner */}
                  <div className="flex items-start gap-2">
                    <Tv size={14} className="mt-0.5 shrink-0" style={{ color: 'var(--neon)' }} />
                    <div>
                      <p className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: 'var(--sepia-dim)' }}>
                        Anime de l'Année
                      </p>
                      {topAnime ? (
                        <>
                          <p className="text-sm font-bold" style={{ color: 'var(--sepia)' }}>{topAnime.name}</p>
                          <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>{topAnime.votes} vote{topAnime.votes !== 1 ? 's' : ''}</p>
                        </>
                      ) : (
                        <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>Pas encore de votes</p>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/" className="btn-neon px-6 py-3 rounded text-sm inline-flex items-center gap-2">
              <ChevronLeft size={16} /> Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
