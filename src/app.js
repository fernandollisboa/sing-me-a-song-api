import express from 'express';
import cors from 'cors';
import recommendationRouter from './routers/recommendationRouter.js';
import genreRouter from './routers/genreRouter.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/health', async (req, res) => res.sendStatus(200));
app.use(recommendationRouter);
app.use(genreRouter);
app.use(errorMiddleware);

export default app;
