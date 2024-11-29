import '../styles/homePage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faInstagram, 
  faLinkedin, 
  faFacebookF, 
  faTwitter, 
  faDribbble 
} from '@fortawesome/free-brands-svg-icons';

const FooterHP = () => (
  <footer id="footer-section">
    <div className="footer-content">
      <div className="footer-section">
        <img src="/images/logo.png" alt="Logo" className="logo-image" />
        <p>ZekOrder ©2024 All Rights Reserved</p>
        <p>By - TipuTolo Team</p>
        <h4>Follow Us On</h4>
        <div className="social-icons">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faDribbble} />
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h3>Menu</h3>
        <a href="#home">Home</a>
        <a href="#best-served-section">Menu</a>
        <a href="#footer-section">Tentang kami</a>
      </div>
      <div className="footer-section">
        <h3>Information</h3>
        <a href="/menu">Menu</a>
        <a href="/quality">Quality</a>
        <a href="/make-a-choice">Make A Choice</a>
        <a href="/fast-delivery">Fast Delivery</a>
      </div>
      <div className="footer-section">
        <h3>Contact</h3>
        <p>+123456789</p>
        <p>ZekOrder.com</p>
        <p>Mcd Podomoro, Bandung</p>
      </div>
    </div>
  </footer>
);

export default FooterHP;
