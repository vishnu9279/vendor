import React, { useState } from "react";
import AdminSideNavs from "../AdminSideNavs";
import AdminDashboardHeader from "../AdminDashboardHeader";

const CustomerTables = () => {
  const [vendorNav, setVendorNav] = useState(false);
  const handleVendorNav = () => setVendorNav(true);
  const closeVendorNav = () => setVendorNav(false);
  const tableItems = [
    {
      NAME: "Esther Ogbu",
      LANDMARK: "Red Fort",
      PHONENUMBER: "+234-907-854-4231",
      ADDRESS: "31,wilmer",
      SCRAPSOLD: "101",
    },
    {
      NAME: "Esther Ogbu",
      LANDMARK: "Red Fort",
      PHONENUMBER: "+234-907-854-4231",
      ADDRESS: "31,wilmer",
      SCRAPSOLD: "101",
    },
    {
      NAME: "Esther Ogbu",
      LANDMARK: "Red Fort",
      PHONENUMBER: "+234-907-854-4231",
      ADDRESS: "31,wilmer",
      SCRAPSOLD: "101",
    },
    {
      NAME: "Esther Ogbu",
      LANDMARK: "Red Fort",
      PHONENUMBER: "+234-907-854-4231",
      ADDRESS: "31,wilmer",
      SCRAPSOLD: "101",
    },
    {
      NAME: "Esther Ogbu",
      LANDMARK: "Red Fort",
      PHONENUMBER: "+234-907-854-4231",
      ADDRESS: "31,wilmer",
      SCRAPSOLD: "101",
    },
    {
      NAME: "Esther Ogbu",
      LANDMARK: "Red Fort",
      PHONENUMBER: "+234-907-854-4231",
      ADDRESS: "31,wilmer",
      SCRAPSOLD: "101",
    },
  ];
  return (
    <div>
      <main>
        <AdminSideNavs showNav={vendorNav} hideNav={closeVendorNav} />
        <AdminDashboardHeader
          handleNavClick={handleVendorNav}
          showNav={vendorNav}
        />
        <div className="lg:ml-[18%] lg:bg-green-50 h-screen">
          <div>
            <div className="pt-[90px] mb-[30px] flex justify-between items-center px-[30px]">
              <h1>Customer's Details</h1>
              <div className="mt-6 sm:mt-0">
                <div className="relative">
                  <svg
                    className="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search...."
                    className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 rounded-lg sm:max-w-xs"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="max-w-screen-xl mx-auto px-4 md:px-8 pt-[30px]">
            <div className="items-start justify-between md:flex">
              <div className="w-[100%]">
                <div className=" flex justify-between items-center w-[100%]">
                  <h3 className="text-gray-800 text-xl font-bold sm:text-2xl pl-[20px]">
                    Customer's Details
                  </h3>
                  <div className="flex items-center">
                    <div>
                      <div className="relative">
                        <label htmlFor="Search" className="sr-only">
                          {" "}
                          Search{" "}
                        </label>

                        <input
                          type="text"
                          id="Search"
                          placeholder="Search for..."
                          className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm outline-none"
                        />

                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                          <button
                            type="button"
                            className="text-gray-600 hover:text-gray-700"
                          >
                            <span className="sr-only">Search</span>

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                              />
                            </svg>
                          </button>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div>
                        <select
                          name=""
                          id=""
                          className="w-[100px] h-[40px] border border-gray-300 rounded-md text-[14px] pl-[5px] outline-none ml-[5px] mr-[5px]"
                        >
                          <option value="">Week</option>
                          <option value="">Week</option>
                          <option value="">Week</option>
                          <option value="">Week</option>
                        </select>
                      </div>
                      <div>
                        <select
                          name=""
                          id=""
                          className=" w-[100px] h-[40px] border border-gray-300 rounded-md text-[14px] pl-[5px] outline-none ml-[5px] mr-[5px]"
                        >
                          <option value="">Date</option>
                          <option value="">Date</option>
                          <option value="">Date</option>
                          <option value="">Date</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 relative h-max overflow-auto">
              <table className="w-full table-auto text-sm text-left">
                <thead className="text-gray-600 font-medium border-b bg-[#EBFFDD]">
                  <tr className="">
                    <th className="py-3 pr-6">Name</th>
                    <th className="py-3 pr-6">LANDMARK</th>
                    <th className="py-3 pr-6">PHONE NUMBER</th>
                    <th className="py-3 pr-6">ADDRESS</th>
                    <th className="py-3 pr-6">SCRAP SOLD</th>
                    <th className="py-3 pr-6">ACTION</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 divide-y bg-white">
                  {tableItems.map((item, idx) => (
                    <tr key={idx}>
                      <td className="pr-6 py-4 whitespace-nowrap">
                        {item.NAME}
                      </td>
                      <td className="pr-6 py-4 whitespace-nowrap">
                        {item.LANDMARK}
                      </td>

                      <td className="pr-6 py-4 whitespace-nowrap">
                        {item.PHONENUMBER}
                      </td>
                      <td className="pr-6 py-4 whitespace-nowrap">
                        {item.ADDRESS}
                      </td>
                      <td className="pr-6 py-4 whitespace-nowrap">
                        {item.SCRAPSOLD}
                      </td>
                      <td className="text-right whitespace-nowrap">
                        <button className="py-1.5 px-3 text-gray-600 hover:text-gray-500 duration-150 hover:bg-gray-50 border rounded-lg">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerTables;
