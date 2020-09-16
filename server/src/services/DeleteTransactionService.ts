import { isUuid } from 'uuidv4';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import TransactionsRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    if (!isUuid(id)) {
      throw new AppError('Invalid transaction id');
    }

    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const transactionInDataBase = await transactionsRepository.findOne(id);

    if (!transactionInDataBase) {
      throw new AppError('Transaction not found');
    }

    await transactionsRepository.remove(transactionInDataBase);
  }
}

export default DeleteTransactionService;
