import Image from 'next/image';

/** Le blason Zenkai qui tourne lentement : l'indicateur de chargement du site. */
export default function ZenkaiSpinner({ label = 'Chargement…', size = 32 }: { label?: string; size?: number }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8" role="status" aria-live="polite">
      <Image src="/logo-zenkai.png" alt="" width={size} height={size} className="zenkai-spin" />
      <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--sepia-dim)' }}>{label}</span>
    </div>
  );
}
