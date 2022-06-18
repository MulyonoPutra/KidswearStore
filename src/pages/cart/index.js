import './cart.scss';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
} from '../../config/redux/action/cart.action';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { id: productId } = params;

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const totalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const totalItems = () => {
    return cartItems.reduce((a, c) => a + c.qty, 0);
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };


  return (
    <>
      <div className='container mx-auto mt-10 px-10'>
        <div className='flex shadow-md my-10'>
          <div className='w-3/4 bg-white px-10 py-10'>
            <div className='flex justify-between border-b pb-8'>
              <h1 className='text-title'>Shopping Cart</h1>
              <h2 className='text-title'>
                {cartItems.length} Items
              </h2>
            </div>
            <div className='flex mt-10 mb-5'>
              <h3 className='text-product-details'>Product Details</h3>
              <h3 className='text-row-label'>Quantity</h3>
              <h3 className='text-row-label'>Price</h3>
              <h3 className='text-row-label'>Total</h3>
            </div>
            {cartItems.map((item) => (
              <div className='card-order-summary'>
                <li className='flex w-2/5' key={item.id}>
                  <div className='w-20'>
                    <img className='h-24' src={item.image} alt={item.name} />
                  </div>
                  <div className='flex flex-col justify-between ml-4 flex-grow'>
                    <span className='font-bold text-sm'>{item.name}</span>
                    <span className='text-red-500 text-xs'>{item.name}</span>
                    <a
                      href='!#'
                      className='text-remove'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove
                    </a>
                  </div>
                </li>
                <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                <span className='text-center w-1/5 font-semibold text-sm'>
                  <NumberFormat
                    value={item.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp.'}
                  />
                </span>
                <span className='text-center w-1/5 font-semibold text-sm'>
                  <NumberFormat
                    value={item.price * item.qty}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp.'}
                  />
                </span>
              </div>
            ))}

            <button
              className='flex font-semibold text-indigo-600 text-sm mt-10'
              onClick={() => navigate(-2)}
            >
              <svg
                className='fill-current mr-2 text-indigo-600 w-4'
                viewBox='0 0 448 512'
              >
                <path d='M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z' />
              </svg>
              Continue Shopping
            </button>
          </div>

          <div id='summary' className='w-1/4 px-8 py-10'>
            <h1 className='text-title border-b pb-8'>
              Order Summary
            </h1>
            <div className='flex justify-between mt-10 mb-5'>
              <span className='font-semibold text-sm uppercase'>
                Items {totalItems()}
              </span>
            </div>
            <div>
              <label className='font-medium inline-block mb-3 text-sm uppercase'>
                Shipping
              </label>
              <select className='block p-2 text-gray-600 w-full text-sm'>
                <option>Standard shipping - $10.00</option>
              </select>
            </div>
            <div className='py-10'>
              <label htmlFor='promo' className='text-promo'>
                Promo Code
              </label>
              <input
                type='text'
                id='promo'
                placeholder='Enter your code'
                className='p-2 text-sm w-full'
              />
            </div>
            <button className='btn-apply'>Apply</button>
            <div className='border-t mt-8'>
              <div className='text-total-cost'>
                <span>Subtotal</span>
                <span>
                  <NumberFormat
                    value={totalPrice()}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                  />
                </span>
              </div>
              <button
                className='btn-checkout'
                onClick={() => navigate('/signin?redirect=/checkout')}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
