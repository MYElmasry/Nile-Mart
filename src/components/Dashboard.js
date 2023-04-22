import "./Dashboard.scss";
import DashboardProducts from "./DashboardProducts";
import { BsBoxSeamFill } from "react-icons/bs";
import { ImStatsBars, ImUsers } from "react-icons/im";
import { useState, useEffect } from "react";
import Statistics from "./Statistics";
import Users from "./Users";

function Dashboard() {
  const [renderedPage, setRenderedPage] = useState("DashboardProducts");
  const [sidebarTop, setSidebarTop] = useState("80px");

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY >= 50) {
        setSidebarTop("0");
      } else {
        setSidebarTop(`${80 - window.scrollY}px`);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="dashboard-container container mx-auto px-2 flex bg-white">
      <div
        className="sidebar pt-2 xl:ml-2 flex flex-col justify-start items-center xl:items-start duration-300 fixed"
        style={{ top: sidebarTop }}
      >
        <p
          className=" text-blue-600 text-xl mr-1  float-right my-3   cursor-pointer hover:text-blue-800 flex items-center gap-x-1 font-semibold duration-300"
          onClick={() => setRenderedPage("DashboardProducts")}
        >
          <BsBoxSeamFill /> <span className="hidden xl:block">Products</span>
        </p>
        <p
          className=" text-blue-600 text-xl mr-1 float-right my-3  cursor-pointer hover:text-blue-800 flex items-center gap-x-1 font-semibold duration-300"
          onClick={() => setRenderedPage("Users")}
        >
          <ImUsers /> <span className="hidden xl:block">Users</span>
        </p>
        <p
          className=" text-blue-600 text-xl mr-1 float-right my-3  cursor-pointer hover:text-blue-800 flex items-center gap-x-1 font-semibold duration-300"
          onClick={() => setRenderedPage("Statistics")}
        >
          <ImStatsBars /> <span className="hidden xl:block">Statistics</span>
        </p>
      </div>
      <div className="dashboard-content pl-3 pt-1 ml-auto">
        {renderedPage === "DashboardProducts" ? (
          <DashboardProducts />
        ) : renderedPage === "Users" ? (
          <Users />
        ) : (
          <Statistics />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
