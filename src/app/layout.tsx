import type { Metadata } from 'next';
import './globals.css';
import { MusicProvider } from '@/contexts/MusicContext';
import EntryTracker from '@/components/EntryTracker';
import Footer from '@/components/Footer';
import { siteUrl } from '@/lib/site';

/** L'adresse publique sert aux liens absolus des aperçus de partage. */
const SITE = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: 'RETRO Awards — Zenkai Hors-Série',
  // L'icône et la vignette viennent de src/app/icon.png et opengraph-image.png
  openGraph: {
    title: 'RETRO Awards — Zenkai Hors-Série',
    description: 'Vote pour le meilleur anime et le meilleur opening de chaque année, de 2005 à 2019.',
    url: SITE,
    siteName: 'Retro Awards',
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RETRO Awards — Zenkai Hors-Série',
    description: 'Vote pour le meilleur anime et le meilleur opening de chaque année, de 2005 à 2019.',
  },
  description: 'Les awards rétro de la communauté Zenkai — Opening & Anime de l\'Année (2005-2019)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <head>
        {/* Preload uniquement la vidéo hero — les autres chargent à la demande */}
        <link rel="preload" href="/Fondaccueil2.mp4" as="video" type="video/mp4" />
      </head>
      <body className="min-h-full flex flex-col">
        <EntryTracker />
        <MusicProvider src="/CRYSTAL.mp3">
          {children}
          <Footer />
        </MusicProvider>
      </body>
    </html>
  );
}
