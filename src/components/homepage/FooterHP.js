import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin, faFacebookF, faTwitter, faDribbble } from '@fortawesome/free-brands-svg-icons';

const FooterHP = () => (
  <footer id="footer-section" className=" bg-custom-green text-gray py-8">
    <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {/* Logo and Social Links */}
      <div className="footer-section space-y-4">
        <img src="/images/logo.png" alt="Logo" className="w-32" />
        <p>ZekOrder ©2024 All Rights Reserved</p>
        <p>By - TipuTolo Team</p>
        <h4 className="text-xl font-semibold">Follow Us On</h4>
        <div className="social-icons flex space-x-4">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-xl">
            <FontAwesomeIcon icon={faDribbble} />
          </a>
        </div>
      </div>

      {/* Menu Links */}
      <div className="footer-section space-y-4 ">
        <h3 className="text-xl font-semibold">Menu</h3>
        <a href="#hero-section" className="text-black hover:text-gray-400">
          Home
        </a>
        <a href="#best-served-section" className="text-black hover:text-gray-400">
          Menu
        </a>
        <a href="#footer-section" className="text-black hover:text-gray-400">
          Tentang kami
        </a>
      </div>

      {/* Information Links */}
      <div className="footer-section space-y-4">
        <h3 className="text-xl font-semibold">Information</h3>
        <a href="/menu" className="text-black hover:text-gray-400">
          Menu
        </a>
        <a href="/quality" className="text-black hover:text-gray-400">
          Quality
        </a>
        <a href="/make-a-choice" className="text-black hover:text-gray-400">
          Make A Choice
        </a>
        <a href="/fast-delivery" className="text-black hover:text-gray-400">
          Fast Delivery
        </a>
      </div>

      {/* Contact Info */}
      <div className="footer-section space-y-4">
        <h3 className="text-xl font-semibold">Contact</h3>
        <p className="text-black">+123456789</p>
        <p className="text-black">ZekOrder.com</p>
        <p className="text-black">Mcd Podomoro, Bandung</p>
      </div>
    </div>
  </footer>
);

export default FooterHP;
