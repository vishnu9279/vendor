import note from "../../assets/SVG/dashboard/note.svg";
import cancel from "../../assets/SVG/dashboard/round_cancel.svg";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import { useEffect, useState } from "react";
import scrap_img from "../../assets/PNG/dashboard/Scrap.png";
import { OrdersRespEnum } from "../../api-config/common";
import { scrapOrdersService } from "../../services/dashBoard";
import { Link } from "react-router-dom";

const History = () => {
  const [userOrder, setUserOrder] = useState([]);
  const [filterOrderStatus, setFilterOrderStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const perPageCount = 10;
  useEffect(() => {
    window.scrollTo(0, 0);

    filterByOrderStatus();
  }, [page]);

  const fullname = localStorage.getItem("fullname");
  const scraps = async (queryString, obj) => {
    try {
      const scrapOrders = await scrapOrdersService(
        queryString,
        obj,
        page - 1,
        perPageCount
      );
      setUserOrder(scrapOrders.orders);
      console.log("scrapOrders.orders", scrapOrders.orders);
      setTotalPageCount(Math.ceil(scrapOrders.totalScrapCount / perPageCount));
    } catch (error) {
      console.error("error", error);
    }
  };

  const filterByOrderStatus = async (filterStatus) => {
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
    } catch (error) {
      console.error("Error during select payment method");
    }
  };

  const filetrOrderBySearch = async (event) => {
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
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPageCount &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };
  const dateTimeCalculate = (dateTime) => {
    // const dateString = '2024-01-17T17:52:39.640Z';
    const dateInUTC = new Date(dateTime);
    // Convert to IST (Indian Standard Time)
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const dateInIST = dateInUTC
      .toLocaleDateString("en-IN", options)
      .replace(/-/g, "/");
    const options2 = {
      timeZone: "Asia/Kolkata",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const istTime = dateInUTC.toLocaleTimeString("en-IN", options2);
    return `${dateInIST}, ${istTime}`;
  };
  const renderData = () => {
    return (
      <main className="">
        <section className="h-full">
          <div
            id="NewRootRoot"
            className="flex flex-col w-full shadow bg-white"
          >
            <div className="flex-grow overflow-x-auto">
              <div className="py-2 inline-block w-full sm:px-6 lg:px-8">
                <div className="">
                  <table className="min-w-full">
                    <thead className="rounded-xl">
                      <tr className="bg-[#EBFFDD] flex flex-row">
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl  w-[80px] flex justify-center items-center"
                        >
                          SN. No
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl  w-[150px] flex justify-center items-center"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl  w-[110px] flex justify-center items-center"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl w-[110px] flex justify-center items-center"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl w-[150px] flex justify-center items-center"
                        >
                          Phone
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl  w-[110px] flex justify-center items-center"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl w-[150px]  flex justify-center items-center"
                        >
                          Order Status
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl w-[150px] flex justify-center items-center"
                        >
                          Address
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl w-[150px] flex justify-center items-center"
                        >
                          Pincode
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl w-[150px] flex justify-center items-center"
                        >
                          Platform Fee
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl w-[150px] flex justify-center items-center"
                        >
                          Vendor Payment Status
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl w-[150px] flex justify-center items-center"
                        >
                          Admin Approved Status
                        </th>
                        <th
                          scope="col"
                          className="text-[16px] font-medium text-[#707070] px-3 py-4 text-left rounded-r-xl w-[120px]"
                        >
                          View Detail
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userOrder?.map((item, index) => (
                        <tr
                          key={index}
                          className={` flex flex-row ${
                            index % 2 != 0 ? "bg-[#FAFAFA]" : "bg-white"
                          }`}
                        >
                          <td className="text-[16px] font-medium text-[#707070] text-left rounded-l-xl w-[80px] flex justify-center items-center">
                            {index + 1}
                          </td>
                          <td className="text-[16px] font-medium text-[#707070] text-left w-[150px] flex justify-center items-center">
                            {/* {item.createdAt} */}
                            {dateTimeCalculate(item?.createdAt)}
                          </td>
                          <td className="text-[16px] font-medium text-[#707070] text-left w-[110px] flex justify-center items-center">
                            {item.orderId}
                          </td>
                          <td className="text-[16px] font-medium text-[#707070] text-left w-[110px] flex justify-center items-center">
                            {item.fullName}
                          </td>
                          <td className="text-[16px] font-medium text-[#707070] text-left w-[150px] flex justify-center items-center">
                            {item.dialCode} {item.phoneNumber}
                          </td>
                          <td className="text-[16px] font-medium text-[#707070] text-left w-[110px] flex justify-center items-center">
                            {item.finalAmount}
                          </td>
                          <td
                            className={`text-[16px] font-medium text-[#707070] text-left  w-[150px] flex justify-center items-center ${
                              OrdersRespEnum[item.orderStatus] ==
                              "Orders Accepted"
                                ? "text-green-500"
                                : "text-red-500"
                            }`}
                          >
                            {OrdersRespEnum[item.orderStatus]}
                          </td>
                          <td className="text-[16px] font-medium text-[#707070] text-left  w-[150px] flex justify-center items-center">
                            {item?.addressInfo?.address}
                          </td>
                          <td className="text-[16px] font-medium text-[#707070] text-left  w-[150px] flex justify-center items-center">
                            {item?.addressInfo?.pincode}
                          </td>
                          <td className="text-[16px] font-medium text-[#707070] text-left  w-[150px] flex justify-center items-center">
                            {item?.markupFee}
                          </td>
                          <td className="text-[16px] font-medium text-[#707070] text-left  w-[150px] flex justify-center items-center">
                            {/* {item?.markupFee} */}
                            {item?.isPaid ? (item?.isPaid ? "Yes" : "No") : ""}
                          </td>
                          <td
                            className={`text-[16px] font-medium text-[#707070] text-left  w-[150px] flex justify-center items-center ${
                              !item?.isAdminApprovedPaymentStatus
                                ? "text-red-500"
                                : item?.isAdminApprovedPaymentStatus ===
                                    "pending" ||
                                  item?.isAdminApprovedPaymentStatus ===
                                    "rejected"
                                ? "text-red-500"
                                : "text-green-500"
                            }`}
                          ></td>
                          <td className="px-6 py-4 whitespace-nowrap text-[14px] font-normal w-[120px] text-[#707070] rounded-r-xl">
                            <Link to={`/order-history-detail/${item.orderId}`}>
                              <button className="bg-lime-600 text-white px-3 py-1 rounded">
                                Details
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  };

  return (
    <div>
      <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
      <VendorDashboardHead
        handleNavClick={handleVendorNav}
        showNav={vendorNav}
      />
      <div className="bg-[#F7FFF1] py-4 pl-4 pr-4 lg:pr-6">
        <div className="bg-[#F7FFF1] lg:ml-5">
          <div className="relative flex flex-col sm:flex-row justify-between items-center lg:ml-[18%] pb-10 pt-10 sm:pt-20  lg:pt-5 sm:pr-8 sm-[10%] h-full bg-white mt-24">
            <div className=" pb-3 sm:pb-0 min-md:pl-10">
              <p className="text-[24px]">Scrap Transaction History</p>
            </div>
            <div className="flex flex-col min-md:flex-row w-full min-md:w-auto">
              <div className=" flex flex-col min-md:flex-row min-md:justify-center min-md:items-center min-md:gap-4 w-full">
                <label className=" py-1 min-md:py-3 text-black hidden lg:block">
                  Search
                </label>
                <div className="flex items-center p-2 border w-full min-md:w-[250px] rounded-md bg-[#80d7421c]">
                  <input
                    onChange={(e) => {
                      filetrOrderBySearch(e);
                    }}
                    placeholder="Search"
                    className="p-1 ml-3 text-black w-full outline-none bg-transparent"
                  />
                </div>
              </div>
              <div className=" flex items-center justify-center gap-4 mt-4 min-md:mt-0 w-full">
                <p className="pl-5 relative w-fit ">Order Status</p>
                <select
                  value={filterOrderStatus}
                  onChange={filterByOrderStatus}
                  className=" text-gray-500 bg-white border rounded-md h-9 shadow-sm outline-none appearance focus:border-indigo-600"
                >
                  <option value="all"> All</option>

                  <option value="0">Pending Order</option>
                  <option value="1">Accpted Order</option>
                  <option value="2">On the Way</option>
                  <option value="3">Arrived</option>
                  <option value="4">Scrap Picked</option>
                </select>
              </div>
            </div>
          </div>
          {userOrder?.length > 0 ? (
            <main>
              <section className="lg:ml-[18%] sm-[10%] h-full ">
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

export default History;
