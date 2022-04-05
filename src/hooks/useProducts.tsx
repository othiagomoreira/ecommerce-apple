import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Products } from '../types';

export interface ProductsAndAmount extends Products {
  desiredAmount: number;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProdusctsContextData {
  products: ProductsAndAmount[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => Promise<void>;
  updateProduct: ({ productId, amount }: UpdateProductAmount) => void;
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

      console.log(productExists);

      // Puxa da API no caminho /stock o objeto com o mesmo id passado no argumento
      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;

      // Se o produto existir pega o valor de amount e armazena nessa variavel, caso contrário armeze 0 a mesma
      const currentAmount = productExists ? productExists.desiredAmount : 0;

      //Quantidade desejada
      const amount = currentAmount + 1;

      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
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
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = async (productId: number) => {
    try {
      const updateProduct = [...products];

      // Quando não encontrado o findIndex retorna -1
      const productIndex = updateProduct.findIndex(
        (product) => product.id === productId
      );

      // Se encontrou ...
      if (productIndex >= 0) {
        // Deleta do array o produto que retornou de productIndex
        updateProduct.splice(productIndex, 1);

        // Atualiza o array products, e as informações no localStorage
        setProducts(updateProduct);
        localStorage.setItem('selectedProduct', JSON.stringify(updateProduct));
      } else {
        throw Error();
      }
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProduct = async ({ productId, amount }: UpdateProductAmount) => {
    // Recebe o amount como valor dejesado, ou seja com + 1
    try {
      // Se a quantidade desejada do produto for menor ou igual a 0, sai da funçao
      if (amount <= 0) {
        return;
      }

      // Verificação de estoque
      const stock = await api.get(`/stock/${productId}`);
      const stockAmount = stock.data.amount;

      // Se a quantidade desejada for maior do que o valor em estoque, exibe essa mensagem e cancela a função
      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      }

      const updateProduct = [...products];
      const productExists = updateProduct.find(
        (product) => product.id === productId
      );

      // Se o produto existir, desiredAmount passa a ter o mesmo valor que amount
      // Atualiza as informações do array products e localStorage
      if (productExists) {
        productExists.desiredAmount = amount;
        setProducts(updateProduct);
        localStorage.setItem('selectedProduct', JSON.stringify(updateProduct));
      } else {
        throw Error()
      }
    } catch {
      toast.error('Erro na alteração de quantidade de produto')
    }
  }

  return (
    <ProdusctsContext.Provider value={{ products, addProduct, removeProduct, updateProduct }}>
      {children}
    </ProdusctsContext.Provider>
  );
}

export function useProducts(): ProdusctsContextData {
  const context = useContext(ProdusctsContext);

  return context;
}
