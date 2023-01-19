import {loadStripe} from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  // If collecting shipping 
  AddressElement,
} from "@stripe/react-stripe-js";

const stripe = loadStripe('pk_test_51JO2tsHQlT2vrwxYyDiH0OEP9wQjTNX8JubzCbxxg6lo8n7f0rNk1yElVTiIpCgw3obGOynwvJRQSwdHN2DQZJQA00ygvOgkGD', {
  // If collect shipping
  betas: ['address_element_beta_1'],
});

const appearance = {/* ... */};

// Enable the skeleton loader UI for the optimal loading experience.
const loader = 'auto';

export const CheckoutPage =({clientSecret}) => (
  <Elements stripe={stripe} options={{clientSecret, appearance, loader}}>
    <CheckoutForm />
  </Elements>
);

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
    });

    if (error) {
      // handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Contact info</h3>
      <LinkAuthenticationElement />
      {/* If collecting shipping */}
      <h3>Shipping</h3>
      <AddressElement options={{mode: 'shipping', allowedCountries: ['US']}} />
      <h3>Payment</h3>
      <PaymentElement />

      <button type="submit">Submit</button>
    </form>
  );
}