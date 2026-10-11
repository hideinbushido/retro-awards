import { redirect } from 'next/navigation';
import { YEARS } from '@/lib/firestore';

/** La galerie s'ouvre sur l'année la plus récente : on remonte ensuite le temps. */
export default function NominesPage() {
  redirect(`/nomines/${YEARS[0]}`);
}
