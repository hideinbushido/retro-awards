'use client';

import { useEffect } from 'react';

export const ENTRY_KEY = 'retro_entry';

export type Entry = { referrer: string; landing: string };

/**
 * Retient par où la personne est entrée sur le site.
 *
 * Il faut le faire dès la toute première page : une fois qu’on navigue en
 * interne, la page d’arrivée est perdue et le référent ne dit plus rien. La
 * valeur dort dans la session du navigateur jusqu’à l’inscription, et n’est
 * envoyée qu’à ce moment-là.
 */
export default function EntryTracker() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(ENTRY_KEY)) return;
      const entry: Entry = { referrer: document.referrer, landing: window.location.pathname };
      sessionStorage.setItem(ENTRY_KEY, JSON.stringify(entry));
    } catch {
      // Navigation privée ou stockage refusé : on s’en passe.
    }
  }, []);

  return null;
}

export function readEntry(): Entry {
  try {
    const stored = sessionStorage.getItem(ENTRY_KEY);
    if (stored) return JSON.parse(stored) as Entry;
  } catch {}
  return { referrer: typeof document === 'undefined' ? '' : document.referrer, landing: '/' };
}
