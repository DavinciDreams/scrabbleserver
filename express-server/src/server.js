import express from 'express';
import Pusher from 'pusher';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true
});

app.post('/api/game/:gameId/join', async (req, res) => {
  const { gameId } = req.params;
  const { player } = req.body;

  try {
    await pusher.trigger(`game-${gameId}`, 'player-joined', player);
    res.json({ success: true });
  } catch (error) {
    console.error('Error joining game:', error);
    res.status(500).json({ error: 'Failed to join game' });
  }
});

app.post('/api/game/:gameId/move', async (req, res) => {
  const { gameId } = req.params;
  const { gameState, moveDetails } = req.body;

  try {
    await pusher.trigger(`game-${gameId}`, 'move-made', {
      gameState,
      moveDetails
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error making move:', error);
    res.status(500).json({ error: 'Failed to make move' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});