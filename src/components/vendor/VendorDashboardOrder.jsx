import note from "../../assets/SVG/dashboard/note.svg";
import cancel from "../../assets/SVG/dashboard/round_cancel.svg";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import { useEffect, useState } from "react";
import scrap_img from "../../assets/PNG/dashboard/Scrap.png";
import { OrdersRespEnum } from "../../api-config/common";
import { scrapOrdersService } from "../../services/dashBoard";
import { Link } from "react-router-dom";

const VendorDashboardOrder = () => {
  const [userOrder, setUserOrder] = useState([]);

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

  const renderData = () => {
    return (
      <main>
        <section className="lg:ml-[1%] h-full p-5">
          <div
            id="NewRootRoot"
            className="flex flex-col w-full shadow bg-green-50"
          >
            <div className="lg:w-1/3 flex-shrink-0"></div>

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
                            <Link to={`/order-detail/${item.orderId}`}>
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
