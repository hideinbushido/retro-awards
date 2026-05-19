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
// image: "/{year}/OPENING/Cover/{NOM}.png"
// audio: "/{year}/OPENING/Audio/{NOM}.mp3"
// ─────────────────────────────────────────

export const nominees: Record<number, YearNominees> = {

  2019: {
    openings: [
      { id: '1',  animeName: 'Fire Force',                    openingTitle: 'Inferno',            image: '/2019/OPENING/Cover/FIRE.png',     audio: '/2019/OPENING/Audio/FIRE.mp3'     },
      { id: '2',  animeName: 'Demon Slayer',                  openingTitle: 'Gurenge',             image: '/2019/OPENING/Cover/DEMON.png',    audio: '/2019/OPENING/Audio/DEMON.mp3'    },
      { id: '3',  animeName: 'Vinland Saga',                  openingTitle: 'MUKANJYO',            image: '/2019/OPENING/Cover/VINLAND.png',  audio: '/2019/OPENING/Audio/VINLAND.mp3'  },
      { id: '4',  animeName: 'Dororo',                        openingTitle: 'Kaen',                image: '/2019/OPENING/Cover/DORO.png',     audio: '/2019/OPENING/Audio/DORO.mp3'     },
      { id: '5',  animeName: 'Dr. Stone',                     openingTitle: 'Good Morning World!', image: '/2019/OPENING/Cover/DRSTO.png',    audio: '/2019/OPENING/Audio/DRSTO.mp3'    },
      { id: '6',  animeName: 'Domestic Girlfriend',           openingTitle: 'Kawaki wo Ameku',     image: '/2019/OPENING/Cover/DOMESTIC.png', audio: '/2019/OPENING/Audio/DOMESTIC.mp3' },
      { id: '7',  animeName: 'Black Clover',                  openingTitle: 'JUSTadICE',           image: '/2019/OPENING/Cover/BLACK.png',    audio: '/2019/OPENING/Audio/BLACK.mp3'    },
      { id: '8',  animeName: 'My Hero Academia',              openingTitle: 'Polaris',             image: '/2019/OPENING/Cover/MHA.png',      audio: '/2019/OPENING/Audio/MHA.mp3'      },
      { id: '9',  animeName: 'One Piece',                     openingTitle: 'OVER THE TOP',        image: '/2019/OPENING/Cover/ONE.png',      audio: '/2019/OPENING/Audio/ONE.mp3'      },
      { id: '10', animeName: 'Sword Art Online: Alicization', openingTitle: 'ADAMAS',              image: '/2019/OPENING/Cover/SAO.png',      audio: '/2019/OPENING/Audio/SAO.mp3'      },
      { id: '11', animeName: 'Mob Psycho 100',                openingTitle: '99.9',                image: '/2019/OPENING/Cover/MOB.png',      audio: '/2019/OPENING/Audio/MOB.mp3'      },
      { id: '12', animeName: 'Kaguya-sama: Love Is War',      openingTitle: 'Love Dramatic',       image: '/2019/OPENING/Cover/KAGUYA.png',   audio: '/2019/OPENING/Audio/KAGUYA.mp3'   },
      { id: '13', animeName: 'The Promised Neverland',        openingTitle: 'Touch Off',           image: '/2019/OPENING/Cover/PROMISED.png', audio: '/2019/OPENING/Audio/PROMISED.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Demon Slayer', image: '/nominees/2019/animes/1/cover.jpg' },
    ],
  },

  2018: {
    openings: [
      // { id: '1', animeName: 'Sword Art Online', openingTitle: 'Crossing Field', image: '/nominees/2018/openings/1/cover.jpg', audio: '/nominees/2018/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Sword Art Online', image: '/nominees/2018/animes/1/cover.jpg' },
    ],
  },

  2017: {
    openings: [
      // { id: '1', animeName: 'My Hero Academia', openingTitle: 'The Day', image: '/nominees/2017/openings/1/cover.jpg', audio: '/nominees/2017/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'My Hero Academia', image: '/nominees/2017/animes/1/cover.jpg' },
    ],
  },

  2016: {
    openings: [
      // { id: '1', animeName: 'Re:Zero', openingTitle: 'Redo', image: '/nominees/2016/openings/1/cover.jpg', audio: '/nominees/2016/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Re:Zero', image: '/nominees/2016/animes/1/cover.jpg' },
    ],
  },

  2015: {
    openings: [
      // { id: '1', animeName: 'One Punch Man', openingTitle: 'The Hero', image: '/nominees/2015/openings/1/cover.jpg', audio: '/nominees/2015/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'One Punch Man', image: '/nominees/2015/animes/1/cover.jpg' },
    ],
  },

  2014: {
    openings: [
      // { id: '1', animeName: 'Sword Art Online II', openingTitle: 'Ignite', image: '/nominees/2014/openings/1/cover.jpg', audio: '/nominees/2014/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Sword Art Online II', image: '/nominees/2014/animes/1/cover.jpg' },
    ],
  },

  2013: {
    openings: [
      // { id: '1', animeName: 'Attack on Titan', openingTitle: 'Guren no Yumiya', image: '/nominees/2013/openings/1/cover.jpg', audio: '/nominees/2013/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Attack on Titan', image: '/nominees/2013/animes/1/cover.jpg' },
    ],
  },

  2012: {
    openings: [
      // { id: '1', animeName: 'Sword Art Online', openingTitle: 'Crossing Field', image: '/nominees/2012/openings/1/cover.jpg', audio: '/nominees/2012/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Sword Art Online', image: '/nominees/2012/animes/1/cover.jpg' },
    ],
  },

  2011: {
    openings: [
      // { id: '1', animeName: 'Fairy Tail', openingTitle: 'Snow Fairy', image: '/nominees/2011/openings/1/cover.jpg', audio: '/nominees/2011/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Fairy Tail', image: '/nominees/2011/animes/1/cover.jpg' },
    ],
  },

  2010: {
    openings: [
      // { id: '1', animeName: 'Fullmetal Alchemist: Brotherhood', openingTitle: 'Again', image: '/nominees/2010/openings/1/cover.jpg', audio: '/nominees/2010/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Fullmetal Alchemist: Brotherhood', image: '/nominees/2010/animes/1/cover.jpg' },
    ],
  },

  2009: {
    openings: [
      // { id: '1', animeName: 'Naruto Shippuden', openingTitle: 'Heroes Come Back', image: '/nominees/2009/openings/1/cover.jpg', audio: '/nominees/2009/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Naruto Shippuden', image: '/nominees/2009/animes/1/cover.jpg' },
    ],
  },

  2008: {
    openings: [
      // { id: '1', animeName: 'Code Geass R2', openingTitle: 'Colors', image: '/nominees/2008/openings/1/cover.jpg', audio: '/nominees/2008/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Code Geass R2', image: '/nominees/2008/animes/1/cover.jpg' },
    ],
  },

  2007: {
    openings: [
      // { id: '1', animeName: 'Gurren Lagann', openingTitle: 'Sorairo Days', image: '/nominees/2007/openings/1/cover.jpg', audio: '/nominees/2007/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Gurren Lagann', image: '/nominees/2007/animes/1/cover.jpg' },
    ],
  },

  2006: {
    openings: [
      // { id: '1', animeName: 'Code Geass', openingTitle: 'Colors', image: '/nominees/2006/openings/1/cover.jpg', audio: '/nominees/2006/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Code Geass', image: '/nominees/2006/animes/1/cover.jpg' },
    ],
  },

  2005: {
    openings: [
      // { id: '1', animeName: 'Fullmetal Alchemist', openingTitle: 'Melissa', image: '/nominees/2005/openings/1/cover.jpg', audio: '/nominees/2005/openings/1/audio.mp3' },
    ],
    animes: [
      // { id: '1', name: 'Fullmetal Alchemist', image: '/nominees/2005/animes/1/cover.jpg' },
    ],
  },
};
