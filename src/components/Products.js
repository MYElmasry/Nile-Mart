import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./Products.scss";
import { addToCart } from "../rtk/slices/cart-slice";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";

function Products() {
  const { enqueueSnackbar } = useSnackbar();
  const cart = useSelector((state) => state.cart);
  const data = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const allCategories = [
    "all",
    ...new Set(data.map((product) => product.category)),
  ];
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setProducts(data);
  }, [data]);
  const filterProducts = (category) => {
    if (category === "all") {
      setProducts(data);
      return;
    }
    const filteredProducts = data.filter(
      (product) => product.category === category
    );
    setProducts(filteredProducts);
    return;
  };
  return (
    <div>
      <div className="hidden md:flex justify-center mt-4 gap-2">
        {allCategories.map((category) => {
          return (
            <button
              key={category}
              className=" category-button rounded-md border-none bg-transparent text-base capitalize tracking-wider duration-300 hover:text-gray-50"
              onClick={() => filterProducts(category)}
            >
              {category}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4 p-4 justify-center products-container ">
        {products.map((product) => {
          const { title, image, price } = product;
          return (
            <Card sx={{ width: 345 }} key={product.id}>
              <img src={image} alt={title} className="card-image" />
              <CardContent>
                <Typography
                  sx={{
                    height: 60,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontSize: 18,
                  }}
                  className="two-lines"
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {title}
                </Typography>

                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="font-bold"
                >
                  ${price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => {
                    dispatch(addToCart(product));
                    console.log(cart);
                    enqueueSnackbar("Added to Cart", {
                      variant: "success",
                      autoHideDuration: 3000,
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "center",
                      },
                    });
                  }}
                >
                  Add To Cart
                </Button>
                <Link to={`products/${product.id}`} className="no-underline">
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
