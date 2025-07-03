import React from 'react';

const ProcessArea = () => {
  const steps = [
    {
      step: '01',
      title: 'Regístrate',
      description: 'Crea tu cuenta gratuita en nuestra plataforma'
    },
    {
      step: '02', 
      title: 'Explora',
      description: 'Navega por nuestras subastas activas'
    },
    {
      step: '03',
      title: 'Puja',
      description: 'Realiza tu oferta en tiempo real'
    },
    {
      step: '04',
      title: 'Gana',
      description: 'Completa la compra de forma segura'
    }
  ];

  return (
    <div className="process-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Proceso</span>
              <h2 className="site-title">¿Cómo <span>Funciona?</span></h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {steps.map((step, index) => (
            <div key={index} className="col-lg-3 col-md-6">
              <div className="process-item">
                <span className="process-count">{step.step}</span>
                <div className="process-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessArea;