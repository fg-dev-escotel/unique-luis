import React from 'react';

const BlogArea = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Consejos para comprar tu primer vehículo en subasta',
      excerpt: 'Guía completa para principiantes en el mundo de las subastas vehiculares.',
      image: '/assets/img/blog/01.jpg',
      date: '15 Mar 2024',
      author: 'Admin',
      category: 'Consejos'
    },
    {
      id: 2,
      title: 'Cómo evaluar el estado de un vehículo antes de pujar',
      excerpt: 'Aprende a identificar los puntos clave para evaluar un vehículo usado.',
      image: '/assets/img/blog/02.jpg',
      date: '12 Mar 2024',
      author: 'Admin',
      category: 'Guías'
    },
    {
      id: 3,
      title: 'Tendencias del mercado automotriz 2024',
      excerpt: 'Análisis de las principales tendencias y precios del mercado actual.',
      image: '/assets/img/blog/03.jpg',
      date: '10 Mar 2024',
      author: 'Admin',
      category: 'Mercado'
    }
  ];

  return (
    <div className="blog-area py-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="site-heading text-center">
              <span className="site-title-tagline">Nuestro Blog</span>
              <h2 className="site-title">Últimas <span>Noticias</span></h2>
              <div className="heading-divider"></div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          {blogPosts.map((post) => (
            <div key={post.id} className="col-lg-4 col-md-6">
              <div className="blog-item">
                <div className="blog-img">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-date">
                    <span>{post.date}</span>
                  </div>
                </div>
                <div className="blog-content">
                  <div className="blog-meta">
                    <span><i className="far fa-user"></i> {post.author}</span>
                    <span><i className="far fa-folder"></i> {post.category}</span>
                  </div>
                  <h4>
                    <a href={`/blog/${post.id}`}>{post.title}</a>
                  </h4>
                  <p>{post.excerpt}</p>
                  <a href={`/blog/${post.id}`} className="read-btn">
                    Leer Más <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row mt-4">
          <div className="col-12 text-center">
            <a href="/blog" className="theme-btn">
              Ver Todo el Blog <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogArea;