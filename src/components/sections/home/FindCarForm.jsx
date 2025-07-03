import React, { useState } from 'react';

const FindCarForm = () => {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    año: '',
    precio: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirigir a la página de subastas con filtros
    window.location.href = '/cars';
  };

  return (
    <div className="find-car-form">
      <div className="container">
        <div className="find-car-form-wrap">
          <div className="row">
            <div className="col-lg-12">
              <div className="find-car-form-content">
                <h3>Encuentra tu Vehículo Ideal</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="form-group">
                        <select 
                          className="form-select"
                          name="marca"
                          value={formData.marca}
                          onChange={handleInputChange}
                        >
                          <option value="">Selecciona Marca</option>
                          <option value="toyota">Toyota</option>
                          <option value="honda">Honda</option>
                          <option value="ford">Ford</option>
                          <option value="chevrolet">Chevrolet</option>
                          <option value="nissan">Nissan</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group">
                        <select 
                          className="form-select"
                          name="modelo"
                          value={formData.modelo}
                          onChange={handleInputChange}
                        >
                          <option value="">Selecciona Modelo</option>
                          <option value="sedan">Sedan</option>
                          <option value="suv">SUV</option>
                          <option value="hatchback">Hatchback</option>
                          <option value="pickup">Pickup</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form-group">
                        <select 
                          className="form-select"
                          name="año"
                          value={formData.año}
                          onChange={handleInputChange}
                        >
                          <option value="">Año</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form-group">
                        <select 
                          className="form-select"
                          name="precio"
                          value={formData.precio}
                          onChange={handleInputChange}
                        >
                          <option value="">Precio Max</option>
                          <option value="10000">$10,000</option>
                          <option value="20000">$20,000</option>
                          <option value="30000">$30,000</option>
                          <option value="50000">$50,000</option>
                          <option value="100000">$100,000+</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form-group">
                        <button type="submit" className="theme-btn">
                          <i className="far fa-search"></i> Buscar
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindCarForm;