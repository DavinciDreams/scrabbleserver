import express from 'express';
import Pusher from 'pusher';
import cors from 'cors';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { join } from 'path';
import { setRoutes } from './routes/index';
import { errorHandler } from './middleware/index';
import { PlayerJoinRequest, MoveRequest } from './types';

dotenv.config();

// Initialize Pusher
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true
});

// Create dictionary set
const dictionaryPath = join(__dirname, '../data/dictionary.txt');
const dictionary = new Set(
  readFileSync(dictionaryPath, 'utf-8')
    .split('\n')
    .map(word => word.trim().toUpperCase())
);

const app = express();

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

// Routes
app.get('/api/games/join', async (req: express.Request<{}, {}, PlayerJoinRequest>, res) => {
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

// Set up additional routes
setRoutes(app);

// Error handling middleware should be last
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;