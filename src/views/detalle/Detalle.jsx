import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '../../components/shared/ui/Breadcrumb';
import Loading from '../../components/shared/feedback/Loading';
import { formatoMoneda } from '../../utils/formatoMoneda';
import { genCronometro } from '../../utils/crearCronometro';
import { startGetSubastaTorre, startPuja, startSetPujaMayor } from '../../store/slices/subastaSlice/thunks';

const Detalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Estados del Redux
  const { subastaTorre, loading, pujaMayor, pujaMartillo } = useSelector((state) => state.subastaReducer);
  const { user, logged } = useSelector((state) => state.userReducer);
  
  // Estados locales
  const [timer, setTimer] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [pujaAmount, setPujaAmount] = useState('');
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidHistory, setBidHistory] = useState([]);
  const [suggestedBids, setSuggestedBids] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [imageErrorIndex, setImageErrorIndex] = useState(-1);

  // Cargar datos del vehículo
  useEffect(() => {
    if (id) {
      console.log('Cargando detalle para ID:', id);
      dispatch(startGetSubastaTorre(id));
    }
  }, [dispatch, id]);

  // Debug para ver qué datos llegan
  useEffect(() => {
    if (subastaTorre) {
      console.log('Datos de subastaTorre:', subastaTorre);
      console.log('URL imagen principal:', subastaTorre.urlImgPrincipal);
      console.log('Array de imágenes raw:', subastaTorre.imagenes);
      if (subastaTorre.imagenes && subastaTorre.imagenes.length > 0) {
        console.log('Primera imagen objeto:', subastaTorre.imagenes[0]);
        console.log('Claves del objeto imagen:', Object.keys(subastaTorre.imagenes[0]));
      }
    }
  }, [subastaTorre]);

  // Generar pujas sugeridas cuando cambie el monto mayor
  useEffect(() => {
    if (subastaTorre?.montoSalida || pujaMayor?.monto) {
      const currentAmount = pujaMayor?.monto || subastaTorre?.montoSalida || 0;
      const increments = [500, 1000, 2500, 5000];
      const suggestions = increments.map(inc => currentAmount + inc);
      setSuggestedBids(suggestions);
      setPujaAmount(suggestions[0].toString());
    }
  }, [subastaTorre, pujaMayor]);

  // Actualizar cronómetro
  useEffect(() => {
    if (subastaTorre?.fechaFin) {
      const interval = setInterval(() => {
        setTimer(genCronometro(subastaTorre.fechaFin));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [subastaTorre]);

  // Simular historial de pujas
  useEffect(() => {
    if (subastaTorre?.torreID) {
      // Simular algunas pujas para demostración
      setBidHistory([
        {
          id: 1,
          usuario: 'Usuario123',
          monto: (pujaMayor?.monto || subastaTorre?.montoSalida || 15000) - 1000,
          fecha: new Date(Date.now() - 60000 * 30)
        },
        {
          id: 2,
          usuario: 'CompraVentas24',
          monto: (pujaMayor?.monto || subastaTorre?.montoSalida || 15000) - 2000,
          fecha: new Date(Date.now() - 60000 * 45)
        },
        {
          id: 3,
          usuario: 'AutoCollector',
          monto: (pujaMayor?.monto || subastaTorre?.montoSalida || 15000) - 3500,
          fecha: new Date(Date.now() - 60000 * 60)
        }
      ]);
    }
  }, [subastaTorre, pujaMayor]);

  const toggleFavorite = () => {
    setFavorite(!favorite);
  };

  const handleBid = async () => {
    if (!logged) {
      alert('Debes iniciar sesión para hacer una puja');
      return;
    }

    const amount = parseFloat(pujaAmount);
    const currentMax = pujaMayor?.monto || subastaTorre?.montoSalida || 0;
    
    if (amount <= currentMax) {
      alert(`La puja debe ser mayor a ${formatoMoneda(currentMax)}`);
      return;
    }

    try {
      const puja = {
        torreID: id,
        monto: amount,
        usuario: user?.nombre || 'Usuario Anónimo'
      };
      
      await dispatch(startPuja(puja));
      dispatch(startSetPujaMayor(amount, user?.nombre || 'Usuario Anónimo'));
      
      // Agregar la puja al historial local
      setBidHistory(prev => [{
        id: Date.now(),
        usuario: user?.nombre || 'Usuario Anónimo',
        monto: amount,
        fecha: new Date()
      }, ...prev]);
      
      setShowBidForm(false);
      alert('¡Puja realizada con éxito!');
    } catch (error) {
      alert('Error al realizar la puja. Intenta nuevamente.');
    }
  };

  const handleSuggestedBid = (amount) => {
    setPujaAmount(amount.toString());
  };

  const handleImageError = () => {
    console.log('Error cargando imagen principal, usando imagen por defecto');
    setImageError(true);
    setImageErrorIndex(selectedImage);
  };

  const handleImageLoad = () => {
    if (imageErrorIndex === selectedImage) {
      setImageError(false);
      setImageErrorIndex(-1);
    }
  };

  if (loading) {
    return (
      <>
        <Breadcrumb title="Detalle de Vehículo" currentPage="Detalle" />
        <Loading message="Cargando detalle..." />
      </>
    );
  }

  if (!subastaTorre || (!subastaTorre.torreID && !subastaTorre.nombre)) {
    return (
      <>
        <Breadcrumb title="Detalle de Vehículo" currentPage="Detalle" />
        <div className="car-area py-120">
          <div className="container">
            <div className="text-center py-5">
              <i className="fas fa-exclamation-triangle fa-3x text-muted mb-3"></i>
              <h4>Vehículo no encontrado</h4>
              <p className="text-muted">El vehículo que buscas no existe o ha sido removido</p>
              <p className="text-muted small">ID buscado: {id}</p>
              <p className="text-muted small">Datos recibidos: {JSON.stringify(subastaTorre, null, 2)}</p>
              <a href="#" className="theme-btn" onClick={(e) => { e.preventDefault(); navigate('/cars'); }}>
                Volver a Subastas <i className="far fa-arrow-left"></i>
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Crear galería de imágenes (usar imagen principal si no hay más)
  const getImages = () => {
    const images = [];
    
    // Agregar imagen principal si existe
    if (subastaTorre.urlImgPrincipal) {
      images.push(subastaTorre.urlImgPrincipal);
    }
    
    // Agregar imágenes adicionales si existen
    if (subastaTorre.imagenes && Array.isArray(subastaTorre.imagenes)) {
      subastaTorre.imagenes.forEach(img => {
        let imageUrl = null;
        
        // Si es un string, usarlo directamente
        if (typeof img === 'string') {
          imageUrl = img;
        }
        // Si es un objeto, buscar la propiedad que contiene la URL
        else if (typeof img === 'object' && img !== null) {
          // Intentar diferentes nombres de propiedades comunes
          imageUrl = img.url || img.src || img.urlImagen || img.path || img.imagen || img.uri || img.href;
          
          // Si no encuentra ninguna, usar el primer valor que sea string
          if (!imageUrl) {
            const values = Object.values(img);
            imageUrl = values.find(val => typeof val === 'string' && val.includes('http'));
          }
        }
        
        // Agregar la URL si es válida y no es duplicada
        if (imageUrl && imageUrl !== subastaTorre.urlImgPrincipal && !images.includes(imageUrl)) {
          images.push(imageUrl);
        }
      });
    }
    
    // Si no hay imágenes, usar imagen por defecto
    if (images.length === 0) {
      images.push('/assets/img/car/01.jpg');
    }
    
    console.log('Imágenes procesadas:', images.length, 'imágenes');
    return images;
  };

  const images = getImages();

  return (
    <>
      <Breadcrumb title="Detalle de Vehículo" currentPage="Detalle" />
      
      
      <div className="car-area py-120">
        <div className="container">
          <div className="row">
            {/* Columna principal - Imágenes y descripción */}
            <div className="col-lg-8">
              <div className="car-item">
                <div className="car-img pos-rel">
                  <img 
                    src={imageError ? '/assets/img/car/01.jpg' : images[selectedImage]}
                    alt={subastaTorre.nombre || 'Vehículo'}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                  
                  {/* Etiqueta de estado - esquina superior izquierda */}
                  <span className="badge bg-success" style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    zIndex: 2
                  }}>
                    <i className="far fa-clock me-1"></i>
                    Subasta Activa
                  </span>

                  {/* Etiqueta de tiempo - esquina superior derecha */}
                  {timer && (
                    <span className="badge bg-warning text-dark" style={{
                      position: 'absolute',
                      top: '15px',
                      right: '15px',
                      zIndex: 2
                    }}>
                      <i className="far fa-clock me-1"></i>
                      {timer}
                    </span>
                  )}
                </div>

                {/* Galería de imágenes en miniatura */}
                {images.length > 1 && (
                  <div className="car-gallery mt-3">
                    <div className="row">
                      {images.map((img, index) => (
                        <div key={index} className="col-3 col-md-2">
                          <div 
                            className={`gallery-thumb ${selectedImage === index ? 'active' : ''}`}
                            onClick={() => setSelectedImage(index)}
                            style={{
                              cursor: 'pointer',
                              border: selectedImage === index ? '2px solid #4F5DEC' : '1px solid #ddd',
                              borderRadius: '4px',
                              overflow: 'hidden',
                              marginBottom: '10px'
                            }}
                          >
                            <img 
                              src={img || '/assets/img/car/01.jpg'} 
                              alt={`${subastaTorre.nombre || 'Vehículo'} ${index + 1}`}
                              style={{ width: '100%', height: '60px', objectFit: 'cover' }}
                              onError={(e) => {
                                e.target.src = '/assets/img/car/01.jpg';
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="car-content">
                  <div className="car-top">
                    <h4><a href="#">{subastaTorre.nombre}</a></h4>
                    <span><i className="fas fa-star"></i> 5.0</span>
                  </div>

                  <p className="mb-4">{subastaTorre.descripcion}</p>
                  
                  <ul className="car-list">
                    {subastaTorre.valores && subastaTorre.valores.length > 0 ? (
                      subastaTorre.valores.slice(0, 6).map((valor, index) => (
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
                        <li><i className="far fa-road"></i>Excelente estado</li>
                        <li><i className="far fa-steering-wheel"></i>Automático</li>
                      </>
                    )}
                  </ul>
                  
                  <div className="car-footer">
                    <div>
                      <div className="mb-2">
                        <small className="text-muted">Precio de Salida</small>
                        <div className="text-muted">
                          {formatoMoneda(subastaTorre.montoSalida || 0)}
                        </div>
                      </div>
                      {pujaMayor?.monto > 0 && (
                        <div>
                          <small className="text-muted">Puja Actual</small>
                          <div className="car-price">
                            {formatoMoneda(pujaMayor.monto)}
                            <sub> / {pujaMayor.usuario}</sub>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="d-flex gap-2">
                      <a 
                        href="#" 
                        className={`car-favorite-btn ${favorite ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite();
                        }}
                      >
                        <i className={favorite ? "fas fa-heart" : "far fa-heart"}></i>
                      </a>
                      <a 
                        href="#" 
                        className="theme-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowBidForm(!showBidForm);
                        }}
                      >
                        Hacer Puja
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulario de puja */}
              {showBidForm && (
                <div className="car-item mt-4">
                  <div className="car-content">
                    <h5 className="mb-3">Realizar Puja</h5>
                    
                    {/* Pujas sugeridas */}
                    <div className="mb-3">
                      <label className="form-label">Pujas Sugeridas:</label>
                      <div className="d-flex flex-wrap gap-2">
                        {suggestedBids.map((amount, index) => (
                          <button
                            key={index}
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => handleSuggestedBid(amount)}
                          >
                            {formatoMoneda(amount)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Input de puja personalizada */}
                    <div className="mb-3">
                      <label className="form-label">Monto de tu puja:</label>
                      <div className="input-group">
                        <span className="input-group-text">$</span>
                        <input
                          type="number"
                          className="form-control"
                          value={pujaAmount}
                          onChange={(e) => setPujaAmount(e.target.value)}
                          min={(pujaMayor?.monto || subastaTorre?.montoSalida || 0) + 1}
                          step="100"
                        />
                      </div>
                      <small className="form-text text-muted">
                        Mínimo: {formatoMoneda((pujaMayor?.monto || subastaTorre?.montoSalida || 0) + 1)}
                      </small>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        type="button"
                        className="theme-btn"
                        onClick={handleBid}
                        disabled={!pujaAmount || parseFloat(pujaAmount) <= (pujaMayor?.monto || subastaTorre?.montoSalida || 0)}
                      >
                        Confirmar Puja
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowBidForm(false)}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Información y historial */}
            <div className="col-lg-4">
              <div className="car-sidebar">
                <div className="car-widget">
                  <h4 className="car-widget-title">Información de Subasta</h4>
                  <div className="mb-3">
                    <p><strong>Estado:</strong> Subasta Activa</p>
                    <p><strong>Tiempo Restante:</strong><br/>
                    <span className="text-warning">{timer || 'Calculando...'}</span></p>
                    <p><strong>Fecha de Fin:</strong><br/>
                    {subastaTorre.fechaFin && new Date(subastaTorre.fechaFin).toLocaleDateString('es-ES', {
                      day: '2-digit',
                      month: '2-digit', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</p>
                    {pujaMayor?.monto > 0 && (
                      <p><strong>Puja Más Alta:</strong><br/>
                      <span className="text-success">{formatoMoneda(pujaMayor.monto)}</span><br/>
                      <small>por {pujaMayor.usuario}</small></p>
                    )}
                  </div>
                </div>

                <div className="car-widget">
                  <h4 className="car-widget-title">Historial de Pujas</h4>
                  {bidHistory.length > 0 ? (
                    <ul className="list-unstyled">
                      {bidHistory.slice(0, 5).map((bid) => (
                        <li key={bid.id} className="mb-2 p-2 bg-light rounded">
                          <div className="d-flex justify-content-between">
                            <strong>{formatoMoneda(bid.monto)}</strong>
                            <small className="text-muted">
                              {bid.fecha.toLocaleTimeString('es-ES', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </small>
                          </div>
                          <small className="text-muted">{bid.usuario}</small>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No hay pujas aún</p>
                  )}
                  
                  <a href="#" className="theme-btn w-100">
                    Ver Historial Completo
                  </a>
                </div>

                {/* Especificaciones */}
                {subastaTorre.valores && subastaTorre.valores.length > 0 && (
                  <div className="car-widget">
                    <h4 className="car-widget-title">Especificaciones</h4>
                    <ul>
                      {subastaTorre.valores.map((valor, index) => (
                        <li key={index}>
                          <div className="form-check">
                            <label className="form-check-label">
                              <i className="far fa-check-circle"></i> {valor.campo}: {valor.valor}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Botones de navegación */}
          <div className="row mt-4">
            <div className="col-12 text-center">
              <a href="#" className="theme-btn me-3" onClick={(e) => { e.preventDefault(); navigate('/cars'); }}>
                <i className="far fa-arrow-left"></i> Volver a Subastas
              </a>
              <a href="#" className="theme-btn">
                <i className="far fa-share"></i> Compartir
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detalle;