import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '../src/context/cartContext';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import CheckoutPage from './pages/CheckoutPage';
import AdminPage from './pages/adminPage';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/menuPage" element={<MenuPage />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
