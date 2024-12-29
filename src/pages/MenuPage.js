import { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext'; // Importing the useCart hook
import Card from '../components/menuPage/Card';
import Header from '../components/menuPage/Header';
import Footer from '../components/menuPage/Footer';

const MenuPage = () => {
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const [snackDishes, setSnackDishes] = useState([]);
  const [regularDishes, setRegularDishes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { getTotalItems } = useCart(); // Using the getTotalItems function from useCart
  const navigate = useNavigate();

  // Fetch menu items
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

  // Handle search logic
  const searchMenu = async (query) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/menu?search=${query}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  // Handle search input changes (search as you type)
  const handleSearch = (query) => {
    setSearchQuery(query);
    searchMenu(query); // Trigger search immediately as user types
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleCartClick = () => {
    navigate('/checkout');
  };

  return (
    <>
      <Header onSearch={handleSearch} />
      <div className="flex flex-col items-center">
        {/* Hasil pencarian */}
        {searchResults.length > 0 && (
          <section id="searchResults" className="text-center py-20 px-5">
            <h2 className="text-2xl font-semibold mb-5">Hasil Pencarian</h2>
            <div className="relative w-full max-w-7xl mx-auto">
              <div className="dish-cards flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {searchResults.map((item) => (
                  <Card key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bagian menu lainnya */}
        <section id="popular" className="text-center py-20 px-5">
          <h2 className="text-2xl font-semibold mb-5">Best Dishes</h2>
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="dish-cards flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {favoriteDishes.map((item) => <Card key={item.id} item={item} />)}
            </div>
          </div>
        </section>

        {/* Snack Dishes */}
        <section id="snacks" className="text-center py-20 px-5">
          <h2 className="text-2xl font-semibold mb-5">Makanan</h2>
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="dish-cards flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {snackDishes.map((item) => <Card key={item.id} item={item} />)}
            </div>
          </div>
        </section>

        {/* Regular Dishes */}
        <section id="regular" className="text-center py-20 px-5">
          <h2 className="text-2xl font-semibold mb-5">Minuman</h2>
          <div className="relative w-full max-w-7xl mx-auto">
            <div className="dish-cards flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {regularDishes.map((item) => <Card key={item.id} item={item} />)}
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-5 right-5">
        <button className="relative p-4 bg-green-500 text-white rounded-full shadow-lg" onClick={handleCartClick}>
          <FaShoppingCart size={30} />
          {getTotalItems() > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>

      <Footer />
    </>
  );
};

export default MenuPage;
