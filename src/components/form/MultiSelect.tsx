import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import ReactSelect from 'react-select';
import { FieldValues, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IMultiSelect, IOption } from './input/interface';

const MultiSelect = <T extends FieldValues>({
  control,
  name,
  label,
  options,
  style,
  required,
  placeholder,
}: IMultiSelect<T>) => {
  const { t } = useTranslation();

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel htmlFor={name}>
          {label}
          {required && <span style={{ color: 'red' }}>&nbsp;*</span>}
        </FormLabel>
      )}
      <ReactSelect
        isMulti
        placeholder={placeholder}
        options={options}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            minHeight: '40px',
            // todo: theme does not work here
            borderRadius: '6px',
            borderColor: error ? 'red' : 'gray.600',
            borderWidth: error ? '2px' : '1px',
            ...style,
          }),
        }}
        {...field}
        value={field.value as IOption[]}
      />
      {error && <FormErrorMessage>{t(error.message)}</FormErrorMessage>}
    </FormControl>
  );
};

export default MultiSelect;
