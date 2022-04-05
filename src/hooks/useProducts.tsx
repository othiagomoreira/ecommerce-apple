import { createContext, ReactNode, useContext, useState } from 'react';
import { api } from '../services/api';
import { Products } from '../types';

interface ProductsAndAmount extends Products {
  desiredAmount: number;
}

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProdusctsContextData {
  products: ProductsAndAmount[];
  addProduct: (productId: number) => Promise<void>;
}

const ProdusctsContext = createContext<ProdusctsContextData>(
  {} as ProdusctsContextData
);

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<ProductsAndAmount[]>(() => {
    const storagedProduct = localStorage.getItem('selectedProduct');

    // Se existir no localStorage, transforme o conteúdo de string para seu valor original, e returne o mesmo
    if (storagedProduct) {
      return JSON.parse(storagedProduct);
    }

    // Se for não existir retorna um array vazio
    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const updateProduct = [...products];

      // Verifica se existe um produto com o mesmo id passado por argumento, se existir retorna o mesmo, se não retorna undefined
      const productExists = updateProduct.find(
        (product) => product.id === productId
      );

      console.log(productExists)

      // Puxa da API no caminho /stock o objeto com o mesmo id passado no argumento
      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;

      // Se o produto existir pega o valor de amount e armazena nessa variavel, caso contrário armeze 0 a mesma
      const currentAmount = productExists ? productExists.desiredAmount : 0;

      //Quantidade desejada
      const amount = currentAmount + 1

      if (amount > stockAmount) {
        alert('Quantidade solicitada fora de estoque');
        return;
      }

      if (productExists) {
        productExists.desiredAmount = amount;
      } else {
        const product = await api.get(`/products/${productId}`);

        const newProduct = {
          ...product.data,
          desiredAmount: 1,
        };

        updateProduct.push(newProduct);
      }

      setProducts(updateProduct);
      localStorage.setItem('selectedProduct', JSON.stringify(updateProduct));

    } catch {

    }
  }

  return (
    <ProdusctsContext.Provider value={{ products, addProduct }}>{children}</ProdusctsContext.Provider>
  );
}

export function useProducts(): ProdusctsContextData {
  const context = useContext(ProdusctsContext);

  return context;
}
