import { Express } from 'express';
import { handleGameMove } from '../controllers/gameController';
import {handleGameJoin} from '';

export const setRoutes = (app: Express): void => {
  app.post('/api/game/:gameId/move', handleGameMove);
    const game = await gameService.getGameById(gameId);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    res.json(game);
  }

  app.post('/api/games/create', async (req, res) => {
    const { player } = req.body;
    if (!player || !player.id || !player.name) {
      return res.status(400).json({ error: 'Invalid player data' });
    }
    // Middleware

app.post('/api/games/join', async (req: express.Request<{}, {}, PlayerJoinRequest>, res) => {
  console.log('Join request received:', req.body);
  const { player } = req.body;

  if (!player || !player.id || !player.name) {
    return res.status(400).json({ error: 'Invalid player data' });
  }

  try {
    // Generate a new game ID or use one from the request
    const gameId = req.body.gameId || Math.random().toString(36).substring(7);
    
    await pusher.trigger(`game-${gameId}`, 'player-joined', {
      player,
      gameId
    });
    
    res.json({ 
      success: true,
      gameId 
    });
  } catch (error) {
    console.error('Error joining game:', error);
    res.status(500).json({ error: 'Failed to join game' });
  }
});

app.get('/api/games/:gameId', (req, res) => {
    const { gameId } = req.params;
    if (!gameId) {
      return res.status(400).json({ error: 'Game ID is required' });
    }
   

  app.get('/api/validate-word/:word', (req, res) => {
    const { word } = req.params;
    if (!word || word.length === 0) {
      return res.status(400).json({ error: 'Word is required' });
    }
    const isValid = dictionary.has(word.toUpperCase());
    res.json({ isValid });
  });

  app.post('/api/game/:gameId/move', async (req: express.Request<{gameId: string}, {}, MoveRequest>, res) => {
    const { gameId } = req.params;
    const { gameState, moveDetails } = req.body;
    if (!gameState || !moveDetails) {
      return res.status(400).json({ error: 'Invalid move data' });
    }
    try {
      await pusher.trigger(`game-${gameId}`, 'move-made', {
        gameState,
        moveDetails
      });
      res.json({ success: true });
    } catch (error) {
      console.error('Error broadcasting move:', error);
      res.status(500).json({ error: 'Failed to broadcast move' });
    }
  });
  
    // Middleware
    // Move routes before other middleware
    app.use(cors({
      origin: 'https://scrabble-game-pi.vercel.app/', // Your Next.js client URL
      methods: ['GET', 'POST'],
      credentials: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Add logging middleware to debug requests
    app.use((req, res, next) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
      console.log('Headers:', req.headers);
      console.log('Body:', req.body);
      next();
    });
};
