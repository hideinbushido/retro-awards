'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Trophy, Tv } from 'lucide-react';
import { Opening } from '@/data/nominees';
import { PODIUM_POINTS } from '@/lib/votes';
import { YEARS } from '@/lib/firestore';

/**
 * Podium final, en triangle : 1er en haut au milieu, 2e en bas à gauche,
 * 3e en bas à droite. La taille de la cover décroît avec le rang, pour que la
 * hiérarchie se lise d’un coup d’œil.
 */
const WIDTH = ['w-40 sm:w-52', 'w-28 sm:w-36', 'w-24 sm:w-28'];
const BADGE = ['2.6rem', '2.2rem', '1.9rem'];

export function PodiumTriangle({
  year,
  podium,
  animeVote,
}: {
  year: number;
  podium: (Opening | undefined)[];
  /** L'animé de l'année a-t-il déjà été voté ? undefined tant qu'on l'ignore. */
  animeVote?: boolean;
}) {
  const [first, second, third] = podium;
  // Enchaîner sur l’année suivante plutôt que renvoyer vers un menu : c’est
  // ce qu’on a envie de faire juste après avoir validé un podium.
  const suivante = YEARS[YEARS.indexOf(year) + 1];
  return (
    <div className="flex flex-col items-center gap-8 py-6">
      <div className="text-center">
        <Trophy size={28} className="mx-auto mb-3" style={{ color: 'var(--neon)' }} />
        <h2 className="font-black text-2xl" style={{ color: 'var(--sepia)' }}>Ton podium {year}</h2>
        <p className="text-xs mt-2 tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>
          Vote enregistré — merci !
        </p>
      </div>

      <PodiumStep op={first} rank={0} />

      <div className="flex items-start justify-center gap-6 sm:gap-12">
        <PodiumStep op={second} rank={1} />
        <PodiumStep op={third} rank={2} />
      </div>

      {animeVote === false && (
        <div className="retro-card rounded-lg p-4 text-center max-w-md" style={{ borderColor: 'var(--neon)' }}>
          <p className="font-black text-sm" style={{ color: 'var(--sepia)' }}>
            Il te reste l’animé de {year}
          </p>
          <p className="text-xs mt-1 mb-3" style={{ color: 'var(--sepia-dim)' }}>
            Les openings et les animés se votent séparément — celui-ci n’est pas encore fait.
          </p>
          <Link
            href={`/anime/${year}`}
            className="btn-neon px-5 py-3 rounded text-sm inline-flex items-center gap-2"
            style={{ background: 'var(--neon)', color: 'var(--bg)' }}
          >
            <Tv size={14} /> Voter l’animé {year}
          </Link>
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        {suivante ? (
          <Link
            href={`/opening/${suivante}`}
            className="btn-neon px-5 py-3 rounded text-sm"
            style={{ background: 'var(--neon)', color: 'var(--bg)' }}
          >
            Openings {suivante} →
          </Link>
        ) : (
          <Link
            href={`/anime/${year}`}
            className="btn-neon px-5 py-3 rounded text-sm"
            style={{ background: 'var(--neon)', color: 'var(--bg)' }}
          >
            Voter l’anime {year}
          </Link>
        )}
        <Link href="/mes-votes" className="btn-neon px-5 py-3 rounded text-sm">Le récap de mes votes</Link>
      </div>
    </div>
  );
}

function PodiumStep({ op, rank }: { op?: Opening; rank: number }) {
  if (!op) return null;
  return (
    <div className={`flex flex-col items-center gap-2 ${WIDTH[rank]}`}>
      <div
        className="font-black rounded-full flex items-center justify-center shrink-0"
        style={{
          width: BADGE[rank],
          height: BADGE[rank],
          background: 'var(--neon)',
          color: 'var(--bg)',
          fontSize: rank === 0 ? '1rem' : '0.8rem',
        }}
      >
        {rank + 1}
      </div>
      <div
        className="retro-card rounded-lg overflow-hidden w-full"
        style={{
          borderColor: 'var(--neon)',
          boxShadow: rank === 0 ? '0 0 24px rgba(0,255,204,0.25)' : undefined,
        }}
      >
        <div className="relative aspect-[3/4]">
          <Image src={op.image} alt={op.animeName} fill sizes="(max-width: 640px) 40vw, 220px" className="object-cover" />
        </div>
        <div className="p-2 text-center">
          <p className="font-black text-xs leading-tight" style={{ color: 'var(--sepia)' }}>{op.animeName}</p>
          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--neon)' }}>{op.openingTitle}</p>
          <p className="text-xs mt-1 font-black" style={{ color: 'var(--sepia-dim)' }}>
            <Check size={10} className="inline mr-1" />{PODIUM_POINTS[rank]} pts
          </p>
        </div>
      </div>
    </div>
  );
}
