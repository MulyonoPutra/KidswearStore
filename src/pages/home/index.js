import { ErrorToast, Loading } from 'components';
import { findAllProducts } from 'config/redux/action/product.action';
import ProductList from 'pages/product-list';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './home.scss';

const Home = () => {
  // @ts-ignore
  const listProducts = useSelector((state) => state.productList);
  const { loading, error, products } = listProducts;
  const dispatch = useDispatch();

  useEffect(() => {
    // @ts-ignore
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
                <div key={product.id}>
                  <ProductList
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
