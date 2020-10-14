import React, { ButtonHTMLAttributes } from 'react';

import { StyledButton } from './styles';

type CustomButtom = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<CustomButtom> = ({ children, ...rest }) => {
  return (
    <StyledButton type="button" {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
