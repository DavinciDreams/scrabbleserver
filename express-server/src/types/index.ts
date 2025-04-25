export interface PlayerJoinRequest {
  player: {
    id: string;
    name: string;
  };
  gameId?: string;
}

export interface MoveRequest {
  gameState: any; // Define more specific type based on your game state structure
  moveDetails: any; // Define more specific type based on your move details structure
}