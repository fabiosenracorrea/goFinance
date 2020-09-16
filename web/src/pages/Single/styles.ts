import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #363f5f;
  text-align: center;
`;

export const SingleTransactionForm = styled.form<FormProps>`
  padding: 10px;
  width: 80%;
  margin: 40px auto 0;

  @media (max-width: 500px) {
    margin-top: 20px;
  }

  div {
    width: 100%;
    display: flex;

    @media (max-width: 500px) {
      flex-direction: column;
    }

    &.input-group + .input-group {
      margin-top: 16px;

      @media (max-width: 500px) {
        margin-top: 0;
      }
    }

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;

      @media (max-width: 500px) {
        margin-top: 16px;
      }

      & + div {
        margin-left: 8px;

        @media (max-width: 500px) {
          margin-left: 0;
        }
      }

      label {
        display: block;
      }

      input {
        width: 100%;
        border-radius: 5px;
        border: 1.5px solid white;
        margin-top: 4px;
        padding: 8px;

        &#value {
          ${({ hasError }) =>
            hasError &&
            css`
              border-color: red;
            `}
        }
      }

      select {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        background-color: white;
        margin-top: 4px;
        border: none;
        padding: 8px;
      }
    }
  }

  div.button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;

    button {
      width: 108px;
      height: 36px;
      border: none;
      background-color: #ff872c;
      color: white;
      border-radius: 5px;
      margin-right: 16px;

      &:hover {
        background-color: ${shade(0.2, '#ff872c')};
      }
    }
  }

  p {
    color: red;
    margin-top: 8px;
    width: 100%;
    text-align: center;
  }
`;

export const Loading = styled.div`
  &.loader {
    border: 5px solid #ff872c; /* orange */
    border-top: 5px solid #5636d3; /* purple */
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;
