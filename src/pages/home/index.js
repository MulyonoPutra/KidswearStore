import ProductList from 'pages/product-list';
import { products } from 'utils/product.mock';
import './home.scss';

const Home = () => {
  return (
    <>
      <div className='bg-white'>
        <div className='wrapper'>
          <div className='product-grid'>
            {products.map((product) => (
              <div key={product.id}>
                <ProductList 
                  imageSrc={product.imageSrc}
                  imageAlt={product.imageAlt}
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
    </>
  );
};
export default Home;
