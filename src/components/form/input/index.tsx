/* eslint-disable import/prefer-default-export */
import { FormControl, FormLabel, Box, Flex, FormErrorMessage } from '@chakra-ui/react';
import { FieldValues, useController } from 'react-hook-form';
import { IInputField } from './interface';
import Text from './text';
import Type from './constants';
import { Password } from './password';
import { Number } from './number';

function Input<T extends FieldValues>(props: IInputField<T>) {
  const {
    name,
    control,
    label,
    type,
    formControlProps,
    orientation = 'vertical',
    /** ON using input isRequired, the schema error does not get trigger */
    /** In such scenario this required can be used */
    required,
    ...rest
  } = props;

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  let FieldComponent;
  if (type === Type.PASSWORD) {
    FieldComponent = Password;
  } else if (type === 'number') {
    FieldComponent = Number;
  } else {
    FieldComponent = Text;
  }

  return (
    <FormControl isInvalid={!!error} {...formControlProps}>
      <Box display={orientation === 'horizontal' ? 'flex' : 'block'}>
        {label && formControlProps?.variant !== 'floating' && (
          <FormLabel>
            {label} {required && <span style={{ color: 'red' }}>&nbsp;*</span>}
          </FormLabel>
        )}
        <FieldComponent field={field} {...rest} />
      </Box>
      {error && (
        <Flex justifyContent="space-between">
          <FormErrorMessage>{error.message}</FormErrorMessage>
        </Flex>
      )}
    </FormControl>
  );
}

export { Input };
