import { LoginButton } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { savePaymentMethod } from 'config/redux/action/cart.action';

import './payment.scss';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/place-order');
    console.log(paymentMethod);
  };

  useEffect(() => {
    if(!shippingAddress.address) {
      navigate('/checkout');
    }
  });

  return (
    <>
      <div className='flex justify-center mt-3'>
        <div className='card'>
          <form onSubmit={submitHandler}>
            <div className='px-2 mb-4'>
              <label className='flex items-center cursor-pointer'>
                <input
                  className='form-radio h-5 w-5 text-indigo-500'
                  type='radio'
                  id='paypal'
                  value='PayPal'
                  name='paymentMethod'
                  required
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <img
                  alt='images'
                  src='https://www.sketchappsources.com/resources/source-image/PayPalCard.png'
                  className='h-8 ml-3'
                />
              </label>
            </div>
            <LoginButton title='Continue' type='submit'></LoginButton>
          </form>
          <br />
        </div>
      </div>
    </>
  );
};
export default Payment;
