import "./index.css";
import React, { Component } from "react";
import { filterProducts, sortProducts } from "../../actions/productAction";
import { connect } from "react-redux";

class Filter extends Component {
  sortProducts = (e) => {
    this.props.sortProducts(this.props.filteredProducts, e.target.value);
  };

  filterProducts = (e) => {
    this.props.filterProducts(this.props.products, e.target.value);
  };

  render() {
    console.log(this.props.filteredProducts);

    return !this.props.products ? (
      <div>Loading ...</div>
    ) : (
      <div className="filter">
        <div className="filter-result">
          {this.props.filteredProducts.length} products{" "}
        </div>
        <div className="filter-sort">
          Order{" "}
          <select value={this.props.sort} onChange={this.sortProducts}>
            <option value="">All</option>
            <option value="lastest">Lateset</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Hightest</option>
          </select>
        </div>
        <div className="filter-size">
          Filter{" "}
          <select value={this.props.size} onChange={this.filterProducts}>
            <option value="">ALL</option>
            <option value="X">X</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XXL">XXL</option>
            <option value="XXXL">XXXL</option>
            <option value="XXXXL">XXXXL</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    size: state.products.size,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
