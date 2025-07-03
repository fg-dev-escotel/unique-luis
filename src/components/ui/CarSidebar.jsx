// src/components/ui/CarSidebar.jsx
import React, { useState } from 'react';

const CarSidebar = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  // Marcas más comunes en subastas de autos
  const brands = [
    { id: 'all', label: 'Todas las Marcas' },
    { id: 'bmw', label: 'BMW' },
    { id: 'mercedes', label: 'Mercedes-Benz' },
    { id: 'audi', label: 'Audi' },
    { id: 'porsche', label: 'Porsche' },
    { id: 'ferrari', label: 'Ferrari' },
    { id: 'lamborghini', label: 'Lamborghini' },
    { id: 'toyota', label: 'Toyota' },
    { id: 'honda', label: 'Honda' },
    { id: 'ford', label: 'Ford' },
    { id: 'chevrolet', label: 'Chevrolet' },
    { id: 'nissan', label: 'Nissan' }
  ];

  const transmissions = [
    { id: 'automatic', label: 'Automática' },
    { id: 'manual', label: 'Manual' },
    { id: 'cvt', label: 'CVT' },
    { id: 'semi-automatic', label: 'Semi-automática' }
  ];

  const fuels = [
    { id: 'gasoline', label: 'Gasolina' },
    { id: 'diesel', label: 'Diésel' },
    { id: 'hybrid', label: 'Híbrido' },
    { id: 'electric', label: 'Eléctrico' },
    { id: 'gas', label: 'Gas LP' }
  ];

  const auctionStatuses = [
    { id: 'active', label: 'Subastas Activas' },
    { id: 'ending-soon', label: 'Terminan Pronto' },
    { id: 'new', label: 'Nuevas Subastas' },
    { id: 'featured', label: 'Destacadas' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({ search: searchTerm });
    }
  };

  const handleBrandChange = (brandId) => {
    let newBrands;
    if (brandId === 'all') {
      newBrands = selectedBrands.length === brands.length - 1 ? [] : brands.slice(1).map(b => b.id);
    } else {
      newBrands = selectedBrands.includes(brandId)
        ? selectedBrands.filter(id => id !== brandId)
        : [...selectedBrands, brandId];
    }
    setSelectedBrands(newBrands);
    if (onFilterChange) {
      onFilterChange({ brands: newBrands });
    }
  };

  const handleTransmissionChange = (transmissionId) => {
    const newTransmissions = selectedTransmission.includes(transmissionId)
      ? selectedTransmission.filter(id => id !== transmissionId)
      : [...selectedTransmission, transmissionId];
    setSelectedTransmission(newTransmissions);
    if (onFilterChange) {
      onFilterChange({ transmission: newTransmissions });
    }
  };

  const handleFuelChange = (fuelId) => {
    const newFuels = selectedFuel.includes(fuelId)
      ? selectedFuel.filter(id => id !== fuelId)
      : [...selectedFuel, fuelId];
    setSelectedFuel(newFuels);
    if (onFilterChange) {
      onFilterChange({ fuel: newFuels });
    }
  };

  const handlePriceRangeChange = (field, value) => {
    const newRange = { ...priceRange, [field]: value };
    setPriceRange(newRange);
    if (onFilterChange) {
      onFilterChange({ priceRange: newRange });
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedBrands([]);
    setSelectedTransmission([]);
    setSelectedFuel([]);
    setPriceRange({ min: '', max: '' });
    if (onFilterChange) {
      onFilterChange({ 
        search: '', 
        brands: [], 
        transmission: [], 
        fuel: [], 
        priceRange: { min: '', max: '' } 
      });
    }
  };

  return (
    <div className="car-sidebar">
      {/* Búsqueda */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <i className="fas fa-search me-2"></i>Búsqueda
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Buscar vehículo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="btn btn-outline-primary" type="submit">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Rango de Precios */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <i className="fas fa-dollar-sign me-2"></i>Rango de Precios
          </h5>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-6">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Mínimo"
                value={priceRange.min}
                onChange={(e) => handlePriceRangeChange('min', e.target.value)}
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                className="form-control form-control-sm"
                placeholder="Máximo"
                value={priceRange.max}
                onChange={(e) => handlePriceRangeChange('max', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Estado de Subasta */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <i className="fas fa-gavel me-2"></i>Estado de Subasta
          </h5>
        </div>
        <div className="card-body">
          {auctionStatuses.map((status) => (
            <div key={status.id} className="form-check mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id={`status-${status.id}`}
              />
              <label className="form-check-label" htmlFor={`status-${status.id}`}>
                {status.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Marcas */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <i className="fas fa-car me-2"></i>Marcas
          </h5>
        </div>
        <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {brands.map((brand) => (
            <div key={brand.id} className="form-check mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id={`brand-${brand.id}`}
                checked={brand.id === 'all' 
                  ? selectedBrands.length === brands.length - 1 
                  : selectedBrands.includes(brand.id)
                }
                onChange={() => handleBrandChange(brand.id)}
              />
              <label className="form-check-label" htmlFor={`brand-${brand.id}`}>
                {brand.label}
                {brand.id === 'all' && (
                  <small className="text-muted ms-1">({brands.length - 1})</small>
                )}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Transmisión */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <i className="fas fa-cogs me-2"></i>Transmisión
          </h5>
        </div>
        <div className="card-body">
          {transmissions.map((transmission) => (
            <div key={transmission.id} className="form-check mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id={`trans-${transmission.id}`}
                checked={selectedTransmission.includes(transmission.id)}
                onChange={() => handleTransmissionChange(transmission.id)}
              />
              <label className="form-check-label" htmlFor={`trans-${transmission.id}`}>
                {transmission.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Combustible */}
      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">
            <i className="fas fa-gas-pump me-2"></i>Combustible
          </h5>
        </div>
        <div className="card-body">
          {fuels.map((fuel) => (
            <div key={fuel.id} className="form-check mb-2">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id={`fuel-${fuel.id}`}
                checked={selectedFuel.includes(fuel.id)}
                onChange={() => handleFuelChange(fuel.id)}
              />
              <label className="form-check-label" htmlFor={`fuel-${fuel.id}`}>
                {fuel.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Botón para limpiar filtros */}
      <div className="d-grid">
        <button 
          className="btn btn-outline-secondary"
          onClick={clearAllFilters}
        >
          <i className="fas fa-times me-2"></i>
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default CarSidebar;