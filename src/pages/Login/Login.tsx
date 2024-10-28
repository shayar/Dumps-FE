import { LoginIcon } from '@dumps/assets/svgs';
import { Input } from '@dumps/components/form';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastFail, toastSuccess } from '@dumps/service/service-toast';
import { useLogin } from '@dumps/api-hooks/auth/useLogin';

export interface LoginDetails {
  email: string;
  password: string;
}

const defaultValues: LoginDetails = {
  email: '',
  password: '',
};

const schema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

const Login = () => {
  const { control, handleSubmit } = useForm({
    mode: 'onBlur',
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  const { mutateAsync: loginRequest } = useLogin();

  const onSubmitHandler = async (loginDetails: LoginDetails) => {
    try {
      await loginRequest(loginDetails);
      toastSuccess(`Login Successful.`);
    } catch (error: any) {
      console.log(error);
      // TODO: show error after managing error response
      toastFail('Login Failed');
    }
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
        <Flex flex={1} flexDirection={'column'} justifyContent={'center'}>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            fontSize={'xl'}
            fontWeight={'normal'}
          >
            <Text color={'black'}>{'Welcome to'}&nbsp;</Text>
            <Text color={'primary.500'}>dumps boilerplate code</Text>
          </Flex>
          <Text fontSize={'3xl'} fontWeight={'semibold'}>
            {'Login'}
          </Text>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <VStack pt={6} spacing={8}>
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
                {'Login'}
              </Button>
            </VStack>
          </form>
        </Flex>

        <Flex flex={1}>
          <LoginIcon style={{ width: '100%' }} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Login;
