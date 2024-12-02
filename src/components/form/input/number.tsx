/* eslint-disable import/prefer-default-export */
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Input as ChakraInput,
} from '@chakra-ui/react';
import { FieldValues } from 'react-hook-form';
import { ICustomInput } from './interface';

function Number<T extends FieldValues>({
  leftIcon,
  rightIcon,
  field,
  min = 0,
  max = 1000,
  step = 1,
  ...rest
}: ICustomInput<T>) {
  return (
    <InputGroup>
      {leftIcon && (
        <InputLeftElement>
          <Icon as={leftIcon} />
        </InputLeftElement>
      )}
      <ChakraInput
        onKeyDown={(evt) => ['e', 'E', '+', '-'].includes(evt.key) && evt.preventDefault()}
        type="number"
        {...field}
        {...rest}
        min={min}
        max={max}
        step={step}
        onWheel={(e) => e.currentTarget.blur()} // Prevent scroll on wheel
      />
      {rightIcon && (
        <InputRightElement>
          <Icon as={rightIcon} />
        </InputRightElement>
      )}
    </InputGroup>
  );
}

export { Number };
