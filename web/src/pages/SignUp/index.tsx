import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock, FiArrowLeft, FiUser } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

import { Background, Container, Content } from './styles';

const SignUp: React.FC = () => {
  const handleLogin = useCallback(e => {
    e.preventDefault();
    console.log('hey!');
  }, []);

  return (
    <>
      <Container>
        <Background />
        <Content>
          <img src={logo} alt="GoFinance Logo" />

          <form onSubmit={handleLogin}>
            <h1>Cadastre-se</h1>
            <Input name="name" icon={FiUser} />
            <Input name="email" icon={FiMail} />
            <Input name="password" icon={FiLock} />
            <Button type="submit">Cadastre</Button>
          </form>

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
