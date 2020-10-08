import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

import { Background, Container, Content } from './styles';

const SignIn: React.FC = () => {
  const handleLogin = useCallback(e => {
    e.preventDefault();
    console.log('hey!');
  }, []);

  return (
    <>
      <Container>
        <Content>
          <img src={logo} alt="GoFinance Logo" />

          <form onSubmit={handleLogin}>
            <h1>Faça seu Login</h1>
            <Input name="email" icon={FiMail} />
            <Input name="password" icon={FiLock} />
            <Button type="submit">Entrar</Button>
          </form>

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
