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
      { id: '10', animeName: 'Sword Art Online: Alicization', openingTitle: 'ADAMAS',              artist: 'LiSA',                                image: '/2019/OPENING/Cover/SAO.png',      audio: '/2019/OPENING/Audio/SAOA.MP3'         },
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
      { id: '4',  animeName: 'Attack on Titan',                               openingTitle: 'Shinzou wo Sasageyo!',   artist: 'Linked Horizon',            op: 3,  image: '/2017/OPENING/Cover/SNK.png',        audio: '/2017/OPENING/Audio/SNK3.MP3'          },
      { id: '5',  animeName: 'Blue Exorcist',                                 openingTitle: 'SCOREBOOK',              artist: 'Rin Akatsuki',              op: 3,  image: '/2017/OPENING/Cover/BLUEEXO.png',    audio: '/2017/OPENING/Audio/BLUEEXORCIST3.MP3' },
      { id: '6',  animeName: 'Boruto: Naruto Next Generations',               openingTitle: 'OVER',                   artist: 'Little Glee Monster',       op: 2,  image: '/2017/OPENING/Cover/BORUTO.png',     audio: '/2017/OPENING/Audio/BORUTO.MP3'        },
      { id: '7',  animeName: 'One Piece',                                     openingTitle: 'Hope',                   artist: 'Namie Amuro',               op: 20, image: '/2017/OPENING/Cover/ONEPICE.png',    audio: '/2017/OPENING/Audio/OP20.MP3'          },
      { id: '9',  animeName: 'Twin Star Exorcists',                           openingTitle: 'Kanadeai',               artist: 'Itowokoashi',               op: 4,  image: '/2017/OPENING/Cover/TWINSTAR.png',   audio: '/2017/OPENING/Audio/TWIN.MP3'          },
      { id: '10', animeName: 'Dragon Ball Super',                             openingTitle: 'Limit-Break x Survivor', artist: 'Kiyoshi Hikawa',            op: 2,  image: '/2017/OPENING/Cover/DBS.png',        audio: '/2017/OPENING/Audio/DBS.MP3'           },
      { id: '11', animeName: 'Rokudenashi Majutsu Koushi to Akashic Records', openingTitle: 'Blow out',               artist: 'Konomi Suzuki',                     image: '/2017/OPENING/Cover/ROKUDENA.png',   audio: '/2017/OPENING/Audio/ROKUDE.MP3'        },
      { id: '12', animeName: 'KonoSuba',                                      openingTitle: 'Tomorrow',               artist: 'Machico',                   op: 2,  image: '/2017/OPENING/Cover/KONOSUBA.png',   audio: '/2017/OPENING/Audio/KONOSU.MP3'        },
      { id: '13', animeName: 'Made in Abyss',                                 openingTitle: 'Deep in Abyss',          artist: 'Miyu Tomita & Mariya Ise',          image: '/2017/OPENING/Cover/MADE.png',       audio: '/2017/OPENING/Audio/MADE.MP3'          },
      { id: '14', animeName: 'Black Clover',                                  openingTitle: 'Haruka Mirai',           artist: 'Kankaku Piero',                     image: '/2017/OPENING/Cover/BLACK.png',      audio: '/2017/OPENING/Audio/BC1.MP3'           },
      { id: '15', animeName: 'Kakegurui',                                     openingTitle: 'Deal with the devil',    artist: 'Tia',                               image: '/2017/OPENING/Cover/KAKEGURUI.png',  audio: '/2017/OPENING/Audio/KAKEGURUI.MP3'     },
      { id: '16', animeName: 'Naruto Shippuden',                              openingTitle: 'Kara na Kokoro',         artist: 'Anly',                      op: 20, image: '/2017/OPENING/Cover/NARUTO20.png',   audio: '/2017/OPENING/Audio/NARUTO20.MP3'      },
    ],
    animes: [
      // { id: '1', name: 'My Hero Academia', image: '/2017/ANIME/Cover/MHA.png', silhouette: '/2017/ANIME/Silhouette/MHA.png' },
    ],
  },

  2016: {
    openings: [
      { id: '1',  animeName: 'My Hero Academia',                        openingTitle: 'The Day',                        artist: 'Porno Graffitti',           image: '/2016/OPENING/Cover/MHA.png',       audio: '/2016/OPENING/Audio/MHA.mp3'       },
      { id: '2',  animeName: 'Naruto: Shippuden',                       openingTitle: 'Blood Circulator',               artist: 'ASIAN KUNG-FU GENERATION',  op: 19, image: '/2016/OPENING/Cover/NARUTO19.png',  audio: '/2016/OPENING/Audio/NARUTO19.mp3'  },
      { id: '3',  animeName: 'Mob Psycho 100',                          openingTitle: '99',                             artist: 'MOB CHOIR',                         image: '/2016/OPENING/Cover/MOB.png',       audio: '/2016/OPENING/Audio/MOB.mp3'       },
      { id: '4',  animeName: 'Haikyu!!',                                openingTitle: 'Fly High!!',                     artist: 'BURNOUT SYNDROMES',         op: 4,  image: '/2016/OPENING/Cover/HAIKYU.png',    audio: '/2016/OPENING/Audio/HAIKYU.mp3'    },
      { id: '5',  animeName: 'Food Wars!',                              openingTitle: 'Rising Rainbow',                 artist: 'Misokkasu',                 op: 2,  image: '/2016/OPENING/Cover/FOODWARS2.png', audio: '/2016/OPENING/Audio/FOODWARS2.mp3' },
      { id: '6',  animeName: 'Bungo Stray Dogs',                        openingTitle: 'Reason Living',                  artist: 'SCREEN mode',               op: 2,  image: '/2016/OPENING/Cover/BUNGO.png',     audio: '/2016/OPENING/Audio/BUNGO.mp3'     },
      { id: '7',  animeName: 'Assassination Classroom',                 openingTitle: 'Bye Bye Yesterday',              artist: '3-nen E-gumi Utatan',       op: 4,  image: '/2016/OPENING/Cover/ASSCLASS.png',  audio: '/2016/OPENING/Audio/ASSCLASS.mp3'  },
      { id: '8',  animeName: 'ERASED',                                  openingTitle: 'Re:Re:',                         artist: 'ASIAN KUNG-FU GENERATION',         image: '/2016/OPENING/Cover/ERASED.png',    audio: '/2016/OPENING/Audio/ERASED.mp3'    },
      { id: '9',  animeName: 'Re:ZERO',                                 openingTitle: 'Redo',                           artist: 'Konomi Suzuki',                     image: '/2016/OPENING/Cover/REZERO.png',    audio: '/2016/OPENING/Audio/REZERO.mp3'    },
      { id: '10', animeName: 'Fairy Tail',                              openingTitle: 'Ashita wo Narase',               artist: 'Kavka Shishido',            op: 22, image: '/2016/OPENING/Cover/FAIRY.png',     audio: '/2016/OPENING/Audio/FAIRY.mp3'     },
      { id: '11', animeName: 'Tales of Zestiria the X',                 openingTitle: 'Kaze no Uta',                    artist: 'FLOW',                              image: '/2016/OPENING/Cover/TALES.png',     audio: '/2016/OPENING/Audio/TALES.mp3'     },
      { id: '12', animeName: "Haven't You Heard? I'm Sakamoto",         openingTitle: 'COOLEST',                        artist: 'CustomiZ',                          image: '/2016/OPENING/Cover/SAKAMOTO.png',  audio: '/2016/OPENING/Audio/SAKAMOTO.mp3'  },
      { id: '13', animeName: 'Twin Star Exorcists',                     openingTitle: 'sync',                           artist: 'lol',                       op: 3,  image: '/2016/OPENING/Cover/TWINSTAR.png',  audio: '/2016/OPENING/Audio/TWINSTAR.mp3'  },
      { id: '14', animeName: 'Yuri!!! on Ice',                          openingTitle: 'History Maker',                  artist: 'Dean Fujioka',                      image: '/2016/OPENING/Cover/YURI.png',      audio: '/2016/OPENING/Audio/YURI.mp3'      },
      { id: '15', animeName: 'D.Gray-man Hallow',                       openingTitle: 'Key -bring it on, my Destiny-', artist: 'Lenny code fiction',                image: '/2016/OPENING/Cover/DGRAY.png',     audio: '/2016/OPENING/Audio/DGRAY.mp3'     },
    ],
    animes: [
      // { id: '1', name: 'Re:Zero', image: '/nominees/2016/animes/1/cover.jpg' },
    ],
  },

  2015: {
    openings: [
      { id: '1',  animeName: 'Fate/stay night: Unlimited Blade Works',   openingTitle: 'Brave Shine',                              artist: 'Aimer',                                     op: 2,  image: '/2015/OPENING/Cover/FATE2.png',       audio: '/2015/OPENING/Audio/FATE2.mp3'       },
      { id: '2',  animeName: 'Noragami Aragoto',                          openingTitle: 'Kyouran Hey Kids!!',                       artist: 'THE ORAL CIGARETTES',                                image: '/2015/OPENING/Cover/NORAGAMI.png',    audio: '/2015/OPENING/Audio/NORAGAMI.mp3'    },
      { id: '3',  animeName: 'Blood Blockade Battlefront',                openingTitle: 'Hello, World!',                            artist: 'BUMP OF CHICKEN',                                    image: '/2015/OPENING/Cover/BBB.png',          audio: '/2015/OPENING/Audio/BBB.mp3'          },
      { id: '4',  animeName: 'Seraph of the End',                         openingTitle: 'X.U.',                                     artist: 'SawanoHiroyuki[nZk]:Gemie',                          image: '/2015/OPENING/Cover/SERAPH.png',      audio: '/2015/OPENING/Audio/SERAPH.mp3'      },
      { id: '5',  animeName: 'One Piece',                                 openingTitle: 'Hard Knock Days',                          artist: 'GENERATIONS from EXILE TRIBE',              op: 18, image: '/2015/OPENING/Cover/ONE18.png',       audio: '/2015/OPENING/Audio/ONE18.mp3'       },
      { id: '6',  animeName: 'Naruto: Shippuden',                         openingTitle: 'Kaze',                                     artist: 'Yamazaru',                                  op: 17, image: '/2015/OPENING/Cover/NARUTO17.png',    audio: '/2015/OPENING/Audio/NARUTO17.mp3'    },
      { id: '7',  animeName: "Kuroko's Basketball",                        openingTitle: 'Punky Funky Love',                         artist: 'GRANRODEO',                                 op: 7,  image: '/2015/OPENING/Cover/KUROKO7.png',     audio: '/2015/OPENING/Audio/KUROKO7.mp3'     },
      { id: '8',  animeName: 'Death Parade',                              openingTitle: 'Flyers',                                   artist: 'BRADIO',                                             image: '/2015/OPENING/Cover/DEATHPARADE.png', audio: '/2015/OPENING/Audio/DEATHPARADE.mp3' },
      { id: '9',  animeName: 'Food Wars!',                                openingTitle: 'Kibou no Uta',                             artist: 'ULTRATOWER',                                         image: '/2015/OPENING/Cover/FOODWARS.png',    audio: '/2015/OPENING/Audio/FOODWARS.mp3'    },
      { id: '10', animeName: 'Overlord',                                  openingTitle: 'Clattanoia',                               artist: 'OxT',                                                image: '/2015/OPENING/Cover/OVERLORD.png',    audio: '/2015/OPENING/Audio/OVERLORD.mp3'    },
      { id: '11', animeName: 'Chivalry of a Failed Knight',               openingTitle: 'Identity',                                 artist: 'Mikio Sakai',                                        image: '/2015/OPENING/Cover/CHIVALRY.png',    audio: '/2015/OPENING/Audio/CHIVALRY.mp3'    },
      { id: '12', animeName: 'Fairy Tail',                                openingTitle: 'BREAK OUT',                                artist: 'V6',                                        op: 18, image: '/2015/OPENING/Cover/FAIRY18.png',     audio: '/2015/OPENING/Audio/FAIRY18.mp3'     },
      { id: '13', animeName: 'Pokémon XYZ',                               openingTitle: 'XY&Z',                                     artist: 'Rica Matsumoto',                                     image: '/2015/OPENING/Cover/POKEMON.png',     audio: '/2015/OPENING/Audio/POKEMON.mp3'     },
      { id: '14', animeName: 'Dragon Ball Super',                         openingTitle: 'Chouzetsu☆Dynamic!',                      artist: 'Kazuya Yoshii',                                      image: '/2015/OPENING/Cover/DBS.png',          audio: '/2015/OPENING/Audio/DBS.mp3'          },
      { id: '15', animeName: 'Haikyu!!',                                  openingTitle: "I'm a Believer",                           artist: 'SPYAIR',                                    op: 3,  image: '/2015/OPENING/Cover/HAIKYU3.png',     audio: '/2015/OPENING/Audio/HAIKYU3.mp3'     },
      { id: '16', animeName: "JoJo's Bizarre Adventure: Stardust Crusaders", openingTitle: 'Sono Chi no Kioku ~End of THE WORLD~', artist: 'JO☆STARS ~TOMMY, Coda, JIN~',            op: 4,  image: '/2015/OPENING/Cover/JOJO4.png',       audio: '/2015/OPENING/Audio/JOJO4.mp3'       },
    ],
    animes: [
      // { id: '1', name: 'One Punch Man', image: '/2015/ANIME/Cover/OPM.png', silhouette: '/2015/ANIME/Silhouette/OPM.png' },
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
