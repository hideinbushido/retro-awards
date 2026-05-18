import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { YEARS } from '@/lib/firestore';

type Props = { basePath: 'opening' | 'anime' };

export default function YearTimeline({ basePath }: Props) {
  return (
    <>
      {/* PC: 5-column grid */}
      <div className="hidden md:grid grid-cols-5 gap-4">
        {YEARS.map((year, i) => (
          <Link
            key={year}
            href={`/${basePath}/${year}`}
            className="retro-card rounded-lg p-6 flex flex-col items-center justify-center gap-3 group"
            style={{
              minHeight: '130px',
              opacity: 0,
              animation: `fadeUp 0.5s ease ${i * 50}ms forwards`,
            }}
          >
            {i === 0 && (
              <span className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
                style={{ background: 'rgba(0,255,204,0.1)', color: 'var(--neon)', border: '1px solid var(--border)' }}
              >
                RÉCENT
              </span>
            )}
            <span className="font-black text-3xl group-hover:neon-text transition-all" style={{ color: 'var(--sepia)' }}>
              {year}
            </span>
            <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity neon-text" />
          </Link>
        ))}
      </div>

      {/* Mobile: vertical list */}
      <div className="md:hidden flex flex-col gap-3">
        {YEARS.map((year, i) => (
          <Link
            key={year}
            href={`/${basePath}/${year}`}
            className="retro-card rounded-lg px-5 py-4 flex items-center justify-between group"
            style={{
              opacity: 0,
              animation: `fadeUp 0.4s ease ${i * 35}ms forwards`,
            }}
          >
            <div className="flex items-center gap-4">
              <span className="font-black text-2xl" style={{ color: 'var(--sepia)', minWidth: '3.5rem' }}>{year}</span>
              {i === 0 && <span className="text-xs neon-text">Année la plus récente</span>}
            </div>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" style={{ color: 'var(--neon)' }} />
          </Link>
        ))}
      </div>
    </>
  );
}
