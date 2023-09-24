"use client";
import { toast } from "react-hot-toast";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
};

console.log(initialState.cartState);

export const ProductSlice = createSlice({
  initialState: initialState,
  name: "ProSlice",
  reducers: {
    addProduct: (state, action) => {
      const findProducts = state.cartItem.findIndex(
        (product) => product._id === action.payload._id
      );
      if (findProducts >= 0) {
        //findProducts.cartItem.quantity += 1;
        state.cartItem[findProducts].quantity += 1;
        toast.success(`add ${action.payload.name} to your wallet`);
      } else {
        const productsClone = { ...action.payload };
        state.cartItem.push(productsClone);
        toast.success(`add ${action.payload.name} to your wallet`);
      }
    },
    addItem: (state, action) => {
      state.cartItem.push(action.payload);
      toast.success(`${action.payload.name} add  to cart`);
    },
    EaraseCard: (state, action) => {
      const findProducts = state.cartItem.findIndex(
        (product) => product.id === action.payload.id
      );
      if (state.cartItem[findProducts].quantity > 1) {
        //findProducts.cartItem.quantity += 1;
        state.cartItem[findProducts].quantity -= 1;
        toast.success(`${action.payload.name} remove one item from your Cart`);
      }
    },
    Delete: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (product, i) => i != action.payload
      );
    },
    Clear: (state, action) => {
      state.cartItem = []; /* 
      toast.success(`Clear All Items Successful`); */
    },
  },
});

export const {
  addProduct,
  EaraseCard,
  Delete,
  Clear,
  setOpenCart,
  addItem,
  setCloseCart,
} = ProductSlice.actions;

export const selectCartState = (state) => state.products.cartState;
export const selectCartItem = (state) => state.products.cartItem;

export default ProductSlice.reducer;
