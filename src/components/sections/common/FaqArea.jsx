import React, { useState } from 'react';

const FaqArea = () => {
  const [activeItem, setActiveItem] = useState(0);

  const faqs = [
    {
      question: '¿Cómo funciona el proceso de subasta?',
      answer: 'Nuestro proceso es simple: regístrate, navega por las subastas activas, realiza tu puja y completa la compra si resultas ganador. Todo el proceso es transparente y seguro.'
    },
    {
      question: '¿Qué garantías ofrecen en los vehículos?',
      answer: 'Todos nuestros vehículos pasan por una inspección técnica completa. Ofrecemos garantía de 6 meses en motor y transmisión, además de soporte técnico especializado.'
    },
    {
      question: '¿Puedo inspeccionar el vehículo antes de pujar?',
      answer: 'Sí, puedes agendar una cita para inspeccionar cualquier vehículo antes de la subasta. También proporcionamos reportes detallados con fotos y estado del vehículo.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos transferencias bancarias, tarjetas de crédito/débito y financiamiento a través de nuestros partners bancarios. El pago se procesa de forma segura.'
    },
    {
      question: '¿Hay costos adicionales en la compra?',
      answer: 'Los únicos costos adicionales son los impuestos locales y las tarifas de transferencia vehicular. Todos los costos se muestran claramente antes de confirmar la compra.'
    }
  ];

  const toggleItem = (index) => {
    setActiveItem(activeItem === index ? -1 : index);
  };

  return (
    <div className="faq-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Preguntas Frecuentes</span>
              <h2 className="site-title">Preguntas <span>Frecuentes</span></h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-8 mx-auto">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div key={index} className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${activeItem === index ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => toggleItem(index)}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${activeItem === index ? 'show' : ''}`}>
                    <div className="accordion-body">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqArea;