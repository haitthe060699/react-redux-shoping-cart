// feature 1
import React from "react";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: JSON.parse(localStorage.getItem("cartItems"))
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    };
  }

  createOrder = (order) => {
    alert("Need to save order for : " + order.name);
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    // check if already in cart
    let isInCart = false;
    cartItems.forEach((item) => {
      if (item.id === product.id) {
        item.count++;
        isInCart = true;
      }
    });
    if (!isInCart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeFromCart = (item) => {
    const cartItems = this.state.cartItems.slice();
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    this.setState({
      cartItems: newCartItems,
    });
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter />
              <Products addToCart={this.addToCart} />
            </div>
            <div className="sidebar">
              <Cart
                createOrder={this.createOrder}
                removeFromCart={this.removeFromCart}
                cartItems={this.state.cartItems}
              />
            </div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
