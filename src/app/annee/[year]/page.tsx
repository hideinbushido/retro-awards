import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import OpeningNominees from '@/components/OpeningNominees';
import AnimeNominees from '@/components/AnimeNominees';
import Comments from '@/components/Comments';
import TapePage from '@/components/tape/TapePage';
import YearHead from '@/components/tape/YearHead';
import { Rise } from '@/components/home/Letters';
import InView from '@/components/home/InView';
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
  return { title: `${year} — RETRO Awards` };
}

export default async function YearPage({ params }: Props) {
  const { year: yearStr } = await params;
  const year = Number(yearStr);
  if (!YEARS.includes(year)) notFound();

  const yearData = nominees[year] ?? { openings: [], animes: [] };

  return (
    <TapePage>
      <YearHead year={year} base="annee" kicker={`${yearData.openings.length + yearData.animes.length} nominés · 2 catégories`} />

      {/* ── Face A : les openings ── */}
      <section className={t.section}>
        <InView className={t.sectionHead}>
          <div>
            <p className={`${s.osd} ${s.kicker}`}>Face A</p>
            <h2 className={`${s.display} ${t.sectionTitle}`}><Rise text="Meilleur opening" /></h2>
          </div>
        </InView>
        {yearData.openings.length === 0 ? (
          <p className={`${s.osd} ${t.empty}`}>Aucun opening nominé pour cette année.</p>
        ) : (
          <OpeningNominees year={year} openings={yearData.openings} />
        )}
      </section>

      {/* ── Face B : les animés ── */}
      <section className={t.section} style={{ paddingBottom: 'clamp(48px, 8vh, 96px)' }}>
        <InView className={t.sectionHead}>
          <div>
            <p className={`${s.osd} ${s.kicker}`}>Face B</p>
            <h2 className={`${s.display} ${t.sectionTitle}`}><Rise text="Animé de l’année" /></h2>
          </div>
        </InView>
        {yearData.animes.length === 0 ? (
          <p className={`${s.osd} ${t.empty}`}>Aucun animé nominé pour cette année.</p>
        ) : (
          <AnimeNominees year={year} animes={yearData.animes} />
        )}
      </section>

      <section id="commentaires" className={t.comments}>
        <Comments scope={String(year)} title={`Vos commentaires sur ${year}`} />
      </section>
    </TapePage>
  );
}
