import { useSelector } from "react-redux";
import { BsBoxSeamFill } from "react-icons/bs";
import { ImUsers } from "react-icons/im";
import { MdOutlineStarRate } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";

import "./Statistics.scss";
import { useEffect, useState } from "react";

import { Chart, Export, Series } from "devextreme-react/chart";

function Statistics() {
  const products = useSelector((state) => state.products);
  const orders = useSelector((state) => state.orders);
  const users = useSelector((state) => state.users);
  const [rates, setRates] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ].map((category) => {
    return {
      category: category,
      rates:
        products
          .filter((product) => product.category === category)
          .reduce((acc, product) => {
            return acc + product.rating.rate;
          }, 0) /
        products.filter((product) => product.category === category).length,
    };
  });

  useEffect(() => {
    const sum = products.reduce(
      (acc, product) => acc + product.rating.count,
      0
    );
    setRates(sum);
  }, [products]);

  useEffect(() => {
    const calculateTotalRevenue = () => {
      // Calculate the total revenue
      const revenue = orders.reduce((total, order) => {
        // Calculate the revenue for each product in the order
        const orderRevenue = order.products.reduce((orderTotal, product) => {
          const matchingProduct = products.find(
            (p) => p.id === product.productId
          );
          return orderTotal + matchingProduct.price * product.quantity;
        }, 0);
        // Add the revenue for the order to the total revenue
        return total + orderRevenue;
      }, 0);

      // Set the total revenue state variable
      setTotalRevenue(revenue.toFixed(2));
    };

    calculateTotalRevenue();
  }, [orders, products]);

  return (
    <div className="my-2">
      <div className="w-full flex flex-wrap gap-2 text-center">
        <div className="products-number box  rounded-lg text-sm text-gray-400 p-5">
          <BsBoxSeamFill className=" text-red-400 mb-2 text-xl" />
          <span className="block font-bold text-2xl mb-1 text-black">
            {products.length}
          </span>
          Products
        </div>
        <div className="products-number box  rounded-lg text-sm text-gray-400 p-5">
          <ImUsers className=" text-blue-400 mb-2 text-2xl" />
          <span className="block font-bold text-2xl mb-1 text-black">
            {users.length}
          </span>
          Users
        </div>
        <div className="products-number box  rounded-lg text-sm text-gray-400 p-5">
          <MdOutlineStarRate className=" text-orange-400 mb-2 text-2xl" />
          <span className="block font-bold text-2xl mb-1 text-black">
            {rates}
          </span>
          Ratings
        </div>
        <div className="products-number box  rounded-lg text-sm text-gray-400 p-5">
          <FiDollarSign className=" text-green-400 mb-2 text-2xl" />
          <span className="block font-bold text-2xl mb-1 text-black">
            {totalRevenue}
          </span>
          Revenue
        </div>
      </div>
      <div className="mt-5">
        <Chart
          dataSource={categories}
          title="Average Rate Of Each Category Products"
        >
          <Series
            valueField="rates"
            argumentField="category"
            name="Rates"
            type="bar"
            color="#ffaa66"
          />
          <Export enabled={true} />
        </Chart>
      </div>
    </div>
  );
}
export default Statistics;
