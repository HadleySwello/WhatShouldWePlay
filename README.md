# What Should We Play?

A Board Game Decision Tool — A React Native (Expo) app for **iOS**, **Android**, and **Web** that helps you pick a board game from your [BoardGameGeek](https://boardgamegeek.com/) collection. Filter by player count, complexity, and length; vote as a group; then spin a wheel to choose the game.

**Distribution:** Built for release on the App Store. Users will get the app from the store—they do not run this repo directly. BGG account connection is handled **in-app** (connect and import your BoardGameGeek collection).

## What the app does

- **Load your collection** — Fetches your owned games from the BoardGameGeek XML API and caches them locally.
- **Filter** — Narrow by number of players (1–10), complexity (low/medium/high), game length, and category (Card Game, Dice, etc.).
- **Vote** — Each player adds or removes votes on games from the filtered list. Total votes must equal the number of players.
- **Spin** — When votes match the player count, a “Spin the Spinner!” button appears. The wheel shows the voted games and picks one at random.
- **Game list** — The “My Games” tab shows your full owned collection from BGG.
- **Presets** — Save and reuse filter presets.

## Development

**Prerequisites:** Node.js (LTS), Expo tooling, Xcode (for iOS), Android Studio (for Android).

**Install:**

```bash
npm install
```

**Run:**

- `npm start` — Expo dev server (then `i` for iOS simulator, `a` for Android, `w` for web).
- `npm run ios` — Run on iOS simulator.
- `npm run android` — Run on Android emulator/device.
- `npm run web` — Run in browser.

**Lint & format:**

- `npm run lint` — Run ESLint.
- `npm run format` — Format with Prettier.
- `npm run format:check` — Check formatting without writing.

**BGG API token:** The app requires a BGG application token for the XML API. Copy `.env.example` to `.env` and add your token:

```
BGG_API_TOKEN=your-token-here
```

Get your token at [boardgamegeek.com/applications](https://boardgamegeek.com/applications) (your app → Tokens). Never commit `.env`. For EAS Build, use:

```bash
eas secret:create --name BGG_API_TOKEN --value "your-token"
```

**Powered by BGG logo:** BGG terms require the "Powered by BGG" logo. Do not remove it.

## Project structure

- `App.js` — Root component; renders main navigation.
- `screens/` — `SplashScreen`, `WelcomeScreen`, `ConnectBGGScreen`, `HomeScreen`, `SetupScreen`, `ResultsScreen`, `SelectedGameScreen`, `SpinnerScreen`, `RankingsScreen`, `SettingsScreen`, `Navigation.js`.
- `hooks/boardGameGeekApi.js` — Fetches BGG collection + thing API (categories, mechanics, minAge, bggAverage, bggRank). All data cached in AsyncStorage.
- `components/` — `Spinner`, `Button`, `GameCard`, `ConfettiCelebration`, `PresetsModal`.
- `helpers/` — Shared colors, filters, presets storage, and utilities.
- `data/` — Seed games for development.

## Tech stack

- **Expo** ~53, **React Native** 0.79, **React** 19
- **React Navigation** (bottom tabs, native stack)
- **axios** + **fast-xml-parser** for BGG API
- **AsyncStorage** for collection cache
- **react-native-lucky-wheel** for the spinner UI
- **react-native-fast-confetti** for celebrations
- **ESLint** + **Prettier** for linting and formatting

## License

Private project. All rights reserved.
