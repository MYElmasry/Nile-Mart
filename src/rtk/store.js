import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./slices/products-slice";
import usersSlice from "./slices/users-slice";
import cartSlice from "./slices/cart-slice";
import ordersSlice from "./slices/orders-slice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    users: usersSlice,
    cart: cartSlice,
    orders: ordersSlice,
  },
});
