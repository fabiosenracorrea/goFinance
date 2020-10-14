import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  auth?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  auth,
}: HeaderProps) => {
  const [currentPage, setCurrentPage] = useState('');

  const { path } = useRouteMatch();

  const { signOut } = useAuth();

  useEffect(() => {
    setCurrentPage(path);
  }, [path]);

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        {!auth && (
          <nav>
            <>
              <div
                className={currentPage === '/dashboard' ? 'current' : undefined}
              >
                <Link to="/dashboard">Listagem</Link>
              </div>

              <div
                className={currentPage === '/create' ? 'current' : undefined}
              >
                <Link to="/create">Criar</Link>
              </div>

              <div
                className={currentPage === '/import' ? 'current' : undefined}
              >
                <Link to="/import">Importar</Link>
              </div>

              <button type="button" onClick={signOut}>
                <FiLogOut size={22} />
              </button>
            </>
          </nav>
        )}
      </header>
    </Container>
  );
};

export default Header;
