import React, { useCallback, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErrors';

import logo from '../../assets/logo.svg';

import { Background, Container, Content } from './styles';

interface FormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { push } = useHistory();

  const handleLogin = useCallback(
    async (loginData: FormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Digite seu e-mail')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Digite sua senha'),
        });

        await schema.validate(loginData, {
          abortEarly: false,
        });

        await signIn(loginData);

        push('/dashboad');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }

        alert('Não foi possível fazer login na aplicação.');
      }
    },
    [signIn, push],
  );

  return (
    <>
      <Container>
        <Content>
          <img src={logo} alt="GoFinance Logo" />

          <Form onSubmit={handleLogin} ref={formRef}>
            <h1>Faça seu Login</h1>
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />
            <Button type="submit">Entrar</Button>
          </Form>

          <Link to="signup">
            <FiAlertCircle size={20} />
            Cadastre-se
          </Link>
        </Content>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
