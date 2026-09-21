'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, Lock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import LiveSchedule from '@/components/LiveSchedule';
import { PODIUM_POINTS } from '@/lib/votes';

/**
 * Page résultats — publique.
 *
 * Les totaux ne sont jamais envoyés au navigateur tant que le vote est ouvert :
 * ils ne sortent que par /api/admin/results, protégée par mot de passe.
 */
export default function ResultatsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 pb-16 min-h-screen px-4 md:px-8" style={{ background: 'var(--bg)' }}>
        <div className="max-w-3xl mx-auto">

          <div className="text-center py-12 mb-8">
            <Image
              src="/logo-retro.png"
              alt="Retro Awards"
              width={384}
              height={294}
              priority
              className="mx-auto mb-6"
              style={{ height: 'clamp(6rem, 18vw, 9rem)', width: 'auto', filter: 'drop-shadow(0 0 24px rgba(0,255,204,0.25))' }}
            />
            <h1 className="text-3xl md:text-5xl font-black mb-3" style={{ color: 'var(--sepia)' }}>Résultats</h1>
            <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>
              2019 à 2005
            </p>
            <div className="h-px w-24 mx-auto mt-4" style={{ background: 'linear-gradient(to right, transparent, var(--neon), transparent)' }} />
          </div>

          <div className="retro-card rounded-xl p-8 text-center flex flex-col items-center gap-4">
            <Lock size={28} style={{ color: 'var(--neon)' }} />
            <h2 className="font-black text-xl" style={{ color: 'var(--sepia)' }}>Le vote est en cours</h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--sepia-dim)', maxWidth: '38rem' }}>
              Les résultats restent scellés jusqu’au bout, pour que personne ne soit influencé
              en votant. Ils seront dévoilés en direct, catégorie par catégorie :
            </p>
            <LiveSchedule />
            <div className="h-px w-full my-2" style={{ background: 'var(--border)' }} />
            <div className="text-xs leading-relaxed" style={{ color: 'var(--sepia-dim)' }}>
              <p className="font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--neon)' }}>
                Comment on compte les points
              </p>
              <p>
                Openings : chacun classe 3 openings par année —
                1er = <strong style={{ color: 'var(--sepia)' }}>{PODIUM_POINTS[0]} pts</strong>,
                2e = <strong style={{ color: 'var(--sepia)' }}>{PODIUM_POINTS[1]} pts</strong>,
                3e = <strong style={{ color: 'var(--sepia)' }}>{PODIUM_POINTS[2]} pts</strong>.
              </p>
              <p className="mt-1">Anime de l’année : une voix par personne et par année.</p>
            </div>
          </div>

          <div className="text-center mt-12 flex flex-wrap gap-3 justify-center">
            <Link href="/opening" className="btn-neon px-6 py-3 rounded text-sm inline-flex items-center gap-2">
              Voter pour les openings
            </Link>
            <Link href="/anime" className="btn-neon px-6 py-3 rounded text-sm inline-flex items-center gap-2">
              Voter pour les animés
            </Link>
            <Link href="/" className="btn-neon px-6 py-3 rounded text-sm inline-flex items-center gap-2">
              <ChevronLeft size={16} /> Accueil
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
