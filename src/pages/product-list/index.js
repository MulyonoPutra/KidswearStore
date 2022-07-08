import { useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';

import './product-list.scss';

const ProductList = (props) => {
  const { id, image, name, price, href, color } = props;
  const navigate = useNavigate();

  return (
    <div
      className='group relative'
      onClick={() => {
        navigate(`/details/${id}`);
      }}
    >
      <div className='w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none'>
        <img
          src={image}
          alt={name}
          className='w-full h-full object-center object-cover lg:w-full lg:h-full'
        />
      </div>
      <div className='mt-4 flex justify-between'>
        <div>
          <h3 className='text-sm text-gray-700'>
            <a href={href}>
              <span aria-hidden='true' className='absolute inset-0' />
              {name}
            </a>
          </h3>
          <p className='mt-1 text-sm text-gray-500'>{color}</p>
        </div>
        <p className='text-sm font-medium text-gray-900'>
          <NumberFormat
            value={price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp. '}
          />
        </p>
      </div>
    </div>
  );
};
export default ProductList;
