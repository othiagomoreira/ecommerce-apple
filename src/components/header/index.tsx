import React from 'react';
import { FaApple, FaOpencart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import { Cart, Container } from './styles';

export const Header = (): JSX.Element => {
  return (
    <Container>
      <nav>
        <Link to="/" aria-label="Apple - Home">
          <FaApple />
        </Link>

        <Cart to="/cart">
          <FaOpencart />
          <span>0 Itens</span>
        </Cart>
      </nav>
    </Container>
  );
};
