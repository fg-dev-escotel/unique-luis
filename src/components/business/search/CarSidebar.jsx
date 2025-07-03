import React, { useState } from 'react';

const CarSidebar = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({ search: searchTerm });
    }
  };

  return (
    <div className="car-sidebar">
      <div className="car-widget">
        <div className="car-search-form">
          <h4 className="car-widget-title">Search</h4>
          <form onSubmit={handleSearch}>
            <div className="form-group">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit"><i className="far fa-search"></i></button>
            </div>
          </form>
        </div>
      </div>
      
      <div className="car-widget">
        <h4 className="car-widget-title">Brands</h4>
        <ul>
          <li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="brand" />
              <label className="form-check-label" htmlFor="brand"> All Brands</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="brand1" />
              <label className="form-check-label" htmlFor="brand1"> BMW</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" defaultChecked type="checkbox" id="brand2" />
              <label className="form-check-label" htmlFor="brand2"> Toyota</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="brand3" />
              <label className="form-check-label" htmlFor="brand3"> Ferrari</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" defaultChecked type="checkbox" id="brand4" />
              <label className="form-check-label" htmlFor="brand4"> Audi</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="brand5" />
              <label className="form-check-label" htmlFor="brand5"> Tesla</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="brand6" />
              <label className="form-check-label" htmlFor="brand6"> Mercedes</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="brand7" />
              <label className="form-check-label" htmlFor="brand7"> Hyundai</label>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="car-widget">
        <h4 className="car-widget-title">Transmission</h4>
        <ul>
          <li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="tran1" />
              <label className="form-check-label" htmlFor="tran1"> Automatic</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" defaultChecked type="checkbox" id="tran2" />
              <label className="form-check-label" htmlFor="tran2"> Manual</label>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="car-widget">
        <h4 className="car-widget-title">Fuel</h4>
        <ul>
          <li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="fuel1" />
              <label className="form-check-label" htmlFor="fuel1"> Gas</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" defaultChecked type="checkbox" id="fuel2" />
              <label className="form-check-label" htmlFor="fuel2"> Hybrid</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="fuel3" />
              <label className="form-check-label" htmlFor="fuel3"> Diesel</label>
            </div>
          </li>
          <li>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="fuel4" />
              <label className="form-check-label" htmlFor="fuel4"> Electric</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CarSidebar;