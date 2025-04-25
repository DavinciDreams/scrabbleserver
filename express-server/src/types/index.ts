export interface Player {
  id: string;
  name: string;
}

export interface BoardCell {
  letter: string;
  score: number;
  isNew?: boolean;
}

export interface MovePosition {
  row: number;
  col: number;
}

export interface GameState {
  board: BoardCell[][];
  scores: Record<string, number>;
  currentPlayer: string;
  remainingTiles: string[];
  players: Player[];
  gameId: string;
}

export interface MoveDetails {
  word: string;
  score: number;
  position: MovePosition;
  direction: 'across' | 'down';
  playerId: string;
}

export interface PlayerJoinRequest {
  player: Player;
  gameId?: string;
}

export interface MoveRequest {
  gameState: GameState;
  moveDetails: MoveDetails;
}

export interface GameResponse {
  success: boolean;
  gameId: string;
  error?: string;
}

export interface ValidateWordResponse {
  isValid: boolean;
  error?: string;
}

export interface GameMoveRequest {
  gameState: {
    board: any;
    scores: Record<string, number>;
    currentPlayer: string;
  };
  moveDetails: {
    word: string;
    score: number;
    position: {
      row: number;
      col: number;
    };
    direction: 'across' | 'down';
  };
}