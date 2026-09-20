'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Mail, ListChecks } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { PODIUM_POINTS } from '@/lib/votes';
import { YEARS } from '@/lib/firestore';
import type { RecapEntry } from '@/app/api/voter/recap/route';

type Recap = {
  voter: { pseudo: string; email: string } | null;
  years: RecapEntry[];
  mail: boolean;
};

/**
 * Récapitulatif personnel : ce que j’ai voté, année par année.
 *
 * Rien ici n’est un résultat : on ne montre que les bulletins de la personne,
 * jamais les totaux, qui restent scellés jusqu’à la clôture.
 */
export default function MesVotesPage() {
  const [recap, setRecap] = useState<Recap | null>(null);
  const [mailState, setMailState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [mailError, setMailError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch('/api/voter/recap')
      .then((r) => (r.ok ? r.json() : { voter: null, years: [], mail: false }))
      .then((data) => { if (alive) setRecap(data as Recap); })
      .catch(() => { if (alive) setRecap({ voter: null, years: [], mail: false }); });
    return () => { alive = false; };
  }, []);

  async function sendRecap() {
    if (mailState === 'sending') return;
    setMailState('sending');
    setMailError(null);
    try {
      const res = await fetch('/api/voter/recap', { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setMailState('sent');
      else { setMailError(data.error ?? 'Le mail n’a pas pu partir.'); setMailState('idle'); }
    } catch {
      setMailError('Connexion impossible.');
      setMailState('idle');
    }
  }

  const years = recap?.years ?? [];
  const animeCount = years.filter((y) => y.anime).length;
  const openingCount = years.filter((y) => y.podium.length).length;
  const remaining = YEARS.filter((y) => {
    const entry = years.find((e) => e.year === y);
    return !entry || !entry.anime || !entry.podium.length;
  });

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen px-4 md:px-8" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">

          <div className="text-center py-12 mb-8">
            <ListChecks size={32} className="mx-auto mb-4" style={{ color: 'var(--neon)' }} />
            <h1 className="text-3xl md:text-5xl font-black mb-3" style={{ color: 'var(--sepia)' }}>Mes votes</h1>
            {recap?.voter && (
              <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>
                {recap.voter.pseudo} · {recap.voter.email}
              </p>
            )}
            <div className="h-px w-24 mx-auto mt-4" style={{ background: 'linear-gradient(to right, transparent, var(--neon), transparent)' }} />
          </div>

          {!recap && (
            <p className="text-center text-sm" style={{ color: 'var(--sepia-dim)' }}>Chargement…</p>
          )}

          {recap && !years.length && (
            <div className="retro-card rounded-xl p-8 text-center flex flex-col items-center gap-4">
              <h2 className="font-black text-xl" style={{ color: 'var(--sepia)' }}>Rien pour l’instant</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>
                Tes votes apparaîtront ici, année par année, dès que tu auras commencé.
              </p>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                <Link href="/anime" className="btn-neon px-5 py-3 rounded text-sm">Voter pour les animés</Link>
                <Link href="/opening" className="btn-neon px-5 py-3 rounded text-sm">Voter pour les openings</Link>
              </div>
            </div>
          )}

          {recap && years.length > 0 && (
            <>
              <div className="retro-card rounded-lg p-4 mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
                <p className="text-xs leading-relaxed flex-1" style={{ color: 'var(--sepia-dim)' }}>
                  <strong style={{ color: 'var(--sepia)' }}>{animeCount}</strong> anime{animeCount > 1 ? 's' : ''} et{' '}
                  <strong style={{ color: 'var(--sepia)' }}>{openingCount}</strong> podium{openingCount > 1 ? 's' : ''} d’openings
                  sur {YEARS.length} années. Les résultats restent scellés jusqu’à la clôture.
                </p>
                {recap.mail && (
                  <button
                    onClick={sendRecap}
                    disabled={mailState !== 'idle'}
                    className="btn-neon text-xs px-4 py-3 rounded shrink-0 inline-flex items-center gap-2"
                  >
                    <Mail size={12} />
                    {mailState === 'sent' ? 'Envoyé !' : mailState === 'sending' ? '...' : 'Recevoir par mail'}
                  </button>
                )}
              </div>
              {mailError && <p className="text-xs mb-4" style={{ color: '#ff5555' }}>{mailError}</p>}

              <div className="flex flex-col gap-4">
                {years.map((entry) => (
                  <div key={entry.year} className="retro-card rounded-lg p-4">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h2 className="font-black text-xl" style={{ color: 'var(--neon)' }}>{entry.year}</h2>
                      <Link href={`/annee/${entry.year}`} className="text-xs" style={{ color: 'var(--sepia-dim)' }}>
                        Revoir l’année
                      </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="sm:w-32 shrink-0">
                        <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: 'var(--sepia-dim)' }}>
                          Anime
                        </p>
                        {entry.anime ? (
                          <div className="flex sm:block items-center gap-3">
                            {entry.anime.image && (
                              <div className="relative rounded overflow-hidden shrink-0 w-16 sm:w-full" style={{ aspectRatio: '2/3' }}>
                                <Image src={entry.anime.image} alt={entry.anime.label} fill sizes="128px" className="object-cover" style={{ objectPosition: '50% 75%' }} />
                              </div>
                            )}
                            <p className="text-xs font-black sm:mt-2" style={{ color: 'var(--sepia)' }}>{entry.anime.label}</p>
                          </div>
                        ) : (
                          <Link href={`/anime/${entry.year}`} className="text-xs" style={{ color: 'var(--neon)' }}>
                            Pas encore voté →
                          </Link>
                        )}
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-black tracking-widest uppercase mb-2" style={{ color: 'var(--sepia-dim)' }}>
                          Openings
                        </p>
                        {entry.podium.length ? (
                          <div className="flex gap-3">
                            {entry.podium.map((op, rank) => (
                              <div key={op.id} className="flex-1 min-w-0">
                                {op.image && (
                                  <div className="relative rounded overflow-hidden" style={{ aspectRatio: '3/4' }}>
                                    <Image src={op.image} alt={op.sub} fill sizes="120px" className="object-cover" />
                                    <span
                                      className="absolute top-1 left-1 px-1.5 py-0.5 rounded font-black"
                                      style={{ background: 'var(--neon)', color: 'var(--bg)', fontSize: '0.65rem' }}
                                    >
                                      {rank + 1}
                                    </span>
                                  </div>
                                )}
                                <p className="text-xs font-black mt-1 truncate" style={{ color: 'var(--sepia)' }}>{op.sub}</p>
                                <p className="text-xs truncate" style={{ color: 'var(--neon)' }}>{op.label}</p>
                                <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>{PODIUM_POINTS[rank]} pts</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Link href={`/opening/${entry.year}`} className="text-xs" style={{ color: 'var(--neon)' }}>
                            Pas encore voté →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {remaining.length > 0 && (
                <div className="retro-card rounded-lg p-4 mt-6">
                  <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: 'var(--neon)' }}>
                    Il te reste ces années
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {remaining.map((y) => (
                      <Link key={y} href={`/annee/${y}`} className="btn-neon text-xs px-3 py-2 rounded">{y}</Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="text-center mt-12">
            <Link href="/" className="btn-neon px-6 py-3 rounded text-sm inline-flex items-center gap-2">
              <ChevronLeft size={16} /> Accueil
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
