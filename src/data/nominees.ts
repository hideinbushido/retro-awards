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
  season?: string;  // "Saison 1", "Saison 3 Part 2", ou le titre de l'arc/saison
  studio?: string;  // studio d'animation
  author?: string;  // auteur de l'œuvre originale
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
        image: '/2019/ANIME/Cover/DemonSlayer.jpg',
        season: 'Saison 1 - Arc de la Résolution inébranlable',
        studio: 'ufotable',
        author: 'Koyoharu Gotouge',
        silhouette: Array.from({ length: 13 }, (_, i) => `/2019/ANIME/Silhouette/Demon Slayer/${i + 1}.png`),
      },
      {
        id: '2',
        name: 'Attack on Titan: Season 3 Part 2 — Return to Shiganshina',
        image: '/2019/ANIME/Cover/AttackOnTitan.jpg',
        season: 'Saison 3 Partie 2 - Arc Retour à Shiganshina',
        studio: 'WIT Studio',
        author: 'Hajime Isayama',
        silhouette: Array.from({ length: 10 }, (_, i) => `/2019/ANIME/Silhouette/SNK/${15 + i}.png`),
      },
      {
        id: '3',
        name: 'Cop Craft',
        image: '/2019/ANIME/Cover/CopCraft.jpg',
        season: 'Saison 1 - Arc de la Crise de San-Teresa', // thematique
        studio: 'Millepensee',
        author: 'Shoji Gatoh',
        silhouette: Array.from({ length: 6 }, (_, i) => `/2019/ANIME/Silhouette/Cop Craft/${54 + i}.png`),
      },
      {
        id: '4',
        name: 'Carole & Tuesday',
        image: '/2019/ANIME/Cover/CaroleAndTuesday.jpg',
        season: 'Anime original - Histoire du Miracle des 7 minutes', // thematique (fil rouge de l'oeuvre, pas un arc)
        studio: 'Bones',
        author: 'Shinichiro Watanabe',
        silhouette: Array.from({ length: 6 }, (_, i) => `/2019/ANIME/Silhouette/Carole and Tuesday/${47 + i}.png`),
      },
      {
        id: '5',
        name: 'BEASTARS',
        image: '/2019/ANIME/Cover/Beastars.jpg',
        season: 'Saison 1 - Arc du Club de Théâtre + Arc du Festival des Météores',
        studio: 'Orange',
        author: 'Paru Itagaki',
        silhouette: Array.from({ length: 8 }, (_, i) => `/2019/ANIME/Silhouette/Beastars/${26 + i}.png`),
      },
      {
        id: '6',
        name: 'Bungo Stray Dogs',
        image: '/2019/ANIME/Cover/BungoStrayDogs.jpg',
        season: 'Saison 3 - Arc Cannibalism',
        studio: 'Bones',
        author: 'Kafka Asagiri',
        silhouette: Array.from({ length: 11 }, (_, i) => `/2019/ANIME/Silhouette/Bungou Stray Dogs/${35 + i}.png`),
      },
      {
        id: '7',
        name: 'Dororo',
        image: '/2019/ANIME/Cover/Dororo.jpg',
        season: 'Saison 1 - Arc de la Reconquête de Soi', // thematique
        studio: 'MAPPA x Tezuka Productions',
        author: 'Osamu Tezuka',
        silhouette: Array.from({ length: 5 }, (_, i) => `/2019/ANIME/Silhouette/Dororo/${61 + i}.png`),
      },
      {
        id: '8',
        name: 'Dr. Stone',
        image: '/2019/ANIME/Cover/DrStone.jpg',
        season: 'Saison 1 - Arc Royaume de la Science',
        studio: 'TMS Entertainment',
        author: 'Riichiro Inagaki & Boichi',
        silhouette: Array.from({ length: 9 }, (_, i) => `/2019/ANIME/Silhouette/Dr.Stone/${67 + i}.png`),
      },
      {
        id: '9',
        name: 'Fire Force',
        image: '/2019/ANIME/Cover/FireForce.jpg',
        season: 'Saison 1 - Arc de l’Introduction du Grand Prédicateur', // thematique (fusion de 2 arcs reels)
        studio: 'David Production',
        author: 'Atsushi Okubo',
        silhouette: Array.from({ length: 11 }, (_, i) => `/2019/ANIME/Silhouette/Fire Force/${77 + i}.png`),
      },
      {
        id: '10',
        name: 'Kaguya-sama: Love Is War',
        image: '/2019/ANIME/Cover/KaguyaSama.jpg',
        season: 'Saison 1 - Arc de la Guerre Psychologique', // thematique
        studio: 'A-1 Pictures',
        author: 'Aka Akasaka',
        silhouette: Array.from({ length: 7 }, (_, i) => `/2019/ANIME/Silhouette/Kaguya-Sama/${88 + i}.png`),
      },
      {
        id: '11',
        name: 'Mob Psycho 100',
        image: '/2019/ANIME/Cover/MobPsycho100.jpg',
        season: 'Saison 2 - Arc de la Domination du Monde',
        studio: 'Bones',
        author: 'ONE',
        silhouette: Array.from({ length: 9 }, (_, i) => `/2019/ANIME/Silhouette/Mob 2/${96 + i}.png`),
      },
      {
        id: '12',
        name: 'My Hero Academia',
        image: '/2019/ANIME/Cover/MyHeroAcademia.jpg',
        season: 'Saison 4 - Arc Shie Hassaikai (Overhaul) + Arc Festival de Yuei',
        studio: 'Bones',
        author: 'Kohei Horikoshi',
        silhouette: Array.from({ length: 8 }, (_, i) => `/2019/ANIME/Silhouette/My Hero Academia/${106 + i}.png`),
      },
      {
        id: '13',
        name: 'One Piece',
        image: '/2019/ANIME/Cover/OnePiece.jpg',
        season: 'Arc de Wano',
        studio: 'Toei Animation',
        author: 'Eiichiro Oda',
        silhouette: Array.from({ length: 16 }, (_, i) => `/2019/ANIME/Silhouette/One Piece/${115 + i}.png`),
      },
      {
        id: '14',
        name: 'The Promised Neverland',
        image: '/2019/ANIME/Cover/ThePromisedNeverland.jpg',
        season: 'Saison 1 - Arc Grace Field',
        studio: 'CloverWorks',
        author: 'Kaiu Shirai & Posuka Demizu',
        silhouette: Array.from({ length: 10 }, (_, i) => `/2019/ANIME/Silhouette/Promised Neverland/${132 + i}.png`),
      },
      {
        id: '15',
        name: 'Sword Art Online: Alicization',
        image: '/2019/ANIME/Cover/SwordArtOnlineAlicization.jpg',
        season: 'Saison 1 - Arc de l’Arrivée dans l’Underworld', // thematique
        studio: 'A-1 Pictures',
        author: 'Reki Kawahara',
        silhouette: Array.from({ length: 6 }, (_, i) => `/2019/ANIME/Silhouette/Sao Alicization/${143 + i}.png`),
      },
      {
        id: '16',
        name: 'Vinland Saga',
        image: '/2019/ANIME/Cover/VinlandSaga.jpg',
        season: 'Saison 1 - Arc de la Guerre',
        studio: 'WIT Studio',
        author: 'Makoto Yukimura',
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
      {
        id: '1',
        name: 'Steins;Gate 0',
        image: '/2018/ANIME/Cover/SteinsGate0.jpg',
        season: 'Suite - Arc de la Ligne du Monde Bêta', // thematique
        studio: 'White Fox',
        author: '5pb. & Nitroplus',
      },
      {
        id: '2',
        name: 'My Hero Academia',
        image: '/2018/ANIME/Cover/MyHeroAcademia.jpg',
        season: 'Saison 3 - Arc du Camp d’Entraînement + Arc de l’Assaut du Repaire + Arc du Permis Provisoire',
        studio: 'Bones',
        author: 'Kohei Horikoshi',
      },
      {
        id: '3',
        name: 'Grand Blue',
        image: '/2018/ANIME/Cover/GrandBlue.jpg',
        season: 'Saison 1 - Arc du Club de Plongée', // thematique
        studio: 'Zero-G',
        author: 'Kenji Inoue & Kimitake Yoshioka',
      },
      {
        id: '4',
        name: 'Golden Kamuy',
        image: '/2018/ANIME/Cover/GoldenKamuy.jpg',
        season: 'Saisons 1 & 2 - Arc de la Chasse à l’Or', // thematique
        studio: 'Geno Studio',
        author: 'Satoru Noda',
      },
      {
        id: '5',
        name: 'Banana Fish',
        image: '/2018/ANIME/Cover/BananaFish.jpg',
        season: 'Saison unique - Arc du Banana Fish', // thematique
        studio: 'MAPPA',
        author: 'Akimi Yoshida',
      },
      {
        id: '6',
        name: 'Wotakoi: Love Is Hard for Otaku',
        image: '/2018/ANIME/Cover/WotakoiLoveIsHardForOtaku.jpg',
        season: 'Saison 1 - Arc des Amours Otaku', // thematique
        studio: 'A-1 Pictures',
        author: 'Fujita',
      },
      {
        id: '7',
        name: 'Violet Evergarden',
        image: '/2018/ANIME/Cover/VioletEvergarden.jpg',
        season: 'Saison 1 - Arc des Poupées de Souvenirs Automatiques', // thematique
        studio: 'Kyoto Animation',
        author: 'Kana Akatsuki',
      },
      {
        id: '8',
        name: 'Moi quand je me réincarne en Slime',
        image: '/2018/ANIME/Cover/MoiQuandJeMeReincarneEnSlime.jpg',
        season: 'Saison 1 - Arc de la Fondation de Tempest', // thematique
        studio: 'Eight Bit',
        author: 'Fuse',
      },
      {
        id: '9',
        name: 'Black Clover',
        image: '/2018/ANIME/Cover/BlackClover.jpg',
        season: 'Saison 1 - Arc de l’Œil du Minuit Blanc', // thematique
        studio: 'Studio Pierrot',
        author: 'Yuki Tabata',
      },
      {
        id: '10',
        name: 'Attack on Titan',
        image: '/2018/ANIME/Cover/AttackOnTitan.jpg',
        season: 'Saison 3 Partie 1 - Arc de la Révolte',
        studio: 'WIT Studio',
        author: 'Hajime Isayama',
      },
      {
        id: '11',
        name: 'Nanatsu no Taizai',
        image: '/2018/ANIME/Cover/NanatsuNoTaizai.jpg',
        season: 'Saison 2 - Revival of the Commandments',
        studio: 'A-1 Pictures',
        author: 'Nakaba Suzuki',
      },
      {
        id: '12',
        name: 'Food Wars! The Third Plate',
        image: '/2018/ANIME/Cover/FoodWarsTheThirdPlate.jpg',
        season: 'Saison 3 - Arc Central',
        studio: 'J.C.Staff',
        author: 'Yuto Tsukuda & Shun Saeki',
      },
      {
        id: '13',
        name: 'JoJo’s Bizarre Adventure',
        image: '/2018/ANIME/Cover/JoJosBizarreAdventure.jpg',
        season: 'Saison 4 / Partie 5 - Golden Wind',
        studio: 'David Production',
        author: 'Hirohiko Araki',
      },
      {
        id: '14',
        name: 'Devilman Crybaby',
        image: '/2018/ANIME/Cover/DevilmanCrybaby.jpg',
        season: 'Saison unique - Arc de l’Éveil du Devilman', // thematique
        studio: 'Science SARU',
        author: 'Go Nagai',
      },
      {
        id: '15',
        name: 'Baki',
        image: '/2018/ANIME/Cover/Baki.jpg',
        season: 'Saison 1 - Arc des Condamnés à Mort les plus Maléfiques',
        studio: 'TMS Entertainment',
        author: 'Keisuke Itagaki',
      },
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
      {
        id: '1',
        name: 'Saga of Tanya the Evil',
        image: '/2017/ANIME/Cover/SagaOfTanyaTheEvil.jpg',
        season: 'Saison 1 - Arc de la Guerre de l’Empire', // thematique
        studio: 'NUT',
        author: 'Carlo Zen',
      },
      {
        id: '2',
        name: 'Blue Exorcist: Kyoto Saga',
        image: '/2017/ANIME/Cover/BlueExorcistKyotoSaga.jpg',
        season: 'Saison 2 - Arc du Roi Impur',
        studio: 'A-1 Pictures',
        author: 'Kazue Katō',
      },
      {
        id: '3',
        name: 'Tales of Zestiria the X',
        image: '/2017/ANIME/Cover/TalesOfZestiriaTheX.jpg',
        season: 'Saison 2 - Arc du Berger et des Seigneurs', // thematique
        studio: 'ufotable',
        author: 'Hideo Baba',
      },
      {
        id: '4',
        name: 'ACCA: 13-Territory Inspection Dept.',
        image: '/2017/ANIME/Cover/ACCA13TerritoryInspectionDept.jpg',
        season: 'Saison unique - Arc de l’Inspection des 13 Territoires', // thematique
        studio: 'Madhouse',
        author: 'Natsume Ono',
      },
      {
        id: '5',
        name: 'Yowamushi Pedal: New Generation',
        image: '/2017/ANIME/Cover/YowamushiPedalNewGeneration.jpg',
        season: 'Saison 3 - Arc de la 42e Inter-High', // thematique
        studio: 'TMS Entertainment',
        author: 'Wataru Watanabe',
      },
      {
        id: '6',
        name: 'Attack on Titan',
        image: '/2017/ANIME/Cover/AttackOnTitan.jpg',
        season: 'Saison 2 - Arc du Choc des Titans',
        studio: 'WIT Studio',
        author: 'Hajime Isayama',
      },
      {
        id: '7',
        name: 'My Hero Academia',
        image: '/2017/ANIME/Cover/MyHeroAcademia.jpg',
        season: 'Saison 2 - Saga du Début de l’Apocalypse', // thematique
        studio: 'Bones',
        author: 'Kohei Horikoshi',
      },
      {
        id: '8',
        name: 'Dragon Ball Super',
        image: '/2017/ANIME/Cover/DragonBallSuper.jpg',
        season: 'Arc de la Survie de l’Univers (Tournoi du Pouvoir)',
        studio: 'Toei Animation',
        author: 'Akira Toriyama',
      },
      {
        id: '9',
        name: 'Made in Abyss',
        image: '/2017/ANIME/Cover/MadeInAbyss.jpg',
        season: 'Saison 1 - Arc de la Descente dans l’Abîme', // thematique
        studio: 'Kinema Citrus',
        author: 'Akihito Tsukushi',
      },
      {
        id: '10',
        name: 'Kakegurui',
        image: '/2017/ANIME/Cover/Kakegurui.jpg',
        season: 'Saison 1 - Arc de l’Académie Hyakkaou', // thematique
        studio: 'MAPPA',
        author: 'Homura Kawamoto & Tōru Naomura',
      },
      {
        id: '11',
        name: 'Twin Star Exorcists',
        image: '/2017/ANIME/Cover/TwinStarExorcists.jpg',
        season: 'Fin de série - Arc de l’Ame-no-Mihashira', // thematique
        studio: 'Studio Pierrot',
        author: 'Yoshiaki Sukeno',
      },
      {
        id: '12',
        name: 'One Piece',
        image: '/2017/ANIME/Cover/OnePiece.jpg',
        season: 'Arc de Whole Cake Island',
        studio: 'Toei Animation',
        author: 'Eiichiro Oda',
      },
      {
        id: '13',
        name: 'Naruto Shippuden',
        image: '/2017/ANIME/Cover/NarutoShippuden.jpg',
        season: 'Épilogue : Arc Konoha Hiden',
        studio: 'Studio Pierrot',
        author: 'Masashi Kishimoto',
      },
      {
        id: '14',
        name: 'Fate/Apocrypha',
        image: '/2017/ANIME/Cover/FateApocrypha.jpg',
        season: 'Saison unique - Arc de la Grande Guerre du Saint Graal', // thematique
        studio: 'A-1 Pictures',
        author: 'Yūichirō Higashide',
      },
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
      {
        id: '1',
        name: 'Assassination Classroom',
        image: '/2016/ANIME/Cover/AssassinationClassroom.jpg',
        season: 'Saison 2 - Arc de la Remise des Diplômes', // thematique
        studio: 'Lerche',
        author: 'Yūsei Matsui',
      },
      {
        id: '2',
        name: 'Erased',
        image: '/2016/ANIME/Cover/Erased.jpg',
        season: 'Saison unique - Arc du Retour en 1988', // thematique
        studio: 'A-1 Pictures',
        author: 'Kei Sanbe',
      },
      {
        id: '3',
        name: 'Divine Gate',
        image: '/2016/ANIME/Cover/DivineGate.jpg',
        season: 'Saison unique - Arc de la Porte Divine', // thematique
        studio: 'Studio Pierrot',
        author: 'GungHo Online Entertainment',
      },
      {
        id: '4',
        name: 'JoJo’s Bizarre Adventure: Diamond is Unbreakable',
        image: '/2016/ANIME/Cover/JoJoDiamondIsUnbreakable.jpg',
        season: 'Saison 3 / Partie 4 - Diamond is Unbreakable',
        studio: 'David Production',
        author: 'Hirohiko Araki',
      },
      {
        id: '5',
        name: 'My Hero Academia',
        image: '/2016/ANIME/Cover/MyHeroAcademia.jpg',
        season: 'Saison 1 - Arc de l’Attaque de l’USJ',
        studio: 'Bones',
        author: 'Kohei Horikoshi',
      },
      {
        id: '6',
        name: 'Re:Zero',
        image: '/2016/ANIME/Cover/ReZero.jpg',
        season: 'Saison 1 - Arc de la Baleine Blanche', // thematique
        studio: 'White Fox',
        author: 'Tappei Nagatsuki',
      },
      {
        id: '7',
        name: 'Magi: Adventure of Sinbad',
        image: '/2016/ANIME/Cover/MagiAdventureOfSinbad.jpg',
        season: 'Saison unique - Arc des Débuts de Sinbad', // thematique
        studio: 'Lay-duce',
        author: 'Shinobu Ohtaka & Yoshifumi Ohtera',
      },
      {
        id: '8',
        name: 'D.Gray-man Hallow',
        image: '/2016/ANIME/Cover/DGrayManHallow.jpg',
        season: 'Saison 2 - Arc d’Alma Karma', // thematique
        studio: 'TMS Entertainment',
        author: 'Katsura Hoshino',
      },
      {
        id: '9',
        name: '91 Days',
        image: '/2016/ANIME/Cover/91Days.jpg',
        season: 'Anime original - Arc de la Vengeance d’Angelo', // thematique
        studio: 'Shuka',
        author: 'Hiro Kaburagi',
      },
      {
        id: '10',
        name: 'Mob Psycho 100',
        image: '/2016/ANIME/Cover/MobPsycho100.jpg',
        season: 'Saison 1 - Arc de la Griffe', // thematique
        studio: 'Bones',
        author: 'ONE',
      },
      {
        id: '11',
        name: 'The Seven Deadly Sins',
        image: '/2016/ANIME/Cover/SevenDeadlySins.jpg',
        season: 'Mini-saison - Signs of Holy War',
        studio: 'A-1 Pictures',
        author: 'Nakaba Suzuki',
      },
      {
        id: '12',
        name: 'Yuri!!! on Ice',
        image: '/2016/ANIME/Cover/YuriOnIce.jpg',
        season: 'Anime original - Arc du Grand Prix de Patinage', // thematique
        studio: 'MAPPA',
        author: 'Sayo Yamamoto & Mitsurō Kubo',
      },
      {
        id: '13',
        name: 'All Out!!',
        image: '/2016/ANIME/Cover/AllOut.jpg',
        season: 'Saison unique - Arc du Rugby au Lycée Jingū', // thematique
        studio: 'Madhouse & TMS Entertainment',
        author: 'Shiori Amase',
      },
      {
        id: '14',
        name: 'Haikyu!!',
        image: '/2016/ANIME/Cover/Haikyu.jpg',
        season: 'Saison 3 - Karasuno vs Shiratorizawa',
        studio: 'Production I.G',
        author: 'Haruichi Furudate',
      },
      {
        id: '15',
        name: 'One Piece',
        image: '/2016/ANIME/Cover/OnePiece.jpg',
        season: 'Arc de Zou',
        studio: 'Toei Animation',
        author: 'Eiichiro Oda',
      },
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
      { id: '15', animeName: 'One Punch Man',                             openingTitle: 'THE HERO!! ~Ikareru Kobushi ni Hi wo Tsukero~',   artist: 'JAM Project',                                       image: '/2015/OPENING/Cover/ONEPUNCH.jpg',    audio: '/2015/OPENING/Audio/ONEPUNCH.MP3'     },
      { id: '16', animeName: 'Charlotte',                                 openingTitle: 'Bravely You',                              artist: 'Lia',                                                image: '/2015/OPENING/Cover/CHARLOTTE.jpg',   audio: '/2015/OPENING/Audio/CHARLOTTE.MP3'   },
      { id: '17', animeName: 'Yamada-kun and the Seven Witches',          openingTitle: 'Kuchizuke Diamond',                        artist: 'WEAVER',                                             image: '/2015/OPENING/Cover/YAMADA.png',      audio: '/2015/OPENING/Audio/YAMADA.MP3'      },
    ],
    animes: [
      {
        id: '1',
        name: 'Assassination Classroom',
        image: '/2015/ANIME/Cover/AssassinationClassroom.jpg',
        season: 'Saison 1 - Arc de la Classe 3-E', // thematique
        studio: 'Lerche',
        author: 'Yūsei Matsui',
      },
      {
        id: '2',
        name: 'Death Parade',
        image: '/2015/ANIME/Cover/DeathParade.jpg',
        season: 'Anime original - Arc du Quindecim', // thematique
        studio: 'Madhouse',
        author: 'Yuzuru Tachikawa',
      },
      {
        id: '3',
        name: 'Kuroko’s Basketball',
        image: '/2015/ANIME/Cover/KurokosBasketball.jpg',
        season: 'Saison 3 - Arc de la Winter Cup', // thematique
        studio: 'Production I.G',
        author: 'Tadatoshi Fujimaki',
      },
      {
        id: '4',
        name: 'Blood Blockade Battlefront',
        image: '/2015/ANIME/Cover/BloodBlockadeBattlefront.jpg',
        season: 'Saison 1 - Arc de Hellsalem’s Lot', // thematique
        studio: 'Bones',
        author: 'Yasuhiro Nightow',
      },
      {
        id: '5',
        name: 'High School DxD BorN',
        image: '/2015/ANIME/Cover/HighSchoolDxDBorN.jpg',
        season: 'Saison 3 - Arc de la Naissance de l’Empereur Dragon', // thematique
        studio: 'TNK',
        author: 'Ichiei Ishibumi',
      },
      {
        id: '6',
        name: 'Seraph of the End',
        image: '/2015/ANIME/Cover/SeraphOfTheEnd.jpg',
        season: 'Saisons 1 & 2 - Battle in Nagoya',
        studio: 'Wit Studio',
        author: 'Takaya Kagami',
      },
      {
        id: '7',
        name: 'Nisekoi',
        image: '/2015/ANIME/Cover/Nisekoi.jpg',
        season: 'Saison 2 - Arc du Triangle Amoureux', // thematique
        studio: 'Shaft',
        author: 'Naoshi Komi',
      },
      {
        id: '8',
        name: 'Yamada-kun and the Seven Witches',
        image: '/2015/ANIME/Cover/YamadaKun.jpg',
        season: 'Saison unique - Arc des Sept Sorcières', // thematique
        studio: 'Liden Films',
        author: 'Miki Yoshikawa',
      },
      {
        id: '9',
        name: 'Overlord',
        image: '/2015/ANIME/Cover/Overlord.jpg',
        season: 'Saison 1 - Arc de la Tombe de Nazarick', // thematique
        studio: 'Madhouse',
        author: 'Kugane Maruyama',
      },
      {
        id: '10',
        name: 'God Eater',
        image: '/2015/ANIME/Cover/GodEater.jpg',
        season: 'Saison unique - Arc des Aragami', // thematique
        studio: 'ufotable',
        author: 'Bandai Namco Entertainment',
      },
      {
        id: '11',
        name: 'Haikyu!!',
        image: '/2015/ANIME/Cover/Haikyu.jpg',
        season: 'Saison 2 - Arc des Qualifications du Spring High', // thematique
        studio: 'Production I.G',
        author: 'Haruichi Furudate',
      },
      {
        id: '12',
        name: 'Noragami Aragoto',
        image: '/2015/ANIME/Cover/NoragamiAragoto.jpg',
        season: 'Saison 2 - Arc de Bishamon', // thematique
        studio: 'Bones',
        author: 'Adachitoka',
      },
      {
        id: '13',
        name: 'Chivalry of a Failed Knight',
        image: '/2015/ANIME/Cover/ChivalryOfAFailedKnight.jpg',
        season: 'Saison unique - Arc du Festival des Sept Étoiles', // thematique
        studio: 'Silver Link & Nexus',
        author: 'Riku Misora',
      },
      {
        id: '14',
        name: 'One Punch Man',
        image: '/2015/ANIME/Cover/OnePunchMan.jpg',
        season: 'Saison 1 - Arc de Boros', // thematique
        studio: 'Madhouse',
        author: 'ONE & Yusuke Murata',
      },
      {
        id: '15',
        name: 'Fairy Tail',
        image: '/2015/ANIME/Cover/FairyTail.jpg',
        season: 'Arc de Tartaros',
        studio: 'A-1 Pictures & Bridge',
        author: 'Hiro Mashima',
      },
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
      { id: '18', animeName: 'Fairy Tail',                             openingTitle: 'Strike Back',              artist: 'BACK-ON',                             op: 16, image: '/2014/OPENING/Cover/FAIRY16.jpg',     audio: '/2014/OPENING/Audio/FAIRY16.MP3'     },
      { id: '19', animeName: 'Naruto: Shippuden',                     openingTitle: 'Guren',                    artist: 'DOES',                                op: 15, image: '/2014/OPENING/Cover/NARUTO15.jpg',    audio: '/2014/OPENING/Audio/NARUTO15.MP3'    },
    ],
    animes: [
      {
        id: '1',
        name: 'Naruto Shippuden',
        image: '/2014/ANIME/Cover/NarutoShippuden.jpg',
        season: 'Arc de la 4e Grande Guerre Ninja',
        studio: 'Studio Pierrot',
        author: 'Masashi Kishimoto',
      },
      {
        id: '2',
        name: 'Re: Hamatora',
        image: '/2014/ANIME/Cover/ReHamatora.jpg',
        season: 'Saison 2 - Arc de la Trahison d’Art', // thematique
        studio: 'Lerche',
        author: 'Natsu Matsumai & Yūki Kodama',
      },
      {
        id: '3',
        name: 'Tokyo Ghoul',
        image: '/2014/ANIME/Cover/TokyoGhoul.jpg',
        season: 'Saison 1 - Arc de l’Arbre Aogiri', // thematique
        studio: 'Studio Pierrot',
        author: 'Sui Ishida',
      },
      {
        id: '4',
        name: 'World Trigger',
        image: '/2014/ANIME/Cover/WorldTrigger.jpg',
        season: 'Saison 1 - Arc de l’Arrivée de Yūma', // thematique
        studio: 'Toei Animation',
        author: 'Daisuke Ashihara',
      },
      {
        id: '5',
        name: 'JoJo’s Bizarre Adventure: Stardust Crusaders',
        image: '/2014/ANIME/Cover/JoJoStardustCrusaders.jpg',
        season: 'Saison 2 / Partie 3 - Stardust Crusaders',
        studio: 'David Production',
        author: 'Hirohiko Araki',
      },
      {
        id: '6',
        name: 'Mushishi: The Next Passage',
        image: '/2014/ANIME/Cover/MushishiTheNextPassage.jpg',
        season: 'Saison 2 - Nouveaux Récits du Mushishi', // thematique (serie episodique, sans arc)
        studio: 'Artland',
        author: 'Yuki Urushibara',
      },
      {
        id: '7',
        name: 'Fairy Tail',
        image: '/2014/ANIME/Cover/FairyTail.jpg',
        season: 'Arc du Festival du Roi Dragon',
        studio: 'A-1 Pictures & Bridge',
        author: 'Hiro Mashima',
      },
      {
        id: '8',
        name: 'Haikyu!!',
        image: '/2014/ANIME/Cover/Haikyu.jpg',
        season: 'Saison 1 - Arc des Qualifications de l’Inter-High', // thematique
        studio: 'Production I.G',
        author: 'Haruichi Furudate',
      },
      {
        id: '9',
        name: 'No Game No Life',
        image: '/2014/ANIME/Cover/NoGameNoLife.jpg',
        season: 'Saison unique - Arc du Disboard', // thematique
        studio: 'Madhouse',
        author: 'Yū Kamiya',
      },
      {
        id: '10',
        name: 'Akame ga Kill!',
        image: '/2014/ANIME/Cover/AkameGaKill.jpg',
        season: 'Saison unique - Arc de la Night Raid', // thematique
        studio: 'White Fox',
        author: 'Takahiro & Tetsuya Tashiro',
      },
      {
        id: '11',
        name: 'Sword Art Online II',
        image: '/2014/ANIME/Cover/SwordArtOnlineII.jpg',
        season: 'Saison 2 - Arc Phantom Bullet',
        studio: 'A-1 Pictures',
        author: 'Reki Kawahara',
      },
      {
        id: '12',
        name: 'Fate/stay night: Unlimited Blade Works',
        image: '/2014/ANIME/Cover/FateStayNightUBW.jpg',
        season: 'Saison 1 - Route Unlimited Blade Works',
        studio: 'ufotable',
        author: 'Kinoko Nasu',
      },
      {
        id: '13',
        name: 'The Seven Deadly Sins',
        image: '/2014/ANIME/Cover/SevenDeadlySins.jpg',
        season: 'Saison 1 - Arc des Chevaliers Sacrés',
        studio: 'A-1 Pictures',
        author: 'Nakaba Suzuki',
      },
      {
        id: '14',
        name: 'One Piece',
        image: '/2014/ANIME/Cover/OnePiece.jpg',
        season: 'Arc de Dressrosa',
        studio: 'Toei Animation',
        author: 'Eiichiro Oda',
      },
      {
        id: '15',
        name: 'Parasyte -the maxim-',
        image: '/2014/ANIME/Cover/Parasyte.jpg',
        season: 'Saison unique - Arc des Parasites', // thematique
        studio: 'Madhouse',
        author: 'Hitoshi Iwaaki',
      },
      {
        id: '16',
        name: 'Psycho-Pass 2',
        image: '/2014/ANIME/Cover/PsychoPass2.jpg',
        season: 'Saison 2 - Arc de l’Affaire Kamui', // thematique
        studio: 'Tatsunoko Production',
        author: 'Gen Urobuchi & Tow Ubukata',
      },
      {
        id: '17',
        name: 'Your Lie in April',
        image: '/2014/ANIME/Cover/YourLieInApril.jpg',
        season: 'Saison unique - Arc du Concours de Piano', // thematique
        studio: 'A-1 Pictures',
        author: 'Naoshi Arakawa',
      },
    ],
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
      {
        id: '1',
        name: 'Date A Live',
        image: '/2013/ANIME/Cover/DateALive.jpg',
        season: 'Saison 1 - Arc des Esprits', // thematique
        studio: 'AIC Plus+',
        author: 'Kōshi Tachibana',
      },
      {
        id: '2',
        name: 'Attack on Titan',
        image: '/2013/ANIME/Cover/AttackOnTitan.jpg',
        season: 'Saison 1 - Arc de la Bataille de Trost',
        studio: 'WIT Studio',
        author: 'Hajime Isayama',
      },
      {
        id: '3',
        name: 'A Certain Scientific Railgun S',
        image: '/2013/ANIME/Cover/ACertainScientificRailgunS.jpg',
        season: 'Saison 2 - Arc des Sisters',
        studio: 'J.C.Staff',
        author: 'Kazuma Kamachi & Motoi Fuyukawa',
      },
      {
        id: '4',
        name: 'Kingdom',
        image: '/2013/ANIME/Cover/Kingdom.jpg',
        season: 'Saison 2 - Arc de l’Ascension de l’Unité Hi Shin', // thematique
        studio: 'Studio Pierrot',
        author: 'Yasuhisa Hara',
      },
      {
        id: '5',
        name: 'Free!',
        image: '/2013/ANIME/Cover/Free.jpg',
        season: 'Saison 1 - Arc du Club de Natation d’Iwatobi', // thematique
        studio: 'Kyoto Animation',
        author: 'Kōji Ōji',
      },
      {
        id: '6',
        name: 'Blood Lad',
        image: '/2013/ANIME/Cover/BloodLad.jpg',
        season: 'Saison unique - Arc du Monde des Démons', // thematique
        studio: 'Brain’s Base',
        author: 'Yūki Kodama',
      },
      {
        id: '7',
        name: 'Beyond the Boundary',
        image: '/2013/ANIME/Cover/BeyondTheBoundary.jpg',
        season: 'Saison unique - Arc de la Chasse aux Yōmu', // thematique
        studio: 'Kyoto Animation',
        author: 'Nagomu Torii',
      },
      {
        id: '8',
        name: 'Ace of Diamond',
        image: '/2013/ANIME/Cover/AceOfDiamond.webp',
        season: 'Saison 1 - Arc de l’Entrée à Seidō', // thematique
        studio: 'Madhouse & Production I.G',
        author: 'Yūji Terajima',
      },
      {
        id: '9',
        name: 'Kill la Kill',
        image: '/2013/ANIME/Cover/KillLaKill.jpg',
        season: 'Anime original - Arc de l’Académie Honnōji', // thematique
        studio: 'Trigger',
        author: 'Hiroyuki Imaishi',
      },
      {
        id: '10',
        name: 'Log Horizon',
        image: '/2013/ANIME/Cover/LogHorizon.jpg',
        season: 'Saison 1 - Arc de la Table Ronde', // thematique
        studio: 'Satelight',
        author: 'Mamare Touno',
      },
      {
        id: '11',
        name: 'Magi: The Kingdom of Magic',
        image: '/2013/ANIME/Cover/MagiTheKingdomOfMagic.jpg',
        season: 'Saison 2 - Arc de l’Exploration du Monde',
        studio: 'A-1 Pictures',
        author: 'Shinobu Ohtaka',
      },
      {
        id: '12',
        name: 'Kuroko’s Basketball',
        image: '/2013/ANIME/Cover/KurokosBasketball.jpg',
        season: 'Saison 2 - Arc des Qualifications de la Winter Cup', // thematique
        studio: 'Production I.G',
        author: 'Tadatoshi Fujimaki',
      },
      {
        id: '13',
        name: 'Fairy Tail',
        image: '/2013/ANIME/Cover/FairyTail.jpg',
        season: 'Arc des Grands Jeux Inter-Magiques',
        studio: 'A-1 Pictures & Satelight',
        author: 'Hiro Mashima',
      },
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
    animes: [
      {
        id: '1',
        name: 'High School DxD',
        image: '/2012/ANIME/Cover/HighSchoolDxD.jpg',
        season: 'Saison 1 - Arc de Riser Phenex', // thematique
        studio: 'TNK',
        author: 'Ichiei Ishibumi',
      },
      {
        id: '2',
        name: 'Aquarion Evol',
        image: '/2012/ANIME/Cover/AquarionEvol.jpg',
        season: 'Anime original - Arc de l’Académie Neo-Deava', // thematique
        studio: 'Satelight',
        author: 'Shōji Kawamori',
      },
      {
        id: '3',
        name: 'JoJo’s Bizarre Adventure',
        image: '/2012/ANIME/Cover/JoJosBizarreAdventure.jpg',
        season: 'Saison 1 / Partie 1 - Phantom Blood',
        studio: 'David Production',
        author: 'Hirohiko Araki',
      },
      {
        id: '4',
        name: 'Accel World',
        image: '/2012/ANIME/Cover/AccelWorld.jpg',
        season: 'Saison unique - Arc du Brain Burst', // thematique
        studio: 'Sunrise',
        author: 'Reki Kawahara',
      },
      {
        id: '5',
        name: 'Sword Art Online',
        image: '/2012/ANIME/Cover/SwordArtOnline.jpg',
        season: 'Saison 1 - Arc d’Aincrad',
        studio: 'A-1 Pictures',
        author: 'Reki Kawahara',
      },
      {
        id: '6',
        name: 'Fate/Zero',
        image: '/2012/ANIME/Cover/FateZero.jpg',
        season: 'Saison 2 - Fin de la Quatrième Guerre du Saint Graal', // thematique
        studio: 'ufotable',
        author: 'Gen Urobuchi',
      },
      {
        id: '7',
        name: 'Kuroko’s Basketball',
        image: '/2012/ANIME/Cover/KurokosBasketball.jpg',
        season: 'Saison 1 - Arc de l’Inter-High', // thematique
        studio: 'Production I.G',
        author: 'Tadatoshi Fujimaki',
      },
      {
        id: '8',
        name: 'Inazuma Eleven GO: Chrono Stone',
        image: '/2012/ANIME/Cover/InazumaElevenGoChronoStone.jpg',
        season: 'Saison 2 - Arc du Voyage dans le Temps', // thematique
        studio: 'OLM',
        author: 'Level-5',
      },
      {
        id: '9',
        name: 'Hyouka',
        image: '/2012/ANIME/Cover/Hyouka.jpg',
        season: 'Saison unique - Arc du Club de Littérature Classique', // thematique
        studio: 'Kyoto Animation',
        author: 'Honobu Yonezawa',
      },
      {
        id: '10',
        name: 'One Piece',
        image: '/2012/ANIME/Cover/OnePiece.jpg',
        season: 'Arc de l’Île des Hommes-Poissons',
        studio: 'Toei Animation',
        author: 'Eiichiro Oda',
      },
      {
        id: '11',
        name: 'Btooom!',
        image: '/2012/ANIME/Cover/Btooom.jpg',
        season: 'Saison unique - Arc de l’Île du Btooom!', // thematique
        studio: 'Madhouse',
        author: 'Junya Inoue',
      },
      {
        id: '12',
        name: 'Code:Breaker',
        image: '/2012/ANIME/Cover/CodeBreaker.jpg',
        season: 'Saison unique - Arc des Code:Breakers', // thematique
        studio: 'Kinema Citrus',
        author: 'Akimine Kamijyo',
      },
      {
        id: '13',
        name: 'Magi: The Labyrinth of Magic',
        image: '/2012/ANIME/Cover/Magi.jpg',
        season: 'Saison 1 - Arc de Balbadd',
        studio: 'A-1 Pictures',
        author: 'Shinobu Ohtaka',
      },
      {
        id: '14',
        name: 'Psycho-Pass',
        image: '/2012/ANIME/Cover/PsychoPass.jpg',
        season: 'Anime original - Arc de l’Affaire Makishima', // thematique
        studio: 'Production I.G',
        author: 'Gen Urobuchi',
      },
      {
        id: '15',
        name: 'Le Garçon d’à côté',
        image: '/2012/ANIME/Cover/LeGarconDaCote.jpg',
        season: 'Saison unique - Arc de Shizuku et Haru', // thematique
        studio: 'Brain’s Base',
        author: 'Robico',
      },
    ],
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
    animes: [
      {
        id: '1',
        name: 'Puella Magi Madoka Magica',
        image: '/2011/ANIME/Cover/PuellaMagiMadokaMagica.jpg',
        season: 'Saison unique - Arc de Walpurgisnacht', // thematique
        studio: 'Shaft',
        author: 'Magica Quartet (Gen Urobuchi)',
      },
      {
        id: '2',
        name: 'Beelzebub',
        image: '/2011/ANIME/Cover/Beelzebub.jpg',
        season: 'Saison unique - Arc de la Crise Scolaire', // thematique
        studio: 'Studio Pierrot',
        author: 'Ryūhei Tamura',
      },
      {
        id: '3',
        name: 'Toriko',
        image: '/2011/ANIME/Cover/Toriko.jpg',
        season: 'Saison 1 - Arc Gourmet', // thematique
        studio: 'Toei Animation',
        author: 'Mitsutoshi Shimabukuro',
      },
      {
        id: '4',
        name: 'Steins;Gate',
        image: '/2011/ANIME/Cover/SteinsGate.jpg',
        season: 'Saison 1 - Arc de la Ligne du Monde Alpha', // thematique
        studio: 'White Fox',
        author: '5pb. & Nitroplus',
      },
      {
        id: '5',
        name: 'Anohana: The Flower We Saw That Day',
        image: '/2011/ANIME/Cover/Anohana.jpg',
        season: 'Saison unique - Arc de la Promesse à Menma', // thematique
        studio: 'A-1 Pictures',
        author: 'Mari Okada',
      },
      {
        id: '6',
        name: 'Deadman Wonderland',
        image: '/2011/ANIME/Cover/DeadmanWonderland.jpg',
        season: 'Saison unique - Arc du Carnival Corpse', // thematique
        studio: 'Manglobe',
        author: 'Jinsei Kataoka & Kazuma Kondō',
      },
      {
        id: '7',
        name: 'Blue Exorcist',
        image: '/2011/ANIME/Cover/BlueExorcist.jpg',
        season: 'Saison 1 - Arc de l’Académie de la Croix-Vraie', // thematique
        studio: 'A-1 Pictures',
        author: 'Kazue Katō',
      },
      {
        id: '8',
        name: 'One Piece',
        image: '/2011/ANIME/Cover/OnePiece.jpg',
        season: 'Arc de l’Après-Guerre',
        studio: 'Toei Animation',
        author: 'Eiichiro Oda',
      },
      {
        id: '9',
        name: 'Inazuma Eleven GO',
        image: '/2011/ANIME/Cover/InazumaElevenGo.jpg',
        season: 'Saison 1 - Arc du Cinquième Secteur',
        studio: 'OLM',
        author: 'Level-5',
      },
      {
        id: '10',
        name: 'Blood-C',
        image: '/2011/ANIME/Cover/BloodC.jpg',
        season: 'Saison unique - Arc des Anciens', // thematique
        studio: 'Production I.G',
        author: 'CLAMP',
      },
      {
        id: '11',
        name: 'Fate/Zero',
        image: '/2011/ANIME/Cover/FateZero.jpg',
        season: 'Saison 1 - Arc de la Quatrième Guerre du Saint Graal', // thematique
        studio: 'ufotable',
        author: 'Gen Urobuchi',
      },
      {
        id: '12',
        name: 'Hunter × Hunter',
        image: '/2011/ANIME/Cover/HunterXHunter.jpg',
        season: 'Saison 1 - Arc de l’Examen Hunter',
        studio: 'Madhouse',
        author: 'Yoshihiro Togashi',
      },
      {
        id: '13',
        name: 'Mirai Nikki',
        image: '/2011/ANIME/Cover/MiraiNikki.jpg',
        season: 'Saison 1 - Arc du Jeu de Survie', // thematique
        studio: 'asread.',
        author: 'Sakae Esuno',
      },
      {
        id: '14',
        name: 'Kaiji: Against All Rules',
        image: '/2011/ANIME/Cover/KaijiAgainstAllRules.jpg',
        season: 'Saison 2 - Arc de la Prison Souterraine et du Pachinko Géant', // thematique
        studio: 'Madhouse',
        author: 'Nobuyuki Fukumoto',
      },
      {
        id: '15',
        name: 'Bleach',
        image: '/2011/ANIME/Cover/Bleach.webp',
        season: 'Arc Fullbring',
        studio: 'Studio Pierrot',
        author: 'Tite Kubo',
      },
      {
        id: '16',
        name: 'Naruto Shippuden',
        image: '/2011/ANIME/Cover/NarutoShippuden.jpg',
        season: 'Arc du Sommet des Cinq Kage + début de la 4e Grande Guerre Ninja',
        studio: 'Studio Pierrot',
        author: 'Masashi Kishimoto',
      },
    ],
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
      { id: '17', animeName: 'One Piece',                             openingTitle: 'Kaze wo Sagashite',              artist: 'Mari Yaguchi with Straw Hat',        op: 12, image: '/2010/OPENING/Cover/ONE12.jpg',     audio: '/2010/OPENING/Audio/ONE12.MP3'      },
    ],
    animes: [
      {
        id: '1',
        name: 'Cobra the Animation',
        image: '/2010/ANIME/Cover/Cobra.jpg',
        season: 'Saison unique - Arc des Six Guerriers',
        studio: 'Magic Bus',
        author: 'Buichi Terasawa',
      },
      {
        id: '2',
        name: 'Naruto Shippuden',
        image: '/2010/ANIME/Cover/NarutoShippuden.png',
        season: 'Arc de l’Invasion de Pain',
        studio: 'Studio Pierrot',
        author: 'Masashi Kishimoto',
      },
      {
        id: '3',
        name: 'Durarara!!',
        image: '/2010/ANIME/Cover/Durarara.jpg',
        season: 'Saison 1 - Arc des Dollars', // thematique
        studio: 'Brain’s Base',
        author: 'Ryōgo Narita',
      },
      {
        id: '4',
        name: 'Black Butler',
        image: '/2010/ANIME/Cover/BlackButler.png',
        season: 'Saison 2 - Arc d’Alois Trancy', // thematique (histoire originale de l'anime)
        studio: 'A-1 Pictures',
        author: 'Yana Toboso',
      },
      {
        id: '5',
        name: 'Highschool of the Dead',
        image: '/2010/ANIME/Cover/HighschoolOfTheDead.jpg',
        season: 'Saison unique - Arc de l’Épidémie de Zombies', // thematique
        studio: 'Madhouse',
        author: 'Daisuke Satō & Shōji Satō',
      },
      {
        id: '6',
        name: 'Bakuman.',
        image: '/2010/ANIME/Cover/Bakuman.jpg',
        season: 'Saison 1 - Arc des Débuts de Muto Ashirogi', // thematique
        studio: 'J.C.Staff',
        author: 'Tsugumi Ohba & Takeshi Obata',
      },
      {
        id: '7',
        name: 'Fullmetal Alchemist: Brotherhood',
        image: '/2010/ANIME/Cover/FullmetalAlchemistBrotherhood.jpg',
        season: 'Saison unique - Arc du Jour Promis',
        studio: 'Bones',
        author: 'Hiromu Arakawa',
      },
      {
        id: '8',
        name: 'Maid Sama!',
        image: '/2010/ANIME/Cover/MaidSama.jpg',
        season: 'Saison unique - Arc du Maid Latte', // thematique
        studio: 'J.C.Staff',
        author: 'Hiro Fujiwara',
      },
      {
        id: '9',
        name: 'K-On!!',
        image: '/2010/ANIME/Cover/KOn.png',
        season: 'Saison 2 - Arc de la Dernière Année du Club', // thematique
        studio: 'Kyoto Animation',
        author: 'Kakifly',
      },
      {
        id: '10',
        name: 'Angel Beats!',
        image: '/2010/ANIME/Cover/AngelBeats.jpg',
        season: 'Anime original - Arc du Front de l’Après-Vie', // thematique
        studio: 'P.A. Works',
        author: 'Jun Maeda',
      },
      {
        id: '11',
        name: 'Black Lagoon: Roberta’s Blood Trail',
        image: '/2010/ANIME/Cover/BlackLagoonRobertasBloodTrail.png',
        season: 'OVA - Arc de la Traque de Roberta', // thematique
        studio: 'Madhouse',
        author: 'Rei Hiroe',
      },
      {
        id: '12',
        name: 'Panty & Stocking with Garterbelt',
        image: '/2010/ANIME/Cover/PantyAndStockingWithGarterbelt.jpg',
        season: 'Anime original - Arc des Anges de Daten City', // thematique
        studio: 'Gainax',
        author: 'Hiroyuki Imaishi',
      },
      {
        id: '13',
        name: 'Shiki',
        image: '/2010/ANIME/Cover/Shiki.jpg',
        season: 'Saison unique - Arc du Village de Sotoba', // thematique
        studio: 'Daume',
        author: 'Fuyumi Ono',
      },
      {
        id: '14',
        name: 'Fairy Tail',
        image: '/2010/ANIME/Cover/FairyTail.jpg',
        season: 'Arc de la Tour du Paradis',
        studio: 'A-1 Pictures & Satelight',
        author: 'Hiro Mashima',
      },
    ],
  },

  2009: {
    openings: [
      { id: '1',  animeName: 'Durarara!!',                            openingTitle: 'Uragiri no Yuuyake',             artist: 'THEATRE BROOK',                               image: '/2009/OPENING/Cover/DURARARA.jpg',       audio: '/2009/OPENING/Audio/DRRR1.MP3'       },
      { id: '2',  animeName: 'Naruto: Shippuden',                     openingTitle: 'Sign',                           artist: 'FLOW',                                op: 6,  image: '/2009/OPENING/Cover/NARUTO.jpg',     audio: '/2009/OPENING/Audio/NARUTO6.MP3'     },
      { id: '3',  animeName: 'Fullmetal Alchemist: Brotherhood',      openingTitle: 'Again',                          artist: 'YUI',                                         image: '/2009/OPENING/Cover/FMAB.png',        audio: '/2009/OPENING/Audio/FMA1.MP3'        },
      { id: '4',  animeName: 'One Piece',                             openingTitle: 'Share The World',                artist: 'TVXQ',                                op: 11, image: '/2009/OPENING/Cover/ONE.jpg',       audio: '/2009/OPENING/Audio/ONE11.MP3'       },
      { id: '5',  animeName: 'Reborn!',                               openingTitle: 'EASY GO',                        artist: 'Kazuki Kato',                         op: 6,  image: '/2009/OPENING/Cover/REBORN.jpg',     audio: '/2009/OPENING/Audio/REBORN6.MP3'     },
      { id: '6',  animeName: 'Inuyasha: The Final Act',               openingTitle: 'Kimi ga Inai Mirai',             artist: 'Do As Infinity',                              image: '/2009/OPENING/Cover/INUYASHA.jpg',    audio: '/2009/OPENING/Audio/INUYASHA.MP3'    },
      { id: '8',  animeName: 'Hajime no Ippo: New Challenger',        openingTitle: 'HEKIREKI',                       artist: 'LAST ALLIANCE',                               image: '/2009/OPENING/Cover/IPPO.jpg',        audio: '/2009/OPENING/Audio/IPPO.MP3'        },
      { id: '9',  animeName: 'K-On!',                                 openingTitle: 'Cagayake! GIRLS',                artist: 'Ho-kago Tea Time',                            image: '/2009/OPENING/Cover/KON.jpg',         audio: '/2009/OPENING/Audio/KON.MP3'         },
      { id: '10', animeName: 'Saint Seiya: The Lost Canvas',          openingTitle: 'The Realm of Athena',            artist: 'EUROX',                                       image: '/2009/OPENING/Cover/CANVAS.jpg',       audio: '/2009/OPENING/Audio/SEIYA.MP3'       },
      { id: '11', animeName: 'Inazuma Eleven',                        openingTitle: 'Maji de Kansha!',                artist: 'T-Pistonz+KMC',                       op: 2,  image: '/2009/OPENING/Cover/INAZUMA.jpg',    audio: '/2009/OPENING/Audio/INAZUMA2.MP3'    },
      { id: '12', animeName: 'Bakemonogatari',                        openingTitle: 'Renai Circulation',              artist: 'Kana Hanazawa',                       op: 4,  image: '/2009/OPENING/Cover/BAKEMONO.jpg',       audio: '/2009/OPENING/Audio/BAKE4.MP3'       },
      { id: '13', animeName: 'Fullmetal Alchemist: Brotherhood',      openingTitle: 'Hologram',                       artist: 'NICO Touches the Walls',             op: 2,  image: '/2009/OPENING/Cover/FMAB2.jpg',    audio: '/2009/OPENING/Audio/FMA2.MP3'       },
    ],
    animes: [
      {
        id: '1',
        name: 'Hajime no Ippo: New Challenger',
        image: '/2009/ANIME/Cover/HajimeNoIppo.jpg',
        season: 'Saison 2 - Arc des Défenses du Titre Japonais', // thematique
        studio: 'Madhouse',
        author: 'George Morikawa',
      },
      {
        id: '2',
        name: 'Major',
        image: '/2009/ANIME/Cover/Major.jpg',
        season: 'Saison 5 - Arc de la Coupe du Monde', // thematique
        studio: 'SynergySP',
        author: 'Takuya Mitsuda',
      },
      {
        id: '3',
        name: 'K-On!',
        image: '/2009/ANIME/Cover/KOn.jpg',
        season: 'Saison 1 - Arc du Club de Musique Légère', // thematique
        studio: 'Kyoto Animation',
        author: 'Kakifly',
      },
      {
        id: '4',
        name: 'Beyblade: Metal Fusion',
        image: '/2009/ANIME/Cover/BeybladeMetalFusion.jpg',
        season: 'Saison 1 - Arc de la Dark Nebula', // thematique
        studio: 'SynergySP',
        author: 'Takafumi Adachi',
      },
      {
        id: '5',
        name: 'Fullmetal Alchemist: Brotherhood',
        image: '/2009/ANIME/Cover/FullmetalAlchemistBrotherhood.jpg',
        season: 'Saison unique - Arc de la Quête de la Pierre Philosophale', // thematique
        studio: 'Bones',
        author: 'Hiromu Arakawa',
      },
      {
        id: '6',
        name: 'Dragon Ball Z Kai',
        image: '/2009/ANIME/Cover/DragonBallZKai.jpg',
        season: 'Arc des Saiyans',
        studio: 'Toei Animation',
        author: 'Akira Toriyama',
      },
      {
        id: '7',
        name: 'Reborn!',
        image: '/2009/ANIME/Cover/Reborn.webp',
        season: 'Arc du Futur',
        studio: 'Artland',
        author: 'Akira Amano',
      },
      {
        id: '8',
        name: 'Naruto Shippuden',
        image: '/2009/ANIME/Cover/NarutoShippuden.png',
        season: 'Arc du Combat Fatidique entre Frères',
        studio: 'Studio Pierrot',
        author: 'Masashi Kishimoto',
      },
      {
        id: '9',
        name: 'One Piece',
        image: '/2009/ANIME/Cover/OnePiece.jpg',
        season: 'Arc de l’Archipel des Sabaody',
        studio: 'Toei Animation',
        author: 'Eiichiro Oda',
      },
      {
        id: '10',
        name: 'Fairy Tail',
        image: '/2009/ANIME/Cover/FairyTail.jpg',
        season: 'Saison 1 - Arc d’Eisenwald',
        studio: 'A-1 Pictures & Satelight',
        author: 'Hiro Mashima',
      },
      {
        id: '11',
        name: 'Les Chevaliers du Zodiaque : The Lost Canvas',
        image: '/2009/ANIME/Cover/LostCanvas.jpg',
        season: 'Chapitre 1 - Arc de la Guerre Sainte contre Hadès', // thematique
        studio: 'TMS Entertainment',
        author: 'Shiori Teshirogi & Masami Kurumada',
      },
      {
        id: '12',
        name: 'Bakemonogatari',
        image: '/2009/ANIME/Cover/Bakemonogatari.jpg',
        season: 'Saison unique - Arc Hitagi Crab',
        studio: 'Shaft',
        author: 'Nisio Isin',
      },
      {
        id: '13',
        name: 'A Certain Scientific Railgun',
        image: '/2009/ANIME/Cover/ACertainScientificRailgun.jpg',
        season: 'Saison 1 - Arc du Level Upper',
        studio: 'J.C.Staff',
        author: 'Kazuma Kamachi & Motoi Fuyukawa',
      },
    ],
  },

  2008: {
    openings: [
      { id: '1',  animeName: 'Soul Eater',                             openingTitle: 'Resonance',                          artist: 'T.M.Revolution',                 image: '/2008/OPENING/Cover/SOULEATER1.jpg',       audio: '/2008/OPENING/Audio/SOULEATER1.MP3'       },
      { id: '2',  animeName: 'Naruto Shippuden',                       openingTitle: 'Blue Bird',                          artist: 'Ikimono-gakari',          op: 3, image: '/2008/OPENING/Cover/NARUTOSHIPPUDEN3.jpg', audio: '/2008/OPENING/Audio/NARUTOSHIPPUDEN3.MP3' },
      { id: '3',  animeName: 'Code Geass: Lelouch of the Rebellion R2', openingTitle: 'WORLD END',                          artist: 'FLOW',                    op: 5, image: '/2008/OPENING/Cover/CODEGEASS5.jpg',       audio: '/2008/OPENING/Audio/CODEGEASS5.MP3'       },
      { id: '4',  animeName: 'Reborn!',                                openingTitle: '88',                                 artist: 'LM.C',                    op: 4, image: '/2008/OPENING/Cover/REBORN4.jpg',          audio: '/2008/OPENING/Audio/REBORN4.MP3'          },
      { id: '5',  animeName: 'Persona -trinity soul-',                 openingTitle: 'Word of the Voice',                  artist: 'FLOW',                    op: 2, image: '/2008/OPENING/Cover/PERSONA2.jpg',         audio: '/2008/OPENING/Audio/PERSONA2.MP3'         },
      { id: '6',  animeName: 'Bleach',                                 openingTitle: 'Velonica',                           artist: 'Aqua Timez',              op: 9, image: '/2008/OPENING/Cover/BLEACH9.jpg',          audio: '/2008/OPENING/Audio/BLEACH9.MP3'          },
      { id: '7',  animeName: 'Deltora Quest',                          openingTitle: 'In This Life',                       artist: 'Delta Goodrem',           op: 3, image: '/2008/OPENING/Cover/DELTORA3.jpg',         audio: '/2008/OPENING/Audio/DELTORA3.MP3'         },
      { id: '8',  animeName: 'Soul Eater',                             openingTitle: 'Papermoon',                          artist: 'Tommy heavenly6',         op: 2, image: '/2008/OPENING/Cover/SOULEATER2.jpg',       audio: '/2008/OPENING/Audio/SOULEATER2.MP3'       },
      { id: '9',  animeName: 'Tales of the Abyss',                     openingTitle: 'Karma',                              artist: 'Bump of Chicken',                image: '/2008/OPENING/Cover/TALESABYSS.jpg',       audio: '/2008/OPENING/Audio/TALESABYSS.MP3'       },
      { id: '10', animeName: 'Naruto Shippuden',                       openingTitle: 'Closer',                             artist: 'Joe Inoue',               op: 4, image: '/2008/OPENING/Cover/NARUTOSHIPPUDEN4.jpg', audio: '/2008/OPENING/Audio/NARUTOSHIPPUDEN4.MP3' },
      { id: '11', animeName: 'Ultraviolet: Code 044',                  openingTitle: 'TURN TO STONE',                      artist: 'BECCA',                          image: '/2008/OPENING/Cover/ULTRAVIOLET.jpg',      audio: '/2008/OPENING/Audio/ULTRAVIOLET.MP3'      },
      { id: '12', animeName: 'Reborn!',                                openingTitle: 'last cross',                         artist: 'Masami Mitsuoka',         op: 5, image: '/2008/OPENING/Cover/REBORN5.jpg',          audio: '/2008/OPENING/Audio/REBORN5.MP3'          },
      { id: '13', animeName: 'Black Butler',                           openingTitle: 'Monochrome no Kiss',                 artist: 'SID',                            image: '/2008/OPENING/Cover/BLACKBUTLER.jpg',      audio: '/2008/OPENING/Audio/BLACKBUTLER.MP3'      },
      { id: '14', animeName: 'Nabari no Ou',                           openingTitle: 'CRAWL',                              artist: 'Veltpunch',                      image: '/2008/OPENING/Cover/NABARI.jpg',           audio: '/2008/OPENING/Audio/NABARI.MP3'           },
    ],
    animes: [
      {
        id: '1',
        name: 'Major',
        image: '/2008/ANIME/Cover/Major.webp',
        season: 'Saison 4 - Arc des Ligues Mineures Américaines', // thematique
        studio: 'SynergySP',
        author: 'Takuya Mitsuda',
      },
      {
        id: '2',
        name: 'Spice and Wolf',
        image: '/2008/ANIME/Cover/SpiceAndWolf.jpg',
        season: 'Saison 1 - Arc de la Route vers le Nord', // thematique
        studio: 'Imagin',
        author: 'Isuna Hasekura',
      },
      {
        id: '3',
        name: 'Yu-Gi-Oh! 5D’s',
        image: '/2008/ANIME/Cover/YuGiOh5Ds.jpg',
        season: 'Saison 1 - Arc de la Fortune Cup',
        studio: 'Gallop',
        author: 'Kazuki Takahashi',
      },
      {
        id: '4',
        name: 'Code Geass: Lelouch of the Rebellion R2',
        image: '/2008/ANIME/Cover/CodeGeassR2.jpg',
        season: 'Saison 2 - Arc du Zero Requiem', // thematique
        studio: 'Sunrise',
        author: 'Gorō Taniguchi',
      },
      {
        id: '5',
        name: 'Soul Eater',
        image: '/2008/ANIME/Cover/SoulEater.jpg',
        season: 'Saison unique - Arc de la Résurrection du Kishin', // thematique
        studio: 'Bones',
        author: 'Atsushi Ōkubo',
      },
      {
        id: '6',
        name: 'Toradora!',
        image: '/2008/ANIME/Cover/Toradora.jpg',
        season: 'Saison unique - Arc de l’Alliance Taiga-Ryūji', // thematique
        studio: 'J.C.Staff',
        author: 'Yuyuko Takemiya',
      },
      {
        id: '7',
        name: 'Black Butler',
        image: '/2008/ANIME/Cover/BlackButler.jpg',
        season: 'Saison 1 - Arc de Jack l’Éventreur',
        studio: 'A-1 Pictures',
        author: 'Yana Toboso',
      },
      {
        id: '8',
        name: 'One Piece',
        image: '/2008/ANIME/Cover/OnePiece.jpg',
        season: 'Arc de Thriller Bark',
        studio: 'Toei Animation',
        author: 'Eiichiro Oda',
      },
      {
        id: '9',
        name: 'Bleach',
        image: '/2008/ANIME/Cover/Bleach.webp',
        season: 'Arc de Hueco Mundo',
        studio: 'Studio Pierrot',
        author: 'Tite Kubo',
      },
    ],
  },

  2007: {
    openings: [
      { id: '1',  animeName: 'Tengen Toppa Gurren Lagann',          openingTitle: 'Sorairo Days',                              artist: 'Shoko Nakagawa',                                       image: '/2007/OPENING/Cover/GURRENLAGANN.jpg',     audio: '/2007/OPENING/Audio/GURRENLAGANN.MP3'     },
      { id: '2',  animeName: 'Naruto Shippuden',                    openingTitle: 'Hero’s Come Back!!',                        artist: 'nobodyknows+',                                         image: '/2007/OPENING/Cover/NARUTOSHIPPUDEN1.jpg', audio: '/2007/OPENING/Audio/NARUTOSHIPPUDEN1.MP3' },
      { id: '3',  animeName: 'Darker than Black',                   openingTitle: 'Kakusei Heroism ~The Hero Without A "Name"~', artist: 'An Cafe',                                      op: 2, image: '/2007/OPENING/Cover/DARKER2.jpg',          audio: '/2007/OPENING/Audio/DARKER2.MP3'          },
      { id: '4',  animeName: 'Lucky Star',                          openingTitle: 'Motteke! Sailor Fuku',                      artist: 'Aya Hirano, Emiri Katō, Kaori Fukuhara & Aya Endō',   image: '/2007/OPENING/Cover/LUCKYSTAR.jpg',        audio: '/2007/OPENING/Audio/LUCKYSTAR.MP3'        },
      { id: '5',  animeName: 'Death Note',                          openingTitle: 'What’s up, people?!',                       artist: 'Maximum the Hormone',                           op: 2, image: '/2007/OPENING/Cover/DEATHNOTE2.jpg',       audio: '/2007/OPENING/Audio/DEATHNOTE2.MP3'       },
      { id: '6',  animeName: 'Dennō Coil',                          openingTitle: 'Prism',                                     artist: 'Ayako Ikeda',                                          image: '/2007/OPENING/Cover/DENNOCOIL.jpg',        audio: '/2007/OPENING/Audio/DENNOCOIL.MP3'        },
      { id: '7',  animeName: 'Bleach',                              openingTitle: 'Alones',                                    artist: 'Aqua Timez',                                    op: 6, image: '/2007/OPENING/Cover/BLEACH6.jpg',          audio: '/2007/OPENING/Audio/BLEACH6.MP3'          },
      { id: '8',  animeName: 'Nana',                                openingTitle: 'Lucy',                                      artist: 'ANNA inspi’ NANA (BLACK STONES)',               op: 3, image: '/2007/OPENING/Cover/NANA3.jpg',            audio: '/2007/OPENING/Audio/NANA3.MP3'            },
      { id: '9',  animeName: 'Toward the Terra',                    openingTitle: 'endscape',                                  artist: 'UVERworld',                                            image: '/2007/OPENING/Cover/TERRA.jpg',            audio: '/2007/OPENING/Audio/TERRA.MP3'            },
      { id: '10', animeName: 'Magical Girl Lyrical Nanoha StrikerS', openingTitle: 'Massive Wonders',                          artist: 'Nana Mizuki',                                   op: 2, image: '/2007/OPENING/Cover/NANOHA2.jpg',          audio: '/2007/OPENING/Audio/NANOHA2.MP3'          },
      { id: '11', animeName: 'Naruto Shippuden',                    openingTitle: 'Distance',                                  artist: 'Long Shot Party',                               op: 2, image: '/2007/OPENING/Cover/NARUTOSHIPPUDEN2.jpg', audio: '/2007/OPENING/Audio/NARUTOSHIPPUDEN2.MP3' },
      { id: '12', animeName: 'Mobile Suit Gundam 00',               openingTitle: 'Daybreak’s Bell',                           artist: 'L’Arc~en~Ciel',                                        image: '/2007/OPENING/Cover/GUNDAM00.jpg',         audio: '/2007/OPENING/Audio/GUNDAM00.MP3'         },
      { id: '13', animeName: 'D.Gray-man',                          openingTitle: 'Brightdown',                                artist: 'Nami Tamaki',                                   op: 2, image: '/2007/OPENING/Cover/DGRAYMAN2.jpg',        audio: '/2007/OPENING/Audio/DGRAYMAN2.MP3'        },
      { id: '14', animeName: 'One Piece',                           openingTitle: 'Crazy Rainbow',                             artist: 'Tackey & Tsubasa',                              op: 8, image: '/2007/OPENING/Cover/ONEPIECE8.jpg',        audio: '/2007/OPENING/Audio/ONEPIECE8.MP3'        },
      { id: '15', animeName: 'Reborn!',                             openingTitle: 'DIVE TO WORLD',                             artist: 'CHERRYBLOSSOM',                                 op: 3, image: '/2007/OPENING/Cover/REBORN3.jpg',          audio: '/2007/OPENING/Audio/REBORN3.MP3'          },
    ],
    animes: [
      {
        id: '1',
        name: 'Major',
        image: '/2007/ANIME/Cover/Major.jpg',
        season: 'Saison 3 - Arc du Lycée Seishū', // thematique
        studio: 'SynergySP',
        author: 'Takuya Mitsuda',
      },
      {
        id: '2',
        name: 'Tengen Toppa Gurren Lagann',
        image: '/2007/ANIME/Cover/GurrenLagann.jpg',
        season: 'Anime original - Arc de la Team Dai-Gurren', // thematique
        studio: 'Gainax',
        author: 'Hiroyuki Imaishi',
      },
      {
        id: '3',
        name: 'Darker than Black',
        image: '/2007/ANIME/Cover/DarkerThanBlack.jpg',
        season: 'Anime original - Arc de la Porte de l’Enfer', // thematique
        studio: 'Bones',
        author: 'Tensai Okamura',
      },
      {
        id: '4',
        name: 'Lucky Star',
        image: '/2007/ANIME/Cover/LuckyStar.jpg',
        season: 'Saison unique - Chroniques du Lycée Ryōō', // thematique (serie episodique)
        studio: 'Kyoto Animation',
        author: 'Kagami Yoshimizu',
      },
      {
        id: '5',
        name: 'Afro Samurai',
        image: '/2007/ANIME/Cover/AfroSamurai.jpg',
        season: 'Saison unique - Arc du Bandeau Numéro Un', // thematique
        studio: 'Gonzo',
        author: 'Takashi Okazaki',
      },
      {
        id: '6',
        name: 'Baccano!',
        image: '/2007/ANIME/Cover/Baccano.jpg',
        season: 'Saison unique - Arc du Flying Pussyfoot', // thematique
        studio: 'Brain’s Base',
        author: 'Ryōgo Narita',
      },
      {
        id: '7',
        name: 'Kaiji: Ultimate Survivor',
        image: '/2007/ANIME/Cover/Kaiji.jpg',
        season: 'Saison 1 - Arc de l’Espoir', // thematique
        studio: 'Madhouse',
        author: 'Nobuyuki Fukumoto',
      },
      {
        id: '8',
        name: 'Naruto Shippuden',
        image: '/2007/ANIME/Cover/NarutoShippuden.jpg',
        season: 'Arc du Sauvetage du Kazekage',
        studio: 'Studio Pierrot',
        author: 'Masashi Kishimoto',
      },
      {
        id: '9',
        name: 'Bleach',
        image: '/2007/ANIME/Cover/Bleach.png',
        season: 'Arc des Arrancar',
        studio: 'Studio Pierrot',
        author: 'Tite Kubo',
      },
      {
        id: '10',
        name: 'Clannad',
        image: '/2007/ANIME/Cover/Clannad.jpg',
        season: 'Saison 1 - Arc de Fūko',
        studio: 'Kyoto Animation',
        author: 'Jun Maeda',
      },
    ],
  },

  2006: {
    openings: [
      { id: '1',  animeName: 'Death Note',                     openingTitle: 'the WORLD',                         artist: 'Nightmare',                     image: '/2006/OPENING/Cover/DEATHNOTE.jpg',    audio: '/2006/OPENING/Audio/DEATHNOTE.MP3'    },
      { id: '2',  animeName: 'Naruto',                         openingTitle: 'Re:member',                         artist: 'FLOW',                   op: 8, image: '/2006/OPENING/Cover/NARUTO8.png',      audio: '/2006/OPENING/Audio/NARUTO8.MP3'      },
      { id: '4',  animeName: 'Bleach',                         openingTitle: 'Tonight, Tonight, Tonight',         artist: 'Beat Crusaders',         op: 4, image: '/2006/OPENING/Cover/BLEACH4.jpg',      audio: '/2006/OPENING/Audio/BLEACH4.MP3'      },
      { id: '5',  animeName: 'Tenpō Ibun Ayakashi Ayashi',     openingTitle: 'Ryūsei Miracle',                    artist: 'Ikimono-gakari',                image: '/2006/OPENING/Cover/AYASHI1.jpg',      audio: '/2006/OPENING/Audio/AYASHI1.MP3'      },
      { id: '6',  animeName: 'Air Gear',                       openingTitle: 'Chain',                             artist: 'BACK-ON',                       image: '/2006/OPENING/Cover/AIRGEAR.jpg',      audio: '/2006/OPENING/Audio/AIRGEAR.MP3'      },
      { id: '7',  animeName: 'Freedom',                        openingTitle: 'This Is Love',                      artist: 'Utada Hikaru',                  image: '/2006/OPENING/Cover/FREEDOM.jpg',      audio: '/2006/OPENING/Audio/FREEDOM.MP3'      },
      { id: '8',  animeName: 'One Piece',                      openingTitle: 'Brand New World',                   artist: 'D-51',                   op: 6, image: '/2006/OPENING/Cover/ONEPIECE6.jpg',    audio: '/2006/OPENING/Audio/ONEPIECE6.MP3'    },
      { id: '9',  animeName: 'Naruto',                         openingTitle: 'Yura Yura',                         artist: 'Hearts Grow',            op: 9, image: '/2006/OPENING/Cover/NARUTO9.png',      audio: '/2006/OPENING/Audio/NARUTO9.MP3'      },
      { id: '11', animeName: 'Bleach',                         openingTitle: 'Rolling Star',                      artist: 'YUI',                    op: 5, image: '/2006/OPENING/Cover/BLEACH5.jpg',      audio: '/2006/OPENING/Audio/BLEACH5.MP3'      },
      { id: '12', animeName: 'Ergo Proxy',                     openingTitle: 'Kiri',                              artist: 'MONORAL',                       image: '/2006/OPENING/Cover/ERGOPROXY.jpg',    audio: '/2006/OPENING/Audio/ERGOPROXY.MP3'    },
      { id: '13', animeName: 'Tenpō Ibun Ayakashi Ayashi',     openingTitle: 'LONE STAR',                         artist: 'Captain Straydum',       op: 2, image: '/2006/OPENING/Cover/AYASHI2.jpg',      audio: '/2006/OPENING/Audio/AYASHI2.MP3'      },
      { id: '14', animeName: 'Blood+',                         openingTitle: 'Colors of the Heart',               artist: 'UVERworld',              op: 3, image: '/2006/OPENING/Cover/BLOOD3.jpg',       audio: '/2006/OPENING/Audio/BLOOD3.MP3'       },
      { id: '15', animeName: 'Busō Renkin',                    openingTitle: 'Makka na Chikai',                   artist: 'Yoshiki Fukuyama',              image: '/2006/OPENING/Cover/BUSORENKIN.jpg',   audio: '/2006/OPENING/Audio/BUSORENKIN.MP3'   },
      { id: '16', animeName: 'Kilari',                         openingTitle: 'Est-ce l’Amour',                    artist: 'Isabelle Volpé',                image: '/2006/OPENING/Cover/KILARI.jpg',       audio: '/2006/OPENING/Audio/KILARI.MP3'       },
      { id: '17', animeName: 'Nana',                           openingTitle: 'Rose',                              artist: 'ANNA inspi’ NANA (BLACK STONES)', image: '/2006/OPENING/Cover/NANA.jpg',         audio: '/2006/OPENING/Audio/NANA.MP3'         },
      { id: '18', animeName: 'Code Geass: Lelouch of the Rebellion', openingTitle: 'COLORS',                      artist: 'FLOW',                          image: '/2006/OPENING/Cover/CODEGEASS.jpg',    audio: '/2006/OPENING/Audio/CODEGEASS.MP3'    },
    ],
    animes: [
      {
        id: '1',
        name: 'Fate/stay night',
        image: '/2006/ANIME/Cover/FateStayNight.jpg',
        season: 'Saison unique - Arc de la Cinquième Guerre du Saint Graal', // thematique
        studio: 'Studio Deen',
        author: 'Kinoko Nasu',
      },
      {
        id: '2',
        name: 'Ergo Proxy',
        image: '/2006/ANIME/Cover/ErgoProxy.jpg',
        season: 'Anime original - Arc de Romdo', // thematique
        studio: 'Manglobe',
        author: 'Shūkō Murase',
      },
      {
        id: '3',
        name: 'Gintama',
        image: '/2006/ANIME/Cover/Gintama.jpg',
        season: 'Saison 1 - Débuts de la Yorozuya', // thematique (serie episodique)
        studio: 'Sunrise',
        author: 'Hideaki Sorachi',
      },
      {
        id: '4',
        name: 'Air Gear',
        image: '/2006/ANIME/Cover/AirGear.jpg',
        season: 'Saison unique - Arc des Kogarasumaru', // thematique
        studio: 'Toei Animation',
        author: 'Oh! Great',
      },
      {
        id: '5',
        name: 'Nana',
        image: '/2006/ANIME/Cover/Nana.webp',
        season: 'Saison unique - Arc de Tokyo', // thematique
        studio: 'Madhouse',
        author: 'Ai Yazawa',
      },
      {
        id: '6',
        name: 'Black Lagoon',
        image: '/2006/ANIME/Cover/BlackLagoon.jpg',
        season: 'Saisons 1 & 2 - Arc de Roanapur', // thematique
        studio: 'Madhouse',
        author: 'Rei Hiroe',
      },
      {
        id: '7',
        name: 'D.Gray-man',
        image: '/2006/ANIME/Cover/DGrayMan.jpg',
        season: 'Saison 1 - Arc de l’Entrée dans la Congrégation de l’Ombre', // thematique
        studio: 'TMS Entertainment',
        author: 'Katsura Hoshino',
      },
      {
        id: '8',
        name: 'Death Note',
        image: '/2006/ANIME/Cover/DeathNote.jpg',
        season: 'Saison unique - Arc de L', // thematique
        studio: 'Madhouse',
        author: 'Tsugumi Ohba & Takeshi Obata',
      },
      {
        id: '9',
        name: 'Code Geass: Lelouch of the Rebellion',
        image: '/2006/ANIME/Cover/CodeGeass.jpg',
        season: 'Anime original - Arc de la Rébellion de Zero', // thematique
        studio: 'Sunrise',
        author: 'Gorō Taniguchi',
      },
      {
        id: '10',
        name: 'Reborn!',
        image: '/2006/ANIME/Cover/Reborn.jpg',
        season: 'Saison 1 - Arc de la Vie Quotidienne', // thematique
        studio: 'Artland',
        author: 'Akira Amano',
      },
      {
        id: '11',
        name: 'One Piece',
        image: '/2006/ANIME/Cover/OnePiece.jpg',
        season: 'Arc d’Enies Lobby',
        studio: 'Toei Animation',
        author: 'Eiichiro Oda',
      },
      {
        id: '12',
        name: 'Kilari',
        image: '/2006/ANIME/Cover/Kilari.jpg',
        season: 'Saison 1 - Arc des Débuts de Kilari', // thematique
        studio: 'SynergySP',
        author: 'An Nakahara',
      },
    ],
  },

  2005: {
    openings: [
      { id: '1', animeName: 'Bleach',                         openingTitle: 'D-tecnoLife',                       artist: 'UVERworld',              op: 2, image: '/2005/OPENING/Cover/BLEACH2.jpg',      audio: '/2005/OPENING/Audio/BLEACH2.MP3'      },
      { id: '2', animeName: 'Eureka Seven',                    openingTitle: 'DAYS',                              artist: 'FLOW',                          image: '/2005/OPENING/Cover/EUREKA1.jpg',      audio: '/2005/OPENING/Audio/EUREKA1.MP3'      },
      { id: '3', animeName: 'Yu-Gi-Oh! GX',                    openingTitle: 'En garde',                          artist: 'Jean-Marc Anthony Kabeya',      image: '/2005/OPENING/Cover/YUGIOHGX.jpg',     audio: '/2005/OPENING/Audio/YUGIOHGX.MP3'     },
      { id: '4', animeName: 'Naruto',                         openingTitle: 'Seishun Kyōsōkyoku',                artist: 'Sambomaster',            op: 5, image: '/2005/OPENING/Cover/NARUTO5.jpg',      audio: '/2005/OPENING/Audio/NARUTO5.MP3'      },
      { id: '5', animeName: 'Diebuster',                      openingTitle: 'Groovin’ Magic',                    artist: 'Round Table feat. Nino',        image: '/2005/OPENING/Cover/DIEBUSTER.jpg',    audio: '/2005/OPENING/Audio/DIEBUSTER.MP3'    },
      { id: '6', animeName: 'Fullmetal Alchemist',            openingTitle: 'Rewrite',                           artist: 'Asian Kung-Fu Generation', op: 4, image: '/2005/OPENING/Cover/FMA4.jpg',         audio: '/2005/OPENING/Audio/FMA4.MP3'         },
      { id: '7', animeName: 'Blood+',                          openingTitle: 'Aozora no Namida',                  artist: 'Hitomi Takahashi',              image: '/2005/OPENING/Cover/BLOOD.jpg',        audio: '/2005/OPENING/Audio/BLOOD.MP3'        },
      { id: '8', animeName: 'Pokémon: Advanced Battle',       openingTitle: 'Invincible',                        artist: 'Jean-Marc Anthony Kabeya',      image: '/2005/OPENING/Cover/POKEMON.jpg',      audio: '/2005/OPENING/Audio/POKEMON.MP3'      },
      { id: '9', animeName: 'Mobile Suit Gundam SEED Destiny', openingTitle: 'PRIDE',                             artist: 'HIGH and MIGHTY COLOR',  op: 2, image: '/2005/OPENING/Cover/SEED2.jpg',        audio: '/2005/OPENING/Audio/SEED2.MP3'        },
      { id: '10', animeName: 'Eureka Seven',                    openingTitle: 'Shōnen Heart',                      artist: 'HOME MADE Kazoku',       op: 2, image: '/2005/OPENING/Cover/EUREKA2.jpg',      audio: '/2005/OPENING/Audio/EUREKA2.MP3'      },
      { id: '11', animeName: 'Transformers: Galaxy Force',      openingTitle: 'CALL YOU... Kimi to Boku no Mirai', artist: 'Shinji Kakijima',               image: '/2005/OPENING/Cover/TRANSFORMERS.jpg', audio: '/2005/OPENING/Audio/TRANSFORMERS.MP3' },
      { id: '12', animeName: 'Naruto',                          openingTitle: 'Namikaze Satellite',                artist: 'Snowkel',                op: 7, image: '/2005/OPENING/Cover/NARUTO7.jpg',      audio: '/2005/OPENING/Audio/NARUTO7.MP3'      },
      { id: '13', animeName: 'Beet the Vandel Buster: Excellion', openingTitle: 'Sora wo Mite Omō',                artist: 'OUTLAW',                        image: '/2005/OPENING/Cover/BEET.webp',         audio: '/2005/OPENING/Audio/BEET.MP3'         },
      { id: '14', animeName: 'Black Cat',                      openingTitle: 'Daia no Hana',                      artist: 'Yorico',                        image: '/2005/OPENING/Cover/BLACKCAT.jpg',     audio: '/2005/OPENING/Audio/BLACKCAT.MP3'     },
      { id: '15', animeName: 'BECK: Mongolian Chop Squad',     openingTitle: 'Hit in the USA',                    artist: 'Beat Crusaders',                image: '/2005/OPENING/Cover/BECK.jpg',         audio: '/2005/OPENING/Audio/BECK.MP3'         },
    ],
    animes: [
      {
        id: '1',
        name: 'Eyeshield 21',
        image: '/2005/ANIME/Cover/Eyeshield21.jpg',
        season: 'Saison 1 - Arc du Tournoi de Printemps', // thematique
        studio: 'Gallop',
        author: 'Riichiro Inagaki & Yusuke Murata',
      },
      {
        id: '2',
        name: 'Eureka Seven',
        image: '/2005/ANIME/Cover/EurekaSeven.jpg',
        season: 'Anime original - Arc du Gekkostate', // thematique
        studio: 'Bones',
        author: 'Tomoki Kyoda',
      },
      {
        id: '3',
        name: 'Aria the Animation',
        image: '/2005/ANIME/Cover/AriaTheAnimation.jpg',
        season: 'Saison 1 - Arc des Ondines de Neo-Venezia', // thematique
        studio: 'Hal Film Maker',
        author: 'Kozue Amano',
      },
      {
        id: '4',
        name: 'Mushishi',
        image: '/2005/ANIME/Cover/Mushishi.jpg',
        season: 'Saison 1 - Récits du Mushishi', // thematique (serie episodique, sans arc)
        studio: 'Artland',
        author: 'Yuki Urushibara',
      },
      {
        id: '5',
        name: 'Akagi',
        image: '/2005/ANIME/Cover/Akagi.jpg',
        season: 'Saison 1 - Arc de l’Ascension d’Akagi', // thematique
        studio: 'Madhouse',
        author: 'Nobuyuki Fukumoto',
      },
      {
        id: '6',
        name: 'Blood+',
        image: '/2005/ANIME/Cover/BloodPlus.jpg',
        season: 'Saison unique - Arc d’Okinawa', // thematique
        studio: 'Production I.G',
        author: 'Junichi Fujisaku',
      },
      {
        id: '7',
        name: 'Major',
        image: '/2005/ANIME/Cover/Major.jpg',
        season: 'Saisons 1 & 2 - Arc de l’Enfance et du Collège', // thematique
        studio: 'SynergySP',
        author: 'Takuya Mitsuda',
      },
      {
        id: '8',
        name: 'Naruto',
        image: '/2005/ANIME/Cover/Naruto.png',
        season: 'Arc de la Récupération de Sasuke',
        studio: 'Studio Pierrot',
        author: 'Masashi Kishimoto',
      },
      {
        id: '9',
        name: 'Bleach',
        image: '/2005/ANIME/Cover/Bleach.webp',
        season: 'Arc de la Soul Society',
        studio: 'Studio Pierrot',
        author: 'Tite Kubo',
      },
      {
        id: '10',
        name: 'One Piece',
        image: '/2005/ANIME/Cover/OnePiece.webp',
        season: 'Arc de Skypiea',
        studio: 'Toei Animation',
        author: 'Eiichiro Oda',
      },
      {
        id: '11',
        name: 'Full Metal Panic! The Second Raid',
        image: '/2005/ANIME/Cover/FullMetalPanicTheSecondRaid.jpg',
        season: 'Saison 3 - Arc de Hong Kong', // thematique
        studio: 'Kyoto Animation',
        author: 'Shoji Gatoh',
      },
      {
        id: '12',
        name: 'Détective Conan',
        image: '/2005/ANIME/Cover/DetectiveConan.jpg',
        season: 'Saison 14',
        studio: 'TMS Entertainment',
        author: 'Gosho Aoyama',
      },
      {
        id: '13',
        name: 'Pokémon Advanced Generation',
        image: '/2005/ANIME/Cover/PokemonAdvancedGeneration.webp',
        season: 'Fin de la Ligue Hoenn + début du Battle Frontier',
        studio: 'OLM',
        author: 'Satoshi Tajiri',
      },
      {
        id: '14',
        name: 'Yu-Gi-Oh! GX',
        image: '/2005/ANIME/Cover/YuGiOhGX.jpg',
        season: 'Saison 1 - Arc des Shadow Riders',
        studio: 'Gallop',
        author: 'Kazuki Takahashi',
      },
      {
        id: '15',
        name: 'Mobile Suit Gundam SEED Destiny',
        image: '/2005/ANIME/Cover/GundamSeedDestiny.jpg',
        season: 'Anime original - Arc de la Seconde Guerre de la Bloody Valentine', // thematique
        studio: 'Sunrise',
        author: 'Mitsuo Fukuda',
      },
      {
        id: '16',
        name: 'Tsubasa: RESERVoir CHRoNiCLE',
        image: '/2005/ANIME/Cover/TsubasaReservoirChronicle.jpg',
        season: 'Saison 1 - Arc de la Quête des Plumes', // thematique
        studio: 'Bee Train',
        author: 'CLAMP',
      },
      {
        id: '17',
        name: 'Paradise Kiss',
        image: '/2005/ANIME/Cover/ParadiseKiss.jpg',
        season: 'Saison unique - Arc du Studio Paradise Kiss', // thematique
        studio: 'Madhouse',
        author: 'Ai Yazawa',
      },
    ],
  },
};
