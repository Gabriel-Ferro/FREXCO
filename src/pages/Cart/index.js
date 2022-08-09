import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/cart";
import data from "../../data";


export default function Cart() {
  const { productsCart, removeProductToCart, clearCart } = useContext(CartContext);
  const [products] = useState(data);
   
  return (
    <div>
      <Link to="../">Voltar</Link>
      <button onClick={clearCart}>Limpar Carrinho</button>
      <button onClick={[]}>Finalizar Compra
      </button>
      <h1>Produtos no carrinho de compras</h1>
      <p>{JSON.stringify(productsCart)}</p>
      {products.map((product) => (
        <div className="cart" key={product.id}>
          <div className="container">
            <h2>{product.name}</h2>
            <h4>{product.description}</h4>
            <h3>
              {productsCart.find((item) => item.id === product.id)?.qtd
                ? productsCart.find((item) => item.id === product.id)?.qtd
                : 0}
            </h3>
            <button onClick={() => removeProductToCart(product.id)}>Remover do carrinho</button>
            </div>
            <img src={product.image} />
        </div>
      ))}
    </div>
  );
}
