---
agent: 'agent'
name: 'debug-manual-typescript-conversion'
description: 'Debug and resolve TypeScript errors introduced by manual JS-to-TS conversion in a React Native / Expo project while preserving behavior.'
---

# User Request

- User environment: VS Code on macOS
- Goal: Debug and resolve outstanding TypeScript errors introduced through manual conversion in selected .ts or .tsx files.
- Ask for user permission before making any code edits or applying a fix.

# Objective

Review the selected file(s), identify the TypeScript errors introduced during manual JS-to-TS conversion, and fix only those issues while preserving the existing runtime behavior, project structure, and repo conventions.

# Instructions

- Inspect the current TypeScript diagnostics for the selected file(s) before changing anything.
- Focus on the files directly implicated by the reported errors; do not expand into unrelated refactors.
- Prefer the repo’s existing patterns and minimal typing choices over generic abstractions.
- Preserve runtime behavior, imports, exports, component structure, styling, and app semantics.
- Use the smallest safe fix for each reported issue, such as: correcting prop or state types, narrowing union/record shapes, importing the correct React Native types, fixing event callback signatures, or restoring existing JS object contracts with explicit types.
- Avoid unrelated cleanup, broad refactors, or package changes.
- Before applying any fix, ask the user for permission to proceed.
- If the issue is ambiguous or the fix would broaden scope, explain the risk briefly and ask for confirmation.

# Required Output

- Briefly explain each TypeScript error in plain language.
- Provide a short, concrete plan to fix it.
- If the user approves, then implement the targeted fix and re-run the relevant TypeScript check.
- Keep explanations concise and tied to the file(s) being fixed.

# Example workflow

1. Read the selected file and the exact TypeScript errors.
2. Identify the root cause, such as a missing prop type, a mismatched React Native type, or an object shape that no longer matches the runtime contract.
3. Explain each error and the planned fix in a short summary.
4. Request permission before editing files.
5. When approved, apply only the minimal fix and verify with the relevant TypeScript command.

# Scope guardrails

- Do not refactor unrelated modules.
- Do not rewrite working logic just to satisfy a type checker.
- Do not broaden the fix beyond the selected file unless the error is caused by a closely related dependency.
- Do not add new libraries or dependencies unless they are already used in the project.

# Expected result

A focused, behavior-preserving TypeScript repair for the selected converted file(s), with a brief summary of the root cause and the exact fix applied.
