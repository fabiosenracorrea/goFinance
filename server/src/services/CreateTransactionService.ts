import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

import Category from '../models/Category';

interface RequestTDO {
  title: string;
  value: number;
  category: string;
  type: 'outcome' | 'income';
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    category,
    type,
  }: RequestTDO): Promise<Transaction> {
    if (!title || !value || !category || !type) {
      throw new AppError('Invalid transaction options');
    }

    if (!['outcome', 'income'].includes(type)) {
      throw new AppError('Invalid transaction type');
    }

    const categoryRepository = getRepository(Category);
    const transactionRepository = getCustomRepository(TransactionRepository);

    if (type === 'outcome') {
      const { total } = await transactionRepository.getBalance();

      if (total < value) {
        throw new AppError('Unsufficient account balance');
      }
    }

    const categoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    let category_id = categoryExists?.id;

    if (!categoryExists) {
      const categoryCreated = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(categoryCreated);

      category_id = categoryCreated.id;
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category_id,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
