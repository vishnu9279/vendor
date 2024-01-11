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
  const perPageCount = 10;
  useEffect(() => {
    window.scrollTo(0, 0);

    filterByOrderStatus();
  }, [page]);

  const fullname = localStorage.getItem("fullname");
  const scraps = async (queryString,obj) => {
    try {
      const scrapOrders = await scrapOrdersService(queryString,obj,(page - 1),perPageCount);
      console.log("vendor orders", scrapOrders);
      setUserOrder(scrapOrders.orders);
      setTotalPageCount(Math.ceil(scrapOrders.totalScrapCount / perPageCount));
    } catch (error) {
      console.error("error", error);
    }
  };

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
    let obj = {}
    try {
      obj.key = event.target.value
      console.log("searchFilter", obj,filterOrderStatus);
      await scraps(filterOrderStatus,obj);
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
  const renderData = () => {
    return (
      <main>
        <section className="lg:ml-[1%] h-full p-5">
          <div
            id="NewRootRoot"
            className="flex flex-col w-full shadow bg-green-50"
          >
            <div className="flex-grow overflow-x-auto">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
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
      <VendorDashboardNav />
      <VendorDashboardHead />
      <div className="relative flex grid grid-cols-2 gap-4 lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[10%] sm-[10%] h-full">
        <div className="col-span-1">
          <p className="pt-5 pl-5 relative right-0 lg:max-w-sm">Order Status</p>
          <select
            value={filterOrderStatus}
            onChange={filterByOrderStatus}
            className=" text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance focus:border-indigo-600"
          >
            <option value="all"> All</option>

            <option value="0">Pending Order</option>
            <option value="1">Accpted Order</option>
            <option value="2">On the Way</option>
            <option value="3">Arrived</option>
            <option value="4">Scrap Picked</option>
          </select>
        </div>
        <div className="col-span-1">
         / <div className="w-7/12">
            <label className="block py-3 text-black">Search</label>
            <div className="flex items-center p-2 border rounded-md bg-[#80d7421c]">
              <input
                onChange={(e) => {
                  filetrOrderBySearch(e);
                }}
                placeholder="Search"
                className="p-1 ml-3 text-black outline-none bg-transparent"
              />
            </div>
          </div>
        </div>
      </div>
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
      <div>
        {console.log("pagination ", userOrder.length)}
        {userOrder && userOrder.length > 0 && (
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
  );
};

export default History;
