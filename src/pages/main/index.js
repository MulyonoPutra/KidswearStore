import { Header } from '../../components/molecules/index';
import { Route, Routes } from 'react-router-dom';
import { Home, Shipping } from 'pages';
import ProductDetails from './../product-details/index';

const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/details/:id' element={<ProductDetails />} />
      </Routes>
    </>
  );
};
export default Main;
