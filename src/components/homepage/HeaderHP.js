import { useState, useEffect } from 'react';
import { auth } from '../../service/firebaseConfig'; // Pastikan untuk mengimpor Firebase Auth
import { onAuthStateChanged, signOut } from 'firebase/auth'; // Fungsi untuk menangani autentikasi

const HeaderHP = () => {
  const [activeMenu, setActiveMenu] = useState('home');
  const [user, setUser] = useState(null); // Menyimpan data pengguna yang sedang login
  const [showLogoutMenu, setShowLogoutMenu] = useState(false); // State untuk menu logout

  // Toggle menu logout
  const toggleLogoutMenu = () => {
    setShowLogoutMenu(!showLogoutMenu);
  };

  // Fungsi logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Reset state user setelah logout
        alert('Anda telah logout'); // Pesan notifikasi
        window.location.href = '/'; // Redirect ke halaman login
      })
      .catch((error) => {
        console.error('Error saat logout:', error);
      });
  };

  // Hook untuk memantau status autentikasi pengguna
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set pengguna yang login
      } else {
        setUser(null); // Set null jika tidak ada pengguna
      }
    });

    return () => unsubscribe(); // Bersihkan listener saat komponen unmount
  }, []);

  return (
    <header className="w-full bg-white h-16">
      <nav className="flex justify-between items-center align-middle">
        <div className="logo-container flex items-center">
          <button className="bars-icon" onClick={() => document.getElementById('nav-links').classList.toggle('active')}>
            <i className="fas fa-bars"></i>
          </button>
          <img src="/images/logo.png" alt="Logo" className="logo-image h-8 ml-2" />
        </div>

        {/* Navigasi Menu */}
        <ul className="nav-links flex space-x-7 text-2xl font-bold flex-wrap">
          <li>
            <a href="#hero-section" className={`nav-link transition-colors duration-300 text-white${activeMenu === 'home' ? 'text-red' : 'text-white hover:text-green-600'}`} onClick={() => setActiveMenu('home')}>
              Home
            </a>
          </li>
          <li>
            <a href="#best-served-section" className={`nav-link transition-colors duration-300 ${activeMenu === 'menu' ? 'text-yellow' : 'text-white hover:text-green-600'}`} onClick={() => setActiveMenu('menu')}>
              Menu
            </a>
          </li>
          <li>
            <a href="#footer-section" className={`nav-link transition-colors duration-300 ${activeMenu === 'tentangkami' ? 'text-green' : 'text-white hover:text-green-600'}`} onClick={() => setActiveMenu('tentangkami')}>
              Tentang Kami
            </a>
          </li>
        </ul>

        {/* Profil Pengguna */}
        <div className="relative profile-section flex items-center space-x-4">
          {user ? (
            <div className="user-info flex items-center space-x-2 cursor-pointer" onClick={toggleLogoutMenu}>
              <span className="welcome-text text-gray-800 text-lg font-bold">Hallo, </span>
              <span className="username text-red-600 text-md font-mono">{user.displayName || 'User'}</span>
              <img src={user.photoURL || '/images/profile.png'} alt="Profile" className="profile-pic w-12 h-12 rounded-full object-cover border-2 border-gray-300" />
            </div>
          ) : (
            <img src="/images/profile.png" alt="Profile" className="profile-pic w-12 h-12 rounded-full object-cover border-2 border-gray-300" />
          )}

          {/* Menu Logout */}
          {showLogoutMenu && (
            <div className="absolute top-full right-0 mt-2 bg-white shadow-lg border rounded z-50">
              <button className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 w-full text-sm rounded" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderHP;
