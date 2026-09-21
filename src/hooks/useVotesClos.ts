'use client';

import { useSyncExternalStore } from 'react';
import { FIN_DES_VOTES, votesClos } from '@/lib/event';

/** setTimeout ne sait pas attendre plus de ~24,8 jours. */
const ATTENTE_MAX = 2_147_000_000;

function surveiller(onChange: () => void) {
  const reste = FIN_DES_VOTES.getTime() - Date.now();
  if (reste <= 0) return () => {};
  // Une page restée ouverte bascule d'elle-même à l'échéance
  const minuterie = setTimeout(onChange, Math.min(reste + 1000, ATTENTE_MAX));
  return () => clearTimeout(minuterie);
}

/**
 * Vrai une fois les votes clos.
 *
 * Les pages sont générées à l'avance : le serveur ne connaît pas l'heure de
 * la visite et rend donc toujours « ouvert ». Le navigateur corrige dès
 * l'hydratation, sans écart signalé par React. C'est le serveur qui fait foi :
 * il refuse tout vote passé l'échéance, quelle que soit l'horloge du visiteur.
 */
export function useVotesClos(): boolean {
  return useSyncExternalStore(surveiller, () => votesClos(), () => false);
}
