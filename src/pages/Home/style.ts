import styled from 'styled-components';

export const Container = styled.main`
  margin: 6rem auto 3rem;
`;

export const ProductList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  grid-gap: 1rem;
  list-style: none;

  li {
    background-color: white;
    padding: 1rem 0.5rem;
    border-radius: 0.25rem;
    box-shadow: rgba(149, 157, 165, 0.1) 0px 8px 15px;

    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    img {
      max-height: 150px;
    }

    & > p {
      color: #6b6b6b;
      text-align: center;
    }

    button {
      display: flex;
      justify-content: space-between;
      align-items: center;

      background-color: #6b6b6b;
      color: #fff;
      border: none;
      border-radius: 0.25rem;
      overflow: hidden;
      transition: filter 0.3s;

      &:hover {
        filter: brightness(0.7);
      }

      & div {
        background-color: var(--header-bg);
        padding: 0.5rem;

        & svg {
          margin-right: 0.5rem;
        }
      }

      & span {
        padding: 0 1rem;
      }
    }
  }
`;
