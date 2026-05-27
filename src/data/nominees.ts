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
      { id: '15', animeName: 'The Rising of the Shield Hero', openingTitle: 'FAITH',               artist: 'MADKID',               op: 2,         image: '/2019/OPENING/Cover/SHIELD.png',   audio: '/2019/OPENING/Audio/RISING.MP3'       },
      { id: '16', animeName: 'BEASTARS',                      openingTitle: 'Wild Side',           artist: 'ALI',                                 image: '/2019/OPENING/Cover/BEASTAR.png',  audio: '/2019/OPENING/Audio/BEASTARS.MP3'     },
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
      { id: '14', animeName: 'Nanatsu no Taizai',                   openingTitle: 'Ame ga Furu kara Niji ga Deru', artist: 'Sky Peace',            op: 5,  image: '/2018/OPENING/Cover/NANATSU5.png',   audio: '/2018/OPENING/Audio/NANATSU5.MP3'     },
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
      { id: '17', animeName: 'Nanatsu no Taizai',                           openingTitle: 'Howling',                artist: 'FLOW × GRANRODEO',          op: 4,  image: '/2017/OPENING/Cover/NNT4.png',   audio: '/2017/OPENING/Audio/NANATSU4.MP3'      },
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
      { id: '2',  animeName: 'The Seven Deadly Sins',                  openingTitle: 'Netsujou no Spectrum',     artist: 'Ikimonogakari',                               image: '/2014/OPENING/Cover/NNT.jpg',         audio: '/2014/OPENING/Audio/NANATSU1.MP3'    },
      { id: '3',  animeName: 'No Game No Life',                        openingTitle: 'This Game',                artist: 'Konomi Suzuki',                               image: '/2014/OPENING/Cover/NOGAME.jpg',      audio: '/2014/OPENING/Audio/NGNO.MP3'        },
      { id: '4',  animeName: 'Your Lie in April',                      openingTitle: 'Hikaru Nara',              artist: 'Goose house',                                 image: '/2014/OPENING/Cover/APRIL.jpg',       audio: '/2014/OPENING/Audio/SHIGATSU.MP3'    },
      { id: '5',  animeName: 'Parasyte -the maxim-',                   openingTitle: 'Let Me Hear',              artist: 'Fear, and Loathing in Las Vegas',              image: '/2014/OPENING/Cover/PARASYTE.jpg',    audio: '/2014/OPENING/Audio/PARASYTE.MP3'    },
      { id: '6',  animeName: "Kuroko's Basketball",                    openingTitle: 'Hengen Jizai no Magical Star', artist: 'GRANRODEO',                         op: 4,  image: '/2014/OPENING/Cover/KUROKO.jpg',      audio: '/2014/OPENING/Audio/KUROKO4.MP3'     },
      { id: '7',  animeName: 'Tokyo Ghoul',                            openingTitle: 'Unravel',                  artist: 'TK from Ling Tosite Sigure',                   image: '/2014/OPENING/Cover/TOKYO.jpg',       audio: '/2014/OPENING/Audio/TG.MP3'          },
      { id: '8',  animeName: 'Sword Art Online II',                    openingTitle: 'IGNITE',                   artist: 'Eir Aoi',                             op: 3,  image: '/2014/OPENING/Cover/SAO2.jpg',        audio: '/2014/OPENING/Audio/SAO3.MP3'        },
      { id: '9',  animeName: 'Fairy Tail',                             openingTitle: 'MASAYUME CHASING',         artist: 'BoA',                                 op: 15, image: '/2014/OPENING/Cover/FAIRY.jpg',       audio: '/2014/OPENING/Audio/FT15.MP3'        },
      { id: '10', animeName: 'Akame ga Kill!',                         openingTitle: 'Liar Mask',                artist: 'Rika Mayama',                         op: 2,  image: '/2014/OPENING/Cover/AKAME.jpg',       audio: '/2014/OPENING/Audio/AKAME2.MP3'      },
      { id: '11', animeName: 'Kill la Kill',                           openingTitle: 'ambiguous',                artist: 'GARNiDELiA',                          op: 2,  image: '/2014/OPENING/Cover/KILLLA.jpg',      audio: '/2014/OPENING/Audio/KLK2.MP3'        },
      { id: '12', animeName: 'Haikyu!!',                               openingTitle: 'Imagination',              artist: 'SPYAIR',                                      image: '/2014/OPENING/Cover/HAIKYU.jpg',      audio: '/2014/OPENING/Audio/HAIKYUU1.MP3'    },
      { id: '13', animeName: 'The Irregular at Magic High School',     openingTitle: 'Rising Hope',              artist: 'LiSA',                                        image: '/2014/OPENING/Cover/IRREGULAR.jpg',   audio: '/2014/OPENING/Audio/MAHOUKA.MP3'     },
      { id: '14', animeName: 'Re: Hamatora',                           openingTitle: 'Sen no Tsubasa',           artist: 'livetune adding Takuro Sugawara',              image: '/2014/OPENING/Cover/HAMATORA.jpg',    audio: '/2014/OPENING/Audio/HAMATORA.MP3'    },
      { id: '15', animeName: 'Mushishi: The Next Passage',             openingTitle: 'Shiver',                   artist: 'Lucy Rose',                           op: 2,  image: '/2014/OPENING/Cover/MUSHISHI.jpg',    audio: '/2014/OPENING/Audio/MUSHISHI2.MP3'   },
      { id: '16', animeName: 'Noragami',                               openingTitle: 'Goya no Machiawase',       artist: 'Hello Sleepwalkers',                          image: '/2014/OPENING/Cover/NORAGAMI.jpg',    audio: '/2014/OPENING/Audio/NORAGAMI1.MP3'   },
      { id: '17', animeName: 'Magi: The Kingdom of Magic',             openingTitle: 'ANNIVERSARY',              artist: 'SID',                                 op: 3,  image: '/2014/OPENING/Cover/MAGI.jpg',        audio: '/2014/OPENING/Audio/MAGI3.MP3'       },
    ],
    animes: [],
  },

  2013: {
    openings: [
      { id: '1',  animeName: "JoJo's Bizarre Adventure",              openingTitle: 'Bloody Stream',                    artist: 'Coda',                                op: 2,  image: '/2013/OPENING/Cover/JOJO2.png',      audio: '/2013/OPENING/Audio/JOJO2.MP3'      },
      { id: '2',  animeName: 'Attack on Titan',                       openingTitle: 'Guren no Yumiya',                  artist: 'Linked Horizon',                              image: '/2013/OPENING/Cover/AOT.png',        audio: '/2013/OPENING/Audio/AOT.MP3'        },
      { id: '3',  animeName: 'Gintama',                               openingTitle: 'Tougenkyou Alien',                 artist: 'serial TV drama',                     op: 13, image: '/2013/OPENING/Cover/GINTAMA13.png',  audio: '/2013/OPENING/Audio/GINTAMA13.MP3'  },
      { id: '4',  animeName: 'Log Horizon',                           openingTitle: 'database feat. TAKUMA (10-FEET)',  artist: 'MAN WITH A MISSION',                          image: '/2013/OPENING/Cover/LOG.png',        audio: '/2013/OPENING/Audio/LOG.MP3'        },
      { id: '5',  animeName: 'Psycho-Pass',                           openingTitle: 'Out of Control',                   artist: "Nothing's Carved In Stone",           op: 2,  image: '/2013/OPENING/Cover/PSYCHO2.png',    audio: '/2013/OPENING/Audio/PSYCHO2.MP3'    },
      { id: '6',  animeName: "Kuroko's Basketball",                   openingTitle: 'The Other self',                   artist: 'GRANRODEO',                           op: 3,  image: '/2013/OPENING/Cover/KUROKO3.png',    audio: '/2013/OPENING/Audio/KUROKO3.MP3'    },
      { id: '7',  animeName: 'Magi: The Kingdom of Magic',            openingTitle: 'Hikari',                           artist: 'ViViD',                               op: 2,  image: '/2013/OPENING/Cover/MAGI2.png',      audio: '/2013/OPENING/Audio/MAGI2.MP3'      },
      { id: '8',  animeName: 'My Little Pony: Friendship is Magic',   openingTitle: 'Tomodachi wa Mahou',               artist: 'Emiri Katō & Aya Hirano',                     image: '/2013/OPENING/Cover/MLP.png',        audio: '/2013/OPENING/Audio/MLP.MP3'        },
      { id: '9',  animeName: 'Beyond the Boundary',                   openingTitle: 'Kyokai no Kanata',                 artist: 'Minori Chihara',                              image: '/2013/OPENING/Cover/BEYOND.png',     audio: '/2013/OPENING/Audio/BEYOND.MP3'     },
      { id: '10', animeName: 'One Piece',                             openingTitle: 'Hands Up!',                        artist: 'Koda Kumi',                           op: 16, image: '/2013/OPENING/Cover/ONE16.png',      audio: '/2013/OPENING/Audio/ONE16.MP3'      },
      { id: '11', animeName: 'Free!',                                 openingTitle: 'Rage On',                          artist: 'OLDCODEX',                                    image: '/2013/OPENING/Cover/FREE.png',       audio: '/2013/OPENING/Audio/FREE.MP3'       },
      { id: '12', animeName: 'Blood Lad',                             openingTitle: 'ViViD',                            artist: "May'n",                                       image: '/2013/OPENING/Cover/BLOODLAD.png',   audio: '/2013/OPENING/Audio/BLOODLAD.MP3'   },
      { id: '13', animeName: 'Kill la Kill',                          openingTitle: 'sirius',                           artist: 'Eir Aoi',                                     image: '/2013/OPENING/Cover/KLK.png',        audio: '/2013/OPENING/Audio/KLK.MP3'        },
    ],
    animes: [
      // { id: '1', name: 'Attack on Titan', image: '/2013/ANIME/Cover/AOT.png' },
    ],
  },

  2012: {
    openings: [
      { id: '1',  animeName: 'Fairy Tail',                       openingTitle: 'The Rock City Boy',          artist: 'JAMIL',                       op: 8,  image: '/2012/OPENING/Cover/FT8.png',         audio: '/2012/OPENING/Audio/FT8.MP3'         },
      { id: '2',  animeName: "Kuroko's Basketball",              openingTitle: 'Can Do',                     artist: 'GRANRODEO',                           image: '/2012/OPENING/Cover/KUROKO1.png',     audio: '/2012/OPENING/Audio/KUROKO1.MP3'     },
      { id: '3',  animeName: 'Magi: The Labyrinth of Magic',     openingTitle: 'V.I.P',                      artist: 'SID',                                 image: '/2012/OPENING/Cover/MAGI1.png',       audio: '/2012/OPENING/Audio/MAGI1.MP3'       },
      { id: '4',  animeName: 'Btooom!',                          openingTitle: 'No Pain, No Game',           artist: 'Nano',                                image: '/2012/OPENING/Cover/BTOOOM.png',      audio: '/2012/OPENING/Audio/BTOOOM.MP3'      },
      { id: '5',  animeName: "JoJo's Bizarre Adventure",        openingTitle: 'JoJo ~Sono Chi no Sadame~', artist: 'Hiroaki Tommy Tominaga',               image: '/2012/OPENING/Cover/JOJO1.png',       audio: '/2012/OPENING/Audio/JOJO1.MP3'       },
      { id: '6',  animeName: 'Accel World',                      openingTitle: 'Chase the World',            artist: "May'n",                               image: '/2012/OPENING/Cover/ACCEL.png',       audio: '/2012/OPENING/Audio/ACCEL.MP3'       },
      { id: '7',  animeName: 'Psycho-Pass',                      openingTitle: 'abnormalize',                artist: 'Ling Tosite Sigure',                   image: '/2012/OPENING/Cover/PSYCHO1.png',     audio: '/2012/OPENING/Audio/PSYCHO1.MP3'     },
      { id: '8',  animeName: 'Sword Art Online',                 openingTitle: 'Crossing Field',             artist: 'LiSA',                                image: '/2012/OPENING/Cover/SAO1.png',        audio: '/2012/OPENING/Audio/SAO1.MP3'        },
      { id: '9',  animeName: 'Hiiro no Kakera',                  openingTitle: 'Nee',                        artist: 'Fujita Maiko',                         image: '/2012/OPENING/Cover/HIIRO.png',       audio: '/2012/OPENING/Audio/HIIRO.MP3'       },
      { id: '10', animeName: 'High School DxD',                  openingTitle: 'Trip -innocent of D-',       artist: 'Larval Stage Planning',               image: '/2012/OPENING/Cover/DXD.png',         audio: '/2012/OPENING/Audio/DXD.MP3'         },
      { id: '11', animeName: 'Code:Breaker',                     openingTitle: 'Dark Shame',                 artist: 'GRANRODEO',                           image: '/2012/OPENING/Cover/CODEB.png',       audio: '/2012/OPENING/Audio/CODEB.MP3'       },
      { id: '12', animeName: 'Aquarion Evol',                    openingTitle: 'Paradoxical ZOO',            artist: 'AKINO with bless4',           op: 2,  image: '/2012/OPENING/Cover/AQUARION2.png',   audio: '/2012/OPENING/Audio/AQUARION2.MP3'   },
      { id: '13', animeName: 'Hyouka',                           openingTitle: 'Yasashisa no Riyuu',         artist: 'ChouCho',                             image: '/2012/OPENING/Cover/HYOUKA.png',      audio: '/2012/OPENING/Audio/HYOUKA.MP3'      },
      { id: '14', animeName: 'Fate/Zero',                        openingTitle: 'To the Beginning',           artist: 'Kalafina',                    op: 2,  image: '/2012/OPENING/Cover/FATEZERO2.png',   audio: '/2012/OPENING/Audio/FATEZERO2.MP3'   },
    ],
    animes: [],
  },

  2011: {
    openings: [
      { id: '1',  animeName: 'Bleach',                                    openingTitle: 'BLUE',                  artist: 'ViViD',                        op: 14, image: '/2011/OPENING/Cover/BLEACH14.png',    audio: '/2011/OPENING/Audio/BLEACH14.MP3'    },
      { id: '2',  animeName: 'One Piece',                                 openingTitle: 'We Go!',                artist: 'Hiroshi Kitadani',              op: 15, image: '/2011/OPENING/Cover/ONE15.png',       audio: '/2011/OPENING/Audio/ONE15.MP3'       },
      { id: '3',  animeName: 'Blue Exorcist',                             openingTitle: 'CORE PRIDE',            artist: 'UVERworld',                            image: '/2011/OPENING/Cover/BLUEX.png',       audio: '/2011/OPENING/Audio/BLUEX.MP3'       },
      { id: '4',  animeName: 'Hunter × Hunter',                           openingTitle: 'departure!',            artist: 'Masatoshi Ono',                        image: '/2011/OPENING/Cover/HXH.png',         audio: '/2011/OPENING/Audio/HXH.MP3'         },
      { id: '5',  animeName: 'Naruto: Shippuden',                         openingTitle: 'Diver',                 artist: 'NICO Touches the Walls',        op: 8,  image: '/2011/OPENING/Cover/NARUTO8.png',     audio: '/2011/OPENING/Audio/NARUTO8.MP3'     },
      { id: '6',  animeName: 'Guilty Crown',                              openingTitle: 'My Dearest',            artist: 'supercell',                            image: '/2011/OPENING/Cover/GUILTYCROWN.png', audio: '/2011/OPENING/Audio/GUILTYCROWN.MP3' },
      { id: '7',  animeName: 'Future Diary',                              openingTitle: 'Kuusou Mesorogiwi',     artist: 'Yousei Teikoku',                       image: '/2011/OPENING/Cover/FUTUREDIARY.png', audio: '/2011/OPENING/Audio/FUTUREDIARY.MP3' },
      { id: '8',  animeName: 'Anohana: The Flower We Saw That Day',       openingTitle: 'Aoi Shiori',            artist: 'Galileo Galilei',                      image: '/2011/OPENING/Cover/ANOHANA.png',     audio: '/2011/OPENING/Audio/ANOHANA.MP3'     },
      { id: '9',  animeName: 'Steins;Gate',                               openingTitle: 'Hacking to the Gate',  artist: 'Kanako Itō',                           image: '/2011/OPENING/Cover/STEINSGATE.png',  audio: '/2011/OPENING/Audio/STEINSGATE.MP3'  },
      { id: '10', animeName: 'Deadman Wonderland',                        openingTitle: 'One Reason',            artist: 'Fade',                                 image: '/2011/OPENING/Cover/DEADMAN.png',     audio: '/2011/OPENING/Audio/DEADMAN.MP3'     },
      { id: '11', animeName: 'Fairy Tail',                                openingTitle: 'Fiesta',                artist: '+Plus',                         op: 6,  image: '/2011/OPENING/Cover/FT6.png',         audio: '/2011/OPENING/Audio/FT6.MP3'         },
      { id: '12', animeName: 'Beelzebub',                                 openingTitle: 'Hey!!!',                artist: 'FLOW',                          op: 3,  image: '/2011/OPENING/Cover/BEELZEBUB3.png',  audio: '/2011/OPENING/Audio/BEELZEBUB3.MP3'  },
      { id: '13', animeName: 'Toriko',                                    openingTitle: 'Guts Guts!!',           artist: 'Miyu Irino',                           image: '/2011/OPENING/Cover/TORIKO.png',      audio: '/2011/OPENING/Audio/TORIKO.MP3'      },
      { id: '14', animeName: 'Bakuman. 2',                                openingTitle: 'Dream of Life',         artist: 'Shohei Ito',                           image: '/2011/OPENING/Cover/BAKUMAN2.png',    audio: '/2011/OPENING/Audio/BAKUMAN2.MP3'    },
      { id: '15', animeName: 'Fate/Zero',                                 openingTitle: 'oath sign',             artist: 'LiSA',                                 image: '/2011/OPENING/Cover/FATEZERO1.png',   audio: '/2011/OPENING/Audio/FATEZERO1.MP3'   },
    ],
    animes: [],
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
      { id: '1', animeName: 'Eureka Seven', openingTitle: 'DAYS', artist: 'FLOW', image: '/2005/OPENING/Cover/EUREKA.png', audio: '/2005/OPENING/Audio/EUREKA.MP3' },
    ],
    animes: [
      // { id: '1', name: 'Fullmetal Alchemist', image: '/nominees/2005/animes/1/cover.jpg' },
    ],
  },
};
