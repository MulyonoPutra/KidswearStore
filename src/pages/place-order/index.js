import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';

import { ORDER_CREATE_RESET } from 'config/constants/order.constant';

import './place-order.scss';
import './place-order.scss';
import { createOrder } from './../../config/redux/action/order.action';
import { ReactComponent as EmailIcon } from '../../assets/icons/email.svg';

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const userSignin = useSelector((state) => state.userSignin);
  const { cartItems, shippingAddress } = cart;

  const totalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const [items, setItems] = useState({});
  const { userInfo } = userSignin;
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;

  useEffect(() => {
    cartItems.map((item) => {
      return setItems({
        name: item.name,
        image: item.image,
        brand: item.brand,
        category: item.category,
        description: item.description,
        price: item.price,
        rating: item.rating,
        numReviews: item.numReviews,
        countInStock: item.countInStock,
        qty: item.qty,
        size: item.size,
      });
    });
  }, [cartItems]);

  useEffect(() => {
    if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, navigate]);

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, navigate, order, success]);

  const toPrice = (num) => Number(num.toFixed(2));

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };

  return (
    <div className='py-2 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto'>
      <div className='wrapper'>
        <div className='order-items-wrapper'>
          <div className='order-items-card'>
            <p className='order-items-text'>Order Items</p>
            <div className='order-items-card-item'>
              <div className='pb-4 md:pb-8 w-full md:w-40'>
                <img
                  className='w-full hidden md:block'
                  src={items.image}
                  alt='dress'
                />
                <img
                  className='w-full md:hidden'
                  src='https://i.ibb.co/L039qbN/Rectangle-10.png'
                  alt='Address'
                />
              </div>
              <div className='card-list'>
                <div className='card-list-wrapper'>
                  <h3 className='card-list-name'>{items.name}</h3>
                  <div className='flex justify-start items-start flex-col space-y-2'>
                    <p className='text-sm leading-none text-gray-800'>
                      <span className='text-gray-300'>Style: </span> Italic
                      Minimal Design
                    </p>
                    <p className='text-sm leading-none text-gray-800'>
                      <span className='text-gray-300'>Size: </span> {items.size}
                    </p>
                    <p className='text-sm leading-none text-gray-800'>
                      <span className='text-gray-300'>Color: </span> -
                    </p>
                  </div>
                </div>
                <div className='flex justify-between space-x-8 items-start w-full'>
                  <p className='text-base xl:text-lg leading-6'>
                    <NumberFormat
                      value={items.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp.'}
                    />
                    <span className='text-red-300 line-through'>
                      <NumberFormat
                        value={items.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp.'}
                      />
                    </span>
                  </p>
                  <p className='text-base xl:text-lg leading-6 text-gray-800'>
                    {items.qty}
                  </p>
                  <p className='text-base xl:text-lg font-semibold leading-6 text-gray-800'>
                    <NumberFormat
                      value={items.price}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp.'}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='summary'>
            <div className='summary-wrapper'>
              <h3 className='summary-title'>Summary</h3>
              <div className='summary-card'>
                <div className='flex justify-between w-full'>
                  <p className='summary-text-normal'>Subtotal</p>
                  <p className='summary-text-sm'>
                    <NumberFormat
                      value={totalPrice()}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp.'}
                    />
                  </p>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p className='summary-text-normal'>Shipping</p>
                  <p className='summary-text-sm'>Rp. 0</p>
                </div>
              </div>
              <div className='flex justify-between items-center w-full'>
                <p className='summary-text-bold-normal'>Total</p>
                <p className='summary-text-bold-sm'>
                  <NumberFormat
                    value={totalPrice()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp.'}
                  />
                </p>
              </div>
            </div>

            <div className='flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6'>
              <h3 className='text-xl font-semibold leading-5 text-gray-800'>
                Shipping
              </h3>
              <div className='flex justify-between items-start w-full'>
                <div className='flex justify-center items-center space-x-4'>
                  <div className='w-8 h-8'>
                    <img
                      className='w-full h-full'
                      alt='logo'
                      src='https://i.ibb.co/L8KSdNQ/image-3.png'
                    />
                  </div>
                  <div className='flex flex-col justify-start items-center'>
                    <p className='text-lg leading-6 font-semibold text-gray-800'>
                      JNT Express
                      <br />
                      <span className='font-normal'>
                        Delivery with 3 Days Maximum
                      </span>
                    </p>
                  </div>
                </div>
                <p className='text-lg font-semibold leading-6 text-gray-800'>
                  Rp. 0
                </p>
              </div>
              <div className='w-full flex justify-center items-center'></div>
            </div>
          </div>
        </div>

        <div className='customer'>
          <h3 className='customer-title'>Customer</h3>
          <div className='customer-wrapper'>
            <div className='customer-list'>
              <div className='customer-list-wrapper'>
                <img
                  src='https://i.ibb.co/5TSg7f6/Rectangle-18.png'
                  alt='avatar'
                />
                <div className='customer-name'>
                  <p className='customer-name-text'>{userInfo.name}</p>
                </div>
              </div>

              <div className='customer-logo'>
                <EmailIcon />
                <p className='cursor-pointer text-sm leading-5 text-gray-800'>
                  {userInfo.email}
                </p>
              </div>
            </div>
            <div className='shipping'>
              <div className='shipping-wrapper'>
                <div className='shipping-address'>
                  <p className='shipping-address-title'>Shipping Address</p>
                  <p className='shipping-address-value'>
                    {shippingAddress.address}
                  </p>
                </div>
                <div className='shipping-address'>
                  <p className='shipping-address-title'>Billing Address</p>
                  <p className='shipping-address-value'>
                    {shippingAddress.address}
                  </p>
                </div>
              </div>
            </div>
            <div className='place-order-wrapper'>
              <button
                className='place-order-btn'
                onClick={placeOrderHandler}
                type='button'
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
