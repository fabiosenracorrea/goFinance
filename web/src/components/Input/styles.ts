import styled, { css } from 'styled-components';

interface ContainerProps {
  hasFocus: boolean;
  hasText: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 0 16px;
  background-color: white;
  border: 2px solid white;

  & + div {
    margin-top: 12px;
  }

  svg {
    color: #232129;
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: #c53030;
    `}

  ${({ hasFocus }) =>
    hasFocus &&
    css`
      border-color: #ff872c;

      svg {
        color: #ff872c;
      }
    `}

  ${({ hasText }) =>
    hasText &&
    css`
      svg {
        color: #ff872c;
      }
    `}
`;

export const StyledInput = styled.input`
  width: 100%;
  border-radius: 5px;
  padding: 12px;
  border: none;
`;
