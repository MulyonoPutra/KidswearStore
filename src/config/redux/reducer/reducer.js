import { combineReducers } from 'redux';
import { productListReducer, productDetailReducer } from './product.reducer';
import { cartReducer } from './cart.reducer';
import { userRegisterReducer, userSigninReducer } from './user.reducer';
import { orderCreateReducer, orderDetailReducer } from './order.reducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer
});

export default reducer;
