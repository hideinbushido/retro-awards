import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AnimeNominees from '@/components/AnimeNominees';
import Comments from '@/components/Comments';
import TapePage from '@/components/tape/TapePage';
import YearHead from '@/components/tape/YearHead';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';
import { YEARS } from '@/lib/firestore';
import { nominees } from '@/data/nominees';

type Props = { params: Promise<{ year: string }> };

export async function generateStaticParams() {
  return YEARS.map((y) => ({ year: String(y) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { year } = await params;
  return { title: `Animé ${year} — RETRO Awards` };
}

export default async function AnimeYearPage({ params }: Props) {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
  if (!YEARS.includes(year)) notFound();

  const animes = nominees[year]?.animes ?? [];

  return (
    <TapePage>
      <YearHead year={year} base="anime" kicker="Animé de l’année" />

      <section className={t.body}>
        {animes.length === 0 ? (
          <p className={`${s.osd} ${t.empty}`}>Aucun animé nominé pour {year}.</p>
        ) : (
          <AnimeNominees year={year} animes={animes} />
        )}
      </section>

      {/* Même fil que la page de l’année : on discute d’une année, pas d’une catégorie. */}
      <section id="commentaires" className={t.comments}>
        <Comments scope={String(year)} title={`Vos commentaires sur ${year}`} />
      </section>
    </TapePage>
  );
}
