import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const userRoutes = Router();

userRoutes.post('/', async (request, response) => {
  const { name, password, email } = request.body;

  const createUserService = new CreateUserService();

  const user = await createUserService.execute({
    name,
    password,
    email,
  });

  delete user.password;

  return response.status(201).json(user);
});

export default userRoutes;
