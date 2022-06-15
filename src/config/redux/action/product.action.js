import axios from 'axios';
import {
  PRODUCT_DETAILS_FAILURE,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAILURE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from 'config/constants/product.constant';

export const findAllProducts = () => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    try {
      const { data } = await axios.get('/v1/product');
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data.products });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAILURE, payload: error });
    }
  };
};

export const findById = (id) => {
  return async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: id });
    try {
      const { data } = await axios.get(`/v1/product/${id}`);
      const { product } = data;
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: product });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
