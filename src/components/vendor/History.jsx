import  { useEffect, useState } from "react";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import axiosInstance from "../../api-config/axiosInstance";

const History = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  // eslint-disable-next-line no-unused-vars
  const [getScrapHistory, setScrapHistory] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/getScrapHistory");
      console.log("get scrap history", response);
      const data = JSON.parse(response.data.data)
      console.log("data", data)
      setScrapHistory(data.orders);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <main>
      <VendorDashboardNav showNav={vendorNav} hideNav={closeVendorNav} />
      <VendorDashboardHead
        handleNavClick={handleVendorNav}
        showNav={vendorNav}
      />
      <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%]    h-full p-5">
        <div id="NewRootRoot" className="flex flex-row w-full shadow bg-green-50 items-start">

          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="border-b">
                      <tr>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Date</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Pickup ID</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">CATEGORY</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">PRICE</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">LOCATION</th>
                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">STATUS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* <tr class="border-b">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                        {getScrapHistory.map((val) => (
                    <td >{val}</td>
                ))}
                      </tr> */}

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </main >
  );
};

export default History;
