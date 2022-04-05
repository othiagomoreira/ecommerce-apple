import React from 'react';
import { FaApple, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';

import { Cart, Container } from './styles';

export const Header = (): JSX.Element => {
  const { products } = useProducts();
  const amountOfProducts = products.length;

  return (
    <Container>
      <nav className="container">
        <Link to="/" aria-label="Apple - Home">
          <FaApple />
        </Link>

        <Cart to="/cart">
          <FaShoppingBag />
          <span>
            {amountOfProducts <= 1 ? `${amountOfProducts} item` : `${amountOfProducts} itens`}
          </span>
        </Cart>
      </nav>
    </Container>
  );
};
