import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import NumberFormat from 'react-number-format';

import './checkout.scss';
import { saveShippingAddress } from './../../config/redux/action/cart.action';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSignin = useSelector((state) => state.userSignin);
  const userInfo = userSignin;

  const [fullName, setfullName] = useState(shippingAddress.fullName);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress.phoneNumber);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const totalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const totalItems = () => {
    return cartItems.reduce((a, c) => a + c.qty, 0);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        fullName,
        phoneNumber,
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate('/payment');
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate, userInfo]);

  return (
    <div className='shipping'>
      <div className='shipping-container'>
        <div className='shipping-container-wrapper'>
          <div className='shipping-container-wrapper-forms'>
            <p className='shipping-title'>Check out</p>
            <div className='mt-2'>
              <Link to={'/cart'} className='containers-shipping-back'>
                Back to Cart
              </Link>
            </div>
            <div className='mt-12'>
              <p className='shipping-subtitle'>Shipping Details</p>
            </div>
            <form className='w-full'>
              <div className='shipping-forms'>
                <input
                  className='shipping-forms-input'
                  type='text'
                  placeholder='Fullname'
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                />
                <input
                  className='shipping-forms-input'
                  type='text'
                  placeholder='Phone Number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                  className='shipping-forms-input'
                  type='text'
                  placeholder='Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  className='shipping-forms-input'
                  type='text'
                  placeholder='City'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  className='shipping-forms-input'
                  type='text'
                  placeholder='Zip Code'
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <input
                  className='shipping-forms-input'
                  type='text'
                  placeholder='Country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
            </form>
            <button
              type='submit'
              onClick={submitHandler}
              className='shipping-submit-btn'
            >
              Proceed to payment
            </button>
          </div>
          <div className='shipping-order-summary'>
            <div>
              <h1 className='shipping-order-summary-title'>Order Summary</h1>
            </div>
            <div className='shipping-order-summary-card'>
              <div className='shipping-order-summary-card-items'>
                <p className='text-lg leading-4 text-gray-600'>Total items</p>
                <p className='shipping-order-summary-card-items-value'>
                  {totalItems()}
                </p>
              </div>
              <div className='shipping-order-summary-card-items'>
                <p className='text-lg leading-4 text-gray-600'>Total Charges</p>
                <p className='shipping-order-summary-card-items-value'>
                  <NumberFormat
                    value={totalPrice()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                  />
                </p>
              </div>
              <div className='shipping-order-summary-card-items'>
                <p className='text-lg leading-4 text-gray-600'>
                  Shipping charges
                </p>
                <p className='shipping-order-summary-card-items-value'>Rp. 0</p>
              </div>
              <div className='shipping-order-summary-card-items'>
                <p className='text-lg leading-4 text-gray-600'>Sub total </p>
                <p className='shipping-order-summary-card-items-value'>
                  <NumberFormat
                    value={totalPrice()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                  />
                </p>
              </div>
            </div>
            <div className='shipping-order-summary-total'>
              <p className='shipping-order-summary-total-title'>
                Estimated Total{' '}
              </p>
              <p className='shipping-order-summary-total-value'>
                <NumberFormat
                  value={totalPrice()}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp. '}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
