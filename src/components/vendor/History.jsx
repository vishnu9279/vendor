import React, { useEffect, useState } from "react";
import search_icon from "../../assets/PNG/search_icon.png";
import Input from "../auth/Input";
import Row from "./components/Row";
import client from "../../api/client";
import VendorDashboardNav from "./VendorDashboardNav";
import VendorDashboardHead from "./VendorDashboardHead";
import axiosInstance from "../../api-config/axiosInstance";

const History = () => {
  const [historyPickups, setHistoryPickups] = React.useState([]);
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
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
      <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] bg-green-50 h-full p-5">
        <div id="NewRootRoot" className="flex flex-row w-full items-start">
          <div className="bg-white flex flex-col justify-end gap-12 w-full font-['Gilroy-Bold'] items-start pt-8 pb-2 px-10 rounded-lg">
            <div className="flex flex-col ml-2 gap-5 w-full items-start">
              <div className="flex flex-row justify-between ml-2 w-full items-start">
                <div className="text-center text-2xl tracking-[0.17] text-[#4a4a4a] mt-2">
                  Scrap Transaction History
                </div>
                <div className="flex flex-row justify-between w-2/5 font-['Inter'] items-start">
                  <div className="border-solid border-[rgba(149,_152,_154,_0.5)] flex flex-row gap-2 w-3/5 h-10 items-start pt-2 px-3 border rounded-lg">
                    <img
                      src="https://file.rendit.io/n/7ZGpMf3GAfzdqjWSgHTh.svg"
                      alt="Risearchline"
                      id="Risearchline"
                      className="mt-px w-4"
                    />
                    <div className="opacity-50 text-xs tracking-[0.05] leading-[18px] text-[#7780a1] mt-1">
                      Search...
                    </div>
                  </div>
                  <div className="border-solid border-[rgba(149,_152,_154,_0.5)] flex flex-row justify-center pt-1 gap-2 w-24 h-10 font-['Gilroy-Regular'] items-start border rounded-lg">
                    <div className="opacity-90 text-sm tracking-[0.05] leading-[21px] text-[#707070] mt-1">
                      Week
                    </div>
                    <img
                      src="https://file.rendit.io/n/W979MUge8OWK1expPbl2.svg"
                      alt="Riarrowupsline"
                      id="Riarrowupsline"
                      className="mt-1 w-6"
                    />
                  </div>
                  <div className="border-solid border-[rgba(149,_152,_154,_0.5)] flex flex-row justify-end gap-4 w-24 h-10 font-['Gilroy-Regular'] items-start pt-1 px-2 border rounded-lg">
                    <div className="opacity-90 text-sm tracking-[0.05] leading-[21px] text-[#707070] mt-1">
                      Date
                    </div>
                    <img
                      src="https://file.rendit.io/n/W979MUge8OWK1expPbl2.svg"
                      alt="Riarrowupsline1"
                      id="Riarrowupsline1"
                      className="mt-1 w-6"
                    />
                  </div>
                </div>
              </div>
              <div className="relative flex flex-row w-full items-start px-64">
                <div className="w-full h-16 bg-[#ebffdd] absolute top-0 left-0 flex flex-row justify-between items-start pt-5 pl-12 pr-24 rounded-[36px]">
                  <div className="opacity-90 tracking-[0.05] leading-[24px] uppercase text-[#707070] mt-1">
                    Date
                  </div>
                  <div className="flex flex-row mt-1 gap-40 w-2/3 items-start">
                    <div className="opacity-90 tracking-[0.05] leading-[24px] text-[#707070]">
                      CATEGORY
                    </div>
                    <div className="opacity-90 tracking-[0.05] leading-[24px] text-[#707070] mr-4">
                      PRICE
                    </div>
                    <div className="opacity-90 tracking-[0.05] leading-[24px] text-[#707070] mr-1">
                      LOCATION
                    </div>
                    <div className="opacity-90 tracking-[0.05] leading-[24px] text-[#707070]">
                      STATUS
                    </div>
                  </div>
                </div>
                <div className="opacity-90 tracking-[0.05] leading-[24px] uppercase text-[#707070] relative mt-6 w-1/6">
                  Pickup ID
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 w-full font-['Gilroy-Regular'] items-start mb-1 ml-2">
              <div className="flex flex-row ml-10 gap-48 w-5/6 items-start">
                <div className="flex flex-row justify-between mr-4 w-2/5 items-start">
                  <div className="flex flex-row justify-between w-3/5 items-start">
                    <div className="flex flex-col gap-1 w-20 items-start">
                      <div className="opacity-90 tracking-[0.05] leading-[24px]">
                        23, Mar 2023
                      </div>
                      <div className="opacity-90 text-xs tracking-[0.05] leading-[18px] text-[#707070]">
                        At 7:43 PM
                      </div>
                    </div>
                    <div className="opacity-90 tracking-[0.05] leading-[24px] text-[#707070] mt-3">
                      #2345556
                    </div>
                  </div>
                  <div className="opacity-90 tracking-[0.05] leading-[24px] text-[#707070] mt-3">
                    Plastic
                  </div>
                </div>
                <div className="opacity-90 tracking-[0.05] leading-[24px] mt-3">
                  ₹234
                </div>
                <div className="flex flex-row justify-between mt-3 w-1/4 font-['Gilroy-SemiBold'] items-start">
                  <div className="opacity-90 font-['Gilroy-Regular'] tracking-[0.05] leading-[24px] text-[#707070] w-1/2">
                    456, New street, Delhi, India
                  </div>
                  <div className="opacity-90 tracking-[0.05] leading-[24px] text-[#16cb3e]">
                    Successful
                  </div>
                </div>
              </div>
              <div className="bg-[#fafafa] flex flex-row gap-48 w-full items-start pt-2 px-10 rounded-[36px]">
                <div className="flex flex-row justify-between w-2/5 items-start mt-px mr-4">
                  <div className="flex flex-row justify-between w-3/5 items-start">
                    <div className="flex flex-col gap-1 w-24 items-start">
                      <div className="opacity-90 tracking-[0.05] leading-[24px]">
                        13, May 2023
                      </div>
                      <div className="opacity-90 text-xs tracking-[0.05] leading-[18px] text-[#707070]">
                        At 3:40 PM
                      </div>
                    </div>
                    <div className="opacity-90 tracking-[0.05] leading-[24px] text-[#707070] mt-3">
                      #2345556
                    </div>
                  </div>
                  <div className="opacity-90 tracking-[0.05] leading-[24px] text-[#707070] mt-3">
                    Plastic
                  </div>
                </div>
                <div className="opacity-90 tracking-[0.05] leading-[24px] mt-4">
                  ₹200
                </div>
                <div className="flex flex-row justify-between w-1/4 font-['Gilroy-SemiBold'] items-start mt-px mb-2">
                  <div className="opacity-90 font-['Gilroy-Regular'] tracking-[0.05] leading-[24px] text-[#707070] w-1/2">
                    456, New street, Delhi, India
                  </div>
                  <div className="opacity-90 tracking-[0.05] leading-[24px] text-[#16cb3e] mt-3">
                    Successful
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
};

export default History;
