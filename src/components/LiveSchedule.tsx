import { CHAINES, LIVES } from '@/lib/event';
import { TikTokIcon, TwitchIcon } from '@/components/icons';

/** Le point rouge qui pulse, signe universel du direct. */
function PointLive() {
  return (
    <span className="relative inline-flex" style={{ width: '0.55rem', height: '0.55rem' }} aria-hidden="true">
      <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#ff3b3b', opacity: 0.6 }} />
      <span className="relative rounded-full w-full h-full" style={{ background: '#ff3b3b' }} />
    </span>
  );
}

/** Les boutons des chaînes ; sans adresse connue, la plateforme est seulement nommée. */
export function LiveLinks() {
  const liens = [
    { nom: 'Twitch', url: CHAINES.twitch, icone: <TwitchIcon size={14} /> },
    { nom: 'TikTok', url: CHAINES.tiktok, icone: <TikTokIcon size={14} /> },
  ];

  if (liens.every((l) => !l.url)) {
    return (
      <p className="text-sm" style={{ color: 'var(--sepia-dim)' }}>
        En direct sur notre chaîne <strong style={{ color: 'var(--sepia)' }}>Twitch</strong> et notre compte{' '}
        <strong style={{ color: 'var(--sepia)' }}>TikTok</strong>.
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {liens.map((l) =>
        l.url ? (
          <a
            key={l.nom}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon px-5 py-3 rounded text-sm inline-flex items-center gap-2"
          >
            {l.icone} Suivre sur {l.nom}
          </a>
        ) : null,
      )}
    </div>
  );
}

/**
 * Le calendrier des résultats.
 *   • compact : une ligne, pour l'accueil
 *   • complet : une carte par live, puis les chaînes, pour la page Résultats
 */
export default function LiveSchedule({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-col items-center gap-1.5 text-sm">
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
