import Link from 'next/link';
import InView from '@/components/home/InView';
import LoopVideo from '@/components/home/LoopVideo';
import { Rise, Roll } from '@/components/home/Letters';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';
import { YEARS } from '@/lib/firestore';

type Base = 'opening' | 'anime' | 'annee';

const CATEGORIES: { base: Base; label: string }[] = [
  { base: 'opening', label: 'Openings' },
  { base: 'anime', label: 'Animé' },
  { base: 'annee', label: 'Les deux' },
];

/**
 * L'en-tête d'une page de vote : la grande année, comme dans la galerie des
 * nominés, puis la catégorie, l'année d'avant et d'après, et toutes les années.
 */
export default function YearHead({ year, base, kicker }: { year: number; base: Base; kicker: string }) {
  const idx = YEARS.indexOf(year);
  // YEARS va de la plus récente à la plus ancienne
  const plusRecente = YEARS[idx - 1] ?? null;
  const plusAncienne = YEARS[idx + 1] ?? null;

  return (
    <header className={s.yearHead}>
      <LoopVideo className={s.clock} src="/timetravel.mp4" poster="/home/clock.jpg" />
      <InView>
        <p className={`${s.osd} ${s.kicker}`}>
          <span className={s.recDot} />{kicker}
        </p>
        <h1 className={`${s.display} ${s.yearBig}`}>
          <Rise text={String(year)} />
        </h1>
      </InView>

      <nav className={`${s.osd} ${t.category}`} aria-label="Catégorie">
        {CATEGORIES.map((c) => (
          <Link key={c.base} href={`/${c.base}/${year}`} aria-current={c.base === base ? 'page' : undefined}>
            <Roll text={c.label} />
          </Link>
        ))}
        <a href="#commentaires"><Roll text="Commentaires" /></a>
      </nav>

      <nav className={`${s.osd} ${s.yearNav}`} aria-label="Changer d’année">
        {plusAncienne ? (
          <Link href={`/${base}/${plusAncienne}`}>
            ◀◀ <Roll text={`REW ${plusAncienne}`} />
          </Link>
        ) : (
          <span />
        )}
        {plusRecente ? (
          <Link href={`/${base}/${plusRecente}`}>
            <Roll text={`FF ${plusRecente}`} /> ▶▶
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <div className={s.rail}>
        {YEARS.map((y) => (
          <Link
            key={y}
            href={`/${base}/${y}`}
            className={`${s.osd} ${s.railBtn}`}
            data-on={y === year ? '1' : undefined}
            aria-current={y === year ? 'page' : undefined}
          >
            {y}
          </Link>
        ))}
      </div>
    </header>
  );
}
