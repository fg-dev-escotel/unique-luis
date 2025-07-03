import React from 'react';

const ChooseArea = () => {
  const reasons = [
    {
      title: 'Mejor Precio',
      description: 'Obtén el mejor precio del mercado a través de nuestro sistema de subastas',
      icon: 'fas fa-dollar-sign'
    },
    {
      title: 'Garantía Total',
      description: 'Todos nuestros vehículos incluyen garantía completa y soporte técnico',
      icon: 'fas fa-shield-alt'
    },
    {
      title: 'Proceso Rápido',
      description: 'Completa tu compra en minutos con nuestro proceso simplificado',
      icon: 'fas fa-rocket'
    },
    {
      title: 'Financiamiento',
      description: 'Opciones de financiamiento flexibles adaptadas a tus necesidades',
      icon: 'fas fa-credit-card'
    }
  ];

  return (
    <div className="choose-area py-120">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="choose-content">
              <div className="site-heading mb-3">
                <span className="site-title-tagline">¿Por qué elegirnos?</span>
                <h2 className="site-title">
                  La mejor opción para <span>comprar</span> tu vehículo
                </h2>
              </div>
              <p className="choose-text">
                Somos la plataforma líder en subastas de vehículos, ofreciendo transparencia, 
                seguridad y los mejores precios del mercado.
              </p>
              <div className="choose-list">
                {reasons.map((reason, index) => (
                  <div key={index} className="choose-list-item">
                    <div className="choose-list-icon">
                      <i className={reason.icon}></i>
                    </div>
                    <div className="choose-list-content">
                      <h4>{reason.title}</h4>
                      <p>{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="choose-img">
              <img src="/assets/img/choose/01.jpg" alt="Por qué elegirnos" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseArea;