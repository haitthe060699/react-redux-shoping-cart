// feature 1
import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
    };
  }

  sortProducts = (event) => {
    const sort = event.target.value;
    console.log(sort);
    // slice() : clone a new array
    if (sort === "") {
      this.setState({
        sort: sort,
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
              <Products products={this.state.products} />
            </div>
            <div className="sidebar">Cart Items</div>
          </div>
        </main>
        <footer>All right is reserved</footer>
      </div>
    );
  }
}

export default App;
