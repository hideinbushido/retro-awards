'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Opening } from '@/data/nominees';
import { useMusicContext } from '@/contexts/MusicContext';
import s from './home.module.css';

/**
 * Les openings d'une année, à écouter. On lance une cassette en touchant sa
 * jaquette ; la suivante s'enchaîne toute seule, et la platine du bas garde
 * la main sur la lecture. Rien ici ne touche au vote.
 */
export default function OpeningDeck({ openings }: { openings: Opening[] }) {
  const [current, setCurrent] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<number | null>(null);
  const { pauseForOpening, resumeFromOpening } = useMusicContext();

  /** Appelé dans le geste du visiteur : les téléphones refusent une lecture lancée plus tard. */
  const jouer = useCallback(
    (i: number) => {
      const audio = audioRef.current;
      const op = openings[i];
      if (!audio || !op) return;
      pauseForOpening();
      audio.src = op.audio;
      audio.play().catch(() => {});
      currentRef.current = i;
      setCurrent(i);
    },
    [openings, pauseForOpening],
  );

  const arreter = useCallback(() => {
    audioRef.current?.pause();
    currentRef.current = null;
    setCurrent(null);
    resumeFromOpening();
  }, [resumeFromOpening]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audio.volume = 0.8;
    audioRef.current = audio;

    const avance = () => {
      if (barRef.current && audio.duration) barRef.current.style.transform = `scaleX(${audio.currentTime / audio.duration})`;
    };
    const lecture = () => setPlaying(true);
    const pause = () => setPlaying(false);
    const fin = () => {
      const suivant = (currentRef.current ?? -1) + 1;
      if (suivant < openings.length) jouer(suivant);
      else arreter();
    };
    audio.addEventListener('timeupdate', avance);
    audio.addEventListener('play', lecture);
    audio.addEventListener('pause', pause);
    audio.addEventListener('ended', fin);
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', avance);
      audio.removeEventListener('play', lecture);
      audio.removeEventListener('pause', pause);
      audio.removeEventListener('ended', fin);
      audio.src = '';
      resumeFromOpening();
    };
  }, [openings.length, jouer, arreter, resumeFromOpening]);

  const basculer = (i: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (current !== i) jouer(i);
    else if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  };

  const enCours = current === null ? null : openings[current];

  return (
    <>
      <div className={s.tapes}>
        {openings.map((op, i) => {
          const actif = current === i;
          return (
            <button
              key={op.id}
              type="button"
              className={s.tapeCard}
              data-on={actif ? '1' : undefined}
              aria-pressed={actif && playing}
              aria-label={`${actif && playing ? 'Mettre en pause' : 'Écouter'} ${op.animeName}, ${op.openingTitle}`}
              onClick={() => basculer(i)}
            >
              <span className={s.tapeCover}>
                <Image src={op.image} alt="" fill sizes="(max-width: 640px) 46vw, (max-width: 1100px) 30vw, 260px" />
                <span className={`${s.osd} ${s.tapeState}`} aria-hidden="true">
                  {actif && playing ? (
                    <span className={s.eq}>
                      <i /><i /><i /><i />
                    </span>
                  ) : (
                    <span>{actif ? '❙❙ PAUSE' : '▶ PLAY'}</span>
                  )}
                </span>
              </span>
              <span className={`${s.display} ${s.tapeName}`}>{op.animeName}</span>
              <span className={`${s.osd} ${s.tapeTitle}`}>{op.openingTitle}</span>
              <span className={`${s.osd} ${s.tapeMeta}`}>
                {[op.artist, op.op && op.op > 1 ? `Opening ${op.op}` : 'Opening'].filter(Boolean).join(' · ')}
              </span>
            </button>
          );
        })}
      </div>

      {enCours && current !== null && (
        <div className={s.deck} role="region" aria-label="Lecture en cours">
          <div className={s.deckBar}>
            <div ref={barRef} className={s.deckFill} />
          </div>
          <div className={s.deckInner}>
            <span className={s.deckThumb}>
              <Image src={enCours.image} alt="" fill sizes="48px" />
            </span>
            <p className={s.deckText}>
              <span className={`${s.display} ${s.deckName}`}>{enCours.animeName}</span>
              <span className={`${s.osd} ${s.deckTitle}`}>
                {enCours.openingTitle}
                {enCours.artist ? ` · ${enCours.artist}` : ''}
              </span>
            </p>
            <div className={`${s.osd} ${s.deckKeys}`}>
              <button type="button" onClick={() => jouer((current - 1 + openings.length) % openings.length)} aria-label="Opening précédent">
                ◀◀
              </button>
              <button type="button" onClick={() => basculer(current)} aria-label={playing ? 'Pause' : 'Lecture'}>
                {playing ? '❙❙' : '▶'}
              </button>
              <button type="button" onClick={() => jouer((current + 1) % openings.length)} aria-label="Opening suivant">
                ▶▶
              </button>
              <button type="button" onClick={arreter} aria-label="Arrêter">
                ■
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
