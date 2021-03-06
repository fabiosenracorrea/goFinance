import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiArrowLeft, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import { Background, Container, Content } from './styles';

interface FormData {
  email: string;
  name: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const history = useHistory();

  const handleRegister = useCallback(
    async (data: FormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Digite o seu nome'),
          email: Yup.string()
            .required('Digite seu e-mail')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .required()
            .min(8, 'Senha de 8 ou mais dígitos'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', data);

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [signIn, history],
  );

  return (
    <>
      <Container>
        <Background />
        <Content>
          <img src={logo} alt="GoFinance Logo" />

          <Form onSubmit={handleRegister} ref={formRef}>
            <h1>Cadastre-se</h1>
            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              placeholder="Senha"
              type="password"
            />
            <Button type="submit">Cadastre</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft size={20} />
            Fazer Login
          </Link>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
