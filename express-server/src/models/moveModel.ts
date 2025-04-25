export interface Move {
  id: string;
  gameId: string;
  playerId: string;
  word: string;
  score: number;
  position: {
    row: number;
    col: number;
  };
  direction: 'across' | 'down';
  timestamp: Date;
}