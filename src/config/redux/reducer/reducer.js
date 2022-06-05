import { combineReducers } from 'redux';
import { productListReducer, productDetailReducer } from './product.reducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
});

export default reducer;
