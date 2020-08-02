// feature 1
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: JSON.parse(localStorage.getItem("cartItems"))
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
      size: "",
      sort: "",
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

  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(sort);
    // slice() : clone a new array
    if (sort === "") {
      this.setState({
        sort,
        products: data.products,
      });
    } else {
      this.setState({
        sort: sort,
        products: this.state.products
          .slice()
          .sort((a, b) =>
            sort === "lowest"
              ? a.price < b.price
                ? -1
                : 1
              : sort === "highest"
              ? a.price > b.price
                ? -1
                : 1
              : a.id > b.id
              ? -1
              : 1
          ),
      });
    }
    // implement
  };

  filterProducts = (event) => {
    const size = event.target.value;
    console.log(size);
    if (size === "") {
      this.setState({ size: size, products: data.products });
    } else {
      this.setState({
        sort: "",
        size: size,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(size) >= 0
        ),
      });
    }
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
              <Filter
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              />
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
