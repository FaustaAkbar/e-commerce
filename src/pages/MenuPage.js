import { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/cartContext'; // Import useCart
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import Card from '../components/menuPage/Card';
import Header from '../components/menuPage/Header';
import Footer from '../components/menuPage/Footer';

const MenuPage = () => {
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const [snackDishes, setSnackDishes] = useState([]);
  const [regularDishes, setRegularDishes] = useState([]);
  const { getTotalItems } = useCart(); // Get total items in the cart
  const navigate = useNavigate(); // For navigating to checkout page

  const scroll = (direction, sectionId) => {
    const container = document.querySelector(`#${sectionId} .dish-cards`);
    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu');
        const data = await response.json();
        setFavoriteDishes(data.filter((item) => item.isBest));
        setSnackDishes(data.filter((item) => item.category === 'Makanan'));
        setRegularDishes(data.filter((item) => item.category === 'Minuman'));
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };

    fetchMenu();
  }, []);

  const handleCartClick = () => {
    navigate('/checkout'); // Navigate to Checkout page
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center">
        {/* Section 1 */}
        <section id="popular" className="text-center py-20 px-5">
          <h2 className="text-2xl font-semibold mb-5">
            Hidangan <span className="text-green-500 font-bold">Terbaik</span> Kami
          </h2>
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="dish-cards flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {favoriteDishes.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
            <button className="scroll-btn left absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full w-10 h-10 shadow-md" onClick={() => scroll('left', 'popular')}>
              ❮
            </button>
            <button className="scroll-btn right absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full w-10 h-10 shadow-md" onClick={() => scroll('right', 'popular')}>
              ❯
            </button>
          </div>
        </section>

        {/* Section 2 */}
        <section id="snacks" className="text-center py-20 px-5">
          <h2 className="text-2xl font-semibold mb-5">
            <span className="text-green-500 font-bold">Menu</span> Makanan
          </h2>
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="dish-cards flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {snackDishes.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
            <button className="scroll-btn left absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full w-10 h-10 shadow-md" onClick={() => scroll('left', 'snacks')}>
              ❮
            </button>
            <button className="scroll-btn right absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full w-10 h-10 shadow-md" onClick={() => scroll('right', 'snacks')}>
              ❯
            </button>
          </div>
        </section>

        {/* Section 3 */}
        <section id="regular" className="text-center py-20 px-5">
          <h2 className="text-2xl font-semibold mb-5">
            Menu <span className="text-green-500 font-bold">Minuman</span> Kami
          </h2>
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="dish-cards flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {regularDishes.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </div>
            <button className="scroll-btn left absolute left-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full w-10 h-10 shadow-md" onClick={() => scroll('left', 'regular')}>
              ❮
            </button>
            <button className="scroll-btn right absolute right-0 top-1/2 transform -translate-y-1/2 bg-green-500 text-white rounded-full w-10 h-10 shadow-md" onClick={() => scroll('right', 'regular')}>
              ❯
            </button>
          </div>
        </section>
      </div>

      {/* Cart Icon with Notification */}
      <div className="fixed bottom-5 right-5">
        <button className="relative p-4 bg-green-500 text-white rounded-full shadow-lg" onClick={handleCartClick}>
          <FaShoppingCart size={30} />
          {getTotalItems() > 0 && <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{getTotalItems()}</span>}
        </button>
      </div>

      <Footer />
    </>
  );
};

export default MenuPage;
