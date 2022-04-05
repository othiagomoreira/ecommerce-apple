import React, { useEffect, useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Products } from '../../types';

import { api } from '../../services/api';
import { formatPrice } from '../../utils/format';
import { FaOpencart } from 'react-icons/fa';

import { Container, ProductList } from './style';

interface ProductsFormatted extends Products {
  priceFormatted: string;
}

export const Home = () => {
  const [products, setProducts] = useState<ProductsFormatted[]>([]);

  const { addProduct } = useProducts();

  const info = [];

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Products[]>('products');

      // Cria um novo array, adiciona uma nova propriedade aos objetos, priceFormatted
      const data = response.data.map((product) => {
        return { ...product, priceFormatted: formatPrice(product.price) };
      });

      setProducts(data);
    }

    loadProducts();
  }, []);

  const handleAddProduct = (id: number) => {
    addProduct(id)
  };



  return (
    <Container>
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <span>{product.priceFormatted}</span>

            <button type="button" onClick={() => handleAddProduct(product.id)}>
              <div>
                <FaOpencart />
                {info.length <= 0 ? '0' : info.length}
              </div>

              <span>Comprar</span>
            </button>
          </li>
        ))}
      </ProductList>
    </Container>
  );
};
