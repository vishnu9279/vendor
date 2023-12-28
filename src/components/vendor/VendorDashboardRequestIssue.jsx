import locationIcon from "../../assets/SVG/dashboard/location_icon.svg";
import contact_icon from "../../assets/SVG/dashboard/contact_icon.svg";
import telephone from "../../assets/SVG/dashboard/telephone.svg";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../api-config/axiosInstance";


const VendorDashboardRequestIssue = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state.item
  console.log("order details ", orderId)
  const handlePickup = async () => {

    console.log("passing data", orderId);
    const payload = {
      "orderId": orderId.orderId,
      "orderStatus": 2
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
          title: "Successfully Arrived"
        });
        navigate("/vendor-dashboard-arrived", {
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
      <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] lg:bg-green-50 h-full ">
        <aside className="mb-3 pb-8  bg-white border p-3 md:pr-16 border-neutral-300 rounded-lg lg:rounded-sm md:mx-8 h-full mx-2">
          <div className="w-full">
            <div className="md:hidden flex items-center w-full pt-3">
              <p className=" text-neutral-400 text-sm font-bold tracking-wide w-full">
                Order ID: #284921
              </p>
              <p className="text-center text-neutral-400 text-sm font-bold tracking-wide leading-3 w-full">
                October, 20th. 8:00 PM
              </p>
            </div>
            <h1 className=" text-neutral-700 text-2xl font-normal font-['Gilroy-Bold'] leading-9 tracking-tight p-2 w-full">
              {orderId.scrapInfo.scrapName}
            </h1>
            <div className="flex justify-between w-full">
              <div className="w-full">
                <div className="flex p-2">
                  <img src={locationIcon} alt="location_icon" className="mr-2" />
                  <div className="">
                    <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Bold']">
                      {orderId.city}
                    </p>
                    <p className=" text-zinc-600 text-sm font-normal font-['Gilroy-Regular'] ">
                      {orderId.address}
                    </p>
                  </div>
                </div>
                <div className="flex p-2">
                  <img src={contact_icon} alt="contact_icon" className="mr-2" />
                  <div className="">
                    <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Bold']">
                      {orderId.fullName}
                    </p>

                  </div>
                </div>
                <div className="flex p-2 items-end">
                  <img
                    src={telephone}
                    alt="telephone_icon"
                    className="mr-2 w-6"
                  />

                  <p className="text-center text-lime-600 text-lg font-bold leading-[29.09px] tracking-wider">
                    {" "}
                    {orderId.dialCode}{" "} {orderId.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex hidden">
            <div className="flex justify-end items-end w-full">
              <button onClick={handlePickup} className="text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600">
                on my way to pickup
              </button>
            </div>
          </div>


        </aside>

        <div className="flex md:hidden w-full justify-center items-center h-full mb-5">
          <div className="flex justify-end items-end">
            <button onClick={handlePickup} className="text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600">
              on my way to pickup
            </button>
          </div>
        </div>

        {/* <aside className="mb-8">
          <p className=" text-neutral-600 text-2xl pl-7 pt-3 font-bold">
            Report an Issue
          </p>

          <div>
            <textarea
              name="text"
              id="text"
              cols="30"
              rows="10"
              className=" bg-lime-50 mx-2 md:mx-5 w-[95%] mt-5 border-[.2rem] border-zinc-50 outline-none p-5 placeholder:text-zinc-700"
              placeholder="click to report issue"
            ></textarea>
          </div>

          <div className="flex justify-center items-end">
            <button className="text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-14 py-[.45rem] border-2 border-lime-600">
              Submit
            </button>
          </div>
        </aside> */}
      </section>
    </main>
  );
};

export default VendorDashboardRequestIssue;
