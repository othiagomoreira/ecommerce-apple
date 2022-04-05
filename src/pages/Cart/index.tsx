import React from 'react';
import { useProducts } from '../../hooks/useProducts';

export const Cart = () => {
  const { products } = useProducts();



  return <div>Cart</div>;
};
