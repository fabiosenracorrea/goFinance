import styled from 'styled-components';
import { shade } from 'polished';

export const StyledButton = styled.button`
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
`;
