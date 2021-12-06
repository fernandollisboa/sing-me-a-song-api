import { Router } from 'express';
import * as genreController from '../controllers/genreController.js';

const router = Router();

router.post('/genres', genreController.postGenre);
// router.get('/genres', genreController.getGenre);
export default router;
