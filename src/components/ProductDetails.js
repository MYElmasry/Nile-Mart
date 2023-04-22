import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.scss";
import { addToCart } from "../rtk/slices/cart-slice";
import { useSnackbar } from "notistack";
import productReviews from "./productsReviews";
import Avatar from "@mui/material/Avatar";
import { useFormik } from "formik";
import { reviewSchema } from "./schemas/reviewSchema";

function ProductDetails() {
  const onSubmit = (values, actions) => {
    setReviews([
      {
        id: reviews.length + 1,
        fullName: `${localStorage.getItem("firstName")} ${localStorage.getItem(
          "lastName"
        )}`,
        rating: values.myRate,
        review: values.myReview,
      },
      ...reviews,
    ]);
    actions.resetForm();
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        myReview: "",
        myRate: 1,
      },
      validationSchema: reviewSchema,
      onSubmit,
    });

  const { enqueueSnackbar } = useSnackbar();
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState(productReviews);
  const [sameCategoryProducts, setSameCategoryProducts] = useState([]);
  useEffect(() => {
    const theProduct = products.find(
      (product) => product.id === +params.productId
    );
    setProduct(() => theProduct);
  }, [products, params.productId]);

  useEffect(() => {
    const filteredProducts = products.filter((productt) => {
      return (
        productt.category === product.category && productt.id !== product.id
      );
    });
    setSameCategoryProducts(() => filteredProducts);
  }, [product.category, product.id, products]);

  return (
    <div className="flex gap-x-3 bg-white rounded-md shadow-xl container mx-auto mt-3 p-2 flex-col items-center md:items-start md:flex-row">
      <div className="img-container ">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="details-container">
        <h1>{product.title}</h1>
        <p className="font-bold text-lg">${product.price}</p>
        <hr />
        <p>
          <span className="font-bold">Category:</span> {product.category}
        </p>
        {product.rating && (
          <p>
            <span className="font-bold">Rating:</span> {product.rating.rate}{" "}
            rate | {product.rating.count} ratings
          </p>
        )}
        <hr />
        <p>{product.description}</p>
        <button
          className="cursor-pointer rounded-full border-0 px-5 py-3 bg-yellow-400 hover:bg-orange-300 duration-300 "
          onClick={() => {
            dispatch(addToCart(product));
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
        </button>
        <hr />
        <h2 className="text-yellow-400">Frequently bought together</h2>
        <ul className="flex gap-x-3 flex-wrap justify-center md:justify-start">
          {sameCategoryProducts.map((sameCategoryProduct) => {
            return (
              <li key={sameCategoryProduct.id}>
                <Link
                  to={`../../products/${sameCategoryProduct.id}`}
                  className="no-underline"
                >
                  <img
                    className="sameCategoryProductsImage cursor-pointer"
                    src={sameCategoryProduct.image}
                    alt={sameCategoryProduct.title}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
        <hr />
        <form
          autoComplete="off"
          className="flex flex-col gap-y-2 py-3"
          onSubmit={handleSubmit}
        >
          <label htmlFor="reveiw" className="font-bold text-lg">
            Write a customer review
          </label>
          <div>
            <label className="font-bold">Rate:</label>
            <select
              id="myRate"
              className="ml-2"
              value={values.myRate}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          {errors.myRate && touched.myRate ? (
            <p className="text-red-600 mt-0">{errors.myRate}</p>
          ) : null}
          <div className="w-full flex flex-col md:flex-row justify-center items-center gap-2">
            <textarea
              className="w-full p-2 md:w-4/5 h-20 focus:outline-none focus:border-yellow-400 rounded-md"
              id="myReview"
              value={values.myReview}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            <button
              type="submit"
              className="w-fit md:w-1/5 cursor-pointer rounded-full border-0 px-5 py-3 bg-yellow-400 hover:bg-orange-300 duration-300"
            >
              Add Review
            </button>
          </div>
          {errors.myReview && touched.myReview ? (
            <p className=" text-red-600 mt-0">
              The review must be at least 20 characters
            </p>
          ) : null}
        </form>
        <p className="font-bold text-lg">Customer Reviews</p>
        {reviews.map((review) => {
          return (
            <div
              key={review.id}
              className=" border-0 border-t border-solid border-t-gray-300"
            >
              <div className="flex items-center gap-x-2">
                <Avatar src="/broken-image.jpg" />
                <h4>{review.fullName}</h4>
              </div>
              <p className="my-0 px-1">
                <span className="font-bold">Rating:</span>{" "}
                {parseInt(review.rating)} rate
              </p>
              <p className="px-1">{review.review}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductDetails;
