/**
 * ENGLISH COPY: STRATEGIC SOURCE OF TRUTH
 *
 * CORE BRAND VOICE:
 * The app should feel like a "calm vibe." Avoid aggressive "gamification" language.
 * Instead, use words that evoke fate, choices, and relief from "decision fatigue."
 * Clarity over wit always.
 *
 * INTERPOLATION:
 * Use {{key}} for dynamic values. The consumer handles replacement.
 */

export default {
  /**
   * SPLASH SCREEN (SplashScreen.js)
   * User Task: Waiting for the initial app startup and collection-auth check.
   * App Objective: First brand impression and clear loading state.
   */
  splash: {
    title: 'What Should We Play?',
    subtitle: 'Group voting.\n Weighted results.\n No more arguments.',
    tagline: 'Ending the\n "I don\'t know, what do you want to play?"\n loop.',
    attribution: 'Data provided by BoardGameGeek',
    a11y: 'Powered by BoardGameGeek',
  },

  /**
   * WELCOME SCREEN (WelcomeScreen.js)
   * User Task: Understanding what the app does and how to get started.
   * App Objective: Conversion—convincing the user to link their BGG account.
   */
  welcome: {
    title: 'What Should We Play?',
    subtitle:
      "Import your shelf, set tonight's constraints, and we'll guide the pick.",
    cta: 'Connect BoardGameGeek',
  },

  /**
   * CONNECT BGG SCREEN (ConnectBGGScreen.js)
   * User Task: Entering their BGG username to sync their game collection.
   * App Objective: Minimizing friction in the account linking process.
   */
  connectBGG: {
    navTitle: 'Load Your Shelf',
    header: 'Connect your\nBoardGameGeek\nCollection',
    body: 'Tired of staring at your shelf? Sync your BGG account and let’s actually start playing.\n We’ll pull in everything you own, no manual entry, no "what was that game with the birds?", just your actual collection, ready to filter and vote on.',
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

  /**
   * FAQ MODAL (AppFAQModal.js)
   * User Task: Getting help with linking their collection or trying a demo.
   * App Objective: Support and troubleshooting to prevent onboarding drop-off.
   */
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

  /**
   * HOME SCREEN (HomeScreen.js)
   * User Task: Selecting whether to pick a game or manage their collection.
   * App Objective: Navigation hub for the main app features.
   */
  home: {
    heroTitle: 'What Should We Play?',
    heroDescription: 'Set your constraints and let the wheel decide.',
    ctaChoose: 'Choose a game',
    ctaBrowse: 'Browse your shelf',
    ctaSettings: 'Settings',
  },

  /**
   * NAVIGATION & TITLES (Navigation.js)
   * User Task: Identifying which part of the app they are currently in.
   * App Objective: Contextual header text and navigation labels.
   */
  navigation: {
    connectCollection: 'Load Your Shelf',
    settings: 'Settings',
    browseCollection: 'Browse Shelf',
    browseCollectionTemplate: "{{username}}'s Shelf",
    chooseGame: 'Consult the wheel',
    yourOptions: 'What fits tonight',
    selectedGame: 'The wheel has chosen',
    spinnerScreen: 'Spin the wheel',
  },

  /**
   * SETUP SCREEN (SetupScreen.js)
   * User Task: Inputting constraints (players, time, complexity) to filter their collection.
   * App Objective: Advanced filtering interface for narrowing down game choices.
   */
  setup: {
    loadVibe: 'Load a vibe',
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
    vibeHeader: 'Vibe: {{name}}',
    vibeHeaderModified: 'Vibe: {{name}} (modified)',
    customFilters: 'Custom filters',
    vibeModified: '(modified)',
    saveAsNew: 'Save as new vibe',
    save: 'Save',
    dontSave: "Don't save",
    rename: 'Rename',
    loading: 'Loading shelf…',
  },

  /**
   * RESULTS SCREEN (ResultsScreen.js)
   * User Task: Reviewing the list of matching games and optionally voting.
   * App Objective: Displaying the filtered dataset and managing group input.
   */
  results: {
    gameMatch: '{{count}} game fits tonight.',
    gamesMatchMany: '{{count}} games fit tonight.',
    enableVotingMode: 'Enable Voting Mode',
    votingHint: 'One vote per player ({{assigned}} of {{total}} in)',
    allVotesAssigned: 'All voices in. Ready to consult the fates.',
    vibeSaved: 'Vibe saved!',
    saveAsVibe: 'Save as vibe',
    emptyTitle: 'Nothing on your shelf fits tonight.',
    emptyBody: "Widen the filters—we'll find something.",
    backToFilters: 'Adjust filters',
    ctaSpin: 'Let the wheel speak',
    ctaSelectGame: 'This one.',
  },

  /**
   * SPINNER SCREEN (SpinnerScreen.js)
   * User Task: Spinning the wheel to make a final selection from the list.
   * App Objective: Core interactive element that manages the random selection.
   */
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

  /**
   * SELECTED GAME REVEAL (SelectedGameScreen.js)
   * User Task: Viewing the final outcome and starting the physical play session.
   * App Objective: Confirming the selection and providing a path to reset or replay.
   */
  selectedGame: {
    title: 'Tonight, you shall play…',
    fallbackGameName: 'The chosen game',
    complexityLabel: 'Complexity: {{value}}',
    ctaStartNew: 'Start a new vibe',
    ctaPickAgain: 'Consult again (same filters)',
  },

  /**
   * DATA SOURCE STRINGS (BGG API)
   * User Task: Understanding API errors or status.
   * App Objective: Technical error reporting for external data sources.
   */
  bgg: {
    failedToLoadCollection: 'Failed to load collection',
    unknownError: 'Unknown BGG error',
  },

  /**
   * METADATA & LABELS (Shared components)
   * User Task: Distinguishing between complexity levels and player counts.
   * App Objective: Standardized labels for game attributes across the app.
   */
  vibeMetadata: {
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

  /**
   * ERROR HANDLING
   * User Task: Correcting input errors or understanding app limits.
   * App Objective: Validation logic and state management feedback.
   */
  errors: {
    maxVibesReached:
      'You can only save {{max}} vibes. Delete one to add another.',
    vibeNameRequired: 'Vibe name is required.',
  },

  /**
   * BROWSE SHELF (RankingsScreen.js)
   * User Task: Browsing their entire synced collection and seeing ratings.
   * App Objective: Gallery view for collection management and discovery.
   */
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

  /**
   * SETTINGS (SettingsScreen.js)
   * User Task: Adjusting theme, accessibility, and account connection.
   * App Objective: User preference management and account actions.
   */
  settings: {
    appearanceSectionTitle: 'Appearance',
    chooseThemeLabel: 'Theme',
    chooseThemeHelper: 'Choose how the wheel reveals itself to you.',
    themeLightLabel: 'Light',
    themeDarkLabel: 'Dark',
    themeSystemLabel: 'System',
    theVibeSectionTitle: 'Vibe Defaults',
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

  /**
   * MODALS & DIALOGS
   * User Task: Managing saved filter sets (vibes) and understanding voting.
   * App Objective: Specialized overlays for complex secondary tasks.
   */
  modals: {
    vibes: {
      title: 'Choose a vibe',
      headerNote: 'You can save vibes from the game list after filtering.',
      myVibes: 'My vibes',
      quickVibes: 'Quick vibes',
      close: 'Close',
      deleteConfirmTitle: 'Delete vibe?',
      deleteConfirmCancel: 'Cancel',
      deleteConfirmDelete: 'Delete',
    },
    vibeName: {
      title: 'Vibe name',
      rules:
        'Required. Max 64 characters. Multiple spaces are collapsed. Newlines and control characters are removed.',
      placeholder: 'e.g. 2-Player Night',
      save: 'Save',
      cancel: 'Cancel',
      errorRequired: 'Please enter a vibe name.',
      errorTooLong: 'Vibe name must be {{max}} characters or less.',
      errorMaxVibes:
        'You can only save {{max}} vibes. Delete one to add another.',
      errorExists: 'Vibe name already exists.',
      warningMatchesBuiltIn:
        'Name matches built-in vibe. Will save as "{{name}}".',
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

  /**
   * TIME LABELS
   * User Task: Selecting a timeframe for gameplay.
   * App Objective: Practical time-bucket labels for filtering.
   */
  lengthLabels: {
    any: 'Any length',
    under30min: '≤30m',
    under1hour: '≤1h',
    under2hours: '≤2h',
    long: '3h+',
  },

  /**
   * SYSTEM ALERTS
   * User Task: Reviewing confirmation prompts for destructive actions.
   * App Objective: Preventing accidental data loss or invalid states.
   */
  alerts: {
    votingModeSinglePlayerTitle: 'Voting Mode',
    votingModeSinglePlayerMessage:
      'Voting mode is not available for single-player games.',
    deleteAccountTitle: 'Delete your account?',
    deleteAccountMessage:
      'This cannot be undone. Your shelf, saved vibes, and preferences will be permanently deleted. There is no way to recover them.',
    deleteAccountCancel: 'Cancel',
    deleteAccountConfirm: 'Delete my account',
  },

  /**
   * SHARED / COMMON STRINGS
   * User Task: Generic interaction (save, close, cancel).
   * App Objective: Reusable UI labels for consistency.
   */
  common: {
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    players: '{{min}}–{{max}} players',
    unknownGame: 'Unnamed game',
  },
};
