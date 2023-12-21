import React from "react";
import VendorDashboardOrder from "../VendorDashboardOrder";
import scrap_img from "../../../assets/PNG/dashboard/Scrap.png";

const NoOrder = ({ noScrap }) => {
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
