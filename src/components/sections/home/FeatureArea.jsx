import React from 'react';

const FeatureArea = () => {
  const features = [
    {
      icon: 'fas fa-gavel',
      title: 'Subastas Transparentes',
      description: 'Proceso de subasta completamente transparente con historial de pujas visible.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Compra Segura',
      description: 'Transacciones 100% seguras con garantía y protección al comprador.'
    },
    {
      icon: 'fas fa-car',
      title: 'Vehículos Verificados',
      description: 'Todos los vehículos pasan por inspección técnica antes de la subasta.'
    },
    {
      icon: 'fas fa-headset',
      title: 'Soporte 24/7',
      description: 'Equipo de soporte disponible las 24 horas para ayudarte en todo momento.'
    }
  ];

  return (
    <div className="feature-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Características</span>
              <h2 className="site-title">¿Por qué elegirnos?</h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureArea;