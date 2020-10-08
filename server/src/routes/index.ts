import { Router } from 'express';

import transactionsRouter from './transactions.routes';
import userRoutes from './users.routes';
import sessionsRoutes from './sessions.routes';

const routes = Router();

routes.use('/transactions', transactionsRouter);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);

export default routes;
