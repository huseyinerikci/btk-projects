import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../slices/cartSlice";
import { catalogSlice } from "../slices/catalogSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    catalog: catalogSlice.reducer,
  },
});
