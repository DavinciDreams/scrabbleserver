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
export interface GameData {
  id: string;   // Game ID              
  players: Player[]; // Array of players in the game
  board: BoardCell[][]; // 2D array representing the game board
  scores: Record<string, number>; // Player scores
  currentPlayer: string; // ID of the current player

  remainingTiles: string[]; // Array of remaining tiles
  gameId: string; // Game ID
  gameState: GameState; // Current state of the game
  moveDetails: MoveDetails; // Details of the last move made
}
export interface PlayerData {
  id: string; // Player ID        
  name: string; // Player name
  gameId: string; // ID of the game the player is in  
  joinedAt: Date; // Timestamp of when the player joined the game
  score: number; // Player's score
  tiles: string[]; // Array of tiles held by the player

  isTurn: boolean; // Indicates if it's the player's turn
  isHost: boolean; // Indicates if the player is the host of the game
  isReady: boolean; // Indicates if the player is ready to play 
  isActive: boolean; // Indicates if the player is active in the game
  isWinner: boolean; // Indicates if the player has won the game
  isLoser: boolean; // Indicates if the player has lost the game
  isSpectator: boolean; // Indicates if the player is a spectator
  isBanned: boolean; // Indicates if the player is banned from the game
  isKicked: boolean; // Indicates if the player has been kicked from the game
  isDisconnected: boolean; // Indicates if the player is disconnected
  isReconnected: boolean; // Indicates if the player has reconnected to the game
  isMuted: boolean; // Indicates if the player is muted in the game
}