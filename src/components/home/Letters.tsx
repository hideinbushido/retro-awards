import type { CSSProperties } from 'react';
import s from './home.module.css';

const rang = (i: number) => ({ '--i': i }) as CSSProperties;

/** Texte dont les lettres roulent une à une au survol du lien ou du bouton parent. */
export function Roll({ text }: { text: string }) {
  return (
    <span className={s.roll}>
      <span className={s.srOnly}>{text}</span>
      {[...text].map((c, i) => (
        <span key={i} aria-hidden="true" className={s.rollCh} data-c={c} style={rang(i)}>
          {c}
        </span>
      ))}
    </span>
  );
}

/** Texte dont les lettres montent une à une quand un parent <InView> entre à l'écran. */
export function Rise({ text }: { text: string }) {
  let i = 0;
  return (
    <>
      <span className={s.srOnly}>{text}</span>
      {/* Mot par mot : une ligne ne se coupe jamais au milieu d'un mot */}
      {text.split(' ').map((mot, m) => (
        <span key={m} aria-hidden="true" className={s.rise}>
          {[...mot].map((c) => (
            <span key={i} className={s.riseCh} style={rang(i++)}>
              {c}
            </span>
          ))}
          <span className={s.riseCh} style={rang(i)}>{' '}</span>
        </span>
      ))}
    </>
  );
}
