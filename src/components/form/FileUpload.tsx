/* eslint-disable import/prefer-default-export */
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
  InputGroup,
} from '@chakra-ui/react';
import { FieldValues, useController } from 'react-hook-form';
import { IInputField } from './input/interface';

function FileUpload<T extends FieldValues>({
  name,
  control,
  label,
  isRequired,
  ...rest
}: IInputField<T>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl isInvalid={!!error} isRequired={isRequired}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        <ChakraInput id={name} type="file" {...rest} {...field} />
      </InputGroup>

      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
}

export { FileUpload };
