import data from "../data.json";
import { FETCH_PRODUCTS } from "../types";
import { FILTER_PRODUCTS_BY_SIZE } from "../types";
import { ORDER_PRODUCTS_BY_PRICE } from "../types";

export const fetchProducts = () => async (dispatch) => {
  dispatch({
    type: FETCH_PRODUCTS,
    payload: data.products,
  });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      items:
        size === ""
          ? products
          : products
              .slice()
              .filter((item) => item.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filterProducts, sort) => (dispatch) => {
  const sortedProducts = filterProducts.slice();
  if (sort === "") {
    sortedProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price < b.price
          ? -1
          : 1
        : sort == "highest"
        ? a.price > b.price
          ? -1
          : 1
        : a.id > b.id
        ? -1
        : 1
    );
  }
  dispatch({
    type: ORDER_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
