/**
 * Accès Firestore côté serveur uniquement (routes /api).
 *
 * Les navigateurs n’écrivent ni ne lisent jamais les votes directement :
 * les règles Firestore bloquent tout accès client (voir firestore.rules).
 *
 * Variables d’environnement attendues :
 *   FIREBASE_PROJECT_ID
 *   FIREBASE_CLIENT_EMAIL
 *   FIREBASE_PRIVATE_KEY      (les \n échappés sont acceptés)
 * ou, au choix :
 *   FIREBASE_SERVICE_ACCOUNT  (le JSON complet de la clé de service)
 */
import { getApps, initializeApp, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';

let app: App | null = null;

/** Vrai si de quoi se connecter à Firestore est présent dans l’environnement. */
export function hasAdminCredentials(): boolean {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) return true;
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY,
  );
}

function credentials() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (raw) {
    const json = JSON.parse(raw);
    return {
      projectId: json.project_id as string,
      clientEmail: json.client_email as string,
      privateKey: (json.private_key as string).replace(/\\n/g, '\n'),
    };
  }
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Firebase admin non configuré : renseigne FIREBASE_SERVICE_ACCOUNT, ' +
        'ou FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY.',
    );
  }
  return { projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, '\n') };
}

export function getAdminDb(): Firestore {
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp({ credential: cert(credentials()) });
  }
  return getFirestore(app);
}
