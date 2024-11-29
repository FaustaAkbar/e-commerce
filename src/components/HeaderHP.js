import { useState } from 'react';
import '../styles/homePage.css';

const HeaderHP = () => {
  const [activeMenu, setActiveMenu] = useState('home'); // Menyimpan menu yang aktif
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearchBox = () => {
    setShowSearch(!showSearch); // Toggle visibility of the search box
  };

  const toggleNav = () => {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Update active menu on click
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo-container">
          <button className="bars-icon" onClick={toggleNav}>
            <i className="fas fa-bars"></i>
          </button>
          <img src="/images/logo.png" alt="Logo" className="logo-image" />
        </div>
        <ul className="nav-links" id="nav-links">
          <li>
            <a
              href="#hero-section"
              className={`nav-link ${activeMenu === 'home' ? 'active' : ''}`}
              onClick={() => handleMenuClick('home')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#best-served-section"
              className={`nav-link ${activeMenu === 'menu' ? 'active' : ''}`}
              onClick={() => handleMenuClick('menu')}
            >
              Menu
            </a>
          </li>
          <li>
            <a
              href="#footer-section"
              className={`nav-link ${activeMenu === 'tentangkami' ? 'active' : ''}`}
              onClick={() => handleMenuClick('tentangkami')}
            >
              Tentang Kami
            </a>
          </li>
        </ul>
        <div className="profile-section">
          <button className="search-btn" onClick={toggleSearchBox}>
            <i className="fas fa-search"></i>
          </button>
          {showSearch && (
            <div id="search-box" className="search-box" style={{ opacity: 1 }}>
              <input type="text" placeholder="Search..." />
            </div>
          )}
          <img src="/images/profile.png" alt="Profile" className="profile-pic" />
        </div>
      </nav>
    </header>
  );
};

export default HeaderHP;
