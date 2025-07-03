import Header from '../components/shared/layout/Header';
import Footer from '../components/shared/layout/Footer';
import ScrollTop from '../components/shared/ui/ScrollTop';

export const Layout = ({ children }) => {
  return (
    <div className="App">
      <div className="preloader">
        <div className="loader-ripple">
          <div></div>
          <div></div>
        </div>
      </div>

      <Header />
      <main className="main">
        {children}
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
};