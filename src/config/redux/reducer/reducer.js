import { combineReducers } from 'redux';
import { productListReducer, productDetailReducer } from './product.reducer';
import { cartReducer } from './cart.reducer';
import { userRegisterReducer, userSigninReducer } from './user.reducer';
import {
  orderCreateReducer,
  orderDetailReducer,
  orderHistoryReducer,
  orderPayReducer,
} from './order.reducer';

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailReducer,
  orderPay: orderPayReducer,
  orderHistory: orderHistoryReducer,
});

export default reducer;
