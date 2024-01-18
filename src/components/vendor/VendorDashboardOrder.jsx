import note from "../../assets/SVG/dashboard/note.svg";
import cancel from "../../assets/SVG/dashboard/round_cancel.svg";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import { useEffect, useState } from "react";
import scrap_img from "../../assets/PNG/dashboard/Scrap.png";
// import { OrdersRespEnum } from "../../api-config/common";
import { scrapOrdersService } from "../../services/dashBoard";
import location_icon from "../../assets/SVG/dashboard/location.svg";
import { Link } from "react-router-dom";
const VendorDashboardOrder = () => {
  console.log("VendorDashboardOrder");
  const [userOrder, setUserOrder] = useState([]);
  const [filterOrderStatus, setFilterOrderStatus] = useState("0");
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const perPageCount = 10;
  const fullname = localStorage.getItem("fullname");
  const [finalOrderList, setFinalOrdetrLis] = useState();
  const scraps = async (queryString, obj) => {
    try {
      // const scrapOrders = await scrapOrdersService(queryString,obj);
      const scrapOrders = await scrapOrdersService(
        queryString,
        obj,
        page - 1,
        perPageCount
      );
      console.log("vendor orders", scrapOrders);
      setUserOrder(scrapOrders.orders);
      setFinalOrdetrLis(scrapOrders?.orders);
      setTotalPageCount(Math.ceil(scrapOrders.totalScrapCount / perPageCount));
    } catch (error) {
      console.error("error", error);
    }
  };
  //  console.log("finalOrderList",finalOrderList)

  const filterByOrderStatus = async (filterStatus) => {
    console.log("filterByOrderStatus", filterOrderStatus, filterStatus);
    const filterValue = filterStatus
      ? filterStatus.target.value
      : filterOrderStatus;

    let queryString = "";
    try {
      if (filterValue.toLowerCase() === "all") {
        queryString += "0,1,2,3,4";
      } else {
        queryString += filterValue;
      }

      setFilterOrderStatus(queryString);
      await scraps(queryString);
      console.log("queryString", queryString);
    } catch (error) {
      console.error("Error during select payment method");
    }
  };

  const filetrOrderBySearch = async (event) => {
    console.log("serach event", event.target.value);
    // setSearchFilter(event.target.value);
    let obj = {};
    try {
      obj.key = event.target.value;
      console.log("searchFilter", obj, filterOrderStatus);
      await scraps(filterOrderStatus, obj);
    } catch (error) {
      console.error("Search Error", error);
    }
  };

  const selectPageHandler = (selectedPage) => {
    console.log("selectPageHandler", userOrder);
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPageCount &&
      selectedPage !== page
    ) {
      console.log("selectedPage", selectedPage);
      setPage(selectedPage);
    }
  };
  useEffect(() => {
    // window.scrollTo(0, 0);

    filterByOrderStatus();
  }, [page]);
  const [finalOrderListArray, setFinalOrderListArray] = useState([]);
  useEffect(() => {
    // Calculate time differences for each item in the data array
    const calculateTimeDifferences = () => {
      const currentTime = new Date();

      const differences = finalOrderList?.map((item) => {
        const createdTime = new Date(item.createdAt);
        console.log("createdTimedifferences", createdTime);
        const timeDiffInMillis = currentTime - createdTime;
        console.log("createdtimeDiffInMillis", timeDiffInMillis);
        // Convert time difference to hours, minutes, and seconds
        const hours = Math.floor(timeDiffInMillis / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeDiffInMillis % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDiffInMillis % (1000 * 60)) / 1000);

        return {
          ...item,
          timeDifference: { hours, minutes, seconds },
        };
      });

      setFinalOrderListArray(differences);
    };

    calculateTimeDifferences();

    // Update the time differences every second
    const intervalId = setInterval(calculateTimeDifferences, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [finalOrderList]);
  console.log("finalOrderListArray", finalOrderListArray);
  const renderData = () => {
    return (
      <main>
        <section className="lg:ml-[1%] h-full p-3 sm:p-0">
          <div id="NewRootRoot" className="flex flex-col w-full">
            <div className="flex-grow overflow-x-auto">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 bg-[#F7FFF1]">
                <div className="overflow-hidden">
                  {/* <table className="min-w-full">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          SN. No
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Order Status
                        </th>
                        <th
                          scope="col"
                          className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          View Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userOrder?.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.createdAt}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.orderId}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.fullName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.dialCode} {item.phoneNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.finalAmount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {OrdersRespEnum[item.orderStatus]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <Link to={`/order-detail/${item.orderId}`}>
                              <button className="bg-lime-600 text-white px-3 py-1 rounded">
                                Details
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                  <div className="flex flex-col gap-12">
                    {finalOrderListArray?.map((item, index) => (
                      <div
                        key={index}
                        className="border-b h-[250px] w-full bg-white border-[1px] border-[#D0D1D2] px-4 sm:px-10 py-3 sm:py-6"
                      >
                        {/* <span className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </span>
                        <span className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.createdAt}
                        </span>
                        <span className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.orderId}
                        </span>
                        <span className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.fullName}
                        </span>
                        <span className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.dialCode} {item.phoneNumber}
                        </span>
                        <span className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.finalAmount}
                        </span>
                        <span className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {OrdersRespEnum[item.orderStatus]}
                        </span>
                        <span className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <Link to={`/order-detail/${item.orderId}`}>
                            <button className="bg-lime-600 text-white px-3 py-1 rounded">
                              Details
                            </button>
                          </Link>
                        </span> */}
                        <div className="flex justify-between items-center">
                          <span className="text-black text-[20px]">
                            A New Order from {item?.fullName}
                          </span>
                          <div className="text-[#E33629] text-[17px] flex flex-row gap-1">
                            <p>Countdown:</p>
                            <span>
                              {`${item?.timeDifference?.hours}:${item?.timeDifference?.minutes}:${item?.timeDifference?.seconds}`}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-4">
                          <div className="flex flex-col justify-start">
                            <div className="flex items-center">
                              {/* <img
                                src={location_icon}
                                alt="location_icon"
                                className="w-7 mr-.5 cursor-pointer"
                              />

                              <span className="text-black text-[17px]">
                                Delhi, Groove Estate
                              </span> */}
                            </div>
                            {/* <div className="ml-7">
                              <span className="text-black text-[14px]">
                                {item?.addressInfo?.city},{" "}
                                {item?.addressInfo?.address}
                              </span>
                            </div> */}
                          </div>
                          <div className="flex items-center mt-5">
                            <div className="flex flex-col justify-start">
                              <div className="flex items-center">
                                <img
                                  src={location_icon}
                                  alt="location_icon"
                                  className="w-7 mr-.5 cursor-pointer"
                                />

                                <span className="text-black text-[17px]">
                                  {item?.fullName}
                                </span>
                              </div>
                              <div className="ml-7">
                                <span className="text-black text-[14px]">
                                  {item?.addressInfo?.city},{" "}
                                  {item?.addressInfo?.address}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex items-start justify-end">
                          <span className=" whitespace-nowrap text-sm font-medium text-gray-900 h-fit">
                            <Link to={`/order-detail/${item.orderId}`}>
                              <button className="bg-[#3CB043] text-white w-[100px] py-2 rounded-full">
                                Details
                              </button>
                            </Link>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  };

  return (
    <div className="bg-[#F7FFF1]">
      <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
      <div className="flex flex-col">
        <VendorDashboardHead
          handleNavClick={handleVendorNav}
          showNav={vendorNav}
        />
        <div>
          <div className="relative flex flex-col gap-4 lg:ml-[18%] mt-[7%] sm-[10%] h-full bg-[#F7FFF1]">
            <div className="bg-[#F7FFF1] w-full flex justify-end gap-5 items-center pr-8">
              <div className="flex items-center gap-4">
                <p className="pl-5 relative right-0 lg:max-w-sm">
                  Order Status
                </p>
                <select
                  value={filterOrderStatus}
                  onChange={filterByOrderStatus}
                  className=" text-gray-500 bg-white border rounded-md h-9 w-[150px] shadow-sm outline-none appearance focus:border-indigo-600"
                >
                  <option value="0">Pending Order</option>

                  <option value="all">All</option>
                  <option value="1">Accpted Order</option>
                  <option value="2">On the Way</option>
                  <option value="3">Arrived</option>
                  <option value="4">Scrap Picked</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="block py-3 text-black">Search</label>
                <div className="flex items-center h-9 w-[250px] border rounded-md bg-[#80d7421c]">
                  <input
                    onChange={(e) => {
                      filetrOrderBySearch(e);
                    }}
                    placeholder="Search"
                    className="p-1 w-[250px] h-9 text-black outline-none border bg-transparent bg-white rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
          {userOrder?.length > 0 ? (
            <main className="bg-[#F7FFF1]">
              <section className="lg:ml-[18%] h-full bg-white">
                <section className="mx-3 border-2 border-lime-600 rounded-full mt-[20%] mb-2 block lg:hidden md:max-w-[600px] md:mx-auto bg-white">
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
          <div className="lg:ml-[18%]">
            {userOrder && userOrder?.length > 0 && (
              <div className="pagination">
                <span
                  onClick={() => selectPageHandler(page - 1)}
                  className={page > 1 ? "" : "pagination__disable"}
                >
                  ◀
                </span>

                {Array.isArray(userOrder) &&
                  [...Array(Math.ceil(totalPageCount))].map((_, i) => {
                    {
                      console.log("pagination 178", userOrder.length);
                    }
                    return (
                      <span
                        key={i}
                        className={page === i + 1 ? "pagination__selected" : ""}
                        onClick={() => selectPageHandler(i + 1)}
                      >
                        {i + 1}
                      </span>
                    );
                  })}

                <span
                  onClick={() => selectPageHandler(page + 1)}
                  className={page < totalPageCount ? "" : "pagination__disable"}
                >
                  ▶
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardOrder;
