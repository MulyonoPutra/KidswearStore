import { ErrorToast, Loading, Divider, Rating } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import { findById } from 'config/redux/action/product.action';
import MinusIcon from 'assets/icons/minus.svg';
import PencilIcon from 'assets/icons/pencil.svg';
import PlusIcon from 'assets/icons/plus.svg';

import './product-details.scss';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: productId } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [qty, setQty] = useState(1);
  const [isHidden, setIsHidden] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');

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
      return <span className='stock-in'>In Stock</span>;
    } else {
      return <span className='stock-off'>Out of Stock</span>;
    }
  };

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`, {
      state: { size: selectedSize },
    });
  };

  const selected = (e) => {
    setSelectedSize(e.target.value);
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
                  className='product-images'
                  src={product.image}
                />
                <div className='flex justify-center ml-3'>
                  <div className='card'>
                    <h5 className='product-name'>{product.name}</h5>

                    <div className='flex mb-4'>
                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                        className='flex items-center'
                      ></Rating>
                    </div>
                    <p className='product-description'>{product.description}</p>
                    <Divider />
                    <p className='product-stock'>{quantityStock()}</p>
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
                          <select
                            className='product-dropdown'
                            onChange={selected}
                            value={selectedSize}
                          >
                            {product?.size?.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
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
                              className='product-input'
                              type='text'
                              value={qty}
                              onChange={(e) => {
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
                        <p className='product-notes'>Add Notes</p>
                      </div>
                    </div>
                    {!isHidden && (
                      <div className='mb-4'>
                        <textarea
                          id='about'
                          name='about'
                          rows={3}
                          className='product-text-area'
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
