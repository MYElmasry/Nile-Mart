import { AiOutlineSearch } from "react-icons/ai";
import "./SearchBar.scss";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
function SearchBar() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const products = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [toggleSearchInput, setToggleSearchInput] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const results = products
      .filter((product) =>
        product.title.toLowerCase().startsWith(searchTerm.toLowerCase())
      )
      .slice(0, 10);
    setFilteredProducts(results);
  }, [searchTerm, products, toggleSearchInput]);
  return (
    <>
      <div className="search-bar flex justify-center items-center relative z-10">
        <input
          type="text"
          placeholder="Search Nile Mart"
          className="search-input"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          onBlur={() => {
            handleClose();
            setTimeout(() => {
              setFilteredProducts([]);
            }, 100);
          }}
          onFocus={(e) => {
            setToggleSearchInput(!toggleSearchInput);
            handleOpen();
          }}
        />
        <button type="submit" className="submit-button">
          <AiOutlineSearch />
        </button>
        <ul className="bg-gray-50 absolute top-full left-0 shadow-lg w-full">
          {searchTerm === ""
            ? []
            : filteredProducts.map((product) => {
                return (
                  <Link
                    to={`products/${product.id}`}
                    className="no-underline text-black"
                    key={product.id}
                    onClick={() => {
                      setSearchTerm(product.title);
                      setFilteredProducts([]);
                    }}
                  >
                    <li className="hover:bg-gray-300 p-2 pl-2 flex items-center gap-2 cursor-pointer">
                      <div>
                        <AiOutlineSearch />
                      </div>
                      <div>{product.title}</div>
                    </li>
                  </Link>
                );
              })}
        </ul>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: 1 }}
        open={open}
        onClick={handleClose}
      ></Backdrop>
    </>
  );
}
export default SearchBar;
