import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  InputHTMLAttributes,
} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container, StyledInput } from './styles';

interface CustomInput extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<CustomInput> = ({ name, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { defaultValue, fieldName, error, registerField } = useField(name);

  const [hasFocus, setHasFocus] = useState(false);
  const [hasText, setHasText] = useState(false);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [registerField, fieldName]);

  const handleFocus = useCallback(() => {
    setHasFocus(true);
  }, []);

  const handleBlur = useCallback(() => {
    setHasFocus(false);

    setHasText(!!inputRef.current?.value);
  }, []);

  return (
    <Container hasFocus={hasFocus} hasText={hasText} hasError={!!error}>
      {Icon && <Icon size={24} />}

      <StyledInput
        ref={inputRef}
        name={name}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </Container>
  );
};

export default Input;
