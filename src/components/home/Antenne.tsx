'use client';

import { FIN_DES_VOTES_TEXTE, LIVES } from '@/lib/event';
import { LiveLinks } from '@/components/LiveSchedule';
import { useVotesClos } from '@/hooks/useVotesClos';
import InView from './InView';
import { Rise } from './Letters';
import s from './home.module.css';

/** Le calendrier, présenté comme une grille de programmes télé. */
export default function Antenne() {
  const clos = useVotesClos();

  return (
    <section className={s.section} style={{ background: 'var(--bg2)' }}>
      <InView>
        <p className={`${s.osd} ${s.kicker}`}>
          <span className={s.recDot} />À l’antenne
        </p>
        <h2 className={`${s.display} ${s.statement}`} style={{ maxWidth: '18ch' }}>
          <Rise text="Les résultats tombent en live" />
        </h2>

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
      </InView>
    </section>
  );
}
