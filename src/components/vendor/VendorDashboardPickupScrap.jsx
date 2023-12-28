import locationIcon from "../../assets/SVG/dashboard/location_icon.svg";
import contact_icon from "../../assets/SVG/dashboard/contact_icon.svg";
import telephone from "../../assets/SVG/dashboard/telephone.svg";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../api-config/axiosInstance";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const VendorDashboardPickupScrap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state.orderId
  console.log("order details ", orderId)
  const [payment, setPaymentMode] = useState();
  const [selectPayment, setSelectedPayent] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPayemtMethod();
  }, []);
  const handlePickup = async () => {

    const payload = {
      "orderId": orderId.orderId,
      "orderStatus": 4
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
          title: "Select Payment Mode"
        });

      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  const fetchPayemtMethod = async () => {
    try {
      const response = await axiosInstance.get("/getPaymentType");
      console.log("payment mode", response);
      const data = JSON.parse(response.data.data);
      setPaymentMode(data);
      console.log("get Profile of user ", data)
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePaymentMode = async () => {
    console.log("payment mode", selectPayment);
    const payload = {
      "paymentType": selectPayment,
      "orderId": orderId.orderId
    }

    try {
      const response = await axiosInstance.post("/updatePaymentMethod", payload);
      console.log("get User data", response);
      const data = response.data;
      if (data.statusCode === 200) {
        Swal.fire({
          icon: "success",
          position: "center",
          showConfirmButton: true,
          timer: 2500,
          title: "Successfully Order Completed"
        });
        navigate("/OrderCompleted", {
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

  const handlePayment = (event) => {
    const Payment = event.target.value;

    console.log("selectedCountry", Payment);
    setSelectedPayent(Payment);
  }

  return (
    <main className=" bg-white">
      <VendorDashboardNav />
      <VendorDashboardHead />
      <section className="ml-[18%] pt-[8%] h-full ">
        <aside className="mb-3 pb-8 flex justify-between bg-white border p-3 pr-16 border-neutral-300 rounded-sm mx-8 h-full">
          <div className="">
            <h1 className=" text-neutral-700 text-2xl font-normal font-['Gilroy-Bold'] leading-9 tracking-tight p-2">
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
                    className="mr-2 w-6 "
                  />

                  <p className="text-center text-lime-600 text-lg font-bold leading-[29.09px] tracking-wider">
                    {" "}
                    {orderId.dialCode}{" "} {orderId.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            <div className="flex justify-end items-end">
              <button
                onClick={handlePickup}
                className="text-center text-white text-base font-semibold bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600 tracking-wide">
                I have Pickup Scrap
              </button>
            </div>
          </div>
        </aside>
        <aside className="mb-3 pb-8 flex justify-between bg-white border p-3 pr-16 border-neutral-300 rounded-sm mx-8 h-full">
          <div className="">
            <div className="pt-5 pl-5 w-full lg:max-w-sm ">
              <select value={selectPayment} onChange={handlePayment}
                className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
                {payment.map((option) => {
                  return (
                    <option key={option.paymentType} value={option.paymentType}>
                      {option.paymentType}
                    </option>
                  );
                })}
                {/* <option>ReactJS Dropdown</option>
                <option>Laravel 9 with React</option>
                <option>React with Tailwind CSS</option>
                <option>React With Headless UI</option> */}
              </select>
            </div>

          </div>
          <div className="flex">
            <div className="flex justify-end items-end">
              <button
                onClick={handlePaymentMode}
                className="text-center text-white text-base font-semibold bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600 tracking-wide">
                Submit
              </button>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default VendorDashboardPickupScrap;
