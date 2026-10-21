import type { ReactNode } from 'react';
import Vcr from '@/components/home/Vcr';
import s from '@/components/home/home.module.css';

/**
 * L'habillage commun des pages : l'affichage du magnétoscope en tête, comme sur
 * l'accueil. La classe `vhs` rhabille aussi les anciens composants partagés
 * (cartes, boutons, titres) : voir globals.css.
 */
export default function TapePage({ children }: { children: ReactNode }) {
  return (
    <div className={`${s.root} vhs`}>
      <Vcr />
      <main>{children}</main>
    </div>
  );
}
