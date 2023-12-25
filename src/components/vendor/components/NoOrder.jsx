import React, { useEffect, useState } from "react";
import VendorDashboardOrder from "../VendorDashboardOrder";
import scrap_img from "../../../assets/PNG/dashboard/Scrap.png";
import axiosInstance from "../../../api-config/axiosInstance";

const NoOrder = () => {
  const [noScrap, setNoScrap] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getVendorOrder?page=0&limit=10&orderStatus=0");
      console.log("dashboard", response);
      const res = JSON.parse(response.data.data)
      console.log("order data", res);
      if (res.totalScrapCount > 0) {
        setNoScrap(true);
      }


    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      {!noScrap ? (
        <div className="lg:ml-[18%] lg:bg-green-50 h-screen ">
          <section className="flex justify-center items-center h-full">
            <aside className="">
              <img
                src={scrap_img}
                alt="scrap_img"
                className="w-60 md:w-72 lg:w-80"
              />
              <p className="text-center text-neutral-600 text-2xl font-normal font-['Gilroy-Medium']">
                No pending orders
              </p>
            </aside>
          </section>
        </div>
      ) : (
        <VendorDashboardOrder />
      )}{" "}
    </>
  );
};

export default NoOrder;
