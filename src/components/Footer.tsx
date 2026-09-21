'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CHAINES } from '@/lib/event';
import { TikTokIcon, TwitchIcon } from '@/components/icons';

/** Pages en plein écran : un pied de page n'y aurait pas sa place. */
const SANS_PIED = ['/carrousel', '/admin'];

const LIENS = [
  { href: '/opening', label: 'Openings' },
  { href: '/anime', label: 'Animés' },
  { href: '/mes-votes', label: 'Mes votes' },
  { href: '/resultats', label: 'Résultats' },
];

export default function Footer() {
  const pathname = usePathname();
  if (SANS_PIED.some((page) => pathname?.startsWith(page))) return null;

  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center gap-7 text-center">
        <Link href="/" aria-label="Retour à l’accueil">
          <Image
            src="/logo-retro.png"
            alt="Retro Awards — Zenkai"
            width={384}
            height={294}
            style={{ height: '6.5rem', width: 'auto', filter: 'drop-shadow(0 0 18px rgba(0,255,204,0.2))' }}
          />
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-bold tracking-widest uppercase">
          {LIENS.map((lien) => (
            <Link key={lien.href} href={lien.href} className="hover:neon-text transition-colors" style={{ color: 'var(--sepia-dim)' }}>
              {lien.label}
            </Link>
          ))}
        </nav>

        {(CHAINES.twitch || CHAINES.tiktok) && (
          <div className="flex items-center gap-3">
            {CHAINES.twitch && (
              <a href={CHAINES.twitch} target="_blank" rel="noopener noreferrer" aria-label="Twitch" className="btn-neon rounded-full p-2.5">
                <TwitchIcon size={16} />
              </a>
            )}
            {CHAINES.tiktok && (
              <a href={CHAINES.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="btn-neon rounded-full p-2.5">
                <TikTokIcon size={16} />
              </a>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--sepia-dim)' }}>
          <Image src="/logo-zenkai.png" alt="" width={20} height={20} />
          Un événement organisé par Zenkai
        </div>
      </div>
    </footer>
  );
}
