import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

import User from '../models/User';

interface RequestTDO {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: RequestTDO): Promise<User> {
    if (!name || !email || !password) {
      throw new AppError('Invalid Creation Information Sent', 401);
    }

    const usersRepositoy = getRepository(User);

    const userAlreadyExists = await usersRepositoy.findOne({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AppError('E-mail already in use');
    }

    const hashedPassword = await hash(password, 12);

    const createdUser = usersRepositoy.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepositoy.save(createdUser);

    return createdUser;
  }
}

export default CreateUserService;
