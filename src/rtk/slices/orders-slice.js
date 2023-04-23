import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://fakestoreapi.com/carts";

export const fetchOrders = createAsyncThunk(
  "fetchOrders/ordersSlice",
  async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
);

const ordersSlice = createSlice({
  initialState: [],
  name: "ordersSlice",
  reducers: {
    addOrder: (state, action) => {
      state.push({ id: state.length + 1, ...action.payload });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
