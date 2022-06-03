import axios from 'axios';
import { ErrorToast, Loading } from 'components';
import ProductList from 'pages/product-list';
import { useEffect, useState } from 'react';
import './home.scss';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await axios
        .get('v1/product')
        .then((response) => {
          setProducts(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          setError(error);
          setLoading(false);
        });
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <>
      {
      loading ? (
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
