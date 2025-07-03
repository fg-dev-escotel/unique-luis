import React from 'react';

const CarArea = () => {
  const featuredCars = [
    {
      id: 1,
      name: 'Toyota Sports Car',
      image: 'assets/img/car/01.jpg',
      price: '$390',
      priceUnit: '/ month',
      rating: '5.0',
      year: '2020',
      people: '4 People',
      fuel: 'Hybrid',
      efficiency: '10.15km / 1-litre',
      transmission: 'Automatic'
    },
    {
      id: 2,
      name: 'Bmw E46 Car',
      image: 'assets/img/car/02.jpg',
      price: '$390',
      priceUnit: '/ month',
      rating: '5.0',
      year: '2020',
      people: '4 People',
      fuel: 'Hybrid',
      efficiency: '10.15km / 1-litre',
      transmission: 'Automatic'
    },
    {
      id: 3,
      name: 'Mercedes Benz Car',
      image: 'assets/img/car/03.jpg',
      price: '$390',
      priceUnit: '/ month',
      rating: '5.0',
      year: '2020',
      people: '4 People',
      fuel: 'Hybrid',
      efficiency: '10.15km / 1-litre',
      transmission: 'Automatic'
    }
  ];

  return (
    <div className="car-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Vehículos</span>
              <h2 className="site-title">Vehículos <span>Destacados</span></h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {featuredCars.map((car) => (
            <div key={car.id} className="col-lg-4 col-md-6">
              <div className="car-item">
                <div className="car-img">
                  <img src={car.image} alt={car.name} />
                </div>
                <div className="car-content">
                  <div className="car-top">
                    <h4><a href={`/detalles/${car.id}`}>{car.name}</a></h4>
                    <span><i className="fas fa-star"></i> {car.rating}</span>
                  </div>
                  <ul className="car-list">
                    <li><i className="far fa-car"></i>Model: {car.year}</li>
                    <li><i className="far fa-user-tie"></i>{car.people}</li>
                    <li><i className="far fa-gas-pump"></i>{car.fuel}</li>
                    <li><i className="far fa-road"></i>{car.efficiency}</li>
                    <li><i className="far fa-steering-wheel"></i>{car.transmission}</li>
                  </ul>
                  <div className="car-footer">
                    <span className="car-price">{car.price} <sub>{car.priceUnit}</sub></span>
                    <a href="#" className="car-favorite-btn"><i className="far fa-heart"></i></a>
                    <a href={`/detalles/${car.id}`} className="theme-btn">Rent Now</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center">
            <a href="/cars" className="theme-btn">
              Ver Todas las Subastas <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarArea;