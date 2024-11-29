import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import HeaderHP from '../components/HeaderHP';
import FooterHP from '../components/FooterHP';
import '../styles/homePage.css';

const HomePage = () => {
  const [topDishes, setTopDishes] = useState([]);

  useEffect(() => {
    const fetchTopDishes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu/');
        const data = await response.json();

        // Filter dan urutkan data hidangan
        const filteredDishes = data
          .filter(item => item.rating >= 4.8)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);

        setTopDishes(filteredDishes);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    };

    fetchTopDishes();
  }, []);

  return (
    <div>
      <HeaderHP />
      <section id="hero-section"className="hero-section">
        <div className="hero-text">
          <h1>
            Gizi Terjaga, <span>Harga Bersahabat,</span> Enak di lidah <span>Rasa Tak Terlupa</span>
          </h1>
          <div className="hero-buttons">
            <a href="/menuPage" className="btn-order-now">Pesan Sekarang</a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/Food.png" alt="Delicious Food" />
        </div>
      </section>

      <section className="feature-section">
        <div className="feature">
          <img src="/images/fastdeliv.png" alt="Fast Delivery Icon" />
          <h3>Pengiriman Cepat</h3>
          <p>Pengiriman dalam waktu 30 menit</p>
        </div>
        <div className="feature">
          <img src="/images/fresh.png" alt="Fresh Food Icon" />
          <h3>Makanan Segar</h3>
          <p>Makanan Anda dipastikan 100% segar</p>
        </div>
        <div className="feature">
          <img src="/images/box.png" alt="Free Delivery Icon" />
          <h3>Pengiriman Gratis</h3>
          <p>Pengiriman gratis. Tanpa biaya, pesan Sekarang!</p>
        </div>
      </section>

      <section id="best-served-section" className="best-served-section">
        <h2>Hidangan <span className="highlight">Terbaik</span> Warkop Kami</h2>
        <p className="description">
          Ini Bukan Hanya Tentang Memberikan Anda Makanan Lezat Dari Restoran, Kami Memberikan Anda Pengalaman
        </p>
        <div className="dish-items">
          {topDishes.length > 0 ? (
            topDishes.map((dish, index) => (
              <div key={dish._id || index} className="dish-item">
                <div className="dish-image-wrapper">
                  <img src={dish.image} alt={dish.name} />
                </div>
                <p className="dish-name">{dish.name}</p>
                <a href={`/checkout/${dish._id}`} className="order-link">Order Now &gt;</a>
              </div>
            ))
          ) : (
            <p>No dishes available at the moment.</p>
          )}
        </div>
        <Link to="/MenuPage" className="see-all-menu">See All Menu</Link>
      </section>
      <FooterHP />
    </div>
  );
};

export default HomePage;
