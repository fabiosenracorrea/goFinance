import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authUserService = new AuthUserService();

  const { user, token } = await authUserService.execute({ email, password });

  return response.status(200).json({ user, token });
});

export default sessionsRoutes;
