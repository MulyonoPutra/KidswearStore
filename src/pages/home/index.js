import { ErrorToast, Loading } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import ProductList from 'pages/product-list';

import { findAllProducts } from 'config/redux/action/product.action';

import './home.scss';

const Home = () => {
  const listProducts = useSelector((state) => state.productList);
  const { loading, error, products } = listProducts;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAllProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorToast />
      ) : (
        <div className='bg-white'>
          <div className='wrapper'>
            <div className='product-grid'>
              {products.map((product) => (
                <div key={product._id}>
                  <ProductList
                    id={product._id}
                    image={product.image}
                    imageAlt={product.name}
                    name={product.name}
                    price={product.price}
                    href={product.href}
                    color={product.color}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Home;
