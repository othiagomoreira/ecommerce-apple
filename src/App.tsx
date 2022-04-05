import { BrowserRouter } from 'react-router-dom';
import { ProductsProvider } from './hooks/useProducts';
import { GlobalStyle } from './styles/global';

import { Header } from './components/header';
import { Routes } from './routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <GlobalStyle />
        <Header />
        <Routes />
        <ToastContainer autoClose={3000} />
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
