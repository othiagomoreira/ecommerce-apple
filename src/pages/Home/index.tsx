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

interface CartItemsmount {
  [key: number]: number;
}

export const Home = () => {
  const [infoProducts, setInfoProducts] = useState<ProductsFormatted[]>([]);

  const { addProduct, products } = useProducts();

  // Passa por todos os itens do array
  const cartItemsmount = products.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount };
    // Cria um objeto com dinamico que recebe o id do produto como key, e a quantidade desejada do mesmo como value
    newSumAmount[product.id] = product.desiredAmount;

    return newSumAmount;
  }, {} as CartItemsmount);


  useEffect(() => {
    async function loadProducts() {
      const response = await api.get<Products[]>('products');

      // Cria um novo array, adiciona uma nova propriedade aos objetos, priceFormatted
      const data = response.data.map((product) => {
        return { ...product, priceFormatted: formatPrice(product.price) };
      });

      setInfoProducts(data);
    }

    loadProducts();
  }, []);

  const handleAddProduct = (id: number) => {
    addProduct(id)
  };

  return (
    <Container className="container">
      <ProductList>
        {infoProducts.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <p>{product.description}</p>
            <span>{product.priceFormatted}</span>

            <button type="button" onClick={() => handleAddProduct(product.id)}>
              <div>
                <FaOpencart />
                {cartItemsmount[product.id] || 0} {/*Se o objeto com esse id não existir exiba o 0*/}
              </div>

              <span>Comprar</span>
            </button>
          </li>
        ))}
      </ProductList>
    </Container>
  );
};
