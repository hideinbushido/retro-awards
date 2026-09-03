import { Tv, ThumbsUp, Award } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Tv,
    title: 'Explore les nominés',
    desc: 'Parcours les meilleurs openings et animes de chaque année, de 2005 à 2019.',
  },
  {
    step: '02',
    icon: ThumbsUp,
    title: 'Vote pour tes favoris',
    desc: 'Choisis tes coups de cœur dans chaque catégorie, année par année.',
  },
  {
    step: '03',
    icon: Award,
    title: 'Découvre les résultats',
    desc: 'Consulte le classement final et revis les meilleurs moments de chaque édition.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="comment-ca-marche"
      className="relative py-20 md:py-28 px-4"
      style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--neon)' }}>
            Comment ça marche
          </p>
          <h2 className="font-black" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', color: 'var(--sepia)' }}>
            Trois étapes, quinze années
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
          {steps.map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="retro-card rounded-xl p-6 md:p-8 relative overflow-hidden">
              <span className="absolute top-3 right-4 font-black text-5xl select-none" style={{ color: 'rgba(0,255,204,0.06)' }}>
                {step}
              </span>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4 relative z-10"
                style={{ background: 'rgba(0,255,204,0.08)', border: '1px solid var(--border)' }}
              >
                <Icon size={20} style={{ color: 'var(--neon)' }} />
              </div>
              <h3 className="font-black text-lg mb-2 relative z-10" style={{ color: 'var(--sepia)' }}>{title}</h3>
              <p className="text-sm leading-relaxed relative z-10" style={{ color: 'var(--sepia-dim)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
