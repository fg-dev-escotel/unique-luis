import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/ui/Breadcrumb';
import CarSidebar from '../components/ui/CarSidebar';
import Loading from '../components/Loading';
import { startGetSubastaTorres } from '../store/slices/subastaSlice/thunks';
import { formatoMoneda } from '../utils/formatoMoneda';
import { genCronometro } from '../utils/crearCronometro';

const Cars = () => {
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
    dispatch(startGetSubastaTorres('1-250616'));
  }, [dispatch]);

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
                      <div key={torre.torreID} className="col-lg-6 col-xl-6 mb-4">
                        <div className="car-item border rounded overflow-hidden shadow-sm">
                          <div className="car-img position-relative">
                            <img 
                              src={torre.urlImgPrincipal || '/assets/img/car/default.jpg'} 
                              alt={torre.nombre}
                              style={{ 
                                width: '100%', 
                                height: '250px', 
                                objectFit: 'cover' 
                              }}
                            />
                            
                            {/* Badge de estado de subasta */}
                            <div className="position-absolute top-0 start-0 m-2">
                              <span className="badge bg-success">
                                <i className="far fa-clock me-1"></i>
                                Activa
                              </span>
                            </div>

                            {/* Cronómetro */}
                            {timers[torre.torreID] && (
                              <div className="position-absolute bottom-0 end-0 m-2">
                                <span className="badge bg-warning text-dark">
                                  <i className="far fa-clock me-1"></i>
                                  {timers[torre.torreID]}
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="car-content p-3">
                            <div className="car-top d-flex justify-content-between align-items-start mb-2">
                              <h4 className="mb-0">
                                <a 
                                  href="#" 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleViewDetails(torre);
                                  }}
                                  className="text-decoration-none"
                                >
                                  {torre.nombre}
                                </a>
                              </h4>
                              <button 
                                className={`btn btn-sm ${favorites.includes(torre.torreID) ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={() => toggleFavorite(torre.torreID)}
                              >
                                <i className={favorites.includes(torre.torreID) ? "fas fa-heart" : "far fa-heart"}></i>
                              </button>
                            </div>

                            {/* Información básica del vehículo */}
                            {torre.valores && torre.valores.length > 0 && (
                              <ul className="list-unstyled car-list small text-muted mb-3">
                                {torre.valores.slice(0, 4).map((valor, index) => (
                                  <li key={index} className="d-flex justify-content-between">
                                    <span><i className="far fa-check-circle me-1"></i>{valor.campo}:</span>
                                    <span>{valor.valor}</span>
                                  </li>
                                ))}
                              </ul>
                            )}

                            {/* Descripción truncada */}
                            {torre.descripcion && (
                              <p className="text-muted small mb-3" style={{ 
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}>
                                {torre.descripcion}
                              </p>
                            )}
                            
                            <div className="car-footer d-flex justify-content-between align-items-center">
                              <div>
                                <small className="text-muted d-block">Precio de Salida</small>
                                <span className="fw-bold text-primary fs-5">
                                  {torre.montoSalida ? formatoMoneda(torre.montoSalida) : 'Por definir'}
                                </span>
                              </div>
                              
                              <button 
                                className="btn btn-primary"
                                onClick={() => handleViewDetails(torre)}
                              >
                                Ver Subasta
                              </button>
                            </div>

                            {/* Información de fecha fin */}
                            {torre.fechaFin && (
                              <div className="mt-2 pt-2 border-top">
                                <small className="text-muted">
                                  <i className="far fa-calendar me-1"></i>
                                  Termina: {new Date(torre.fechaFin).toLocaleDateString('es-ES', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Paginación */}
                  <div className="pagination-area mt-4">
                    <nav aria-label="Navegación de páginas">
                      <ul className="pagination justify-content-center">
                        <li className="page-item">
                          <a className="page-link" href="#" aria-label="Anterior">
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
                          <a className="page-link" href="#" aria-label="Siguiente">
                            <span aria-hidden="true"><i className="far fa-arrow-right"></i></span>
                          </a>
                        </li>
                      </ul>
                    </nav>
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

export default Cars;