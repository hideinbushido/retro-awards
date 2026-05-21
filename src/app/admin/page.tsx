'use client';

import { useState, useEffect, useRef } from 'react';
import { BarChart3, Trophy, Music, Tv, RefreshCw, Upload, Copy, Check } from 'lucide-react';
import { YEARS, getVotes } from '@/lib/firestore';
import { nominees } from '@/data/nominees';
import { uploadFile } from '@/lib/storage';
import type { UploadCategory, UploadType } from '@/lib/storage';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'retro2025';

type YearVotes = {
  year: number;
  openings: { id: string; animeName: string; openingTitle: string; votes: number }[];
  animes: { id: string; name: string; votes: number }[];
};

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pwd, setPwd] = useState('');
  const [data, setData] = useState<YearVotes[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  function login() {
    if (pwd === ADMIN_PASSWORD) setAuth(true);
    else alert('Mauvais mot de passe');
  }

  async function loadVotes(year: number) {
    setLoading(true);
    const yearData = nominees[year] ?? { openings: [], animes: [] };

    const [openingVotes, animeVotes] = await Promise.all([
      Promise.all(
        yearData.openings.map(async (op) => ({
          id: op.id,
          animeName: op.animeName,
          openingTitle: op.openingTitle,
          votes: await getVotes(year, 'opening', op.id),
        }))
      ),
      Promise.all(
        yearData.animes.map(async (an) => ({
          id: an.id,
          name: an.name,
          votes: await getVotes(year, 'anime', an.id),
        }))
      ),
    ]);

    setData((prev) => {
      const existing = prev.filter((d) => d.year !== year);
      return [...existing, { year, openings: openingVotes, animes: animeVotes }].sort((a, b) => b.year - a.year);
    });
    setLoading(false);
  }

  async function loadAll() {
    setLoading(true);
    await Promise.all(YEARS.map(loadVotes));
    setLoading(false);
  }

  useEffect(() => {
    if (auth) loadAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  const [tab, setTab] = useState<'votes' | 'upload'>('votes');

  if (!auth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="retro-card rounded-xl p-8 w-full max-w-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={20} style={{ color: 'var(--neon)' }} />
            <h1 className="font-black text-xl neon-text tracking-widest">ADMIN</h1>
          </div>
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

  const yearData = selectedYear ? data.find((d) => d.year === selectedYear) : null;

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 size={24} style={{ color: 'var(--neon)' }} />
            <h1 className="font-black text-xl neon-text tracking-widest">RETRO AWARDS — ADMIN</h1>
          </div>
          {tab === 'votes' && (
            <button onClick={loadAll} disabled={loading} className="btn-neon px-3 py-2 rounded text-xs flex items-center gap-2">
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Rafraîchir
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {(['votes', 'upload'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-5 py-2 rounded text-xs font-bold tracking-widest uppercase transition-all"
              style={{
                background: tab === t ? 'var(--neon)' : 'transparent',
                color: tab === t ? 'var(--bg)' : 'var(--sepia-dim)',
                border: '1px solid var(--neon)',
              }}
            >
              {t === 'votes' ? '📊 Votes' : '⬆️ Upload'}
            </button>
          ))}
        </div>

        {tab === 'upload' && <UploadPanel />}

        {tab === 'votes' && loading && !data.length && (
          <p className="text-center py-20 neon-text text-sm tracking-widest">Chargement des votes...</p>
        )}

        {tab === 'votes' && !selectedYear && (
          <>
            {/* Global summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Années" value={YEARS.length} />
              <StatCard label="Catégories" value={2} />
              <StatCard
                label="Total votes opening"
                value={data.reduce((s, d) => s + d.openings.reduce((ss, o) => ss + o.votes, 0), 0)}
              />
              <StatCard
                label="Total votes anime"
                value={data.reduce((s, d) => s + d.animes.reduce((ss, a) => ss + a.votes, 0), 0)}
              />
            </div>

            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--sepia-dim)' }}>
              Cliquer sur une année pour le détail
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {YEARS.map((year) => {
                const yd = data.find((d) => d.year === year);
                const opVotes = yd?.openings.reduce((s, o) => s + o.votes, 0) ?? 0;
                const anVotes = yd?.animes.reduce((s, a) => s + a.votes, 0) ?? 0;
                return (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className="retro-card rounded-lg p-4 flex flex-col items-center gap-1 group"
                  >
                    <span className="font-black text-xl group-hover:neon-text transition-all" style={{ color: 'var(--sepia)' }}>
                      {year}
                    </span>
                    <span className="text-xs" style={{ color: 'var(--neon)' }}>{opVotes + anVotes} votes</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* Year detail */}
        {tab === 'votes' && selectedYear && yearData && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setSelectedYear(null)} className="btn-neon px-3 py-1.5 rounded text-xs">
                ← Toutes les années
              </button>
              <h2 className="font-black text-3xl neon-text">{selectedYear}</h2>
              <button onClick={() => loadVotes(selectedYear)} disabled={loading} className="btn-neon px-2 py-1.5 rounded text-xs ml-auto flex items-center gap-1">
                <RefreshCw size={10} /> Update
              </button>
            </div>

            {/* Opening results */}
            <section className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <Music size={14} style={{ color: 'var(--neon)' }} />
                <h3 className="font-black text-sm tracking-widest uppercase" style={{ color: 'var(--sepia)' }}>
                  Meilleur Opening
                </h3>
              </div>
              {yearData.openings.length === 0 ? (
                <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>Aucun nominé.</p>
              ) : (
                <VoteBar items={yearData.openings.map((o) => ({ label: `${o.animeName} — ${o.openingTitle}`, votes: o.votes }))} />
              )}
            </section>

            {/* Anime results */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Tv size={14} style={{ color: 'var(--neon)' }} />
                <h3 className="font-black text-sm tracking-widest uppercase" style={{ color: 'var(--sepia)' }}>
                  Anime de l'Année
                </h3>
              </div>
              {yearData.animes.length === 0 ? (
                <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>Aucun nominé.</p>
              ) : (
                <VoteBar items={yearData.animes.map((a) => ({ label: a.name, votes: a.votes }))} />
              )}
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Upload Panel ──
function UploadPanel() {
  const [year, setYear] = useState(2019);
  const [category, setCategory] = useState<UploadCategory>('OPENING');
  const [type, setType] = useState<UploadType>('Cover');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload() {
    if (!file) return;
    setError('');
    setUrl('');
    setProgress(0);
    try {
      const downloadUrl = await uploadFile(year, category, type, file, setProgress);
      setUrl(downloadUrl);
    } catch (e) {
      setError('Erreur upload. Vérifie les règles Firebase Storage.');
      setProgress(null);
    }
  }

  function copyUrl() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const accept = type === 'Cover' ? 'image/*' : 'audio/*';

  return (
    <div className="max-w-lg">
      <h2 className="font-black text-sm tracking-widest uppercase mb-6" style={{ color: 'var(--sepia)' }}>
        Uploader un fichier vers Firebase Storage
      </h2>

      <div className="flex flex-col gap-4">
        {/* Année */}
        <div>
          <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: 'var(--sepia-dim)' }}>Année</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full px-4 py-2 rounded text-sm font-mono"
            style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--sepia)', outline: 'none' }}
          >
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Catégorie */}
        <div>
          <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: 'var(--sepia-dim)' }}>Catégorie</label>
          <div className="flex gap-2">
            {(['OPENING', 'ANIME'] as UploadCategory[]).map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className="flex-1 py-2 rounded text-xs font-bold tracking-widest uppercase"
                style={{
                  background: category === c ? 'rgba(0,255,204,0.15)' : 'transparent',
                  border: `1px solid ${category === c ? 'var(--neon)' : 'var(--border)'}`,
                  color: category === c ? 'var(--neon)' : 'var(--sepia-dim)',
                }}
              >{c}</button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div>
          <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: 'var(--sepia-dim)' }}>Type de fichier</label>
          <div className="flex gap-2">
            {(['Cover', 'Audio'] as UploadType[]).map((t) => (
              <button
                key={t}
                onClick={() => { setType(t); setFile(null); if (inputRef.current) inputRef.current.value = ''; }}
                className="flex-1 py-2 rounded text-xs font-bold tracking-widest uppercase"
                style={{
                  background: type === t ? 'rgba(0,255,204,0.15)' : 'transparent',
                  border: `1px solid ${type === t ? 'var(--neon)' : 'var(--border)'}`,
                  color: type === t ? 'var(--neon)' : 'var(--sepia-dim)',
                }}
              >{t}</button>
            ))}
          </div>
        </div>

        {/* Fichier */}
        <div>
          <label className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: 'var(--sepia-dim)' }}>
            Fichier ({type === 'Cover' ? 'image' : 'audio'})
          </label>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={(e) => { setFile(e.target.files?.[0] ?? null); setUrl(''); setProgress(null); }}
            className="w-full text-xs"
            style={{ color: 'var(--sepia-dim)' }}
          />
          {file && (
            <p className="text-xs mt-1" style={{ color: 'var(--sepia-dim)' }}>
              {file.name} — {(file.size / 1024).toFixed(0)} Ko
            </p>
          )}
        </div>

        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={!file || progress !== null}
          className="btn-neon py-3 rounded text-sm flex items-center justify-center gap-2"
        >
          <Upload size={14} />
          {progress !== null && progress < 100 ? `Upload... ${progress}%` : 'Uploader'}
        </button>

        {/* Progress bar */}
        {progress !== null && (
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${progress}%`, background: 'var(--neon)' }}
            />
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-xs font-bold" style={{ color: 'var(--red)' }}>{error}</p>
        )}

        {/* Result URL */}
        {url && (
          <div className="retro-card rounded-lg p-4">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--neon)' }}>
              ✓ Upload réussi — URL Firebase Storage
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-mono break-all flex-1" style={{ color: 'var(--sepia-dim)' }}>{url}</p>
              <button onClick={copyUrl} className="btn-neon p-2 rounded flex-shrink-0">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
            <p className="text-xs mt-3" style={{ color: 'var(--sepia-dim)', opacity: 0.7 }}>
              Copie cette URL dans le champ <code style={{ color: 'var(--neon)' }}>{type === 'Cover' ? 'image' : 'audio'}</code> du nominé dans nominees.ts
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="retro-card rounded-lg p-4 text-center">
      <p className="font-black text-2xl neon-text">{value}</p>
      <p className="text-xs mt-1 font-bold tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>{label}</p>
    </div>
  );
}

function VoteBar({ items }: { items: { label: string; votes: number }[] }) {
  const sorted = [...items].sort((a, b) => b.votes - a.votes);
  const max = sorted[0]?.votes || 1;
  return (
    <div className="flex flex-col gap-3">
      {sorted.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              {i === 0 && <Trophy size={12} style={{ color: 'var(--neon)' }} />}
              <span className="text-sm font-bold" style={{ color: i === 0 ? 'var(--sepia)' : 'var(--sepia-dim)' }}>
                {item.label}
              </span>
            </div>
            <span className="text-xs font-black" style={{ color: 'var(--neon)' }}>
              {item.votes} vote{item.votes !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(item.votes / max) * 100}%`,
                background: i === 0 ? 'var(--neon)' : 'var(--sepia-dim)',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
