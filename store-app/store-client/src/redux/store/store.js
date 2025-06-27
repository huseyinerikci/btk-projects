import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "../slices/cartSlice";
import { catalogSlice } from "../slices/catalogSlice";
import { accountSlice } from "../slices/accountSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    catalog: catalogSlice.reducer,
    account: accountSlice.reducer,
  },
});
