import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { LoginIcon } from '@dumps/assets/svgs';
import { Input } from '@dumps/components/form';
import { toastSuccess } from '@dumps/service/service-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export interface RegisterDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const defaultValues: RegisterDetails = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export default function Register() {
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (registerDetails: RegisterDetails) => {
    toastSuccess(
      `email :${registerDetails.email} and password: ${registerDetails.password}`,
    );
  };

  return (
    <Box
      display="flex"
      justifyContent={'center'}
      alignItems="center"
      height={{ base: 'auto', md: '100vh' }}
      m={4}
    >
      <Flex
        flexDirection={{ base: 'column-reverse', md: 'row' }}
        justifyContent={'space-between'}
      >
        <Flex flex={1} mr={{ base: '0', md:'8'}} mt={{ base: '8', md:'0'}}>
          <LoginIcon style={{ width: '100%' }} />
        </Flex>
        <Flex flex={1} flexDirection={'column'} justifyContent={'center'}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            fontSize={'xl'}
            fontWeight={'normal'}
          >
            <Text color={'black'}>{'Welcome to'}&nbsp;</Text>
            <Text color={'primary.500'}>dumps</Text>
          </Flex>
          <Text fontSize={'3xl'} fontWeight={'semibold'}>
            {'Register'}
          </Text>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <VStack pt={6} spacing={8}>
              <Input name={'firstName'} label={'Fist Name'} control={control} />
              <Input name={'lastName'} label={'Last Name'} control={control} />
              <Input name={'email'} label={'Email'} control={control} />
              <Input
                name={'password'}
                label={'Password'}
                type={'password'}
                control={control}
              />
              <Button
                type="submit"
                width="full"
                // isLoading={isLoading}
              >
                {'Register'}
              </Button>
            </VStack>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
}
