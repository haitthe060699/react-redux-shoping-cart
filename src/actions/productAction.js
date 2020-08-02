import data from "../data.json";
import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispactch) => {
  console.log(data);
  dispactch({
    type: FETCH_PRODUCTS,
    payload: data.products,
  });
};
