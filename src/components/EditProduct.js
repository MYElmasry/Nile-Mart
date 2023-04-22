import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.scss";
import { editProductSchema } from "./schemas/editProductSchema";
import { editProduct } from "../rtk/slices/products-slice";

function EditProduct() {
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [productImage, setProductImage] = useState("");
  useEffect(() => {
    const theProduct = products.find(
      (product) => product.id === +params.productId
    );
    setProduct(theProduct);
    setProductImage(theProduct.image);
  }, [products, params.productId]);
  const { id, title, image, description, price } = product;

  const onSubmit = (values, actions) => {
    console.log(values);
    dispatch(editProduct({ id, ...values }));
    navigate("/dashboard");
  };
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: "",
      price: 0,
    },
    validationSchema: editProductSchema,
    onSubmit,
  });
  useEffect(() => {
    setValues({
      title: title ?? "",
      description: description ?? "",
      image: image ?? "",
      price: price ?? 0,
    });
  }, [title, description, image, price, setValues]);
  return (
    <div className="flex items-center flex-col">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="mt-3 w-full md:w-2/5 "
      >
        <fieldset className="flex flex-col rounded-md p-4 w-full m-0 bg-white">
          <h2>Edit Product</h2>
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="title">
              Title:
            </label>
            <input
              id="title"
              name="title"
              className="rounded-md h-8"
              type="text"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.title && touched.title ? (
              <p className="FieldError absolute -bottom-2.5">{errors.title}</p>
            ) : null}
          </div>
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="rounded-md h-20 p-2"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            ></textarea>
            {errors.description && touched.description ? (
              <p className="FieldError absolute -bottom-2.5">
                {errors.description}
              </p>
            ) : null}
          </div>
          <div className="Field relative flex flex-col pb-5">
            <input
              id="image"
              name="image"
              className="file-input opacity-0 w-0 h-0 absolute"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  const { name: fileName, size } = file;
                  const fileSize = (size / 1000).toFixed(2);
                  const fileNameAndSize = `${fileName} - ${fileSize}KB`;
                  setProductImage(fileNameAndSize);
                  values.image = reader.result;
                };
                reader.readAsDataURL(file);
              }}
              onBlur={handleBlur}
            />
            <div className="flex flex-col gap-x-2 items-start md:flex-row md:items-center">
              <label
                className="  bg-blue-700 relative flex items-center justify-center text-white font-bold cursor-pointer duration-300"
                htmlFor="image"
              >
                Select Image:
              </label>
              <p className="file-name">{productImage}</p>
            </div>
          </div>
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="price">
              price:
            </label>
            <input
              id="price"
              name="price"
              className="rounded-md h-8"
              type="number"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.price && touched.price ? (
              <p className="FieldError absolute -bottom-2.5">{errors.price}</p>
            ) : null}
          </div>
          <button
            className="w-full cursor-pointer font-bold uppercase rounded-md login-button"
            type="submit"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
export default EditProduct;
