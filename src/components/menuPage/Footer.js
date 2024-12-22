import '../../styles/menuPage.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2 className="footer-logo">
          <img src="/images/ZexOrder.png" alt="Zek Order" />
        </h2>
        <p>ZekOrder ©2024 All Rights Reserved</p>
      </div>
      <div className="footer-right">
        <div className="social-icons">
          <a href="https://www.instagram.com">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.facebook.com">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.twitter.com">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <p>By - TipuTolo Team</p>
      </div>
    </footer>
  );
};
export default Footer;
