import express from 'express';
import { setRoutes } from './routes/index';
import { errorHandler } from './middleware/index';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up routes
setRoutes(app);

// Error handling middleware should be last
app.use(errorHandler);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; // Export app for testing