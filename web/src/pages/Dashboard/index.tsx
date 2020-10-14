import React, { useState, useEffect } from 'react';
import { FiStopCircle } from 'react-icons/fi';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

import { Container, CardContainer, Card, TableContainer } from './styles';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

interface ApiResponse {
  transactions: Transaction[];
  balance: Balance;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  const { token } = useAuth();

  useEffect(() => {
    async function loadTransactions(): Promise<void> {
      try {
        const response = await api.get<ApiResponse>('/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data.transactions);
        setBalance(response.data.balance);
      } catch (err) {
        setTransactions([]);
        setBalance({
          income: '0',
          outcome: '0',
          total: '0',
        });
      }
    }

    loadTransactions();
  }, [token]);

  async function handleTrDeletion(element: HTMLButtonElement): Promise<void> {
    const transactionId = element.id;
    try {
      await api.delete(`/transactions/${transactionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const deletedIndex = transactions.findIndex(
        transaction => transaction.id === transactionId,
      );

      const { type, value } = transactions[deletedIndex];

      const updatedTransactions = [...transactions];

      updatedTransactions.splice(deletedIndex, 1);

      setTransactions(updatedTransactions);

      const updatedBalance = { ...balance };

      updatedBalance[type] = `${Number(updatedBalance[type]) - Number(value)}`;

      updatedBalance.total =
        type === 'income'
          ? `${Number(updatedBalance.total) - Number(value)}`
          : `${Number(updatedBalance.total) + Number(value)}`;

      setBalance(updatedBalance);
    } catch (err) {}
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {`${formatValue(Number(balance.income))}`}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {`${formatValue(Number(balance.outcome))}`}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {`${formatValue(Number(balance.total))}`}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {` ${
                      transaction.type === 'outcome' ? '-' : ''
                    } ${formatValue(Number(transaction.value))}`}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>
                    {formatDate(String(transaction.created_at))}
                    <button
                      type="button"
                      id={transaction.id}
                      onClick={e =>
                        handleTrDeletion(e.target as HTMLButtonElement)}
                    >
                      <FiStopCircle />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
