import {
  Button,
  HStack,
  VStack,
  Card,
  Input as ChakraInput,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useAddProduct } from '@dumps/api-hooks/product/useAddProduct';
import { DumpDetails, dumpSchema } from '@dumps/api-schemas/dump';
import { Input } from '@dumps/components/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

const ManageDump = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitted },
  } = useForm<DumpDetails>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      price: '',
      discount: '',
    },
    resolver: zodResolver(dumpSchema),
  });

  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { mutateAsync: addProductRequest } = useAddProduct();

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setFileError(false);
    } else {
      setFile(null);
      setFileError(true);
      if (fileInputRef.current) {
        // Reset the file input field
        fileInputRef.current.value = '';
      }
    }
  };

  const onSubmitHandler = async ({ ...dumpDetails }: DumpDetails) => {
    if (!file) {
      setFileError(true);
      return;
    }
    const formData = new FormData();
    Object.entries(dumpDetails).forEach(([key, value]) => {
      if (value != null) {
        if (key === 'price' || key === 'discount') {
          value = Number(value);
        }
        formData.append(key, value);
      }
    });

    formData.append('pdfFile', file);

    formData.forEach((value, key) => {
      console.log(key, value);
    });
    await addProductRequest(formData);
  };

  useEffect(() => {
    if (!file && isSubmitted) {
      setFileError(true);
    }
  }, [isSubmitted]);

  return (
    <>
      {/* <BreadCrumb items={[]} title={{ name: 'Dump', route: '/' }} /> */}

      <Card className="base-card">
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <VStack>
            <Input name={'title'} label={'Title'} control={control} />
            <Input
              name={'description'}
              label={'Description'}
              control={control}
            />
            <HStack width={'100%'} spacing={10}>
              <Input
                name={'price'}
                type="number"
                label={'Price'}
                control={control}
              />
              <Input
                name={'discount'}
                type="number"
                label={'Discount'}
                control={control}
              />
            </HStack>
            <FormControl isInvalid={fileError}>
              <FormLabel>Pdf File</FormLabel>
              <ChakraInput
                ref={fileInputRef}
                type={'file'}
                onChange={handleFileChange}
              />
              {fileError && (
                <FormErrorMessage>
                  File should be in pdf format.
                </FormErrorMessage>
              )}
            </FormControl>
            <Button
              marginTop={10}
              type="submit"
              width="full"
              // isLoading={isLoading}
            >
              {'Save'}
            </Button>
          </VStack>
        </form>
      </Card>
    </>
  );
};

export default ManageDump;
