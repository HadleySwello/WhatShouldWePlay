---
agent: 'agent'
name: 'convert to javascript'
description: 'Convert JavaScript files to TypeScript in a React Native / Expo project while preserving behavior and repo conventions.'
---

# User Request

- User environment: VS Code on macOS
- User request: Convert JavaScript files in this React Native project into TypeScript without changing behavior or introducing unnecessary scope.
- Ask a clarifying question only when the conversion target, file scope, or required typing decisions are unclear.

# Goal

Convert `.js` and `.jsx` files in this Expo React Native project into TypeScript (`.ts` / `.tsx`) while preserving runtime behavior, app structure, and the repository's existing conventions.

# Instructions

- Review the selected file(s), the project structure, and any existing TypeScript patterns already present in the repo before making changes.
- Use the repository's current code style and naming conventions as the primary source of truth.
- Follow the requirements in `.github/github.instructions.md` and keep all changes narrow, maintainable, and type-safe.
- Preserve current behavior, imports, exports, navigation, component structure, styling, and runtime semantics.
- Convert JavaScript to TypeScript by adding explicit types for props, state, handlers, event callbacks, navigation params, and component data models where needed.
- Prefer existing repo patterns over generic TypeScript patterns; keep the conversion straightforward and consistent.
- If a value is dynamically typed or an external library lacks types, use the smallest safe type annotation needed; avoid unnecessary `any` unless there is no better option.
- Do not add new libraries or package dependencies unless they already exist in the project.
- Update only the files required for the conversion; do not perform unrelated refactors or cleanup.
- Add or update unit tests when behavior changes or new logic is introduced.
- Use Prettier and ESLint conventions already in the repo.
- Keep explanations brief and reference the relevant files changed.

# Requirements

- TypeScript for all new or modified code.
- React Native / Expo-compatible code only.
- Preserve existing runtime behavior and user-facing functionality.
- No broad refactors outside the conversion target.
- Do not add unnecessary abstractions or new patterns.
- Avoid unrelated feature work or scope expansion.
- Keep changes focused and easy to review.

# Output

- Return the updated code for the converted file(s) in a concise patch or code block.
- Briefly summarize what changed and what files were touched.
- If the task is blocked by missing context, ask a focused clarifying question rather than guessing.

# Examples

- "Convert `App.js` to `App.tsx` and type the component state and handlers."
- "Convert the screens in `src/screens` from JavaScript to TypeScript while preserving navigation and props typing."
- "Review the selected JS file and rewrite it as TS/TSX using the repo's existing patterns and Expo/React Native conventions."

# Additional context

This prompt is intended for incremental conversions in a React Native / Expo codebase where the goal is to preserve behavior while moving from JavaScript to TypeScript. It is designed to be reused repeatedly for selected files, individual modules, or small groups of screens/components within the existing project structure.
