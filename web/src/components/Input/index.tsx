import React, { useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';

import { Container, StyledInput } from './styles';

interface CustomInput {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<CustomInput> = ({ name, icon: Icon, ...rest }) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [hasText, setHasText] = useState(false);

  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setHasFocus(false);
  }, []);

  return (
    <Container hasFocus={hasFocus} hasText={hasText}>
      {Icon && <Icon size={24} />}

      <StyledInput
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </Container>
  );
};

export default Input;
