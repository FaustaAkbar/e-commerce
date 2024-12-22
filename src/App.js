import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CheckoutPage from './pages/CheckoutPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menuPage" element={<MenuPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </Router>
  );
};

export default App;
