import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://fakestoreapi.com/users";

export const fetchUsers = createAsyncThunk(
  "usersSlice/fetchUsers",
  async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  }
);

const usersSlice = createSlice({
  initialState: [
    {
      name: {
        firstname: "admin",
        lastname: "admin",
      },
      email: "admin",
      password: "admin",
    },
  ],
  name: "usersSlice",
  reducers: {
    addUser: (state, action) => {
      const userClone = { id: state.length, ...action.payload };
      return [...state, userClone];
    },
    delUser: (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return [...state, ...action.payload];
    });
  },
});

export const { addUser, delUser } = usersSlice.actions;
export default usersSlice.reducer;
