'use client';

import { CHAINES, FIN_DES_VOTES_COURT, FIN_DES_VOTES_TEXTE, LIVES, type Chaine } from '@/lib/event';
import { TikTokIcon, TwitchIcon } from '@/components/icons';
import { useVotesClos } from '@/hooks/useVotesClos';

/** Le point rouge qui pulse, signe universel du direct. */
function PointLive() {
  return (
    <span className="relative inline-flex" style={{ width: '0.55rem', height: '0.55rem' }} aria-hidden="true">
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#ff3b3b', opacity: 0.6 }} />
      <span className="relative rounded-full w-full h-full" style={{ background: '#ff3b3b' }} />
    </span>
  );
}

function Icone({ chaine, size }: { chaine: Chaine; size: number }) {
  return chaine.plateforme === 'twitch' ? <TwitchIcon size={size} /> : <TikTokIcon size={size} />;
}

/** Les boutons des chaînes du live. */
export function LiveLinks() {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {CHAINES.map((c) => (
        <a
          key={c.url}
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-neon px-4 py-3 rounded text-sm inline-flex items-center gap-2"
        >
          <Icone chaine={c} size={14} />
          {c.plateforme === 'twitch' ? `Twitch · ${c.nom}` : c.nom}
        </a>
      ))}
    </div>
  );
}

/** Les mêmes chaînes en simples icônes rondes, pour le pied de page. */
export function LiveIcons() {
  return (
    <div className="flex items-center gap-3">
      {CHAINES.map((c) => (
        <a
          key={c.url}
          href={c.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${c.plateforme === 'twitch' ? 'Twitch' : 'TikTok'} ${c.nom}`}
          title={c.nom}
          className="btn-neon rounded-full p-2.5"
        >
          <Icone chaine={c} size={16} />
        </a>
      ))}
    </div>
  );
}

/**
 * Le calendrier : fin des votes, puis les deux lives.
 *   • compact : quelques lignes, pour l'accueil
 *   • complet : une carte par live, puis les chaînes, pour la page Résultats
 */
export default function LiveSchedule({ compact = false }: { compact?: boolean }) {
  const clos = useVotesClos();

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-1.5 text-sm">
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: clos ? 'var(--sepia-dim)' : 'var(--neon)' }}>
          {clos ? 'Votes clos' : `Votes ouverts jusqu’au ${FIN_DES_VOTES_COURT}`}
        </p>
        <p className="flex items-center gap-2 font-bold tracking-widest uppercase text-xs" style={{ color: '#ff5c5c' }}>
          <PointLive /> Résultats en live
        </p>
        {/* Chaque date reste d'un seul tenant : jamais un « · » orphelin en début de ligne */}
        <p className="flex items-center justify-center gap-x-3 gap-y-1 flex-wrap" style={{ color: 'var(--sepia-dim)' }}>
          {LIVES.map((l) => (
            <span key={l.categorie} className="whitespace-nowrap">
              {l.categorie} <strong style={{ color: 'var(--sepia)' }}>{l.court}</strong>
            </span>
          ))}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-5">
      <p className="text-sm" style={{ color: 'var(--sepia)' }}>
        {clos ? (
          <>Les votes sont clos depuis le <strong>{FIN_DES_VOTES_TEXTE}</strong>.</>
        ) : (
          <>Votes ouverts jusqu’au <strong style={{ color: 'var(--neon)' }}>{FIN_DES_VOTES_TEXTE}</strong> inclus.</>
        )}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
        {LIVES.map((l) => (
          <div
            key={l.categorie}
            className="rounded-lg p-4 text-center"
            style={{ border: '1px solid var(--border)', background: 'rgba(0,255,204,0.04)' }}
          >
            <p className="flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase" style={{ color: '#ff5c5c' }}>
              <PointLive /> En live
            </p>
            <p className="font-black text-lg mt-2" style={{ color: 'var(--sepia)' }}>{l.categorie}</p>
            {/* Majuscule au jour seulement : en français, le mois reste en minuscule */}
            <p className="text-sm mt-1" style={{ color: 'var(--neon)' }}>{l.date.charAt(0).toUpperCase() + l.date.slice(1)}</p>
          </div>
        ))}
      </div>
      <LiveLinks />
    </div>
  );
}
