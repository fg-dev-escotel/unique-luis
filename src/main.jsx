import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App.jsx'
import './index.css'

// Función para cargar scripts dinámicamente
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Cargar todas las librerías JavaScript necesarias
const loadAllScripts = async () => {
  try {
    // Cargar jQuery primero (requerido por otras librerías)
    await loadScript('/assets/js/jquery-3.6.0.min.js');
    
    // Cargar el resto de librerías
    await Promise.all([
      loadScript('/assets/js/modernizr.min.js'),
      loadScript('/assets/js/bootstrap.bundle.min.js'),
      loadScript('/assets/js/imagesloaded.pkgd.min.js'),
      loadScript('/assets/js/jquery.magnific-popup.min.js'),
      loadScript('/assets/js/isotope.pkgd.min.js'),
      loadScript('/assets/js/jquery.appear.min.js'),
      loadScript('/assets/js/jquery.easing.min.js'),
      loadScript('/assets/js/owl.carousel.min.js'),
      loadScript('/assets/js/counter-up.js'),
      loadScript('/assets/js/jquery-ui.min.js'),
      loadScript('/assets/js/jquery.timepicker.min.js'),
      loadScript('/assets/js/wow.min.js')
    ]);
    
    // Cargar el script principal al final
    await loadScript('/assets/js/main.js');
    
    console.log('Todas las librerías cargadas correctamente');
  } catch (error) {
    console.error('Error cargando librerías:', error);
  }
};

// Crear el root una sola vez
const root = ReactDOM.createRoot(document.getElementById('root'));

// Inicializar la aplicación con Redux Provider
const renderApp = () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

// Cargar scripts y luego renderizar
loadAllScripts().then(renderApp);

// Si hay problemas con las librerías, cargar la app de todos modos
setTimeout(() => {
  const rootElement = document.getElementById('root');
  if (!rootElement.hasChildNodes()) {
    renderApp();
  }
}, 3000);