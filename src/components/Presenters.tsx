import { User } from 'lucide-react';

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
          Ils présenteront les résultats des Retro Awards. Line-up bientôt révélé.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="presenter-placeholder retro-card rounded-xl w-48 md:w-56 py-10 px-4 flex flex-col items-center gap-4"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,255,204,0.06)', border: '1px dashed var(--border)' }}
              >
                <User size={28} style={{ color: 'var(--sepia-dim)' }} />
              </div>
              <div>
                <p className="font-black text-sm tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>À annoncer</p>
                <p className="text-xs mt-1" style={{ color: 'var(--neon)', opacity: 0.7 }}>Présentateur #{i}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
