import { Router } from 'express';
import { exampleController } from '../controllers/index';

const router = Router();

export const setRoutes = () => {
  router.get('/example', exampleController);

  // Add more routes here as needed

  return router;
};