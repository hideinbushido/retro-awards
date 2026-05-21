export type Opening = {
  id: string;
  animeName: string;
  openingTitle: string;
  artist?: string;
  op?: number; // si absent ou 1 → "Opening", sinon → "Opening 2", "Opening 7"...
  image: string;
  audio: string;
};

export type Anime = {
  id: string;
  name: string;
  image: string;
  silhouette?: string;
};

export type YearNominees = {
  openings: Opening[];
  animes: Anime[];
};

// ─────────────────────────────────────────
// REMPLIS LES DONNÉES ICI POUR CHAQUE ANNÉE
// Opening → image: "/{year}/OPENING/Cover/{NOM}.png"
//           audio: "/{year}/OPENING/Audio/{NOM}.mp3"
// Anime   → image:      "/{year}/ANIME/Cover/{NOM}.png"
//           silhouette: "/{year}/ANIME/Silhouette/{NOM}.png"
// ─────────────────────────────────────────

export const nominees: Record<number, YearNominees> = {

  2019: {
    openings: [
      { id: '1',  animeName: 'Fire Force',                    openingTitle: 'Inferno',            artist: 'Mrs. GREEN APPLE',                    image: '/2019/OPENING/Cover/FIRE.png',     audio: '/2019/OPENING/Audio/FIRE.MP3'         },
      { id: '2',  animeName: 'Demon Slayer',                  openingTitle: 'Gurenge',             artist: 'LiSA',                                image: '/2019/OPENING/Cover/DEMON.png',    audio: '/2019/OPENING/Audio/DEMON.MP3'        },
      { id: '3',  animeName: 'Vinland Saga',                  openingTitle: 'MUKANJYO',            artist: 'Survive Said The Prophet',            image: '/2019/OPENING/Cover/VINLAND.png',  audio: '/2019/OPENING/Audio/VINLAND.MP3'      },
      { id: '4',  animeName: 'Dororo',                        openingTitle: 'Kaen',                artist: 'Ziyoou-vachi',                        image: '/2019/OPENING/Cover/DORO.png',     audio: '/2019/OPENING/Audio/DORORO.MP3'       },
      { id: '5',  animeName: 'Dr. Stone',                     openingTitle: 'Good Morning World!', artist: 'BURNOUT SYNDROMES',                   image: '/2019/OPENING/Cover/DRSTO.png',    audio: '/2019/OPENING/Audio/DR STONE.MP3'     },
      { id: '6',  animeName: 'Domestic Girlfriend',           openingTitle: 'Kawaki wo Ameku',     artist: 'Minami',                              image: '/2019/OPENING/Cover/DOMESTIC.png', audio: '/2019/OPENING/Audio/DOMESTIC.MP3'     },
      { id: '7',  animeName: 'Black Clover',                  openingTitle: 'JUSTadICE',           artist: 'Seiko Oomori',         op: 7,         image: '/2019/OPENING/Cover/BLACK.png',    audio: '/2019/OPENING/Audio/BC7.MP3'          },
      { id: '8',  animeName: 'My Hero Academia',              openingTitle: 'Polaris',             artist: 'BLUE ENCOUNT',         op: 6,         image: '/2019/OPENING/Cover/MHA.png',      audio: '/2019/OPENING/Audio/MHA6.MP3'         },
      { id: '9',  animeName: 'One Piece',                     openingTitle: 'OVER THE TOP',        artist: 'Hiroshi Kitadani',     op: 22,        image: '/2019/OPENING/Cover/ONE.png',      audio: '/2019/OPENING/Audio/ONE PIECE.MP3'    },
      { id: '10', animeName: 'Sword Art Online: Alicization', openingTitle: 'ADAMAS',              artist: 'LiSA',                                image: '/2019/OPENING/Cover/SAO.png',      audio: '/2019/OPENING/Audio/SAO.mp3'          },
      { id: '11', animeName: 'Mob Psycho 100',                openingTitle: '99.9',                artist: 'Mob Choir',            op: 2,         image: '/2019/OPENING/Cover/MOB.png',      audio: '/2019/OPENING/Audio/MOB.MP3'          },
      { id: '12', animeName: 'Kaguya-sama: Love Is War',      openingTitle: 'Love Dramatic',       artist: 'Masayuki Suzuki feat. Rikka Ihara',   image: '/2019/OPENING/Cover/KAGUYA.png',   audio: '/2019/OPENING/Audio/KAGUYA.MP3'       },
      { id: '13', animeName: 'The Promised Neverland',        openingTitle: 'Touch Off',           artist: 'UVERworld',                           image: '/2019/OPENING/Cover/PROMISED.png', audio: '/2019/OPENING/Audio/PROMISED.MP3'     },
    ],
    animes: [
      // { id: '1', name: 'Demon Slayer', image: '/nominees/2019/animes/1/cover.jpg' },
    ],
  },

  2018: {
    openings: [
      { id: '1',  animeName: 'Gintama',                                openingTitle: 'I Wanna Be...',   artist: 'SPYAIR',                              op: 21, image: '/2018/OPENING/Cover/GINTAMA.png',    audio: '/2018/OPENING/Audio/GIN.MP3'          },
      { id: '2',  animeName: 'Black Clover',                          openingTitle: 'Black Rover',     artist: 'Vickeblanka',                         op: 3,  image: '/2018/OPENING/Cover/BLACK.png',      audio: '/2018/OPENING/Audio/BC3.MP3'          },
      { id: '3',  animeName: 'My Hero Academia',                      openingTitle: 'ODD FUTURE',      artist: 'UVERworld',                           op: 4,  image: '/2018/OPENING/Cover/MHA.png',        audio: '/2018/OPENING/Audio/MHA4.MP3'         },
      { id: '4',  animeName: 'Overlord',                              openingTitle: 'VORACITY',        artist: 'MYTH & ROID',                         op: 3,  image: '/2018/OPENING/Cover/OVERLORD.png',   audio: '/2018/OPENING/Audio/OVERLORD.MP3'     },
      { id: '5',  animeName: 'Wotakoi',                               openingTitle: 'Fiction',         artist: 'sumika',                                      image: '/2018/OPENING/Cover/WOTA.png',       audio: '/2018/OPENING/Audio/WOTAKOI.MP3'      },
      { id: '6',  animeName: 'Tokyo Ghoul:re',                        openingTitle: 'asphyxia',        artist: 'Cö shu Nie',                                  image: '/2018/OPENING/Cover/TOKYOG.png',     audio: '/2018/OPENING/Audio/TOKYO.MP3'        },
      { id: '7',  animeName: 'Kokkoku',                               openingTitle: 'Flashback',       artist: 'MIYAVI feat. KenKen',                         image: '/2018/OPENING/Cover/KOKKOKU.png',    audio: '/2018/OPENING/Audio/KOKKOKU.MP3'      },
      { id: '8',  animeName: 'That Time I Got Reincarnated as Slime', openingTitle: 'Nameless Story',  artist: 'Takuma Terashima',                            image: '/2018/OPENING/Cover/SLIME.png',      audio: '/2018/OPENING/Audio/SLIME.MP3'        },
      { id: '9',  animeName: 'Food Wars!',                            openingTitle: 'Symbol',          artist: 'Luck Life',                           op: 5,  image: '/2018/OPENING/Cover/FOOD.png',       audio: '/2018/OPENING/Audio/FOOD.MP3'         },
      { id: '10', animeName: 'JoJo\'s Bizarre Adventure',             openingTitle: 'Fighting Gold',   artist: 'Coda',                                op: 8,  image: '/2018/OPENING/Cover/JOJO.png',       audio: '/2018/OPENING/Audio/FIGHTINGGOLD.MP3' },
      { id: '11', animeName: 'Steins;Gate 0',                         openingTitle: 'Fatima',          artist: 'Kanako Itō',                                  image: '/2018/OPENING/Cover/STEINS0.png',    audio: '/2018/OPENING/Audio/STEINS.MP3'       },
      { id: '12', animeName: 'Attack on Titan',                       openingTitle: 'Red Swan',        artist: 'Yoshiki feat. Hyde',                  op: 4,  image: '/2018/OPENING/Cover/SNK.png',        audio: '/2018/OPENING/Audio/SNK4.MP3'         },
      { id: '13', animeName: 'Grand Blue',                            openingTitle: 'Grand Blue',      artist: 'Shōnan no Kaze feat. Atarashii Gakkou!',      image: '/2018/OPENING/Cover/GRANDBLUE.png',  audio: '/2018/OPENING/Audio/GRANDBLUE.MP3'    },
    ],
    animes: [
      // { id: '1', name: 'Sword Art Online', image: '/2018/ANIME/Cover/SAO.png', silhouette: '/2018/ANIME/Silhouette/SAO.png' },
    ],
  },

  2017: {
    openings: [
      { id: '1',  animeName: 'My Hero Academia',                              openingTitle: 'Peace Sign',              artist: 'Kenshi Yonezu',             op: 2,  image: '/2017/OPENING/Cover/MHA.png',       audio: '/2017/OPENING/Audio/MHA2.MP3'      },
      { id: '2',  animeName: 'Welcome to the Ballroom',                       openingTitle: '10% roll, 10% romance',  artist: 'UNISON SQUARE GARDEN',              image: '/2017/OPENING/Cover/BALLROOM.png',  audio: '/2017/OPENING/Audio/BALLROOM.MP3'  },
      { id: '3',  animeName: 'Fate/Apocrypha',                                openingTitle: 'ASH',                    artist: 'LiSA',                      op: 2,  image: '/2017/OPENING/Cover/APOCRYPHA.png', audio: '/2017/OPENING/Audio/APOCRYPHA.MP3' },
      { id: '4',  animeName: 'Attack on Titan',                               openingTitle: 'Shinzou wo Sasageyo!',   artist: 'Linked Horizon',            op: 3,  image: '/2017/OPENING/Cover/SNK.png',        audio: '/2017/OPENING/Audio/SNK.mp3'        },
      { id: '5',  animeName: 'Blue Exorcist',                                 openingTitle: 'SCOREBOOK',              artist: 'Rin Akatsuki',              op: 3,  image: '/2017/OPENING/Cover/BLUEEXO.png',    audio: '/2017/OPENING/Audio/BLUEEXO.mp3'    },
      { id: '6',  animeName: 'Boruto: Naruto Next Generations',               openingTitle: 'OVER',                   artist: 'Little Glee Monster',       op: 2,  image: '/2017/OPENING/Cover/BORUTO.png',     audio: '/2017/OPENING/Audio/BORUTO.mp3'     },
      { id: '7',  animeName: 'One Piece',                                     openingTitle: 'Hope',                   artist: 'Namie Amuro',               op: 20, image: '/2017/OPENING/Cover/ONEPICE.png',    audio: '/2017/OPENING/Audio/ONEPICE.mp3'    },
      { id: '8',  animeName: 'Saga of Tanya the Evil',                        openingTitle: 'JINGO JUNGLE',           artist: 'MYTH & ROID',                       image: '/2017/OPENING/Cover/YOUJO.png',      audio: '/2017/OPENING/Audio/YOUJO.mp3'      },
      { id: '9',  animeName: 'Twin Star Exorcists',                           openingTitle: 'Kanadeai',               artist: 'Itowokoashi',               op: 4,  image: '/2017/OPENING/Cover/TWINSTAR.png',   audio: '/2017/OPENING/Audio/TWINSTAR.mp3'   },
      { id: '10', animeName: 'Dragon Ball Super',                             openingTitle: 'Limit-Break x Survivor', artist: 'Kiyoshi Hikawa',            op: 2,  image: '/2017/OPENING/Cover/DBS.png',        audio: '/2017/OPENING/Audio/DBS.mp3'        },
      { id: '11', animeName: 'Rokudenashi Majutsu Koushi to Akashic Records', openingTitle: 'Blow out',               artist: 'Konomi Suzuki',                     image: '/2017/OPENING/Cover/ROKUDENA.png',   audio: '/2017/OPENING/Audio/ROKUDENA.mp3'   },
      { id: '12', animeName: 'KonoSuba',                                      openingTitle: 'Tomorrow',               artist: 'Machico',                           image: '/2017/OPENING/Cover/KONOSUBA.png',   audio: '/2017/OPENING/Audio/KONOSUBA.mp3'   },
      { id: '13', animeName: 'Made in Abyss',                                 openingTitle: 'Deep in Abyss',          artist: 'Miyu Tomita & Mariya Ise',          image: '/2017/OPENING/Cover/MADE.png',       audio: '/2017/OPENING/Audio/MADE.mp3'       },
      { id: '14', animeName: 'Black Clover',                                  openingTitle: 'Haruka Mirai',           artist: 'Kankaku Piero',                     image: '/2017/OPENING/Cover/BLACK.png',      audio: '/2017/OPENING/Audio/BLACK.mp3'      },
      { id: '15', animeName: 'Kakegurui',                                     openingTitle: 'Deal with the devil',    artist: 'Tia',                               image: '/2017/OPENING/Cover/KAKEGURUI.png',  audio: '/2017/OPENING/Audio/KAKEGURUI.mp3'  },
      { id: '16', animeName: 'Naruto Shippuden',                              openingTitle: 'Kara na Kokoro',         artist: 'Anly',                      op: 20, image: '/2017/OPENING/Cover/NARUTO.png',     audio: '/2017/OPENING/Audio/NARUTO.mp3'     },
    ],
    animes: [
      // { id: '1', name: 'My Hero Academia', image: '/2017/ANIME/Cover/MHA.png', silhouette: '/2017/ANIME/Silhouette/MHA.png' },
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
