import React from 'react';
import {
  MdDelete,
  MdAddCircleOutline,
  MdRemoveCircleOutline,
} from 'react-icons/md';

import { ProductsAndAmount, useProducts } from '../../hooks/useProducts';
import { formatPrice } from '../../utils/format';

import { Container, Footer, ProductTable } from './style';

export const Cart = () => {
  const { products, removeProduct, updateProduct } = useProducts();

  // Adiciona a propriedade priceFormatted e subTotal a cada objeto de do array products
  const cartFormatted = products.map((product) => ({
    ...product,
    priceFormatted: formatPrice(product.price),
    subTotal: formatPrice(product.price * product.desiredAmount),
  }));

  const total = formatPrice(
    products.reduce((sumTotal, product) => {
      // Pega o acumulador e soma com os subtotais, que é o valor do produto vezes a quantidade que deseja
      return sumTotal + product.price * product.desiredAmount;
    }, 0)
  )

  const handleProductIncrement = (product: ProductsAndAmount) => {
    updateProduct({ productId: product.id, amount: product.desiredAmount + 1 })
  }

  const handleProductDecrement = (product: ProductsAndAmount) => {
    updateProduct({ productId: product.id, amount: product.desiredAmount - 1 })
  }

  const handleRemoveProduct = (productId: number) => {
    removeProduct(productId);
  }

  if (cartFormatted.length === 0) return null;

  return (
    <>
      <Container className="container">
        <ProductTable>
          <thead>
            <tr>
              <th aria-label="product image" />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th aria-label="delete icon" />
            </tr>
          </thead>
          <tbody>
            {cartFormatted.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.image} alt={product.title} />
                </td>
                <td>
                  <strong>{product.title}</strong>
                  <span>{product.priceFormatted}</span>
                </td>
                <td>
                  <div>
                    <button
                      type="button"
                      disabled={product.desiredAmount <= 1}
                      onClick={() => handleProductDecrement(product)}
                    >
                      <MdRemoveCircleOutline size={20} />
                    </button>
                    <input type="text" readOnly value={product.desiredAmount} />
                    <button
                      type="button"
                      onClick={() => handleProductIncrement(product)}
                    >
                      <MdAddCircleOutline size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <strong>{product.subTotal}</strong>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(product.id)}
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </ProductTable>
      </Container>

      <Footer className='container'>
        <button type="button">Finalizar pedido</button>
        <div>
          <span>TOTAL</span>
          <strong>{total}</strong>
        </div>
      </Footer>
    </>
  );
};
