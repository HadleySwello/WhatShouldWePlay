/**
 * English copy — single source of truth for all user-facing strings.
 * Use {{key}} for interpolation; consumer replaces with actual values.
 */
export default {
  splash: {
    title: 'What Should We Play?',
    subtitle: 'A calm ritual for choosing what to play.',
    tagline: 'Consult the wheel. Let the fates decide.',
    attribution: 'Data provided by BoardGameGeek',
    a11y: 'Powered by BoardGameGeek',
  },
  welcome: {
    title: 'What Should We Play?',
    subtitle:
      "Import your shelf, set tonight's constraints, and we'll guide the pick.",
    cta: 'Connect BoardGameGeek',
  },
  connectBGG: {
    navTitle: 'Load Your Shelf',
    header: 'Connect your\nBoardGameGeek\nCollection',
    body: 'To start, we’ll import your BGG collection to create your digital shelf. Once linked, your collection will always be ready to help you and your group find the perfect game.',
    placeholder: 'BoardGameGeek Username',
    help: 'Why do we need this?',
    loading: 'Finding your games…',
    findAccount:
      'Find or create your free account at BoardGameGeek.com. It only takes a minute to start building your digital collection.',
    bggLoginUrl: 'https://boardgamegeek.com/login',
    error:
      "We couldn't find that username on BoardGameGeek. Double-check the spelling?",
    usernameRequired: 'Please enter a username.',
    cta: 'Load Shelf',
  },
  faq: {
    title: 'How this works',
    q1: 'How do I find my BGG username?',
    a1: 'This is the name you use to log in to BoardGameGeek.com. We use it to find the public list of games you own.',
    q2: 'Is my account secure?',
    a2: 'Yes. We only access your public collection data. We will never ask for your password or any private account details.',
    q3: "I don't have a BGG account.",
    a3: "We highly recommend making one! It's free, easy, and a wonderful way to track your collection. Once you add your games there, they'll be ready to load here. In the meantime, feel free to try a friends!",
    q4: "Why isn't my shelf loading?",
    a4: 'Double-check that your games are marked as "Owned" on BGG. If you just made changes, it may take a few minutes for their system to update our view.',
    q5: 'Can I try a demo username?',
    a5: 'Curious what a huge collection looks like? Try "{{demoUsername}}", the username of BGG’s founder, to see the app in action with over 1,000 games.',
    close: 'I understand',
  },
  home: {
    heroTitle: 'What Should We Play?',
    heroDescription: 'Set your constraints and let the wheel decide.',
    ctaChoose: 'Choose a game',
    ctaBrowse: 'Browse your shelf',
    ctaSettings: 'Settings',
  },
  navigation: {
    connectCollection: 'Load Your Shelf',
    settings: 'Settings',
    browseCollection: 'Browse Shelf',
    browseCollectionTemplate: "{{username}}'s Shelf",
    chooseGame: 'Consult the wheel',
    yourOptions: 'What fits tonight',
    selectedGame: 'The wheel has chosen',
  },
  setup: {
    loadRitual: 'Load a ritual',
    howManyPlayers: 'How many at the table tonight?',
    playTime: 'Max play time',
    maxLength: 'How long can the session run?',
    complexity: 'Complexity',
    complexityHelper: 'How complex? Set the range.',
    complexityRangeReadout: 'Between {{min}} and {{max}}',
    anyComplexity: 'Any complexity',
    advancedFilters: 'Advanced Filters',
    mechanics: 'Mechanics',
    mechanicsHelper: 'Filter by game mechanism',
    categories: 'Categories',
    categoriesHelper: 'Filter by game type',
    any: 'Any',
    selectedCount: '{{count}} selected',
    minMaxReadout: 'Min: {{min}} · Max: {{max}}',
    noMatchesTitle: 'Nothing on your shelf fits tonight.',
    noMatchesBody: "Widen the filters—we'll find something.",
    ctaViewGames: 'View {{count}} games',
    ctaNoMatches: 'No matches',
    ritualHeader: 'Ritual: {{name}}',
    ritualHeaderModified: 'Ritual: {{name}} (modified)',
    customFilters: 'Custom filters',
    ritualModified: '(modified)',
    saveAsNew: 'Save as new ritual',
    save: 'Save',
    dontSave: "Don't save",
    rename: 'Rename',
    loading: 'Loading shelf…',
  },
  results: {
    gameMatch: '{{count}} game fits tonight.',
    gamesMatchMany: '{{count}} games fit tonight.',
    enableVotingMode: 'Enable Voting Mode',
    votingHint: 'One vote per player ({{assigned}} of {{total}} in)',
    allVotesAssigned: 'All voices in. Ready to consult the fates.',
    ritualSaved: 'Ritual saved!',
    saveAsRitual: 'Save as ritual',
    emptyTitle: 'Nothing on your shelf fits tonight.',
    emptyBody: "Widen the filters—we'll find something.",
    backToFilters: 'Adjust filters',
    ctaSpin: 'Let the wheel speak',
    ctaSelectGame: 'This one.',
  },
  spinner: {
    title: 'Ready to consult the fates?',
    celebrationTitle: 'Tonight, you shall play:',
    ctaPlay: 'Play this one',
    ctaSpinAgain: 'Consult again',
    backToList: 'Back to the list',
    spinButton: 'Let the wheel speak',
    winnerLabel: 'Winner: {{name}}',
    noGames: 'No games on the wheel',
  },
  selectedGame: {
    title: 'Tonight, you shall play…',
    fallbackGameName: 'The chosen game',
    complexityLabel: 'Complexity: {{value}}',
    ctaStartNew: 'Start a new ritual',
    ctaPickAgain: 'Consult again (same filters)',
  },
  bgg: {
    failedToLoadCollection: 'Failed to load collection',
    unknownError: 'Unknown BGG error',
  },
  ritualMetadata: {
    any: 'Any',
    lightAndUp: 'Light and up',
    mediumAndUp: 'Medium and up',
    heavyAndUp: 'Heavy and up',
    upToLight: 'Up to Light',
    upToMedium: 'Up to Medium',
    upToHeavy: 'Up to Heavy',
    light: 'Light',
    medium: 'Medium',
    heavy: 'Heavy',
    lightToMedium: 'Light to Medium',
    lightToHeavy: 'Light to Heavy',
    mediumToHeavy: 'Medium to Heavy',
    players: '{{count}} players',
    complexityLabel: 'Complexity: {{value}}',
  },
  errors: {
    maxRitualsReached:
      'You can only save {{max}} rituals. Delete one to add another.',
    ritualNameRequired: 'Ritual name is required.',
  },
  rankings: {
    navTitleTemplate: "{{username}}'s Shelf",
    loading: 'Loading shelf…',
    retry: 'Try Again',
    emptyTitle: 'Your shelf is empty',
    emptyBody:
      'No games yet. Add games on BoardGameGeek, or connect a different shelf.',
    emptyBodyLink: 'Open BoardGameGeek collection',
    bggCollectionUrl: 'https://boardgamegeek.com/collection/',
    ctaChangeUsername: 'Connect a different shelf',
    ctaChooseGame: 'Choose a Game',
    gameDetails: 'Rating: {{rating}}',
  },
  settings: {
    appearanceSectionTitle: 'Appearance',
    chooseThemeLabel: 'Theme',
    chooseThemeHelper: 'Choose how the wheel reveals itself to you.',
    themeLightLabel: 'Light',
    themeDarkLabel: 'Dark',
    themeSystemLabel: 'System',
    theRitualSectionTitle: 'Ritual Defaults',
    defaultPlayerCountLabel: 'Default players at table',
    defaultPlayerCountHelper: 'The number of players at your table.',
    enableVotingModeLabel: 'Enable Voting Mode by Default',
    enableVotingModeHelper:
      "When in voting mode, everyone gets to select a game to put forward, or vote for someone elses. We'll create a custom wheel just for the selected games.",
    accessibilitySectionTitle: 'Accessibility',
    reduceMovementLabel: 'Reduce Movement',
    reduceMovementHelper: 'Minimizes animations and screen transitions.',
    largeTextLabel: 'Larger Text',
    largeTextHelper: 'Grows the app’s text for easier reading.',
    accountSectionTitle: 'Account',
    changeUsernameLabel: 'Connect a different shelf',
    deleteMyAccountLabel: 'Unlink My Account',
  },
  modals: {
    rituals: {
      title: 'Choose a ritual',
      headerNote: 'You can save rituals from the game list after filtering.',
      myRituals: 'My rituals',
      quickRituals: 'Quick rituals',
      close: 'Close',
      deleteConfirmTitle: 'Delete ritual?',
      deleteConfirmCancel: 'Cancel',
      deleteConfirmDelete: 'Delete',
    },
    ritualName: {
      title: 'Ritual name',
      rules:
        'Required. Max 64 characters. Multiple spaces are collapsed. Newlines and control characters are removed.',
      placeholder: 'e.g. 2-Player Night',
      save: 'Save',
      cancel: 'Cancel',
      errorRequired: 'Please enter a ritual name.',
      errorTooLong: 'Ritual name must be {{max}} characters or less.',
      errorMaxRituals:
        'You can only save {{max}} rituals. Delete one to add another.',
      errorExists: 'Ritual name already exists.',
      warningMatchesBuiltIn:
        'Name matches built-in ritual. Will save as "{{name}}".',
    },
    votingMode: {
      title: 'Let everyone weigh in',
      close: 'Close',
      body: `Each player gets one vote. Your preferences shape the outcome—fair and simple.

Votes are added to the games you want to play.

When you spin the wheel, each vote becomes an extra slice of that game.

Example:
Catan — 2 votes
Monopoly — 1 vote
Hive — 1 vote

The spinner will contain:
Catan
Catan
Monopoly
Hive

Games with more votes are more likely to be chosen.`,
    },
  },
  lengthLabels: {
    any: 'Any length',
    under30min: '≤30m',
    under1hour: '≤1h',
    under2hours: '≤2h',
    long: '3h+',
  },
  alerts: {
    votingModeSinglePlayerTitle: 'Voting Mode',
    votingModeSinglePlayerMessage:
      'Voting mode is not available for single-player games.',
    deleteAccountTitle: 'Delete your account?',
    deleteAccountMessage:
      'This cannot be undone. Your shelf, saved rituals, and preferences will be permanently deleted. There is no way to recover them.',
    deleteAccountCancel: 'Cancel',
    deleteAccountConfirm: 'Delete my account',
  },
  common: {
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    players: '{{min}}–{{max}} players',
    unknownGame: 'Unnamed game',
  },
};
