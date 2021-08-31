import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//types
import { ProductType } from "../types/product.type";

const initialState: ProductType[] = [];

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    addToProducts(state, action) {
      return [action.payload, ...state];
    },
    removeFromProducts(state, action) {
      return action.payload;
    },
    cleanProducts() {
      return initialState;
    },
  },
});

export const { addToProducts, removeFromProducts, cleanProducts } =
  products.actions;
export default products.reducer;
