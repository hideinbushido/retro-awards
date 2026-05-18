export type Opening = {
  id: string;
  animeName: string;
  openingTitle: string;
  image: string;
  audio: string;
};

export type Anime = {
  id: string;
  name: string;
  image: string;
};

export type YearNominees = {
  openings: Opening[];
  animes: Anime[];
};

// ─────────────────────────────────────────
// REMPLIS LES DONNÉES ICI POUR CHAQUE ANNÉE
// image: "/nominees/{year}/openings/{id}/cover.jpg"
// audio: "/nominees/{year}/openings/{id}/audio.mp3"
// ─────────────────────────────────────────

export const nominees: Record<number, YearNominees> = {

  2019: {
    openings: [
      // { id: '1', animeName: 'Demon Slayer', openingTitle: 'Gurenge', image: '/nominees/2019/openings/1/cover.jpg', audio: '/nominees/2019/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Demon Slayer', image: '/nominees/2019/animes/1/cover.jpg' },
    ],
  },

  2018: {
    openings: [],
    animes: [],
  },

  2017: {
    openings: [],
    animes: [],
  },

  2016: {
    openings: [],
    animes: [],
  },

  2015: {
    openings: [],
    animes: [],
  },

  2014: {
    openings: [],
    animes: [],
  },

  2013: {
    openings: [],
    animes: [],
  },

  2012: {
    openings: [],
    animes: [],
  },

  2011: {
    openings: [],
    animes: [],
  },

  2010: {
    openings: [],
    animes: [],
  },

  2009: {
    openings: [],
    animes: [],
  },

  2008: {
    openings: [],
    animes: [],
  },

  2007: {
    openings: [],
    animes: [],
  },

  2006: {
    openings: [],
    animes: [],
  },

  2005: {
    openings: [],
    animes: [],
  },
};
