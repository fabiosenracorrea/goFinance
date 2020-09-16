import fs from 'fs';
import csvtojson from 'csvtojson';
import path from 'path';

import uploadConfig from '../config/upload';

import CreateTransactionService from './CreateTransactionService';

import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';

class ImportTransactionsService {
  async execute(filename: string, type: string): Promise<Transaction[]> {
    const fileUploaded = path.join(uploadConfig.directory, filename);

    if (type !== 'text/csv') {
      await fs.promises.unlink(fileUploaded);
      throw new AppError('Incorrect file type.');
    }

    // solution found on https://stackoverflow.com/a/52199182/14115629
    const transactions = await csvtojson({
      trim: true,
    }).fromFile(fileUploaded);

    // all income transactions first!
    transactions.sort((a, b) => a.type.localeCompare(b.type));

    const createTransactionService = new CreateTransactionService();

    const savedTransactions = [];

    for await (const transaction of transactions) {
      const savedTransaction = await createTransactionService.execute(
        transaction,
      );

      savedTransactions.push(savedTransaction);
    }

    await fs.promises.unlink(fileUploaded);

    return savedTransactions;
  }
}

export default ImportTransactionsService;
