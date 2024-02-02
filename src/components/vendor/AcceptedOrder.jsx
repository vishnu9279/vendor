import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api-config/axiosInstance";
import Swal from "sweetalert2";
import scrap_img from "../../assets/PNG/dashboard/Scrap.png";

const buttonText = {
    0: "Accept Pickup",
    1: "On the Way",
    2: "I have arrived at pickup",
    3: "I have Pickup Scrap",
    4: "Order Completed"
  };

const AcceptedOrder = () => {
  const [userOrder, setUserOrder] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchData();
  }, []);

  const handlePickup = async (item) => {
    const orderId = item;
    if(orderStatus >=4){
        return
    }
    const orderStatus =  item.orderStatus + 1
    const payload = {
      orderId: item.orderId,
      orderStatus: item.orderStatus + 1,
    };
    try {
      const response = await axiosInstance.post("/updateOrderStatus", payload);
      const data = response.data;
      if (data.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: true,
          timer: 2500,
          title: "Successfully Arrived",
        });
        navigate("/vendor-dashboard-arrived", {
          state: {
            orderId,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fullname = localStorage.getItem("fullname");
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(
        "/getVendorOrder?page=0&limit=10&orderStatus=1,2,3,4"
      );
      const res = JSON.parse(response.data.data);
      setUserOrder(res.orders);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const renderData = () => {
    return userOrder?.map((item, index) => (
      <section
        key={index}
        className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] lg:bg-green-50 h-full "
      >
        .{" "}
        <div className="mx-auto mt-8 max-w-2xl md:mt-12">
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
                          ₹{scrapDat?.scrapInfo.price}
                        </span>
                        <span className="text-center w-1/5 font-semibold text-sm">
                          ₹{scrapDat?.scrapInfo.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </ul>
              </div>
              <div className="mt-6 flex text-center justify-end  space-x-4 border-t border-b py-5">
                <p className="flex text-center absolute right-30  space-x-4">
                  Total - ₹ {item?.finalAmount}
                </p>
                <div className="my-6 flex space-x-4">
                  <button
                    onClick={() => handlePickup(item)}
                    className="text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600"
                  >
                   {buttonText[item.orderStatus]}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    ));
  };
  return (
    <div>
      <VendorDashboardNav />
      <VendorDashboardHead />
  
      {userOrder?.length > 0 ? (
        <main>
          <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[10%] sm-[10%] h-full ">
  
            {renderData()}
          </section>
        </main>
      ) : (
        <div className="lg:ml-[18%] lg:bg-green-50 h-screen ">
          <section className="flex justify-center items-center h-full">
            <aside className="">
              <img src={scrap_img} alt="scrap_img" className="w-60 md:w-72 lg:w-80" />
              <p className="text-center text-neutral-600 text-2xl font-normal font-['Gilroy-Medium']">
                No Accepted orders
              </p>
            </aside>
          </section>
        </div>
      )}
    </div>
  )
};

export default AcceptedOrder;
