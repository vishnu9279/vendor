import React from "react";
import search_icon from "../../assets/PNG/search_icon.png";
import Input from "../auth/Input";
import Row from "./components/Row";
import client from "../../api/client";

const History = () => {
  const [historyPickups, setHistoryPickups] = React.useState([]);



  return (
    <section className="lg:ml-[18%] pt-[43%] md:pt-[23%] lg:pt-[8%] bg-green-50 h-full p-5">
      <div className="p-5 bg-white rounded-[8px]">
        <div className="mb-4 flex justify-between">
          <h2 className="text-[24px] font-semibold text-[rgba(74, 74, 74, 1)]">
            Scrap Transaction History
          </h2>
          <div className="flex">
            <span>
              <img
                src={search_icon}
                alt=""
                className="w-[13.54px] h-[13.54px] absolute m-2 mt-[10px]"
              />
              <Input
                placeHolder="Search..."
                classname="rounded-[8px] text-[12px] border border-[rgba(149, 152, 154, 0.5)] p-2 outline-none  pl-6 font-[Gilroy-Regular] text-[rgba(112, 112, 112, 1)]"
              />
            </span>
            <select className="border border-[rgba(149, 152, 154, 0.5)] rounded-[8px] ml-3 mr-3">
              <option
                disabled
                className="font-[gilroy-regular] text-[rgba(112, 112, 112, 1)]"
              >
                Week
              </option>
              <option className="font-[gilroy-regular] text-[16px]">
                Week 1
              </option>
              <option className="font-[gilroy-regular] text-[16px]">
                Week 2
              </option>
              <option className="font-[gilroy-regular] text-[16px]">
                Week 3
              </option>
              <option className="font-[gilroy-regular] text-[16px]">
                Week 4
              </option>
            </select>
            <select className="border border-[rgba(149, 152, 154, 0.5)] rounded-[8px]">
              <option
                disabled
                className="font-[Gilroy-Regular] text-[rgba(112, 112, 112, 1)]"
              >
                Date
              </option>
              <option className="font-[gilroy-regular] text-[16px]">
                Date 1
              </option>
              <option className="font-[gilroy-regular] text-[16px]">
                Date 2
              </option>
              <option className="font-[gilroy-regular] text-[16px]">
                Date 3
              </option>
              <option className="font-[gilroy-regular] text-[16px]">
                Date 4
              </option>
            </select>
          </div>
        </div>
        <div className="min-h-[67vh] overflow-y-scroll hide-scroll">
          <table>
            <thead>
              <tr className="bg-[#EBFFDD] h-[68px] w-full">
                <td className="first-td">date</td>
                <td>pickup id</td>
                <td>category</td>
                <td>price</td>
                <td>location</td>
                <td className="last-td">status</td>
              </tr>
            </thead>
            <tbody>
              {historyPickups.map((item, index) => (
                <Row key={index} index={index} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default History;
