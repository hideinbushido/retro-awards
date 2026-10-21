import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OpeningNominees from '@/components/OpeningNominees';
import Comments from '@/components/Comments';
import TapePage from '@/components/tape/TapePage';
import YearHead from '@/components/tape/YearHead';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';
import { YEARS } from '@/lib/firestore';
import { nominees, TEASER_MODE } from '@/data/nominees';

type Props = { params: Promise<{ year: string }> };

export async function generateStaticParams() {
  return YEARS.map((y) => ({ year: String(y) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  return { title: `Openings ${year} — RETRO Awards` };
}

export default async function OpeningYearPage({ params }: Props) {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
  if (!YEARS.includes(year)) notFound();

  const openings = nominees[year]?.openings ?? [];

  return (
    <TapePage>
      <YearHead year={year} base="opening" kicker="Meilleur opening" />

      <section className={t.body}>
        {openings.length === 0 ? (
          <p className={`${s.osd} ${t.empty}`}>Aucun opening nominé pour {year}.</p>
        ) : (
          <OpeningNominees year={year} openings={openings} teaser={TEASER_MODE} />
        )}
      </section>

      {/* Même fil que la page de l’année : on discute d’une année, pas d’une catégorie.
          La marge du bas laisse passer la platine de vote fixée en bas de l’écran. */}
      <section id="commentaires" className={t.comments}>
        <Comments scope={String(year)} title={`Vos commentaires sur ${year}`} />
      </section>
    </TapePage>
  );
}
