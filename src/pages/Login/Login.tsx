import { LoginIcon } from '@dumps/assets/svgs';
import { Input } from '@dumps/components/form';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
// TODO: finalize zod or yup
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastSuccess } from '@dumps/service/service-toast';
import { useLoginMutation } from '@dumps/service/service-auth';

export interface LoginDetails {
  email: string;
  password: string;
}

const defaultValues: LoginDetails = {
  email: '',
  password: '',
};

/** YUP schema */
// const schema = yup.object().shape({
//   email: yup.string().required('Email is required'),
//   password: yup.string().required('Password is required'),
// });

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

  const {
    mutateAsync:initLogin,isLoading
  } = useLoginMutation()

  const onSubmitHandler = async (loginDetails: LoginDetails) => {
    toastSuccess(
      `email :${loginDetails.email} and password: ${loginDetails.password}`,
    );

    await initLogin(loginDetails)
    // alert(loginDetails);
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
