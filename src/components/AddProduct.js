import { useFormik } from "formik";
import { editProductSchema } from "./schemas/editProductSchema";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../rtk/slices/products-slice";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [productImage, setProductImage] = useState("");
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(addProduct({ id: products.length + 1, ...values }));
    navigate("/dashboard");
  };
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
        image: "",
        price: 0,
        category: "men's clothing",
      },
      validationSchema: editProductSchema,
      onSubmit,
    });
  return (
    <div className="flex items-center flex-col">
      <form
        autoComplete="off"
        className="mt-3 w-full md:w-2/5 "
        onSubmit={handleSubmit}
      >
        <fieldset className="flex flex-col rounded-md p-4 w-full m-0 bg-white">
          <h2>Add Product</h2>
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
            {errors.image && touched.image ? (
              <p className="FieldError absolute -bottom-2.5">{errors.image}</p>
            ) : null}
          </div>
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="price">
              Price:
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
          <div className="Field relative flex flex-col pb-5">
            <label className="mb-2" htmlFor="category">
              Category:
            </label>
            <select
              id="category"
              name="category"
              className="p-2 rounded-md"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              <option value="men's clothing">Men's clothing</option>
              <option value="women's clothing">Women's clothing</option>
              <option value="jewelery">Jewelery</option>
              <option value="electronics">Electronics</option>
            </select>
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

export default AddProduct;
