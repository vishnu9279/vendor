import note from "../../assets/SVG/dashboard/note.svg";
import cancel from "../../assets/SVG/dashboard/round_cancel.svg";
import VendorDashboardNav from "../src/components/vendor/VendorDashboardNav";
import VendorDashboardHead from "../src/components/vendor/VendorDashboardHead";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import scrap_img from "../../assets/PNG/dashboard/Scrap.png";

import { OrdersEnum, OrdersRespEnum } from "../src/api-config/common";
import showSuccessMessage from "../src/utils/SwalPopup";
import {
  scrapOrdersService,
  updateScrapOrderStatusService,
} from "../src/services/dashBoard";
const buttonText = {
  0: "Accept Pickup",
  1: "On the Way",
  2: "I have arrived at pickup",
  3: "I have Pickup Scrap",
  4: "Order Completed",
};

const VendorDashboardOrder = () => {
  const [apply, setApply] = useState(false);
  const [userOrder, setUserOrder] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);

    const scraps = async () => {
      try {
        const scrapOrders = await scrapOrdersService();
        console.log("vendor orders", scrapOrders);
        setUserOrder(scrapOrders.orders);
      } catch (error) {
        console.error("error", error);
      }
    };
    scraps();
  }, []);

  const fullname = localStorage.getItem("fullname");

  const updateScrapOrderStatus = async (item, orderStatus) => {
    console.log("selected pickup request", item.orderId, orderStatus);
    try {
      const response = await updateScrapOrderStatusService(
        item.orderId,
        orderStatus
      );
      console.log("get User data", response);

      showSuccessMessage(OrdersRespEnum[orderStatus], "success");
      if (orderStatus !== OrdersEnum.REJECTED) {
        navigate("/vendor-dashboard-request-issue", {
          state: {
            item,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const renderData = () => {
    return userOrder?.map((item, index) => (
      <div key={index} className="mx-auto mt-8 max-w-2xl md:mt-12">
        <div className="bg-white shadow-lg">
          <div className="flex flex-col justify-between ml-4 flex-grow">
            <span className="font-bold text-sm">{item?.fullName}</span>
            <span className="text-red-500 text-sm">
              {item?.dialCode}
              {item?.phoneNumber}
            </span>
          </div>
          <span className="h-1 w-full bg-slate-400 lg:w-1/3"></span>
          <div className="flex flex-row  ml-4 flex-grow mt-2">
            <img
              src="https://file.rendit.io/n/C0CS7E4FGckCjnUrkzNJ.svg"
              alt="Carbonlocationfilled"
              id="CarbonlocationfilledRoot"
              className="w-5 h-4"
            />
            <span className="font-bold text-sm">
              {" "}
              {item?.addressInfo.address}
            </span>
          </div>
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              <span className="h-1 w-full bg-slate-400 lg:w-1/3"></span>
              <ul className="-my-8">
                <span className="mt-10 font-bold text-slate-400 text-sm">
                  Order ID:- #{item?.orderId}
                </span>
                <div>
                  <div className="flex mt-2  mb-5">
                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                      Product Details
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Quantity
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Price
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">
                      Total
                    </h3>
                  </div>
                  {item.items?.map((scrapDat, index) => (
                    <div
                      key={index}
                      className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
                    >
                      <div className="flex w-2/5">
                        <div className="w-10">
                          <img
                            className="h-10"
                            src={scrapDat?.scrapInfo.docUrl}
                            alt=""
                          />
                        </div>
                        <div className="flex flex-col justify-between ml-4 flex-grow">
                          <span className="font-bold text-sm">
                            {scrapDat?.scrapInfo.scrapName}
                          </span>
                          <span className="text-red-500 text-sm">
                            {scrapDat?.scrapInfo.quantityType}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-center w-1/5">
                        {scrapDat?.quantity}
                      </div>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        ₹{scrapDat?.price}
                      </span>
                      <span className="text-center w-1/5 font-semibold text-sm">
                        ₹{scrapDat?.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </ul>
            </div>
            <div className="mt-6 mb-6 flex text-center justify-end  space-x-4 border-t border-b">
              <p className="flex text-center absolute right-30  space-x-2">
                Total - ₹ {item?.finalAmount}
              </p>
              <div className="my-7 flex space-x-4">
                <button
                  onClick={() =>
                    updateScrapOrderStatus(item, OrdersEnum.REJECTED)
                  }
                  className={`text-center hover:text-white text-base font-semibold tracking-tight hover:bg-lime-600 bg-transparent border-2 border-zinc-500 text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-3  mt-5 cursor-pointer px-7 py-[.65rem] hover:border-2 hover:border-lime-600 ${
                    apply ? "hidden" : "block"
                  }`}
                >
                  Reject Pickup
                </button>
                <button
                  onClick={() =>
                    updateScrapOrderStatus(item, OrdersEnum.ACCEPTED)
                  }
                  className={`text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600 ${
                    apply ? "hidden" : "block"
                  }`}
                >
                  {buttonText[item.orderStatus]}
                </button>
                <button
                  className={`text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-12 py-[.65rem] border-2 border-lime-600 ${
                    apply ? "block" : "hidden"
                  }`}
                  onClick={() => setApply(false)}
                >
                  Reapply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <VendorDashboardNav />
      <VendorDashboardHead />

      {userOrder?.length > 0 ? (
        <main>
          <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[10%] sm-[10%] h-full ">
            <section className="mx-5 border-2 border-lime-600 rounded-full mb-2 block lg:hidden md:max-w-[600px] md:mx-auto">
              <div className="flex mx-4 justify-between items-center py-1 ">
                <img src={note} alt="note_icon" className="mr-2 md:w-8" />
                <h1 className=" text-lime-600 font-normal font-['Gilroy-Medium'] text-sm md:text-base leading-4 ">
                  Hello {fullname}, You can only accept 5 pickups maximum at
                  once
                </h1>
                <img
                  src={cancel}
                  alt="cancel_icon"
                  className="w-11 ml-2 md:w-8"
                />
              </div>
            </section>

            {renderData()}
          </section>
        </main>
      ) : (
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
      )}
    </div>
  );
};

export default VendorDashboardOrder;
