# Copy Reference — Canonical Key List

Single source of truth for all user-facing strings. Used by `constants/copy/en.js`. For future i18n, add locale files (e.g. `es.js`) with the same key structure.

## Interpolation

Use `{{key}}` placeholders. Consumer calls `t(copy.path.to.key, { key: value })` from `constants/copy`.

---

## Keys by Namespace

### splash

| Key         | Value                                    | Notes                   |
| ----------- | ---------------------------------------- | ----------------------- |
| title       | What Should We Play?                     |                         |
| subtitle    | A Board Game Decision Tool               |                         |
| tagline     | A calm ritual for choosing what to play. | Optional, shown smaller |
| attribution | Data provided by BoardGameGeek           |                         |
| a11y        | Powered by BoardGameGeek                 | Accessibility label     |

### welcome

| Key      | Value                                                                        |
| -------- | ---------------------------------------------------------------------------- |
| title    | What Should We Play?                                                         |
| subtitle | Import your collection, set tonight's constraints, and we'll guide the pick. |
| cta      | Connect BoardGameGeek                                                        |

### connectBGG

| Key              | Value                                                    |
| ---------------- | -------------------------------------------------------- |
| navTitle         | Load Your Shelf                                          |
| header           | Connect your BoardGameGeek shelf                         |
| body             | Enter your BoardGameGeek username to load your shelf.    |
| placeholder      | Username                                                 |
| loading          | Loading your shelf…                                      |
| error            | That username doesn't exist on BoardGameGeek. Try again? |
| usernameRequired | Please enter a username.                                 |
| cta              | Load Shelf                                               |

### bgg

| Key                    | Value                     |
| ---------------------- | ------------------------- |
| failedToLoadCollection | Failed to load collection |
| unknownError           | Unknown BGG error         |

### presetMetadata

| Key             | Value                 | Interpolation |
| --------------- | --------------------- | ------------- |
| any             | Any                   |               |
| lightAndUp      | Light and up          |               |
| mediumAndUp     | Medium and up         |               |
| heavyAndUp      | Heavy and up          |               |
| upToLight       | Up to Light           |               |
| upToMedium      | Up to Medium          |               |
| upToHeavy       | Up to Heavy           |               |
| light           | Light                 |               |
| medium          | Medium                |               |
| heavy           | Heavy                 |               |
| lightToMedium   | Light to Medium       |               |
| lightToHeavy    | Light to Heavy        |               |
| mediumToHeavy   | Medium to Heavy       |               |
| players         | {{count}} players     | count         |
| complexityLabel | Complexity: {{value}} | value         |

### errors

| Key                | Value                                                         | Interpolation |
| ------------------ | ------------------------------------------------------------- | ------------- |
| maxRitualsReached  | You can only save {{max}} rituals. Delete one to add another. | max           |
| ritualNameRequired | Ritual name is required.                                      |               |

### home

| Key         | Value             |
| ----------- | ----------------- |
| title       | Start Picking     |
| ctaChoose   | Choose A Game     |
| ctaBrowse   | Browse Collection |
| ctaSettings | Settings          |

### navigation

| Key               | Value                   |
| ----------------- | ----------------------- |
| connectCollection | Connect Your Collection |
| settings          | Settings                |
| browseCollection  | Browse Collection       |
| chooseGame        | Choose a Game           |
| yourOptions       | Your Options            |
| selectedGame      | Selected Game           |

### setup

| Key                  | Value                                                                 | Interpolation |
| -------------------- | --------------------------------------------------------------------- | ------------- |
| loadPreset           | Load a ritual                                                         |               |
| howManyPlayers       | How many players?                                                     |               |
| playTime             | Play Time                                                             |               |
| maxLength            | Maximum game length                                                   |               |
| complexity           | Complexity                                                            |               |
| complexityHelper     | How complex are you willing to go?                                    |               |
| anyComplexity        | Any complexity                                                        |               |
| advancedFilters      | Advanced Filters                                                      |               |
| mechanics            | Mechanics                                                             |               |
| mechanicsHelper      | Filter by game mechanism                                              |               |
| categories           | Categories                                                            |               |
| categoriesHelper     | Filter by game type                                                   |               |
| any                  | Any                                                                   |               |
| selectedCount        | {{count}} selected                                                    | count         |
| minMaxReadout        | Min: {{min}} Max: {{max}}                                             | min, max      |
| noMatchesTitle       | Nothing fits those constraints                                        |               |
| noMatchesBody        | Try increasing max time or lowering complexity. We'll find something. |               |
| ctaViewGames         | View {{count}} Games                                                  | count         |
| ctaNoMatches         | No matches                                                            |               |
| presetHeader         | Ritual: {{name}}                                                      | name          |
| presetHeaderModified | Ritual: {{name}} (modified)                                           | name          |
| customFilters        | Custom filters                                                        |               |
| presetModified       | (modified)                                                            |               |
| saveAsNew            | Save as new                                                           |               |
| save                 | Save                                                                  |               |
| dontSave             | Don't save                                                            |               |
| rename               | Rename                                                                |               |
| loading              | Loading your collection...                                            |               |

### results

| Key              | Value                                                                 | Interpolation                          |
| ---------------- | --------------------------------------------------------------------- | -------------------------------------- |
| gamesMatch       | {{count}} {{gameLabel}} match                                         | (unused; use gameMatch/gamesMatchMany) |
| gameMatch        | {{count}} game matches                                                | count                                  |
| gamesMatchMany   | {{count}} games match                                                 | count                                  |
| enableVotingMode | Enable Voting Mode                                                    |                                        |
| votingHint       | One vote per player ({{assigned}} of {{total}} assigned)              | assigned, total                        |
| allVotesAssigned | All votes assigned.                                                   |                                        |
| presetSaved      | Ritual saved!                                                         |                                        |
| saveAsPreset     | Save as ritual                                                        |                                        |
| emptyTitle       | Nothing fits those constraints                                        |                                        |
| emptyBody        | Try increasing max time or lowering complexity. We'll find something. |                                        |
| backToFilters    | Adjust filters                                                        |                                        |
| ctaSpin          | Consult the fates                                                     |                                        |
| ctaSelectGame    | Select Game                                                           |                                        |

### spinner

| Key              | Value                       | Interpolation |
| ---------------- | --------------------------- | ------------- |
| title            | Ready to consult the fates? |               |
| celebrationTitle | The table has chosen.       |               |
| ctaPlay          | Play This                   |               |
| ctaSpinAgain     | Spin Again                  |               |
| backToList       | Back to List                |               |
| spinButton       | Let the wheel speak         |               |
| winnerLabel      | Winner: {{name}}            | name          |
| noGames          | No games                    |               |

### selectedGame

| Key              | Value                     | Interpolation |
| ---------------- | ------------------------- | ------------- |
| title            | Tonight, you shall play…  |               |
| fallbackGameName | Selected game             |               |
| complexityLabel  | Complexity: {{value}}     | value         |
| ctaStartNew      | Start the ritual          |               |
| ctaPickAgain     | Pick Again (Same Filters) |               |

### rankings

| Key               | Value                                                                             | Interpolation |
| ----------------- | --------------------------------------------------------------------------------- | ------------- |
| loading           | Loading your collection...                                                        |               |
| retry             | Try Again                                                                         |               |
| emptyTitle        | Your collection is empty                                                          |               |
| emptyBody         | No games in your collection. Add games via BoardGameGeek or change your username. |               |
| ctaChangeUsername | Change Username                                                                   |               |
| ctaChooseGame     | Choose a Game                                                                     |               |
| gameDetails       | Rating: {{rating}}                                                                | rating        |

### settings

| Key                | Value                |
| ------------------ | -------------------- |
| defaultPlayerCount | Default player count |
| enableVotingMode   | Enable Voting Mode   |
| changeUsername     | Change Username      |

### modals.presets

| Key                 | Value                                                    |
| ------------------- | -------------------------------------------------------- |
| title               | Choose a ritual                                          |
| headerNote          | You can save rituals from the game list after filtering. |
| myPresets           | My rituals                                               |
| quickPresets        | Quick rituals                                            |
| close               | Close                                                    |
| deleteConfirmTitle  | Delete ritual?                                           |
| deleteConfirmCancel | Cancel                                                   |
| deleteConfirmDelete | Delete                                                   |

### modals.presetName

| Key                   | Value                                                                                                    | Interpolation |
| --------------------- | -------------------------------------------------------------------------------------------------------- | ------------- |
| title                 | Ritual name                                                                                              |               |
| rules                 | Required. Max 64 characters. Multiple spaces are collapsed. Newlines and control characters are removed. |               |
| placeholder           | e.g. 2-Player Night                                                                                      |               |
| save                  | Save                                                                                                     |               |
| cancel                | Cancel                                                                                                   |               |
| errorRequired         | Please enter a ritual name.                                                                              |               |
| errorTooLong          | Ritual name must be {{max}} characters or less.                                                          | max           |
| errorMaxPresets       | You can only save {{max}} rituals. Delete one to add another.                                            | max           |
| errorExists           | Ritual name already exists.                                                                              |               |
| warningMatchesBuiltIn | Name matches built-in ritual. Will save as "{{name}}".                                                   | name          |

### modals.votingMode

| Key   | Value                  |
| ----- | ---------------------- |
| title | Voting Mode            |
| close | Close                  |
| body  | (multi-line explainer) |

### lengthLabels

| Key         | Value      |
| ----------- | ---------- |
| any         | Any length |
| under30min  | ≤30m       |
| under1hour  | ≤1h        |
| under2hours | ≤2h        |
| long        | 3h+        |

### alerts

| Key                           | Value                                                 |
| ----------------------------- | ----------------------------------------------------- |
| votingModeSinglePlayerTitle   | Voting Mode                                           |
| votingModeSinglePlayerMessage | Voting mode is not available for single-player games. |

### common

| Key         | Value                   | Interpolation |
| ----------- | ----------------------- | ------------- |
| close       | Close                   |               |
| cancel      | Cancel                  |               |
| save        | Save                    |               |
| delete      | Delete                  |               |
| players     | {{min}}–{{max}} players | min, max      |
| unknownGame | Unnamed game            |               |

---

## Complexity Tiers

Display complexity as **Low**, **Medium**, **High** (capitalized). Use `capitalizeComplexityTier()` from `helpers/complexity.js` when rendering `getComplexityTier()` output.

---

## Excluded from Copy Object

- **Preset names/descriptions** — `helpers/quickPresets.js` (content, not UI copy)
