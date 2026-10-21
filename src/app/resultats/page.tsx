'use client';

import Link from 'next/link';
import { LiveLinks } from '@/components/LiveSchedule';
import TapePage from '@/components/tape/TapePage';
import InView from '@/components/home/InView';
import { Rise, Roll } from '@/components/home/Letters';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';
import { useVotesClos } from '@/hooks/useVotesClos';
import { PODIUM_POINTS } from '@/lib/votes';
import { FIN_DES_VOTES_TEXTE, LIVES } from '@/lib/event';

/**
 * Page résultats — publique.
 *
 * Les totaux ne sont jamais envoyés au navigateur tant que le vote est ouvert :
 * ils ne sortent que par /api/admin/results, protégée par mot de passe.
 */
export default function ResultatsPage() {
  const clos = useVotesClos();
  return (
    <TapePage>
      <header className={t.head}>
        <InView>
          <p className={`${s.osd} ${s.kicker}`}>■ Bande scellée</p>
          <h1 className={`${s.display} ${t.title}`}>
            <Rise text="Résultats" />
          </h1>
          <p className={t.lede}>
            {clos ? 'Les votes sont clos.' : 'Le vote est en cours.'} Les résultats restent scellés jusqu’au bout, pour que
            personne ne soit influencé en votant. Ils seront dévoilés en direct, catégorie par catégorie.
          </p>
        </InView>
      </header>

      <section className={t.body}>
        <p className={`${s.osd} ${s.kicker}`}>
          <span className={s.recDot} />À l’antenne
        </p>
        <div className={s.grid}>
          <div className={s.gridRow}>
            <span className={`${s.osd} ${s.gridDate}`}>{FIN_DES_VOTES_TEXTE}</span>
            <span className={`${s.display} ${s.gridTitle}`}>Fin des votes</span>
            <span className={`${s.osd} ${s.gridNote}`}>{clos ? 'Votes clos' : '23 h 59, heure de Paris'}</span>
          </div>
          {LIVES.map((l) => (
            <div key={l.categorie} className={s.gridRow}>
              <span className={`${s.osd} ${s.gridDate}`}>{l.date}</span>
              <span className={`${s.display} ${s.gridTitle}`}>{l.categorie}</span>
              <span className={`${s.osd} ${s.gridNote}`} data-live>
                <span className={s.recDot} />En live
              </span>
            </div>
          ))}
        </div>
        <div className={s.channels}>
          <LiveLinks />
        </div>

        <div className={t.notice} style={{ marginTop: 56 }}>
          <p className={`${s.display} ${t.noticeTitle}`}>Comment on compte les points</p>
          <p className={t.noticeText}>
            Openings : chacun classe 3 openings par année. 1er = <b>{PODIUM_POINTS[0]} pts</b>, 2e ={' '}
            <b>{PODIUM_POINTS[1]} pts</b>, 3e = <b>{PODIUM_POINTS[2]} pts</b>.
          </p>
          <p className={t.noticeText}>Animé de l’année : une voix par personne et par année.</p>
        </div>

        {!clos && (
          <div className={s.heroActions} style={{ justifyContent: 'flex-start', marginTop: 40 }}>
            <Link href="/voter" className={`${s.display} ${s.cta}`}>
              <Roll text="Voter" /> <span aria-hidden="true">▶</span>
            </Link>
            <Link href="/mes-votes" className={`${s.osd} ${s.textLink}`}>
              <Roll text="Mes votes" />
            </Link>
          </div>
        )}
      </section>
    </TapePage>
  );
}
