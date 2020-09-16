import React, { useState, useEffect } from 'react';

import { Link, useRouteMatch } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const [currentPage, setCurrentPage] = useState('');

  const { path } = useRouteMatch();

  useEffect(() => {
    setCurrentPage(path);
  }, [path]);

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <>
            <div className={currentPage === '/' ? 'current' : undefined}>
              <Link to="/">Listagem</Link>
            </div>

            <div className={currentPage === '/create' ? 'current' : undefined}>
              <Link to="/create">Criar</Link>
            </div>

            <div className={currentPage === '/import' ? 'current' : undefined}>
              <Link to="/import">Importar</Link>
            </div>
          </>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
