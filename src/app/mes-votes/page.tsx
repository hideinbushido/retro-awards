'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PODIUM_POINTS } from '@/lib/votes';
import { YEARS } from '@/lib/firestore';
import { useVoterGate } from '@/components/VoterGate';
import ZenkaiSpinner from '@/components/ZenkaiSpinner';
import TapePage from '@/components/tape/TapePage';
import InView from '@/components/home/InView';
import { Rise, Roll } from '@/components/home/Letters';
import s from '@/components/home/home.module.css';
import t from '@/components/tape/tape.module.css';
import { CALENDRIER_PHRASE } from '@/lib/event';
import type { RecapEntry } from '@/app/api/voter/recap/route';

type Recap = {
  voter: { pseudo: string; email: string } | null;
  years: RecapEntry[];
  mail: boolean;
};

const RANG = ['1er', '2e', '3e'];

/**
 * Récapitulatif personnel : ce que j’ai voté, année par année.
 *
 * Rien ici n’est un résultat : on ne montre que les bulletins de la personne,
 * jamais les totaux, qui restent scellés jusqu’à la clôture.
 */
export default function MesVotesPage() {
  const [recap, setRecap] = useState<Recap | null>(null);
  const [mailState, setMailState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [mailError, setMailError] = useState<string | null>(null);
  const { gate, ask } = useVoterGate();

  useEffect(() => {
    let alive = true;
    fetch('/api/voter/recap')
      .then((r) => (r.ok ? r.json() : { voter: null, years: [], mail: false }))
      .then((data) => { if (alive) setRecap(data as Recap); })
      .catch(() => { if (alive) setRecap({ voter: null, years: [], mail: false }); });
    return () => { alive = false; };
  }, []);

  async function sendRecap() {
    if (mailState === 'sending') return;
    setMailState('sending');
    setMailError(null);
    try {
      const res = await fetch('/api/voter/recap', { method: 'POST' });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setMailState('sent');
      else { setMailError(data.error ?? 'Le mail n’a pas pu partir.'); setMailState('idle'); }
    } catch {
      setMailError('Connexion impossible.');
      setMailState('idle');
    }
  }

  const years = recap?.years ?? [];
  const animeCount = years.filter((y) => y.anime).length;
  const openingCount = years.filter((y) => y.podium.length).length;
  const remaining = YEARS.filter((y) => {
    const entry = years.find((e) => e.year === y);
    return !entry || !entry.anime || !entry.podium.length;
  });

  return (
    <TapePage>
      {gate}
      <header className={t.head}>
        <InView>
          <p className={`${s.osd} ${s.kicker}`}>
            <span className={s.recDot} />Tes bulletins
          </p>
          <h1 className={`${s.display} ${t.title}`}>
            <Rise text="Mes votes" />
          </h1>
          {recap?.voter && (
            <p className={`${s.osd} ${t.who}`}>
              {recap.voter.pseudo} · {recap.voter.email}
            </p>
          )}
          {recap && years.length > 0 && (
            <p className={t.lede}>
              <b>{animeCount}</b> animé{animeCount > 1 ? 's' : ''} et <b>{openingCount}</b> podium{openingCount > 1 ? 's' : ''} d’openings
              sur {YEARS.length} années. Résultats en live {CALENDRIER_PHRASE}.
            </p>
          )}
        </InView>
        {recap?.mail && years.length > 0 && (
          <div className={t.keys} style={{ marginTop: 22 }}>
            <button onClick={sendRecap} disabled={mailState !== 'idle'} className={t.key} data-on={mailState === 'sent' ? '1' : undefined}>
              {mailState === 'sent' ? '✓ Envoyé' : mailState === 'sending' ? 'Envoi…' : '✉ Recevoir par mail'}
            </button>
          </div>
        )}
        {mailError && <p className={`${s.osd} ${t.error}`}>{mailError}</p>}
      </header>

      <section className={t.body}>
        {!recap && <ZenkaiSpinner label="Chargement de tes votes" />}

        {recap && !years.length && (
          <div className={t.notice}>
            <p className={`${s.display} ${t.noticeTitle}`}>Rien pour l’instant</p>
            <p className={t.noticeText}>Tes votes apparaîtront ici, année par année, dès que tu auras commencé.</p>
            <div className={t.keys}>
              <Link href="/voter" className={t.key} data-on="1">▶ Commencer à voter</Link>
            </div>
            <p className={t.noticeText} style={{ marginTop: 14 }}>
              Tu as déjà voté sur un autre appareil ? Remets la même adresse mail et tu retrouves tout.
            </p>
            <div className={t.keys}>
              <button onClick={() => ask(() => window.location.reload())} className={t.key}>
                Retrouver mes votes
              </button>
            </div>
          </div>
        )}

        {recap && years.length > 0 && (
          <>
            <div className={t.rows}>
              {years.map((entry) => (
                <article key={entry.year} className={t.recap}>
                  <div className={t.recapHead}>
                    <h2 className={`${s.display} ${t.rowYear}`}>{entry.year}</h2>
                    <Link href={`/annee/${entry.year}`} className={`${s.osd} ${t.rowLink}`}>
                      <Roll text="Revoir l’année" />
                    </Link>
                  </div>

                  <div className={t.recapCols}>
                    <div>
                      <p className={`${s.osd} ${t.recapLabel}`}>Animé</p>
                      {entry.anime ? (
                        <>
                          {entry.anime.image && (
                            <div className={t.thumb} style={{ aspectRatio: '2 / 3' }}>
                              <Image src={entry.anime.image} alt="" fill sizes="(max-width: 900px) 25vw, 160px" style={{ objectPosition: '50% 75%' }} />
                            </div>
                          )}
                          <p className={`${s.display} ${t.recapName}`}>{entry.anime.label}</p>
                        </>
                      ) : (
                        <Link href={`/anime/${entry.year}`} className={`${s.osd} ${t.recapEmpty}`}>
                          Pas encore voté ▶
                        </Link>
                      )}
                    </div>

                    <div>
                      <p className={`${s.osd} ${t.recapLabel}`}>Podium des openings</p>
                      {entry.podium.length ? (
                        <div className={t.recapPodium}>
                          {entry.podium.map((op, rank) => (
                            <div key={op.id} style={{ minWidth: 0 }}>
                              {op.image && (
                                <div className={t.thumb} style={{ aspectRatio: '3 / 4' }}>
                                  <Image src={op.image} alt="" fill sizes="(max-width: 900px) 25vw, 160px" />
                                  <span className={t.badge}>{RANG[rank]}</span>
                                </div>
                              )}
                              <p className={`${s.display} ${t.recapName}`}>{op.sub}</p>
                              <p className={`${s.osd} ${t.recapSub}`}>{op.label}</p>
                              <p className={`${s.osd} ${t.recapPts}`}>{PODIUM_POINTS[rank]} pts</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <Link href={`/opening/${entry.year}`} className={`${s.osd} ${t.recapEmpty}`}>
                          Pas encore classé ▶
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {remaining.length > 0 && (
              <div className={t.notice} style={{ marginTop: 40 }}>
                <p className={`${s.display} ${t.noticeTitle}`}>Il te reste ces années</p>
                <div className={t.keys}>
                  {remaining.map((y) => (
                    <Link key={y} href={`/annee/${y}`} className={t.key}>{y}</Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </TapePage>
  );
}
