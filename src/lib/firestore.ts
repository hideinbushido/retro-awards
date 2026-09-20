/**
 * Années couvertes par les Retro Awards, de la plus récente à la plus ancienne.
 *
 * Les votes ne passent plus par le SDK Firebase côté navigateur : tout se fait
 * via /api/vote et /api/admin/results, avec le SDK admin (voir firestore.rules).
 */
export const YEARS = Array.from({ length: 15 }, (_, i) => 2019 - i);
