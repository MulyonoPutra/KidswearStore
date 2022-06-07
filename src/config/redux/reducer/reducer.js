import { combineReducers } from 'redux';
import { productListReducer, productDetailReducer } from './product.reducer';
import { cartReducer } from './cart.reducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
});

export default reducer;
