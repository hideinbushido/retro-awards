'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { Roll } from './Letters';
import s from './home.module.css';

export type RewindYear = {
  year: number;
  openings: number;
  animes: number;
  covers: { src: string; alt: string }[];
};

/** L'éventail des trois affiches dans le poste. */
const POSES = [
  { '--i': 0, '--r': '-9deg', '--y': '4%' },
  { '--i': 1, '--r': '0deg', '--y': '-2%' },
  { '--i': 2, '--r': '9deg', '--y': '4%' },
] as unknown as CSSProperties[];

/** Temps passé sur chaque année quand la bande défile toute seule. */
const PAS = 2400;

const CALME = '(prefers-reduced-motion: reduce)';
function ecouterCalme(onChange: () => void) {
  const media = window.matchMedia(CALME);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

/**
 * Le rembobinage : la bande remonte toute seule de la dernière année à la
 * première, en coupe franche. Le scroll ne commande rien ici : on traverse la
 * section librement, et on prend la main avec les touches ou la frise.
 */
export default function Rewind({ years }: { years: RewindYear[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLVideoElement>(null);
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const calme = useSyncExternalStore(ecouterCalme, () => window.matchMedia(CALME).matches, () => false);
  const defile = auto && visible && !calme;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!defile) return;
    const minuterie = setInterval(() => setIdx((i) => (i + 1) % years.length), PAS);
    return () => clearInterval(minuterie);
  }, [defile, years.length]);

  // L'horloge ne remonte le temps que pendant que la bande défile
  useEffect(() => {
    const horloge = clockRef.current;
    if (!horloge) return;
    if (defile) horloge.play().catch(() => {});
    else horloge.pause();
  }, [defile]);

  // Sur téléphone la frise déborde : l'année en cours reste en vue
  useEffect(() => {
    const rail = railRef.current;
    const bouton = rail?.children[idx] as HTMLElement | undefined;
    if (!rail || !bouton) return;
    rail.scrollTo({ left: bouton.offsetLeft - rail.clientWidth / 2 + bouton.clientWidth / 2 });
  }, [idx]);

  /** Dès que le visiteur choisit une année, la bande cesse de défiler seule. */
  const choisir = (i: number) => {
    setAuto(false);
    setIdx((i + years.length) % years.length);
  };

  const actif = years[idx];

  return (
    <section ref={sectionRef} className={s.rewind} aria-label="Les années, de la plus récente à la plus ancienne">
      <div className={s.rewindStage}>
        <video
          ref={clockRef}
          className={s.clock}
          src="/timetravel.mp4"
          poster="/home/clock.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className={`${s.osd} ${s.rewindTop}`}>
          <div className={s.transport}>
            <button type="button" onClick={() => choisir(idx + 1)} aria-label="Année précédente">
              ◀◀ <Roll text="REW" />
            </button>
            <button type="button" onClick={() => setAuto((v) => !v)} aria-label={auto ? 'Mettre en pause' : 'Relancer le défilement'}>
              {auto ? '❙❙' : '▶'} <Roll text={auto ? 'Pause' : 'Play'} />
            </button>
            <button type="button" onClick={() => choisir(idx - 1)} aria-label="Année suivante">
              <Roll text="FF" /> ▶▶
            </button>
          </div>
          <span className={s.reels} data-on={defile ? '1' : undefined} aria-hidden="true">
            <span className={s.reel} />
            <span className={s.reel} />
          </span>
        </div>

        <div className={s.rewindBody}>
          <div className={s.rewindInfo}>
            <p key={actif.year} className={`${s.display} ${s.rewindYear}`} aria-live={auto ? 'off' : 'polite'}>
              {actif.year}
            </p>
            <p className={`${s.osd} ${s.rewindCounts}`}>
              <b>{actif.openings}</b> openings · <b>{actif.animes}</b> animés en lice
            </p>
          </div>

          <Link href={`/nomines/${actif.year}`} className={s.tv} aria-label={`Voir les nominés de ${actif.year}`}>
            {/* L'année en cours et ses deux voisines sont déjà chargées : la coupe est nette */}
            {years.map((y, i) => {
              const ecart = Math.abs(i - idx);
              if (ecart > 1 && ecart < years.length - 1) return null;
              return (
                <div key={y.year} className={s.tvLayer} data-on={i === idx ? '1' : undefined}>
                  {y.covers.map((c, k) => (
                    <div key={c.src} className={s.cover} style={POSES[k]}>
                      <Image src={c.src} alt={i === idx ? c.alt : ''} fill sizes="(max-width: 899px) 30vw, 220px" loading="eager" />
                    </div>
                  ))}
                </div>
              );
            })}
            <div className={s.tvGlass} />
            <div key={actif.year} className={s.tvCut} />
            <span className={`${s.osd} ${s.tvLabel}`}>
              <Roll text={`Voir ${actif.year} ▶`} />
            </span>
          </Link>
        </div>

        <div ref={railRef} className={s.rail}>
          {years.map((y, i) => (
            <button
              key={y.year}
              type="button"
              className={`${s.osd} ${s.railBtn}`}
              data-on={i === idx ? '1' : undefined}
              aria-current={i === idx ? 'true' : undefined}
              aria-label={`Afficher ${y.year}`}
              onClick={() => choisir(i)}
            >
              {y.year}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
