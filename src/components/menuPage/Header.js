import { useState } from 'react';

const Header = ({ onSearch }) => {
  const [showNav, setShowNav] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('best'); // Default menu aktif

  const toggleNav = () => setShowNav(!showNav);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass search query to parent component to handle search
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Set menu yang aktif
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="flex items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 text-xl hover:text-gray-800" onClick={toggleNav}>
            <i className="fas fa-bars"></i>
          </button>
          <a href="/homepage">
            <img src="/images/image.png" alt="Zek Order" className="w-32 h-auto" />
          </a>
        </div>

        {/* Navigation Links */}
        <ul className={`flex space-x-4 transition-all duration-300 ${showNav ? 'block' : 'hidden'} lg:flex`}>
          <li>
            <a
              href="#popular"
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${activeMenu === 'best' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => handleMenuClick('best')}
            >
              Best
            </a>
          </li>
          <li>
            <a
              href="#snacks"
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${activeMenu === 'makanan' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => handleMenuClick('makanan')}
            >
              Makanan
            </a>
          </li>
          <li>
            <a
              href="#regular"
              className={`px-4 py-2 rounded-md transition-colors duration-300 ${activeMenu === 'minuman' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100 text-gray-700'}`}
              onClick={() => handleMenuClick('minuman')}
            >
              Minuman
            </a>
          </li>
        </ul>

        {/* Searchbox */}
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Cari menu..."
            value={searchQuery}
            onChange={handleSearch} // Update search query state on input change
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                console.log('Executing search for:', searchQuery);
              }
            }}
            className="hidden lg:block px-3 py-1 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
