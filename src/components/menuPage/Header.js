import { useState } from 'react';
import '../../styles/menuPage.css';
const Header = () => {
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMenu, setActiveMenu] = useState('best'); // Default menu aktif

  const toggleNav = () => setShowNav(!showNav);
  const toggleSearchBox = () => setShowSearch(!showSearch);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    console.log('Searching for:', searchTerm);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Set menu yang aktif
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo-container">
          <button className="bars-icon" onClick={toggleNav}>
            <i className="fas fa-bars"></i>
          </button>
          <a href="/">
            <img src="/images/image.png" alt="Zek Order" className="logo-image" />
          </a>
        </div>
        <ul className={`nav-links ${showNav ? 'active' : ''}`}>
          <li>
            <a href="#popular" className={`nav-link ${activeMenu === 'best' ? 'active' : ''}`} onClick={() => handleMenuClick('best')}>
              Best
            </a>
          </li>
          <li>
            <a href="#snacks" className={`nav-link ${activeMenu === 'makanan' ? 'active' : ''}`} onClick={() => handleMenuClick('makanan')}>
              Makanan
            </a>
          </li>
          <li>
            <a href="#regular" className={`nav-link ${activeMenu === 'minuman' ? 'active' : ''}`} onClick={() => handleMenuClick('minuman')}>
              Minuman
            </a>
          </li>
        </ul>
        <div className="profile-section">
          <div className="action-items">
            <button className="search-btn" onClick={toggleSearchBox}>
              <i className="fas fa-search"></i>
            </button>
            {showSearch && (
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      console.log('Executing search for:', searchQuery);
                    }
                  }}
                />
              </div>
            )}
          </div>
          <img src="/images/profile.png" alt="Profile" className="profile-pic" />
        </div>
      </nav>
    </header>
  );
};
export default Header;
