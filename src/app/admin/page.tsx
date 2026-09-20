'use client';

import { useState, useRef } from 'react';
import { BarChart3, Trophy, Music, Tv, RefreshCw, Upload, Copy, Check, Users, MessageCircle, Trash2 } from 'lucide-react';
import { YEARS } from '@/lib/firestore';
import { PODIUM_POINTS } from '@/lib/votes';
import { uploadFile } from '@/lib/storage';
import type { UploadCategory, UploadType } from '@/lib/storage';

/**
 * Admin — seule porte d entrée vers les résultats.
 *
 * Le mot de passe n est jamais dans le bundle : il est vérifié côté serveur par
 * /api/admin/results, qui est aussi le seul endroit capable de lire les totaux.
 */
type YearResult = {
  year: number;
  openingBallots: number;
  animeBallots: number;
  openings: { id: string; label: string; points: number }[];
  animes: { id: string; label: string; votes: number }[];
};

type Voter = {
  pseudo: string;
  email: string;
  createdAt: string | null;
  animes: number;
  openings: number;
  country: string | null;
  city: string | null;
  device: string | null;
  os: string | null;
  browser: string | null;
  source: string | null;
  landing: string | null;
};

type AdminComment = {
  id: string;
  scope: string;
  author: string;
  text: string;
  isReply: boolean;
  createdAt: string | null;
};

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pwd, setPwd] = useState('');
  const [data, setData] = useState<YearResult[]>([]);
  const [voters, setVoters] = useState<Voter[]>([]);
  const [comments, setComments] = useState<AdminComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [tab, setTab] = useState<'votes' | 'votants' | 'commentaires' | 'upload'>('votes');

  async function fetchResults(password: string) {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error ?? 'Lecture impossible.');
        return false;
      }
      setData(json.years as YearResult[]);
      setVoters((json.voters ?? []) as Voter[]);
      setComments((json.comments ?? []) as AdminComment[]);
      return true;
    } catch {
      setError('Connexion impossible.');
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function login() {
    if (await fetchResults(pwd)) setAuth(true);
  }

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
          <button onClick={login} disabled={loading} className="btn-neon w-full py-3 rounded text-sm">
            {loading ? '...' : 'Entrer'}
          </button>
          {error && <p className="text-xs mt-3" style={{ color: '#ff5555' }}>{error}</p>}
        </div>
      </div>
    );
  }

  const yearData = selectedYear ? data.find((d) => d.year === selectedYear) : null;
  const totalOpeningBallots = data.reduce((s, d) => s + d.openingBallots, 0);
  const totalAnimeBallots = data.reduce((s, d) => s + d.animeBallots, 0);

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 size={24} style={{ color: 'var(--neon)' }} />
            <h1 className="font-black text-xl neon-text tracking-widest">RETRO AWARDS — ADMIN</h1>
          </div>
          {tab === 'votes' && (
            <button onClick={() => fetchResults(pwd)} disabled={loading} className="btn-neon px-3 py-2 rounded text-xs flex items-center gap-2">
              <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
              Rafraîchir
            </button>
          )}
        </div>

        <div className="flex gap-2 mb-8">
          {(['votes', 'votants', 'commentaires', 'upload'] as const).map((t) => (
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
              {t === 'votes' ? 'Votes' : t === 'votants' ? 'Votants' : t === 'commentaires' ? 'Commentaires' : 'Upload'}
            </button>
          ))}
        </div>

        {error && <p className="text-xs mb-4" style={{ color: '#ff5555' }}>{error}</p>}

        {tab === 'upload' && <UploadPanel />}

        {tab === 'votants' && <VotersPanel voters={voters} />}

        {tab === 'commentaires' && (
          <CommentsPanel
            comments={comments}
            password={pwd}
            onDeleted={(id) => setComments((prev) => prev.filter((c) => c.id !== id))}
          />
        )}

        {tab === 'votes' && !selectedYear && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label="Années" value={YEARS.length} />
              <StatCard label="Podiums openings" value={totalOpeningBallots} />
              <StatCard label="Votes animés" value={totalAnimeBallots} />
              <StatCard label="Barème" value={PODIUM_POINTS.join(' / ')} />
            </div>

            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--sepia-dim)' }}>
              Cliquer sur une année pour le détail
            </p>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {data.map((d) => (
                <button
                  key={d.year}
                  onClick={() => setSelectedYear(d.year)}
                  className="retro-card rounded-lg p-4 flex flex-col items-center gap-1 group"
                >
                  <span className="font-black text-xl group-hover:neon-text transition-all" style={{ color: 'var(--sepia)' }}>
                    {d.year}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--neon)' }}>
                    {d.openingBallots + d.animeBallots} bulletins
                  </span>
                </button>
              ))}
            </div>
          </>
        )}

        {tab === 'votes' && selectedYear && yearData && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <button onClick={() => setSelectedYear(null)} className="btn-neon px-3 py-1.5 rounded text-xs">
                ← Toutes les années
              </button>
              <h2 className="font-black text-3xl neon-text">{selectedYear}</h2>
              <button onClick={() => fetchResults(pwd)} disabled={loading} className="btn-neon px-2 py-1.5 rounded text-xs ml-auto flex items-center gap-1">
                <RefreshCw size={10} className={loading ? 'animate-spin' : ''} /> Update
              </button>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-2 mb-1">
                <Music size={14} style={{ color: 'var(--neon)' }} />
                <h3 className="font-black text-sm tracking-widest uppercase" style={{ color: 'var(--sepia)' }}>
                  Meilleur Opening
                </h3>
              </div>
              <p className="text-xs mb-4" style={{ color: 'var(--sepia-dim)' }}>
                {yearData.openingBallots} podium{yearData.openingBallots !== 1 ? 's' : ''} ·
                {' '}1er = {PODIUM_POINTS[0]} pts, 2e = {PODIUM_POINTS[1]}, 3e = {PODIUM_POINTS[2]}
              </p>
              {yearData.openings.length === 0 ? (
                <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>Aucun nominé.</p>
              ) : (
                <VoteBar items={yearData.openings.map((o) => ({ label: o.label, value: o.points }))} unit="pts" />
              )}
            </section>

            <section>
              <div className="flex items-center gap-2 mb-1">
                <Tv size={14} style={{ color: 'var(--neon)' }} />
                <h3 className="font-black text-sm tracking-widest uppercase" style={{ color: 'var(--sepia)' }}>
                  Anime de l’Année
                </h3>
              </div>
              <p className="text-xs mb-4" style={{ color: 'var(--sepia-dim)' }}>
                {yearData.animeBallots} vote{yearData.animeBallots !== 1 ? 's' : ''}
              </p>
              {yearData.animes.length === 0 ? (
                <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>Aucun nominé.</p>
              ) : (
                <VoteBar items={yearData.animes.map((a) => ({ label: a.label, value: a.votes }))} unit="voix" />
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
    } catch {
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

        <button
          onClick={handleUpload}
          disabled={!file || progress !== null}
          className="btn-neon py-3 rounded text-sm flex items-center justify-center gap-2"
        >
          <Upload size={14} />
          {progress !== null && progress < 100 ? `Upload... ${progress}%` : 'Uploader'}
        </button>

        {progress !== null && (
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'var(--neon)' }} />
          </div>
        )}

        {error && <p className="text-xs font-bold" style={{ color: '#ff5555' }}>{error}</p>}

        {url && (
          <div className="retro-card rounded-lg p-4">
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--neon)' }}>
              Upload réussi — URL Firebase Storage
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs font-mono break-all flex-1" style={{ color: 'var(--sepia-dim)' }}>{url}</p>
              <button onClick={copyUrl} className="btn-neon p-2 rounded flex-shrink-0">
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="retro-card rounded-lg p-4 text-center">
      <p className="font-black text-2xl neon-text">{value}</p>
      <p className="text-xs mt-1 font-bold tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>{label}</p>
    </div>
  );
}

function VoteBar({ items, unit }: { items: { label: string; value: number }[]; unit: string }) {
  const max = items[0]?.value || 1;
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i}>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center gap-2">
              {i === 0 && item.value > 0 && <Trophy size={12} style={{ color: 'var(--neon)' }} />}
              <span className="text-sm font-bold" style={{ color: i === 0 ? 'var(--sepia)' : 'var(--sepia-dim)' }}>
                {item.label}
              </span>
            </div>
            <span className="text-xs font-black" style={{ color: 'var(--neon)' }}>
              {item.value} {unit}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg3)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(item.value / max) * 100}%`, background: i === 0 ? 'var(--neon)' : 'var(--sepia-dim)' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Qui a voté, quand, et combien d’années chacun a couvert. */
function VotersPanel({ voters }: { voters: Voter[] }) {
  const [copied, setCopied] = useState(false);
  const actifs = voters.filter((v) => v.animes + v.openings > 0);

  function copyEmails() {
    navigator.clipboard.writeText(voters.map((v) => v.email).join(', ')).then(
      () => { setCopied(true); setTimeout(() => setCopied(false), 1500); },
      () => {},
    );
  }

  if (!voters.length) {
    return (
      <div className="retro-card rounded-lg p-8 text-center">
        <Users size={24} className="mx-auto mb-3" style={{ color: 'var(--neon)' }} />
        <p className="text-sm" style={{ color: 'var(--sepia-dim)' }}>Personne ne s’est encore inscrit.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Inscrits" value={voters.length} />
        <StatCard label="Ont voté" value={actifs.length} />
        <StatCard label="Podiums" value={voters.reduce((n, v) => n + v.openings, 0)} />
        <StatCard label="Votes animés" value={voters.reduce((n, v) => n + v.animes, 0)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Repartition title="Pays" items={compte(voters.map((v) => v.country))} />
        <Repartition title="Appareils" items={compte(voters.map((v) => v.device))} />
        <Repartition title="Arrivés par" items={compte(voters.map((v) => v.source))} />
      </div>

      <div className="flex justify-end mb-3">
        <button onClick={copyEmails} className="btn-neon px-3 py-2 rounded text-xs flex items-center gap-2">
          {copied ? <Check size={12} /> : <Copy size={12} />} Copier les adresses
        </button>
      </div>

      <div className="retro-card rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ color: 'var(--sepia)' }}>
            <thead>
              <tr style={{ background: 'var(--bg2)', color: 'var(--neon)' }}>
                <th className="text-left font-black tracking-widest uppercase px-4 py-3">Pseudo</th>
                <th className="text-left font-black tracking-widest uppercase px-4 py-3">Adresse mail</th>
                <th className="text-left font-black tracking-widest uppercase px-4 py-3">Pays</th>
                <th className="text-left font-black tracking-widest uppercase px-4 py-3">Appareil</th>
                <th className="text-left font-black tracking-widest uppercase px-4 py-3">Arrivé par</th>
                <th className="text-right font-black tracking-widest uppercase px-4 py-3">Animés</th>
                <th className="text-right font-black tracking-widest uppercase px-4 py-3">Podiums</th>
                <th className="text-right font-black tracking-widest uppercase px-4 py-3">Inscrit le</th>
              </tr>
            </thead>
            <tbody>
              {voters.map((v) => (
                <tr key={v.email} style={{ borderTop: '1px solid var(--border)' }}>
                  <td className="px-4 py-3 font-black">{v.pseudo}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--sepia-dim)' }}>{v.email}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--sepia-dim)' }}>
                    {v.country ?? '—'}{v.city ? ' · ' + v.city : ''}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--sepia-dim)' }}>
                    {v.device ?? '—'}{v.os ? ' · ' + v.os : ''}{v.browser ? ' · ' + v.browser : ''}
                  </td>
                  <td className="px-4 py-3" style={{ color: 'var(--sepia-dim)' }}>
                    {v.source ?? '—'}{v.landing && v.landing !== '/' ? ' → ' + v.landing : ''}
                  </td>
                  <td className="px-4 py-3 text-right">{v.animes}</td>
                  <td className="px-4 py-3 text-right">{v.openings}</td>
                  <td className="px-4 py-3 text-right" style={{ color: 'var(--sepia-dim)' }}>
                    {v.createdAt ? new Date(v.createdAt).toLocaleDateString('fr-FR') : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/** Compte les valeurs identiques, les plus fréquentes d’abord. */
function compte(values: (string | null)[]): { label: string; value: number }[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    const label = value ?? 'inconnu';
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);
}

function Repartition({ title, items }: { title: string; items: { label: string; value: number }[] }) {
  const total = items.reduce((n, i) => n + i.value, 0) || 1;
  return (
    <div className="retro-card rounded-lg p-4">
      <p className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: 'var(--neon)' }}>{title}</p>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--sepia)' }}>
              <span className="truncate pr-2">{item.label}</span>
              <span style={{ color: 'var(--sepia-dim)' }}>{item.value}</span>
            </div>
            <div className="h-1 rounded" style={{ background: 'var(--bg2)' }}>
              <div className="h-1 rounded" style={{ width: `${(item.value / total) * 100}%`, background: 'var(--neon)' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Modération : tout le mur, du plus récent au plus ancien. */
function CommentsPanel({
  comments,
  password,
  onDeleted,
}: {
  comments: AdminComment[];
  password: string;
  onDeleted: (id: string) => void;
}) {
  async function supprimer(id: string) {
    onDeleted(id);
    try {
      await fetch('/api/comments', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });
    } catch {
      // L'écran repartira du serveur au prochain rafraîchissement
    }
  }

  if (!comments.length) {
    return (
      <div className="retro-card rounded-lg p-8 text-center">
        <MessageCircle size={24} className="mx-auto mb-3" style={{ color: 'var(--neon)' }} />
        <p className="text-sm" style={{ color: 'var(--sepia-dim)' }}>Aucun commentaire pour l’instant.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {comments.map((c) => (
        <div key={c.id} className="retro-card rounded-lg p-3 flex gap-3 items-start">
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-black text-sm" style={{ color: 'var(--sepia)' }}>{c.author}</span>
              <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'var(--bg2)', color: 'var(--neon)' }}>
                {c.scope}
              </span>
              {c.isReply && <span className="text-xs" style={{ color: 'var(--sepia-dim)' }}>réponse</span>}
              <span className="text-xs" style={{ color: 'var(--sepia-dim)', opacity: 0.7 }}>
                {c.createdAt ? new Date(c.createdAt).toLocaleString('fr-FR') : ''}
              </span>
            </div>
            <p className="text-sm mt-1" style={{ color: 'var(--sepia)', opacity: 0.9, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
              {c.text}
            </p>
          </div>
          <button
            onClick={() => supprimer(c.id)}
            className="btn-neon text-xs px-3 py-2 rounded shrink-0 inline-flex items-center gap-1"
          >
            <Trash2 size={11} /> Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}
