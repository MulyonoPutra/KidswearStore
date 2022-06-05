import { ErrorToast, Loading } from 'components';
import { findById } from 'config/redux/action/product.action';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // @ts-ignore
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    console.log('useParams: ', id);
    // @ts-ignore
    dispatch(findById(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorToast />
      ) : (
        <>
          <span>{product.name}</span>
        </>
      )}
    </>
  );
};
export default ProductDetails;
