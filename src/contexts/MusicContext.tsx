'use client';

import { createContext, useContext, useRef, useCallback, useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

type MusicCtx = {
  pauseForOpening: () => void;
  resumeFromOpening: () => void;
};

const MusicContext = createContext<MusicCtx>({
  pauseForOpening: () => {},
  resumeFromOpening: () => {},
});

export function useMusicContext() {
  return useContext(MusicContext);
}

const HINT_SEEN_KEY = 'retro_music_hint_seen';

export function MusicProvider({ src, children }: { src: string; children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  // true = une ouverture a mis en pause, ne pas reprendre si user a coupé manuellement
  const externalPaused = useRef(false);
  const userStopped = useRef(false);

  function dismissHint() {
    setShowHint(false);
    localStorage.setItem(HINT_SEEN_KEY, '1');
  }

  // Bulle d'aide "tu peux couper la musique" — une seule fois, à la première lecture
  function maybeShowHint() {
    if (localStorage.getItem(HINT_SEEN_KEY)) return;
    setShowHint(true);
    setTimeout(() => dismissHint(), 6000);
  }

  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = 0.25;
    audio.loop = true;
    audioRef.current = audio;
    // Délai pour ne pas bloquer le premier rendu de la page
    const t = setTimeout(() => {
      audio.play()
        .then(() => { setPlaying(true); maybeShowHint(); })
        .catch(() => setBlocked(true));
    }, 1000);
    return () => { clearTimeout(t); audio.pause(); audio.src = ''; };
  }, [src]);

  const pauseForOpening = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userStopped.current || externalPaused.current) return;
    externalPaused.current = true;
    audio.pause();
    setPlaying(false);
  }, []);

  const resumeFromOpening = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userStopped.current || !externalPaused.current) return;
    externalPaused.current = false;
    audio.play().then(() => setPlaying(true)).catch(() => {});
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      dismissHint();
      userStopped.current = true;
      externalPaused.current = false;
      audio.pause();
      setPlaying(false);
    } else {
      userStopped.current = false;
      audio.play()
        .then(() => { setPlaying(true); setBlocked(false); maybeShowHint(); })
        .catch(() => setBlocked(true));
    }
  }

  return (
    <MusicContext.Provider value={{ pauseForOpening, resumeFromOpening }}>
      {children}
      {/* Positionné en haut (pas en bas) pour ne pas cacher la timeline des années du carousel */}
      <button
        onClick={toggle}
        title={playing ? 'Couper la musique' : 'Jouer la musique'}
        className="fixed top-20 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center btn-neon"
      >
        {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
      {blocked && (
        <div
          className="fixed top-32 right-5 z-50 text-xs px-3 py-1.5 rounded max-w-[200px] text-right"
          style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--sepia-dim)' }}
        >
          ♪ Cliquer pour la musique
        </div>
      )}
      {showHint && !blocked && (
        <div
          className="fixed top-32 right-5 z-50 text-xs px-3 py-1.5 rounded max-w-[200px] text-right"
          style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--sepia-dim)' }}
        >
          ♪ Clique sur l&apos;icône pour couper la musique
        </div>
      )}
    </MusicContext.Provider>
  );
}
