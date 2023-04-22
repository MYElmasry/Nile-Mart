import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://fakestoreapi.com/products";

export const fetchProducts = createAsyncThunk(
  "productsSlice/fetchProducts",
  async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
);

const productsSlice = createSlice({
  initialState: [],
  name: "productsSlice",
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    editProduct: (state, action) => {
      const product = state.find((product) => {
        return product.id === action.payload.id;
      });
      product.title = action.payload.title;
      product.description = action.payload.description;
      product.image = action.payload.image;
      product.price = action.payload.price;
    },
    delProduct: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const { addProduct, delProduct, editProduct } = productsSlice.actions;
export default productsSlice.reducer;
