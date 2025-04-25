import { Express, Request, Response } from 'express';
import { handleGameMove } from '../controllers/gameController';
import { handleGameJoin } from '../controllers/gameController';
import { PlayerJoinRequest, MoveRequest } from '../types';
import { dictionary } from '../utils/dictionary';
import { pusher } from '../utils/pusher';

export const setRoutes = (app: Express): void => {
  // Game routes
  app.post('/api/game/:gameId/move', handleGameMove);

  app.get('/api/games/:gameId', async (req: Request, res: Response) => {
    const { gameId } = req.params;
    if (!gameId) {
      return res.status(400).json({ error: 'Game ID is required' });
    }
    try {
      const game = await gameService.getGameById(gameId);
      if (!game) {
        return res.status(404).json({ error: 'Game not found' });
      }
      res.json(game);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch game' });
    }
  });

  app.post('/api/games/create', async (req: Request<{}, {}, PlayerJoinRequest>, res: Response) => {
    const { player } = req.body;
    if (!player?.id || !player?.name) {
      return res.status(400).json({ error: 'Invalid player data' });
    }

    try {
      const gameId = Math.random().toString(36).substring(7);
      await pusher.trigger(`game-${gameId}`, 'game-created', {
        player,
        gameId
      });
      res.json({ success: true, gameId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create game' });
    }
  });

  app.post('/api/games/join', async (req: Request<{}, {}, PlayerJoinRequest>, res: Response) => {
    const { player, gameId } = req.body;

    if (!player?.id || !player?.name) {
      return res.status(400).json({ error: 'Invalid player data' });
    }

    try {
      await pusher.trigger(`game-${gameId}`, 'player-joined', {
        player,
        gameId
      });
      res.json({ success: true, gameId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to join game' });
    }
  });

  app.get('/api/validate-word/:word', (req: Request, res: Response) => {
    const word = req.params.word?.trim();
    if (!word) {
      return res.status(400).json({ error: 'Word is required' });
    }
    const isValid = dictionary.has(word.toUpperCase());
    res.json({ isValid });
  });
};
