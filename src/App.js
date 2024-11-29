import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
// import SignUP from './pages/SignUp';
// import CheckoutPage from './pages/CheckoutPage';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menuPage" element={<MenuPage />} />
      </Routes>
    </Router>
    // <SignUP/>
    // <CheckoutPage/>
  );
};

export default App;
