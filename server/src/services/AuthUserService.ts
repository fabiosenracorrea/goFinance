import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';

interface RequestTDO {
  email: string;
  password: string;
}

interface ReturnTDO {
  user: User;
  token: string;
}

class AuthUserService {
  public async execute({ email, password }: RequestTDO): Promise<ReturnTDO> {
    if (!email || !password) {
      throw new AppError('Missing Credentials', 401);
    }

    const usersRepositoy = getRepository(User);

    const user = await usersRepositoy.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid E-mail/password combination', 403);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Invalid E-mail/password combination', 403);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthUserService;
