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

export function MusicProvider({ src, children }: { src: string; children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  // true = une ouverture a mis en pause, ne pas reprendre si user a coupé manuellement
  const externalPaused = useRef(false);
  const userStopped = useRef(false);

  useEffect(() => {
    const audio = new Audio(src);
    audio.volume = 0.25;
    audio.loop = true;
    audioRef.current = audio;
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => setBlocked(true));
    return () => { audio.pause(); audio.src = ''; };
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
      userStopped.current = true;
      externalPaused.current = false;
      audio.pause();
      setPlaying(false);
    } else {
      userStopped.current = false;
      audio.play()
        .then(() => { setPlaying(true); setBlocked(false); })
        .catch(() => setBlocked(true));
    }
  }

  return (
    <MusicContext.Provider value={{ pauseForOpening, resumeFromOpening }}>
      {children}
      <button
        onClick={toggle}
        title={playing ? 'Couper la musique' : 'Jouer la musique'}
        className="fixed bottom-5 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center btn-neon"
      >
        {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
      {blocked && (
        <div
          className="fixed bottom-16 right-5 z-50 text-xs px-3 py-1.5 rounded"
          style={{ background: 'var(--bg2)', border: '1px solid var(--border)', color: 'var(--sepia-dim)' }}
        >
          ♪ Cliquer pour la musique
        </div>
      )}
    </MusicContext.Provider>
  );
}
