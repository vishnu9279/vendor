import React from "react";
import order_successful from "../assets/PNG/order_successful.png";
import Button from "../components/auth/Button";

const OrderSuccessful = () => {
  return (
    <div className="pt-[80px] pb-12 flex flex-col justify-center items-center top-[325px]">
      <img
        src={order_successful}
        className="order_img w-[750px] h-[490px]"
        alt=""
      />
      <div>
        <p className="order_text_1 font-[400] text-[40px] text-[#4A4A4A] underline text-center">
          Order sent successfully{" "}
        </p>
        <p className="order_text_2 text-[22px] text-[#4A4A4A] font-[400] text-center">
          Our agents are on their way <br /> to pick up.
        </p>
      </div>
      <div className="mt-10 flex">
        <Button
          label="Browse More Scraps"
          classname="order_btn rounded-[50.94px] h-[60px] w-[350px] font-[400] text-[28px] text-[#343434] border border-black outline-none bg-white m-2"
        />
        <Button
          label="Return To Home"
          classname="order_btn rounded-[50.94px] h-[60px] w-[350px] font-[400] text-[28px] bg-[#5AB344] text-white m-2"
        />
      </div>
    </div>
  );
};

export default OrderSuccessful;
