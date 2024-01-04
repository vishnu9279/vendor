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
import Pagination from "react-js-pagination";


const VendorDashboardOrder = () => {
  const [apply, setApply] = useState(false);

  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const [userOrder, setUserOrder] = useState([]);
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(0);

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

  const handlePageChange = (pageNumber) => {
    console.log(`active page is ${pageNumber}`);
    setPageNumber(pageNumber);
  }

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
      const response = await axiosInstance.get("/getVendorOrder?page=0&limit=10&orderStatus=0");
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

  const handlePickup = async (item, orderStatus) => {
    // this.setState({
    //   [e.target.name]: e.target.value
    // });
    const orderId = item.orderId;
    const payload = {
      orderId,
      orderStatus
    }
    console.log("selected pickup request", item, orderStatus,payload)
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


      <div class="mx-auto mt-8 max-w-2xl md:mt-12">
        <div class="bg-white shadow-lg">

          <div class="flex flex-col justify-between ml-4 flex-grow">
            <span class="font-bold text-sm">{item?.userInfo.firstName}{" "}{item?.userInfo.lastName}</span>
            <span class="text-red-500 text-sm">{item?.userInfo.dialCode}{item?.userInfo.phoneNumber}</span>

          </div>
          <span class="h-1 w-full bg-slate-400 lg:w-1/3"></span>
          <div class="flex flex-row  ml-4 flex-grow mt-2">
            <img
              src="https://file.rendit.io/n/C0CS7E4FGckCjnUrkzNJ.svg"
              alt="Carbonlocationfilled"
              id="CarbonlocationfilledRoot"
              className="w-5 h-4"
            />
            <span class="font-bold text-sm"> {item?.userInfo.address}</span>
          </div>
          <div class="px-4 py-6 sm:px-8 sm:py-10">
            <div class="flow-root">
              <span class="h-1 w-full bg-slate-400 lg:w-1/3"></span>
              <ul class="-my-8">
                <span class="mt-10 font-bold text-slate-400 text-sm">Order ID:- #{item?.orderId}</span>
                <div>
                  <div class="flex mt-2  mb-5">
                    <h3 class="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                    <h3 class="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                  </div>
                  {item.items?.map((scrapDat, index) => (
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
                <button onClick={(e) => handlePickup(item,5)}
                  className={`text-center hover:text-white text-base font-semibold tracking-tight hover:bg-lime-600 bg-transparent border-2 border-zinc-500 text-zinc-500 duration-200 flex items-center justify-center shadow-inner rounded-full mr-3  mt-5 cursor-pointer px-7 py-[.65rem] hover:border-2 hover:border-lime-600 ${apply ? "hidden" : "block"
                    }`}
                >
                  Reject Pickup
                </button>
                <button onClick={(e) => handlePickup(item,1)}
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
          </div>
        </div>
      </div>

    ))
  }

  return (
    <main>
      <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
      <VendorDashboardHead
        handleNavClick={handleVendorNav}
        showNav={vendorNav}
      />
      <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[10%] sm-[10%] h-full ">
        <section className="mx-5 border-2 border-lime-600 rounded-full mb-2 block lg:hidden md:max-w-[600px] md:mx-auto">
          <div className="flex mx-4 justify-between items-center py-1 ">
            <img src={note} alt="note_icon" className="mr-2 md:w-8" />
            <h1 className=" text-lime-600 font-normal font-['Gilroy-Medium'] text-sm md:text-base leading-4 ">
              Hello {fullname}, You can only accept 5 pickups maximum at once
            </h1>
            <img src={cancel} alt="cancel_icon" className="w-11 ml-2 md:w-8" />
          </div>
        </section>



        {renderData()}
        {/* <Pagination
          activePage={pageNumber}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={() => handlePageChange(pageNumber)}
        /> */}
      </section>
    </main>
  );
};

export default VendorDashboardOrder;
