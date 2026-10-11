import Link from 'next/link';
import Image from 'next/image';
import type { CSSProperties } from 'react';
import Comments from '@/components/Comments';
import { PRESENTERS } from '@/components/Presenters';
import { TikTokIcon } from '@/components/icons';
import Vcr from '@/components/home/Vcr';
import Rewind, { type RewindYear } from '@/components/home/Rewind';
import Antenne from '@/components/home/Antenne';
import InView from '@/components/home/InView';
import LoopVideo from '@/components/home/LoopVideo';
import { Rise, Roll } from '@/components/home/Letters';
import { display, osd } from '@/components/home/fonts';
import s from '@/components/home/home.module.css';
import { nominees } from '@/data/nominees';
import { FIN_DES_VOTES_COURT } from '@/lib/event';

/** De la plus récente à la plus ancienne : c'est le sens du rembobinage. */
const YEARS: RewindYear[] = Object.keys(nominees)
  .map(Number)
  .sort((a, b) => b - a)
  .map((year) => ({
    year,
    openings: nominees[year].openings.length,
    animes: nominees[year].animes.length,
    covers: nominees[year].animes.slice(0, 3).map((a) => ({ src: a.image, alt: a.name })),
  }));

const TOTAL_OPENINGS = YEARS.reduce((n, y) => n + y.openings, 0);
const TOTAL_ANIMES = YEARS.reduce((n, y) => n + y.animes, 0);
const PREMIERE = YEARS[YEARS.length - 1].year;
const DERNIERE = YEARS[0].year;

const BANDEAU = ['Openings', 'Animés', `${PREMIERE} — ${DERNIERE}`, 'Zenkai hors-série', `Votes jusqu’au ${FIN_DES_VOTES_COURT}`];

const CATEGORIES = [
  { href: `/nomines/${DERNIERE}#openings`, titre: 'Openings', video: '/home/opening', total: TOTAL_OPENINGS, face: 'Face A' },
  { href: `/nomines/${DERNIERE}#animes`, titre: 'Animés', video: '/home/anime', total: TOTAL_ANIMES, face: 'Face B' },
];

const rang = (i: number) => ({ '--i': i }) as CSSProperties;

function Bandeau({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={`${s.marqueeTrack} ${inverse ? s.marqueeAlt : ''}`}>
      {/* Deux fois la même suite : la boucle se referme sans à-coup */}
      {[0, 1].map((copie) => (
        <div key={copie} className={s.marqueeGroup} aria-hidden={copie === 1}>
          {[...BANDEAU, ...BANDEAU].map((mot, i) => (
            <span key={i} className={`${s.display} ${s.marqueeItem}`}>
              {mot} <span className={s.marqueeSep}>●</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div className={`${s.root} ${display.variable} ${osd.variable}`}>
      <Vcr />
      <main>
        {/* ── Mise sous tension ── */}
        <section className={s.hero}>
          <LoopVideo className={s.heroVideo} src="/home/hero.mp4" poster="/home/hero.jpg" />
          <div className={s.heroScrim} />
          <div className={s.powerOn} aria-hidden="true" />

          <p className={`${s.osd} ${s.heroCorner} ${s.heroCornerTL}`} aria-hidden="true">
            SP · CH 03
          </p>
          <p className={`${s.osd} ${s.heroCorner} ${s.heroCornerTR}`} aria-hidden="true">
            F2.8 · 1/50 · ISO 400
          </p>

          <InView className={s.heroInner}>
            <div className={s.heroMeta}>
              <p>
                <strong>Zenkai hors-série</strong>
                <span>Openings &amp; animés</span>
              </p>
              <p>
                <strong>{PREMIERE} — {DERNIERE}</strong>
                <span>{YEARS.length} années à départager</span>
              </p>
            </div>

            <h1 className={`${s.display} ${s.heroTitle}`}>
              <span><Rise text="Retro" /></span>
              <span><Rise text="Awards" /></span>
            </h1>

            <div className={s.heroActions}>
              {/* Le vote d'abord : des visiteurs repartaient sans avoir trouvé où voter */}
              <Link href="/voter" className={`${s.display} ${s.cta}`}>
                <Roll text="Voter maintenant" /> <span aria-hidden="true">▶</span>
              </Link>
              <Link href="/carrousel" className={`${s.osd} ${s.textLink}`}>
                <Roll text="Entrer dans le carrousel" />
              </Link>
            </div>
          </InView>
        </section>

        <div className={s.marquee}>
          <Bandeau />
          <Bandeau inverse />
        </div>

        {/* ── Le principe ── */}
        <section className={s.section}>
          <InView className={s.principeGrid}>
            <div>
              <p className={`${s.osd} ${s.kicker}`}>Le principe</p>
              <h2 className={`${s.display} ${s.statement}`}>
                <Rise text="Une année, deux votes." /> <em><Rise text="Tu rembobines." /></em>
              </h2>
            </div>
            <div className={s.settle} style={rang(4)}>
              <p className={s.principeText}>
                Pour chaque année, de {DERNIERE} jusqu’à {PREMIERE}, tu choisis le meilleur opening et le meilleur
                animé. Les résultats sont annoncés en live par Zenkai.
              </p>
              <div className={s.stats}>
                {[
                  { n: YEARS.length, label: 'années' },
                  { n: TOTAL_OPENINGS, label: 'openings' },
                  { n: TOTAL_ANIMES, label: 'animés' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className={`${s.display} ${s.statNum}`}>{stat.n}</p>
                    <p className={`${s.osd} ${s.statLabel}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </InView>
        </section>

        <Rewind years={YEARS} />

        {/* ── Deux catégories ── */}
        <section className={s.section}>
          <InView>
            <p className={`${s.osd} ${s.kicker}`}>Deux catégories</p>
            <h2 className={`${s.display} ${s.statement}`}>
              <Rise text="Choisis ta face" />
            </h2>
            <div className={s.cats}>
              {CATEGORIES.map((c, i) => (
                <div key={c.titre} className={s.settle} style={rang(i + 2)}>
                  <Link href={c.href} className={s.cassette}>
                    <div className={s.cassetteStripes} />
                    <p className={`${s.display} ${s.cassetteTitle}`}>
                      <Roll text={c.titre} />
                    </p>
                    <div className={s.cassetteWindow}>
                      <LoopVideo src={`${c.video}.mp4`} poster={`${c.video}.jpg`} />
                    </div>
                    <p className={`${s.osd} ${s.cassetteFoot}`}>
                      <span>
                        <b>{c.total}</b> nominés
                      </span>
                      <span>{c.face} ▶</span>
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </InView>
        </section>

        {/* ── Les voix ── */}
        <section id="presentateurs" className={s.section} style={{ paddingTop: 0 }}>
          <InView>
            <p className={`${s.osd} ${s.kicker}`}>Présentateurs</p>
            <h2 className={`${s.display} ${s.statement}`}>
              <Rise text="Les voix du live" />
            </h2>
            <div className={s.voices}>
              {PRESENTERS.map((p, i) => (
                <article key={p.name} className={s.settle} style={rang(i + 2)}>
                  <div className={s.finder}>
                    <Image
                      src={p.photo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 700px) 92vw, 480px"
                      style={{ objectPosition: p.objectPosition }}
                    />
                    <div className={`${s.osd} ${s.finderHud}`}>
                      <div className={s.finderRow} aria-hidden="true">
                        <span>
                          <span className={s.recDot} />REC
                        </span>
                        <span>CAM {i + 1}</span>
                      </div>
                      <div>
                        <p className={`${s.display} ${s.finderName}`}>{p.name}</p>
                        <p>{p.realName}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`${s.osd} ${s.finderLinks}`}>
                    {p.tiktoks.map((handle) => (
                      <a key={handle} href={`https://www.tiktok.com/@${handle}`} target="_blank" rel="noopener noreferrer">
                        <TikTokIcon /> <Roll text={`@${handle}`} />
                      </a>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </InView>
        </section>

        <Antenne />

        <section className={s.wall} style={{ paddingTop: 'clamp(56px, 9vh, 110px)' }}>
          <Comments scope="accueil" title="Le mur des Retro Awards" />
        </section>

        {/* ── Fin de bande ── */}
        <section className={s.end}>
          <InView>
            <p className={`${s.osd} ${s.kicker}`}>⏏ Fin de bande</p>
            <h2 className={`${s.display} ${s.endTitle}`}>
              <Rise text="À toi de jouer" />
            </h2>
          </InView>
          <p className={s.endSub}>
            {YEARS.length} années, deux votes par année. Ta sélection compte jusqu’au dernier jour.
          </p>
          <Link href="/voter" className={`${s.display} ${s.cta}`}>
            <Roll text="Voter maintenant" /> <span aria-hidden="true">▶</span>
          </Link>
        </section>
      </main>
    </div>
  );
}
