import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./Cart.scss";
import { updateCartItemQuantity } from "../rtk/slices/cart-slice";
import { deleteFromCart } from "../rtk/slices/cart-slice";
import { clear } from "../rtk/slices/cart-slice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (cartItem, newQuantity) => {
    const updatedCartItem = { ...cartItem, quantity: newQuantity };
    dispatch(updateCartItemQuantity(updatedCartItem));
  };

  return (
    <div className="container mx-auto">
      <h1 className="font-normal">Shopping Cart</h1>
      {cart.length ? (
        <button
          className="py-2 px-4 bg-green-500 hover:bg-green-700 text-black-600 border-0 rounded-md text-base font-bold float-right mb-4"
          onClick={() => {
            dispatch(clear());
          }}
        >
          Clear
        </button>
      ) : null}
      {cart.length
        ? cart.map((cartItem) => {
            const { id, title, image, description, price, quantity } = cartItem;
            return (
              <Card
                key={id}
                className="mb-4 p-2 flex-col-reverse md:flex-row-reverse"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <CardContent>
                    <Typography component="div" variant="h5">
                      {title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {description}
                    </Typography>
                    <Typography
                      component="div"
                      variant="h4"
                      className="font-semibold"
                      sx={{ marginTop: 2 }}
                    >
                      <span className="font-semibold">
                        ${(+price * +quantity).toFixed(2)}
                      </span>
                    </Typography>
                    <span className="block my-3">
                      Quantity:
                      <input
                        type="number"
                        value={quantity}
                        min={1}
                        className="p-2 w-12 rounded-md bg-gray-100 hover:bg-gray-200 "
                        onChange={(e) =>
                          handleQuantityChange(cartItem, e.target.value)
                        }
                      />
                    </span>
                    <button
                      className="py-2 px-4 bg-red-500 hover:bg-red-700 text-gray-50 border-0 rounded-md"
                      onClick={() => {
                        dispatch(deleteFromCart(cartItem));
                      }}
                    >
                      Delete
                    </button>
                  </CardContent>
                </Box>
                <img src={image} alt={title} className="cart-item-image" />
              </Card>
            );
          })
        : null}
    </div>
  );
}

export default Cart;
