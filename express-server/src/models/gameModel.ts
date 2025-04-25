import { Player } from './playerModel';

export interface GameModel {
  id: string;
  players: Player[];
  board: BoardCell[][];
  currentTurn: string; // player ID
  scores: Record<string, number>;
  remainingTiles: string[];
  status: GameStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardCell {
  letter: string;
  score: number;
  isNew?: boolean;
  multiplier?: {
    type: 'letter' | 'word';
    value: 2 | 3;
  };
}

export type GameStatus = 'waiting' | 'active' | 'completed';