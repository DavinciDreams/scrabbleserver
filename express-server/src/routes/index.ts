import { Express } from 'express';
import { handleGameMove } from '../controllers/gameController';

export const setRoutes = (app: Express): void => {
  app.post('/api/game/:gameId/move', handleGameMove);
};