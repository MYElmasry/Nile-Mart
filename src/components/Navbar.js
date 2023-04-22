import { Link } from "react-router-dom";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdArrowDropdown, IoMdArrowDropright } from "react-icons/io";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../rtk/slices/users-slice";
function Navbar({ loggedIn, handleLogout }) {
  const cart = useSelector((state) => state.cart);
  const [dropDown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {
    const totalQuantity = cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    setCartLength(totalQuantity);
  }, [cart]);

  const loggined = (
    <>
      <Link to={"/login"} className="login no-underline  text-gray-50">
        Login
      </Link>
      <Link to={"/register"} className="register no-underline text-gray-50">
        Register
      </Link>
      <Link
        to={"/cart"}
        className="cart no-underline text-3xl mt-2 text-gray-50 flex items-center gap-x-1"
      >
        <AiOutlineShoppingCart />
        <span className="cart-number text-sm  text-gray-50">{cartLength}</span>
      </Link>
    </>
  );
  const loggedOut = (
    <>
      <div
        className="text-gray-50 flex cursor-pointer select-none relative items-center"
        onClick={() => setDropDown(!dropDown)}
      >
        <div>Welcome, {localStorage.getItem("firstName")}</div>
        <div className="mt-2">
          {dropDown ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
        </div>
        <div className={dropDown ? "drop-down block z-50" : "drop-down hidden"}>
          {localStorage.getItem("email") === "admin" ? (
            <Link
              to={"/dashboard"}
              className="dashboard cursor-pointer m-0 no-underline "
            >
              Dashboard
            </Link>
          ) : null}
          <p
            className=" cursor-pointer m-0"
            onClick={() => {
              handleLogout();
            }}
          >
            Sign Out
          </p>
        </div>
      </div>
      <Link
        to={"/cart"}
        className="cart no-underline text-2xl mt-2 mr-2 text-gray-50 flex items-center gap-x-1 relative"
      >
        <AiOutlineShoppingCart />
        <span className="cart-number text-sm  text-gray-50 absolute">
          {cartLength}
        </span>
      </Link>
    </>
  );

  return (
    <nav className="flex justify-center items-center">
      <div className="container pt-2 pb-2 flex items-center justify-between flex-wrap ">
        <Logo />
        <div className="order-3 lg:order-2 w-full lg:w-auto px-2">
          <SearchBar />
        </div>
        <div className="buttons-container flex justify-between items-center pr-2 gap-x-3 lg:gap-x-4 order-2 lg:order-3">
          {loggedIn ? loggedOut : loggined}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
