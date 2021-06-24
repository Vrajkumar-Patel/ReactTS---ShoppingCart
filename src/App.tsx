import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useQuery } from "react-query";
import { Spin, Card } from "antd";
import toast from 'react-hot-toast';

import "./App.css";
import Item from "./components/Item";
import Cart from "./components/Cart";

export type CartItemType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
};

const getData = async (): Promise<CartItemType[]> =>
  await (
    await axios.get("https://fakestoreapi.com/products")
  ).data;

function App() {
  const [cartItem, setCartItem] = useState<CartItemType[]>([]);
  const [quantity, setQuantity] = useState<number>();
  const { data, isLoading, error } = useQuery<CartItemType[] | undefined>(
    "products",
    getData
  );

  // console.log(cartItem);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (cartItem !== []) {
      getTotalItems(cartItem);
    }
  }, [cartItem]);

  const getTotalItems = (cartItems: CartItemType[]): number => {
    const totalItems = cartItems?.reduce(
      (total, item) =>
        item.quantity !== undefined ? item.quantity + total : total + 0,
      0
    );
    setQuantity(totalItems)
    return totalItems;
  };

  const handleAddToCart = (clickedItem: CartItemType) => {
    let cartItemId:number[] = cartItem.map(item => item.id)
    console.log(cartItemId);
    console.log(cartItem);
    if (cartItemId !== []) {
      if (cartItemId.includes(clickedItem.id)) {
        toast.error('Item is already in the Cart')
      }
      else {
        if (clickedItem !== undefined) {
          setCartItem([...cartItem, { ...clickedItem, quantity: 1 }]);
        }
        
      }
    }
    
    
  };

  const handleRemoveFromCart = (id: number): CartItemType[] => {
    let newCart = cartItem.filter((item) => item.id !== id);
    setCartItem(newCart)
    return newCart;
  };

  if (isLoading)
    return (
      <div className="app_spin">
        <Spin size="large" />
      </div>
    );
  if (error) return <h2 className="app_spin">Something went Wrong</h2>;

  return (
    <div className="App">
      <Router>
        <header>
        <Link to='/cart'>
          <FaShoppingCart style={{ fontSize: "35px" }} />
          <span>
            <strong>{ quantity}</strong>
          </span>
        </Link>
        </header>
        <br></br>
        <Switch>
          <Route exact path="/">
            <Card title="All Products">
              {data?.map((item) => (
                <Item item={item} handleAddToCart={handleAddToCart} />
              ))}
            </Card>
          </Route>
          <Route exact path="/cart" >
            {
             cartItem ? <Cart cartItem={cartItem} handleRemoveFromCart={handleRemoveFromCart} /> : <h1>No Products in your Cart</h1>
            }
              
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
