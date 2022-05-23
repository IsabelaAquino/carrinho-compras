import React, { useState, useEffect } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { toast } from 'react-toastify';
import { ProductList } from './styles';
import { api } from '../../services/api';
import { formatPrice } from '../../util/format';
import { useCart } from '../../hooks/useCart';
import { trackPromise } from 'react-promise-tracker';
import { Loading } from '../../components/Loading/Loading';
import './style.css'

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();
  const [isLoadingProducts, setIsLoadingProducts] = useState(false)


  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    console.log("product", sumAmount, product)
    sumAmount[product.id] = product.amount

    return sumAmount
  }, {} as CartItemsAmount)

  useEffect(() => {
    loadProducts();

  }, []);

  async function loadProducts() {
      setIsLoadingProducts(true)
      await trackPromise(
          api.get('products').then((response) => {
            setProducts(response.data)

          }).catch(error => toast.error('Ooops... Ocorreu um erro ao buscar produto'))
          .finally(() => {
            setIsLoadingProducts(false)
          })
          
      )
  }

  // function formatPrice(ProductFormatted: {price: number}){
  //   let priceFormatted = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  //   return priceFormatted;
  // }

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    isLoadingProducts ? <Loading /> : 
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong className='descricao'>{ product.title }</strong>
          <span>{ product.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }</span>
          <button
            type="button"
            data-testid="add-product-button"
            onClick={() => handleAddProduct(product.id)}
          >
            <div data-testid="cart-product-quantity">
              <MdAddShoppingCart size={16} color="#FFF" />
              {cartItemsAmount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
};

export default Home;
