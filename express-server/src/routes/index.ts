import { Express } from 'express';
import { handleGameMove } from '../controllers/gameController';
import {handleGameJoin} from '';

export const setRoutes = (app: Express): void => {
  app.post('/api/game/:gameId/move', handleGameMove);

  app.post('/api/games/join', (req, res) => {
  // Handle the request});

    
};
