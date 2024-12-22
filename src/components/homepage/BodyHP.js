import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BodyHP = () => {
  const [topDishes, setTopDishes] = useState([]);

  useEffect(() => {
    const fetchTopDishes = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/menu/');
        const data = await response.json();

        const filteredDishes = data
          .filter((item) => item.rating >= 4.8)
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
    <>
      {/* Hero Section */}
      <section id="hero-section" className="hero-section bg-custom-green p-20">
        <div className="hero-content flex flex-col md:flex-row justify-between items-center mt-20">
          <div className="text-content md:flex-row">
            <h1 className="text-green-600 font-bold text-4xl mb-4">
              Gizi Terjaga,{' '}
              <span className="text-black">
                Harga Bersahabat, <span className="text-green-600 whitespace-nowrap">Enak di Lidah</span>
              </span>
              <br />
              <span className="text-black">Rasa Tak Terlupa</span>
            </h1>
            <a href="/menuPage" className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 mt-4 inline-block">
              Order Now
            </a>
          </div>
          <div className="image-content md:flex-row flex justify-end">
            <img src="/images/food.png" alt="Delicious Food" className="w-[450px] rounded-full ml-auto" />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="feature-section flex justify-around bg-gray-50 py-10">
        <div className="feature-card text-center">
          <img src="/images/fastdeliv.png" alt="Fast Delivery Icon" className="w-16 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Fast Delivery</h3>
          <p>Promise to deliver within 30 mins</p>
        </div>
        <div className="feature-card text-center">
          <img src="/images/fresh.png" alt="Fresh Food Icon" className="w-16 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Fresh Food</h3>
          <p>Your food will be delivered 100% fresh</p>
        </div>
        <div className="feature-card text-center">
          <img src="/images/box.png" alt="Free Delivery Icon" className="w-16 mx-auto mb-2" />
          <h3 className="text-lg font-semibold">Free Delivery</h3>
          <p>No cost, just order now!</p>
        </div>
      </section>

      {/* Best Dishes Section */}
      <section id="best-served-section" className="best-served-section bg-light-gray py-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">
            Hidangan <span className="text-green-600">Terbaik</span> Warkop Kami
          </h2>
          <p className="text-gray-600 mt-5">Ini bukan hanya tentang makanan lezat, ini adalah pengalaman.</p>
        </div>
        <div className="dish-items grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {topDishes.length > 0 ? (
            topDishes.map((dish) => (
              <div key={dish._id} className="dish-card border p-4 rounded-lg text-center">
                <img src={dish.image} alt={dish.name} className="w-32 h-32 mx-auto mb-3 rounded-full" />
                <h4 className="text-lg font-semibold">{dish.name}</h4>
                <a href={`/checkout/${dish._id}`} className="text-green-600 mt-2 inline-block">
                  Order Now &gt;
                </a>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">No dishes available at the moment.</p>
          )}
        </div>
        <div className="text-center mt-6">
          <Link to="/MenuPage" className="btn btn-secondary">
            See All Menu
          </Link>
        </div>
      </section>
    </>
  );
};

export default BodyHP;
