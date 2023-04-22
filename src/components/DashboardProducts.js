import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { delProduct } from "../rtk/slices/products-slice";
import Swal from "sweetalert2";

function DashboardProducts() {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-8 rounded duration-300 cursor-pointer float-right my-2 border-0"
        onClick={() => navigate(`/addProduct`)}
      >
        Add Product
      </button>
      {products.length
        ? products.map((product) => {
            const { id, title, image, description, price } = product;
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
                      <span className="font-semibold">${price}</span>
                    </Typography>

                    <div className="buttons-container flex gap-x-1">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 cursor-pointer rounded border-0 duration-300"
                        onClick={() => navigate(`../editProduct/${id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 cursor-pointer rounded border-0 duration-300"
                        onClick={() => {
                          Swal.fire({
                            icon: "warning",
                            title: `<span style="color: red;">Do You Want To Delete <em>${title}?</em></span>`,
                            showCancelButton: true,
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(delProduct(product));
                            }
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </CardContent>
                </Box>
                <img
                  src={image}
                  alt={title}
                  className=" w-full h-1/2 md:h-full md:w-1/5"
                />
              </Card>
            );
          })
        : null}
    </>
  );
}
export default DashboardProducts;
