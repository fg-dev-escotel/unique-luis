import React from 'react';

const PartnerArea = () => {
  const partners = [
    {
      name: 'Toyota',
      logo: '/assets/img/partner/toyota.png'
    },
    {
      name: 'Honda',
      logo: '/assets/img/partner/honda.png'
    },
    {
      name: 'Ford',
      logo: '/assets/img/partner/ford.png'
    },
    {
      name: 'Chevrolet',
      logo: '/assets/img/partner/chevrolet.png'
    },
    {
      name: 'Nissan',
      logo: '/assets/img/partner/nissan.png'
    },
    {
      name: 'Volkswagen',
      logo: '/assets/img/partner/volkswagen.png'
    }
  ];

  return (
    <div className="partner-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Nuestros Socios</span>
              <h2 className="site-title">Marcas <span>Asociadas</span></h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            <div className="partner-wrapper">
              <div className="partner-slider">
                {partners.map((partner, index) => (
                  <div key={index} className="partner-item">
                    <div className="partner-img">
                      <img src={partner.logo} alt={partner.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerArea;