import React from 'react';

const TestimonialArea = () => {
  const testimonials = [
    {
      name: 'Carlos Rodríguez',
      position: 'Comprador satisfecho',
      image: '/assets/img/testimonial/01.jpg',
      rating: 5,
      text: 'Excelente experiencia comprando mi Toyota Camry. El proceso fue transparente y obtuve un precio increíble. Definitivamente recomiendo esta plataforma.'
    },
    {
      name: 'María González',
      position: 'Cliente frecuente',
      image: '/assets/img/testimonial/02.jpg',
      rating: 5,
      text: 'He comprado dos vehículos a través de esta plataforma. El servicio al cliente es excepcional y los vehículos llegan en perfectas condiciones.'
    },
    {
      name: 'José Martínez',
      position: 'Vendedor',
      image: '/assets/img/testimonial/03.jpg',
      rating: 5,
      text: 'Como vendedor, me impresionó la facilidad del proceso y el precio que obtuve por mi vehículo. La plataforma es muy profesional y confiable.'
    }
  ];

  return (
    <div className="testimonial-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Testimonios</span>
              <h2 className="site-title">Lo que dicen nuestros <span>clientes</span></h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="testimonial-item">
                <div className="testimonial-rate">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="fas fa-star"></i>
                  ))}
                </div>
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                </div>
                <div className="testimonial-author">
                  <div className="testimonial-author-img">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-author-info">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialArea;