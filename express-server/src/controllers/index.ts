import { Request, Response } from 'express';
import Pusher from 'pusher';

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

interface GameMoveRequest {
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

export const handleGameMove = async (
  req: Request<{ gameId: string }, {}, GameMoveRequest>,
  res: Response
): Promise<void> => {
  const { gameId } = req.params;
  const { gameState, moveDetails } = req.body;

  try {
    if (!gameState || !moveDetails) {
      res.status(400).json({ error: 'Invalid move data' });
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
