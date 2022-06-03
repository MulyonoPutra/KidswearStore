import { Header } from '../../components/molecules/index';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/home';

const Main = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </>
  );
};
export default Main;
