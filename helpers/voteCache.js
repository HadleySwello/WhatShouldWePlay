/**
 * In-memory vote cache for session persistence.
 * Cleared when user taps "Start New Pick" from SelectedGame screen.
 */

const cache = {};

export function getVotes(gameKey) {
  return cache[gameKey];
}

export function setVotes(gameKey, votes) {
  if (gameKey) {
    cache[gameKey] = votes;
  }
}

export function clearVoteCache() {
  for (const key of Object.keys(cache)) {
    delete cache[key];
  }
}
