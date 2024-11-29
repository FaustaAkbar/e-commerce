import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot';
import '../styles/menuPage.css';

const MenuPage = () => {
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const [snackDishes, setSnackDishes] = useState([]);
  const [regularDishes, setRegularDishes] = useState([]);

  const scroll = (direction, sectionId) => {
    const container = document.querySelector(`#${sectionId} .dish-cards`);
    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    } else {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu/');
        const data = await response.json();
        setFavoriteDishes(data.filter(item => item.rating >= 4.8));
        setSnackDishes(data.filter(item => item.category === 'makanan'));
        setRegularDishes(data.filter(item => item.category === 'minuman'));
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <>
      <Header />
      <div className="menu-sections-container">
      <section id="popular" className="makanan">
        <h2>Hidangan <span className="highlight">Terbaik</span> Kami</h2>
        <div className="section-container">
          <div className="dish-cards">
            {favoriteDishes.map(item => <Card key={item.id} item={item} />)}
          </div>
          <button className="scroll-btn left" onClick={() => scroll('left', 'popular')}>❮</button>
          <button className="scroll-btn right" onClick={() => scroll('right', 'popular')}>❯</button>
        </div>
      </section>
      <section id="snacks" className="makanan">
        <h2><span className="highlight">Menu</span> Makanan</h2>
        <div className="section-container">
          <div className="dish-cards">
            {snackDishes.map(item => <Card key={item.id} item={item} />)}
          </div>
          <button className="scroll-btn left" onClick={() => scroll('left', 'snacks')}>❮</button>
          <button className="scroll-btn right" onClick={() => scroll('right', 'snacks')}>❯</button>
        </div>
      </section>
      <section id="regular" className="makanan">
        <h2>Menu <span className="highlight">Minuman</span> Kami</h2>
        <div className="section-container">
          <div className="dish-cards">
            {regularDishes.map(item => <Card key={item.id} item={item} />)}
          </div>
          <button className="scroll-btn left" onClick={() => scroll('left', 'regular')}>❮</button>
          <button className="scroll-btn right" onClick={() => scroll('right', 'regular')}>❯</button>
        </div>
      </section>
      </div>
      <Footer />
      <Chatbot />
    </>
  );
};

export default MenuPage;
