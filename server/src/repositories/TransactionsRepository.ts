import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(user_id: string): Promise<Balance> {
    const allTransactions = await this.find({
      where: { user_id },
    });

    const balanceStart = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const balance = allTransactions.reduce((start, transaction) => {
      const updatedBalance = { ...start };

      if (transaction.type === 'income') {
        updatedBalance.income += transaction.value;
        updatedBalance.total += transaction.value;
        return updatedBalance;
      }

      updatedBalance.outcome += transaction.value;
      updatedBalance.total -= transaction.value;
      return updatedBalance;
    }, balanceStart);

    return balance;
  }
}

export default TransactionsRepository;
