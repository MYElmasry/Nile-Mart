import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { updateCartItemQuantity } from "../rtk/slices/cart-slice";
import { deleteFromCart } from "../rtk/slices/cart-slice";
import { clear } from "../rtk/slices/cart-slice";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { addOrder } from "../rtk/slices/orders-slice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const users = useSelector((state) => state.users);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quantity = cart.reduce((acc, item) => acc + +item.quantity, 0);
  const total = cart
    .reduce((acc, item) => acc + +item.price * +item.quantity, 0)
    .toFixed(2);

  const handleQuantityChange = (cartItem, newQuantity) => {
    const updatedCartItem = { ...cartItem, quantity: +newQuantity };
    dispatch(updateCartItemQuantity(updatedCartItem));
  };
  const handleBuy = () => {
    if (localStorage.getItem("email")) {
      const currentUser = users.find(
        (user) => localStorage.getItem("email") === user.email
      );
      dispatch(
        addOrder({
          userId: currentUser.id,
          products: cart.map((item) => {
            return { productId: item.id, quantity: item.quantity };
          }),
        })
      );
      enqueueSnackbar("Successfully buyed", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
      dispatch(clear());
      navigate("/");
    } else {
      navigate("/login");
      enqueueSnackbar("You have to login first!", {
        variant: "warning",
        autoHideDuration: 3000,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "center",
        },
      });
    }
  };
  return (
    <div className="container mx-auto">
      <h1 className="font-normal">Shopping Cart</h1>
      {cart.length ? (
        <div>
          <button
            className="py-2 px-4 bg-green-500 hover:bg-green-700 text-black-600 border-0 rounded-md text-base font-bold float-right mb-4"
            onClick={() => {
              dispatch(clear());
            }}
          >
            Clear
          </button>
        </div>
      ) : null}
      <div className="flex gap-2 w-full flex-col md:flex-row">
        <div className="w-full md:w-3/4">
          {cart.length
            ? cart.map((cartItem) => {
                const { id, title, image, description, price, quantity } =
                  cartItem;
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
                    <Box
                      sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                    >
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
                            className="p-2 ml-1 w-12 rounded-md bg-gray-100 hover:bg-gray-200 "
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
                    <img
                      src={image}
                      alt={title}
                      className="cart-item-image w-full md:w-[240px]"
                    />
                  </Card>
                );
              })
            : null}
        </div>
        {cart.length ? (
          <div className="w-full md:w-1/4 bg-white h-fit rounded-sm p-5 shadow-md">
            <p className="m-0 mb-3 text-lg">
              Subtotal ({quantity} items):{" "}
              <span className="t font-bold">${total}</span>
            </p>
            <button
              className="w-full border-0 rounded-full py-2 bg-yellow-500 hover:bg-orange-400 duration-300"
              onClick={handleBuy}
            >
              Buy
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Cart;
