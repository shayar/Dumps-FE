import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@chakra-ui/react';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) return;

    // Step 1: Request a PaymentIntent from the backend
    const response = await fetch('http://localhost:8080/api/Cart/payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    const clientSecretResponse = await response.json();
    const clientSecret = clientSecretResponse.data;

    console.log('payment intent created', clientSecret);

    // Step 2: Confirm Payment with Stripe
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log('Payment Successful:', result.paymentIntent);
      alert('Payment Successful!');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button mt={4} disabled={!stripe || loading} type="submit" width="full">
        {loading ? 'Processing...' : 'Order'}
      </Button>
    </form>
  );
}
