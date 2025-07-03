import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/shared/ui/Breadcrumb';
import CarSidebar from '../../components/business/search/CarSidebar';
import Loading from '../../components/shared/feedback/Loading';
import { startGetSubastaTorres } from '../../store/slices/subastaSlice/thunks';
import { formatoMoneda } from '../../utils/formatoMoneda';
import { genCronometro } from '../../utils/crearCronometro';

const Subastas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Estados del sistema de subastas
  const { subastaTorres, loading } = useSelector((state) => state.subastaReducer);
  
  // Estados locales para la UI
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [filters, setFilters] = useState({});
  const [timers, setTimers] = useState({});

  // Cargar datos al montar el componente
  useEffect(() => {
    // Solo cargar datos si no hay subastas en el store
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

  const toggleFavorite = (carId) => {
    setFavorites(prev => 
      prev.includes(carId) 
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    );
  };

  const handleViewDetails = (torre) => {
    navigate(`/detalles/${torre.torreID}`);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const sortOptions = [
    { value: 'default', label: 'Ordenar por Defecto' },
    { value: 'featured', label: 'Ordenar por Destacados' },
    { value: 'latest', label: 'Ordenar por Más Recientes' },
    { value: 'low-price', label: 'Menor Precio' },
    { value: 'high-price', label: 'Mayor Precio' },
    { value: 'ending-soon', label: 'Terminan Pronto' }
  ];

  // Función para aplicar filtros y ordenamiento
  const getFilteredAndSortedCars = () => {
    let cars = subastaTorres?.torres || [];
    
    // Aplicar filtros si existen
    if (filters.search) {
      cars = cars.filter(car => 
        car.nombre?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'low-price':
        cars = [...cars].sort((a, b) => (a.montoSalida || 0) - (b.montoSalida || 0));
        break;
      case 'high-price':
        cars = [...cars].sort((a, b) => (b.montoSalida || 0) - (a.montoSalida || 0));
        break;
      case 'latest':
        cars = [...cars].sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion));
        break;
      case 'ending-soon':
        cars = [...cars].sort((a, b) => new Date(a.fechaFin) - new Date(b.fechaFin));
        break;
      default:
        // Mantener orden original
        break;
    }

    return cars;
  };

  const filteredCars = getFilteredAndSortedCars();

  if (loading) {
    return (
      <>
        <Breadcrumb title="Subastas de Vehículos" currentPage="Subastas" />
        <Loading message="Cargando subastas..." />
      </>
    );
  }

  return (
    <>
      <Breadcrumb title="Subastas de Vehículos" currentPage="Subastas" />
      
      <div className="car-area py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <CarSidebar onFilterChange={handleFilterChange} />
            </div>
            <div className="col-lg-9">
              <div className="col-md-12">
                <div className="car-sort d-flex justify-content-between align-items-center mb-4">
                  <h5>Mostrando {filteredCars.length} Subastas Activas</h5>
                  <div className="car-sort-box">
                    <select 
                      className="form-select"
                      value={sortBy}
                      onChange={handleSortChange}
                      style={{ minWidth: '200px' }}
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {filteredCars.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-car fa-3x text-muted mb-3"></i>
                  <h4>No hay subastas disponibles</h4>
                  <p className="text-muted">Intenta cambiar los filtros o vuelve más tarde</p>
                </div>
              ) : (
                <>
                  <div className="row">
                    {filteredCars.map((torre) => (
                      <div key={torre.torreID} className="col-lg-6 col-xl-6">
                        <div className="car-item">
                          <div className="car-img pos-rel">
                            <img 
                              src={torre.urlImgPrincipal || '/assets/img/car/01.jpg'} 
                              alt={torre.nombre}
                            />
                            
                            {/* Etiqueta de estado - esquina superior izquierda */}
                            <span className="badge bg-success" style={{
                              position: 'absolute',
                              top: '10px',
                              left: '10px',
                              zIndex: 2
                            }}>
                              <i className="far fa-clock me-1"></i>
                              Activa
                            </span>

                            {/* Etiqueta de tiempo - esquina superior derecha */}
                            {timers[torre.torreID] && (
                              <span className="badge bg-warning text-dark" style={{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                zIndex: 2
                              }}>
                                <i className="far fa-clock me-1"></i>
                                {timers[torre.torreID]}
                              </span>
                            )}
                          </div>
                          
                          <div className="car-content">
                            <div className="car-top">
                              <h4>
                                <a 
                                  href="#" 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleViewDetails(torre);
                                  }}
                                >
                                  {torre.nombre}
                                </a>
                              </h4>
                              <span><i className="fas fa-star"></i> 5.0</span>
                            </div>

                            {/* Información básica del vehículo usando el estilo del template */}
                            <ul className="car-list">
                              {torre.valores && torre.valores.length > 0 ? (
                                torre.valores.slice(0, 5).map((valor, index) => (
                                  <li key={index}>
                                    <i className="far fa-check-circle"></i>
                                    {valor.campo}: {valor.valor}
                                  </li>
                                ))
                              ) : (
                                <>
                                  <li><i className="far fa-car"></i>Modelo: {new Date().getFullYear()}</li>
                                  <li><i className="far fa-user-tie"></i>4 Personas</li>
                                  <li><i className="far fa-gas-pump"></i>Gasolina</li>
                                  <li><i className="far fa-road"></i>10.15km / 1-litro</li>
                                  <li><i className="far fa-steering-wheel"></i>Automático</li>
                                </>
                              )}
                            </ul>
                            
                            <div className="car-footer">
                              <span className="car-price">
                                {torre.montoSalida ? formatoMoneda(torre.montoSalida) : 'Por definir'}
                                <sub> / subasta</sub>
                              </span>
                              <a 
                                href="#" 
                                className={`car-favorite-btn ${favorites.includes(torre.torreID) ? 'active' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleFavorite(torre.torreID);
                                }}
                              >
                                <i className={favorites.includes(torre.torreID) ? "fas fa-heart" : "far fa-heart"}></i>
                              </a>
                              <a 
                                href="#" 
                                className="theme-btn"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleViewDetails(torre);
                                }}
                              >
                                Ver Subasta
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))})
                  </div>

                  {/* Paginación */}
                  <div className="pagination-area">
                    <div aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Previous">
                            <span aria-hidden="true"><i className="far fa-arrow-left"></i></span>
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">1</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">2</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">3</a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Next">
                            <span aria-hidden="true"><i className="far fa-arrow-right"></i></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subastas;