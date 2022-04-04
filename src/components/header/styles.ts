import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  background-color: #333333;

  nav {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0.5rem 1rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: white;
      transition: opacity 0.2s;
      text-decoration: none;

      &:hover {
        opacity: 0.7;
      }
    }

    svg {
      font-size: 2rem;
    }
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    color: white;
  }
`;
