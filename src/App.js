import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import Cart from "./components/Cart";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./rtk/slices/products-slice";
import { useEffect, useState } from "react";
import ProductDetails from "./components/ProductDetails";
import Dashboard from "./components/Dashboard";
import EditProduct from "./components/EditProduct";
import AddProduct from "./components/AddProduct";
import { fetchOrders } from "./rtk/slices/orders-slice";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.setItem("email", "");
    setLoggedIn(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/editProduct/:productId" element={<EditProduct />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
