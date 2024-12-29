import { useEffect, useState } from 'react';
import Card from '../components/menuPage/Card';
import Header from '../components/menuPage/Header';
import Footer from '../components/menuPage/Footer';
import Chatbot from '../components/menuPage/Chatbot';

const MenuPage = () => {
  const [favoriteDishes, setFavoriteDishes] = useState([]);
  const [snackDishes, setSnackDishes] = useState([]);
  const [regularDishes, setRegularDishes] = useState([]);
  const scroll = (direction, sectionId) => {
    const container = document.querySelector(`#${sectionId} .dish-cards`);
    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu');
        const data = await response.json();
        console.log('Fetched Data:', data);
        const makanan = data.filter((item) => item.category === 'Makanan');
        const minuman = data.filter((item) => item.category === 'Minuman');
        setFavoriteDishes(data.filter((item) => item.isBest));
        setSnackDishes(makanan);
        setRegularDishes(minuman);
        console.log('Snack Dishes:', makanan);
        console.log('Regular Dishes:', minuman);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      }
    };
    fetchMenu();
  }, []);
  return (
    <>
      {' '}
      <Header />{' '}
      <div className="menu-sections-container">
        {' '}
        {/* Popular Dishes Section */}{' '}
        <section id="popular" className="makanan pt-24 pb-8 px-4">
          {' '}
          <h2 className="text-2xl font-semibold mb-4">
            {' '}
            Hidangan <span className="text-green-500 font-bold">Terbaik</span> Kami{' '}
          </h2>{' '}
          <div className="section-container relative">
            {' '}
            <div className="dish-cards flex overflow-x-auto space-x-4">
              {' '}
              {favoriteDishes.map((item) => (
                <Card key={item._id} item={item} />
              ))}{' '}
            </div>{' '}
            {/* Scroll Buttons */}{' '}
            <div className="scroll-buttons flex justify-center space-x-4 mt-4">
              {' '}
              <button className="scroll-btn bg-green-500 text-white rounded-full p-2" onClick={() => scroll('left', 'popular')}>
                {' '}
                ❮{' '}
              </button>{' '}
              <button className="scroll-btn bg-green-500 text-white rounded-full p-2" onClick={() => scroll('right', 'popular')}>
                {' '}
                ❯{' '}
              </button>{' '}
            </div>{' '}
          </div>{' '}
        </section>{' '}
        {/* Snacks Section */}{' '}
        <section id="snacks" className="makanan pt-24 pb-8 px-4">
          {' '}
          <h2 className="text-2xl font-semibold mb-4">
            {' '}
            <span className="text-green-500 font-bold">Menu</span> Makanan{' '}
          </h2>{' '}
          <div className="section-container relative">
            {' '}
            <div className="dish-cards flex overflow-x-auto space-x-4">
              {' '}
              {snackDishes.map((item) => (
                <Card key={item._id} item={item} />
              ))}{' '}
            </div>{' '}
            {/* Scroll Buttons */}{' '}
            <div className="scroll-buttons flex justify-center space-x-4 mt-4">
              {' '}
              <button className="scroll-btn bg-green-500 text-white rounded-full p-2" onClick={() => scroll('left', 'snacks')}>
                {' '}
                ❮{' '}
              </button>{' '}
              <button className="scroll-btn bg-green-500 text-white rounded-full p-2" onClick={() => scroll('right', 'snacks')}>
                {' '}
                ❯{' '}
              </button>{' '}
            </div>{' '}
          </div>{' '}
        </section>{' '}
        {/* Regular Dishes Section */}{' '}
        <section id="regular" className="makanan pt-24 pb-8 px-4">
          {' '}
          <h2 className="text-2xl font-semibold mb-4">
            {' '}
            Menu <span className="text-green-500 font-bold">Minuman</span> Kami{' '}
          </h2>{' '}
          <div className="section-container relative">
            {' '}
            <div className="dish-cards flex overflow-x-auto space-x-4">
              {' '}
              {regularDishes.map((item) => (
                <Card key={item._id} item={item} />
              ))}{' '}
            </div>{' '}
            {/* Scroll Buttons */}{' '}
            <div className="scroll-buttons flex justify-center space-x-4 mt-4">
              {' '}
              <button className="scroll-btn bg-green-500 text-white rounded-full p-2" onClick={() => scroll('left', 'regular')}>
                {' '}
                ❮{' '}
              </button>{' '}
              <button className="scroll-btn bg-green-500 text-white rounded-full p-2" onClick={() => scroll('right', 'regular')}>
                {' '}
                ❯{' '}
              </button>{' '}
            </div>{' '}
          </div>{' '}
        </section>{' '}
      </div>{' '}
      <Footer /> <Chatbot />{' '}
    </>
  );
};
export default MenuPage;
