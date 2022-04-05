import { BrowserRouter } from 'react-router-dom';
import { ProductsProvider } from './hooks/useProducts';
import { GlobalStyle } from './styles/global';

import { Header } from './components/header';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <ProductsProvider>
        <GlobalStyle />
        <Header />
        <Home />
      </ProductsProvider>
    </BrowserRouter>
  );
}

export default App;
