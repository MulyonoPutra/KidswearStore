import { Link, useNavigate } from 'react-router-dom';
import './checkout.scss';
import { useSelector, useDispatch } from 'react-redux';
import NumberFormat from 'react-number-format';
import { useState } from 'react';
import { saveShippingAddress } from './../../config/redux/action/cart.action';
import { useEffect } from 'react';

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
    <div className='overflow-y-hidden'>
      <div className='containers'>
        <div className='containers-wrapper'>
          <div className='containers-shipping'>
            <div>
              <p className='containers-shipping-title'>Check out</p>
            </div>
            <div className='mt-2'>
              <Link to={'/cart'} className='containers-shipping-back'>
                Back to Cart
              </Link>
            </div>
            <div className='mt-12'>
              <p className='containers-shipping-title-sm'>Shipping Details</p>
            </div>
            <form className='form-w-full'>
              <div className='containers-forms'>
                <input
                  className='form-w-full'
                  type='text'
                  placeholder='Fullname'
                  value={fullName}
                  onChange={(e) => setfullName(e.target.value)}
                />
                <input
                  className='form-w-full'
                  type='text'
                  placeholder='Phone Number'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <input
                  className='form-w-full'
                  type='text'
                  placeholder='Address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <input
                  className='form-w-full'
                  type='text'
                  placeholder='Zip Code'
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
                <input
                  className='form-w-full'
                  type='text'
                  placeholder='Country'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  className='form-w-full'
                  type='text'
                  placeholder='Country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>
              <button
                className='btn-proceed'
                type='submit'
                onClick={submitHandler}
              >
                Proceed to payment
              </button>
            </form>
          </div>
          <div className='order-summary-wrapper'>
            <div>
              <h1 className='containers-shipping-title-sm-2'>
                Order Summary
              </h1>
            </div>
            <div className='flex mt-7 flex-col items-end w-full space-y-6'>
              <div className='flex justify-between w-full items-center'>
                <p className='order-summary-text'>Total items</p>
                <p className='order-summary-value'>{totalItems()}</p>
              </div>
              <div className='flex justify-between w-full items-center'>
                <p className='order-summary-text'>Total Charges</p>
                <p className='order-summary-value'>
                  {' '}
                  <NumberFormat
                    value={totalPrice()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                  />
                </p>
              </div>
              <div className='flex justify-between w-full items-center'>
                <p className='order-summary-text'>Shipping charges</p>
                <p className='order-summary-value'>Rp. 0</p>
              </div>
              <div className='flex justify-between w-full items-center'>
                <p className='order-summary-text'>Sub total </p>
                <p className='order-summary-value'>
                  {' '}
                  <NumberFormat
                    value={totalPrice()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                  />
                </p>
              </div>
            </div>
            <div className='flex justify-between w-full items-center mt-32'>
              <p className='order-summary-total'>Estimated Total </p>
              <p className='order-summary-total'>
                {' '}
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
