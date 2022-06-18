import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './../../pages/main/index';

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Main />} />
      </Routes>
    </Router>
  );
};
export default AppRoute