import { Header } from '../../components/molecules/index';
import { Route, Routes } from 'react-router-dom';
import { Home, Shipping } from 'pages';
import ProductDetails from './../product-details/index';
import Cart from './../cart/index';
import Checkout from '../checkout/index';
import Login from './../auth/login/index';
import Register from './../auth/register/index';
import Payment from './../payment/index';
import PlaceOrder from './../place-order/index';

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
        <Route path='/payment' element={<Payment />} />
        <Route path='/place-order' element={<PlaceOrder />} />
      </Routes>
    </>
  );
};
export default Main;
