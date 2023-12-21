import React from "react";
import ulpoad_icon from "../../../assets/PNG/ulpoad_icon.png";

const Upload = ({ fileName, label }) => {
  return (
    <>
      <label
        htmlFor="upload"
        className="text-[16px] text-[#4A4A4A] mb-1 flex flex-col"
      >
        <span>{label}</span>
        <input
          type="file"
          value={fileName}
          name="fileName"
          style={{ display: "none" }}
          id="upload"
        />
        <div className="w-full p-3 flex justify-between rounded-[43px] h-[48px] border-0 outline-none bg-[#EBFFDD] mb-3 text-sm">
          {" "}
          <span>file name</span>
          <div className="mt-1 mr-4">
            <img
              src={ulpoad_icon}
              alt=""
              className="h-[14px] w-[16.07px] absolute"
            />
          </div>
        </div>
      </label>
    </>
  );
};

export default Upload;
