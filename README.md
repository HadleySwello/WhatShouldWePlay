# Board Game Roulette

A React Native (Expo) app for **iOS** (and eventually other platforms) that helps you pick a board game from your [BoardGameGeek](https://boardgamegeek.com/) collection. Filter by player count, complexity, and length; vote as a group; then spin a wheel to choose the game.

**Distribution:** Built for release on the App Store. Users will get the app from the store—they do not run this repo directly. BGG account connection will be handled **in-app** (e.g. a form to link your BoardGameGeek account); that flow is planned for a future release.

## What the app does

- **Load your collection** — Fetches your owned games from the BoardGameGeek XML API and caches them locally.
- **Filter** — Narrow by number of players (1–10), complexity (low/medium/high), and game length (e.g. under 30 min, under 1 hour, under 2 hours, long).
- **Vote** — Each player adds or removes votes on games from the filtered list. Total votes must equal the number of players.
- **Spin** — When votes match the player count, a “Spin the Spinner!” button appears. The wheel shows the voted games and picks one at random.
- **Game list** — The “Game History” tab shows your full owned collection from BGG.

## Development

For local development and building for the App Store:

- **Prerequisites:** Node.js (LTS), Expo tooling, Xcode (for iOS). For Android builds: Android Studio.
- **Install:** `npm install`
- **Run:**  
  - `npm start` — Expo dev server (then `i` for iOS simulator, `a` for Android).  
  - `npm run ios` / `npm run android` — run on simulator/device.  
  - `npm run web` — run in browser.

Until the in-app BGG account form exists, the app uses a hardcoded username in `hooks/boardGameGeekApi.js` (`USERNAME`) for fetching the collection during development.

## Project structure

- `App.js` — Root component; renders the main navigation.
- `screens/` — `HomeScreen` (filter, vote, spinner), `SpinnerScreen` (wheel modal), `RankingsScreen` (owned games list), `Navigation.js` (bottom tabs).
- `hooks/boardGameGeekApi.js` — Fetches and parses BGG collection XML, maps to game shape, caches in AsyncStorage.
- `components/` — `Spinner`, `Button`, `GameCard`.
- `helpers/` — Shared colors, filters, and utilities.

## Tech stack

- **Expo** ~52, **React Native** 0.76, **React** 18
- **React Navigation** (bottom tabs, native stack)
- **axios** + **fast-xml-parser** for BGG API
- **AsyncStorage** for collection cache
- **react-native-lucky-wheel** for the spinner UI

## License

Private project. All rights reserved.
