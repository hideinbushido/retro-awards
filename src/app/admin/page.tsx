'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Plus, Trash2, Music, Tv } from 'lucide-react';
import { YEARS, addOpening, addAnime, deleteOpening, deleteAnime, getOpenings, getAnimes, Opening, Anime } from '@/lib/firestore';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'retro2025';

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pwd, setPwd] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [tab, setTab] = useState<'opening' | 'anime'>('opening');
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(false);

  // Opening form
  const [opForm, setOpForm] = useState({ animeName: '', openingTitle: '', imageUrl: '', audioPath: '' });
  // Anime form
  const [anForm, setAnForm] = useState({ name: '', imageUrl: '' });

  function login() {
    if (pwd === ADMIN_PASSWORD) setAuth(true);
    else alert('Mauvais mot de passe');
  }

  async function loadYear(year: number) {
    setSelectedYear(year);
    setLoading(true);
    const [ops, ans] = await Promise.all([getOpenings(year), getAnimes(year)]);
    setOpenings(ops);
    setAnimes(ans);
    setLoading(false);
  }

  async function addOp() {
    if (!selectedYear || !opForm.animeName) return;
    setLoading(true);
    await addOpening(selectedYear, { ...opForm, votes: 0, order: openings.length });
    await loadYear(selectedYear);
    setOpForm({ animeName: '', openingTitle: '', imageUrl: '', audioPath: '' });
  }

  async function addAn() {
    if (!selectedYear || !anForm.name) return;
    setLoading(true);
    await addAnime(selectedYear, { ...anForm, votes: 0, order: animes.length });
    await loadYear(selectedYear);
    setAnForm({ name: '', imageUrl: '' });
  }

  async function delOp(id: string) {
    if (!selectedYear || !confirm('Supprimer cet opening ?')) return;
    await deleteOpening(selectedYear, id);
    setOpenings((p) => p.filter((o) => o.id !== id));
  }

  async function delAn(id: string) {
    if (!selectedYear || !confirm('Supprimer cet anime ?')) return;
    await deleteAnime(selectedYear, id);
    setAnimes((p) => p.filter((a) => a.id !== id));
  }

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="retro-card rounded-xl p-8 w-full max-w-sm">
          <h1 className="font-black text-xl mb-6 neon-text tracking-widest">ADMIN</h1>
          <input
            type="password"
            placeholder="Mot de passe"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            className="w-full px-4 py-3 rounded mb-4 text-sm font-mono"
            style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--sepia)', outline: 'none' }}
          />
          <button onClick={login} className="btn-neon w-full py-3 rounded text-sm">Entrer</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-black text-2xl neon-text tracking-widest">ADMIN — RETRO AWARDS</h1>
          <Link href="/" className="btn-neon px-4 py-2 rounded text-xs">← Site</Link>
        </div>

        {/* Year selector */}
        {!selectedYear ? (
          <div>
            <p className="text-sm mb-6 font-bold tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>
              Sélectionner une année
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {YEARS.map((y) => (
                <button
                  key={y}
                  onClick={() => loadYear(y)}
                  className="retro-card rounded-lg py-4 font-black text-xl hover:neon-text transition-all flex items-center justify-center gap-2"
                  style={{ color: 'var(--sepia)' }}
                >
                  {y} <ChevronRight size={14} />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setSelectedYear(null)}
                className="btn-neon px-3 py-1.5 rounded text-xs"
              >
                ← Années
              </button>
              <h2 className="font-black text-3xl neon-text">{selectedYear}</h2>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTab('opening')}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold tracking-widest uppercase ${tab === 'opening' ? 'btn-neon' : ''}`}
                style={tab !== 'opening' ? { border: '1px solid var(--border)', color: 'var(--sepia-dim)' } : {}}
              >
                <Music size={12} /> Openings ({openings.length})
              </button>
              <button
                onClick={() => setTab('anime')}
                className={`flex items-center gap-2 px-4 py-2 rounded text-xs font-bold tracking-widest uppercase ${tab === 'anime' ? 'btn-neon' : ''}`}
                style={tab !== 'anime' ? { border: '1px solid var(--border)', color: 'var(--sepia-dim)' } : {}}
              >
                <Tv size={12} /> Animes ({animes.length})
              </button>
            </div>

            {loading && <p className="text-xs neon-text mb-4">Chargement...</p>}

            {/* OPENING TAB */}
            {tab === 'opening' && (
              <div>
                {/* Add form */}
                <div className="retro-card rounded-lg p-5 mb-6">
                  <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--neon)' }}>
                    + Ajouter un opening
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <Field label="Nom de l'anime *" value={opForm.animeName} onChange={(v) => setOpForm((p) => ({ ...p, animeName: v }))} />
                    <Field label="Titre opening (ex: OP 1)" value={opForm.openingTitle} onChange={(v) => setOpForm((p) => ({ ...p, openingTitle: v }))} />
                    <Field label="URL image (cover)" value={opForm.imageUrl} onChange={(v) => setOpForm((p) => ({ ...p, imageUrl: v }))} />
                    <Field label="Chemin audio (ex: /music/openings/2019/op.mp3)" value={opForm.audioPath} onChange={(v) => setOpForm((p) => ({ ...p, audioPath: v }))} />
                  </div>
                  <button onClick={addOp} disabled={loading} className="btn-neon px-4 py-2 rounded text-xs flex items-center gap-2">
                    <Plus size={12} /> Ajouter
                  </button>
                </div>

                {/* List */}
                <div className="flex flex-col gap-2">
                  {openings.map((op) => (
                    <div key={op.id} className="retro-card rounded-lg px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm" style={{ color: 'var(--sepia)' }}>{op.animeName}</p>
                        <p className="text-xs" style={{ color: 'var(--neon)' }}>{op.openingTitle}</p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--sepia-dim)' }}>{op.audioPath} · {op.votes} votes</p>
                      </div>
                      <button onClick={() => delOp(op.id)} className="p-1.5 rounded" style={{ color: '#ff3333', border: '1px solid rgba(255,51,51,0.3)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {openings.length === 0 && !loading && (
                    <p className="text-xs text-center py-8" style={{ color: 'var(--sepia-dim)' }}>Aucun opening pour cette année.</p>
                  )}
                </div>
              </div>
            )}

            {/* ANIME TAB */}
            {tab === 'anime' && (
              <div>
                <div className="retro-card rounded-lg p-5 mb-6">
                  <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--neon)' }}>
                    + Ajouter un anime
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <Field label="Nom de l'anime *" value={anForm.name} onChange={(v) => setAnForm((p) => ({ ...p, name: v }))} />
                    <Field label="URL image (poster)" value={anForm.imageUrl} onChange={(v) => setAnForm((p) => ({ ...p, imageUrl: v }))} />
                  </div>
                  <button onClick={addAn} disabled={loading} className="btn-neon px-4 py-2 rounded text-xs flex items-center gap-2">
                    <Plus size={12} /> Ajouter
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {animes.map((an) => (
                    <div key={an.id} className="retro-card rounded-lg px-4 py-3 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm" style={{ color: 'var(--sepia)' }}>{an.name}</p>
                        <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>{an.votes} votes</p>
                      </div>
                      <button onClick={() => delAn(an.id)} className="p-1.5 rounded" style={{ color: '#ff3333', border: '1px solid rgba(255,51,51,0.3)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  {animes.length === 0 && !loading && (
                    <p className="text-xs text-center py-8" style={{ color: 'var(--sepia-dim)' }}>Aucun anime pour cette année.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-xs mb-1 font-bold tracking-widest" style={{ color: 'var(--sepia-dim)' }}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded text-sm font-mono"
        style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--sepia)', outline: 'none' }}
      />
    </div>
  );
}
