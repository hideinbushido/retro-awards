'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import TapePage from '@/components/tape/TapePage';
import InView from '@/components/home/InView';
import { Rise, Roll } from '@/components/home/Letters';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';
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

  const etapes = [
    { titre: 'Choisis une année', texte: 'De 2005 à 2019, dans l’ordre que tu veux.' },
    {
      titre: 'Vote',
      texte: `Un animé par année, et un podium de 3 openings : ${PODIUM_POINTS[0]}, ${PODIUM_POINTS[1]} et ${PODIUM_POINTS[2]} points.`,
    },
    { titre: 'Pseudo et mail', texte: 'Demandés une seule fois, au premier vote.' },
  ];

  return (
    <TapePage>
      <header className={t.head}>
        <InView>
          <p className={`${s.osd} ${s.kicker}`}>
            <span className={s.recDot} />
            {clos ? 'Votes clos' : `Ouvert jusqu’au ${FIN_DES_VOTES_TEXTE} inclus`}
          </p>
          <h1 className={`${s.display} ${t.title}`}>
            <Rise text="Voter" />
          </h1>
          <p className={t.lede}>
            {clos
              ? 'Les votes sont clos. Tu peux encore revoir les nominés de chaque année.'
              : 'Deux minutes par année. Tu reprends où tu veux, ce qui est fait reste fait.'}
          </p>
        </InView>
        <ol className={t.steps}>
          {etapes.map((etape, i) => (
            <li key={etape.titre} className={t.step}>
              <span className={`${s.display} ${t.stepNum}`}>{i + 1}</span>
              <span className={`${s.osd} ${t.stepTitle}`}>{etape.titre}</span>
              <span className={t.stepText}>{etape.texte}</span>
            </li>
          ))}
        </ol>
      </header>

      <section className={t.body}>
        {animesOublies.length > 0 && !clos && (
          <div className={t.notice} data-tone="rec">
            <p className={`${s.display} ${t.noticeTitle}`}>
              Il te manque {animesOublies.length} animé{animesOublies.length > 1 ? 's' : ''}
            </p>
            <p className={t.noticeText}>
              Tu as classé les openings de <b>{animesOublies.map((a) => a.year).join(', ')}</b> sans voter l’animé de ces années.
            </p>
            <div className={t.keys}>
              <Link href={`/anime/${animesOublies[0].year}`} className={t.key} data-on="1">
                Voter l’animé {animesOublies[0].year} ▶
              </Link>
            </div>
          </div>
        )}

        {openingsOublies.length > 0 && !clos && (
          <div className={t.notice}>
            <p className={t.noticeText}>
              Il te manque aussi {openingsOublies.length} podium{openingsOublies.length > 1 ? 's' : ''} d’openings :{' '}
              <b>{openingsOublies.map((a) => a.year).join(', ')}</b>.
            </p>
          </div>
        )}

        {total > 0 && (
          <p className={`${s.osd} ${t.empty}`} style={{ paddingTop: 0 }}>
            <span style={{ color: 'var(--neon)' }}>{total}</span> bulletin{total > 1 ? 's' : ''} rempli{total > 1 ? 's' : ''} sur {YEARS.length * 2} ·{' '}
            <Link href="/mes-votes" className={s.textLink}>
              <Roll text="Voir mes votes" />
            </Link>
          </p>
        )}

        {/* Une porte par année */}
        <div className={t.rows}>
          {YEARS.map((year) => {
            const ops = fait(year, 'openings');
            const ani = fait(year, 'anime');
            return (
              <div key={year} className={t.row} data-done={ops && ani ? '1' : undefined}>
                <span className={`${s.display} ${t.rowYear}`}>{year}</span>
                <div className={t.keys}>
                  <Link href={`/opening/${year}`} className={t.key} data-on={ops ? '1' : undefined}>
                    {ops ? '✓' : '▶'} Openings
                  </Link>
                  <Link href={`/anime/${year}`} className={t.key} data-on={ani ? '1' : undefined}>
                    {ani ? '✓' : '▶'} Animé
                  </Link>
                </div>
                <div className={t.rowSide}>
                  <Link href={`/nomines/${year}`} className={`${s.osd} ${t.rowLink}`}>
                    <Roll text="Nominés" />
                  </Link>
                  <Link href={`/annee/${year}#commentaires`} className={`${s.osd} ${t.rowLink}`}>
                    <Roll text="Commentaires" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </TapePage>
  );
}
