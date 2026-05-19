'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown, Music, Tv } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

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

        {/* Catégories dropdown */}
        <div className="relative">
          <button
            onClick={() => setCatOpen(v => !v)}
            onBlur={() => setTimeout(() => setCatOpen(false), 150)}
            className="flex items-center gap-1 hover:neon-text transition-colors"
            style={{ color: 'var(--sepia-dim)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit' }}
          >
            Catégories <ChevronDown size={12} style={{ transition: 'transform 0.2s', transform: catOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
          </button>

          {catOpen && (
            <div
              className="absolute top-full right-0 mt-2 flex flex-col rounded overflow-hidden"
              style={{ background: 'rgba(13,10,6,0.98)', border: '1px solid var(--border)', minWidth: '160px', boxShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
            >
              <Link
                href="/opening"
                onClick={() => setCatOpen(false)}
                className="flex items-center gap-2 px-4 py-3 hover:neon-text transition-colors"
                style={{ color: 'var(--sepia-dim)', borderBottom: '1px solid var(--border)' }}
              >
                <Music size={12} /> Opening
              </Link>
              <Link
                href="/anime"
                onClick={() => setCatOpen(false)}
                className="flex items-center gap-2 px-4 py-3 hover:neon-text transition-colors"
                style={{ color: 'var(--sepia-dim)' }}
              >
                <Tv size={12} /> Anime
              </Link>
            </div>
          )}
        </div>

        <Link href="/resultats" className="hover:neon-text transition-colors" style={{ color: 'var(--sepia-dim)' }}>
          Résultats
        </Link>
        <Link href="/admin" className="btn-neon px-3 py-1.5 text-xs rounded">
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
          className="absolute top-full inset-x-0 flex flex-col gap-0 text-sm font-bold tracking-widest uppercase"
          style={{ background: 'rgba(13,10,6,0.98)', borderBottom: '1px solid var(--border)' }}
        >
          <Link href="/" onClick={() => setOpen(false)}
            className="px-6 py-4 hover:neon-text transition-colors"
            style={{ color: 'var(--sepia-dim)', borderBottom: '1px solid var(--border)' }}>
            Accueil
          </Link>

          {/* Catégories section mobile */}
          <div style={{ borderBottom: '1px solid var(--border)' }}>
            <p className="px-6 py-3 text-xs tracking-widest" style={{ color: 'var(--neon)', opacity: 0.7 }}>
              Catégories
            </p>
            <Link href="/opening" onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-8 py-3 hover:neon-text transition-colors"
              style={{ color: 'var(--sepia-dim)', borderTop: '1px solid var(--border)' }}>
              <Music size={12} /> Opening
            </Link>
            <Link href="/anime" onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-8 py-3 hover:neon-text transition-colors"
              style={{ color: 'var(--sepia-dim)', borderTop: '1px solid var(--border)' }}>
              <Tv size={12} /> Anime
            </Link>
          </div>

          <Link href="/resultats" onClick={() => setOpen(false)}
            className="px-6 py-4 hover:neon-text transition-colors"
            style={{ color: 'var(--sepia-dim)', borderBottom: '1px solid var(--border)' }}>
            Résultats
          </Link>
          <Link href="/admin" onClick={() => setOpen(false)}
            className="px-6 py-4 neon-text">
            Admin
          </Link>
        </div>
      )}
    </nav>
  );
}
