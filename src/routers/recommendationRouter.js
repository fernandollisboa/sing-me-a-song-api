import { Router } from 'express';
import * as recommendationController from '../controllers/recommendationController.js';

const router = Router();

router.post('/recommendations', recommendationController.postRecommendation);
router.post('/recommendations/:id/upvote', recommendationController.upvote);
router.post('/recommendations/:id/downvote', recommendationController.downvote);

export default router;
