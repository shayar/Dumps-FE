import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useForm, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Select } from '../Select';

interface TestFormValues {
  paymentGateway: string;
}

const options = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
];

const schema = yup.object().shape({
  paymentGateway: yup.string().required('Payment gateway is required'),
});

function TestForm() {
  const methods = useForm<TestFormValues>({
    defaultValues: { paymentGateway: '' },
    resolver: yupResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form>
        <Select
          name="paymentGateway"
          label="Payment Gateway"
          control={methods.control}
          options={options}
          placeholder="Select payment gateway"
        />
      </form>
    </FormProvider>
  );
}

describe('Select Component', () => {
  test('renders without crashing', () => {
    const { getByLabelText } = render(<TestForm />);
    const selectElement = getByLabelText('Payment Gateway');
    expect(selectElement).toBeInTheDocument();
  });

  //   test('displays placeholder correctly', () => {
  //     render(<TestForm />);
  //     expect(screen.getByText(/select payment gateway/i)).toBeInTheDocument();
  //   });

  //   test('shows error message when required field is not filled', async () => {
  //     render(<TestForm />);
  //     const select = screen.getByLabelText(/payment gateway/i);

  //     // Attempt to submit the form without selecting a value
  //     userEvent.tab(); // Trigger validation
  //     userEvent.click(select);
  //     userEvent.tab(); // Move focus away to trigger validation

  //     expect(
  //       await screen.findByText(/payment gateway is required/i),
  //     ).toBeInTheDocument();
  //   });

  //   test('does not show error when valid value is selected', async () => {
  //     render(<TestForm />);
  //     const select = screen.getByLabelText(/payment gateway/i);

  //     userEvent.selectOptions(select, 'option1');
  //     userEvent.tab(); // Trigger validation

  //     expect(
  //       screen.queryByText(/payment gateway is required/i),
  //     ).not.toBeInTheDocument();
  //   });
});
