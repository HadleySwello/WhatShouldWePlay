/**
 * In-memory vote cache for session persistence.
 * Cleared when user taps "Start New Pick" from SelectedGame screen.
 */

type VoteMap = Record<string, number>;
const cache: Record<string, VoteMap> = {};

export function getVotes(gameKey: string): VoteMap | undefined {
  return cache[gameKey];
}

export function setVotes(gameKey: string, votes: VoteMap): void {
  if (gameKey) {
    cache[gameKey] = votes;
  }
}

export function clearVoteCache(): void {
  for (const key of Object.keys(cache)) {
    delete cache[key];
  }
}
