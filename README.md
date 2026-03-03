# What Should We Play?

A Board Game Decision Tool — A React Native (Expo) app for **iOS** (and eventually other platforms) that helps you pick a board game from your [BoardGameGeek](https://boardgamegeek.com/) collection. Filter by player count, complexity, and length; vote as a group; then spin a wheel to choose the game.

**Distribution:** Built for release on the App Store. Users will get the app from the store—they do not run this repo directly. BGG account connection will be handled **in-app** (e.g. a form to link your BoardGameGeek account); that flow is planned for a future release.

## What the app does

- **Load your collection** — Fetches your owned games from the BoardGameGeek XML API and caches them locally.
- **Filter** — Narrow by number of players (1–10), complexity (low/medium/high), game length, and category (Card Game, Dice, etc.).
- **Vote** — Each player adds or removes votes on games from the filtered list. Total votes must equal the number of players.
- **Spin** — When votes match the player count, a “Spin the Spinner!” button appears. The wheel shows the voted games and picks one at random.
- **Game list** — The “My Games” tab shows your full owned collection from BGG.

## Development

For local development and building for the App Store:

- **Prerequisites:** Node.js (LTS), Expo tooling, Xcode (for iOS). For Android builds: Android Studio.
- **Install:** `npm install`
- **Run:**  
  - `npm start` — Expo dev server (then `i` for iOS simulator, `a` for Android).  
  - `npm run ios` / `npm run android` — run on simulator/device.  
  - `npm run web` — run in browser.

**BGG API token:** The app requires a BGG application token for the XML API. Copy `.env.example` to `.env` and add your token: `BGG_API_TOKEN=your-token-here`. Get your token at [boardgamegeek.com/applications](https://boardgamegeek.com/applications) (your app → Tokens). Never commit `.env`. For EAS Build, use `eas secret:create --name BGG_API_TOKEN --value "your-token"`.

**Powered by BGG logo:** BGG terms require the "Powered by BGG" logo. Download it from [BGG's Google Drive](https://drive.google.com/drive/folders/1k3VgEIpNEY59iTVnpTibt31JcO0rEaSw) and save as `assets/powered-by-bgg.png` (replace the placeholder).

## Project structure

- `App.js` — Root component; renders the main navigation.
- `screens/` — `HomeScreen` (filter, vote, spinner), `SpinnerScreen` (wheel modal), `RankingsScreen` (owned games list), `Navigation.js` (bottom tabs).
- `hooks/boardGameGeekApi.js` — Fetches BGG collection + thing API (categories, mechanics, minAge, bggAverage, bggRank). All data cached in AsyncStorage. Additional thing fields you could add: description, suggested player counts, language dependence, designers.
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
