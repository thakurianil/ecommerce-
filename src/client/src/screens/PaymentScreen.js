import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import FormContainer from '../components/FormContainer';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import axios from '../utils/axios';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY || '');

const StripeForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError('');
    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });
    if (stripeError) {
      setError(stripeError.message || 'Payment failed');
    } else {
      onSuccess();
    }
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <Alert variant='danger' className='mt-3'>{error}</Alert>}
      <Button type='submit' variant='primary' className='mt-3' disabled={processing || !stripe}>
        {processing ? 'Processing…' : 'Pay with Stripe'}
      </Button>
    </form>
  );
};

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [paymentMethod, setPaymentMethod] = useState('Stripe');
  const [clientSecret, setClientSecret] = useState('');
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingAddress) navigate('/shipping');
  }, [shippingAddress, navigate]);

  const itemsPrice = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.qty * item.price, 0),
    [cartItems]
  );
  const totalPrice = itemsPrice; // adjust if tax/shipping added

  useEffect(() => {
    const createIntent = async () => {
      if (paymentMethod !== 'Stripe' || !totalPrice) return;
      try {
        setLoadingIntent(true);
        setIntentError('');
        const { data } = await axios.post('/payments/create-payment-intent', { totalPrice });
        setClientSecret(data.clientSecret);
      } catch (err) {
        setIntentError(
          err.response?.data?.message || err.message || 'Unable to start payment'
        );
      } finally {
        setLoadingIntent(false);
      }
    };
    createIntent();
  }, [paymentMethod, totalPrice]);

  const handleNonStripeSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  const handleStripeSuccess = () => {
    dispatch(savePaymentMethod('Stripe'));
    navigate('/placeorder');
  };

  const renderStripeForm = () => {
    if (loadingIntent) return <p>Preparing payment…</p>;
    if (intentError) return <Alert variant='danger'>{intentError}</Alert>;
    if (!clientSecret) return null;

    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <StripeForm clientSecret={clientSecret} onSuccess={handleStripeSuccess} />
      </Elements>
    );
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={paymentMethod === 'Stripe' ? undefined : handleNonStripeSubmit}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              checked={paymentMethod === 'Stripe'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked={paymentMethod === 'PayPal'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>

        {paymentMethod === 'Stripe' ? (
          <div className='mt-4'>{renderStripeForm()}</div>
        ) : (
          <Button type='submit' variant='primary' className='mt-3'>
            Continue
          </Button>
        )}
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;