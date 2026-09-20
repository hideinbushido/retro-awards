'use client';

import { useEffect, useState } from 'react';

/**
 * Vrai sur un appareil tactile sans souris précise (téléphone, tablette).
 *
 * Renvoie `null` tant que le composant n’est pas monté côté navigateur : le
 * serveur ne peut pas deviner l’appareil, et rendre la mauvaise interface
 * provoquerait un écart entre le HTML serveur et le HTML client.
 */
export function useIsTouch(): boolean | null {
  const [isTouch, setIsTouch] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(pointer: coarse)');
    const update = () => setIsTouch(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return isTouch;
}
