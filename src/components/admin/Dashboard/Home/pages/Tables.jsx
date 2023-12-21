const Tables = () => {
  const tableItems = [
    {
      ID: "23",
      NAME: "Liam James",
      CATEGORY: "Plastic",
      PRICE: "200",
      KILOGRAM: "$100K",
      GEOGRAPHY: "Delhi,India",
      LOCATION: "17,Rabiu Adio Crescent",
      STATUS: "online",
    },
    {
      ID: "23",
      NAME: "Liam James",
      CATEGORY: "Plastic",
      PRICE: "200",
      KILOGRAM: "$100K",
      GEOGRAPHY: "Delhi,India",
      LOCATION: "17,Rabiu Adio Crescent",
      STATUS: "online",
    },
    {
      ID: "23",
      NAME: "Liam James",
      CATEGORY: "Plastic",
      PRICE: "200",
      KILOGRAM: "$100K",
      GEOGRAPHY: "Delhi,India",
      LOCATION: "17,Rabiu Adio Crescent",
      STATUS: "online",
    },
    {
      ID: "23",
      NAME: "Liam James",
      CATEGORY: "Plastic",
      PRICE: "200",
      KILOGRAM: "$100K",
      GEOGRAPHY: "Delhi,India",
      LOCATION: "17,Rabiu Adio Crescent",
      STATUS: "online",
    },
    {
      ID: "23",
      NAME: "Liam James",
      CATEGORY: "Plastic",
      PRICE: "200",
      KILOGRAM: "$100K",
      GEOGRAPHY: "Delhi,India",
      LOCATION: "17,Rabiu Adio Crescent",
      STATUS: "online",
    },
    {
      ID: "23",
      NAME: "Liam James",
      CATEGORY: "Plastic",
      PRICE: "200",
      KILOGRAM: "$100K",
      GEOGRAPHY: "Delhi,India",
      LOCATION: "17,Rabiu Adio Crescent",
      STATUS: "online",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className=" flex justify-between items-center w-[100%]">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl pl-[20px]">
          Scrap Transaction History
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
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-[#EBFFDD] text-gray-600 text-[12px] font-medium border-b rounded-[30px]">
            <tr>
              <th className="py-3 px-6">ID</th>
              <th className="py-3 px-6">NAME</th>
              <th className="py-3 px-6">CATEGORY</th>
              <th className="py-3 px-6">PRICE</th>
              <th className="py-3 px-6">KILOGRAM</th>
              <th className="py-3 px-6">GEOGRAPHY</th>
              <th className="py-3 px-6">LOCATION</th>
              <th className="py-3 px-6">STATUS</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.ID}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.NAME}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.CATEGORY}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.PRICE}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.KILOGRAM}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.GEOGRAPHY}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.LOCATION}</td>
                <td className="pr-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      item.STATUS === "online"
                        ? "text-green-600 bg-green-50"
                        : "text-red-600 bg-blue-50"
                    }`}
                  >
                    {item.STATUS}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tables;
