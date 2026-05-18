'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: 'rgba(13,10,6,0.92)',
        borderBottom: '1px solid var(--border)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Link href="/" className="flex items-center gap-2">
        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>
          ZENKAI
        </span>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span className="font-black tracking-wider neon-text text-sm">RETRO AWARDS</span>
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-widest uppercase">
        <Link href="/" className="hover:neon-text transition-colors" style={{ color: 'var(--sepia-dim)' }}>
          Accueil
        </Link>
        <Link href="/resultats" className="hover:neon-text transition-colors" style={{ color: 'var(--sepia-dim)' }}>
          Résultats
        </Link>
        <Link
          href="/admin"
          className="btn-neon px-3 py-1.5 text-xs rounded"
        >
          Admin
        </Link>
      </div>

      {/* Mobile burger */}
      <button className="md:hidden btn-neon p-1.5 rounded" onClick={() => setOpen(!open)}>
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-full inset-x-0 flex flex-col gap-4 p-6 text-sm font-bold tracking-widest uppercase"
          style={{ background: 'rgba(13,10,6,0.98)', borderBottom: '1px solid var(--border)' }}
        >
          <Link href="/" onClick={() => setOpen(false)} style={{ color: 'var(--sepia-dim)' }}>Accueil</Link>
          <Link href="/resultats" onClick={() => setOpen(false)} style={{ color: 'var(--sepia-dim)' }}>Résultats</Link>
          <Link href="/admin" onClick={() => setOpen(false)} className="neon-text">Admin</Link>
        </div>
      )}
    </nav>
  );
}
