"use client";
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../createReducer/ProductSlice";

export const store = configureStore({
  reducer: {
    products: ProductSlice,
  },
});
