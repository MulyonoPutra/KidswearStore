import { Header } from '../../components/molecules/index';
import { Route, Routes } from 'react-router-dom';
import { Home, Shipping } from 'pages';

const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shipping' element={<Shipping />} />
      </Routes>
    </>
  );
};
export default Main;
