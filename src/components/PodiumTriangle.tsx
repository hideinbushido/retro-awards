'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Opening } from '@/data/nominees';
import { PODIUM_POINTS } from '@/lib/votes';
import { YEARS } from '@/lib/firestore';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';

/**
 * Podium final, en triangle : 1er en haut au milieu, 2e en bas à gauche,
 * 3e en bas à droite. La taille de la cover décroît avec le rang, pour que la
 * hiérarchie se lise d’un coup d’œil.
 */
const WIDTH = [t.step0, t.step1, t.step2];
const RANG = ['1er', '2e', '3e'];

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
    <div className={t.podium}>
      <div>
        <p className={`${s.osd} ${s.kicker}`}>■ Enregistré</p>
        <h2 className={`${s.display} ${t.podiumTitle}`}>Ton podium {year}</h2>
      </div>

      <PodiumStep op={first} rank={0} />

      <div className={t.podiumRow}>
        <PodiumStep op={second} rank={1} />
        <PodiumStep op={third} rank={2} />
      </div>

      {animeVote === false && (
        <div className={t.notice} data-tone="rec" style={{ textAlign: 'left', marginBottom: 0, maxWidth: '34rem' }}>
          <p className={`${s.display} ${t.noticeTitle}`}>Il te reste l’animé de {year}</p>
          <p className={t.noticeText}>Les openings et les animés se votent séparément. Celui-ci n’est pas encore fait.</p>
          <div className={t.keys}>
            <Link href={`/anime/${year}`} className={t.key} data-on="1">
              Voter l’animé {year} ▶
            </Link>
          </div>
        </div>
      )}

      <div className={t.podiumActions}>
        {suivante ? (
          <Link href={`/opening/${suivante}`} className={t.key} data-on={animeVote === false ? undefined : '1'}>
            Openings {suivante} ▶
          </Link>
        ) : (
          <Link href={`/anime/${year}`} className={t.key} data-on="1">
            Voter l’animé {year} ▶
          </Link>
        )}
        <Link href="/mes-votes" className={t.key}>Le récap de mes votes</Link>
      </div>
    </div>
  );
}

function PodiumStep({ op, rank }: { op?: Opening; rank: number }) {
  if (!op) return null;
  return (
    <div className={WIDTH[rank]}>
      <p className={`${s.display} ${t.stepNo}`}>{RANG[rank]}</p>
      <div
        className={`${t.thumb} ${t.coverOpening}`}
        style={{
          borderColor: 'var(--neon)',
          boxShadow: rank === 0 ? '0 0 0 2px var(--neon), 0 0 40px rgba(0,255,204,0.3)' : undefined,
        }}
      >
        <Image src={op.image} alt="" fill sizes="(max-width: 640px) 40vw, 220px" />
      </div>
      <p className={`${s.display} ${t.podiumName}`}>{op.animeName}</p>
      <p className={`${s.osd} ${s.tapeTitle}`}>{op.openingTitle}</p>
      <p className={`${s.osd} ${s.tapeMeta}`}>{PODIUM_POINTS[rank]} pts</p>
    </div>
  );
}
