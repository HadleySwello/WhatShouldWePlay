/**
 * Seed games for dev/testing when BGG API is unavailable.
 * Data parsed from BGG thing API responses.
 */
const seedGames = [
  {
    id: '1738',
    name: 'Castle of Magic',
    playersMin: 4,
    playersMax: 6,
    complexity: 'medium',
    complexityWeight: 2.5,
    length: 'under 2 hours',
    image:
      'https://cf.geekdo-images.com/0bFgmykLMjqm00x7TFkzOg__original/img/1sfdc21wj1cDgvbdE32_6MhZ1pE=/0x0/filters:format(png)/pic4733688.png',
    thumbnail:
      'https://cf.geekdo-images.com/0bFgmykLMjqm00x7TFkzOg__small/img/7LV2NmjgvjeEC9kD5Muqbs0ijxg=/fit-in/200x150/filters:strip_icc()/pic4733688.png',
    yearPublished: '1991',
    rating: '8',
    categories: ['Adventure', 'Deduction', 'Fantasy'],
    mechanics: ['Role Playing'],
    minAge: 12,
    minPlaytime: 90,
    maxPlaytime: 90,
    bggAverage: 6.18,
    bggRank: 11927,
    description:
      'In Castle of Magic, you play as a wizard seeking to cast spells and defeat your opponents. Collect resources, cast spells, and race to defeat your opponents before they defeat you.',
  },
  {
    id: '325409',
    name: 'Fantasy Fluxx',
    playersMin: 2,
    playersMax: 6,
    complexity: 'low',
    complexityWeight: 1.2,
    length: 'under 1 hour',
    image:
      'https://cf.geekdo-images.com/s2uIRb5xOjUg-m4Dpt2PlA__original/img/ZyYerPOXlqXEgbH_E6thOedaaWo=/0x0/filters:format(jpeg)/pic5813699.jpg',
    thumbnail:
      'https://cf.geekdo-images.com/s2uIRb5xOjUg-m4Dpt2PlA__small/img/RiU-qx390smPvJkdB9khqHvEjx8=/fit-in/200x150/filters:strip_icc()/pic5813699.jpg',
    yearPublished: '2021',
    rating: '6',
    categories: ['Card Game', 'Fantasy'],
    mechanics: ['Hand Management', 'Set Collection'],
    minAge: 8,
    minPlaytime: 10,
    maxPlaytime: 40,
    bggAverage: 6.89,
    bggRank: 8694,
    description:
      'In Fantasy Fluxx, you play as a wizard seeking to cast spells and defeat your opponents. Collect resources, cast spells, and race to defeat your opponents before they defeat you.',
  },
  {
    id: '19857',
    name: 'Glory to Rome',
    playersMin: 2,
    playersMax: 5,
    complexity: 'medium',
    complexityWeight: 2.8,
    length: 'under 1 hour',
    image:
      'https://cf.geekdo-images.com/S_-n-WRvpzgH-d8xuzJgmg__original/img/cvWVDcSUBsngibbELMhABgIyrVo=/0x0/filters:format(png)/pic1079512.png',
    thumbnail:
      'https://cf.geekdo-images.com/S_-n-WRvpzgH-d8xuzJgmg__small/img/2KvAr_TOIvW-9DNxlX-KuyL0Fwo=/fit-in/200x150/filters:strip_icc()/pic1079512.png',
    yearPublished: '2005',
    rating: '7',
    categories: ['Ancient', 'Card Game', 'City Building', 'Economic'],
    mechanics: [
      'End Game Bonuses',
      'Follow',
      'Hand Management',
      'Multi-Use Cards',
      'Set Collection',
      'Sudden Death Ending',
      'Variable Phase Order',
    ],
    minAge: 12,
    minPlaytime: 60,
    maxPlaytime: 60,
    bggAverage: 7.49,
    bggRank: 292,
    description:
      'In Glory to Rome, you play as a Roman citizen seeking to build the most glorious city. Collect resources, recruit citizens, and construct buildings to earn victory points.',
  },
  {
    id: '70323',
    name: 'King of Tokyo',
    playersMin: 2,
    playersMax: 6,
    complexity: 'low',
    complexityWeight: 1.5,
    length: 'under 30 min',
    image:
      'https://cf.geekdo-images.com/m_RzXpHURC0_xLkvRSR_sw__original/img/hSvWgiRYJCTTuoLOWTW3c8sYtl8=/0x0/filters:format(jpeg)/pic3043734.jpg',
    thumbnail:
      'https://cf.geekdo-images.com/m_RzXpHURC0_xLkvRSR_sw__small/img/OfgWmkGJj5BgOO0zFHEtP5CHfbU=/fit-in/200x150/filters:strip_icc()/pic3043734.jpg',
    yearPublished: '2011',
    rating: '9',
    categories: [
      'Dice',
      'Fighting',
      'Movies / TV / Radio theme',
      'Science Fiction',
    ],
    mechanics: [
      'Dice Rolling',
      'Die Icon Resolution',
      'King of the Hill',
      'Open Drafting',
      'Player Elimination',
      'Push Your Luck',
      'Re-rolling and Locking',
      'Take That',
    ],
    minAge: 8,
    minPlaytime: 30,
    maxPlaytime: 30,
    bggAverage: 7.12,
    bggRank: 482,
    description:
      'In King of Tokyo, you play mutant monsters, gigantic robots, and strange aliens — all of whom are destroying Tokyo and whacking each other in order to become the one and only King of Tokyo.',
  },
  {
    id: '392023',
    name: 'Mycelia',
    playersMin: 1,
    playersMax: 4,
    complexity: 'low',
    complexityWeight: 1.8,
    length: 'under 1 hour',
    image:
      'https://cf.geekdo-images.com/P8-3HeCgEa_CODQiQxq9SQ__original/img/wpH1mGsLXafShzWDatYxmNnbvR4=/0x0/filters:format(jpeg)/pic7849476.jpg',
    thumbnail:
      'https://cf.geekdo-images.com/P8-3HeCgEa_CODQiQxq9SQ__small/img/sggT8rR4B943r_4fVThDTeS1gko=/fit-in/200x150/filters:strip_icc()/pic7849476.jpg',
    yearPublished: '2023',
    rating: '10',
    categories: ['Card Game'],
    mechanics: [
      'Deck, Bag, and Pool Building',
      'Grid Movement',
      'Race',
      'Solo / Solitaire Game',
    ],
    minAge: 9,
    minPlaytime: 45,
    maxPlaytime: 45,
    bggAverage: 7.38,
    bggRank: 1444,
    description:
      'In Mycelia, you play as a mushroom spreading your mycelial network across the forest floor. Collect nutrients, grow your network, and race to connect to the Great Tree before your opponents.',
  },
  {
    id: '266192',
    name: 'Wingspan',
    playersMin: 1,
    playersMax: 5,
    complexity: 'medium',
    complexityWeight: 2.4,
    length: 'under 2 hours',
    image:
      'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__original/img/cI782Zis9cT66j2MjSHKJGnFPNw=/0x0/filters:format(jpeg)/pic4458123.jpg',
    thumbnail:
      'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__small/img/VNToqgS2-pOGU6MuvIkMPKn_y-s=/fit-in/200x150/filters:strip_icc()/pic4458123.jpg',
    yearPublished: '2019',
    rating: '8',
    categories: ['Animals', 'Card Game', 'Educational'],
    mechanics: [
      'Action Queue',
      'Dice Rolling',
      'End Game Bonuses',
      'Hand Management',
      'Once-Per-Game Abilities',
      'Open Drafting',
      'Set Collection',
      'Solo / Solitaire Game',
      'Turn Order: Progressive',
    ],
    minAge: 10,
    minPlaytime: 40,
    maxPlaytime: 70,
    bggAverage: 8.0,
    bggRank: 38,
    description:
      'Wingspan is a competitive, medium-weight, card-driven, engine-building board game from Stonemaier Games. You are bird enthusiasts — researchers, bird watchers, ornithologists, and collectors — seeking to discover and attract the best birds to your network of wildlife preserves.',
  },
];

export default seedGames;
