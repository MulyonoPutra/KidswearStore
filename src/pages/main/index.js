import { Home, Shipping } from 'pages';
import { Route, Routes } from 'react-router-dom';

import { Header } from '../../components/molecules/index';
import Cart from './../cart/index';
import Checkout from '../checkout/index';
import Login from './../auth/login/index';
import Order from './../order/index';
import OrderHistory from './../order-history/index'
import Payment from './../payment/index';
import PlaceOrder from './../place-order/index';
import ProductDetails from './../product-details/index';
import Profile from './../profile/index'
import Register from './../auth/register/index';
import PrivateRoute from './../../utils/private-route'

const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/details/:id' element={<ProductDetails />} />
        <Route path='/cart/:id' element={<Cart />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/profile" component={PrivateRoute}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/payment' element={<Payment />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<Order />} />
        <Route path='/order-history' element={<OrderHistory />} />
      </Routes>
    </>
  );
};
export default Main;
