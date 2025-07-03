import React from 'react';

const AboutArea = () => {
  return (
    <div className="about-area py-120">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-left">
              <div className="about-img">
                <img src="/assets/img/about/01.jpg" alt="About Us" />
                <div className="about-experience">
                  <div className="about-experience-icon">
                    <i className="fal fa-car"></i>
                  </div>
                  <b>Más de 10 años</b>
                  <span>de experiencia</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-right">
              <div className="site-heading mb-3">
                <span className="site-title-tagline">Sobre Nosotros</span>
                <h2 className="site-title">
                  Líderes en <span>Subastas</span> de Vehículos
                </h2>
              </div>
              <p className="about-text">
                En Unique Motors, nos especializamos en conectar compradores y vendedores a través 
                de un sistema de subastas transparente y confiable. Nuestra plataforma ofrece 
                vehículos de alta calidad verificados por expertos.
              </p>
              <div className="about-list-wrapper">
                <ul className="about-list list-unstyled">
                  <li>
                    <i className="fas fa-check-circle"></i>
                    Vehículos inspeccionados y verificados
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    Proceso de subasta transparente
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    Garantía en todas las transacciones
                  </li>
                  <li>
                    <i className="fas fa-check-circle"></i>
                    Soporte especializado 24/7
                  </li>
                </ul>
              </div>
              <div className="about-btn">
                <a href="/about" className="theme-btn">
                  Conoce Más <i className="fas fa-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutArea;