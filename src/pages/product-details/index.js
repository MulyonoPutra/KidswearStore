import { ErrorToast, Loading, Divider, Rating } from 'components';
import { findById } from 'config/redux/action/product.action';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import './product-details.scss';
import MinusIcon from 'assets/icons/minus.svg';
import PlusIcon from 'assets/icons/plus.svg';
import PencilIcon from 'assets/icons/pencil.svg';
import NumberFormat from 'react-number-format';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id: productId } = useParams();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [isHidden, setIsHidden] = useState(true);

  const addCount = () => {
    setQty((prev) => prev + 1);
  };

  const minusCount = () => {
    if (qty > 0) {
      setQty((prev) => prev - 1);
    }
  };

  useEffect(() => {
    dispatch(findById(productId));
  }, [dispatch, productId]);

  const quantityStock = () => {
    if (product.countInStock > 0) {
      return <span className='leading-relaxed text-green-600'>In Stock</span>;
    } else {
      return <span className='leading-relaxed text-red-600'>Out of Stock</span>;
    }
  };

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorToast />
      ) : (
        <>
          <section>
            <div className='container px-5 py-24 mx-auto'>
              <div className='lg:w-4/5 mx-auto flex flex-wrap'>
                <img
                  alt='Product Images'
                  className='lg:w-1/2 w-full object-cover object-center rounded border border-gray-200'
                  src={product.image}
                />
                <div className='flex justify-center ml-3'>
                  <div className='card'>
                    <h5 className='text-gray-900 text-xl leading-tight font-medium mb-2'>
                      {product.name}
                    </h5>

                    <div className='flex mb-4'>
                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                        className='flex items-center'
                      ></Rating>
                      <span className='flex ml-3 pl-3 py-2 border-l-2 border-gray-200'>
                        <a href='!#' className='text-gray-500'>
                          <svg
                            fill='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            className='w-5 h-5'
                            viewBox='0 0 24 24'
                          >
                            <path d='M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' />
                          </svg>
                        </a>
                        <a href='!#' className='ml-2 text-gray-500'>
                          <svg
                            fill='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            className='w-5 h-5'
                            viewBox='0 0 24 24'
                          >
                            <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
                          </svg>
                        </a>
                        <a href='!#' className='ml-2 text-gray-500'>
                          <svg
                            fill='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            className='w-5 h-5'
                            viewBox='0 0 24 24'
                          >
                            <path d='M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z' />
                          </svg>
                        </a>
                      </span>
                    </div>
                    <p className='leading-relaxed text-gray-300'>
                      {product.description}
                    </p>
                    <Divider />
                    <p className='leading-relaxed text-green-600'>
                      {quantityStock()}
                    </p>
                    <span className='text-price'>
                      <NumberFormat
                        value={product.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'Rp. '}
                      />
                    </span>
                    <Divider />
                    <div className='flex items-center mt-2'>
                      <div className='flex'>
                        <span className='mr-3'>Color</span>
                        <button className='border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none' />
                        <button className='border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none' />
                        <button className='border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none' />
                      </div>

                      <div className='flex ml-6 items-center'>
                        <span className='mr-3'>Size</span>
                        <div className='relative'>
                          <select className='rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10'>
                            <option>SM</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                          </select>
                          <span className='absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center'>
                            <svg
                              fill='none'
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              className='w-4 h-4'
                              viewBox='0 0 24 24'
                            >
                              <path d='M6 9l6 6 6-6' />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    <Divider />
                    <div className='flex space-y-4 mt-4'>
                      <div>
                        <span>Add quantity and notes</span>
                        <div className='custom-number-input h-10 w-32'>
                          <div className='flex'>
                            <span onClick={minusCount} className='count-minus'>
                              <img
                                src={MinusIcon}
                                alt='Minus'
                                height={12}
                                width={12}
                              />
                            </span>
                            <input
                              id='counter'
                              aria-label='input'
                              className='border border-gray-300 text-center w-14 pb-1 h-10'
                              type='text'
                              value={qty}
                              onChange={(e) => {
                                // @ts-ignore
                                setQty(e.target.value);
                              }}
                            />
                            <span onClick={addCount} className='count-plus'>
                              <img
                                src={PlusIcon}
                                alt='Minus'
                                height={12}
                                width={12}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className='flex space-x-1 mt-2 cursor-pointer'
                      onClick={() => {
                        setIsHidden(!isHidden);
                      }}
                    >
                      <div>
                        <img
                          src={PencilIcon}
                          alt='Notes'
                          height={18}
                          width={18}
                        />
                      </div>
                      <div>
                        <p className='leading-relaxed text-green-600 text-sm mb-2'>
                          Add Notes
                        </p>
                      </div>
                    </div>
                    {!isHidden && (
                      <div className='mb-4'>
                        <textarea
                          id='about'
                          name='about'
                          rows={3}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
                          placeholder='Add your notes here..'
                          defaultValue={''}
                        />
                      </div>
                    )}
                    {product.countInStock > 0 && (
                      <div>
                        <button
                          className='cart-button'
                          onClick={addToCartHandler}
                        >
                          Add to Cart
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};
export default ProductDetails;
