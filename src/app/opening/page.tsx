import { redirect } from 'next/navigation';

/**
 * L'ancienne liste des années d'une seule catégorie. La page Voter donne
 * désormais chaque année avec ses deux catégories : les anciens liens (menus,
 * mails de rappel) y mènent.
 */
export default function CategoryIndexPage() {
  redirect('/voter');
}
