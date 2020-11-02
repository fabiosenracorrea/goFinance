import styled, { keyframes } from 'styled-components';

import backgroundImg from '../../assets/app-background.jpg';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;

  background: #5636d3;
  overflow: hidden;

  display: flex;
  align-items: stretch;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: 700px;

  color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: ${appearFromRight} 1s;

  form {
    max-width: 340px;
    margin: 80px 0;
    text-align: center;

    h1 {
      margin: 16px 0;
    }

    button {
      width: 100%;
      margin-top: 20px;
      height: 48px;
    }
  }

  > a {
    margin-top: 24px;
    color: white;
    display: flex;
    align-items: center;

    &:hover {
      opacity: 0.7;
    }

    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  background: url(${backgroundImg}) no-repeat;
  background-size: cover;
  flex: 1;
`;
