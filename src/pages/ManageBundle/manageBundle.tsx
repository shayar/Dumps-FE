import {
  Button,
  HStack,
  VStack,
  Card,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useGetBundleById } from '@dumps/api-hooks/bundles/useGetBundleById';
import { useGetAllProducts } from '@dumps/api-hooks/product/useGetAllProducts';
import { useAddBundle } from '@dumps/api-hooks/bundles/useAddBundle';
import { useUpdateBundle } from '@dumps/api-hooks/bundles/useUpdateBundle';
import { BundleDetails, bundleSchema } from '@dumps/api-schemas/bundle';
import { BreadCrumb } from '@dumps/components/breadCrumb';
import { Input } from '@dumps/components/form';
import LoadingSpinner from '@dumps/components/loadingSpinner';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

interface ProductOption {
  value: string;
  label: string;
}

const ManageBundle = () => {
  const { id: bundleId } = useParams();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [selectedOptions, setSelectedOptions] = useState<ProductOption[]>([]);
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BundleDetails>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      discountedPrice: '',
      productIds: [],
    },
    resolver: zodResolver(bundleSchema),
  });

  const { data, isLoading } = useGetBundleById(bundleId!);
  const bundle: BundleDetails = data?.data;

  const { data: productsData, refetch: refetchProducts } = useGetAllProducts(
    page,
    searchQuery,
  );
  const { mutateAsync: addBundleRequest } = useAddBundle();
  const { mutateAsync: updateBundleRequest } = useUpdateBundle();

  useEffect(() => {
    if (productsData?.data) {
      // TODO: added just for search functionality, remove after search api is called
      const products = productsData.data.filter((i: any) => {
        return searchQuery
          ? i.title.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
      });
      const options: ProductOption[] = products.map((product: any) => ({
        value: product.id,
        label: product.title,
      }));
      setProductOptions(options);
    }
  }, [productsData]);

  useEffect(() => {
    if (bundle) {
      console.log(bundle);
      reset({
        id: bundle.id,
        title: bundle.title,
        description: bundle.description,
        discountedPrice: bundle.discountedPrice.toString(),
        productIds: bundle.productIds || [],
      });
      // TODO: get products if not in the initial api call
      // should get products from api and build selected list
      if (bundle.productIds) {
        const selectedProducts = productOptions.filter((option) =>
          bundle.productIds.includes(option.value),
        );
        setSelectedOptions(selectedProducts);
      }
    }
  }, [bundle, productOptions, reset]);

  const onSubmitHandler = async ({ ...bundleDetails }: BundleDetails) => {
    const formData = new FormData();
    Object.entries(bundleDetails).forEach(([key, value]) => {
      if (value != null) {
        formData.append(key, value as string);
      }
    });

    // TODO: add product ids

    if (bundleId) {
      await updateBundleRequest({ data: formData, id: bundleId! });
    } else {
      await addBundleRequest(formData);
    }
  };

  const scrollToBottom = () => {
    setPage((prev) => prev + 1);
    refetchProducts();
  };

  const setSearchTerm = (input: string, action: string) => {
    // setInputValue(input);
    if (action === 'input-change') {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      const timeout = setTimeout(() => {
        setPage(0);
        setSearchQuery(input);
        refetchProducts();
      }, 700);
      setSearchTimeout(timeout);
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  return (
    <>
      <BreadCrumb
        items={[
          { name: 'Bundle', route: '/bundles' },
          {
            name: bundleId ? 'Edit Bundle' : 'Add Bundle',
            route: '',
            isCurrentPage: true,
          },
        ]}
      />

      {bundleId && isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <Card className="base-card">
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <VStack>
              <HStack width={'100%'} spacing={10}>
                <Input name={'title'} label={'Title'} control={control} />
                <Input
                  name={'discountedPrice'}
                  type="number"
                  label={'Discounted Price'}
                  control={control}
                />
              </HStack>
              <Input
                name={'description'}
                label={'Description'}
                control={control}
              />
              <FormControl isInvalid={!!errors.productIds}>
                <FormLabel>Products</FormLabel>
                <Controller
                  name="productIds"
                  control={control}
                  defaultValue={[]}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Select
                        isMulti
                        closeMenuOnSelect={false}
                        options={productOptions}
                        filterOption={null}
                        onMenuScrollToBottom={scrollToBottom}
                        onMenuClose={() => {
                          setSearchQuery('');
                        }}
                        onInputChange={(newValue, { action }) =>
                          setSearchTerm(newValue, action)
                        }
                        value={selectedOptions.filter((option) =>
                          Array.isArray(value)
                            ? value.includes(option.value)
                            : false,
                        )}
                        onChange={(selectedOptions) => {
                          const values = selectedOptions
                            ? selectedOptions.map((option) => option.value)
                            : [];
                          setSelectedOptions([...selectedOptions]);
                          onChange(values);
                        }}
                      />
                      {error && (
                        <FormErrorMessage>{error.message}</FormErrorMessage>
                      )}
                    </>
                  )}
                />
              </FormControl>
              {/* <FormControl isInvalid={fileError}>
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
              </FormControl> */}
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
      )}
    </>
  );
};

export default ManageBundle;
