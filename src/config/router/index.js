import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './../../pages/main/index';
import Login from './../../pages/auth/login/index'

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Main />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
};
export default AppRoute