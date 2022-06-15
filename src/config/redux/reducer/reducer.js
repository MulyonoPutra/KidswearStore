import { combineReducers } from 'redux';
import { productListReducer, productDetailReducer } from './product.reducer';
import { cartReducer } from './cart.reducer';
import { userSigninReducer } from './user.reducer'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
});

export default reducer;
