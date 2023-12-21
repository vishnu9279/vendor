const Table2 = () => {
  const tableItems = [
    {
      NAME: "Liam James",
      CATEGORY: "Plastic",

      STATUS: "Successful",
    },
    {
      NAME: "Liam James",
      CATEGORY: "Plastic",

      STATUS: "Successful",
    },
    {
      NAME: "Liam James",
      CATEGORY: "Plastic",

      STATUS: "Successful",
    },
    {
      NAME: "Liam James",
      CATEGORY: "Plastic",

      STATUS: "Successful",
    },
    {
      NAME: "Liam James",
      CATEGORY: "Plastic",

      STATUS: "Successful",
    },
    {
      NAME: "Liam James",
      CATEGORY: "Plastic",

      STATUS: "Successful",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl text-center">
          Scrap Transaction History
        </h3>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-[#EBFFDD] text-gray-600 text-[12px] font-medium border-b rounded-[30px]">
            <tr>
              <th className="py-3 px-6">NAME</th>
              <th className="py-3 px-6">CATEGORY</th>

              <th className="py-3 px-6">STATUS</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {tableItems.map((item, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{item.NAME}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.CATEGORY}</td>

                <td className="pr-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-2 rounded-full font-semibold text-xs ${
                      item.STATUS === "Successful"
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

export default Table2;
