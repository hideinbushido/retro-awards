import Image from 'next/image';

/**
 * Les deux voix des Retro Awards.
 *
 * Le cadrage de chaque photo est réglé à la main : l'une est un portrait
 * serré, l'autre un plan large, et un réglage unique donnerait un visage
 * coupé d'un côté ou perdu dans le décor de l'autre.
 */
type Presenter = {
  name: string;
  realName: string;
  photo: string;
  objectPosition: string;
  tiktoks: string[];
};

const PRESENTERS: Presenter[] = [
  {
    name: 'Tampico',
    realName: 'Pape',
    photo: '/PAPE.png',
    objectPosition: '55% 0%',
    tiktoks: ['papemorjf'],
  },
  {
    name: 'Afro Otaku',
    realName: 'Aude',
    photo: '/AUDE.jpg',
    objectPosition: '50% 42%',
    tiktoks: ['audeanselm', 'aude.no.sekai'],
  },
];

export default function Presenters() {
  return (
    <section id="presentateurs" className="relative py-20 md:py-28 px-4" style={{ background: 'var(--bg)' }}>
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--neon)' }}>
          Retro Awards
        </p>
        <h2 className="font-black mb-4" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', color: 'var(--sepia)' }}>
          Présentateurs
        </h2>
        <p className="text-sm max-w-lg mx-auto mb-12" style={{ color: 'var(--sepia-dim)' }}>
          Ce sont eux qui annonceront les résultats, année après année.
        </p>

        <div className="flex flex-wrap items-stretch justify-center gap-6 md:gap-10">
          {PRESENTERS.map((p) => (
            <article key={p.name} className="retro-card rounded-xl overflow-hidden w-64 sm:w-72 flex flex-col">
              <div className="relative" style={{ aspectRatio: '4/5' }}>
                <Image
                  src={p.photo}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 80vw, 288px"
                  className="object-cover"
                  style={{ objectPosition: p.objectPosition }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, transparent, rgba(13,10,6,0.95))' }}
                />
                <div className="absolute inset-x-0 bottom-0 p-3 text-left">
                  <p className="font-black text-lg leading-tight neon-text">{p.name}</p>
                  <p className="text-xs" style={{ color: 'var(--sepia-dim)' }}>{p.realName}</p>
                </div>
              </div>

              <div className="p-3 flex flex-wrap gap-2 justify-center">
                {p.tiktoks.map((handle) => (
                  <a
                    key={handle}
                    href={`https://www.tiktok.com/@${handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neon text-xs px-3 py-2 rounded inline-flex items-center gap-1.5"
                  >
                    <TikTokIcon /> @{handle}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TikTokIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .52.04.76.12V9.7a5.76 5.76 0 0 0-.76-.05 5.68 5.68 0 1 0 5.68 5.68V9.01a7.35 7.35 0 0 0 4.29 1.37V7.3a4.29 4.29 0 0 1-3.23-1.48Z" />
    </svg>
  );
}
