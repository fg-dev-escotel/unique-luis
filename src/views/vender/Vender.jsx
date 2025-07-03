import React, { useState } from 'react';
import Breadcrumb from '../../components/shared/ui/Breadcrumb';

const Vender = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    marca: '',
    modelo: '',
    año: '',
    kilometraje: '',
    color: '',
    motor: '',
    transmision: '',
    combustible: '',
    precio: '',
    descripcion: '',
    telefono: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const marcas = [
    'Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Hyundai', 
    'Kia', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Otro'
  ];

  const transmisiones = ['Manual', 'Automática', 'CVT'];
  const combustibles = ['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Aquí iría la lógica real de envío del formulario
      // Por ahora simulamos el envío
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitMessage('¡Gracias! Tu vehículo ha sido registrado exitosamente. Nos pondremos en contacto contigo pronto.');
      setFormData({
        nombre: '',
        marca: '',
        modelo: '',
        año: '',
        kilometraje: '',
        color: '',
        motor: '',
        transmision: '',
        combustible: '',
        precio: '',
        descripcion: '',
        telefono: '',
        email: ''
      });
    } catch (error) {
      setSubmitMessage('Lo sentimos, hubo un error al registrar tu vehículo. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Breadcrumb title="Vender tu Vehículo" currentPage="Vender" />
      
      <div className="vender-area py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="site-heading text-center mb-5">
                <span className="site-title-tagline">Vender</span>
                <h2 className="site-title">Registra tu <span>Vehículo</span></h2>
                <p>Completa la información de tu vehículo para participar en nuestras subastas</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="car-item border rounded overflow-hidden shadow-sm">
                <div className="car-content p-4">
                  <form onSubmit={handleSubmit}>
                    {/* Información Personal */}
                    <div className="mb-4">
                      <h5 className="mb-3">Información de Contacto</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="form-label">Nombre Completo</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              name="nombre"
                              placeholder="Tu nombre completo" 
                              value={formData.nombre}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="form-label">Teléfono</label>
                            <input 
                              type="tel" 
                              className="form-control" 
                              name="telefono"
                              placeholder="Tu número de teléfono" 
                              value={formData.telefono}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group mb-3">
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-control" 
                          name="email"
                          placeholder="tu@email.com" 
                          value={formData.email}
                          onChange={handleInputChange}
                          required 
                        />
                      </div>
                    </div>

                    {/* Información del Vehículo */}
                    <div className="mb-4">
                      <h5 className="mb-3">Información del Vehículo</h5>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="form-label">Marca</label>
                            <select 
                              className="form-control" 
                              name="marca"
                              value={formData.marca}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Selecciona una marca</option>
                              {marcas.map((marca, index) => (
                                <option key={index} value={marca}>{marca}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group mb-3">
                            <label className="form-label">Modelo</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              name="modelo"
                              placeholder="Ej: Corolla, Civic, etc." 
                              value={formData.modelo}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <label className="form-label">Año</label>
                            <input 
                              type="number" 
                              className="form-control" 
                              name="año"
                              placeholder="2020" 
                              min="1990"
                              max="2024"
                              value={formData.año}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <label className="form-label">Kilometraje</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              name="kilometraje"
                              placeholder="50,000 km" 
                              value={formData.kilometraje}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <label className="form-label">Color</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              name="color"
                              placeholder="Blanco, Negro, etc." 
                              value={formData.color}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <label className="form-label">Motor</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              name="motor"
                              placeholder="2.0L, 1.6L, etc." 
                              value={formData.motor}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <label className="form-label">Transmisión</label>
                            <select 
                              className="form-control" 
                              name="transmision"
                              value={formData.transmision}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Selecciona</option>
                              {transmisiones.map((trans, index) => (
                                <option key={index} value={trans}>{trans}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-group mb-3">
                            <label className="form-label">Combustible</label>
                            <select 
                              className="form-control" 
                              name="combustible"
                              value={formData.combustible}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Selecciona</option>
                              {combustibles.map((comb, index) => (
                                <option key={index} value={comb}>{comb}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="form-group mb-3">
                        <label className="form-label">Precio Esperado (USD)</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          name="precio"
                          placeholder="15000" 
                          min="1000"
                          value={formData.precio}
                          onChange={handleInputChange}
                          required 
                        />
                        <small className="text-muted">Este será el precio de salida en la subasta</small>
                      </div>

                      <div className="form-group mb-4">
                        <label className="form-label">Descripción</label>
                        <textarea 
                          name="descripcion" 
                          cols="30" 
                          rows="4" 
                          className="form-control"
                          placeholder="Describe el estado de tu vehículo, mantenimientos, características especiales, etc."
                          value={formData.descripcion}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <button 
                        type="submit" 
                        className="theme-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Registrando...' : 'Registrar Vehículo'} 
                        <i className="far fa-car"></i>
                      </button>
                    </div>

                    {submitMessage && (
                      <div className="mt-4">
                        <div className={`alert ${submitMessage.includes('Gracias') ? 'alert-success' : 'alert-danger'}`}>
                          {submitMessage}
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Información adicional */}
          <div className="row mt-5">
            <div className="col-lg-10 mx-auto">
              <div className="row">
                <div className="col-md-4 text-center mb-4">
                  <div className="car-item border rounded p-4">
                    <i className="fas fa-file-alt fa-3x text-primary mb-3"></i>
                    <h5>Proceso Simple</h5>
                    <p className="text-muted">Completa el formulario y nosotros nos encargamos del resto</p>
                  </div>
                </div>
                <div className="col-md-4 text-center mb-4">
                  <div className="car-item border rounded p-4">
                    <i className="fas fa-gavel fa-3x text-primary mb-3"></i>
                    <h5>Mejor Precio</h5>
                    <p className="text-muted">Las subastas garantizan el mejor precio para tu vehículo</p>
                  </div>
                </div>
                <div className="col-md-4 text-center mb-4">
                  <div className="car-item border rounded p-4">
                    <i className="fas fa-shield-alt fa-3x text-primary mb-3"></i>
                    <h5>100% Seguro</h5>
                    <p className="text-muted">Transacciones seguras y verificadas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Vender;