import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: var(--header-bg);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 12px;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3rem;

    a {
      color: white;
      transition: opacity 0.2s;
      text-decoration: none;

      &:hover {
        opacity: 0.7;
      }
    }

    svg {
      font-size: 1.5rem;
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
