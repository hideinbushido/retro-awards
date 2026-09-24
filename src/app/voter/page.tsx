'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, MessageCircle, Music, Tv, Vote } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { YEARS } from '@/lib/firestore';
import { PODIUM_POINTS } from '@/lib/votes';
import { FIN_DES_VOTES_TEXTE } from '@/lib/event';
import { useVotesClos } from '@/hooks/useVotesClos';

type Avancement = { year: number; anime: boolean; openings: boolean };

/**
 * Le point de départ du vote.
 *
 * Des visiteurs arrivaient sur le site sans comprendre par où commencer :
 * cette page dit en trois phrases comment ça marche, puis donne une porte
 * par année et par catégorie, avec ce qui est déjà fait.
 */
export default function VoterPage() {
  const [avancement, setAvancement] = useState<Avancement[] | null>(null);
  const clos = useVotesClos();

  useEffect(() => {
    let vivant = true;
    fetch('/api/voter/recap')
      .then((r) => (r.ok ? r.json() : { years: [] }))
      .then((data) => {
        if (!vivant) return;
        type Entree = { year: number; anime: unknown; podium: unknown[] };
        const entrees = (data.years ?? []) as Entree[];
        setAvancement(entrees.map((e) => ({ year: e.year, anime: Boolean(e.anime), openings: e.podium.length > 0 })));
      })
      .catch(() => { if (vivant) setAvancement([]); });
    return () => { vivant = false; };
  }, []);

  const fait = (year: number, quoi: 'anime' | 'openings') =>
    avancement?.find((a) => a.year === year)?.[quoi] ?? false;

  const total = (avancement ?? []).reduce((n, a) => n + (a.anime ? 1 : 0) + (a.openings ? 1 : 0), 0);
  // Le piège classique : classer les openings et croire l'année terminée.
  const animesOublies = (avancement ?? []).filter((a) => a.openings && !a.anime);
  const openingsOublies = (avancement ?? []).filter((a) => a.anime && !a.openings);

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen px-4 md:px-8" style={{ background: 'var(--bg)' }}>
        <div className="max-w-5xl mx-auto">

          <div className="text-center py-12 mb-4">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}
            >
              <Vote size={24} style={{ color: 'var(--neon)' }} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black mb-3" style={{ color: 'var(--sepia)' }}>Voter</h1>
            <p className="text-sm" style={{ color: 'var(--sepia-dim)' }}>
              {clos ? 'Les votes sont clos.' : `Ouvert jusqu’au ${FIN_DES_VOTES_TEXTE} inclus — deux minutes par année.`}
            </p>
            <div className="h-px w-24 mx-auto mt-4" style={{ background: 'linear-gradient(to right, transparent, var(--neon), transparent)' }} />
          </div>

          {/* Mode d'emploi */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
            {[
              { n: 1, titre: 'Choisis une année', texte: 'De 2005 à 2019, dans l’ordre que tu veux.' },
              {
                n: 2,
                titre: 'Vote',
                texte: `Un animé par année, et un podium de 3 openings : ${PODIUM_POINTS[0]}, ${PODIUM_POINTS[1]} et ${PODIUM_POINTS[2]} points.`,
              },
              { n: 3, titre: 'Pseudo et mail', texte: 'Demandés une seule fois, au premier vote.' },
            ].map((etape) => (
              <div key={etape.n} className="retro-card rounded-lg p-4">
                <span
                  className="inline-flex items-center justify-center rounded-full font-black mb-2"
                  style={{ width: '1.8rem', height: '1.8rem', background: 'var(--neon)', color: 'var(--bg)', fontSize: '0.9rem' }}
                >
                  {etape.n}
                </span>
                <p className="font-black text-sm" style={{ color: 'var(--sepia)' }}>{etape.titre}</p>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>{etape.texte}</p>
              </div>
            ))}
          </div>

          {animesOublies.length > 0 && !clos && (
            <div className="retro-card rounded-lg p-4 mb-6 text-center" style={{ borderColor: 'var(--neon)' }}>
              <p className="font-black text-sm" style={{ color: 'var(--sepia)' }}>
                Il te manque {animesOublies.length} animé{animesOublies.length > 1 ? 's' : ''}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--sepia-dim)' }}>
                Tu as classé les openings de {animesOublies.map((a) => a.year).join(', ')} sans voter l’animé de ces années.
              </p>
              <Link
                href={`/anime/${animesOublies[0].year}`}
                className="btn-neon px-5 py-3 rounded text-sm inline-flex items-center gap-2 mt-3"
                style={{ background: 'var(--neon)', color: 'var(--bg)' }}
              >
                <Tv size={14} /> Voter l’animé {animesOublies[0].year}
              </Link>
            </div>
          )}

          {openingsOublies.length > 0 && !clos && (
            <div className="retro-card rounded-lg p-4 mb-6 text-center">
              <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>
                Il te manque aussi {openingsOublies.length} podium{openingsOublies.length > 1 ? 's' : ''} d’openings :{' '}
                {openingsOublies.map((a) => a.year).join(', ')}.
              </p>
            </div>
          )}

          {total > 0 && (
            <p className="text-center text-xs mb-6" style={{ color: 'var(--sepia-dim)' }}>
              Tu as déjà rempli <strong style={{ color: 'var(--neon)' }}>{total}</strong> bulletin{total > 1 ? 's' : ''} sur {YEARS.length * 2}.{' '}
              <Link href="/mes-votes" style={{ color: 'var(--neon)' }}>Voir mes votes</Link>
            </p>
          )}

          {/* Une porte par année */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {YEARS.map((year) => (
              <div key={year} className="retro-card rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-2xl" style={{ color: 'var(--sepia)' }}>{year}</span>
                  <Link
                    href={`/annee/${year}#commentaires`}
                    className="text-xs inline-flex items-center gap-1"
                    style={{ color: 'var(--sepia-dim)' }}
                  >
                    <MessageCircle size={12} /> Commentaires
                  </Link>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/opening/${year}`}
                    className="btn-neon text-xs px-3 py-2 rounded flex-1 inline-flex items-center justify-center gap-1.5"
                    style={fait(year, 'openings') ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
                  >
                    {fait(year, 'openings') ? <Check size={12} /> : <Music size={12} />} Openings
                  </Link>
                  <Link
                    href={`/anime/${year}`}
                    className="btn-neon text-xs px-3 py-2 rounded flex-1 inline-flex items-center justify-center gap-1.5"
                    style={fait(year, 'anime') ? { background: 'var(--neon)', color: 'var(--bg)' } : {}}
                  >
                    {fait(year, 'anime') ? <Check size={12} /> : <Tv size={12} />} Animé
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
