# Quick Presets: Filter Rules & Data Reference

This document explains the filter rules, behavior, constraints, and data shapes used by the quick presets. Use it to evaluate and improve preset definitions and to ensure content recommendations are precise.

---

## Filter object shape

Every preset’s `filters` object has this structure:

```js
{
  playerCount: number,       // 1–10, required (default 2)
  complexityMin: number | null,  // 0–5 inclusive, null = no minimum
  complexityMax: number | null,  // 0–5 inclusive, null = no maximum
  maxLength: string | null,  // see Play Time values below
  selectedMechanics: string[],   // BGG mechanic names, empty = any
  selectedCategories: string[],  // BGG category names, empty = any
}
```

---

## Filter rules and behavior

### 1. Player count

- **Field:** `playerCount`
- **Type:** `number`
- **Allowed range:** 1–10
- **Default if missing:** 2

**Behavior:** A game matches if:

```
playerCount >= game.playersMin && playerCount <= game.playersMax
```

- **Intent:** “How many people are playing?”
- **Restriction:** Uses the game’s reported min/max from BoardGameGeek. If a game supports 2–6 players and you choose 4, it matches.

---

### 2. Complexity (min/max)

- **Fields:** `complexityMin`, `complexityMax`
- **Types:** `number | null`
- **Allowed range when set:** 0–5 (integer)
- **When both are `null`:** Any complexity allowed

**Behavior:** Complexity uses the game’s `complexityWeight` (BGG “average weight”):

- If both min and max are `null` → all games pass (no filter).
- If either is set → game must have a finite `complexityWeight`.
- Match rules:
  - If `complexityMin != null` and `game.complexityWeight < complexityMin` → **no match**.
  - If `complexityMax != null` and `game.complexityWeight > complexityMax` → **no match**.

**Intent:** “How complex are you willing to go?” — BGG weights 0–5. Tier thresholds (from `helpers/complexity.js`):

- **Low:** weight < 2.0
- **Medium:** weight 2.0–3.49
- **High:** weight ≥ 3.5

So `complexityMax: 2` roughly means "low to light-medium" games.

**Restrictions:**

- `complexityMin` and `complexityMax` are normalized; if min > max, min is set to max.
- Games with missing or non-finite `complexityWeight` do not match when complexity filter is active.

---

### 3. Play time (maximum length)

- **Field:** `maxLength`
- **Type:** `string | null`
- **Allowed values:** `null` | `'under 30 min'` | `'under 1 hour'` | `'under 2 hours'` | `'long'`
- **When `null`:** Any length allowed

**Behavior:** Each game has a derived `length` string. Matching is based on an ordered scale:

| Filter value   | Label in UI | Game passes if its `length` is…        |
|----------------|-------------|----------------------------------------|
| `null`         | Any length  | Any                                    |
| `'under 30 min'` | ≤30m      | `'under 30 min'` only                  |
| `'under 1 hour'` | ≤1h       | `'under 30 min'` or `'under 1 hour'`   |
| `'under 2 hours'`| ≤2h      | `'under 30 min'`, `'under 1 hour'`, or `'under 2 hours'` |
| `'long'`       | 3h+         | `'long'` only                          |

**How `game.length` is derived (BGG `playingtime`):**

- 0–30 min → `'under 30 min'`
- 31–60 min → `'under 1 hour'`
- 61–120 min → `'under 2 hours'`
- 121+ min → `'long'`

**Intent:** “Maximum game length you’re willing to play.” Each filter is a cap: shorter games also qualify.

---

### 4. Mechanics

- **Field:** `selectedMechanics`
- **Type:** `string[]`
- **Allowed values:** BGG mechanic names from the user’s collection

**Behavior:**

- Empty `[]` → any mechanic (no filter).
- Non-empty → game must have at least one of the selected mechanics:

  ```text
  game.mechanics && selectedMechanics.some(m => game.mechanics.includes(m))
  ```

**Intent:** “Games that include at least one of these mechanics.”

**Restrictions:**

- Strings must exactly match BGG values (e.g. `"Hand Management"`, `"Set Collection"`).
- Valid values come from the games in the collection, not a fixed list.

---

### 5. Categories

- **Field:** `selectedCategories`
- **Type:** `string[]`
- **Allowed values:** BGG category names from the user’s collection

**Behavior:**

- Empty `[]` → any category.
- Non-empty → game must have at least one of the selected categories:

  ```text
  game.categories && selectedCategories.some(c => game.categories.includes(c))
  ```

**Intent:** “Games in at least one of these categories.”

**Restrictions:**

- Same as mechanics: exact BGG string match.
- Valid values come from the collection’s games.

---

## Game object shape

Games come from BoardGameGeek or the seed data. Fields relevant to filtering:

```js
{
  id: string,
  name: string,
  playersMin: number,      // used for player count filter
  playersMax: number,      // used for player count filter
  complexityWeight: number, // BGG average weight, 0–5, used for complexity filter
  length: string,          // 'under 30 min' | 'under 1 hour' | 'under 2 hours' | 'long'
  mechanics: string[],     // e.g. ['Hand Management', 'Set Collection']
  categories: string[],    // e.g. ['Card Game', 'Fantasy']
  // Optional: minAge, minPlaytime, maxPlaytime, bggAverage, bggRank, etc.
}
```

---

## Preset object shape

Full preset structure (quick presets and user-saved presets):

```js
{
  id: string,           // stable id (e.g. 'party', 'heavy', 'family' for quick presets)
  name: string,         // display name
  isQuick: boolean,     // true for built-in quick presets
  description?: string, // optional, shown for quick presets
  filters: {
    playerCount: number,
    complexityMin: number | null,
    complexityMax: number | null,
    maxLength: string | null,
    selectedMechanics: string[],
    selectedCategories: string[],
  },
}
```

---

## Current quick presets

Persona-aligned presets based on `docs/quick-presets-deep-research-report.md`:

| Preset                 | playerCount | complexityMin | complexityMax | maxLength       |
|------------------------|-------------|---------------|---------------|-----------------|
| Family Weeknight Win   | 4           | 0             | 2             | under 1 hour    |
| Family Game Night Plus | 4           | 2             | 3             | under 2 hours   |
| Anytime Crowd-Pleaser  | 4           | null          | 3             | under 2 hours   |
| Big Table Icebreakers  | 5           | 0             | 2             | under 30 min    |
| Social Deduction Light | 6           | 0             | 2             | under 30 min    |
| Thinky Euro Night      | 4           | 3             | 4             | under 2 hours   |
| Deep Strategy Epic     | 4           | 4             | null          | long            |
| Two-Player Duel        | 2           | null          | 3             | under 1 hour    |
| Solo or Co-op Brainburn| 1           | 3             | null          | under 2 hours   |

All presets use empty `selectedMechanics` and `selectedCategories` to avoid over-filtering.

---

## Tips for preset design

1. **playerCount**  
   Use values that reflect typical group sizes for that vibe (e.g. party: 4–6, family: 2–6).

2. **complexityMin / complexityMax**  
   Use integers 0–5. `null` means “no limit.” Examples:
   - Light only: `complexityMin: 0, complexityMax: 2`
   - Heavy only: `complexityMin: 3.5, complexityMax: 5` (or `complexityMin: 4` and `complexityMax: 5`)
   - Any: `complexityMin: null, complexityMax: null`

3. **maxLength**  
   Use `null` for “any” or one of the four string values. More inclusive = shorter cap (e.g. `'under 2 hours'` includes 30m and 1h games).

4. **selectedMechanics / selectedCategories**  
   Leave empty for “any.” Otherwise use exact BGG strings. They are collection-dependent, so presets with mechanics/categories may return fewer or no matches for some users.

5. **Descriptions**  
   Keep them short and aligned with the filter intent (group size, complexity, length, style).
