'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LiveIcons } from '@/components/LiveSchedule';
import { Roll } from '@/components/home/Letters';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';

/** Pages en plein écran : un pied de page n'y aurait pas sa place. */
const SANS_PIED = ['/carrousel', '/admin'];

const LIENS = [
  { href: '/nomines', label: 'Nominés' },
  { href: '/voter', label: 'Voter' },
  { href: '/mes-votes', label: 'Mes votes' },
  { href: '/resultats', label: 'Résultats' },
];

export default function Footer() {
  const pathname = usePathname();
  if (SANS_PIED.some((page) => pathname?.startsWith(page))) return null;

  return (
    <footer className={`${s.root} vhs ${t.foot}`}>
      <Link href="/" aria-label="Retour à l’accueil">
        <Image
          src="/logo-retro.png"
          alt="Retro Awards — Zenkai"
          width={384}
          height={294}
          style={{ height: '6rem', width: 'auto' }}
        />
      </Link>

      <nav className={`${s.osd} ${t.footNav}`} aria-label="Pied de page">
        {LIENS.map((lien) => (
          <Link key={lien.href} href={lien.href}>
            <Roll text={lien.label} />
          </Link>
        ))}
      </nav>

      <LiveIcons />

      <p className={`${s.osd} ${t.footBy}`}>
        <Image src="/logo-zenkai.png" alt="" width={20} height={20} />
        Un événement organisé par Zenkai
      </p>
    </footer>
  );
}
