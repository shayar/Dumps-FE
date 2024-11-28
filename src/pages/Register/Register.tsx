import { Box, Button, Flex, HStack, Link, Text, VStack } from '@chakra-ui/react';
import useRegister from '@dumps/api-hooks/auth/useRegister';
import { RegisterDetails, registerSchema } from '@dumps/api-schemas/auth';
import { LoginIcon } from '@dumps/assets/svgs';
import { Input } from '@dumps/components/form';
import { toastSuccess } from '@dumps/service/service-toast';
import handleApiError from '@dumps/service/service-utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<RegisterDetails>({
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registerSchema),
  });

  const { mutateAsync: registerRequest } = useRegister();

  const onSubmitHandler = async ({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    confirmPassword,
    ...registerDetails
  }: RegisterDetails) => {
    try {
      const res = await registerRequest(registerDetails);
      if (res) {
        toastSuccess(res.message);
      }
      navigate('/login');
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      background="white"
      p={4}
    >
      <Flex flexDirection={{ base: 'column-reverse', md: 'row' }} justifyContent="space-between">
        <Flex flex={1} mr={{ base: '0', md: '8' }} mt={{ base: '8', md: '0' }}>
          <LoginIcon style={{ width: '100%' }} />
        </Flex>
        <Flex flex={1} flexDirection="column" justifyContent="center">
          <Flex direction={{ base: 'column', md: 'row' }} fontSize="xl" fontWeight="normal">
            <Text color="black">Welcome to&nbsp;</Text>
            <Text color="primary.500">dumps</Text>
          </Flex>
          <Text fontSize="3xl" fontWeight="semibold">
            Register
          </Text>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <VStack pt={6} spacing={8}>
              <HStack w="100%" spacing={8}>
                <Input name="firstName" label="Fist Name" control={control} />
                <Input name="lastName" label="Last Name" control={control} />
              </HStack>
              <Input name="email" label="Email" control={control} />
              <Input name="password" label="Password" type="password" control={control} />
              <Input
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                control={control}
              />
              <Text>
                Already have an account? &nbsp;
                <Link variant="underline" href="/login" color="#2B67B1">
                  Login here
                </Link>
              </Text>
              <Button
                type="submit"
                width="full"
                // isLoading={isLoading}
              >
                Register
              </Button>
            </VStack>
          </form>
        </Flex>
      </Flex>
    </Box>
  );
}
