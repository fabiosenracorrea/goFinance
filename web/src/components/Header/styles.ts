import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    max-width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 500px) {
      flex-wrap: wrap;

      nav {
        margin-top: 20px;
      }
    }

    nav {
      display: flex;

      div {
        padding: 0 0 10px;
        transition: border-bottom 0.2s;
        position: relative;
        overflow: hidden;

        & + div {
          margin-left: 32px;
        }

        &.current:before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-bottom: 2px solid #ff872c;
          animation: slide-in 0.3s;

          @keyframes slide-in {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(0);
            }
          }
        }

        a {
          color: #fff;
          text-decoration: none;
          font-size: 16px;
          transition: opacity 0.2s;

          & + a {
            margin-left: 32px;
          }

          &:hover {
            opacity: 0.6;
          }
        }
      }
    }
  }
`;
