# Antigravity Instructions - WhatShouldWePlay

These are the "House Rules" for building and maintaining the **WhatShouldWePlay** codebase. Follow these strictly to ensure consistency and high quality.

## 🏗️ Core Architecture
- **Functional First:** Use functional components and hooks exclusively. No class components.
- **State & Storage:** Use `AsyncStorage` and local state for data persistence. No complex state libraries or migrations are needed for now given the current user base.
- **Centralized APIs:** All API calls (e.g., BoardGameGeek via `axios`) must be centralized in a dedicated service/helper layer.
- **Error Handling:** Use a centralized Hook/Service that all screens can call to handle the visual side of an error (e.g., showing a themed error card).
- **Self-Documenting Code:** Prioritize clean variable names and intuitive logic over heavy commenting. Only comment where the intent isn't obvious from the code itself.

## 🎨 Styling & Theming
- **Zero Inline Styles:** Never use inline style objects or arrays directly in the JSX.
- **Theme First:** All styles must be defined and retrieved from the `theme/` folder via the `useAppTheme()` hook and its `styles` object.
- **Dynamic Helpers:** For dynamic styles (like animations or props-driven dimensions), use helper functions in `theme/components.js`.
- **Reduce Movement:** Strictly respect the "Reduce Movement" setting. This should be baked into the theme context so all animated components can react to it. (Note: The ritual wheel always spins regardless).
- **Responsive Design:** Use Flexbox `flexWrap` for basic, effective responsiveness. Ensure the app works perfectly on both phones and tablets.

## 🧱 Component Strategy
- **Granularity:** Proactively extract UI patterns (like the BGG attribution logo or themed app logos) into small, reusable components in the `components/` folder.
- **Vector Icons:** Use `@expo/vector-icons` (Feather) for all utility icons. Custom SVGs are reserved for major brand elements.
- **Vibrant & Alive:** Prioritize smooth animations and "ritualistic" UI moments. Major successes (like saving a ritual) should be treated as full-screen celebrations.

## 🧼 Workflow & Quality
- **Standardized Imports:** Order imports as: 1. React/Native, 2. External Libraries, 3. Internal Components/Helpers.
- **Format & Lint:** Always run `npm run lint` and `npm run format` (Prettier) after making architectural or visual changes. 
- **Testing by Default:** Implement unit tests (for logic) and component tests (for UI) as part of the standard development process.
- **Accessibility:** All interactive elements must have proper accessibility labels and roles.
