import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';

import './cart.scss';
import {
  addToCart,
  removeFromCart,
} from '../../config/redux/action/cart.action';
import { ReactComponent as BackIcon } from '../../assets/icons/back.svg';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { id: productId } = params;

  const { search, state } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);

  const { size } = state;

  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, size));
    }
  }, [dispatch, productId, qty, size]);

  const totalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.qty, 0);
  };

  const totalItems = () => {
    return cartItems.reduce((a, c) => a + c.qty, 0);
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/checkout');
  };

  return (
    <>
      <div className='container mx-auto mt-10 px-10'>
        <div className='flex shadow-md my-10'>
          <div className='w-3/4 bg-white px-10 py-10'>
            <div className='flex justify-between border-b pb-8'>
              <h1 className='text-title'>Shopping Cart</h1>
              <h2 className='text-title'>{cartItems.length} Items</h2>
            </div>
            <div className='flex mt-10 mb-5'>
              <h3 className='text-product-details'>Product Details</h3>
              <h3 className='text-row-label'>Quantity</h3>
              <h3 className='text-row-label'>Price</h3>
              <h3 className='text-row-label'>Total</h3>
            </div>
            {cartItems.map((item) => (
              <div className='card-order-summary'>
                <li className='flex' style={{ width: 351 }} key={item.id}>
                  <div className='w-20'>
                    <img className='h-24' src={item.image} alt={item.name} />
                  </div>
                  <div className='flex flex-col justify-between ml-4 flex-grow'>
                    <span className='font-bold text-sm'>{item.name}</span>
                    <p className='text-sm leading-none text-gray-800'>
                      <span className='text-gray-300'>Size: </span>
                      <span className='text-red-500 text-xs'>{item.size}</span>
                    </p>

                    <button
                      type='button'
                      className='text-remove'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
                <select
                  value={item.qty}
                  onChange={(e) =>
                    dispatch(addToCart(item.product, Number(e.target.value)))
                  }
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
                <span className='text-value' style={{ marginLeft: 108 }}>
                  <NumberFormat
                    value={item.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp.'}
                  />
                </span>
                <span className='text-value'>
                  <NumberFormat
                    value={item.price * item.qty}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp.'}
                  />
                </span>
              </div>
            ))}

            <button className='btn-back' onClick={() => navigate(-2)}>
              <div className='fill-current mr-2 text-indigo-600 w-4'>
                <BackIcon />
              </div>
              Continue Shopping
            </button>
          </div>

          <div id='summary' className='w-1/4 px-8 py-10'>
            <h1 className='text-order-summary'>Order Summary</h1>
            <div className='flex justify-between mt-10 mb-5'>
              <span className='font-semibold text-sm uppercase'>
                {totalItems()} Items
              </span>
            </div>
            <div>
              <label className='text-label'>Shipping</label>
              <select className='block p-2 text-gray-600 w-full text-sm'>
                <option>Free Shipping - Rp. 0</option>
              </select>
            </div>
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
              <button className='btn-checkout' onClick={checkoutHandler}>
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
