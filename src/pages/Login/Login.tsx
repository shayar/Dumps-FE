import { LoginIcon } from '@dumps/assets/svgs';
import { Input } from '@dumps/components/form';
import { Box, Button, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@dumps/api-hooks/auth/useLogin';
import { LoginDetails, loginSchema } from '@dumps/api-schemas/auth';
import { useNavigate } from 'react-router-dom';
import { toastSuccess } from '@dumps/service/service-toast';
import { handleApiError } from '@dumps/service/service-utils';

const Login = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginDetails>({
    mode: 'onBlur',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutateAsync: loginRequest } = useLogin();

  const onSubmitHandler = async (loginDetails: LoginDetails) => {
    try {
      const response = await loginRequest(loginDetails);
      if (response.success && response.data) {
        localStorage.setItem('token', response.data.token);
        navigate('/admin');
        toastSuccess(response.message);
      }
    } catch (error: unknown) {
      handleApiError(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent={'center'}
      alignItems="center"
      minHeight={'100vh'}
      background={'white'}
      p={4}
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
            <Text color={'primary.500'}>dumps</Text>
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
              <Text>
                Don&apos;t have an account? &nbsp;
                <Link variant="underline" href="/register" color="#2B67B1">
                  Register here
                </Link>
              </Text>
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
