import type { Metadata } from 'next';
import './globals.css';
import { MusicProvider } from '@/contexts/MusicContext';

export const metadata: Metadata = {
  title: 'RETRO Awards — Zenkai Hors-Série',
  description: 'Les awards rétro de la communauté Zenkai — Opening & Anime de l\'Année (2005-2019)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full">
      <head>
        {/* Preload des vidéos critiques */}
        <link rel="preload" href="/Fondaccueil2.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/Fondaccueil1.mp4" as="video" type="video/mp4" />
        <link rel="preload" href="/timetravel.mp4"   as="video" type="video/mp4" />
        <link rel="preload" href="/THEME SITE.mp3"   as="audio" type="audio/mpeg" />
      </head>
      <body className="min-h-full flex flex-col">
        <MusicProvider src="/THEME SITE.mp3">
          {children}
        </MusicProvider>
      </body>
    </html>
  );
}
