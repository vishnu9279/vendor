import React from "react";

const Row = ({
  item: { createdAt, orderId, price, address, city, PickUp_Request_Status },
  index,
}) => {
  return (
    <tr className={`w-full ${index % 2 !== 0 ? "bg-[#FAFAFA]" : "bg-white"}`}>
      <td className={index % 2 !== 0 ? "text-[16px] first-td" : "text-[16px]"}>
        {createdAt?.split("T")[0]} <br />
        <span className="text-[12px] text-[#707070]">
          At {createdAt?.split("T")[1]}
        </span>
      </td>
      <td className="text-[#707070] text-[16px]">{orderId}</td>
      <td className="text-[#707070] text-[16px]">category</td>
      <td className="text-[16px]">₹{price}</td>
      <td className="text-[#707070] text-[16px]">
        {address}, {city}
      </td>
      <td
        className={`text-[16px] font-semibold ${
          index % 2 !== 0 ? "last-td" : ""
        } ${
          PickUp_Request_Status === "Successful"
            ? "text-[#16CB3E]"
            : "text-[#E33629]"
        }`}
      >
        {PickUp_Request_Status}
      </td>
    </tr>
  );
};

export default Row;
