'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Roll } from './Letters';
import s from './home.module.css';

const LIENS = [
  { href: '/nomines', label: 'Nominés' },
  { href: '/voter', label: 'Voter', main: true },
  { href: '/mes-votes', label: 'Mes votes' },
  { href: '/resultats', label: 'Résultats' },
  { href: '/admin', label: 'Admin' },
];

const MODES = {
  rec: 'REC',
  play: '▶ PLAY',
  ff: '▶▶ FF',
  rew: '◀◀ REW',
  pause: '❙❙ PAUSE',
  stop: '■ STOP',
} as const;
type Mode = keyof typeof MODES;

/** Durée fictive de la bande : une minute par année en lice. */
const DUREE_BANDE = 15 * 60;

const deux = (n: number) => String(n).padStart(2, '0');

/**
 * L'affichage du magnétoscope, qui tient lieu de barre de navigation sur
 * l'accueil. Le scroll est la tête de lecture : le mode, le compteur et la
 * bande en bas d'écran le suivent, et l'image décroche quand on va trop vite.
 */
export default function Vcr() {
  const [open, setOpen] = useState(false);
  const modeRef = useRef<HTMLSpanElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const trackingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let decrochage = 0;
    let mode: Mode | null = null;
    let modeDepuis = 0;
    let compteur = '';

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0;
      const vitesse = (y - lastY) / Math.max(t - lastT, 1); // px par ms
      lastY = y;
      lastT = t;

      if (fillRef.current) fillRef.current.style.transform = `scaleX(${p})`;

      const secondes = Math.round(p * DUREE_BANDE);
      const texte = `0:${deux(Math.floor(secondes / 60))}:${deux(secondes % 60)}`;
      if (texte !== compteur && counterRef.current) {
        compteur = texte;
        counterRef.current.textContent = texte;
      }

      let voulu: Mode;
      if (Math.abs(vitesse) < 0.02) voulu = p < 0.004 ? 'rec' : p > 0.996 ? 'stop' : 'pause';
      else if (vitesse < 0) voulu = 'rew';
      else voulu = vitesse > 2.4 ? 'ff' : 'play';
      // Un mode tient au moins un quart de seconde, sinon l'affichage clignote
      if (voulu !== mode && t - modeDepuis > 250 && modeRef.current) {
        mode = voulu;
        modeDepuis = t;
        modeRef.current.dataset.mode = voulu;
        modeRef.current.lastChild!.textContent = MODES[voulu];
      }

      if (!calme && trackingRef.current) {
        const cible = Math.min(Math.abs(vitesse) / 5, 1);
        decrochage += (cible - decrochage) * 0.12;
        const visible = decrochage < 0.02 ? 0 : decrochage;
        trackingRef.current.style.opacity = String(visible * 0.75);
        trackingRef.current.style.transform = `translateY(${(Math.sin(t / 37) * 14 * visible).toFixed(1)}px)`;
      }
    };
    raf = requestAnimationFrame(tick);

    const heure = () => {
      if (!clockRef.current) return;
      const d = new Date();
      const date = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
      clockRef.current.textContent = `${d.toLocaleTimeString('fr-FR')} · ${date.replace('.', '')}`;
    };
    heure();
    const horloge = setInterval(heure, 1000);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(horloge);
    };
  }, []);

  return (
    <>
      <header className={s.vcr}>
        <Link href="/" className={s.vcrBrand} aria-label="Retro Awards, accueil">
          <Image src="/logo-zenkai.png" alt="" width={30} height={30} priority />
          <Image src="/logo-mark.png" alt="" width={36} height={32} priority />
        </Link>

        <span ref={modeRef} className={`${s.osd} ${s.vcrMode}`} data-mode="rec" aria-hidden="true">
          <span className={s.recDot} />
          <span>{MODES.rec}</span>
        </span>

        <nav className={`${s.osd} ${s.vcrNav}`} aria-label="Navigation principale">
          {LIENS.map((l) => (
            <Link key={l.href} href={l.href} data-main={l.main || undefined}>
              <Roll text={l.label} />
            </Link>
          ))}
        </nav>

        <div className={`${s.osd} ${s.vcrRight}`}>
          <span ref={clockRef} className={s.vcrClock} aria-hidden="true">--:--:--</span>
          <span ref={counterRef} className={s.vcrCounter} aria-hidden="true">0:00:00</span>
          <button
            type="button"
            className={s.vcrBurger}
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {open && (
        <nav className={`${s.display} ${s.vcrMenu}`} aria-label="Menu">
          {LIENS.map((l) => (
            <Link key={l.href} href={l.href} data-main={l.main || undefined} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}

      <div ref={trackingRef} className={s.tracking} aria-hidden="true" />
      <div className={s.tape} aria-hidden="true">
        <div ref={fillRef} className={s.tapeFill} />
      </div>
    </>
  );
}
