'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic({ src }: { src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.25;
    audio.loop = true;
    // Tentative d'autoplay au chargement
    audio.play().then(() => {
      setPlaying(true);
    }).catch(() => {
      // Navigateur bloque l'autoplay → on attend une interaction
      setBlocked(true);
    });
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
      setBlocked(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      <button
        onClick={toggle}
        title={playing ? 'Couper la musique' : 'Jouer la musique'}
        className="fixed bottom-5 right-5 z-50 w-10 h-10 rounded-full flex items-center justify-center btn-neon"
        style={{ fontSize: '0.7rem' }}
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
    </>
  );
}
