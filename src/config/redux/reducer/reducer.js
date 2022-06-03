import { combineReducers } from 'redux';
import { productListReducer } from './product.reducer';

const reducer = combineReducers({
  productList: productListReducer,
});

export default reducer;
