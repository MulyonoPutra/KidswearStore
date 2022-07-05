import './order.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { detailsOrder } from './../../config/redux/action/order.action';
import Moment from 'react-moment';
import { Alert, Loading } from 'components';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

const Order = () => {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const userSignin = useSelector((state) => state.userSignin);
  const { order } = orderDetails;

  const params = useParams();
  const { id: orderId } = params;

  const [items, setItems] = useState({});

  const { userInfo } = userSignin;

  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    order?.orderItems?.map((item) => {
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
        itemsPrice: item.itemsPrice,
        shippingAddress: item.shippingAddress,
      });
    });
  }, [items.shippingAddress, order?.orderItems]);

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get('/v1/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order?._id) {
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, order?._id, order?.isPaid, orderId]);

  const successPaymentHandler = () => {
    // TODO: do something
    console.log(`Success Payment!`);
  };

  return (
    <div className='py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto'>
      <div className='flex justify-start item-start space-y-2 flex-col '>
        <h1 className='order-items-text-lg'>Order #{order?._id}</h1>
        <p className='text-base font-medium leading-6 text-gray-600'>
          <Moment format='LLLL' date={order?.createdAt} />
        </p>
      </div>
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
                  alt='dress'
                />
              </div>
              <div className='card-items'>
                <div className='w-full flex flex-col justify-start items-start space-y-8'>
                  <h3 className='text-xl xl:text-2xl font-semibold leading-6 text-gray-800'>
                    {items.name}
                  </h3>
                  <div className='flex justify-start items-start flex-col space-y-2'>
                    <p className='text-sm leading-none text-gray-800'>
                      <span className='text-gray-300'>Size: </span> Small
                    </p>
                    <p className='text-sm leading-none text-gray-800'>
                      <span className='text-gray-300'>Color: </span> Light Blue
                    </p>
                  </div>
                </div>
                <div className='flex justify-between space-x-8 items-start w-full'>
                  <p className='text-base xl:text-lg leading-6'>
                    {items.price}{' '}
                    <span className='text-red-300 line-through'>
                      {' '}
                      {items.price}
                    </span>
                  </p>
                  <p className='text-base xl:text-lg leading-6 text-gray-800'>
                    {items.qty}
                  </p>
                  <p className='text-base xl:text-lg font-semibold leading-6 text-gray-800'>
                    {items.price}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className='order-items-summary'>
            <div className='flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6'>
              <h3 className='text-xl font-semibold leading-5 text-gray-800'>
                Summary
              </h3>
              <div className='flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4'>
                <div className='flex justify-between  w-full'>
                  <p className='text-base leading-4 text-gray-800'>Subtotal</p>
                  <p className='text-base leading-4 text-gray-600'>
                    Rp. {items.qty * items.price}
                  </p>
                </div>
                <div className='flex justify-between items-center w-full'>
                  <p className='text-base leading-4 text-gray-800'>Shipping</p>
                  <p className='text-base leading-4 text-gray-600'>Rp. 0</p>
                </div>
              </div>
              <div className='flex justify-between items-center w-full'>
                <p className='text-base font-semibold leading-4 text-gray-800'>
                  Total
                </p>
                <p className='text-base font-semibold leading-4 text-gray-600'>
                  Rp. {items.qty * items.price}
                </p>
              </div>
              {!order?.isPaid && (
                <div>
                  {!sdkReady ? (
                    <Loading />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </div>
              )}
              {/* <div className='flex w-full justify-center items-center md:justify-start md:items-start'>
                <button
                  className='mt-6 md:mt-0 py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800'
                  type='button'
                >
                  Payment
                </button>
              </div> */}
            </div>
            <div className='order-items-shipping'>
              <h3 className='text-xl font-semibold leading-5 text-gray-800'>
                Shipping
              </h3>
              <div className='flex justify-between items-start w-full border-gray-200 border-b pb-4'>
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
              {order?.isDelivered ? (
                <Alert
                  condition={order?.isDelivered}
                  title='Not Delivered'
                  messages='Please finish your payment.'
                />
              ) : (
                <Alert
                  condition={order?.isDelivered}
                  title='Not Delivered'
                  messages='Please finish your payment.'
                />
              )}
              <div className='flex justify-between items-start w-full border-gray-200 border-b pb-4'>
                <div className='flex justify-center items-center space-x-4'>
                  <div className='w-8 h-8'>
                    <img
                      className='w-full h-full'
                      alt='logo'
                      src='https://www.sketchappsources.com/resources/source-image/PayPalCard.png'
                    />
                  </div>
                  <div className='flex flex-col justify-start items-center'>
                    <p className='text-lg leading-6 font-semibold text-gray-800'>
                      {order?.paymentMethod}
                      <br />
                    </p>
                  </div>
                </div>
              </div>
              {order?.isPaid ? (
                <Alert
                  condition={order?.isPaid}
                  title='Not Paid'
                  messages='Please finish your payment.'
                />
              ) : (
                <Alert
                  condition={order?.isPaid}
                  title='Not Paid'
                  messages='Please finish your payment.'
                />
              )}
            </div>
          </div>
        </div>
        <div className='customer'>
          <h3 className='customer-title'>Customer</h3>
          <div className='customer-card'>
            <div className='flex flex-col justify-start items-start flex-shrink-0'>
              <div className='customer-card-wrapper'>
                <img
                  src='https://i.ibb.co/5TSg7f6/Rectangle-18.png'
                  alt='avatar'
                />
                <div className=' flex justify-start items-start flex-col space-y-2'>
                  <p className='text-base font-semibold leading-4 text-left text-gray-800'>
                    {userInfo.name}
                  </p>
                  <p className='text-sm leading-5 text-gray-600'>
                    10 Previous Orders
                  </p>
                </div>
              </div>

              <div className='customer-email'>
                <svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z'
                    stroke='#1F2937'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M3 7L12 13L21 7'
                    stroke='#1F2937'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
                <p className='customer-email-text'>{userInfo.email}</p>
              </div>
            </div>
            <div className='customer-address'>
              <div className='customer-address-wrapper'>
                <div className='customer-address-wrapper-shipping'>
                  <p className='customer-address-wrapper-shipping-text'>
                    Shipping Address
                  </p>
                  <p className='customer-address-wrapper-shipping-value'>
                    {order?.shippingAddress?.address}
                  </p>
                </div>
                <div className='customer-address-wrapper-shipping'>
                  <p className='customer-address-wrapper-shipping-text'>
                    Billing Address
                  </p>
                  <p className='customer-address-wrapper-shipping-value'>
                    {order?.shippingAddress?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
