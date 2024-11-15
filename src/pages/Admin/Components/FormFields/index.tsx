import { Button, Flex } from '@chakra-ui/react';
import { FileUpload, Input, Select, TextArea } from '@dumps/components/form';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import MultiSelect from '@dumps/components/form/MultiSelect';
import { IOption } from '@dumps/components/form/input/interface';
import { foodOptions, options } from './options';

const defaultValues = {
  userName: '',
  password: '',
  paymentGateway: '',
  fileUpload: '' as never,
  description: '',
  food: [] as IOption[],
};

const schema = yup.object().shape({
  userName: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  paymentGateway: yup.string().required('Payment gateway is required'),
  fileUpload: yup.mixed<FileList>().required('File is required'),
  description: yup.string().required('Description is required'),
  food: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .min(1, 'Food is required')
    .required(),
});

const FormFields = () => {
  const formControl = useForm<LoginDetails>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { control, handleSubmit } = formControl;

  const onSubmitHandler = (data: LoginDetails) => {
    alert(data);
  };
  return (
    <FormProvider {...formControl}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <Flex direction={'column'} gap={3}>
          <Input name={'userName'} label={'Username'} control={control} />
          <Input
            name={'password'}
            label={'Password'}
            type={'password'}
            control={control}
          />
          <Select
            name="paymentGateway"
            label="Payment Gateway"
            control={control}
            options={options}
          />
          <MultiSelect
            name="food"
            label="Food"
            control={control}
            options={foodOptions}
          />
          <FileUpload
            name={'fileUpload'}
            control={control}
            label={'Upload file'}
          />
          <TextArea
            name={'description'}
            label={'Description'}
            control={control}
          />
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </FormProvider>
  );
};
export default FormFields;

export interface LoginDetails {
  userName: string;
  password: string;
  paymentGateway: string;
  fileUpload: FileList;
  description: string;
  food: IOption[];
}
