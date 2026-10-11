import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Vcr from '@/components/home/Vcr';
import InView from '@/components/home/InView';
import OpeningDeck from '@/components/home/OpeningDeck';
import LoopVideo from '@/components/home/LoopVideo';
import { Rise, Roll } from '@/components/home/Letters';
import { display, osd } from '@/components/home/fonts';
import s from '@/components/home/home.module.css';
import { YEARS } from '@/lib/firestore';
import { nominees } from '@/data/nominees';

type Props = { params: Promise<{ year: string }> };

export async function generateStaticParams() {
  return YEARS.map((y) => ({ year: String(y) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  return { title: `Nominés ${year} — RETRO Awards` };
}

const rang = (i: number) => ({ '--i': i }) as CSSProperties;

/**
 * La galerie d'une année : on regarde les nominés et on écoute les openings,
 * sans rien voter. Le vote garde ses propres pages, vers lesquelles on renvoie
 * en bas.
 */
export default async function NominesYearPage({ params }: Props) {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
  if (!YEARS.includes(year)) notFound();

  const idx = YEARS.indexOf(year);
  // YEARS va de la plus récente à la plus ancienne
  const plusRecente = YEARS[idx - 1] ?? null;
  const plusAncienne = YEARS[idx + 1] ?? null;
  const { openings, animes } = nominees[year] ?? { openings: [], animes: [] };

  return (
    <div className={`${s.root} ${display.variable} ${osd.variable}`}>
      <Vcr />
      <main>
        {/* ── L'année ── */}
        <section className={s.yearHead}>
          <LoopVideo className={s.clock} src="/timetravel.mp4" poster="/home/clock.jpg" />
          <InView>
            <p className={`${s.osd} ${s.kicker}`}>
              <span className={s.recDot} />Les nominés
            </p>
            <h1 className={`${s.display} ${s.yearBig}`}>
              <Rise text={String(year)} />
            </h1>
            <p className={`${s.osd} ${s.rewindCounts}`}>
              <b>{openings.length}</b> openings · <b>{animes.length}</b> animés en lice
            </p>
          </InView>

          <nav className={`${s.osd} ${s.yearNav}`} aria-label="Changer d’année">
            {plusAncienne ? (
              <Link href={`/nomines/${plusAncienne}`}>
                ◀◀ <Roll text={`REW ${plusAncienne}`} />
              </Link>
            ) : (
              <span />
            )}
            <span className={s.yearNavJump}>
              <a href="#openings"><Roll text="Face A · Openings" /></a>
              <a href="#animes"><Roll text="Face B · Animés" /></a>
            </span>
            {plusRecente ? (
              <Link href={`/nomines/${plusRecente}`}>
                <Roll text={`FF ${plusRecente}`} /> ▶▶
              </Link>
            ) : (
              <span />
            )}
          </nav>

          <div className={s.rail}>
            {YEARS.map((y) => (
              <Link
                key={y}
                href={`/nomines/${y}`}
                className={`${s.osd} ${s.railBtn}`}
                data-on={y === year ? '1' : undefined}
                aria-current={y === year ? 'page' : undefined}
              >
                {y}
              </Link>
            ))}
          </div>
        </section>

        {/* ── Face A : les openings ── */}
        <section id="openings" className={`${s.section} ${s.face}`}>
          <InView>
            <p className={`${s.osd} ${s.kicker}`}>Face A</p>
            <h2 className={`${s.display} ${s.statement}`}>
              <Rise text="Les openings" />
            </h2>
            <p className={s.faceHint}>Touche une jaquette pour lancer l’écoute. Les suivantes s’enchaînent.</p>
          </InView>
          {openings.length === 0 ? (
            <p className={`${s.osd} ${s.faceEmpty}`}>Aucun opening nominé pour {year}.</p>
          ) : (
            <OpeningDeck openings={openings} />
          )}
        </section>

        {/* ── Face B : les animés ── */}
        <section id="animes" className={`${s.section} ${s.face}`} style={{ background: 'var(--bg2)' }}>
          <InView>
            <p className={`${s.osd} ${s.kicker}`}>Face B</p>
            <h2 className={`${s.display} ${s.statement}`}>
              <Rise text="Les animés" />
            </h2>
          </InView>
          {animes.length === 0 ? (
            <p className={`${s.osd} ${s.faceEmpty}`}>Aucun animé nominé pour {year}.</p>
          ) : (
            <InView className={s.posters}>
              {animes.map((anime, i) => (
                <article key={anime.id} className={`${s.poster} ${s.settle}`} style={rang(Math.min(i, 8))}>
                  <div className={s.posterImg}>
                    {/* cadre 2:3 = le ratio de la plupart des jaquettes ; le bas reste visible */}
                    <Image
                      src={anime.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 46vw, (max-width: 1100px) 30vw, 260px"
                      style={{ objectPosition: '50% 75%' }}
                    />
                  </div>
                  <h3 className={`${s.display} ${s.tapeName}`}>{anime.name}</h3>
                  {anime.season && <p className={`${s.osd} ${s.tapeTitle}`}>{anime.season}</p>}
                  {(anime.studio || anime.author) && (
                    <p className={`${s.osd} ${s.tapeMeta}`}>{[anime.studio, anime.author].filter(Boolean).join(' · ')}</p>
                  )}
                </article>
              ))}
            </InView>
          )}
        </section>

        {/* ── Fin de bande ── */}
        <section className={s.end}>
          <InView>
            <p className={`${s.osd} ${s.kicker}`}>⏏ Fin de bande</p>
            <h2 className={`${s.display} ${s.endTitle}`}>
              <Rise text="Ton choix est fait ?" />
            </h2>
          </InView>
          <div className={s.heroActions}>
            <Link href={`/opening/${year}`} className={`${s.display} ${s.cta}`}>
              <Roll text={`Voter les openings ${year}`} /> <span aria-hidden="true">▶</span>
            </Link>
            <Link href={`/anime/${year}`} className={`${s.display} ${s.cta}`}>
              <Roll text={`Voter l’animé ${year}`} /> <span aria-hidden="true">▶</span>
            </Link>
          </div>
          {plusAncienne && (
            <Link href={`/nomines/${plusAncienne}`} className={`${s.osd} ${s.textLink}`}>
              ◀◀ <Roll text={`Rembobiner jusqu’à ${plusAncienne}`} />
            </Link>
          )}
        </section>
      </main>
    </div>
  );
}
