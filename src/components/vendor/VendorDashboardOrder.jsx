import location from "../../assets/SVG/dashboard/location_icon.svg";
import contact_icon from "../../assets/SVG/dashboard/contact_icon.svg";
import note from "../../assets/SVG/dashboard/note.svg";
import cancel from "../../assets/SVG/dashboard/round_cancel.svg";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";

import Countdown from "react-countdown";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api-config/axiosInstance";
import Swal from "sweetalert2";


const VendorDashboardOrder = () => {
  const [apply, setApply] = useState(false);

  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const [userOrder, setUserOrder] = useState([]);
  const navigate = useNavigate();

  const date = 0.01;
  const count = date * 60 * 24 * 1000;

  const dates = 7;
  const counts = dates * 60 * 24 * 1000;

  const _date = 2;
  const _count = _date * 60 * 24 * 1000;

  const $date = 12;
  const $count = $date * 60 * 24 * 1000;

  const Completionist = () => {
    return (
      <div className="flex justify-end items-center w-full">
        <p className="text-xl md:text-2xl text-red-500  font-bold font-mono tracking-widest flex justify-end items-center w-full">
          Pickup Rejected!
        </p>
      </div>
    );
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      // setApply(true);
      return (
        <div>
          <Completionist />
        </div>
      );
    } else if (hours < 10 || minutes < 10 || seconds < 10) {
      return (
        <span
          className={`${hours > 0 || minutes > 15 ? "text-green-600" : "text-red-600"
            } font-bold font-mono text-lg tracking-widest  md:text-2xl flex justify-between md:justify-normal w-[330px] p-1 pr-3`}
        >
          {" "}
          <span className="text-xl">Countdown </span>{" "}
          <span className="ml-1">
            {hours < 10 ? `0${hours}` : hours} :{" "}
            {minutes < 10 ? `0${minutes}` : minutes} :{" "}
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </span>
      );
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    fetchData();
  }, []);

  const fullname = localStorage.getItem("fullname");
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getUserOrder?page=0&limit=10&orderStatus=0");
      console.log("get User data", response);
      const res = JSON.parse(response.data.data)
      console.log("order data", res);
      setUserOrder(res.orders);
      // console.log("get user order", userOrder)
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };





  const handlePickup = async (item) => {
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
    console.log("selected pickup request", item)
    const orderId = item.orderId;
    const payload = {
      "orderId": orderId,
      "orderStatus": 1
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
          title: "Successfully Accept Order"
        });
        navigate("/vendor-dashboard-request-issue", {
          state: {
            item
          }
        });
      }
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const renderData = () => {
    return userOrder?.map((item) => (
      <aside className="mb-3 pb-8 flex justify-center lg:justify-between bg-white border p-3 md:pr-16 border-neutral-300 rounded-lg lg:rounded-sm mx-3 md:mx-8 h-full ">
        <div className="">
          <div className="md:hidden flex items-center">
            <Countdown date={Date.now() + count} renderer={renderer} />
          </div>
          <div className="md:hidden flex justify-between items-center w-full p-1 pr-3">
            <p className=" text-neutral-400 text-sm  tracking-wide">
              Order ID: #{item.orderId}
            </p>
            <p className="text-center text-neutral-400 text-sm  tracking-wide leading-3">
              {item.createdAt}
            </p>
          </div>
          <h1 className=" hidden md:block text-neutral-700 text-2xl font-normal  leading-9 tracking-tight p-2">
            {item.scrapInfo.scrapName}
          </h1>
          <div className="flex justify-between w-full">
            <div className="w-full">
              <div className="flex p-1 md:p-2 ">
                <img
                  src={location}
                  alt="location_icon"
                  className="mr-3 md:mr-2"
                />
                <div className="w-[230px] md:w-full">
                  <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Bold']">
                    {item.city}
                  </p>
                  <p className=" text-zinc-600 text-sm font-normal font-['Gilroy-Regular'] ">
                    {item.address}
                  </p>
                </div>
              </div>
              <div className="flex p-2">
                <img
                  src={contact_icon}
                  alt="contact_icon"
                  className="mr-3 md:mr-2"
                />
                <div className="w-[230px] md:w-full">
                  <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Bold']">
                    {item.fullName}
                  </p>
                  <p className=" text-zinc-600 text-sm font-normal font-['Gilroy-Regular'] ">
                    {item.dialCode}{" "} {item.phoneNumber}
                  </p>
                </div>
              </div>

              <section className=" md:hidden">
                <aside className="">
                  <section className="flex flex-col pr-4">
                    <button onClick={() => handlePickup(item)}
                      className={`text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.8rem] border-2 w-full border-lime-600 ${apply ? "hidden" : "block"
                        }`}
                    >
                      Accept Order
                    </button>

                    <button
                      className={`text-center hover:text-white text-base font-semibold tracking-tight hover:bg-lime-600 bg-transparent border-2 border-zinc-500 text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.8rem] w-full hover:border-2 hover:border-lime-600 ${apply ? "hidden" : "block"
                        }`}
                    >
                      Reject Order
                    </button>
                  </section>
                </aside>
              </section>
            </div>
          </div>
        </div>


        <div className="md:flex justify-between items-center flex-col hidden">
          <Countdown date={Date.now() + count} renderer={renderer} />
          <div className="flex justify-end items-end">
            <button
              className={`text-center hover:text-white text-base font-semibold tracking-tight hover:bg-lime-600 bg-transparent border-2 border-zinc-500 text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-3  mt-5 cursor-pointer px-7 py-[.65rem] hover:border-2 hover:border-lime-600 ${apply ? "hidden" : "block"
                }`}
            >
              Reject Pickup
            </button>
            <button onClick={() => handlePickup(item)}
              className={`text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600 ${apply ? "hidden" : "block"
                }`}
            >
              Accept Pickup
            </button>
            <button
              className={`text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-12 py-[.65rem] border-2 border-lime-600 ${apply ? "block" : "hidden"
                }`}
              onClick={() => setApply(false)}
            >
              Reapply
            </button>
          </div>
        </div>

      </aside>
    ))
  }

  return (
    <main>
      <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
      <VendorDashboardHead
        handleNavClick={handleVendorNav}
        showNav={vendorNav}
      />
      <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] bg-green-50 h-full ">
        <section className="mx-5 border-2 border-lime-600 rounded-full mb-2 block lg:hidden md:max-w-[600px] md:mx-auto">
          <div className="flex mx-4 justify-between items-center py-1 ">
            <img src={note} alt="note_icon" className="mr-2 md:w-8" />
            <h1 className=" text-lime-600 font-normal font-['Gilroy-Medium'] text-sm md:text-base leading-4 ">
              Hello {fullname}, You can only accept 5 pickups maximum at once
            </h1>
            <img src={cancel} alt="cancel_icon" className="w-11 ml-2 md:w-8" />
          </div>
        </section>

        {/* <aside className="mb-3 pb-8 flex justify-center lg:justify-between bg-white border p-3 md:pr-16 border-neutral-300 rounded-lg lg:rounded-sm mx-3 md:mx-8 h-full ">
          <div className="">
            <div className="md:hidden flex items-center">
              <Countdown date={Date.now() + count} renderer={renderer} />
            </div>
            <div className="md:hidden flex justify-between items-center w-full p-1 pr-3">
              <p className=" text-neutral-400 text-sm  tracking-wide">
                Order ID: #284921
              </p>
              <p className="text-center text-neutral-400 text-sm  tracking-wide leading-3">
                October, 20th. 8:00 PM
              </p>
            </div>
            <h1 className=" hidden md:block text-neutral-700 text-2xl font-normal  leading-9 tracking-tight p-2">
              A New Order
            </h1>
            <div className="flex justify-between w-full">
              <div className="w-full">
                <div className="flex p-1 md:p-2 ">
                  <img
                    src={location}
                    alt="location_icon"
                    className="mr-3 md:mr-2"
                  />
                  <div className="w-[230px] md:w-full">
                    <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Bold']">
                      Dehli, Groove Estate
                    </p>
                    <p className=" text-zinc-600 text-sm font-normal font-['Gilroy-Regular'] ">
                      234, Knight St Cedar Lake,Groove Estate, Mumbai, India
                    </p>
                  </div>
                </div>
                <div className="flex p-2">
                  <img
                    src={contact_icon}
                    alt="contact_icon"
                    className="mr-3 md:mr-2"
                  />
                  <div className="w-[230px] md:w-full">
                    <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Bold']">
                      Ajay Raj
                    </p>
                    <p className=" text-zinc-600 text-sm font-normal font-['Gilroy-Regular'] ">
                      234, Knight St Cedar Lake,Groove Estate, Mumbai, India
                    </p>
                  </div>
                </div>

                <section className=" md:hidden">
                  <aside className="">
                    <div>
                      <p className=" text-lime-400 text-lg font-semiBold">
                        Order List
                      </p>
                    </div>

                    <section className="px-4 pl-4">
                      <div className="flex justify-between items-center h-full w-full mb-1">
                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Medium']">
                          Carton Corrugated
                        </p>
                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Medium'] leading-[15.18px]">
                          ₹37/KG
                        </p>
                      </div>

                      <div className="flex justify-between items-center h-full w-full mb-1">
                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Medium']">
                          Newspaper
                        </p>
                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Medium'] leading-[15.18px]">
                          ₹18/KG
                        </p>
                      </div>

                      <div className="flex justify-between items-center h-full w-full mb-1">
                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Medium']">
                          Car Scrap
                        </p>
                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Medium'] leading-[15.18px]">
                          ₹37/KG
                        </p>
                      </div>

                      <div className="flex justify-between items-center h-full w-full mb-1">
                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Medium']">
                          Carton Corrugated
                        </p>
                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Medium'] leading-[15.18px]">
                          ₹51/KG
                        </p>
                      </div>
                    </section>

                    <section>
                      <div className="flex justify-between items-center h-full w-full pt-8 px-4">
                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Bold']">
                          Total Weight
                        </p>
                        <p className=" text-neutral-600 text-base font-normal font-['Gilroy-Bold'] leading-[15.18px]">
                          ₹143/KG
                        </p>
                      </div>
                    </section>

                    <section className="flex flex-col pr-4">
                      <button onClick={handlePickup}
                        className={`text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.8rem] border-2 w-full border-lime-600 ${apply ? "hidden" : "block"
                          }`}
                      >
                        Accept Order
                      </button>

                      <button
                        className={`text-center hover:text-white text-base font-semibold tracking-tight hover:bg-lime-600 bg-transparent border-2 border-zinc-500 text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.8rem] w-full hover:border-2 hover:border-lime-600 ${apply ? "hidden" : "block"
                          }`}
                      >
                        Reject Order
                      </button>
                    </section>
                  </aside>
                </section>
              </div>
            </div>
          </div>


          <div className="md:flex justify-between items-center flex-col hidden">
            <Countdown date={Date.now() + count} renderer={renderer} />
            <div className="flex justify-end items-end">
              <button
                className={`text-center hover:text-white text-base font-semibold tracking-tight hover:bg-lime-600 bg-transparent border-2 border-zinc-500 text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-3  mt-5 cursor-pointer px-7 py-[.65rem] hover:border-2 hover:border-lime-600 ${apply ? "hidden" : "block"
                  }`}
              >
                Reject Pickup
              </button>
              <button onClick={handlePickup}
                className={`text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-7 py-[.65rem] border-2 border-lime-600 ${apply ? "hidden" : "block"
                  }`}
              >
                Accept Pickup
              </button>
              <button
                className={`text-center text-white text-base font-semibold tracking-tight bg-lime-600 hover:bg-transparent hover:border-2 hover:border-zinc-500 hover:text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full  mt-5 cursor-pointer px-12 py-[.65rem] border-2 border-lime-600 ${apply ? "block" : "hidden"
                  }`}
                onClick={() => setApply(false)}
              >
                Reapply
              </button>
            </div>
          </div>

        </aside> */}

        {renderData()}
      </section>
    </main>
  );
};

export default VendorDashboardOrder;
