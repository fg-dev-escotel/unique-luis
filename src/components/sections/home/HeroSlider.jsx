import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGetSubastaTorres } from '../../../store/slices/subastaSlice/thunks';
import { genCronometro } from '../../../utils/crearCronometro';

const HeroSlider = () => {
  const dispatch = useDispatch();
  const { subastaTorres, loading } = useSelector((state) => state.subastaReducer);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timers, setTimers] = useState({});

  // Cargar datos de subastas
  useEffect(() => {
    if (!subastaTorres?.torres?.length) {
      dispatch(startGetSubastaTorres('1-250616'));
    }
  }, [dispatch, subastaTorres]);

  // Actualizar cronómetros cada segundo
  useEffect(() => {
    if (subastaTorres?.torres?.length > 0) {
      const interval = setInterval(() => {
        const newTimers = {};
        subastaTorres.torres.forEach(torre => {
          if (torre.fechaFin) {
            newTimers[torre.torreID] = genCronometro(torre.fechaFin);
          }
        });
        setTimers(newTimers);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [subastaTorres]);

  // Auto-advance slider
  useEffect(() => {
    if (subastaTorres?.torres?.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => 
          prev === subastaTorres.torres.length - 1 ? 0 : prev + 1
        );
      }, 5000); // Cambiar cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [subastaTorres?.torres?.length]);

  const getImageUrl = (torre) => {
    // Usar imagen principal o primera imagen disponible
    if (torre.urlImgPrincipal) {
      return torre.urlImgPrincipal;
    }
    
    // Si hay imágenes en array, usar la primera
    if (torre.imagenes && torre.imagenes.length > 0) {
      const firstImage = torre.imagenes[0];
      if (typeof firstImage === 'string') {
        return firstImage;
      } else if (typeof firstImage === 'object') {
        return firstImage.url || firstImage.src || firstImage.urlImagen || firstImage.path;
      }
    }
    
    // Imagen por defecto
    return '/assets/img/car/01.jpg';
  };

  const nextSlide = () => {
    if (subastaTorres?.torres?.length > 0) {
      setCurrentSlide(prev => 
        prev === subastaTorres.torres.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (subastaTorres?.torres?.length > 0) {
      setCurrentSlide(prev => 
        prev === 0 ? subastaTorres.torres.length - 1 : prev - 1
      );
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Si está cargando o no hay datos, mostrar slider por defecto
  if (loading || !subastaTorres?.torres?.length) {
    return (
      <div className="hero-area">
        <div className="hero-slider">
          <div className="hero-single" style={{
            background: 'linear-gradient(rgba(24, 29, 56, .7), rgba(24, 29, 56, .7)), url(/assets/img/slider/hero-1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center'
          }}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6 col-xl-7">
                  <div className="hero-content">
                    <h6 className="hero-sub-title">
                      Bienvenido a Unique Motors
                    </h6>
                    <h1 className="hero-title">
                      Encuentra el <span>Vehículo</span> Perfecto en Nuestras Subastas
                    </h1>
                    <p>
                      Descubre una amplia selección de vehículos de calidad en nuestras subastas en línea. 
                      Ofertas transparentes, procesos seguros y los mejores precios del mercado.
                    </p>
                    <div className="hero-btn">
                      <Link to="/cars" className="theme-btn">
                        Ver Subastas<i className="fas fa-arrow-right"></i>
                      </Link>
                      <Link to="/about" className="theme-btn theme-btn2">
                        Conoce Más<i className="fas fa-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentTorre = subastaTorres.torres[currentSlide];
  const currentTimer = timers[currentTorre?.torreID] || 'Calculando...';

  return (
    <div className="hero-area">
      <div className="hero-slider position-relative">
        {/* Slide actual */}
        <div className="hero-single" style={{
          background: `linear-gradient(rgba(24, 29, 56, .6), rgba(24, 29, 56, .6)), url(${getImageUrl(currentTorre)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.5s ease-in-out'
        }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-8 col-xl-8">
                <div className="hero-content">
                  <h6 className="hero-sub-title text-white">
                    Subasta en Vivo
                  </h6>
                  <h1 className="hero-title text-white mb-3">
                    {currentTorre?.nombre || 'Ferrari Testarossa GT540'}
                  </h1>
                  <div className="hero-countdown mb-4">
                    <h3 className="text-warning">
                      Termina en: {currentTimer}
                    </h3>
                  </div>
                  <div className="hero-btn">
                    <Link to={`/detalles/${currentTorre?.torreID}`} className="theme-btn">
                      Ver Detalles<i className="fas fa-arrow-right"></i>
                    </Link>
                    <Link to="/cars" className="theme-btn theme-btn2">
                      Todas las Subastas<i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controles de navegación */}
        {subastaTorres.torres.length > 1 && (
          <>
            {/* Botones anterior/siguiente */}
            <button 
              className="hero-nav hero-nav-prev"
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(79, 93, 236, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                color: 'white',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(79, 93, 236, 1)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(79, 93, 236, 0.8)'}
            >
              <i className="fas fa-chevron-left"></i>
            </button>

            <button 
              className="hero-nav hero-nav-next"
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(79, 93, 236, 0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                color: 'white',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(79, 93, 236, 1)'}
              onMouseOut={(e) => e.target.style.background = 'rgba(79, 93, 236, 0.8)'}
            >
              <i className="fas fa-chevron-right"></i>
            </button>

            {/* Indicadores */}
            <div className="hero-indicators" style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '10px',
              zIndex: 10
            }}>
              {subastaTorres.torres.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    border: '2px solid white',
                    background: index === currentSlide ? 'white' : 'transparent',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </>
        )}

        {/* Información adicional de la subasta */}
        <div className="hero-info" style={{
          position: 'absolute',
          bottom: '80px',
          right: '30px',
          background: 'rgba(0, 0, 0, 0.7)',
          padding: '15px 20px',
          borderRadius: '8px',
          color: 'white',
          zIndex: 10
        }}>
          <div className="text-center">
            <small>Subastas Activas</small>
            <h4 className="mb-0">{subastaTorres.torres.length}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;