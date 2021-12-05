import { Router } from 'express';
import * as recommendationController from './controllers/recommendationController.js';

const routes = Router();

routes.get('/health', (req, res) => res.send('Tudo massa meu rei').status(200));

routes.post('/recommendations', recommendationController.postRecommendation);

export default routes;
