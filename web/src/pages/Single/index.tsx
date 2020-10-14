import React, { useState, FormEvent } from 'react';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import { Container, Title, SingleTransactionForm, Loading } from './styles';

import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
  uploaded?: boolean;
}

const Single: React.FC = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState(0);
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();

  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!value) return;

    try {
      setLoading(true);

      await api.post(
        '/transactions',
        {
          title,
          value,
          type,
          category,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setLoading(false);
      setErrorMsg('');
      setTitle('');
      setValue(0);
      setCategory('');
      setType('');
    } catch (err) {
      setLoading(false);
      if (err.message.match(/^Request/)) {
        setErrorMsg('Erro. Verifique saldo disponível para saídas.');
        return;
      }
      setErrorMsg('Erro ao salvar transação. Tente novamente.');
    }
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Criar uma transação</Title>
        <SingleTransactionForm
          hasError={!!errorMsg}
          onSubmit={e => handleFormSubmit(e)}
        >
          <div className="input-group">
            <div className="inputGroup">
              <label htmlFor="title">Título</label>
              <input
                required
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="inputGroup">
              <label htmlFor="value">Valor</label>
              <input
                required
                type="text"
                id="value"
                name="value"
                value={value}
                onChange={e => {
                  const currentValue = Number(e.target.value);

                  if (currentValue && currentValue > 0) {
                    setValue(currentValue);
                    setErrorMsg('');
                    return;
                  }

                  setErrorMsg('Especifique o valor corretamente');
                  setValue(0);
                }}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="inputGroup">
              <label htmlFor="type">Tipo</label>
              <select
                name="type"
                id="type"
                value={type}
                required
                onChange={e => setType(e.target.value)}
              >
                <option value="" disabled selected>
                  Selecione o tipo
                </option>
                <option value="income">Entrada</option>
                <option value="outcome">Saída</option>
              </select>
            </div>
            <div className="inputGroup">
              <label htmlFor="category">Categoria</label>
              <input
                required
                type="text"
                value={category}
                id="category"
                name="category"
                onChange={e => setCategory(e.target.value)}
              />
            </div>
          </div>

          <div className="button-container">
            <Button type="submit">Salvar</Button>
            {loading && <Loading className="loader" />}
          </div>

          {errorMsg && <p>{errorMsg}</p>}
        </SingleTransactionForm>
      </Container>
    </>
  );
};

export default Single;
