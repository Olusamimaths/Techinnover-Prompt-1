import { Router } from 'express';
import eventRouter from './event.routes';

const router = Router();

router.use('/', eventRouter);

export default router;
