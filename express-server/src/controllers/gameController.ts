import { Request, Response } from 'express';
import { pusher } from '../utils/pusher';

interface BoardCell {
  letter: string;
  score: number;
  isNew?: boolean;
}

interface GameState {
  board: BoardCell[][];
  scores: Record<string, number>;
  currentPlayer: string;
  remainingTiles: string[];
}

interface MovePosition {
  row: number;
  col: number;
}

interface MoveDetails {
  word: string;
  score: number;
  position: MovePosition;
  direction: 'across' | 'down';
}

interface GameMoveRequest {
  gameState: GameState;
  moveDetails: MoveDetails;
}

interface PlayerJoinRequest {
  player: {
    id: string;
    name: string;
  };
  gameId?: string;
}

export const handleGameMove = async (
  req: Request<{ gameId: string }, {}, GameMoveRequest>,
  res: Response
): Promise<void> => {
  const { gameId } = req.params;
  const { gameState, moveDetails } = req.body;

  try {
    if (!gameId) {
      res.status(400).json({ error: 'Game ID is required' });
      return;
    }

    if (!gameState || !moveDetails) {
      res.status(400).json({ error: 'Invalid move data' });
      return;
    }

    // Validate move details
    if (!isValidMove(moveDetails)) {
      res.status(400).json({ error: 'Invalid move format' });
      return;
    }

    await pusher.trigger(`game-${gameId}`, 'move-made', {
      gameState,
      moveDetails,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      message: 'Move broadcast successfully'
    });
  } catch (error) {
    console.error('Error handling game move:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process game move'
    });
  }
};

export const handleGameJoin = async (
  req: Request<{}, {}, PlayerJoinRequest>,
  res: Response
): Promise<void> => {
  const { player, gameId } = req.body;

  try {
    if (!player?.id || !player?.name) {
      res.status(400).json({ error: 'Invalid player data' });
      return;
    }

    const gameChannel = gameId || Math.random().toString(36).substring(7);

    await pusher.trigger(`game-${gameChannel}`, 'player-joined', {
      player,
      gameId: gameChannel,
      timestamp: new Date().toISOString()
    });

    res.status(200).json({
      success: true,
      gameId: gameChannel
    });
  } catch (error) {
    console.error('Error handling game join:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process game join'
    });
  }
};

function isValidMove(move: MoveDetails): boolean {
  return (
    typeof move.word === 'string' &&
    move.word.length > 0 &&
    typeof move.score === 'number' &&
    typeof move.position.row === 'number' &&
    typeof move.position.col === 'number' &&
    ['across', 'down'].includes(move.direction)
  );
}
