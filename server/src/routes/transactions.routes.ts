import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

// handle csv
import uploadConfig from '../config/upload';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

const transactionsRouter = Router();

const upload = multer(uploadConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionRepository.find();
  const balance = await transactionRepository.getBalance();

  const transactionOverview = {
    transactions,
    balance,
  };

  return response.status(200).json(transactionOverview);
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTransacitionService = new CreateTransactionService();

  const transaction = await createTransacitionService.execute({
    title,
    value,
    type,
    category,
  });

  // if we get here, the data received is ok to send back as requested
  const transactionCreated = {
    id: transaction.id,
    title,
    value,
    type,
    category,
  };

  return response.status(201).json(transactionCreated);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransactionService = new DeleteTransactionService();

  await deleteTransactionService.execute(id);

  return response.status(204).send();
});

transactionsRouter.post(
  '/import',
  upload.single('file'),
  async (request, response) => {
    const importTransactionsService = new ImportTransactionsService();

    const transactions = await importTransactionsService.execute(
      request.file.filename,
      request.file.mimetype,
    );

    return response.status(201).json(transactions);
  },
);

export default transactionsRouter;
