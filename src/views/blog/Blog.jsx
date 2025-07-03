import React from 'react';
import Breadcrumb from '../../components/ui/Breadcrumb';

const Blog = () => {
  return (
    <>
      <Breadcrumb title="Blog" currentPage="Blog" />
      <div className="blog-area py-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto">
              <div className="site-heading text-center">
                <span className="site-title-tagline">Blog</span>
                <h2 className="site-title">Latest <span>News</span></h2>
                <div className="heading-divider"></div>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 text-center">
              <p>Blog content will be implemented here.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;