export const TEASER_MODE = false;

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
  silhouette?: string | string[]; // string[] → un perso est tiré au hasard à chaque passage dans le carousel
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
      { id: '10', animeName: 'Sword Art Online: Alicization', openingTitle: 'ADAMAS',              artist: 'LiSA',                                image: '/2019/OPENING/Cover/SAO.png',      audio: '/2019/OPENING/Audio/SAOA.MP3'         },
      { id: '11', animeName: 'Mob Psycho 100',                openingTitle: '99.9',                artist: 'Mob Choir',            op: 2,         image: '/2019/OPENING/Cover/MOB.png',      audio: '/2019/OPENING/Audio/MOB.MP3'          },
      { id: '12', animeName: 'Kaguya-sama: Love Is War',      openingTitle: 'Love Dramatic',       artist: 'Masayuki Suzuki feat. Rikka Ihara',   image: '/2019/OPENING/Cover/KAGUYA.png',   audio: '/2019/OPENING/Audio/KAGUYA.MP3'       },
      { id: '13', animeName: 'The Promised Neverland',        openingTitle: 'Touch Off',           artist: 'UVERworld',                           image: '/2019/OPENING/Cover/PROMISED.png', audio: '/2019/OPENING/Audio/PROMISED.MP3'     },
      { id: '15', animeName: 'The Rising of the Shield Hero', openingTitle: 'FAITH',               artist: 'MADKID',               op: 2,         image: '/2019/OPENING/Cover/SHIELD.png',   audio: '/2019/OPENING/Audio/RISING.MP3'       },
      { id: '16', animeName: 'BEASTARS',                      openingTitle: 'Wild Side',           artist: 'ALI',                                 image: '/2019/OPENING/Cover/BEASTAR.png',  audio: '/2019/OPENING/Audio/BEASTARS.MP3'     },
    ],
    animes: [
      {
        id: '1',
        name: 'Demon Slayer',
        image: '/2019/ANIME/Cover/Demon_Slayer.jpg',
        silhouette: Array.from({ length: 13 }, (_, i) => `/2019/ANIME/Silhouette/Demon Slayer/${i + 1}.png`),
      },
      {
        id: '2',
        name: 'Attack on Titan: Season 3 Part 2 — Return to Shiganshina',
        image: '/2019/ANIME/Cover/SNK.jpg',
        silhouette: Array.from({ length: 10 }, (_, i) => `/2019/ANIME/Silhouette/SNK/${15 + i}.png`),
      },
      {
        id: '3',
        name: 'Cop Craft',
        image: '/2019/ANIME/Cover/COP.jpg',
        silhouette: Array.from({ length: 6 }, (_, i) => `/2019/ANIME/Silhouette/Cop Craft/${54 + i}.png`),
      },
      {
        id: '4',
        name: 'Carole & Tuesday',
        image: '/2019/ANIME/Cover/Carole & Tuesday.jpg',
        silhouette: Array.from({ length: 6 }, (_, i) => `/2019/ANIME/Silhouette/Carole and Tuesday/${47 + i}.png`),
      },
      {
        id: '5',
        name: 'BEASTARS',
        image: '/2019/ANIME/Cover/Beastar.jpg',
        silhouette: Array.from({ length: 8 }, (_, i) => `/2019/ANIME/Silhouette/Beastars/${26 + i}.png`),
      },
      {
        id: '6',
        name: 'Bungo Stray Dogs',
        image: '/2019/ANIME/Cover/Bungo.jpg',
        silhouette: Array.from({ length: 11 }, (_, i) => `/2019/ANIME/Silhouette/Bungou Stray Dogs/${35 + i}.png`),
      },
      {
        id: '7',
        name: 'Dororo',
        image: '/2019/ANIME/Cover/Dororo.jpg',
        silhouette: Array.from({ length: 5 }, (_, i) => `/2019/ANIME/Silhouette/Dororo/${61 + i}.png`),
      },
      {
        id: '8',
        name: 'Dr. Stone',
        image: '/2019/ANIME/Cover/Stone.jpg',
        silhouette: Array.from({ length: 9 }, (_, i) => `/2019/ANIME/Silhouette/Dr.Stone/${67 + i}.png`),
      },
      {
        id: '9',
        name: 'Fire Force',
        image: '/2019/ANIME/Cover/FireForce.jpg',
        silhouette: Array.from({ length: 11 }, (_, i) => `/2019/ANIME/Silhouette/Fire Force/${77 + i}.png`),
      },
      {
        id: '10',
        name: 'Kaguya-sama: Love Is War',
        image: '/2019/ANIME/Cover/Kaguya.jpg',
        silhouette: Array.from({ length: 7 }, (_, i) => `/2019/ANIME/Silhouette/Kaguya-Sama/${88 + i}.png`),
      },
      {
        id: '11',
        name: 'Mob Psycho 100',
        image: '/2019/ANIME/Cover/mob2.jpg',
        silhouette: Array.from({ length: 9 }, (_, i) => `/2019/ANIME/Silhouette/Mob 2/${96 + i}.png`),
      },
      {
        id: '12',
        name: 'My Hero Academia',
        image: '/2019/ANIME/Cover/mha.jpg',
        silhouette: Array.from({ length: 8 }, (_, i) => `/2019/ANIME/Silhouette/My Hero Academia/${106 + i}.png`),
      },
      {
        id: '13',
        name: 'One Piece',
        image: '/2019/ANIME/Cover/one.jpg',
        silhouette: [
          '/2019/ANIME/Silhouette/One Piece/227775ad19bd1d296d5673bb248d5cd2.jpg',
          '/2019/ANIME/Silhouette/One Piece/3e8f6b328997d56b0502d52ce49d5e80.jpg',
          '/2019/ANIME/Silhouette/One Piece/72c194028cdae2fc6435e3696c38fde7.jpg',
          '/2019/ANIME/Silhouette/One Piece/7d28aedb96f0d01cad35c2e5bf25da81.jpg',
          '/2019/ANIME/Silhouette/One Piece/7dc10571eb1e1d8238889153179d5008.jpg',
          '/2019/ANIME/Silhouette/One Piece/90e94432b00fca9357a26479a502442e.jpg',
          '/2019/ANIME/Silhouette/One Piece/94f78e8c2efe7afe0e64c1ec9f70acaa.jpg',
          '/2019/ANIME/Silhouette/One Piece/99b4334f9042a1e27937a0a3adaa1f3d.jpg',
          '/2019/ANIME/Silhouette/One Piece/cb00e97b413c76d2b86ba4b348bd9e7b.jpg',
          '/2019/ANIME/Silhouette/One Piece/cbe6c745c9e44460db7c21e1649e75a1.jpg',
          '/2019/ANIME/Silhouette/One Piece/cd9628cb252605cc6e49ae2ef773b62d.jpg',
          '/2019/ANIME/Silhouette/One Piece/d940555ba716a0e7d92256c3b060ff43.jpg',
          '/2019/ANIME/Silhouette/One Piece/da5e6fa8d480e801f5f88aec8527901d.jpg',
          '/2019/ANIME/Silhouette/One Piece/e93845e65e27e50c86ae77e139ffe6be.jpg',
          '/2019/ANIME/Silhouette/One Piece/f33d094a3181e86c9472d6c5194d8219.jpg',
        ],
      },
      {
        id: '14',
        name: 'The Promised Neverland',
        image: '/2019/ANIME/Cover/promised.jpg',
        silhouette: Array.from({ length: 10 }, (_, i) => `/2019/ANIME/Silhouette/Promised Neverland/${132 + i}.png`),
      },
      {
        id: '15',
        name: 'Sword Art Online: Alicization',
        image: '/2019/ANIME/Cover/SAO Alicization.jpg',
        silhouette: Array.from({ length: 6 }, (_, i) => `/2019/ANIME/Silhouette/Sao Alicization/${143 + i}.png`),
      },
      {
        id: '16',
        name: 'Vinland Saga',
        image: '/2019/ANIME/Cover/vinland saga.jpg',
        silhouette: Array.from({ length: 7 }, (_, i) => `/2019/ANIME/Silhouette/Vinland Saga/${150 + i}.png`),
      },
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
      { id: '14', animeName: 'Nanatsu no Taizai',                   openingTitle: 'Ame ga Furu kara Niji ga Deru', artist: 'Sky Peace',            op: 5,  image: '/2018/OPENING/Cover/NNT.png',        audio: '/2018/OPENING/Audio/NANATSU5.MP3'     },
      { id: '15', animeName: 'Fate/EXTRA Last Encore',              openingTitle: 'Bright Burning Shout',          artist: 'Takanori Nishikawa',                  image: '/2018/OPENING/Cover/FATELAST.jpg',   audio: '/2018/OPENING/Audio/FATEEXTRA.MP3'     },
    ],
    animes: [
      // { id: '1', name: 'Sword Art Online', image: '/2018/ANIME/Cover/SAO.png', silhouette: '/2018/ANIME/Silhouette/SAO.png' },
    ],
  },

  2017: {
    openings: [
      { id: '1',  animeName: 'My Hero Academia',                              openingTitle: 'Peace Sign',              artist: 'Kenshi Yonezu',             op: 2,  image: '/2017/OPENING/Cover/MHA2.jpg',      audio: '/2017/OPENING/Audio/MHA2.MP3'      },
      { id: '2',  animeName: 'Welcome to the Ballroom',                       openingTitle: '10% roll, 10% romance',  artist: 'UNISON SQUARE GARDEN',              image: '/2017/OPENING/Cover/BALLROOM.png',  audio: '/2017/OPENING/Audio/BALLROOM.MP3'  },
      { id: '3',  animeName: 'Fate/Apocrypha',                                openingTitle: 'ASH',                    artist: 'LiSA',                      op: 2,  image: '/2017/OPENING/Cover/APOCRYPHA.png', audio: '/2017/OPENING/Audio/APOCRYPHA.MP3' },
      { id: '4',  animeName: 'Attack on Titan',                               openingTitle: 'Shinzou wo Sasageyo!',   artist: 'Linked Horizon',            op: 3,  image: '/2017/OPENING/Cover/SNK.png',        audio: '/2017/OPENING/Audio/SNK3.MP3'          },
      { id: '5',  animeName: 'Blue Exorcist',                                 openingTitle: 'SCOREBOOK',              artist: 'Rin Akatsuki',              op: 3,  image: '/2017/OPENING/Cover/BLUEEXO.png',    audio: '/2017/OPENING/Audio/BLUEEXORCIST3.MP3' },
      { id: '6',  animeName: 'Boruto: Naruto Next Generations',               openingTitle: 'OVER',                   artist: 'Little Glee Monster',       op: 2,  image: '/2017/OPENING/Cover/BORUTO.png',     audio: '/2017/OPENING/Audio/BORUTO.MP3'        },
      { id: '7',  animeName: 'One Piece',                                     openingTitle: 'Hope',                   artist: 'Namie Amuro',               op: 20, image: '/2017/OPENING/Cover/ONEPICE.png',    audio: '/2017/OPENING/Audio/OP20.MP3'          },
      { id: '8',  animeName: 'Saga of Tanya the Evil',                       openingTitle: 'JINGO JUNGLE',           artist: 'MYTH & ROID',                       image: '/2017/OPENING/Cover/TANYA.png',      audio: '/2017/OPENING/Audio/YOUJO.MP3'         },
      { id: '9',  animeName: 'Twin Star Exorcists',                           openingTitle: 'Kanadeai',               artist: 'Itowokoashi',               op: 4,  image: '/2017/OPENING/Cover/TWINSTAR.png',   audio: '/2017/OPENING/Audio/TWIN.MP3'          },
      { id: '10', animeName: 'Dragon Ball Super',                             openingTitle: 'Limit-Break x Survivor', artist: 'Kiyoshi Hikawa',            op: 2,  image: '/2017/OPENING/Cover/DBS.png',        audio: '/2017/OPENING/Audio/DBS.MP3'           },
      { id: '11', animeName: 'Rokudenashi Majutsu Koushi to Akashic Records', openingTitle: 'Blow out',               artist: 'Konomi Suzuki',                     image: '/2017/OPENING/Cover/ROKUDENA.png',   audio: '/2017/OPENING/Audio/ROKUDE.MP3'        },
      { id: '12', animeName: 'KonoSuba',                                      openingTitle: 'Tomorrow',               artist: 'Machico',                   op: 2,  image: '/2017/OPENING/Cover/KONOSUBA.png',   audio: '/2017/OPENING/Audio/KONOSU.MP3'        },
      { id: '13', animeName: 'Made in Abyss',                                 openingTitle: 'Deep in Abyss',          artist: 'Miyu Tomita & Mariya Ise',          image: '/2017/OPENING/Cover/MADE.png',       audio: '/2017/OPENING/Audio/MADE.MP3'          },
      { id: '14', animeName: 'Black Clover',                                  openingTitle: 'Haruka Mirai',           artist: 'Kankaku Piero',                     image: '/2017/OPENING/Cover/BLACK.png',      audio: '/2017/OPENING/Audio/BC1.MP3'           },
      { id: '15', animeName: 'Kakegurui',                                     openingTitle: 'Deal with the devil',    artist: 'Tia',                               image: '/2017/OPENING/Cover/KAKEGURUI.png',  audio: '/2017/OPENING/Audio/KAKEGURUI.MP3'     },
      { id: '16', animeName: 'Naruto Shippuden',                              openingTitle: 'Kara na Kokoro',         artist: 'Anly',                      op: 20, image: '/2017/OPENING/Cover/NARUTO20.png',   audio: '/2017/OPENING/Audio/NARUTO20.MP3'      },
      { id: '17', animeName: 'Nanatsu no Taizai',                           openingTitle: 'Howling',                artist: 'FLOW × GRANRODEO',          op: 4,  image: '/2017/OPENING/Cover/NNT4.png',   audio: '/2017/OPENING/Audio/NNT.MP3'      },
    ],
    animes: [
      // { id: '1', name: 'My Hero Academia', image: '/2017/ANIME/Cover/MHA.png', silhouette: '/2017/ANIME/Silhouette/MHA.png' },
    ],
  },

  2016: {
    openings: [
      { id: '1',  animeName: 'My Hero Academia',                        openingTitle: 'The Day',                        artist: 'Porno Graffitti',           image: '/2016/OPENING/Cover/MHA1.png',          audio: '/2016/OPENING/Audio/MHA1.MP3'          },
      { id: '2',  animeName: 'Naruto: Shippuden',                       openingTitle: 'Blood Circulator',               artist: 'ASIAN KUNG-FU GENERATION',  op: 19, image: '/2016/OPENING/Cover/NARUTO19.png',       audio: '/2016/OPENING/Audio/NARUTO19.MP3'       },
      { id: '3',  animeName: 'Mob Psycho 100',                          openingTitle: '99',                             artist: 'MOB CHOIR',                         image: '/2016/OPENING/Cover/MOB.png',            audio: '/2016/OPENING/Audio/MOB1.MP3'           },
      { id: '4',  animeName: 'Haikyu!!',                                openingTitle: 'Fly High!!',                     artist: 'BURNOUT SYNDROMES',         op: 4,  image: '/2016/OPENING/Cover/HAIKYUU.png',        audio: '/2016/OPENING/Audio/HAIKYU4.MP3'        },
      { id: '5',  animeName: 'Food Wars!',                              openingTitle: 'Rising Rainbow',                 artist: 'Misokkasu',                 op: 3,  image: '/2016/OPENING/Cover/FOOD.png',           audio: '/2016/OPENING/Audio/FOOD3.MP3'          },
      { id: '6',  animeName: 'Bungo Stray Dogs',                        openingTitle: 'Reason Living',                  artist: 'SCREEN mode',               op: 2,  image: '/2016/OPENING/Cover/BUNGOU.png',         audio: '/2016/OPENING/Audio/BUNGO.MP3'          },
      { id: '7',  animeName: 'Assassination Classroom',                 openingTitle: 'Bye Bye Yesterday',              artist: '3-nen E-gumi Utatan',       op: 4,  image: '/2016/OPENING/Cover/ASSASSINATION.png',  audio: '/2016/OPENING/Audio/ASSASSINATION.MP3'   },
      { id: '8',  animeName: 'ERASED',                                  openingTitle: 'Re:Re:',                         artist: 'ASIAN KUNG-FU GENERATION',         image: '/2016/OPENING/Cover/ERASED.png',         audio: '/2016/OPENING/Audio/ERASED.MP3'         },
      { id: '9',  animeName: 'Re:ZERO',                                 openingTitle: 'Redo',                           artist: 'Konomi Suzuki',                     image: '/2016/OPENING/Cover/REZERO.png',         audio: '/2016/OPENING/Audio/REZERO.MP3'         },
      { id: '10', animeName: 'Fairy Tail',                              openingTitle: 'Believe Myself',                 artist: 'Kavka Shishido',            op: 21, image: '/2016/OPENING/Cover/FAIRY TAIL.png',     audio: '/2016/OPENING/Audio/FT21.MP3'           },
      { id: '11', animeName: 'Tales of Zestiria the X',                 openingTitle: 'Kaze no Uta',                    artist: 'FLOW',                              image: '/2016/OPENING/Cover/ZESTIRIA.png',       audio: '/2016/OPENING/Audio/ZESTIRIA.MP3'       },
      { id: '12', animeName: "Haven't You Heard? I'm Sakamoto",         openingTitle: 'COOLEST',                        artist: 'CustomiZ',                          image: '/2016/OPENING/Cover/SAKAMOTO.png',       audio: '/2016/OPENING/Audio/SAKAMOTO.MP3'       },
      { id: '13', animeName: 'Twin Star Exorcists',                     openingTitle: 'sync',                           artist: 'lol',                       op: 3,  image: '/2016/OPENING/Cover/TWIN.png',           audio: '/2016/OPENING/Audio/TWIN.MP3'           },
      { id: '14', animeName: 'Yuri!!! on Ice',                          openingTitle: 'History Maker',                  artist: 'Dean Fujioka',                      image: '/2016/OPENING/Cover/YURI.png',           audio: '/2016/OPENING/Audio/YURI.MP3'           },
      { id: '15', animeName: 'D.Gray-man Hallow',                       openingTitle: 'Key -bring it on, my Destiny-',  artist: 'Lenny code fiction',                image: '/2016/OPENING/Cover/DGRAYMAN.png',          audio: '/2016/OPENING/Audio/DGRAY.MP3'          },
      { id: '16', animeName: "JoJo's Bizarre Adventure: Diamond is Unbreakable", openingTitle: 'CHASE',                    artist: 'Batta',                     op: 6,  image: '/2016/OPENING/Cover/JOJO.png',           audio: '/2016/OPENING/Audio/Jojo.MP3'           },
      { id: '17', animeName: 'Tales of Berseria',                       openingTitle: 'BURN',                           artist: 'FLOW',                              image: '/2016/OPENING/Cover/BERSERIA.jpg',       audio: '/2016/OPENING/Audio/BERSERIA.MP3'       },
    ],
    animes: [
      // { id: '1', name: 'Re:Zero', image: '/nominees/2016/animes/1/cover.jpg' },
    ],
  },

  2015: {
    openings: [
      { id: '1',  animeName: 'Fate/stay night: Unlimited Blade Works',   openingTitle: 'Brave Shine',                              artist: 'Aimer',                                     op: 2,  image: '/2015/OPENING/Cover/FATE.jpg',        audio: '/2015/OPENING/Audio/FATEUBW.MP3'     },
      { id: '2',  animeName: 'Noragami Aragoto',                          openingTitle: 'Kyouran Hey Kids!!',                       artist: 'THE ORAL CIGARETTES',                                image: '/2015/OPENING/Cover/NORAGAMI.jpg',    audio: '/2015/OPENING/Audio/NORAGAMI.MP3'    },
      { id: '3',  animeName: 'Blood Blockade Battlefront',                openingTitle: 'Hello, World!',                            artist: 'BUMP OF CHICKEN',                                    image: '/2015/OPENING/Cover/KEKKAI.jpg',      audio: '/2015/OPENING/Audio/KEKKAI.MP3'      },
      { id: '4',  animeName: 'Seraph of the End',                         openingTitle: 'X.U.',                                     artist: 'SawanoHiroyuki[nZk]:Gemie',                          image: '/2015/OPENING/Cover/OWARI.jpg',       audio: '/2015/OPENING/Audio/OWARI.MP3'       },
      { id: '5',  animeName: 'One Piece',                                 openingTitle: 'Hard Knock Days',                          artist: 'GENERATIONS from EXILE TRIBE',              op: 18, image: '/2015/OPENING/Cover/ONE.jpg',         audio: '/2015/OPENING/Audio/ONE17.MP3'       },
      { id: '6',  animeName: 'Naruto: Shippuden',                         openingTitle: 'Kaze',                                     artist: 'Yamazaru',                                  op: 17, image: '/2015/OPENING/Cover/NARUTO17.jpg',    audio: '/2015/OPENING/Audio/NARUTO17.MP3'    },
      { id: '7',  animeName: "Kuroko's Basketball",                        openingTitle: 'Memories',                                 artist: 'GRANRODEO',                                 op: 7,  image: '/2015/OPENING/Cover/KUROKO.jpg',      audio: '/2015/OPENING/Audio/KUROKO7.MP3'     },
      { id: '8',  animeName: 'Death Parade',                              openingTitle: 'Flyers',                                   artist: 'BRADIO',                                             image: '/2015/OPENING/Cover/DEATH.jpg',       audio: '/2015/OPENING/Audio/DEATHP.MP3'      },
      { id: '9',  animeName: 'Food Wars!',                                openingTitle: 'Kibou no Uta',                             artist: 'ULTRATOWER',                                         image: '/2015/OPENING/Cover/FOOD.jpg',        audio: '/2015/OPENING/Audio/FOOD1.MP3'       },
      { id: '10', animeName: 'Overlord',                                  openingTitle: 'Clattanoia',                               artist: 'OxT',                                                image: '/2015/OPENING/Cover/OVERLORD.jpg',    audio: '/2015/OPENING/Audio/OVERLORD1.MP3'   },
      { id: '11', animeName: 'Chivalry of a Failed Knight',               openingTitle: 'Identity',                                 artist: 'Mikio Sakai',                                        image: '/2015/OPENING/Cover/RAKUDAI.jpg',     audio: '/2015/OPENING/Audio/RAKUDAI.MP3'     },
      { id: '13', animeName: 'Pokémon XYZ',                               openingTitle: 'XY&Z',                                     artist: 'Rica Matsumoto',                                     image: '/2015/OPENING/Cover/POKEMON.jpg',     audio: '/2015/OPENING/Audio/POKEMON.MP3'     },
      { id: '15', animeName: 'Haikyu!!',                                  openingTitle: "I'm a Believer",                           artist: 'SPYAIR',                                    op: 3,  image: '/2015/OPENING/Cover/HAIK.jpg',        audio: '/2015/OPENING/Audio/HAIKYUU3.MP3'    },
      { id: '16', animeName: 'Charlotte',                                 openingTitle: 'Bravely You',                              artist: 'Lia',                                                image: '/2015/OPENING/Cover/CHARLOTTE.jpg',   audio: '/2015/OPENING/Audio/CHARLOTTE.MP3'   },
      { id: '17', animeName: 'Yamada-kun and the Seven Witches',          openingTitle: 'Kuchizuke Diamond',                        artist: 'WEAVER',                                             image: '/2015/OPENING/Cover/YAMADA.png',      audio: '/2015/OPENING/Audio/YAMADA.MP3'      },
    ],
    animes: [
      // { id: '1', name: 'One Punch Man', image: '/2015/ANIME/Cover/OPM.png', silhouette: '/2015/ANIME/Silhouette/OPM.png' },
    ],
  },

  2014: {
    openings: [
      { id: '1',  animeName: 'Naruto: Shippuden',                     openingTitle: 'Silhouette',               artist: 'KANA-BOON',                           op: 16, image: '/2014/OPENING/Cover/NARUTO16.jpg',    audio: '/2014/OPENING/Audio/NARUTO16.MP3'    },
      { id: '2',  animeName: 'The Seven Deadly Sins',                  openingTitle: 'Netsujou no Spectrum',     artist: 'Ikimonogakari',                               image: '/2014/OPENING/Cover/NNT.jpg',         audio: '/2014/OPENING/Audio/NNT.MP3'         },
      { id: '3',  animeName: 'No Game No Life',                        openingTitle: 'This Game',                artist: 'Konomi Suzuki',                               image: '/2014/OPENING/Cover/NOGAME.jpg',      audio: '/2014/OPENING/Audio/NOGAME.MP3'      },
      { id: '4',  animeName: 'Your Lie in April',                      openingTitle: 'Hikaru Nara',              artist: 'Goose house',                                 image: '/2014/OPENING/Cover/APRIL.jpg',       audio: '/2014/OPENING/Audio/LIE.MP3'         },
      { id: '5',  animeName: 'Parasyte -the maxim-',                   openingTitle: 'Let Me Hear',              artist: 'Fear, and Loathing in Las Vegas',              image: '/2014/OPENING/Cover/PARASYTE.jpg',    audio: '/2014/OPENING/Audio/PARASYTE.MP3'    },
      { id: '6',  animeName: "Kuroko's Basketball",                    openingTitle: 'Hengen Jizai no Magical Star', artist: 'GRANRODEO',                         op: 4,  image: '/2014/OPENING/Cover/KUROKO.jpg',      audio: '/2014/OPENING/Audio/KUROKO.MP3'      },
      { id: '7',  animeName: 'Tokyo Ghoul',                            openingTitle: 'Unravel',                  artist: 'TK from Ling Tosite Sigure',                   image: '/2014/OPENING/Cover/TOKYO.jpg',       audio: '/2014/OPENING/Audio/TOKYO.MP3'       },
      { id: '8',  animeName: 'Sword Art Online II',                    openingTitle: 'IGNITE',                   artist: 'Eir Aoi',                             op: 3,  image: '/2014/OPENING/Cover/SAO2.jpg',        audio: '/2014/OPENING/Audio/SAO2.MP3'        },
      { id: '9',  animeName: 'Fairy Tail',                             openingTitle: 'MASAYUME CHASING',         artist: 'BoA',                                 op: 15, image: '/2014/OPENING/Cover/FAIRY.jpg',       audio: '/2014/OPENING/Audio/FAIRY.MP3'       },
      { id: '10', animeName: 'Akame ga Kill!',                         openingTitle: 'Liar Mask',                artist: 'Rika Mayama',                         op: 2,  image: '/2014/OPENING/Cover/AKAME.jpg',       audio: '/2014/OPENING/Audio/AKAME.MP3'       },
      { id: '11', animeName: 'Kill la Kill',                           openingTitle: 'ambiguous',                artist: 'GARNiDELiA',                          op: 2,  image: '/2014/OPENING/Cover/KILLLA.jpg',      audio: '/2014/OPENING/Audio/KILL.MP3'        },
      { id: '12', animeName: 'Haikyu!!',                               openingTitle: 'Imagination',              artist: 'SPYAIR',                                      image: '/2014/OPENING/Cover/HAIKYU.jpg',      audio: '/2014/OPENING/Audio/HAIKYU.MP3'      },
      { id: '13', animeName: 'The Irregular at Magic High School',     openingTitle: 'Rising Hope',              artist: 'LiSA',                                        image: '/2014/OPENING/Cover/IRREGULAR.jpg',   audio: '/2014/OPENING/Audio/RISINGHOPE.MP3'  },
      { id: '14', animeName: 'Re: Hamatora',                           openingTitle: 'Sen no Tsubasa',           artist: 'livetune adding Takuro Sugawara',              image: '/2014/OPENING/Cover/HAMATORA.jpg',    audio: '/2014/OPENING/Audio/HAMATORA.MP3'    },
      { id: '15', animeName: 'Mushishi: The Next Passage',             openingTitle: 'Shiver',                   artist: 'Lucy Rose',                           op: 2,  image: '/2014/OPENING/Cover/MUSHISHI.jpg',    audio: '/2014/OPENING/Audio/MUSHISHI.MP3'    },
      { id: '16', animeName: 'Noragami',                               openingTitle: 'Goya no Machiawase',       artist: 'Hello Sleepwalkers',                          image: '/2014/OPENING/Cover/NORAGAMI.jpg',    audio: '/2014/OPENING/Audio/NORAGAMI.MP3'    },
      { id: '17', animeName: 'Magi: The Kingdom of Magic',             openingTitle: 'ANNIVERSARY',              artist: 'SID',                                 op: 3,  image: '/2014/OPENING/Cover/MAGI.jpg',        audio: '/2014/OPENING/Audio/MAGI.MP3'        },
    ],
    animes: [],
  },

  2013: {
    openings: [
      { id: '1',  animeName: "JoJo's Bizarre Adventure",              openingTitle: 'Bloody Stream',                    artist: 'Coda',                                op: 2,  image: '/2013/OPENING/Cover/JOJO.jpg',       audio: '/2013/OPENING/Audio/JOJO.MP3'       },
      { id: '2',  animeName: 'Attack on Titan',                       openingTitle: 'Guren no Yumiya',                  artist: 'Linked Horizon',                              image: '/2013/OPENING/Cover/SNK.jpg',        audio: '/2013/OPENING/Audio/SNK.MP3'        },
      { id: '3',  animeName: 'Gintama',                               openingTitle: 'Tougenkyou Alien',                 artist: 'serial TV drama',                     op: 13, image: '/2013/OPENING/Cover/GINTAMA.jpg',    audio: '/2013/OPENING/Audio/GINTAMA.MP3'    },
      { id: '4',  animeName: 'Log Horizon',                           openingTitle: 'database feat. TAKUMA (10-FEET)',  artist: 'MAN WITH A MISSION',                          image: '/2013/OPENING/Cover/LOG.jpg',        audio: '/2013/OPENING/Audio/LOG.MP3'        },
      { id: '5',  animeName: 'Psycho-Pass',                           openingTitle: 'Out of Control',                   artist: "Nothing's Carved In Stone",           op: 2,  image: '/2013/OPENING/Cover/PSYCHO.jpg',     audio: '/2013/OPENING/Audio/PSYCHO.MP3'     },
      { id: '6',  animeName: "Kuroko's Basketball",                   openingTitle: 'The Other self',                   artist: 'GRANRODEO',                           op: 3,  image: '/2013/OPENING/Cover/KUROKO.jpg',     audio: '/2013/OPENING/Audio/KUROKO.MP3'     },
      { id: '7',  animeName: 'Magi: The Kingdom of Magic',            openingTitle: 'Hikari',                           artist: 'ViViD',                               op: 2,  image: '/2013/OPENING/Cover/MAGI.jpg',       audio: '/2013/OPENING/Audio/MAGI.MP3'       },
      { id: '8',  animeName: 'My Little Pony: Friendship is Magic',   openingTitle: 'Tomodachi wa Mahou',               artist: 'Emiri Katō & Aya Hirano',                     image: '/2013/OPENING/Cover/PONY.jpg',       audio: '/2013/OPENING/Audio/LITTLEPONY.MP3' },
      { id: '9',  animeName: 'Beyond the Boundary',                   openingTitle: 'Kyokai no Kanata',                 artist: 'Minori Chihara',                              image: '/2013/OPENING/Cover/KYOUKAI.jpg',    audio: '/2013/OPENING/Audio/BEYOND.MP3'     },
      { id: '11', animeName: 'Free!',                                 openingTitle: 'Rage On',                          artist: 'OLDCODEX',                                    image: '/2013/OPENING/Cover/FREE.jpg',       audio: '/2013/OPENING/Audio/FREE.MP3'       },
      { id: '12', animeName: 'Blood Lad',                             openingTitle: 'ViViD',                            artist: "May'n",                                       image: '/2013/OPENING/Cover/BLOOD.jpg',      audio: '/2013/OPENING/Audio/BLOOD.MP3'      },
      { id: '13', animeName: 'Kill la Kill',                          openingTitle: 'sirius',                           artist: 'Eir Aoi',                                     image: '/2013/OPENING/Cover/KILL.jpg',       audio: '/2013/OPENING/Audio/KILLLA.MP3'     },
      { id: '14', animeName: 'Beelzebub',                             openingTitle: 'Baby U!',                          artist: 'MBLAQ',                               op: 4,  image: '/2013/OPENING/Cover/BELZEBUB.jpg',   audio: '/2013/OPENING/Audio/BELZEEEBUB.MP3' },
      { id: '15', animeName: 'Naruto: Shippuden',                     openingTitle: 'Niwaka Ame ni mo Makezu',          artist: 'NICO Touches the Walls',              op: 13, image: '/2013/OPENING/Cover/NARUTO.jpg',    audio: '/2013/OPENING/Audio/NARUTO13.MP3'    },
      { id: '16', animeName: 'Fairy Tail',                            openingTitle: 'Yakusoku no Hi e',                 artist: 'Chihiro Yonekura',                    op: 14, image: '/2013/OPENING/Cover/FAIRY.jpg',        audio: '/2013/OPENING/Audio/FT14.MP3'        },
    ],
    animes: [
      // { id: '1', name: 'Attack on Titan', image: '/2013/ANIME/Cover/AOT.png' },
    ],
  },

  2012: {
    openings: [
      { id: '1',  animeName: 'Fairy Tail',                       openingTitle: 'The Rock City Boy',          artist: 'JAMIL',                       op: 8,  image: '/2012/OPENING/Cover/FAIRY.jpg',        audio: '/2012/OPENING/Audio/FAIRY.MP3'         },
      { id: '2',  animeName: "Kuroko's Basketball",              openingTitle: 'Can Do',                     artist: 'GRANRODEO',                           image: '/2012/OPENING/Cover/KUROKO.jpg',       audio: '/2012/OPENING/Audio/KUROKO.MP3'     },
      { id: '3',  animeName: 'Magi: The Labyrinth of Magic',     openingTitle: 'V.I.P',                      artist: 'SID',                                 image: '/2012/OPENING/Cover/MAGI1.jpg',         audio: '/2012/OPENING/Audio/MAGI.MP3'       },
      { id: '4',  animeName: 'Btooom!',                          openingTitle: 'No Pain, No Game',           artist: 'Nano',                                image: '/2012/OPENING/Cover/BTOOM.jpg',        audio: '/2012/OPENING/Audio/BTOOM.MP3'      },
      { id: '5',  animeName: "JoJo's Bizarre Adventure",        openingTitle: 'JoJo ~Sono Chi no Sadame~', artist: 'Hiroaki Tommy Tominaga',               image: '/2012/OPENING/Cover/JOJO.jpg',         audio: '/2012/OPENING/Audio/JOJO.MP3'       },
      { id: '6',  animeName: 'Accel World',                      openingTitle: 'Chase the World',            artist: "May'n",                               image: '/2012/OPENING/Cover/ACCEL.jpg',        audio: '/2012/OPENING/Audio/ACCEL.MP3'       },
      { id: '7',  animeName: 'Psycho-Pass',                      openingTitle: 'abnormalize',                artist: 'Ling Tosite Sigure',                   image: '/2012/OPENING/Cover/PSCHO.jpg',        audio: '/2012/OPENING/Audio/PSYCHO.MP3'     },
      { id: '8',  animeName: 'Sword Art Online',                 openingTitle: 'Crossing Field',             artist: 'LiSA',                                image: '/2012/OPENING/Cover/SAO.jpg',          audio: '/2012/OPENING/Audio/SAO.MP3'        },
      { id: '9',  animeName: 'Hiiro no Kakera',                  openingTitle: 'Nee',                        artist: 'Fujita Maiko',                         image: '/2012/OPENING/Cover/HIIRO.jpg',        audio: '/2012/OPENING/Audio/HIIRO.MP3'       },
      { id: '10', animeName: 'High School DxD',                  openingTitle: 'Trip -innocent of D-',       artist: 'Larval Stage Planning',               image: '/2012/OPENING/Cover/HIGH.jpg',         audio: '/2012/OPENING/Audio/SCHOOL.MP3'         },
      { id: '11', animeName: 'Code:Breaker',                     openingTitle: 'Dark Shame',                 artist: 'GRANRODEO',                           image: '/2012/OPENING/Cover/CODE1.jpg',         audio: '/2012/OPENING/Audio/CODE.MP3'       },
      { id: '12', animeName: 'Aquarion Evol',                    openingTitle: 'Paradoxical ZOO',            artist: 'AKINO with bless4',           op: 2,  image: '/2012/OPENING/Cover/AQUARION.jpg',     audio: '/2012/OPENING/Audio/AQUARION.MP3'   },
      { id: '13', animeName: 'Hyouka',                           openingTitle: 'Yasashisa no Riyuu',         artist: 'ChouCho',                             image: '/2012/OPENING/Cover/HYOUKA.jpg',       audio: '/2012/OPENING/Audio/HYOUKA.MP3'      },
      { id: '14', animeName: 'Fate/Zero',                        openingTitle: 'To the Beginning',           artist: 'Kalafina',                    op: 2,  image: '/2012/OPENING/Cover/FATE.jpg',         audio: '/2012/OPENING/Audio/FATEZERO2.MP3'   },
      { id: '15', animeName: 'Inazuma Eleven Go: Chrono Stone',   openingTitle: 'Shoshin wo KEEP ON!',        artist: 'T-Pistonz+KMC',               op: 3,  image: '/2012/OPENING/Cover/INAZUMAELEVENGOCHRONO.jpg',     audio: '/2012/OPENING/Audio/INAZUMA.MP3'    },
    ],
    animes: [],
  },

  2011: {
    openings: [
      { id: '1',  animeName: 'Bleach',                                    openingTitle: 'BLUE',                  artist: 'ViViD',                        op: 14, image: '/2011/OPENING/Cover/BLEACH.jpg',      audio: '/2011/OPENING/Audio/BLEACH.MP3'      },
      { id: '2',  animeName: 'One Piece',                                 openingTitle: 'We Go!',                artist: 'Hiroshi Kitadani',              op: 15, image: '/2011/OPENING/Cover/ONE1.jpg',         audio: '/2011/OPENING/Audio/ONE.MP3'         },
      { id: '3',  animeName: 'Blue Exorcist',                             openingTitle: 'CORE PRIDE',            artist: 'UVERworld',                            image: '/2011/OPENING/Cover/BLUE.jpg',        audio: '/2011/OPENING/Audio/BLUE.MP3'        },
      { id: '4',  animeName: 'Hunter × Hunter',                           openingTitle: 'departure!',            artist: 'Masatoshi Ono',                        image: '/2011/OPENING/Cover/HXH1.jpg',         audio: '/2011/OPENING/Audio/HXH.MP3'         },
      { id: '5',  animeName: 'Naruto: Shippuden',                         openingTitle: 'Diver',                 artist: 'NICO Touches the Walls',        op: 8,  image: '/2011/OPENING/Cover/NARUTO8.jpg',      audio: '/2011/OPENING/Audio/NARUTO8.MP3'     },
      { id: '6',  animeName: 'Guilty Crown',                              openingTitle: 'My Dearest',            artist: 'supercell',                            image: '/2011/OPENING/Cover/GUILTY.jpg',      audio: '/2011/OPENING/Audio/GUILTY.MP3'      },
      { id: '7',  animeName: 'Future Diary',                              openingTitle: 'Kuusou Mesorogiwi',     artist: 'Yousei Teikoku',                       image: '/2011/OPENING/Cover/FUTURE.jpg',      audio: '/2011/OPENING/Audio/FUTURE.MP3'      },
      { id: '8',  animeName: 'Anohana: The Flower We Saw That Day',       openingTitle: 'Aoi Shiori',            artist: 'Galileo Galilei',                      image: '/2011/OPENING/Cover/ANOHANA.jpg',     audio: '/2011/OPENING/Audio/ANOHANA.MP3'     },
      { id: '9',  animeName: 'Steins;Gate',                               openingTitle: 'Hacking to the Gate',  artist: 'Kanako Itō',                           image: '/2011/OPENING/Cover/STEINS.jpg',      audio: '/2011/OPENING/Audio/STEINS.MP3'      },
      { id: '10', animeName: 'Deadman Wonderland',                        openingTitle: 'One Reason',            artist: 'Fade',                                 image: '/2011/OPENING/Cover/DEADMAN.jpg',     audio: '/2011/OPENING/Audio/DEADMAN.MP3'     },
      { id: '11', animeName: 'Fairy Tail',                                openingTitle: 'Fiesta',                artist: '+Plus',                         op: 6,  image: '/2011/OPENING/Cover/FAIRYTAIL1.jpg',   audio: '/2011/OPENING/Audio/FAIRY.MP3'       },
      { id: '12', animeName: 'Beelzebub',                                 openingTitle: 'Hey!!!',                artist: 'FLOW',                          op: 3,  image: '/2011/OPENING/Cover/BELZEBUB.jpg',    audio: '/2011/OPENING/Audio/BEELZEBUB.MP3'   },
      { id: '13', animeName: 'Toriko',                                    openingTitle: 'Guts Guts!!',           artist: 'Miyu Irino',                           image: '/2011/OPENING/Cover/TORIKO.jpg',      audio: '/2011/OPENING/Audio/TORIKO.MP3'      },
      { id: '14', animeName: 'Bakuman. 2',                                openingTitle: 'Dream of Life',         artist: 'Shohei Ito',                           image: '/2011/OPENING/Cover/BAKUMAN.jpg',     audio: '/2011/OPENING/Audio/BAKUMAN.MP3'     },
      { id: '15', animeName: 'Fate/Zero',                                 openingTitle: 'oath sign',             artist: 'LiSA',                                 image: '/2011/OPENING/Cover/FATE1.jpg',       audio: '/2011/OPENING/Audio/FATE.MP3'        },
      { id: '16', animeName: 'Inazuma Eleven',                             openingTitle: 'Bokura no Goal!',       artist: 'T-Pistonz+KMC',                 op: 6,  image: '/2011/OPENING/Cover/INAZUMA.jpg',    audio: '/2011/OPENING/Audio/INAZUMA.MP3'     },
    ],
    animes: [],
  },

  2010: {
    openings: [
      { id: '1',  animeName: 'Highschool of the Dead',                openingTitle: 'HIGHSCHOOL OF THE DEAD',        artist: 'Kishida Kyoudan & The Akeboshi Rockets',      image: '/2010/OPENING/Cover/HIGHSCHOOL.jpg',       audio: '/2010/OPENING/Audio/HOTD.MP3'       },
      { id: '2',  animeName: 'Dance in the Vampire Bund',             openingTitle: 'Friends',                        artist: 'Aiko Nakano',                                 image: '/2010/OPENING/Cover/DANCE.jpg',    audio: '/2010/OPENING/Audio/VAMPIRE.MP3'    },
      { id: '3',  animeName: 'The Qwaser of Stigmata',                openingTitle: 'Errand',                         artist: 'Nagi Yanagi',                                 image: '/2010/OPENING/Cover/QWASER.jpg',     audio: '/2010/OPENING/Audio/QWASER.MP3'     },
      { id: '4',  animeName: 'Bleach',                                openingTitle: 'Ranbu no Melody',                artist: 'SID',                                 op: 13, image: '/2010/OPENING/Cover/BLEACH.jpg',   audio: '/2010/OPENING/Audio/BLEACH13.MP3'   },
      { id: '5',  animeName: 'One Piece',                             openingTitle: 'Fight Together',                 artist: 'Namie Amuro',                         op: 14, image: '/2010/OPENING/Cover/ONE.jpg',      audio: '/2010/OPENING/Audio/ONE14.MP3'      },
      { id: '6',  animeName: 'Reborn!',                               openingTitle: 'Listen to the Stereo!!',         artist: 'GOING UNDER GROUND',                  op: 8,  image: '/2010/OPENING/Cover/REBORN.jpg',    audio: '/2010/OPENING/Audio/REBORN8.MP3'    },
      { id: '7',  animeName: 'Naruto: Shippuden',                     openingTitle: 'Toumei Datta Sekai',             artist: 'Motohiro Hata',                       op: 7,  image: '/2010/OPENING/Cover/NARUTO.jpg',    audio: '/2010/OPENING/Audio/NARUTO7.MP3'    },
      { id: '8',  animeName: 'Major (Season 6)',                      openingTitle: 'Kokoro e',                       artist: 'TRIPLANE',                                    image: '/2010/OPENING/Cover/MAJOR.jpg',      audio: '/2010/OPENING/Audio/MAJOR.MP3'      },
      { id: '9',  animeName: 'Fairy Tail',                            openingTitle: 'ft.',                            artist: 'FUNKIST',                             op: 3,  image: '/2010/OPENING/Cover/FAIRY.jpg',        audio: '/2010/OPENING/Audio/FT3.MP3'        },
      { id: '10', animeName: 'Durarara!!',                            openingTitle: 'Complication',                   artist: "ROOKiEZ is PUNK'D",                   op: 2,  image: '/2010/OPENING/Cover/DURARARA.jpg',      audio: '/2010/OPENING/Audio/DRRR2.MP3'      },
      { id: '11', animeName: "Yu-Gi-Oh! 5D's",                       openingTitle: 'Road to Tomorrow ~Going My Way!!~', artist: 'Masaaki Endoh',                    op: 5,  image: '/2010/OPENING/Cover/YUGIOH.jpg',    audio: '/2010/OPENING/Audio/YUGIOH5.MP3'    },
      { id: '12', animeName: 'Rainbow: Nisha Rokubou no Shichinin',   openingTitle: "We're not alone",                artist: 'coldrain',                                    image: '/2010/OPENING/Cover/RAINBOW.jpg',    audio: '/2010/OPENING/Audio/RAINBOW.MP3'    },
      { id: '13', animeName: 'Fullmetal Alchemist: Brotherhood',      openingTitle: 'Rain',                           artist: 'SID',                                 op: 5,  image: '/2010/OPENING/Cover/FMAB.jpg',       audio: '/2010/OPENING/Audio/FMA5.MP3'       },
      { id: '14', animeName: 'Bakuman.',                              openingTitle: 'Blue Bird',                      artist: 'Kobukuro',                                    image: '/2010/OPENING/Cover/BAKUMAN.jpg',   audio: '/2010/OPENING/Audio/BAKUMAN1.MP3'   },
      { id: '16', animeName: 'Inazuma Eleven',                       openingTitle: 'Katte Nakou ze!',                artist: 'T-Pistonz+KMC',                       op: 4,  image: '/2010/OPENING/Cover/INAZUMA.jpg',   audio: '/2010/OPENING/Audio/INAZUMA4.MP3'   },
      { id: '15', animeName: 'Angel Beats!',                         openingTitle: 'My Soul, Your Beats!',           artist: 'Lia',                                         image: '/2010/OPENING/Cover/ANGEL.jpg',      audio: '/2010/OPENING/Audio/ANGEL.MP3'      },
    ],
    animes: [],
  },

  2009: {
    openings: [
      { id: '1',  animeName: 'Durarara!!',                            openingTitle: 'Uragiri no Yuuyake',             artist: 'THEATRE BROOK',                               image: '/2009/OPENING/Cover/DURARARA.jpg',       audio: '/2009/OPENING/Audio/DRRR1.MP3'       },
      { id: '2',  animeName: 'Naruto: Shippuden',                     openingTitle: 'Sign',                           artist: 'FLOW',                                op: 6,  image: '/2009/OPENING/Cover/NARUTO.jpg',     audio: '/2009/OPENING/Audio/NARUTO6.MP3'     },
      { id: '3',  animeName: 'Fullmetal Alchemist: Brotherhood',      openingTitle: 'Again',                          artist: 'YUI',                                         image: '/2009/OPENING/Cover/FMAB.png',        audio: '/2009/OPENING/Audio/FMA1.MP3'        },
      { id: '4',  animeName: 'One Piece',                             openingTitle: 'Share The World',                artist: 'TVXQ',                                op: 11, image: '/2009/OPENING/Cover/ONE.jpg',       audio: '/2009/OPENING/Audio/ONE11.MP3'       },
      { id: '5',  animeName: 'Reborn!',                               openingTitle: 'EASY GO',                        artist: 'Kazuki Kato',                         op: 6,  image: '/2009/OPENING/Cover/REBORN.jpg',     audio: '/2009/OPENING/Audio/REBORN6.MP3'     },
      { id: '6',  animeName: 'Inuyasha: The Final Act',               openingTitle: 'Kimi ga Inai Mirai',             artist: 'Do As Infinity',                              image: '/2009/OPENING/Cover/INUYASHA.jpg',    audio: '/2009/OPENING/Audio/INUYASHA.MP3'    },
      { id: '7',  animeName: 'Darker than Black',                     openingTitle: 'Tsukiakari no Michishirube',     artist: 'Stereopony',                          op: 2,  image: '/2009/OPENING/Cover/DARKER.jpg',        audio: '/2009/OPENING/Audio/DTB2.MP3'        },
      { id: '8',  animeName: 'Hajime no Ippo: New Challenger',        openingTitle: 'HEKIREKI',                       artist: 'LAST ALLIANCE',                               image: '/2009/OPENING/Cover/IPPO.jpg',        audio: '/2009/OPENING/Audio/IPPO.MP3'        },
      { id: '9',  animeName: 'K-On!',                                 openingTitle: 'Cagayake! GIRLS',                artist: 'Ho-kago Tea Time',                            image: '/2009/OPENING/Cover/KON.jpg',         audio: '/2009/OPENING/Audio/KON.MP3'         },
      { id: '10', animeName: 'Saint Seiya: The Lost Canvas',          openingTitle: 'The Realm of Athena',            artist: 'EUROX',                                       image: '/2009/OPENING/Cover/CANVAS.jpg',       audio: '/2009/OPENING/Audio/SEIYA.MP3'       },
      { id: '11', animeName: 'Inazuma Eleven',                        openingTitle: 'Maji de Kansha!',                artist: 'T-Pistonz+KMC',                       op: 2,  image: '/2009/OPENING/Cover/INAZUMA.jpg',    audio: '/2009/OPENING/Audio/INAZUMA2.MP3'    },
      { id: '12', animeName: 'Bakemonogatari',                        openingTitle: 'Renai Circulation',              artist: 'Kana Hanazawa',                       op: 4,  image: '/2009/OPENING/Cover/BAKEMONO.jpg',       audio: '/2009/OPENING/Audio/BAKE4.MP3'       },
    ],
    animes: [],
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
      { id: '1', animeName: 'Eureka Seven', openingTitle: 'DAYS', artist: 'FLOW', image: '/2005/OPENING/Cover/EUREKA.png', audio: '/2005/OPENING/Audio/EUREKA.MP3' },
    ],
    animes: [
      // { id: '1', name: 'Fullmetal Alchemist', image: '/nominees/2005/animes/1/cover.jpg' },
    ],
  },
};
