import locationIcon from "../../assets/SVG/dashboard/location_icon.svg";
import contact_icon from "../../assets/SVG/dashboard/contact_icon.svg";
import telephone from "../../assets/SVG/dashboard/telephone.svg";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api-config/axiosInstance";
import Swal from "sweetalert2";

const VendorDashboardArrived = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const navigate = useNavigate();
  const location = useLocation();

  const orderId = location.state.orderId
  console.log("order details ", orderId)


  const hanglePickup = async () => {

    const orderId = location.state.orderId
    const payload = {
      "orderId": orderId.orderId,
      "orderStatus": 3
    }
    try {
      const response = await axiosInstance.post("/updateOrderStatus", payload);
      console.log("get User data", response);
      const data = response.data;
      if (data.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: true,
          timer: 2500,
          title: "Successfully Pickup Scrap"
        });
        navigate("/vendor-dashboard-pickup-scrap", {
          state: {
            orderId
          }
        });
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  return (
    <main className=" bg-white">
      <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
      <VendorDashboardHead
        handleNavClick={handleVendorNav}
        showNav={vendorNav}
      />
      <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] h-full ">
        <div class="mx-auto mt-8 max-w-2xl md:mt-12 ">
          <div class="bg-white shadow-lg p-5">

            <div class="flex flex-col justify-between ml-4 flex-grow">
              <span class="font-bold text-sm">{orderId?.userInfo.firstName}{" "}{orderId?.userInfo.lastName}</span>
              <span class="text-red-500 text-sm">{orderId?.userInfo.dialCode}{orderId?.userInfo.phoneNumber}</span>

            </div>
            <span class="h-1 w-full bg-slate-400 lg:w-1/3"></span>
            <div class="flex flex-row  ml-4 flex-grow mt-2 mb-2">
              <img
                src="https://file.rendit.io/n/C0CS7E4FGckCjnUrkzNJ.svg"
                alt="Carbonlocationfilled"
                id="CarbonlocationfilledRoot"
                className="w-5 h-4"
              />
              <span class="font-bold text-sm"> {orderId?.userInfo.address}</span>
            </div>
            <div className="bg-[#f7f8f6] w-full h-1 " />
            <div class="px-4 py-6 sm:px-8 sm:py-10 mt-2">
              <div class="flow-root">

                <ul class="-my-8">
                  <span class="mt-10 font-bold text-slate-400 text-sm">Order ID:- #{orderId?.orderId}</span>
                  <div>
                    <div class="flex mt-2  mb-5">
                      <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                      <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                      <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                      <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>
                    {orderId.items?.map((scrapDat, index) => (
                      <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                        <div class="flex w-2/5">
                          <div class="w-10">
                            <img class="h-10" src={scrapDat?.scrapInfo.docUrl} alt="" />
                          </div>
                          <div class="flex flex-col justify-between ml-4 flex-grow">
                            <span class="font-bold text-sm">{scrapDat?.scrapInfo.scrapName}</span>
                            <span class="text-red-500 text-sm">{scrapDat?.scrapInfo.quantityType}</span>

                          </div>
                        </div>
                        <div class="flex justify-center w-1/5">
                          {scrapDat?.quantity}
                        </div>
                        <span class="text-center w-1/5 font-semibold text-sm">₹{scrapDat?.scrapInfo.price}</span>
                        <span class="text-center w-1/5 font-semibold text-sm">₹{scrapDat?.scrapInfo.price}</span>
                      </div>
                    ))}
                  </div>


                </ul>
              </div>
              <div class="mt-6 flex text-center justify-end  space-x-4 border-t border-b py-5">
                <div className="flex space-x-4">
                  <button onClick={hanglePickup}
                    className="text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600">
                    I have arrived at pickup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </section>
    </main>
  );
};

export default VendorDashboardArrived;
